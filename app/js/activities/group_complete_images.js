var lizGroupCompleteImages = angular.module('lizGroupCompleteImages', []);

lizGroupCompleteImages.directive('groupCompleteImages', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/group_complete_images.html',
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
			scope.pattern = scope.items.pattern;
			scope.images = scope.items.images;
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

		   	var x = -1
		   	var string = items[j].text;
			var words = string.split(" ");

			scope.items[j].words = [];

			
				
				for(var i=0; i < words.length; i++){
					if( scope.items[j].pattern.indexOf(i) > -1 ){
						x++
						console.log(x);
						if(scope.items[j].hasOwnProperty('answer2')){
							if(scope.items[j].answer2[x] !=''){
								scope.items[j].words.push({
									  isInput: true,
								      input: '',
								      word: (words[i]),
								      answer2: (scope.items[j].answer2[x]),
								      img: (scope.items[j].images[x])
								});
							}else{
							scope.items[j].words.push({
								  isInput: true,
							      input: '',
							      word: (words[i]),
							      img: (scope.items[j].images[x])
					      	});

						}

						}else{
							scope.items[j].words.push({
								  isInput: true,
							      input: '',
							      word: (words[i]),
							      img: (scope.items[j].images[x])
					      	});

						}

						console.log(scope.items[j].words);
					 

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
						
						if(item.hasOwnProperty('answer2')){
							
							if(item.input === item.answer2){
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
			                    	chances--;
			                    	chancesPerItem = 1;
			                    	}else{item.input="";}
                    	}

						}else {
						
							item.wrong ? chancesPerItem = 0: chancesPerItem = 1;
							item.wrong = true;
							
									if(chancesPerItem === 0){
			                    	item.completed = true;
			                    	chances--;
			                    	chancesPerItem = 1;
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

