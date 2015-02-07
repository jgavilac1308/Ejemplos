var lizGroupClassifyTable = angular.module('lizGroupClassifyTable', []);

lizGroupClassifyTable.directive('groupClassifyTable', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/group_classify_table.html',
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
			scope.list = scope.options.list;
			scope.words = [];
			scope.wordIn = false;
			scope.count = false;
			minRightAnswers = scope.options.minRightAnswers
			rightAnswers = 0, // Contador de preguntas buenas
			chances = scope.options.chances,
			scope.itemsStyle = scope.options.itemsStyle;
			scope.success = false;
			scope.failure = false;
			scope.block = false;

			

			var items = scope.items;

		   // Constructor de palabras
		   for(var j=0; j < items.length; j++){

			   	var string = items[j].text;
				var words = string.split(" ");

				scope.items[j].words = [];

			
				
				for(var i=0; i < words.length; i++){

							scope.items[j].words.push({
								  isInput: true,
							      input: '',
							      word: (words[i]),
							});
				}

			}

			/**
			 * Verifica si el input cumple con las condiciones del número 
			 */
			
			scope.verify = function (item,word,pattern,items) {
				var chancesPerItem = 1
				if(word.wrong === true){chancesPerItem = 0}
				
					// Recorremos el grupo y sus items
			        pattern.forEach(function (wordx) {
			        	
			        	if(item === wordx.input && item != ''){
			        		scope.count ++
		          		}				      
					  
			        });			     

			      	if(scope.count >= 2){
	          			scope.wordIn = true
	          			scope.count = 0
	          		}else{scope.wordIn = false;scope.count = 0}

				if(item === '' || scope.wordIn === true) return; 
				
				// Verificamos la respuesta. Añadimos una propiedad right o wrong para definir si el item es correcto o no
				for(var i=0; i < pattern.length; i++){
					if( item.indexOf(pattern[i].word) > -1 ){
						rightAnswers++;
						chances--;
						word.wrong = false;
						word.right = true;
						word.completed = true; // marcamos el item como completo, para desactivar el input
						break
					} else {
						
						if(items.hasOwnProperty('answer2')){
							if(item === items.answer2){
								chances--;
								word.wrong = false;
								word.right = true;
								word.completed = true; // marcamos el item como completo, para desactivar el input
								break
							}else{
							       	word.right = false;
									word.wrong = true;
	                    		}
						}else {
						
							word.right = false;
							word.wrong = true;
                    	}
					}

				}
					
					if(word.wrong === true && chancesPerItem === 0){
						word.completed = true; // marcamos el item como completo, para desactivar el input
						chancesPerItem = 1
						chances--;
						item ="";
					}else{chancesPerItem = 0 ;}

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

