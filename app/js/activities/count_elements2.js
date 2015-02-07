var lizCountElements2 = angular.module('lizCountElements2', ['factories']);

lizCountElements2.directive('countElements2', function  (shuffleArrayFactory) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			hideImages: '@',
			description: '@'
		},
		templateUrl: '../views/activities/count_elements2.html',
		link: function postLink(scope, element, attrs) {

			var opt = scope.options;

			// La diversión empieza aquí!!!
			scope.items = opt.items;
			scope.rightAnswers = 0; // Contador de preguntas correctas

			/**
			 * Función que corre que cuando cambia el valor de un input
			 */
			scope.verifyInput = function (item) {

				// Si no es un número, borramos el input
				if(isNaN(parseInt(item.input))){
					item.input = '';
				}

				// Recorremos todos los elementos. Si se han llenado los inputs mínimos requeridos, activamos el botón de siguiente
				var count = 0;

				count = scope.items.filter(function(item){
					return item.hasOwnProperty('input') && item.input !== '';
				}).length;

				if(count >= opt.minRightAnswers){
					scope.$root.isNextEnabled = true;
				} else {
					scope.$root.isNextEnabled = false;
				}


			}

			scope.$root.beforeGoNext = function () {
				scope.success = true; // Mostramos la vista de felicitación
				return true; // nos permite pasar a la siguiente actividad
			};

		}
	}; 
});

