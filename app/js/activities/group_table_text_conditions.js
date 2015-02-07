var lizGroupTableTextConditions = angular.module('lizGroupTableTextConditions', []);

lizGroupTableTextConditions.directive('groupTableTextConditions', function  ($sce) {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/group_table_text_conditions.html',
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
			scope.chancesPerItem = scope.options.chancesPerItem;
			scope.itemsPerRow = scope.options.itemsPerRow;
			scope.minRightAnswers = scope.options.minRightAnswers;
			scope.pattern = scope.items.pattern ? scope.items.pattern : ['N/A'];
			scope.options = scope.items.options ? scope.items.options : [];
			scope.text = scope.items.text;
			rightAnswers = 0, // Contador de preguntas buenas
			scope.success = false;
			scope.failure = false;

			// Recorremos todos los items
			if(scope.chancesPerItem){
		        scope.items.forEach(function (item) {
		          // agregamos cada item el numero de oportunidades

		          item.chances = scope.chancesPerItem						      
				  
		        });
		      }
			
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

			// Para usar el html en angular
		      scope.sanitize = function (item) {
		        return $sce.trustAsHtml(item);
		      }

				
			/**
			 * Definimos nuestra función beforeGoNext para que muestre el cuadro de felicitaciones
			 */
			scope.$root.beforeGoNext = function () {

				var completedItems = 0 + scope.items.filter(function(item){
							return item.right === true ;
						}).length;

				if(completedItems >= scope.minRightAnswers){
					scope.success = true;
				}else{scope.failure = true;}
				return true; 
			};
		   
			/**
			 * Verifica si el todos los inputs cumplen la longitud minima de caracteres 
			 */
			 
			scope.verify = function (item) {
				if(item.input === '' || !item.hasOwnProperty('input') ){return}
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

						
						item.wrong = false;
						item.right = true;
						if(scope.chancesPerItem){item.completed = true};

						var completedInputs = scope.items.filter(function(item){
							return (item.right === true || item.completed === true ) && item.input.length >= item.length;
						}).length;

						// Si se han completado todos
							if (completedInputs === scope.items.length) {
								scope.$root.isNextEnabled = true; // Activamos el siguiente vínculo
							} else {
								scope.$root.isNextEnabled = false; // Desactivamos el siguiente vínculo
							}	
					}else{		
								if(scope.chancesPerItem){
									item.right = false;
									item.wrong = true;
									item.chances -= 1
									if(item.chances === 0){item.completed = true;item.input = item.pattern }
								};

								if(item.right === true){
									item.right = false;
									item.wrong = true;
								}

								var completedInputs = scope.items.filter(function(item){
								return (item.right === true || item.completed === true ) && item.input.length >= item.length;
								}).length;

								// Si se han completado todos
									if (completedInputs === scope.items.length) {
										scope.$root.isNextEnabled = true; // Activamos el siguiente vínculo
									} else {
										scope.$root.isNextEnabled = false; // Desactivamos el siguiente vínculo
									}	
							}
				}else{

					if ( (item.words.length >= 1 && item.hasOwnProperty('options') ) && item.input.length >= item.length) {

						
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
				}	

			}; // verify()

		}


    }; 
});

