var lizDragDropMark = angular.module('lizDragDropMark', []);

// Knockout Pairs Factory
lizDragDropMark.factory('dragDropMarkActivity', function ($rootScope) {

	var dragDropMarkActivity = {};

	/**
	 * Crea el ViewModel
	 */
	dragDropMarkActivity.create = function (options) {
		return new dragDropMarkActivity._ViewModel(options);
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
	dragDropMarkActivity._ViewModel = function (options) {
		var self = this,
				rightAnswers = 0,
				chances = typeof options.chances !== "undefined" ? options.chances : options.items.length,
				minRightAnswers = options.minRightAnswers,
				maximumElements = 1;

		// ordena el array de forma aleatoria usando el algoritmo de Fisher-Yates
		self.shuffleArray = function(array) {
			for (var i = array.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
			return array;
		};

		var number = 1
		self.items = ko.observableArray(options.items);

		// Añadimos a cada item un observableArray para que puedan recibir las marcas
		ko.utils.arrayForEach(self.items(), function(item,index){
			item._target = ko.observableArray();
			item._target._id = item.answer; // para poder identificar si esta bueno o malo

			// Propiedades por defecto
			item.resource = item.hasOwnProperty('resource') ? item.resource : false;
			item.alt = item.hasOwnProperty('alt') ? item.alt : '';
			item.text = item.hasOwnProperty('text') ? item.text : false;
			item.question = item.hasOwnProperty('question') ? item.question : false;
			item.number = item.hasOwnProperty('question') ? number : false;
			number ++
			console.log(item.number);
		});

		// Carpeta de recursos desde angular
		self.resources = $rootScope.resources;

		// audio
		self.audio = ko.observable(options.audio);

		// Triggers que se activan cuando la respuesta es correcta/incorrecta
		self.rightAnswer = ko.observable();
		self.wrongAnswer = ko.observable();

		// Triggers cuando la actividad termina satisfactoria y/o insatisfactoriamente
		self.failure = ko.observable(false);
		self.success = ko.observable(false);

		// Marcas
		self.rightMark = ko.observable({ right: true });
		self.wrongMark = ko.observable({ right: false });


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
			return parent().length < maximumElements;
		};


		/**
		 * Función que se ejecuta al soltar los elementos
		 */
		self.verifyAnswer = function (arg) {
			var item = arg.item,
			target = arg.targetParent;

			if(target._id === item.right){
				// respuesta correcta
				self.rightAnswer(item);
				rightAnswers++;

				if(typeof options.rightAnswerCallback !== "undefined") options.rightAnswerCallback(item);
			} else {
				// respuesta incorrecta
				self.wrongAnswer(item);
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
	 * Inicializa la instancia del ViewModel creado con dragDropMarkActivity.create
	 *
	 * @param {object} instance Intancia del VM de knockout
	 */
	dragDropMarkActivity.run = function (instance) {
		ko.cleanNode($('#main-container')[0]);
		ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
		ko.applyBindings(instance, $('#main-container')[0]);
	};

	return dragDropMarkActivity;

});


lizDragDropMark.directive('dragDropMark', function  (dragDropMarkActivity) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			options: '=',
			audio: '@',
			customClass: '@',
			description: '@'
		},
		templateUrl: '../views/activities/drag_drop_mark.html',
		link: function postLink(scope, element, attrs) {
			// Añadimos el audio a options
			scope.options.audio = typeof scope.audio !== "undefined" ? scope.audio : false;


			// Corremos la aplicación
			dragDropMarkActivity.run(dragDropMarkActivity.create(scope.options));
		}
	}; 
});
