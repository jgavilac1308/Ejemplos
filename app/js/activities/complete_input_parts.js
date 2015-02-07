/**
 * La actividad permite completar inputs dentro de un "canvas".
 */
var lizCompleteInputParts = angular.module('lizCompleteInputParts', []);

lizCompleteInputParts.directive('completeInputParts', function () {
	return {
		restrict: 'E',
        templateUrl: '../views/activities/complete_input_parts.html',
        scope: {
            options: '=',
            instruction: '@',
            title: '@',
            description: '@',
            audio: '@'
        },
		link: function (scope, iElement, iAttrs) {
			scope.canvasBlocks = scope.options.canvasBlocks;

			scope.itemsLength = 0;
			scope.rightAnswers = 0;
			scope.complete = false; // Cuando termina la actividad
			scope.block = false;
			scope.success = false;
			scope.failure = false;

			angular.forEach(scope.canvasBlocks, function (value, key) {
				scope.itemsLength += value.items.length;
			})

			// watch if the activity is finished
			scope.$watch('complete', function(complete) {
				if (complete) {
					if (scope.rightAnswers >= scope.itemsLength ) {
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

			var counter = 0;
			var chances = scope.options.chancesPerItem-1;

			// si la opcion default esta completa el item
		    scope.canvasBlocks.forEach(function (q) {
		      q.items.forEach(function (i) {

			       	if(i.default){
			       		scope.rightAnswers++;
			       		i.right = true;
			       		i.block = true;
			       		i.input = i.answer;
			       		counter++;			       		
			       	}
			      
		       });
		    });

			// Si la descripción o el título están, entonces la instrucción va al fondo
			scope.isBottom = scope.title || scope.description;

			scope.verify = function (item) {
				if (null == item.input || "" === item.input) { return; }

				if (item.input.toLowerCase() === item.answer.toLowerCase()) {
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

				if(counter === scope.itemsLength){
                    
                    scope.complete = true;
                	
                }

                scope.$apply();
			}

			/**
			 * Devuelve los estilos de cada elemento
			 */
			scope.getStyles = function (item) {
				var styles = '';

				styles += "top: " + item.t + "%;";
				styles += "left: " + item.l + "%;";

				item.w ? styles += "width: " + item.w + "%;" : '' ;	

				return styles;
			};
		}
	};
});