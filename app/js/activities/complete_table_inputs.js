/**
 * La actividad permite completar inputs en un table de acuerdo a 
 * unas condiciones.
 */

var lizCompleteTableInputs = angular.module('lizCompleteTableInputs', []);

lizCompleteTableInputs.directive('completeTableInputs', function () {
 	return {
 		restrict: 'E',
 		templateUrl: '../views/activities/complete_table_inputs.html',
 		scope: {
 			options: '=',
 			instruction: '@',
 			audio: '@'
 		},
 		link: function (scope, iElement, iAttrs) {
 			console.log(iAttrs);
			// Inputs procesados
			scope.words = [];

			// Procesamos cada elemento del array entrante
			angular.forEach(scope.inputs, function (input) {
				scope.words.push({ word: input, right: false, wrong: false });
			});

			scope.tableTextTitle = scope.options.tableTextTitle;
			scope.inputTextTitle = scope.options.inputTextTitle;
			scope.rightAnswers = 0;
			scope.complete = false; // Cuando termina la actividad
			scope.block = false;
			scope.success = false;
			scope.failure = false;

			// watch if the activity is finished
			scope.$watch('complete', function(complete) {
				if (complete) {
					if (scope.rightAnswers >= scope.options.data.length) {
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

			// Si la descripción o el título están, entonces la instrucción va al fondo
			scope.isBottom = scope.title || scope.description;

			var counter = 0
			var chances = scope.options.chancesPerItem-1

			scope.verify = function (input) {
				// aquí se hace lo que quiera con el input
				var letters = /^[A-Za-z]+$/;

				if((input.input.match(letters) !== null) && (input.input !="" )) {
                    	
                	input.wrong = false;
                    input.right = true;
                    input.block = true;
                    scope.rightAnswers++;
                    counter++;
                                                                   
                }

                if((input.input.match(letters) === null) && ((input.input != null ) && (input.input != "" ))) {
	                    	
	                    	
                    	input.wrong ? chances=scope.options.chancesPerItem-2: chances=scope.options.chancesPerItem-1;

                    	input.wrong = true;
                    	

	                    	if(chances === 0){
	                    	input.block = true;
	                    	counter++;
	                    	chances=scope.options.chancesPerItem-1;
	                    	}else{chances--;input.input="";}
            	}

            	if(counter === scope.options.data.length){
                    	
                    scope.complete = true;
                	
                }
                
			}
 		}
 	};
});