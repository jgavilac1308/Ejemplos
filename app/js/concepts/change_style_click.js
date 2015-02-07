var lizChangeStyleClick = angular.module('lizChangeStyleClick', []);

lizChangeStyleClick.directive('changeStyleClick', function () {
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
		templateUrl: '../views/concepts/change_style_click.html',
		link: function (scope, element, attrs) {

			var opt = scope.options,
				completedItems = 0;

			scope.items = opt.items;
			scope.selectedItem = false; // elemento seleccionado
			scope.selectedItem2 = false; // elemento seleccionado
			scope.selectedItemAux = false; // elemento seleccionado
			rightAnswers = 0, // Contador de preguntas buenas
			chances = 0, // Contador de oportunidades de seleccion
			scope.limit = (opt.items.length - Math.floor(opt.items.length/2));

			
			/**
			 * Selecciona el elemento indicado
			 */
			scope.selectItem = function (item) {
				scope.selectedItem = item; // seleccionamos el objeto
			};

			/**
			 * Selecciona el objetivo indicado
			 */
			scope.selectItem2 = function (item) {
			if(item.isCompleted === true || scope.selectedItem === false ) return;

				scope.selectedItemAux = item; // seleccionamos el objeto

				if (scope.selectedItem === scope.selectedItemAux){
						scope.selectedItem2 = item;
						item.right = true;

					// Contamos los elementos completos
					if(!item.hasOwnProperty('isCompleted')){
						item.isCompleted = true; // marcamos el elemento, para no volver a seleccionarlo
						completedItems++;
						rightAnswers++
					}
				}else{
					scope.selectedItem.wrong = true;
					// Contamos los elementos completos
					if(!item.hasOwnProperty('isCompleted')){
						
						completedItems++;
						scope.selectedItem = false; // elemento seleccionado
						scope.selectedItem2 = false; // elemento seleccionado
						scope.selectedItemAux = false; // elemento seleccionado
					}
				}

				// Fin de la actividad
				if(completedItems === scope.items.length){

					if (rightAnswers >= scope.limit){
						scope.$root.isNextEnabled = true;
							scope.success = true;
						} else {
							scope.failure = true;
						}
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
				if(scope.selectedItem2 !== item) return;
				return item.style2;
			};

		}
	}; 
});

lizChangeStyleClick.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

lizChangeStyleClick.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});