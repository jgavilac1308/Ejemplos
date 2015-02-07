var lizGroupCompleteSound = angular.module('lizGroupCompleteSound', []);

lizGroupCompleteSound.directive('groupCompleteSound', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/group_complete_sound.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			addicon:'@' 
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.itemsPerRow = scope.options.itemsPerRow;
			scope.selectedItem = false; // elemento seleccionado
			scope.pattern = scope.items.pattern;
			scope.text = scope.items.text;
			minRightAnswers = scope.options.minRightAnswers;
			scope.nodisabled = scope.options.nodisabled;//desactiva el bloqueo del input
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

				if(scope.itemsPerRow === 2){
					styles += "width: " + (98 / scope.itemsPerRow) + "%;";
				} 
				if (scope.itemsPerRow === 3) {
					styles += "width: " + (97 / scope.itemsPerRow) + "%;";
				}
				if (scope.itemsPerRow === 5) {
					styles += "width: " + (97 / scope.itemsPerRow) + "%;";
				}
				if (scope.itemsPerRow === 1) {
					styles += "width: " + (100 / scope.items.length) + "%;";
					/*styles += "margin-left: " + (10 / scope.itemsPerRow) + "%;";
					styles += "margin-top: " + (10 / scope.itemsPerRow) + "%;";*/
				}
				
				return styles;

				
			};

			/**
			 * Para obtener los estilos de los elementos, específicamente el ancho
			 */
			scope.getStyles2 = function function_name(argument) {
				var styles = "";

				if(scope.itemsPerRow === 2){
					styles += "width: 22%";
				} 
				if (scope.itemsPerRow === 3) {
					styles += "width: 35%";
					/*styles += "margin-left: " + (10 / scope.itemsPerRow) + "%;";
					styles += "margin-top: " + (10 / scope.itemsPerRow) + "%;";*/
				}
				if (scope.itemsPerRow === 5) {
					styles += "width: 35%";
					/*styles += "margin-left: " + (10 / scope.itemsPerRow) + "%;";
					styles += "margin-top: " + (10 / scope.itemsPerRow) + "%;";*/
				}
				if (scope.itemsPerRow === 1) {
					styles += "width: " + (100 / scope.items.length) + "%;";
					/*styles += "margin-left: " + (10 / scope.itemsPerRow) + "%;";
					styles += "margin-top: " + (10 / scope.itemsPerRow) + "%;";*/
				}
				
				return styles;

				
			};
			/*margin-top: -7%;
			left: 44%;*/

			/**
			 * Para obtener los estilos de los elementos, específicamente el ancho
			 */
			scope.getStyles3 = function function_name(argument) {
				var styles = "";

				if(scope.itemsPerRow === 2){
					styles += "width: 76%";
				}
				if (scope.itemsPerRow === 3) {
					styles += "width: 62%";
				}
				if (scope.itemsPerRow === 5) {
					styles += "width: 62%";
				}
				if (scope.itemsPerRow === 1) {
					styles += "width: " + (100 / scope.items.length) + "%;";
				}
				
				return styles;

				
			};
				
			/**
			 * Selecciona el elemento indicado
			 */
			scope.selectItem = function (item) {

				scope.selectedItem = item; // seleccionamos el objeto

				// Contamos los elementos completos
				if(!item.hasOwnProperty('isCompleted')){
					item.isCompleted = true; // marcamos el elemento, para no volver a seleccionarlo
					completedItems++;
				}

				// Fin de la actividad
				if(completedItems === scope.items.length){
		
				}
			};
		   
			/**
			 * Verifica si el input cumple con las condiciones del número 
			 */
			 var chancesPerItem = 1


			scope.verify = function (item) {
				
				if((item.input === '' ) || ! item.hasOwnProperty('input')) return; 

				
					if ( (item.input === item.text) || (item.text === "free" && item.input.length >= item.length) || ( item.hasOwnProperty('answer2') && item.input === item.answer2 && item.input.length >= item.length) ){						
							
							if(!item.completed){
								rightAnswers++;
								chances--;
							}
							item.wrong = false;
							item.right = true;
							item.completed = true; // marcamos el item como completo, para desactivar el input
							
					} 
					else {
								
							item.wrong ? chancesPerItem = 0: chancesPerItem = 1;
							item.wrong = true;
							
								if(chancesPerItem === 0){
		                    	item.input = "La respuesta correcta es: " + item.text;
		                    	item.completed = true;
		                    	chances--;
		                    	chancesPerItem = 1;
		                    	}
		                    	else{item.input ="";}

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

