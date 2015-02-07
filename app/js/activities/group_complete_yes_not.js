var lizGroupCompleteYesNot = angular.module('lizGroupCompleteYesNot', []);

lizGroupCompleteYesNot.directive('groupCompleteYesNot', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/group_complete_yes_not.html',
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
			scope.text = scope.items.text;
			minRightAnswers = scope.options.minRightAnswers
			rightAnswers = 0, // Contador de preguntas buenas
			chances = scope.options.chances,
			scope.success = false;
			scope.failure = false;
			scope.block = false;
			/**
			 * Para obtener los estilos de los elementos, específicamente el ancho
			 */
			scope.getStyles = function function_name(argument) {
				var styles = "";

				if(scope.itemsPerRow){
					styles += "width: " + (100 / scope.itemsPerRow) + "%;";
					styles += "margin-left: " + (10 / scope.itemsPerRow) + "%;";
					styles += "margin-top: " + (10 / scope.itemsPerRow) + "%;";
					styles += "margin-right: " + (10 / scope.itemsPerRow) + "%!important;";
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
			 var chancesPerItem = 0


			scope.verify = function (item) {console.log(item.input)
				
				if((item.input === '' ) || ! item.hasOwnProperty('input')) return; 

				

					if (item.input === item.text){						
							rightAnswers++;
							chances--;
							item.wrong = false;
							item.right = true;
							item.completed = true; // marcamos el item como completo, para desactivar el input
							
					} 
					else {
								
							item.wrong ? chancesPerItem = 0: chancesPerItem = 0;
							item.wrong = true;
							
								if(chancesPerItem === 0){
		                    	item.completed = true;
		                    	chances--;
		                    	chancesPerItem = 0;
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

