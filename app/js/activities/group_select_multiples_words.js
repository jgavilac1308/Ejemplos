var lizGroupSelectMultiplesWords = angular.module('lizGroupSelectMultiplesWords', []);

lizGroupSelectMultiplesWords.directive('groupSelectMultiplesWords', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/group_select_multiples_words.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			titleBlock: '@',
			blockText: '@',
			style: '@',
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.images = scope.options.images;
			scope.chancesPerItem = scope.options.chancesPerItem;
			scope.itemswidth = scope.options.itemswidth ? scope.options.itemswidth : '100%' ;
			scope.examples = scope.options.examples;
			scope.pattern = scope.items.pattern;
			scope.words = [];
			minRightAnswers = scope.options.minRightAnswers
			rightAnswers = 0, // Contador de preguntas buenas
			chances = scope.options.chances,
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

					if( scope.items[j].pattern.indexOf(i) > -1 ){
						scope.items[j].words.push({
							  isInput: true,
						      input: '',
						      word: (words[i])
				      	});					 

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
			 var chancesPerItem = 1

			scope.verify = function (item,group) {
				if(group.hasOwnProperty('isCompleted')) return; 
				
				// Verificamos la respuesta. Añadimos una propiedad right o wrong para definir si el item es correcto o no
					if(item.isInput === true){
						
						rightAnswers++;
						item.wrong = false;
						item.right = true;
						item.completed = true; // marcamos el item como completo, para desactivar el input

						if(!group.hasOwnProperty('rightAnswers')){
		                    			group.rightAnswers = 1;
                		}else{group.rightAnswers += 1;}        

						if(group.rightAnswers === group.pattern.length){
	                    	group.isCompleted = true; // marcamos el elemento, para no volver a seleccionarlo
	                    	group.right = true
	                    	chances--;
	                    }				
						
					} else {
							
							if(!group.hasOwnProperty('chances')){
	                    			group.chances = 1;
                    		}else{group.chances += 1;}

							if(group.chances === scope.chancesPerItem){
		                    	group.isCompleted = true; // marcamos el elemento, para no volver a seleccionarlo
		                    	chances--;
		                    	group.wrong = true
	                    	}
	                    	
                			item.wrong = true;
							item.right = false;              	
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

