var lizShowName = angular.module('lizShowName', []);

lizShowName.directive('showName', function ($sce) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			title: '@',
			description: '@',
			audio:'@',
			instruction: '@',
			mainimg: '@'
		},
		templateUrl: '../views/concepts/show_name.html',
		link: function (scope, element, attrs) {

			var opt = scope.options,
				completedItems = 0;

			scope.items = opt.items;
			scope.selectedItem = false; // elemento seleccionado
			scope.itemsPerRow = opt.itemsPerRow ? opt.itemsPerRow : false;

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
			};

			// Para usar el html en angular
			scope.sanitize = function (item) {
				return $sce.trustAsHtml(item);
			}

			/**
			 * Devuelve los estilos personalizados de los items
			 */
			scope.getItemStyles = function () {
				var styles = "";

				if(scope.itemsPerRow){
					styles += "width: " + (96 / scope.itemsPerRow) + "%;";
				}else{
				styles += "width: " + (100 / (scope.items/2)) + "%;";
				};

				return styles;
			};

		}
	}; 
});

