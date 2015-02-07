var lizMultipleMark = angular.module('lizMultipleMark', []);

// Knockout Pairs Factory
lizMultipleMark.factory('multipleMarkActivity', function ($rootScope) {

	var multipleMarkActivity = {};

	/**
	 * Crea el ViewModel
	 */
	multipleMarkActivity.create = function (options) {
		return new multipleMarkActivity._ViewModel(options);
	}

	/**
	 * Genera el ViewModel de las parejas con sus funcionalidades
	 *
	 * Recibe un objeto con las siguientes propiedades
	 *
	 * @param {object}		options						Opciones a utilizar.
	 * @param {Array}		options.items				Elementos donde se suelta la marca. Deben tener la propiedad bool "answer"
	 * @param {integer}		options.chances				Número de posibilidades que tiene el usuario de hacer la actividad
	 * @param {integer}		options.minRightAnswers		Número mínimo de respuestas correctas
	 * @param {function}	options.successCallback		Función que se llama cuando se termina la actividad de forma satisfactoria
	 * @param {function}	options.rightAnswerCallback	Función que se llama cuando la respuesta es correcta
	 *
	 */
	multipleMarkActivity._ViewModel = function (options) {
		var self = this,
				rightAnswers = 0,
				chances = typeof options.chances !== "undefined" ? options.chances : options.items.length,
				minRightAnswers = options.minRightAnswers,
				maximumElements = 1;


		self.answers = ko.observableArray(options.answers);
		self.items = ko.observableArray(options.items);

		// Añadimos a cada item un observableArray para que puedan recibir las marcas
		ko.utils.arrayForEach(self.items(), function(item){
			item._target = ko.observableArray();
			item._target._ids = item.answers; // para poder identificar si esta bueno o malo
		});

		// Carpeta de recursos desde angular
		self.resources = $rootScope.resources;

		// Triggers que se activan cuando la respuesta es correcta/incorrecta
		self.rightAnswer = ko.observable();
		self.wrongAnswer = ko.observable();

		// Triggers cuando la actividad termina satisfactoria y/o insatisfactoriamente
		self.failure = ko.observable(false);
		self.success = ko.observable(false);

		/**
		 * Define si el target esta lleno utilizando self.maximumElements
		 */
		self.isContainerFull = function (parent) {
			return parent().length < maximumElements;
		};

		/**
		 * Función que se ejecuta al soltar los elementos
		 */
		self.verifyAnswer = function (arg) {
			var item = arg.item,
			parent = arg.targetParent;

			// Buscamos el id dentro de las respuestas
			if(parent._ids.indexOf(item.id) >= 0){
				// respuesta correcta
				self.rightAnswer(item);
				rightAnswers++;

				if(typeof options.rightAnswerCallback !== "undefined") options.rightAnswerCallback(item);
			} else {
				// respuesta incorrecta
				self.wrongAnswer(item);
				arg.cancelDrop = true; // Devuelve el elemento
			}

			chances--;


			// Final de la actividad
			if(chances === 0){
				if(rightAnswers >= minRightAnswers){
					// éxito
					self.success(true);

					$rootScope.isNextEnabled = true; // Activamos la siguiente ruta en angular

					if(typeof options.successCallback !== "undefined") options.successCallback();

				} else {
					// Fracaso
					self.failure(true);
				}
			}
		}
	};

	/**
	 * Inicializa la instancia del ViewModel creado con multipleMarkActivity.create
	 *
	 * @param {object} instance Intancia del VM de knockout
	 */
	multipleMarkActivity.run = function (instance) {
		ko.cleanNode($('#main-container')[0]);
		ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
		ko.applyBindings(instance, $('#main-container')[0]);
	};

	return multipleMarkActivity;

});

lizMultipleMark.directive('multipleMark', function  (multipleMarkActivity) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			options: '=',
			description: '@'
		},
		templateUrl: '../views/activities/multiple_mark.html',
		link: function postLink(scope, element, attrs) {
			// Corremos la aplicación
			multipleMarkActivity.run(multipleMarkActivity.create(scope.options));
		}
	}; 
});
