var lizImageMapDescription = angular.module('lizImageMapDescription', []);

lizImageMapDescription.directive('imageMapDescription', function ($sce) {
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
		templateUrl: '../views/concepts/image_map_description.html',
		link: function (scope, element, attrs) {
			var opt = scope.options,
				completedItems = 0;

			// Si la descripción o el título están, entonces la instrucción va al fondo
			scope.isBottom = scope.title || scope.description;

			scope.canvas = opt.canvas;
			scope.canvasAlt = opt.canvasAlt;
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
			};


			/**
			 * Devuelve los estilos de cada elemento
			 */
			scope.getStyles = function (item) {
				var styles = '';

				styles += "top: " + item.t + "%;";
				styles += "left: " + item.l + "%;";	
				return styles;
			};


      /**
       * Sanitizes the value as html
       * @param value
       * @returns String converted string
       */
      scope.sanitize = function (value) {
        return $sce.trustAsHtml(value);
      };



		}
	}; 
});

