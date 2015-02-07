var lizMultipleSelection = angular.module('lizMultipleSelection', ['factories']);

lizMultipleSelection.directive('multipleSelection', function  (shuffleArrayFactory) {
    return {
        restrict: 'E',
		scope: {
			options: '=',
			description: '@'
		},
        templateUrl: '../views/activities/multiple_selection.html',
		link: function postLink(scope, element, attrs) {

			scope.items = shuffleArrayFactory.run(scope.options.items);
			scope.optionsPerRow = scope.options.hasOwnProperty('optionsPerRow') ? scope.options.optionsPerRow : false;

			// Revolvemos las opciones
			angular.forEach(scope.items, function(item){
				item.options = shuffleArrayFactory.run(item.options);
			});

			// Variables de éxito - fracaso
			scope.success = false;
			scope.failure = false;

			scope.chances = typeof scope.options.chances !== "undefined" ? scope.options.chances : scope.items.length; // Posibilidades de realizar la actividad
			scope.rightAnswers = 0; // contador de respuestas buenas
			scope.minRightAnswers = scope.options.minRightAnswers; // número mínimo de respuestas

			// Disparadores para las preguntas buenas y malas
			scope.rightAnswer = false;
			scope.wrongAnswer = false;

			/**
			 * Verifica la respuesta
			 */
			scope.verify = function (item, option) {

				if (option.answer) {
					// respuesta buena
					item.isRight = true;

					scope.rightAnswers++;
				} else {
					// Respuesta incorrecta
					item.isWrong = true;
				}

				scope.chances--;

				//// Fin de la actividad
				if(scope.chances === 0) {
					if (scope.rightAnswers >= scope.minRightAnswers) {
						scope.success = true;

						// Activamos la siguiente
						scope.$root.isNextEnabled = true;
					} else {
						scope.failure = true;
					}
				}
			};	

			/**
			 * Estilos de las opciones
			 */
			scope.getOptionsStyles = function () {

				// Si se define el número de elementos por ronda, devolvemos los estilos definidos
				if(scope.optionsPerRow)
					return "width: " + (100 / scope.optionsPerRow) + "%; float: left";

				// Por defecto
				return "";

			};

		}
	}; 
});
