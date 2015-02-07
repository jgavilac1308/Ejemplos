var lizImageSound = angular.module('lizImageSound', []);

lizImageSound.directive('imageSound', function () {
	return {
		restrict: 'E',
		scope: {
			options: '='
		},
		templateUrl: '../views/concepts/image_sound.html',
		link: function (scope, element, attrs) {

			var opt = scope.options,
				completedItems = 0;

            if (opt.hasOwnProperty('multiple')) {
                opt.multiple = false;
            }

			scope.canvas = opt.canvas;
			scope.canvasAlt = opt.canvasAlt;
			scope.items = opt.items;

			scope.makeId = function (id) {
				var newId = id.replace(" ", "_");
                var text = newId + "_";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 5; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
				}

                return text;
            };

			angular.forEach(scope.items, function (value, key) {
				value.id = scope.makeId(value.button);
			});

			/**
			 * Selecciona el elemento indicado
			 */
			/*scope.selectItem = function (item) {
				scope.selectedItem = item; // seleccionamos el objeto

				// Contamos los elementos completos
				if(!item.hasOwnProperty('isCompleted')){
					item.isCompleted = true; // marcamos el elemento, para no volver a seleccionarlo
					completedItems++;
				}

				// Fin de la actividad
				if(completedItems === scope.items.length){
					if (opt.multiple === false) {
                        scope.$root.isNextEnabled = true;
                    }
				}
			};*/

			/**
			 * Devuelve los estilos de cada elemento
			 */
			scope.getStyles = function (item) {
				var styles = '';

				styles += "top: " + item.t + "%;";
				styles += "left: " + item.l + "%;";
				
				return styles;
			};


		}
	}; 
});

