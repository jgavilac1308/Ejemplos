var lizGroupSelectWords = angular.module('lizGroupSelectWords', []);

lizGroupSelectWords.directive('groupSelectWords', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/group_select_words.html',
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
			scope.answer2 = scope.items.answer2;
			scope.selectedItem = false; // elemento seleccionado
			scope.selectedItem2 = false; // elemento seleccionado
			scope.selectedItemAux = false; // elemento seleccionado
			scope.words = [];
			scope.words.word = [];
			minRightAnswers = scope.options.minRightAnswers
			rightAnswers = 0, // Contador de preguntas buenas
			chances = scope.options.chances,
			scope.success = false;
			scope.failure = false;
			scope.block = false;
			completedItems = 0;
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

			var items = scope.items;

		   // Constructor de palabras
		   for(var j=0; j < items.length; j++){

		   	var counter = 0;
		   	var string = items[j].text;
			var words = string.split(" ");

			scope.items[j].words = [];

			
				
				for(var i=0; i < words.length; i++){

					if( scope.items[j].pattern.indexOf(i) > -1 ){
						if(scope.items[j].answer2[i]!=""){
							scope.items[j].words.push({
								  isInput: true,
							      input: (words[i]),
							      word: (words[i]),
							      answer2: (scope.items[j].answer2[counter])
							});
							counter++
						}else{
							scope.items[j].words.push({
								  isInput: true,
							      input: (words[i]),
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
			 * Selecciona el elemento indicado
			 */
			scope.selectItem = function (item) {
				console.log(scope.selectedItem2);
				scope.selectedItemAux.select = [];
				scope.selectedItem = item; // seleccionamos el objeto
				scope.selectedItem.select = [];
				
			};

			/**
			 * Selecciona el objetivo indicado
			 */
			scope.selectItem2 = function (item) {
				console.log(item);
				console.log(scope.selectedItem);
			if(scope.selectedItem === false ) return;

				scope.selectedItemAux = item; // seleccionamos el objeto

				if (scope.selectedItem.word === scope.selectedItemAux.word){
						scope.selectedItem2 = item;
						item.word = [];
						item.word.right = true;		
					
						// Contamos los elementos completos
						if(!item.hasOwnProperty('isCompleted')){
							item.isCompleted = true; // marcamos el elemento, para no volver a seleccionarlo
							completedItems++;
							rightAnswers++
						}
					

				}else{
					
					item.select = [];
					item.select.wrong = true;

					if(scope.selectedItem.word.wrong === true){
						// Contamos los elementos completos
						if(!scope.selectedItem.hasOwnProperty('isCompleted')){
							
							completedItems++;
							scope.selectedItem.isCompleted = true; // marcamos el elemento, para no volver a seleccionarlo
							scope.selectedItem = false; // elemento seleccionado
							
						}
					}else{
						scope.selectedItem.word = [];
						scope.selectedItem.word.wrong = true;
						scope.selectedItem = false; // elemento seleccionado
						
					}
				}


				// Fin de la actividad
				if(completedItems === chances){

					if (rightAnswers >= minRightAnswers){
						scope.$root.isNextEnabled = true;
							scope.success = true;
						} else {
							scope.failure = true;
						}
				}

				
			};	

			scope.random = function(){
    			return 0.5 - Math.random();
			};	

		}

		


    }; 
});



