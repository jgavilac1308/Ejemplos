/**
 * La actividad permite responder a varias preguntas en cuadros de texto. 
 */

var lizCompleteTextBoxes = angular.module('lizCompleteTextBoxes', []);

lizCompleteTextBoxes.directive('completeTextBoxes', function($sce){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			options: '=',
 			instruction: '@',
 			title: '@',
 			description: '@',
 			src: '@',
 			alt: '@',
 			audio: '@'
		}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: '../views/activities/complete_text_boxes.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function(scope, iElm, iAttrs, controller) {
			
			scope.rightAnswers = 0;
			scope.complete = false; // Cuando termina la actividad
			scope.block = false;
			scope.success = false;
			scope.failure = false;
			scope.minChars = (scope.options.minChars) ? scope.options.minChars : 5;
			scope.hasImage = (scope.options.hasImage) ? true : false;

			scope.items = scope.options.items;

			// watch if the activity is finished
			scope.$watch('complete', function(complete) {
				if (complete) {
					if (scope.rightAnswers >= scope.options.minRightAnswers || scope.rightAnswers >= scope.items.length) {
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
			var chances = scope.options.chancesPerItem-1;

			// Para usar el html en angular
			scope.sanitize = function (item) {
				return $sce.trustAsHtml(item);
			}

			scope.compareArray = function (arrayA, arrayB) {
				if (arrayA.length != arrayB.length) { return false; }
		        // sort modifies original array
		        // (which are passed by reference to our method!)
		        // so clone the arrays before sorting
		        var a = jQuery.extend(true, [], arrayA);
		        var b = jQuery.extend(true, [], arrayB);
		        a.sort(); 
		        b.sort();
		        for (var i = 0, l = a.length; i < l; i++) {
		            if (a[i] !== b[i]) { 
		                return false;
		            }
		        }
		        return true;
			};

			scope.verify = function (item) {
				if ((item.input == null ) || (item.input === "" )) return;

				var done = false;
				
				if (item.hasAnswers) {
					var string = item.input.toLowerCase();
					for (var i = 0; i < item.answers.length; i++) {
						if (string.indexOf(item.answers[i].toLowerCase()) === -1)  {
							done = false;
							break;
						}
						done = true;
					};
				} else {
					var letters = /^[A-Za-z\s]+$/;
					done = (item.input.match(letters) && item.input.length >= scope.minChars) ? true : false;
				}


				if (done) {
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

				if(counter === scope.items.length){
                    	
                    scope.complete = true;
                	
                }
                
			};
		}
	};
});