/**
 * La actividad permite completar inputs con falso "F" o verdadero "V".
 */
var lizCompleteInputsTrueFalse = angular.module('lizCompleteInputsTrueFalse', []);

lizCompleteInputsTrueFalse.directive('completeInputsTrueFalse', function () {
	return {
		restrict: 'E',
		templateUrl: '../views/activities/complete_inputs_true_false.html',
 		scope: {
 			options: '=',
 			instruction: '@',
 			title: '@',
 			description: '@',
 			audio: '@'
 		},
		link: function (scope, iElement, iAttrs) {
			// Inputs procesados
			scope.words = [];

			// Procesamos cada elemento del array entrante
			angular.forEach(scope.inputs, function (input) {
				scope.words.push({ word: input, right: false, wrong: false });
			});

			scope.rightAnswers = 0;
			scope.complete = false; // Cuando termina la actividad
			scope.block = false;
			scope.success = false;
			scope.failure = false;

			// watch if the activity is finished
			scope.$watch('complete', function(complete) {
				if (complete) {
					if (scope.rightAnswers >= scope.options.data.length || scope.rightAnswers >= scope.options.minRightAnswers) {
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

			scope.items = scope.options.data;
			if (scope.options.aOptions) {
				scope.aOptions = scope.options.aOptions;
			}

			// Si la descripción o el título están, entonces la instrucción va al fondo
			scope.isBottom = scope.title || scope.description;

			var counter = 0
			var chances = scope.options.chancesPerItem-1

			scope.verify = function (item) {
				if ((item.input == null ) || (item.input == "" )) return;

				// Verificamos la respuesta. Añadimos una propiedad right o wrong para definir si el item es correcto o no
				if(item.input.toLowerCase() === item.answer.toLowerCase()){
					scope.rightAnswers++;
					item.wrong = false;
					item.right = true;
					item.block = true; // marcamos el item como completo, para desactivar el input
					counter++;
				} else {
					
					item.wrong ? chances=scope.options.chancesPerItem-2: chances=scope.options.chancesPerItem-1;

                	item.wrong = true;
                	

                    	if(chances === 0){
                    	item.block = true;
                    	item.input = item.answer;
                    	counter++;
                    	chances=scope.options.chancesPerItem-1;
                    	}else{chances--;item.input="";}
				}

				if(counter === scope.options.data.length){
                    	
                    scope.complete = true;
                	
                }
			}
		}
	};
});