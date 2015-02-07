var lizSequences = angular.module('lizSequences', []);

// Knockout Pairs Factory
lizSequences.factory('sequencesActivity', function ($rootScope, shuffleArrayFactory) {

	var sequencesActivity = {};

	/**
	 * Crea el ViewModel
	 */
	sequencesActivity.create = function (options) {
		return new sequencesActivity._ViewModel(options);
	}

	/**
	 * Genera el ViewModel de las parejas con sus funcionalidades
	 *
	 * Recibe un objeto con las siguientes propiedades
	 *
	 * @param {object}		options						Opciones a utilizar.
	 *
	 *
	 * @param {integer}		options.chances				Número de posibilidades que tiene el usuario de hacer la actividad
	 * @param {integer}		options.minRightAnswers		Número mínimo de respuestas correctas
	 * @param {function}	options.successCallback		Función que se llama cuando se termina la actividad de forma satisfactoria
	 * @param {function}	options.rightAnswerCallback	Función que se llama cuando la respuesta es correcta
	 *
	 */
	sequencesActivity._ViewModel = function (options) {
		var self = this;

		// Clase para sortables en la secuencia
		self.sequenceSortable = function (id) {
			this._sortable = ko.observableArray([]);
			this._sortable._id = id;
		};

		// Inicializa las opciones
		var chances = options.hasOwnProperty('chances') ? options.chances : options.spaces,
		 minRightAnswers = options.hasOwnProperty('minRightAnswers') ? options.minRightAnswers : options.spaces,
		 sequence = options.sequence,
		 tempId = 0, // id temporal que se añade a la secuencia
		 tempSequenceSortable = {}, // Variable Auxiliar
		 spaces = options.spaces; // Espacios en blanco


		// Antes que nada, debemos generar los id de los items
		options.items.forEach(function(item, index){
			item._id = index;
		});

		self.draggables = ko.observableArray( shuffleArrayFactory.run(options.items.slice(0)) ); // Elementos usados para el arrastre
		self.sequence = ko.observableArray([]);

		// Configuramos la secuencia
		for(var i=0; i < self.draggables().length + spaces; i++){
			// Alargamos la secuencia, usando tempId
			tempId = sequence[i - (sequence.length * Math.floor(i / sequence.length))];

			// Creamos el objeto
			tempSequenceSortable = new self.sequenceSortable(tempId);

			// Añadimos la muestra
			if(sequence.length > i){
				tempSequenceSortable._sortable.push( options.items[i] );
			}
			
			self.sequence.push(tempSequenceSortable); // añadimos a la secuencia
		}

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
		 * Define si el target esta lleno utilizando self.maximumElements
		 */
		self.isContainerFull = function (parent) {
			return parent().length < self.maximumElements;
		};

		/**
		 * Estilos de los items de secuencia
		 */
		self.getItemStyles = function () {
			return "width: " + (100 / self.sequence().length) + "%;";
		};

		/**
		 * Función que se ejecuta cuando se suelta el elemento y hace toda la funcionalidad
		 */
		self.verifyAnswer = function (arg) {

			var parent = arg.targetParent,
				item = arg.item;

			if(parent._id === item._id){
				// RESPUESTA CORRECTA
				self.rightAnswers++;
				self.rightAnswer(item);

				spaces--; // Reducimos los espacios para poder definir el fin de la actividad

				// Si se definió una función cuando la respuesta es correcta, se corre
				if(typeof options.rightAnswerCallback !== "undefined" ) options.rightAnswerCallback(item);

			} else {
				// RESPUESTA INCORRECTA
				self.wrongAnswer(item);
				arg.cancelDrop = true;
			}

			// Reducimos en 1 las posibilidades
			chances--;

			// La actividad termina cuando el número de posibilidades se termina
			if(chances === 0 || spaces === 0) {

				// Si el número de respuestas correctas es mayor o igual al requerido inicialmente
				if(self.rightAnswers >= minRightAnswers) {
					self.success(true); // Trigger de éxito
					$rootScope.isNextEnabled = true; // Activamos el siguiente

					// Se llama la función de éxito, definida por el desarrollador
					if (typeof options.successCallback !== "undefined") options.successCallback();
				} else {
					self.failure(true); // Trigger de fracaso
				}

			}

		};
	};

	/**
	 * Inicializa la instancia del ViewModel creado con sequencesActivity.create
	 *
	 * @param {object} instance Intancia del VM de knockout
	 */
	sequencesActivity.run = function (instance) {
		ko.cleanNode($('#main-container')[0]);
		ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
		ko.applyBindings(instance, $('#main-container')[0]);
	};

	return sequencesActivity;

});


lizSequences.directive('sequences', function  (sequencesActivity) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			options: '=',
			description: '@'
		},
		templateUrl: '../views/activities/sequences.html',
		link: function postLink(scope, element, attrs) {

			// Corremos la aplicación
			var vm = sequencesActivity.create(scope.options);
			sequencesActivity.run(vm);
		}
	}; 
});
