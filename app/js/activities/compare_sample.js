var lizCompareSample = angular.module('lizCompareSample', ['factories']);

lizCompareSample.directive('compareSample', function  (shuffleArrayFactory) {
    return {
        restrict: 'E',
		scope: {
			options: '=',
			description: '@'
		},
        templateUrl: '../views/activities/compare_sample.html',
		link: function postLink(scope, element, attrs) {

			scope.groups = shuffleArrayFactory.run(scope.options.groups); // Filas
			scope.chances = scope.options.hasOwnProperty('chances') ? scope.options.chances : scope.groups.length;
			scope.minRightAnswers = scope.options.hasOwnProperty('minRightAnswers') ? scope.options.minRightAnswers : scope.groups.length;
			scope.rightAnswers = 0; // respuestas correctas

			// variables que activan la pantalla de felicitaciones/vuelve a intentarlo
			scope.success = false;
			scope.failure = false;

			angular.forEach(scope.groups, function (group) {
				group.items = shuffleArrayFactory.run(group.items);
			});

			/**
			 * Obtiene los estilos de los items
			 */
			scope.getItemStyles = function (items) {
				return "width: " + (100 / items.length) + "%;";
			};

			/**
			 * Verifica si la respuesta es correcta/incorrecta
			 */
			scope.verify = function (item, group) {
				
				// Verificamos que el grupo no haya sido completado aún
				if(group.hasOwnProperty('_completed')) return;

				group._completed = true; //se define el grupo como terminado

				if(item.hasOwnProperty('answer')){
					// Respuesta Correcta
					item.isRight = true;
					scope.rightAnswers++;
				} else {
					// Respuesta Incorrecta
					item.isWrong = true;
				}

				scope.chances--;

				// Término de la actividad
				if (scope.chances === 0) {
					if(scope.rightAnswers >= scope.minRightAnswers){
						// éxito
						scope.success = true;
						scope.$root.isNextEnabled = true; // Activamos el botón de siguiente
					} else {
						// Fracaso
						scope.failure = true;
					}
				}
			};
		}
	}; 
});
