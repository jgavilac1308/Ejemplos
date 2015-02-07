var lizPuzzle2 = angular.module('lizPuzzle2', []);

// Knockout Puzzle2 Factory
lizPuzzle2.factory('puzzle2Activity', function ($rootScope) {

	var puzzle2Activity = {};

	/**
	 * Crea el ViewModel
	 */
	puzzle2Activity.create = function (options) {
		return new puzzle2Activity._ViewModel(options);
	}

	/**
	 * Genera el ViewModel de las parejas con sus funcionalidades
	 *
	 * Recibe un objeto con las siguientes propiedades
	 *
	 * @param {object}		options						Opciones a utilizar.
	 * @param {Array}		options.data				Información de los elementos. Dentro de cada objeto, se pueden definir las propiedades:
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
	puzzle2Activity._ViewModel = function (options) {
		var self = this;

		// Inicializa las opciones
		var targets = options.targets,
				minRightAnswers = options.minRightAnswers ? options.minRightAnswers : targets.length,
				chances = options.chances ? options.chances : targets.length;

		// Main Observables
		self.trap = ko.observableArray([]); // Capa base donde caen los elementos si no aciertan los targets
		self.trap._id = 'trap';

		self.canvas = options.canvas; // La imagen en sí
		self.items = ko.observableArray(options.targets); // Sortable de círculos arrastrar
		self.targets = ko.observableArray(options.targets); // Sortable de targets

		// Constructor para los targets
		ko.utils.arrayForEach(self.targets(), function(target){
				target._targets = ko.observableArray();
				target._targets._id = 'target';
		});

		self.rightAnswers = 0; // Inicializamos el número de respuestas buenas a 0
		self.maximumElements = 1; // Número máximo de elementos

		self.resources = $rootScope.resources;

		// Triggers que se activan cuando la respuesta es correcta/incorrecta
		self.rightAnswer = ko.observable();
		self.wrongAnswer = ko.observable();

		// Triggers cuando la actividad termina satisfactoria y/o insatisfactoriamente
		self.failure = ko.observable(false);
		self.success = ko.observable(false);

		/**
		 * Previene la posibilidad de lanzar más de un elemento
		 */
		self.isContainerFull = function (parent) {
			return parent().length < self.maximumElements;
		};

		/**
		 * Devuelve los estilos según el elemento
		 */
		self.getStyles = function (item) {
			var styles = '';

			styles += 'width: ' + item.w + '%;';
			styles += 'height: ' + item.h + '%;';
			styles += 'top: ' + item.t + '%;';
			styles += 'left: ' + item.l + '%;';

			return styles;
		}

		// Función que se ejecuta cuando se suelta el elemento y hace toda la funcionalidad
		self.verifyAnswer = function (arg) {
			var item = arg.item;

			// Si es el mismo elemento inicial, salimos de la función
			if(arg.sourceParent === arg.targetParent) return;

			// Si cae en la trampa, esta malo
			if(arg.targetParent._id === 'trap'){
				// RESPUESTA INCORRECTA
				self.wrongAnswer(item);
				arg.cancelDrop = true;
			}

			// Si cae en un target, es correcto
			if(arg.targetParent._id === 'target'){
				// RESPUESTA CORRECTA
				self.rightAnswers++;
				self.rightAnswer(item);

				// Si se definió una función cuando la respuesta es correcta, se corre
				if(typeof options.rightAnswerCallback !== "undefined" ) options.rightAnswerCallback(item);
			}

			// Reducimos en 1 las posibilidades
			chances--;

			// La actividad termina cuando el número de posibilidades se termina
			if(chances === 0) {
				// Si el número de respuestas correctas es mayor o igual al requerido inicialmente
				if(self.rightAnswers >= minRightAnswers) {
					self.success(true); // Trigger de éxito
					$rootScope.isNextEnabled = true;
					if (typeof options.successCallback !== "undefined") options.successCallback(); // Se llama la función de éxito, definida por el desarrollador
				} else {
					// Trigger de fracaso
					self.failure(true);
				}
			}
		};

		};

		/**
		 * Inicializa la instancia del ViewModel creado con puzzle2Activity.create
		 *
		 * @param {object} instance Intancia del VM de knockout
		 */
		puzzle2Activity.run = function (instance) {
			ko.cleanNode($('#main-container')[0]);
			ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
			ko.applyBindings(instance, $('#main-container')[0]);
		};

		return puzzle2Activity;

});


lizPuzzle2.directive('puzzle2', function  (puzzle2Activity) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			description: '@',
			audio: '@'
		},
		templateUrl: '../views/activities/puzzle2.html',
		link: function postLink(scope, element, attrs) {

			// Corremos la aplicación
			puzzle2Activity.run(puzzle2Activity.create(scope.options));
		}
	}; 
});


