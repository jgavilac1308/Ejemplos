var lizJoiningLines = angular.module('lizJoiningLines', []);

lizJoiningLines.directive('joiningLines', function () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			title: '@',
			description: '@',
			audio:'@',
			instruction: '@',
			alt: '@',
			mainimg: '@'
		},
		templateUrl: '../views/activities/joining_lines.html',
		link: function (scope, element, attrs) {

			var opt = scope.options;
				

			scope.items = opt.items;
			scope.answers = opt.answers;
			scope.selectedItem = false; // elemento seleccionado
			scope.selectedItem2 = false; // elemento seleccionado
			minRightAnswers = opt.minRightAnswers;
			var chancesPerItem = opt.chancesPerItem ? opt.chancesPerItem : 1;
			scope.linesContainer = opt.linesContainer;
			var rightAnswers = 0; // Contador de preguntas buenas
			scope.success = false;
			scope.failure = false;
			scope.block = false;
			var completedItems = 0;

			
			/**
			 * Selecciona el elemento indicado
			 */
			scope.selectItem = function (item) {
				if(item.isCompleted === true) return;

				scope.selectedItem2.wrong = false;
				scope.selectedItem2 = false;
				scope.selectedItem = item; // seleccionamos el objeto

				

				// Fin de la actividad
				if(completedItems === (scope.items.length) ){
					scope.$root.isNextEnabled = true;
				}
			};

			scope.selectItem2 = function (item) {
				if(item.isCompleted === true || scope.selectedItem === false) return;

				scope.selectedItem2.wrong = false;
				scope.selectedItem2 = item; // seleccionamos el objeto

				if(scope.selectedItem.answer === scope.selectedItem2.answer){

					rightAnswers++;
					scope.selectedItem2 = false;
					scope.selectedItem.wrong = false;
					scope.selectedItem.right = true;
					item.wrong = false;
					item.right = true;
					
					if(!item.hasOwnProperty('isCompleted')){
						scope.selectedItem.isCompleted = true;// marcamos el elemento, para no volver a seleccionarlo
						item.isCompleted = true; // marcamos el elemento, para no volver a seleccionarlo
						scope.selectedItem = false;
						completedItems++;
					}

				}else{

					if(scope.selectedItem.chances === 1){
						scope.selectedItem.isCompleted = true// marcamos el elemento, para no volver a seleccionarlo
						scope.selectedItem.wrong = true;
						scope.selectedItem = false;
						completedItems++;
					}
					
					scope.selectedItem.flash = true;
					scope.selectedItem.chances = 1;
					scope.selectedItem.right = false;
					item.wrong = true;
					item.right = false;
					console.log(scope.selectedItem);

					

				}


				// Fin de la actividad
				if(completedItems === (scope.items.length) ){
					if(rightAnswers >= minRightAnswers) {
						scope.$root.isNextEnabled = true;
			          scope.success = true;
			          return true;
			        }

			        scope.failure = true;
			        return false;
				}
			};

		 /**
		 * Devuelve los estilos según el elemento
		 */
		scope.getTargetsStyles = function (item) {
			var styles = '';
			styles += 'width: ' + item.w + '%;';
			styles += 'height: ' + item.h + '%;';
			styles += 'top: ' + item.t + '%;';
			styles += 'left: ' + item.l + '%;';
			styles += '-webkit-transform:rotate(' + item.r + 'deg);';
			styles += '-moz-transform:rotate(' + item.r + 'deg);';
			styles += '-o-transform:rotate(' + item.r + 'deg);';
			styles += '-ms-transform:rotate(' + item.r + 'deg);';
			styles += 'transform:rotate(' + item.r + 'deg);';

			return styles;
		};

		}
	}; 
});

