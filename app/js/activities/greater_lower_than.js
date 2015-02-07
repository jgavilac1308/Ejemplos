var lizGreaterLowerThan = angular.module('lizGreaterLowerThan', ['factories']);

lizGreaterLowerThan.factory('greaterLowerThanActivity', function ($rootScope, shuffleArrayFactory) {

	var greaterLowerThanActivity = {};

	/**
	 * Crea el ViewModel
	 */
	greaterLowerThanActivity.create = function (options) {
		return new greaterLowerThanActivity._ViewModel(options);
	};

	greaterLowerThanActivity._ViewModel = function (options) {
		var self = this,
			opt = options, // Alias de options
			newPair = {}, // Variable auxiliar para alimentar a self.numbers
			chances = opt.hasOwnProperty('chances') ? opt.chances : opt.numbers.length,
			minRightAnswers = opt.minRightAnswers;

		self.playAudio = function () {
			$('#audio-instruction')[0].play();
		};

		// Contantes para comparar
		var GREATER = 1,
			LOWER = 2;

		// Parejas de números
		self.numbers = ko.observableArray([]);

		// Símbolos a arrastrar
		self.greaterSymbol = ko.observable({ id: GREATER, symbol: '&gt;' });
		self.lowerSymbol = ko.observable({ id: LOWER, symbol: '&lt;' });

		// Constructor de las parejas de números
		opt.numbers.forEach(function(number){
			newPair = {
				sortable: ko.observableArray([]),
				left: number[0],
				right: number[1]
			};

			newPair.sortable.id = (number[0] > number[1]) ? GREATER : LOWER// tomamos en cuenta solamente si left es mayor a right
			self.numbers.push(newPair); // Añadimos al array
		});

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

		// Define si el target esta lleno utilizando self.maximumElements
		self.isContainerFull = function (parent) {
			return parent().length < self.maximumElements;
		};


		// Función que se ejecuta cuando se suelta el elemento y hace toda la funcionalidad
		self.verifyAnswer = function (arg) {
			var parent = arg.targetParent,
			item = arg.item;

			if(parent.id === item.id){
				// RESPUESTA CORRECTA
				self.rightAnswers++;
				self.rightAnswer(item);

				// Si se definió una función cuando la respuesta es correcta, se corre
				if(typeof opt.rightAnswerCallback !== "undefined" ) opt.rightAnswerCallback(item);
			} else {
				// RESPUESTA INCORRECTA
				self.wrongAnswer(item);
			}

			// Reducimos en 1 las posibilidades
			chances--;

			// La actividad termina cuando el número de posibilidades se termina
			if(chances === 0) {
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
	 * Inicializa la instancia del ViewModel creado con greaterLowerThanActivity.create
	 *
	 * @param {object} instance Intancia del VM de knockout
	 */
	greaterLowerThanActivity.run = function (instance) {
		ko.cleanNode($('#main-container')[0]);
		ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
		ko.applyBindings(instance, $('#main-container')[0]);
	};

	return greaterLowerThanActivity;

});

lizGreaterLowerThan.directive('greaterLowerThan', function  (greaterLowerThanActivity) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			description: '@',
			audio: '@'
		},
		templateUrl: '../views/activities/greater_lower_than.html',
		link: function postLink(scope, element, attrs) {
			// Corremos la aplicación
			var vm = greaterLowerThanActivity.create(scope.options);
			greaterLowerThanActivity.run(vm);
		}
	}; 
});
