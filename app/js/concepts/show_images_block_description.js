var lizShowImagesBlockDescription = angular.module('lizShowImagesBlockDescription', []);

lizShowImagesBlockDescription.directive('showImagesBlockDescription', [function () {
	return {
		restrict: 'E',
		templateUrl: '../views/concepts/show_images_block_description.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			title: '@',
			instruction: '@',
		},
		link: function (scope,iElement,iAttrs,$sce) {
			var opt = scope.options,
				completedBlocks = 0;

			scope.blocks = opt.blocks;
			scope.selectedBlock = false; // elemento seleccionado

			// Para usar el html en angular
			scope.sanitize = function (item) {
				return $sce.trustAsHtml(item);
			}

			/**
			 * Selecciona el elemento indicado
			 */
			 scope.selectBlock = function (block) {
			 	console.log(block);
			 	scope.selectedBlock = block; // seleccionamos el objeto

			 	// Contamos los elementos completos
				if(!block.hasOwnProperty('isCompleted')){
					block.isCompleted = true; // marcamos el elemento, para no volver a seleccionarlo
					completedBlocks++;
				}

				// Fin de la actividad
				if(completedBlocks === scope.blocks.length){
					scope.$root.isNextEnabled = true;
				}
			 }
		}
	};
}])