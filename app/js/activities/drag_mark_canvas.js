var lizDragMarkCanvas = angular.module('lizDragMarkCanvas', []);

// Knockout Pairs Factory
lizDragMarkCanvas.factory('dragMarkCanvasActivity', function ($rootScope) {

	var dragMarkCanvasActivity = {};

	/**
	 * Crea el ViewModel
	 */
	dragMarkCanvasActivity.create = function (options) {
		return new dragMarkCanvasActivity._ViewModel(options);
	}

	/**
	 * Genera el ViewModel de las parejas con sus funcionalidades
	 *
	 * Recibe un objeto con las siguientes propiedades
	 *
	 * @param {object}		options						Opciones a utilizar.
	 * @param {Array}			options.data				Información de los elementos. Dentro de cada objeto, se pueden definir las propiedades:
	 *
	 *	target: Permite darle un orden apropiado a los targets. Debe empezar desde 0 y la propiedad options.randomTargets debe estar desactivada
	 *
	 * @param {integer}		options.chances				Número de posibilidades que tiene el usuario de hacer la actividad
	 * @param {integer}		options.minRightAnswers		Número mínimo de respuestas correctas
	 * @param {boolean}		options.randomItems			Define si los elementos deben ser puestos en forma aleatoria
	 * @param {boolean}		options.randomTargets		Define si los objetivos debe ser puestos en forma aleatoria
	 * @param {function}	options.successCallback		Función que se llama cuando se termina la actividad de forma satisfactoria
	 * @param {function}	options.rightAnswerCallback	Función que se llama cuando la respuesta es correcta
	 *
	 */
	dragMarkCanvasActivity._ViewModel = function (opt) {
		var self = this,
			chances = opt.chances,
			minRightAnswers = opt.minRightAnswers,
			temp = false;

		// Elementos de la actividad
		self.canvas = opt.canvas;
		self.alt = opt.alt;
		self.items = opt.items; // Elementos que se arrastran
		self.targets = ko.observableArray(); // Targets 

		self.items.forEach(function(item){
			item.targets.forEach(function(target){
				temp = {
					sortable: ko.observableArray(),
					t: target.t,
					l: target.l,
					w: target.w,
					h: target.h
				};

				temp.sortable._id = item.drag;

				// Añadimos el elemento a los targets
				self.targets.push(temp);
			});
		});

		// audio
		self.audio = ko.observable(opt.audio);

		// Carpeta de recursos desde angular
		self.resources = $rootScope.resources;

		self.maximumElements = 1; // IMPORTANTE: Requerido para que los sortables no acepten más de un elemento
		self.rightAnswers = 0; // Inicializamos el número de respuestas buenas a 0

		// Triggers que se activan cuando la respuesta es correcta/incorrecta
		self.rightAnswer = ko.observable();
		self.wrongAnswer = ko.observable();

		// Triggers cuando la actividad termina satisfactoria y/o insatisfactoriamente
		self.failure = ko.observable(false);
		self.success = ko.observable(false);




		/**
		 * Reproduce el audio de la instrucción.
		 */
		self.playAudio = function () {
			$('#audio-instruction')[0].play();
		};

		/**
		 * Define si el target esta lleno utilizando self.maximumElements
		 */
		self.isContainerFull = function (parent) {
			return parent().length < self.maximumElements;
		};


		/**
		 * Obtiene los estilos de los targets
		 */
		self.getTargetStyles = function (target) {
			var styles = '';

			styles += 'top: ' + target.t + '%;';
			styles += 'left: ' + target.l + '%;';
			styles += 'width: ' + target.w + '%;';
			styles += 'height: ' + target.h + '%;';

			return styles;
		};


		/**
		 * Función que se ejecuta cuando se suelta el elemento y hace toda la funcionalidad
		 */
		self.verifyAnswer = function (arg) {
			var parent = arg.targetParent,
				item = arg.item;

			if(parent._id === item.drag){
				// RESPUESTA CORRECTA
				self.rightAnswers++;
				self.rightAnswer(item);

				// Si se definió una función cuando la respuesta es correcta, se corre
				if(typeof opt.rightAnswerCallback !== "undefined" ) opt.rightAnswerCallback(item);
			} else {
				// RESPUESTA INCORRECTA
				self.wrongAnswer(item);
				arg.cancelDrop = true;
			}

			// Reducimos en 1 las posibilidades
			chances--;

			// La actividad termina cuando el número de posibilidades se termina
			if(chances === 0 || self.rightAnswers === self.targets().length) {
				// Si el número de respuestas correctas es mayor o igual al requerido inicialmente
				if(self.rightAnswers >= minRightAnswers) {
					self.success(true); // Trigger de éxito

					// Se llama la función de éxito, definida por el desarrollador
					if (typeof opt.successCallback !== "undefined") opt.successCallback();

					$rootScope.isNextEnabled = true; // Activamos el siguiente
				} else {
					self.failure(true); // Trigger de fracaso
				}
			}
		};

	};

	/**
	 * Inicializa la instancia del ViewModel creado con dragMarkCanvasActivity.create
	 *
	 * @param {object} instance Intancia del VM de knockout
	 */
	dragMarkCanvasActivity.run = function (instance) {
		ko.cleanNode($('#main-container')[0]);
		ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
		ko.applyBindings(instance, $('#main-container')[0]);
	};

	return dragMarkCanvasActivity;

});

lizDragMarkCanvas.directive('dragMarkCanvas', function  (dragMarkCanvasActivity) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			customClass: '@'
		},
		templateUrl: '../views/activities/drag_mark_canvas.html',
		link: function postLink(scope, element, attrs) {
			// Añadimos el audio a options
			scope.options.audio = typeof scope.audio !== "undefined" ? scope.audio : false;

			// Corremos la aplicación
			var vm = dragMarkCanvasActivity.create(scope.options);
			dragMarkCanvasActivity.run(vm);
		}
	}; 
});
