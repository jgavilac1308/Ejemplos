var lizGroupTableTextConditionsOptions = angular.module('lizGroupTableTextConditionsOptions', []);

lizGroupTableTextConditionsOptions.directive('groupTableTextConditionsOptions', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/group_table_text_conditions_options.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			addicon: '@'
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.groups = scope.options.groups;
			scope.items = [];
			/*scope.itemsPerRow = scope.options.itemsPerRow;
			scope.pattern = scope.groups.items.pattern ? scope.groups.items.pattern : ['N/A'];
			scope.options = scope.groupsitems.options ? scope.groupsitems.options : [];*/
			minRightAnswers = scope.options.minRightAnswers
			rightAnswers = 0, // Contador de preguntas buenas
			chances = scope.options.chances,
			scope.success = false;
			scope.failure = false;
			scope.block = false;
			
			// Recorremos todas las grupos y sus items
			      scope.groups.forEach(function (group) {
			        group.items.forEach(function (item) {
			          // agregamos cada item a el array de items
			          scope.items.push({
							item: item,								      
					  });

			        });
			      });
			
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
				// Filtramos el array buscando los inputs que cumplen los requisitos y los contamos
				
			  
				   	var string = item.input;
					var words = string.split(" ");

					item.words = [];
					item.complete = [];
				
					for(var i=0; i < words.length; i++){

						if(item.hasOwnProperty('pattern')){

							if( item.pattern.indexOf(words[i]) > -1 ){
									item.words.push({
										  isInput: true,								      
									});
									

							} 
						}else{

							if( item.options.indexOf(words[i]) > -1 ){
									item.words.push({
										  isInput: true,								      
									});
									

							} 
						}
							

					}

				


				// Si se han completado todos
				if(item.hasOwnProperty('pattern')){
					if ( item.words.length >= item.pattern.length || item.pattern[0] === "free" && item.input.length >= item.length) {

						/*item.complete.push({
										  complete: true,								      
									});*/
						item.wrong = false;
						item.right = true;
						var completedInputs = scope.items.filter(function(item){
							return item.item.right === true && item.item.input.length >= item.item.length;
						}).length;

						// Si se han completado todos
							if (completedInputs === chances) {
								scope.$root.isNextEnabled = true; // Activamos el siguiente vínculo
							} else {
								scope.$root.isNextEnabled = false; // Desactivamos el siguiente vínculo
							}	
					}else{
								if(item.right === true){
								item.right = false;
								item.wrong = true;}
								var completedInputs = scope.items.filter(function(item){
								return item.item.right === true && item.item.input.length >= item.item.length;
								}).length;

								// Si se han completado todos
									if (completedInputs === chances) {
										scope.$root.isNextEnabled = true; // Activamos el siguiente vínculo
									} else {
										scope.$root.isNextEnabled = false; // Desactivamos el siguiente vínculo
									}	
							}
				}else{

					if ( (item.words.length >= 1 && item.hasOwnProperty('options') ) && item.input.length >= item.length) {

						/*item.complete.push({
										  complete: true,								      
									});*/
						item.wrong = false;
						item.right = true;
						var completedInputs = scope.items.filter(function(item){
							return item.item.right === true && item.item.input.length >= item.item.length;
						}).length;

						// Si se han completado todos
							if (completedInputs === chances) {
								scope.$root.isNextEnabled = true; // Activamos el siguiente vínculo
							} else {
								scope.$root.isNextEnabled = false; // Desactivamos el siguiente vínculo
							}	
					}else{
								if(item.right === true){
								item.right = false;
								item.wrong = true;}
								var completedInputs = scope.items.filter(function(item){
									return item.item.right === true && item.item.input.length >= item.item.length;
								}).length;

								// Si se han completado todos
									if (completedInputs === chances) {
										scope.$root.isNextEnabled = true; // Activamos el siguiente vínculo
									} else {
										scope.$root.isNextEnabled = false; // Desactivamos el siguiente vínculo
									}	
							}
				}	

			}; // verify()

		}


    }; 
});

