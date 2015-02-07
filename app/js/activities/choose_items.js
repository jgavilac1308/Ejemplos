/**
 * La actividad permite seleccionar varios elementos dando click.
 */
var lizChooseItems = angular.module('lizChooseItems', []);

lizChooseItems.directive('chooseItems', function(){
	return  {
		restrict: 'E',
		templateUrl: '../views/activities/choose_items.html',
		transclude: true,
		scope: {
			options: "=",
			description: "@",
			audio: "@"
		},
		link: function(scope, element, attrs){

			// Variables de éxito - fracaso
			scope.success = false;
			scope.failure = false;

			scope.chances = scope.options.chances ? scope.options.chances : scope.options.items.lenght; // Posibilidades de realizar la actividad
			scope.rightAnswers = 0; // contador de respuestas buenas
			scope.minRightAnswers = scope.options.minRightAnswers; // número mínimo de respuestas
			scope.itemsfloat = scope.options.itemsfloat ? scope.options.itemsfloat : false;
			scope.activateAfter = scope.options.activateAfter ? scope.options.activateAfter : false;


			// Disparadores para las preguntas buenas y malas
			scope.rightAnswer = false;
			scope.wrongAnswer = false;

			scope.verify = function (item) {
				// para impedir que se repitan letras
				if(item._completed) return;

				item._completed = true;

				if (item.answer) {
					// respuesta buena
					scope.rightAnswer = item;
					scope.rightAnswers++;
				} else {
					// Respuesta incorrecta
					scope.wrongAnswer = item;
				}

				scope.chances--;

				// Fin de la actividad
				if(scope.chances === 0) {
					if (scope.rightAnswers >= scope.minRightAnswers) {
						scope.success = true;

						// Activamos la siguiente
						scope.$root.isNextEnabled = true;
					} else {
						scope.failure = true;
					}
				}

				// si activateAfter esta definido 
				if(scope.activateAfter){
					if(scope.rightAnswers === scope.activateAfter){
						// Activamos la siguiente
						scope.$root.isNextEnabled = true;
					}
				}
			};	
		}
	};
});

