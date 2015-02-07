var lizClickToSelectPosition = angular.module('lizClickToSelectPosition', []);

lizClickToSelectPosition.directive('clickToSelectPosition', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/click_to_select_position.html',
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
			scope.titlecanvas = scope.options.titlecanvas; // title de La imagen principal
			scope.pattern = scope.items.pattern;
			scope.answer2 = scope.items.answer2;
			scope.selectedItem = false; // elemento seleccionado
			scope.selectedItem2 = false; // elemento seleccionado
			scope.selectedItemAux = false; // elemento seleccionado
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

			

			/**
			 * Selecciona el elemento indicado
			 */
			scope.selectItem = function (item) {
			if(item.hasOwnProperty('isCompleted') || scope.selectedItem != false ) return;
				item.isCompleted = [];
				scope.selectedItemAux.select = [];
				scope.selectedItem = item; // seleccionamos el objeto
				scope.selectedItem.select = [];
				
			};

			/**
			 * Selecciona el objetivo indicado
			 */
			scope.selectItem2 = function (item) {
			if(scope.selectedItem === false ) return;

				scope.selectedItemAux = item; // seleccionamos el objeto

				if (scope.selectedItem.text === scope.selectedItemAux.text){
						item.wrong = false;
						item.right = true;
						scope.selectedItem = false; // borramos el elemento seleccionado		
						item.isCompleted = true; // marcamos el elemento, para no volver a seleccionarlo
						completedItems++;
						rightAnswers++
						scope.selectedItem2.target.wrong = false;
						
					

				}else{
					
					item.target = [];
					scope.selectedItem.wrong = true;
					scope.selectedItemAux.target.wrong = true;

					if(scope.selectedItem.select === true){
						
						/*if(!scope.selectedItem.hasOwnProperty('isCompleted')){*/
							
							completedItems++;
							scope.selectedItem.isCompleted = true; // marcamos el elemento, para no volver a seleccionarlo
							scope.selectedItem = false; // elemento seleccionado
							scope.selectedItemAux.target.wrong = false;
							scope.selectedItem2.target.wrong = false;

						/*}*/
					}else{
						scope.selectedItem.word = [];
						scope.selectedItem.word.wrong = true;
						scope.selectedItem.select = true;
						scope.selectedItem2 = item;
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



