/**
 * La actividad permite completar palabras en inputs
 */
var lizCompleteInputs = angular.module('lizCompleteInputs', []);

lizCompleteInputs.directive('completeInputs', function(){
	return  {
		restrict: 'E',
		templateUrl: '../views/activities/complete_inputs.html',
		scope: {
			inputs: "=",
			description: '@'
		},
		link: function(scope, element, attrs){
			// Inputs procesados
			scope.words = [];

			// Procesamos cada elemento del array entrante
			angular.forEach(scope.inputs, function (input) {
				scope.words.push({ word: input, right: false, wrong: false });
			});

			scope.rightAnswers = 0; // número de respuestas correctas
			scope.complete = false; // Cuando termina la actividad

			scope.success = false;
			scope.failure = false;

			// watch if the activity is finished
			scope.$watch('complete', function(complete) {
				if (complete) {
					if (scope.rightAnswers >= 3) {
						// éxito
						scope.success = true;

						// Activamos la siguiente actividad o ruta
						scope.$root.isNextEnabled = true;
					} else {
						// fracaso
						scope.failure = true;
					}
				}
			});

		}
	};
});

lizCompleteInputs.directive('compare', function () {
    return {
        scope: {
            compare: '=compare',
            counter: '=counter',
            complete: '=complete'
        },
        link: function (scope, element, attrs) {
            element.bind('keyup', function () {
                if (element.val().length == scope.compare.word.length) {
                    // Good answer -> increase good answers
                    if (element.val() === scope.compare.word) {
                        scope.compare.right = true;
                    } else {
                        scope.compare.wrong = true;
                    }

                    scope.counter++;

                    element.attr('disabled', 'disabled');
                    var inputs = element.closest('form').find(':input:visible');

                    if(scope.counter === inputs.length){
                    	
                        scope.complete = true;
                    	
                    }

                    inputs.eq(inputs.index(element) + 1).focus();

                    scope.$apply();
                }
            });
        }
    }
});

