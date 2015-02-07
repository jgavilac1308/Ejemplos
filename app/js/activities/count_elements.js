var lizCountElements = angular.module('lizCountElements', []);

// Knockout Pairs Factory
lizCountElements.factory('countElementsActivity', function ($rootScope, shuffleArrayFactory) {

	var countElementsActivity = {};

	/**
	 * Crea el ViewModel
	 */
	countElementsActivity.create = function (options) {
		return new countElementsActivity._ViewModel(options);
	}

	/**
	 * Genera el ViewModel de las parejas con sus funcionalidades
	 *
	 * Recibe un objeto con las siguientes propiedades
	 *
	 * @param {object}		options						Opciones a utilizar.
	 *
	 * @param {integer}		options.chances							Número de posibilidades que tiene el usuario de hacer la actividad
	 * @param {integer}		options.minRightAnswers			Número mínimo de respuestas correctas
	 * @param {function}	options.successCallback			Función que se llama cuando se termina la actividad de forma satisfactoria
	 * @param {function}	options.rightAnswerCallback	Función que se llama cuando la respuesta es correcta
	 *
	 */
	countElementsActivity._ViewModel = function (options) {
		var self = this;

		var minRightAnswers = options.minRightAnswers ? options.minRightAnswers : options.items.length,
			chances = options.chances ? options.chances : options.items.length;

		// antes que nada, generamos el Id para cada uno de los elementos
		options.items.forEach(function(item){
			item._id = (Math.random() + 1).toString(36).substring(7);
		});

		self.targets = ko.observableArray(options.items.slice(0)); // Clonamos el array
		self.numbers = ko.observableArray(shuffleArrayFactory.run(options.items)); // Elementos desordenados

		self.targets().forEach(function(target){
			// Debemos agregar una propiedad a cada target para manejar el sortable
			target._sortable = ko.observableArray();
			target._sortable._id = target._id; // Para compararlo usando knockoutSortable

			// Fuera de eso, agregaremos un array con un tamaño igual a número, para así multiplicar las imágenes
			target._multiplier = [];

			for(var i = 0; i < target.number; i++){
				target._multiplier.push(i + 1);
			}

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
			var item = arg.item,
				parent = arg.targetParent;

			if(arg.sourceParent === parent) return;

			if(item._id === parent._id){
				// Respuesta Correcta
				self.rightAnswer(item);
				self.rightAnswers++;
			} else {
				// Respuesta Incorrecta
				self.wrongAnswer(item);
				arg.cancelDrop = true;
			}

			chances--;

			if(chances === 0){
				if (self.rightAnswers >= minRightAnswers) {

					self.success(true); // Trigger de éxito
					$rootScope.isNextEnabled = true; // Activamos el siguiente

					// Se llama la función de éxito, definida por el desarrollador
					if (typeof options.successCallback !== "undefined") options.successCallback();

				} else {
					// Trigger de fracaso
					self.failure(true);
				}
				
			} 
		};

	};

	/**
	 * Inicializa la instancia del ViewModel creado con countElementsActivity.create
	 *
	 * @param {object} instance Intancia del VM de knockout
	 */
	countElementsActivity.run = function (instance) {
		ko.cleanNode($('#main-container')[0]);
		ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
		ko.applyBindings(instance, $('#main-container')[0]);
	};

	return countElementsActivity;

});


lizCountElements.directive('countElements', function  (countElementsActivity) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			description: '@'
		},
		templateUrl: '../views/activities/count_elements.html',
		link: function postLink(scope, element, attrs) {
			// Corremos la aplicación
			countElementsActivity.run(countElementsActivity.create(scope.options));
		}
	}; 
});
