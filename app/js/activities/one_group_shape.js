var lizOneGroupShape = angular.module('lizOneGroupShape', []);

lizOneGroupShape.factory('oneGroupShapeActivity', function ($rootScope) {

	var oneGroupShapeActivity = {};

	/**
	 * Crea el ViewModel
	 */
	oneGroupShapeActivity.create = function (options) {
		return new oneGroupShapeActivity._ViewModel(options);
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
	oneGroupShapeActivity._ViewModel = function (options) {
		var self = this;

		self.items = ko.observableArray(options.items); // Elementos a arrastrar
		self.canvas = options.canvas; // Forma del grupo
		self.canvasAlt = options.canvasAlt; // texto alternativo de la forma

		ko.utils.arrayForEach(self.items(), function (item) {
			if(! item.hasOwnProperty('answer')) item.answer = true; // Define si el objeto es una respuesta correcta
			if(! item.hasOwnProperty('startsInGroup')) item.startsInGroup = false; // Define si el objeto empieza insertado en el grupo
		});

		// Insertamos los elementos marcados en el grupo, removiéndolos de self.items
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
		 * Inicializa la instancia del ViewModel creado con oneGroupShapeActivity.create
		 *
		 * @param {object} instance Intancia del VM de knockout
		 */
		oneGroupShapeActivity.run = function (instance) {
			ko.cleanNode($('#main-container')[0]);
			ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
			ko.applyBindings(instance, $('#main-container')[0]);
		};

		return oneGroupShapeActivity;
});

lizOneGroupShape.directive('oneGroupShape', function  (oneGroupShapeActivity) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			description: '@'
		},
		templateUrl: '../views/activities/one_group_shape.html',
		link: function postLink(scope, element, attrs) {
			oneGroupShapeActivity.run(oneGroupShapeActivity.create(scope.options));
		}
	}; 
});

