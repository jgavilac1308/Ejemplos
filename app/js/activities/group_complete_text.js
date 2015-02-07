var lizGroupCompleteText = angular.module('lizGroupCompleteText', []);

lizGroupCompleteText.directive('groupCompleteText', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/group_complete_text.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@'
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.itemsPerRow = scope.options.itemsPerRow;
			scope.pattern = scope.items.pattern;
			scope.customClass = scope.options.customClass ? scope.options.customClass : false;
			scope.text = scope.items.text;
			minRightAnswers = scope.options.minRightAnswers
			rightAnswers = 0, // Contador de preguntas buenas
			chances = scope.options.chances,
			chancesPerItem = scope.options.chancesPerItem ? scope.options.chancesPerItem : 1
			scope.success = false;
			scope.failure = false;
			scope.block = false;

			/**
			 * Para obtener los estilos de los elementos, específicamente el ancho
			 */
			scope.getStyles = function function_name(argument) {
				var styles = "";

				if(scope.itemsPerRow){
					styles += "width: " + ((100-scope.itemsPerRow) / scope.itemsPerRow) + "%;";
					styles += "margin-left: 1%";
					
				} else {
					styles += "width: " + (100 / scope.items.length) + "%;";
					styles += "margin-left: " + (10 / scope.itemsPerRow) + "%;";
					styles += "margin-top: " + (10 / scope.itemsPerRow) + "%;";
				}
				
				return styles;

				
			};

				

		   
			/**
			 * Verifica si el input cumple con las condiciones del número 
			 */
			scope.verify = function (item) {
				
				if((item.input === '' ) || ! item.hasOwnProperty('input')) return; 

				

					if (item.input === item.text || (item.hasOwnProperty('answer2') && item.input === item.answer2)){						
							rightAnswers++;
							chances--;
							item.wrong = false;
							item.right = true;
							item.completed = true; // marcamos el item como completo, para desactivar el input
							
					} 
					else {
							item.wrong ? chancesPerItem = scope.options.chancesPerItem ? scope.options.chancesPerItem - 1 : chancesPerItem = 1 : chancesPerItem = scope.options.chancesPerItem ? scope.options.chancesPerItem : chancesPerItem = 1 ;
							chancesPerItem--	
							item.wrong = true;
							
								if(chancesPerItem === 0){
		                    	item.completed = true;
		                    	chances--;
		                    	chancesPerItem = scope.options.chancesPerItem ? scope.options.chancesPerItem : 1
		                    	}
		                    	else{item.input="";}

					}

					// fin de la actividad
					if(chances === 0){
						if(rightAnswers >= minRightAnswers){
							scope.$root.isNextEnabled = true;
							scope.success = true;
						} else {
							scope.failure = true;
						}
					} 					
			}; // verify()

		}


    }; 
});

