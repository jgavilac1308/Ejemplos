var lizChangeStyleSelect = angular.module('lizChangeStyleSelect', []);

lizChangeStyleSelect.directive('changeStyleSelect', function () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			title: '@',
			description: '@',
			audio:'@',
			instruction: '@',
			titleBlock: '@',
			bgimg: '@',
			mainimg: '@'
		},
		templateUrl: '../views/concepts/change_style_select.html',
		link: function (scope, element, attrs) {

			var opt = scope.options,
				completedItems = 0;

			scope.items = opt.items;
			scope.selectedItem = false; // elemento seleccionado
			scope.limit = (opt.items.length - Math.floor(opt.items.length/2));

			
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

			/**
			 * Devuelve los estilos personalizados de los items
			 */
			scope.getItemStyles = function (style) {
				var styles = "";
				styles += style;
				return styles;
			};


			/**
			 * Devuelve los estilos del item seleccionado
			 */
			scope.getItemStyles2 = function (item) {
				if(scope.selectedItem !== item) return;
				return item.style2;
			};

		}
	}; 
});

lizChangeStyleSelect.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});