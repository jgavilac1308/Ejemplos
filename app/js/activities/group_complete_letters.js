var lizGroupCompleteLetters = angular.module('lizGroupCompleteLetters', []);

lizGroupCompleteLetters.directive('groupCompleteLetters', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/group_complete_letters.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			titleBlock: '@',
			blockText: '@',
			mainimg: '@'
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.itemsPerRow = scope.options.itemsPerRow;
			scope.chancesPerItem = scope.options.chancesPerItem ? scope.options.chancesPerItem : 1 ;
			scope.lettersStyles = scope.options.lettersStyles;
			scope.inputsStyles = scope.options.inputsStyles;
			scope.pattern = scope.items.pattern;
			scope.words = [];
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
					styles += "width: " + (96 / scope.itemsPerRow) + "%;";
					
				} 
				
				return styles;

				
			};

			
			var items = scope.items;

		   // Constructor de palabras
		   for(var j=0; j < items.length; j++){

		   	var string = items[j].text;
			var words = string.split(" ");

			scope.items[j].words = [];

			
				
				for(var i=0; i < words.length; i++){

					if( scope.items[j].pattern.indexOf(i) > -1 ){
						if(scope.items[j].hasOwnProperty('answer2')){
							scope.items[j].words.push({
								  isInput: true,
							      input: '',
							      word: (words[i]),
							      chances: (scope.chancesPerItem),
							      answer2: (scope.items[j].answer2)
							});
						}else{
							scope.items[j].words.push({
								  isInput: true,
							      input: '',
							      word: (words[i]),
							      chances: (scope.chancesPerItem)
					      	});

						}

					} 

					else{
						scope.items[j].words.push({
								 isInput: false,
							     word: (words[i])
						});
					}

				}

			}

			/**
			 * Verifica si el input cumple con las condiciones del número 
			 */
			 var chancesPerItem = 0

			scope.verify = function (item,group) {
				if(item.input === '') return; 

				// Verificamos la respuesta. Añadimos una propiedad right o wrong para definir si el item es correcto o no
					if(item.input === item.word){
						rightAnswers++;
						chances--;
						item.wrong = false;
						item.right = true;
						item.completed = true; // marcamos el item como completo, para desactivar el input
					} else {
						
						if(item.hasOwnProperty('answer2')){
							
							if(item.input === item.answer2){
								rightAnswers++;
								chances--;
								item.wrong = false;
								item.right = true;
								item.completed = true; // marcamos el item como completo, para desactivar el input
							}else {
								
							item.chances--
							item.wrong = true;
							
									if(item.chances === 0){
			                    	item.completed = true;
			                    	chances--;
			                    	chancesPerItem = 0;
			                    	group.feedback = typeof group.feedback !== "undefined" ? item.answer2 : group.feedback + ", " + item.answer2 ;
			                    	}else{item.input="";}
                    	}

						}else {
						
							item.chances--
							item.wrong = true;
							
									if(item.chances === 0){
			                    	item.completed = true;
			                    	chances--;
			                    	chancesPerItem = 0;
									group.feedback = typeof group.feedback === "undefined" ? item.word : group.feedback + ", " + item.word ;
			                    	}else{item.input="";}
                    	}
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

