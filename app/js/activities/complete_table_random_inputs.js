/**
 * La actividad permite completar inputs en hubicaciones aleatorias 
 * en un table.
 */
var lizCompleteTableRandomInputs = angular.module('lizCompleteTableRandomInputs', []);

 lizCompleteTableRandomInputs.directive('completeTableRandomInputs', function ($sce) {
 	return {
 		restrict: 'E',
 		templateUrl: '../views/activities/complete_table_random_inputs.html',
 		scope: {
 			options: '=',
 			instruction: '@',
 			title: '@',
 			description: '@',
 			audio: '@'
 		},
 		link: function (scope, element, iAttrs) {

			scope.sanitize = function (item) {
				return $sce.trustAsHtml(item);
			};

			// ordena el array de forma aleatoria usando el algoritmo de Fisher-Yates
			scope.shuffleArray = function(array) {
				for (var i = array.length - 1; i > 0; i--) {
					var j = Math.floor(Math.random() * (i + 1));
					var temp = array[i];
					array[i] = array[j];
					array[j] = temp;
				}
				return array;
			};

			scope.items = scope.options.items;
			scope.titles = scope.options.titles;
			scope.rightAnswers = 0;
			scope.complete = false; // Cuando termina la actividad
			scope.block = false;
			scope.minRightAnswers = scope.options.minRightAnswers;
			scope.success = false;
			scope.failure = false;
			scope.numInputs = 0;

			angular.forEach(scope.items, function (item, key) {
				angular.forEach(item.objs, function (obj, k) {
					if (obj.isInput) {
						obj.chances = scope.options.chancesPerItem - 1;
						obj.right = false;
						obj.wrong = false;
						scope.numInputs++;
					}
				});
			});

			// watch if the activity is finished
			scope.$watch('complete', function(complete) {
				if (complete) {
					if (scope.rightAnswers >= scope.minRightAnswers) {
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

			// Si la descripción o el título están, entonces la instrucción va al fondo
			scope.isBottom = scope.title || scope.description;

			var counter = 0;

			scope.verify = function (obj) {
				if ("" === obj.input || null === obj.input) { return; }
				
				// Verificamos la respuesta. Añadimos una propiedad right o wrong para definir si el item es correcto o no
				if(obj.input.toLowerCase() === obj.answer.toLowerCase()){
					scope.rightAnswers++;
					obj.wrong = false;
					obj.right = true;
					obj.block = true; // marcamos el item como completo, para desactivar el input
					counter++;
				} else {
					
					// item.wrong ? chances=scope.options.chancesPerItem-2: chances=scope.options.chancesPerItem-1;

                	obj.wrong = true;

                    	if(obj.chances === 0){
                    	obj.block = true;
                    	obj.input = obj.answer;
                    	counter++;
                    	obj.chances=scope.options.chancesPerItem-1;
                    	}else{obj.chances--;obj.input="";}
				}

				if(counter === scope.numInputs){
                    	
                    scope.complete = true;
                	
                }
			}
 		}
 	};
 });