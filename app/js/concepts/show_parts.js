var lizShowParts = angular.module('lizShowParts', []);

lizShowParts.directive('showParts', function () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			title: '@',
			description: '@'
		},
		templateUrl: '../views/concepts/show_parts.html',
		link: function (scope, element, attrs) {

			var opt = scope.options,
				completedItems = 0; // Contador usado para definir el fin de la actividad

			scope.canvas = opt.canvas;
			scope.alt = opt.alt;
			scope.items = opt.items;
			scope.selectedItem = false; // Elemento actual

			/**
			 * Selecciona el elemento indicado
			 */
			scope.selectItem = function (item) {

				scope.selectedItem = item;

				// Contamos los elementos completos
				if(!item.hasOwnProperty('isCompleted')){
					item.isCompleted = true; // marcamos el elemento, para no volver a seleccionarlo
					completedItems++;
				}

				// Fin de la actividad
				if(completedItems === scope.items.length){
					scope.$root.isNextEnabled = true;
				}

			};

			/**
			 * Devuelve los estilos del item-title
			 */
			scope.getItemTitleStyles = function (item) {
				return "width: " + item.position.w + "em;" +
					"top: " + item.position.t + "em;" +
					"left: " + item.position.l + "em;"; 
			};
			

		}
	}; 
});
