/**
 * La actividad permite completar inputs en un table de acuerdo a 
 * una lista lateral.
 */
var lizCompleteTableWithList = angular.module('lizCompleteTableWithList', []);

 lizCompleteTableWithList.directive('completeTableWithList', function ($sce) {
 	return {
 		restrict: 'E',
 		templateUrl: '../views/activities/complete_table_with_list.html',
 		scope: {
 			options: '=',
 			instruction: '@',
 			title: '@',
 			description: '@',
 			audio: '@'
 		},
 		link: function (scope, element, iAttrs) {
 			// Inputs procesados
			scope.words = [];

			// Procesamos cada elemento del array entrante
			angular.forEach(scope.inputs, function (input) {
				scope.words.push({ word: input, right: false, wrong: false });
			});

			scope.sanitize = function (item) {
				return $sce.trustAsHtml(item);
			};

			scope.number = 7;
			scope.getNumber = function(num) {
			    return new Array(num);   
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

			scope.textInput1Title = scope.options.textInput1Title;
			scope.textInput2Title = scope.options.textInput2Title;
			scope.textInput3Title = scope.options.textInput3Title;
			scope.rightAnswers = 0;
			scope.complete = false; // Cuando termina la actividad
			scope.block = false;
			scope.minRightAnswers = scope.options.minRightAnswers
			scope.success = false;
			scope.failure = false;
			scope.inputs =  scope.options.data;
			scope.randomItems = (scope.options.randomItems) ? true : false;
			console.log(scope.randomItems);

			scope.items = [];
			angular.forEach(scope.inputs.inputs1, function (value) {
				scope.items.push({listValue: value.listValue});
			});

			if (scope.inputs.hasOwnProperty("inputs2")) {
				$.merge(scope.items, scope.inputs.inputs2);
			}

			if (scope.inputs.hasOwnProperty("inputs3")) {
				$.merge(scope.items, scope.inputs.inputs3);
			}
			
			if (scope.randomItems) {
				scope.items = scope.shuffleArray(scope.items);
			}

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

			var counter = 0
			var chances = scope.options.chancesPerItem-1

			scope.verify = function (item, inputs, num) {
				scope.actualValue = item.input;
				if ((scope.actualValue == null ) || (scope.actualValue === "" )) return;
				scope.exist = false;

				angular.forEach(inputs, function (value, key) {
					if (angular.equals(angular.lowercase(value.listValue), angular.lowercase(scope.actualValue))) {
						scope.exist = true;
					}
				});

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
                    		angular.forEach(scope.inputs, function (obj, key) {
								angular.forEach(obj, function (o, k) {
									if (o.listValue.toLowerCase() === item.input.toLowerCase()) {
										var n = obj.indexOf(o);
										obj.splice(n, 1);
									}
								});
							});

							for (var i = 0; i < scope.items.length; i++) {
								if (scope.items[i].listValue.toLowerCase() === item.input.toLowerCase()) {
									scope.items[i].listValue = "<span style='color:#F00'>" + item.input +"</span>";
									break;
								}
							}
                    	item.block = true;
                    	counter++;
                    	chances=scope.options.chancesPerItem-1;
                    	}else{chances--;item.input="";}
				}

				if(counter === scope.items.length){
                    	
                    scope.complete = true;
                	
                }
			}
 		}
 	};
 });