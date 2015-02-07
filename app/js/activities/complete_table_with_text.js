/**
 * La actividad permite completar inputs en un table de acuerdo a 
 * el texto que se hubican en la primera columna.
 */
var lizCompleteTableWithText = angular.module('lizCompleteTableWithText', []);

 lizCompleteTableWithText.directive('completeTableWithText', function () {
 	return {
 		restrict: 'E',
 		templateUrl: '../views/activities/complete_table_with_text.html',
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

			scope.getNumber = function(num) {
			    return new Array(num);   
			};

			scope.textMainTitle = scope.options.textMainTitle;
			scope.textInput1Title = scope.options.textInput1Title;
			scope.textInput2Title = scope.options.textInput2Title;
			scope.textInput3Title = scope.options.textInput3Title;
			scope.isPrefix = scope.options.isPrefix || false;
			scope.hasOptions = scope.options.hasOptions || false;
			scope.noTitle = scope.options.noTitle || false;
			scope.rightAnswers = 0;
			scope.complete = false; // Cuando termina la actividad
			scope.block = false;
			scope.success = false;
			scope.failure = false;

			if (scope.hasOptions) {
				scope.opts = scope.options.opts;
			}

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

			var counter = 0
			var chances = scope.options.chancesPerItem-1

			scope.verify = function (item, items, type) {
				if ((item.input == null ) || (item.input == "" )) return;
				scope.exist = false;

				switch (type) {
					case 1:
							if (item.input.toLowerCase() === items[0].option.toLowerCase()) {
								scope.exist = true;
							} else if (chances === 0) {
								item.input = items[0].option;
							}
						break;

					case 2:
							var match = 0;
							var itemArray = item.input.split(", ");
							console.log(itemArray);
							angular.forEach(itemArray, function (i, k) {
								angular.forEach(items, function (value, key) {
									if (angular.equals(angular.lowercase(value.option), angular.lowercase(i))) {
										match++;
									}
								});
							});

							if (items.length === match) {
								scope.exist = true;
							}
						break;

					case 3 :
							angular.forEach(items, function (value, key) {
								if (angular.equals(angular.lowercase(value.option), angular.lowercase(item.input))) {
									scope.exist = true;
								}
							});
						break;
				}
				// Verificamos la respuesta. Añadimos una propiedad right o wrong para definir si el item es correcto o no
				if(scope.exist){
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
                    	counter++;
                    	chances=scope.options.chancesPerItem-1;
                    	}else{chances--;item.input="";}
				}

				if(counter === (scope.options.numOptions)){

                    // 08 08 2014 - Maria Giraldo, Se cambia  scope.complete = false; por  scope.complete = true;para activar la actividad completa al ingresar todas las opciones
                    scope.complete = true;
                    //scope.complete = false;
                	
                }
			}
 		}
 	};
 });