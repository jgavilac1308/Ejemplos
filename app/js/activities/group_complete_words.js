var lizGroupCompleteWords = angular.module('lizGroupCompleteWords', []);

lizGroupCompleteWords.directive('groupCompleteWords', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/group_complete_words.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			titleBlock: '@',
			blockText: '@',
			style: '@',
			mainimg: '@'
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.itemsPerRow = scope.options.itemsPerRow;
			scope.examples = scope.options.examples;
			scope.itemsrow = scope.options.itemsrow;
			scope.pattern = scope.items.pattern;
			scope.customClass = (scope.options.customClass) ? scope.options.customClass : "";
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
			scope.getStyles = function () {
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
				styles += "float: left;";
				
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
							      answer2: (scope.items[j].answer2)
							});
						}else{
							scope.items[j].words.push({
								  isInput: true,
							      input: '',
							      word: (words[i])
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
			 var chancesPerItem = 
			 		(scope.options.hasOwnProperty("chancesPerItem")) ? scope.options.chancesPerItem : 1;

			scope.verify = function (item,q) {
				if(item.input === '') return; 

				// Verificamos la respuesta. Añadimos una propiedad right o wrong para definir si el item es correcto o no
					if(item.input.toLowerCase() === item.word.toLowerCase()){
						rightAnswers++;
						chances--;
						item.wrong = false;
						item.right = true;
						item.completed = true; // marcamos el item como completo, para desactivar el input
					} else {
						
						if(item.hasOwnProperty('answer2')){
							
							if(item.input.toLowerCase() === item.answer2.toLowerCase()){
								rightAnswers++;
								chances--;
								item.wrong = false;
								item.right = true;
								item.completed = true; // marcamos el item como completo, para desactivar el input
							}else {
						
							item.wrong ? chancesPerItem = 0: chancesPerItem = 1;
							item.wrong = true;
							
									if(chancesPerItem === 0){
			                    	item.completed = true;
			                    	item.input = item.word;
			                    	q.callback = item.answer2 ? 'Las respuestas correctas son: ' + item.word + ' Ó ' + item.answer2 : 'La respuesta correcta es: ' + item.word;
			                    	chances--;
			                    	chancesPerItem = (scope.options.hasOwnProperty("chancesPerItem")) ? scope.options.chancesPerItem : 1;;
			                    	}else{item.input="";}
                    	}

						}else {
						
							item.wrong ? chancesPerItem = 0: chancesPerItem = 1;
							item.wrong = true;
							
									if(chancesPerItem === 0){
			                    	item.completed = true;
			                    	item.input = item.word;
			                    	q.callback = item.answer2 ? 'Las respuestas correctas son: ' + item.word + ' Ó ' + item.answer2 : 'La respuesta correcta es: ' + item.word;
			                    	chances--;
			                    	chancesPerItem = (scope.options.hasOwnProperty("chancesPerItem")) ? scope.options.chancesPerItem : 1;;
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

