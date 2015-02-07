var lizSoundGroups = angular.module('lizSoundGroups', []);

lizSoundGroups.factory('soundGroupsActivity', function ($rootScope) {

	var soundGroupsActivity = {};

	/**
	 * Crea el ViewModel
	 */
	soundGroupsActivity.create = function (options) {
		return new soundGroupsActivity._ViewModel(options);
	}

	/**
	 * Genera el ViewModel de las parejas con sus funcionalidades
	 *
	 * Recibe un objeto con las siguientes propiedades
	 *
	 * @param {object}		options						Opciones a utilizar.
	 *
	 * @param {integer}		options.chances				Número de posibilidades que tiene el usuario de hacer la actividad
	 * @param {integer}		options.minRightAnswers		Número mínimo de respuestas correctas
	 * @param {function}	options.successCallback		Función que se llama cuando se termina la actividad de forma satisfactoria
	 * @param {function}	options.rightAnswerCallback	Función que se llama cuando la respuesta es correcta
	 *
	 */
	soundGroupsActivity._ViewModel = function (options) {
		var self = this;

	// Sonido de grupo
	self.sound = ko.observable(options.sound);

	// Variables para sortables
	self.items = ko.observableArray(options.items);

	ko.utils.arrayForEach(self.items(), function (item) {
		if(! item.hasOwnProperty('answer')) item.answer = true;
		if(! item.hasOwnProperty('startsInGroup')) item.startsInGroup = false;
	});

	self.group = ko.observableArray(self.items.remove(function(item){
		return item.startsInGroup;
	}));

	// Ruta a la carpeta de imágenes
	self.resources = $rootScope.resources;

	// Disparador de preguntas correctas/incorrectas
	self.rightAnswer = ko.observable();
	self.wrongAnswer = ko.observable();

	self.success = ko.observable(false);
	self.failure = ko.observable(false);

	self.rightAnswers = 0;

	self.chances = options.chances ? options.chances : options.items.length;

	/**
	 * reproducir sonido
	 */
	self.playSound = function () {
		$('#audio-group')[0].play();
	};


	/**
	 * Obtiene los estilos de cada elemento
	 */
	self.getStyles = function (item) {
		var styles = '';

		if(! item.answer) return;

		styles += 'width: ' + item.w + '%;';
		styles += 'height: ' + item.h + '%;';
		styles += 'top: ' + item.t + '%;';
		styles += 'left: ' + item.l + '%;';

		return styles;
	}

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
		self.rightAnswers++;

		// Llama a la función de respuesta buena
		if (typeof options.rightAnswerCallback !== "undefined") options.rightAnswerCallback();

	} else {
		// Respuesta Incorrecta
		self.wrongAnswer(arg.item);
		arg.cancelDrop = true; // Devuelve el elemento a su posición origina
	}

	// Reducimos las posibilidades
	self.chances--;

	// Fin de la actividad
	if (self.chances === 0) {
		if(self.rightAnswers >= options.minRightAnswers) {
			// éxito
			self.success(true);

			// Llama a la función de éxito
			if (typeof options.successCallback !== "undefined") options.successCallback();

			// Activamos la siguiente ruta
			$rootScope.isNextEnabled = true;
		} else {
			// Fracaso
			self.failure(true);
		}
	}
};

		};

		/**
		 * Inicializa la instancia del ViewModel creado con soundGroupActivity.create
		 *
		 * @param {object} instance Intancia del VM de knockout
		 */
		soundGroupsActivity.run = function (instance) {
			ko.cleanNode($('#main-container')[0]);
			ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
			ko.applyBindings(instance, $('#main-container')[0]);
		};

		return soundGroupsActivity;
});

lizSoundGroups.directive('soundGroups', function  (soundGroupsActivity) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			description: '@'
		},
		templateUrl: '../views/activities/sound_groups.html',
		link: function postLink(scope, element, attrs) {
			soundGroupsActivity.run(soundGroupsActivity.create(scope.options));
		}
	}; 
});

