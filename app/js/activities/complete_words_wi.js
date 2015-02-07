var lizCompleteWordsWi = angular.module('lizCompleteWordsWi', []);

lizCompleteWordsWi.directive('completeWordsWi', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/complete_words_wi.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@'
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.itemsPerRow = scope.options.itemsPerRow;
			scope.pattern = scope.items[0].pattern;
			scope.words = [];
			minRightAnswers = scope.options.minRightAnswers
			rightAnswers = 0, // Contador de preguntas buenas
			chances = scope.items[0].pattern.length * 1, // el doble, ya que es izquierda y derecha
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

			var string = scope.items[0].text;
			var words = string.split(" ");
			

				   console.log(words);
				   /*console.log(scope.pattern);*/

		   // Constructor de palabras
			for(var i=0; i < words.length; i++){

				if( scope.pattern.indexOf(i) > -1 ){
					scope.words.push({
							  isInput: true,
						      input: (words[i]).substring(0,1),
						      word: (words[i])
					});

				} 

				else{
					scope.words.push({
							 isInput: false,
						     word: (words[i])
					});
				}

			}

			/**
			 * Verifica si el input cumple con las condiciones del número 
			 */
			 var chancesPerItem = 1

			scope.verify = function (item) {
				if(item.input === '') return; 

				// Verificamos la respuesta. Añadimos una propiedad right o wrong para definir si el item es correcto o no
					if(item.input === item.word){
						rightAnswers++;
						chances--;
						item.wrong = false;
						item.right = true;
						item.completed = true; // marcamos el item como completo, para desactivar el input
					} else {
						
						item.wrong ? chancesPerItem = 0: chancesPerItem = 1;
						item.wrong = true;
						
								if(chancesPerItem === 0){
		                    	item.completed = true;
		                    	chances--;
		                    	chancesPerItem = 1;
		                    	}else{item.input="";}
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

