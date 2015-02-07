var lizTwoGroup = angular.module('lizTwoGroup', []);

// Knockout Pairs Factory
lizTwoGroup.factory('twoGroupActivity', function ($rootScope) {

	var twoGroupActivity = {};

	/**
	 * Crea el ViewModel
	 */
	twoGroupActivity.create = function (options) {
		return new  twoGroupActivity._ViewModel(options);
	}

	/**
	 * Genera el ViewModel de las parejas con sus funcionalidades
	 *
	 * Recibe un objeto con las siguientes propiedades
	 *
	 * @param {object}		opt						Opciones a utilizar.
	 * @param {Array}		opt.data				Información de los elementos. Es necesario que cada una tenga la propiedad:
	 *
	 * 	answer: {boolean} define si la respuesta es correcta o incorrecta y puede ser soltada en el contenedor
	 * 	src: {string} imagen para el elemento
	 * 	alt: {string} texto alternativo
	 *
	 * @param {integer}		opt.chances				Número de posibilidades que tiene el usuario de hacer la actividad
	 * @param {integer}		opt.minRightAnswers		Número mínimo de respuestas correctas
	 * @param {function}	opt.successCallback		Función que se llama cuando se termina la actividad de forma satisfactoria
	 * @param {function}	opt.rightAnswerCallback	Función que se llama cuando la respuesta es correcta
	 * @param {integer}		opt.itemsPerRow			Número de elementos por fila. 3 por defecto
	 * @param {boolean}		opt.priority			Define si el botón de siguiente estará activo desde el inicio
	 *
	 */
	twoGroupActivity._ViewModel = function (opt) {
		var self = this;

		self.groupImg = opt.hasOwnProperty('groupImg') ? opt.groupImg : false;
		self.groupAlt = opt.hasOwnProperty('groupAlt') ? opt.groupAlt : false;

		// Observables 
		self.items = ko.observableArray(opt.data);
		self.target = ko.observableArray();

		// Propiedades por defecto, si no existen
		ko.utils.arrayForEach(self.items(), function(item){
			if(! item.hasOwnProperty('answer')) item.answer = true;
			if(! item.hasOwnProperty('title')) item.title = ''; 
			if(! item.hasOwnProperty('text')) item.text = false; 
		});

		// Ruta a la carpeta de imágenes
		self.resources = $rootScope.resources;
		self.itemsPerRow = typeof opt.itemsPerRow !== "undefined" ? opt.itemsPerRow : 3;

		// Disparador de preguntas correctas/incorrectas
		self.rightAnswer = ko.observable();
		self.wrongAnswer = ko.observable();

		self.success = ko.observable(false);
		self.failure = ko.observable(false);

		self.rightAnswers = 0;

		self.chances = opt.chances ? opt.chances : opt.data.length;
		self.totalRightAnswer = opt.totalRightAnswer ? opt.totalRightAnswer : opt.data.length;
		self.priority = opt.priority

		// audio
		self.audio = ko.observable(opt.audio);

		/**
		 * Reproduce el audio de la instrucción.
		 */
		self.playAudio = function () {
			$('#audio-instruction')[0].play();
		};

		/**
		 *	Función que se ejecuta al soltar el objeto dentro del contenedor
		 */
		self.verifyAnswer = function (arg) {

			// No hacer nada y salir de la función, si el elemento se soltó en el mismo grupo inicial
			if(arg.sourceParent() == arg.targetParent()) return;

			// Calculamos si la respuesta es correcta o no usando la propiedad 'answer'
			if (arg.item.answer) {
				// Respuesta correcta
				self.rightAnswer(arg.item);
				arg.cancelDrop = true;
				self.rightAnswers++;
        	// Llama a la función de respuesta buena
			if (typeof opt.rightAnswerCallback !== "undefined") opt.rightAnswerCallback();
			} else {
				// Respuesta Incorrecta
				self.wrongAnswer(arg.item);
				arg.cancelDrop = true; // Devuelve el elemento a su posición origina
			}
		

			// Reducimos las posibilidades
			self.chances--;

			// Fin de la actividad
			if (self.chances === 0 || self.rightAnswers >= self.totalRightAnswer ) {
				if(self.rightAnswers >= opt.minRightAnswers) {
					// éxito
					self.success(true);

					// Llama a la función de éxito
					if (typeof opt.successCallback !== "undefined") opt.successCallback();

					// Eliminamos beforeGoNext, si existe
					if(self.priority){
						$rootScope.beforeGoNext = undefined; // Limpiamos la función	
					}

					// Activamos la siguiente ruta
					$rootScope.isNextEnabled = true;

				} else {
					// Fracaso
					self.failure(true);
				}
			}

			// Si hay prioridad, activa/desactiva el botón de siguiente
			if(self.priority){
				if(self.rightAnswers >= opt.minRightAnswers) $rootScope.isNextEnabled = true;
				else $rootScope.isNextEnabled = false;

				$rootScope.$apply();
			}
		};

		// ===========================================================================
		// Si se a decidido usar la prioridad
		// ===========================================================================
		if(self.priority){

			$rootScope.beforeGoNext = function () {
				// Si el número de elementos es mayor al número de respuestas requeridas: ÉXITO!!!
				if(self.target().length >= opt.minRightAnswers){

					if (typeof opt.successCallback !== "undefined") opt.successCallback();
					self.success(true);
					return true; 

				} else {

					self.failure(true);
					return false; 

				}
			};

		}

	};

	/**
	 * Inicializa la instancia del ViewModel creado con oneGroupActivity.create
	 *
	 * @param {object} instance Intancia del VM de knockout
	 */
	twoGroupActivity.run = function (instance) {
		ko.cleanNode($('#main-container')[0]);
		ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
		ko.applyBindings(instance, $('#main-container')[0]);
	};

	return twoGroupActivity;

});

lizTwoGroup.directive('twoGroup', function  (twoGroupActivity) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			audio: '@',
			description: '@',
			title: '@'
		},
		templateUrl: '../views/activities/two_group.html',
		link: function postLink(scope, element, attrs) {
			// Añadimos el audio a options
			scope.options.audio = typeof scope.audio !== "undefined" ? scope.audio : false;

			twoGroupActivity.run(twoGroupActivity.create(scope.options));
		}
	}; 
});

