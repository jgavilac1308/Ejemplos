var lizGroupTableCompleteWords = angular.module('lizGroupTableCompleteWords', []);

lizGroupTableCompleteWords.directive('groupTableCompleteWords', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/group_table_complete_words.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			altimg: '@',
			style: '@',
			mainimg: '@'
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.itemsPerRow = scope.options.itemsPerRow;
			scope.examples = scope.options.examples;
			scope.pattern = scope.items.pattern;
			scope.customClass = (scope.options.customClass) ? scope.options.customClass : "";
			minRightAnswers = scope.options.minRightAnswers
			rightAnswers = 0, // Contador de preguntas buenas
			chances = scope.options.chances,
			scope.success = false;
			scope.failure = false;
			scope.block = false;

			// Empezamos a recorrer todas las palabras y sumando
				scope.items.forEach(function(item){
					item.input = '';
				});

			/**
			 * Para obtener los estilos de los elementos, específicamente el ancho
			 */
			scope.getStyles = function () {
				var styles = "";

				if(scope.itemsPerRow){
					styles += "width: " + (100 / scope.itemsPerRow) + "%;";
					
				} else {
					styles += "width: " + (100 / 3) + "%;";
					
				}
								
				return styles;

				
			};

			/**
			 * Definimos nuestra función beforeGoNext para que muestre el cuadro de felicitaciones
			 */
			scope.$root.beforeGoNext = function () {

				var completedInputs = scope.items.filter(function(item){
							return item.right === true;
							}).length;
				if(completedInputs >= minRightAnswers){
					scope.success = true;
					return true; 
				}else{
					scope.failure = true;
					return true; 
				}
			};

			
			/**
			 * Verifica si el input cumple con las condiciones del número 
			 */

			scope.verify = function () {

				// Empezamos a recorrer todas las palabras y sumando
				scope.items.forEach(function(item){

					if (item.input === item.answer){

						item.completed = true;
						item.right = true;
						item.wrong = false;
					}else{

						item.completed = true;
						item.right = false;
						item.wrong = true;

					}

					console.log(item);
				});	

				scope.$root.isNextEnabled = true; // Activamos el siguiente vínculo		
					
			}; // verify()



		}


    }; 
});

