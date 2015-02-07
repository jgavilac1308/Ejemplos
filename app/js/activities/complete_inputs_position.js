var lizCompleteInputsPosition = angular.module('lizCompleteInputsPosition', []);

lizCompleteInputsPosition.directive('completeInputsPosition', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/complete_inputs_position.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@'
			
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.itemsPerRow = scope.options.itemsPerRow;
			scope.canvas = scope.options.canvas; // La imagen principal
			scope.canvasalt = scope.options.canvasalt;
			scope.imgStyle = scope.options.imgStyle; // estilos de La imagen principal
			scope.examples = scope.options.examples;
			scope.pattern = scope.items.pattern;
			scope.answer2 = scope.items.answer2;
			minRightAnswers = scope.options.minRightAnswers
			chancesPerItem = scope.options.chancesPerItem ? scope.options.chancesPerItem : 1
			rightAnswers = 0, // Contador de preguntas buenas
			chances = scope.options.chances,
			scope.success = false;
			scope.failure = false;
			scope.block = false;
			completedItems = 0;

			// Recorremos todos los items
			      scope.items.forEach(function (item) {
			        
		      		if (item.default){

		      			item.complete = [];

		      			item.complete.push({
						  complete: true,								      
						});

						rightAnswers++;
						chances--;
						item.wrong = false;
						item.right = true;
						item.completed = true; // marcamos el item como completo, para desactivar el input
						item.input = item.pattern ;

		      		}

			      });
			/**


			 * Para obtener los estilos de los elementos, específicamente el ancho
			 */
			scope.getTargetsStyles = function (item) {
				var styles = '';

				styles += 'width: ' + item.w + 'px;';
				styles += 'height: ' + item.h + 'px;';
				styles += 'top: ' + item.t + '%;';
				styles += 'left: ' + item.l + '%;';

				/*// estilos personalizados
				if(opt.hasOwnProperty('customStyles')) styles += opt.customStyles;*/

				return styles;
			};
			/**
			 * Para obtener los estilos las calificaciones de los targets 
			 */
			scope.getTargetsStyles2 = function (item) {
				var styles = '';

				styles += 'width: ' + item.w + 'px;';
				styles += 'height: ' + item.h + 'px;';
				styles += 'top: ' + item.t + '%;';
				styles += 'left: ' + item.l + '%;';
				styles += 'background-size: ' + item.w + 'px;' + item.w + 'px;';
				/*// estilos personalizados
				if(opt.hasOwnProperty('customStyles')) styles += opt.customStyles;*/

				return styles;
			};

			

			

			scope.verify = function (item) {

				if((item.input === '' ) || ! item.hasOwnProperty('input')) return;

					item.complete = [];					
					

						if( item.pattern.indexOf(item.input) > -1  || item.pattern[0] === "free" ){
								
								item.complete.push({
									  complete: true,								      
								});
								

						} 

						else{
							
						}			


				// Si se han completado todos
					
				if (item.complete.length >= 1) {
							
							rightAnswers++;
							chances--;
							item.wrong = false;
							item.right = true;
							item.completed = true; // marcamos el item como completo, para desactivar el input
							
					} 
					else {
							item.wrong ? chancesPerItem = scope.options.chancesPerItem ? scope.options.chancesPerItem - 1 : chancesPerItem = 1 : chancesPerItem = scope.options.chancesPerItem ? scope.options.chancesPerItem : chancesPerItem = 1 ;
							chancesPerItem--	
							item.wrong = true;
								if(chancesPerItem === 0){
		                    	item.completed = true;
		                    	item.input = item.pattern;
		                    	chances--;
		                    	chancesPerItem = scope.options.chancesPerItem ? scope.options.chancesPerItem : 1
		                    	}
		                    	else{item.input="";}

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



