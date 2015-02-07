var lizPuzzle5 = angular.module('lizPuzzle5', []);

// Knockout Puzzle2 Factory
lizPuzzle5.factory('puzzle5Activity', function ($rootScope) {

	var puzzle5Activity = {};

	/**
	 * Crea el ViewModel
	 */
	puzzle5Activity.create = function (options) {
		return new puzzle5Activity._ViewModel(options);
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
	puzzle5Activity._ViewModel = function (options) {
		var self = this,
			tempItem = {}, // variable auxiliar para añadir nuevos elementos al stack
			stackCounter = 0, // Variable para poner Id's a elementos clonados
			tempStack = []; // Array auxiliar que después será ordenado aleatoriamente

		// Inicializa las opciones
		var targets = options.targets,
				minRightAnswers = options.minRightAnswers ? options.minRightAnswers : targets.length,
				chances = options.chances ? options.chances : targets.length;

		self.canvas = options.canvas; // La imagen en sí
		self.canvasAlt = options.canvasAlt;
		self.items = ko.observableArray(options.targets); // Sortable de targets
		self.targets = ko.observableArray(options.targets); // Sortable de targets

		ko.utils.arrayForEach(self.items(), function (item) {
			item.chances = options.chancesPerItem - 1;
		});
		

		// Constructor para los targets
		ko.utils.arrayForEach(self.targets(), function(target){
				target._id = (Math.random() + 1).toString(36).substring(7); // Genera un código aleatorio como id

				// Creamos el lugar a donde cae el elemento
				target._targets = ko.observableArray();
				target._targets._id = target._id;
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

		self.playAudio = function () {
			$('#puzzle5-instruction')[0].play();
		};

		/**
		 * Devuelve los estilos según el elemento
		 */
		self.getStyles = function (item) {
			var styles = '';
			var itemWidth = (item.hasOwnProperty("w")) ? item.w + '%;' : "auto;";
			var itemHeight = (item.hasOwnProperty("h")) ? item.h + '%;' : "auto;";
			styles += 'width: ' + itemWidth;
			styles += 'height: ' + itemHeight;
			styles += 'top: ' + item.t + '%;';
			styles += 'left: ' + item.l + '%;';

			return styles;
		};

		var counter = 0,
			numItems = self.items().length;
		// Función que se ejecuta cuando se suelta el elemento y hace toda la funcionalidad
		self.verifyAnswer = function (arg) {;
			var item = arg.item,
				parent = arg.targetParent;

			// Si es el mismo elemento inicial, salimos de la función
			if(arg.sourceParent === arg.targetParent) return;

			// Si cae en el mismo elemento, es correcto
			if(parent._id === item._id){
				// RESPUESTA CORRECTA
				self.rightAnswers++;
				self.rightAnswer(item);
				counter++;
				// Si se definió una función cuando la respuesta es correcta, se corre
				if(typeof options.rightAnswerCallback !== "undefined" ) options.rightAnswerCallback(item);
			} else {
				// RESPUESTA INCORRECTA
				self.wrongAnswer(item);
				arg.cancelDrop = true;

				if(item.chances === 0){
	            	counter++;
	            	$('#' + item._id).hide(200);
            	}else{item.chances--;}
			}

			// La actividad termina cuando el número de posibilidades se termina
			if(numItems === counter) {
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
	 * Inicializa la instancia del ViewModel creado con puzzle5Activity.create
	 *
	 * @param {object} instance Intancia del VM de knockout
	 */
	puzzle5Activity.run = function (instance) {
		ko.cleanNode($('#main-container')[0]);
		ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
		ko.applyBindings(instance, $('#main-container')[0]);
	};

	return puzzle5Activity;

});


lizPuzzle5.directive('puzzle5', function  (puzzle5Activity) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			audio: "@",
			description: '@'
		},
		templateUrl: '../views/activities/puzzle5.html',
		link: function postLink(scope, element, attrs) {

			// Corremos la aplicación
			puzzle5Activity.run(puzzle5Activity.create(scope.options));
		}
	}; 
});


