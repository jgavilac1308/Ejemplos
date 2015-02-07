/**
 * La actividad permite completar inputs en un table de acuerdo a 
 * las imagenes que se hubican en la primera columna.
 */
var lizCompleteTableImageInputs = angular.module('lizCompleteTableImageInputs', []);

 lizCompleteTableImageInputs.directive('completeTableImageInputs', function () {
 	return {
 		restrict: 'E',
 		templateUrl: '../views/activities/complete_table_image_inputs.html',
 		scope: {
 			options: '=',
 			instruction: '@',
 			title: '@',
 			description: '@',
 			audio: '@',
 			mainimg: '@',
 			alt: '@'
 		},
 		link: function (scope, iElement, iAttrs) {
 			// Inputs procesados
			scope.words = [];

			// Procesamos cada elemento del array entrante
			angular.forEach(scope.inputs, function (input) {
				scope.words.push({ word: input, right: false, wrong: false });
			});

			scope.textImageTitle = scope.options.textImageTitle;
			scope.textInput1Title = scope.options.textInput1Title;
			scope.textInput2Title = scope.options.textInput2Title;
			scope.rightAnswers = 0;
			scope.complete = false; // Cuando termina la actividad
			scope.block = false;
			scope.success = false;
			scope.failure = false;

			// watch if the activity is finished
			scope.$watch('complete', function(complete) {
				if (complete) {
					if (scope.rightAnswers >= scope.options.minRightAnswers) {
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

			var counter = 0;
			var chances = scope.options.chancesPerItem-1;

			scope.verify = function (obj) {
				if ((obj.input == null ) || (obj.input == "" )) return;

				// Verificamos la respuesta. Añadimos una propiedad right o wrong para definir si el item es correcto o no
				if(obj.input.toLowerCase() === obj.tableText.toLowerCase()){
					scope.rightAnswers++;
					obj.wrong = false;
					obj.right = true;
					obj.completed = true; // marcamos el item como completo, para desactivar el input
					counter++;
				} else {
					
					obj.wrong ? chances=scope.options.chancesPerItem-2: chances=scope.options.chancesPerItem-1;

                	obj.wrong = true;
                	

                    	if(chances === 0){
                    	obj.block = true;
                    	counter++;
                    	chances=scope.options.chancesPerItem-1;
                    	}else{chances--;obj.input="";}
				}

				if(counter === (scope.options.data.length * 2)){
                    	
                    scope.complete = true;
                	
                }
                
                scope.$apply();
			}
 		}
 	};
 });