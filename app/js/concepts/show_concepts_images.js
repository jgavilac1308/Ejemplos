var lizShowConceptsImages = angular.module('lizShowConceptsImages', []);

lizShowConceptsImages.directive('showConceptsImages', [function () {
	return {
		restrict: 'E',
		templateUrl: '../views/concepts/show_concepts_images.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			instruction: '@',
			mainimg: '@',
			mainalt: '@'
		},
		link: function (scope, iElement, iAttrs) {
			var opt = scope.options,
				completedItems = 0;

			scope.items = opt.items;
			console.log(scope.options);
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
			 }
		}
	};
}])