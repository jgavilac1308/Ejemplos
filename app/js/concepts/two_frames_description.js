var lizTwoFramesDescription = angular.module('lizTwoFramesDescription', []);

lizTwoFramesDescription.directive('twoFramesDescription', function ($timeout) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			title: '@',
			description: '@',
			audio:'@',
			instruction: '@'
		},
		templateUrl: '../views/concepts/two_frames_description.html',
		link: function (scope, element, attrs) {
			var opt = scope.options,
				completedItems = 0;

			scope.items = opt.items;
			scope.selectedItem = false; // elemento seleccionado

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
					scope.$root.isNextEnabled = true;
				}

				// Captura el alto de text-block
				$timeout(function(){
					var $textBlock = element.find('.text-box'),
						$mainImg = element.find('.main-img-inner');

					$mainImg.height( $textBlock.height() - ( parseInt($mainImg.css('border-width')) * 2 ) );
				}, 100);
			};


		}
	}; 
});

