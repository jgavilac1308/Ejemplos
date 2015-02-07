var lizDropImageSample = angular.module('lizDropImageSample', []);

// Knockout Pairs Factory
lizDropImageSample.factory('dropImageSampleActivity', function ($rootScope, shuffleArrayFactory) {

	var dropImageSampleActivity = {};

	/**
	 * Crea el ViewModel
	 */
	dropImageSampleActivity.create = function (options) {
		return new dropImageSampleActivity._ViewModel(options);
	}

	/**
	 * Genera el ViewModel de las parejas con sus funcionalidades
	 *
	 * Recibe un objeto con las siguientes propiedades
	 *
	 * @param {object}		opt						Opciones a utilizar.
	 *
	 *	target: Permite darle un orden apropiado a los targets. Debe empezar desde 0 y la propiedad opt.randomTargets debe estar desactivada
	 *
	 * @param {integer}		opt.chances				Número de posibilidades que tiene el usuario de hacer la actividad
	 * @param {integer}		opt.minRightAnswers		Número mínimo de respuestas correctas
	 * @param {function}	opt.successCallback		Función que se llama cuando se termina la actividad de forma satisfactoria
	 * @param {function}	opt.rightAnswerCallback	Función que se llama cuando la respuesta es correcta
	 *
	 */
	dropImageSampleActivity._ViewModel = function (opt) {
		var self = this;

		// Inicializa las opciones
		var	minRightAnswers = opt.minRightAnswers ? opt.minRightAnswers : opt.targets.length,
		chances = opt.chances ? opt.chances : opt.targets.length;

		self.items = ko.observableArray(shuffleArrayFactory.run(opt.targets)); // Elementos a lanzar 

		// Agregamos una propiedad _index a cada uno de los items para poder organizarlos de forma absoluta
		for(var i=0; i < self.items().length; i++){
			self.items()[i]._id = i;

			// extension de la imagen
			self.items()[i].extension = self.items()[i].hasOwnProperty('extension') ?  self.items()[i].extension : 'png' ;
		}

		self.targets = ko.observableArray(self.items().slice(0)); // copia a los targets, donde caerán los elementos

		self.canvas = opt.canvas;
		self.canvasAlt = opt.canvasAlt;

		self.sample = typeof opt.sample !== 'undefined' ? opt.sample : false;
		self.sampleAlt = typeof opt.sampleAlt !== 'undefined' ? opt.sampleAlt : false;

		// audio
		self.audio = ko.observable(opt.audio);

		self.itemsContainerHeight = opt.itemsContainerHeight; // Para darle un tamaño fijo al contenedor de items y no quede vacío

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

		ko.utils.arrayForEach(self.targets(), function(target){
			target.sortable = ko.observableArray(); // Donde caen los elementos
			target.sortable._id = target._id; // Id de comparación
		});

		/**
		 * Reproduce el audio de la instrucción.
		 */
		self.playAudio = function () {
			$('#audio-instruction')[0].play();
		};

		// Define si el target esta lleno utilizando self.maximumElements
		self.isContainerFull = function (parent) {
			return parent().length < self.maximumElements;
		};

		// Función que se ejecuta cuando se suelta el elemento y hace toda la funcionalidad
		self.verifyAnswer = function (arg) {
			var parent = arg.targetParent,
			item = arg.item;


			// Compara el _id para encontrar la pareja idéntica. Si es igual, la respuesta es correcta
			if(parent._id === item.sortable._id){

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

		/**
		 * Devuelve los estilos de los elementos
		 */
		self.getItemStyles = function (item) {
			var styles = '';

			styles += "width: " + (100 / self.targets().length) + "%;";
			styles += "left: " + ((100 / self.targets().length) * item._id) + "%;";

			return styles;
		};

		/**
		 * Devuelve los estilos de los targets
		 */
		self.getTargetStyles = function (target) {
			var styles = '',
				pos = target.targetPos;

			styles += "width: " + pos.w + "%;";
			styles += "height: " + pos.h + "%;";
			styles += "top: " + pos.t + "%;";
			styles += "left: " + pos.l + "%;";

			return styles;
		};

		/**
		 * Devuelve los estilos de los targets
		 */
		self.getTargetInnerStyles = function (target) {
			var styles = '',
				pos = target.innerPos;

			styles += "width: " + pos.w + "%;";
			styles += "height: " + pos.h + "%;";

			// Usamos margin, debido a que el padre mide 0x0
			styles += "margin-top: " + pos.t + "%;"; 
			styles += "margin-left: " + pos.l + "%;";

			return styles;
		};


	};

	/**
	 * Inicializa la instancia del ViewModel creado con dropImageSampleActivity.create
	 *
	 * @param {object} instance Intancia del VM de knockout
	 */
	dropImageSampleActivity.run = function (instance) {
		ko.cleanNode($('#main-container')[0]);
		ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
		ko.applyBindings(instance, $('#main-container')[0]);
	};

	return dropImageSampleActivity;

});

lizDropImageSample.directive('dropImageSample', function  (dropImageSampleActivity) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			audio: '@',
			description: '@'
		},
		templateUrl: '../views/activities/drop_image_sample.html',
		link: function postLink(scope, element, attrs) {
			// Añadimos el audio a options
			scope.options.audio = typeof scope.audio !== "undefined" ? scope.audio : false;

			// Corremos la aplicación
			var vm = dropImageSampleActivity.create(scope.options);
			dropImageSampleActivity.run(vm);
		}
	}; 
});
