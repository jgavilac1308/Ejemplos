var lizGroupTableTextOptions = angular.module('lizGroupTableTextOptions', []);

lizGroupTableTextOptions.directive('groupTableTextOptions', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/group_table_text_options.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			blockText: '@',
			mainimg: '@',
			addicon: '@'
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.titles = scope.options.titles;
			scope.itemsPerRow = scope.options.itemsPerRow;
			scope.pattern = scope.items.pattern;
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
			scope.getStyles = function function_name(rows) {
				var styles = "";
				

				if(rows === undefined ){
					styles += "height: " + (108) + "px;";
					
				} 
				else{
					styles += "height: " + (40 * rows) + "px;";
					styles += "padding-top: " + (5 * rows) + "px;";
				}
				
				
				return styles;

				
			};

				
			/**
			 * Definimos nuestra función beforeGoNext para que muestre el cuadro de felicitaciones
			 */
			scope.$root.beforeGoNext = function () {
				scope.success = true;
				return true; 
			};
		   
			/**
			 * Verifica si el todos los inputs cumplen la longitud minima de caracteres 
			 */
			 
			scope.verify = function (item) {

				if((item.input === '' ) || ! item.hasOwnProperty('input')) return;

				// Filtramos el array buscando los inputs que cumplen los requisitos y los contamos
				
					item.complete = [];
				
						if( item.pattern.indexOf(item.input) > -1 ){
								
								item.complete.push({
									  complete: true,								      
								});
								

						} 

						else{
							
						}

					

				


				// Si se han completado todos
					
				if (item.complete.length >= 1) {
							
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

