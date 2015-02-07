var lizDropOut = angular.module('lizDropOut', []);

lizDropOut.factory('dropOutActivity', function ($rootScope) {
    
	var dropOutActivity = {};

	/**
	 * Crea el ViewModel
	 */
	dropOutActivity.create = function (options) {
		return new dropOutActivity._ViewModel(options);
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
    dropOutActivity._ViewModel = function (options) {
        var self = this;

        // Variables para sortables
        self.items = ko.observableArray(options.items);
        self.outside = ko.observableArray();

		ko.utils.arrayForEach(self.items(), function (item) {
			if(! item.hasOwnProperty('answer')) item.answer = true;
		});

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
	 * Inicializa la instancia del ViewModel creado con dropOutActivity.create
	 *
	 * @param {object} instance Intancia del VM de knockout
	 */
    dropOutActivity.run = function (instance) {
    	ko.cleanNode($('#main-container')[0]);
		ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
		ko.applyBindings(instance, $('#main-container')[0]);
    };

	return dropOutActivity;
});

lizDropOut.directive('dropOut', function  (dropOutActivity) {
    return {
        restrict: 'E',
		scope: {
			options: '=',
			description: '@'
		},
        templateUrl: '../views/activities/drop_out.html',
		link: function postLink(scope, element, attrs) {
			dropOutActivity.run(dropOutActivity.create(scope.options));
        }
    }; 
});

