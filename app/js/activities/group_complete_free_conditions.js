var lizGroupCompleteFreeConditions = angular.module('lizGroupCompleteFreeConditions', []);

lizGroupCompleteFreeConditions.directive('groupCompleteFreeConditions', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/group_complete_free_conditions.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			addicon: '@',
			instruction: '@'


		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.examples = scope.options.examples;
			scope.pattern = scope.items.pattern;
			scope.success = false;
			scope.failure = false;
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
				// Filtramos el array buscando los inputs que cumplen los requisitos y los contamos
				
			  
				   	var string = item.input;
					var words = string.split(" ");

					item.words = [];
					item.complete = [];
				
					
					for(var i=0; i < words.length; i++){

						if( item.pattern.indexOf(words[i]) > -1 ){
								item.words.push({
									  isInput: true,								      
								});
								

						} 

						else{
							
						}

					}

				


				// Si se han completado todos

				if ((item.words.length >= item.pattern.length || item.pattern[0] === "free" ) && item.input.length >= item.length) {

					/*item.complete.push({
									  complete: true,								      
								});*/
					item.wrong = false;
					item.right = true;
					var completedInputs = scope.items.filter(function(item){
						return item.right === true && item.input.length >= item.length;
					}).length;

					// Si se han completado todos
						if (completedInputs === scope.items.length) {
							scope.$root.isNextEnabled = true; // Activamos el siguiente vínculo
						} else {
							scope.$root.isNextEnabled = false; // Desactivamos el siguiente vínculo
						}	
				}else{
							if(item.right === true){
							item.right = false;
							item.wrong = true;}
							var completedInputs = scope.items.filter(function(item){
							return item.right === true && item.input.length >= item.length;
							}).length;

							// Si se han completado todos
								if (completedInputs === scope.items.length) {
									scope.$root.isNextEnabled = true; // Activamos el siguiente vínculo
								} else {
									scope.$root.isNextEnabled = false; // Desactivamos el siguiente vínculo
								}	
						}	

			}; // verify()

		}


    }; 
});

