var lizClickImageMap = angular.module('lizClickImageMap', []);

lizClickImageMap.directive('clickImageMap', function () {
	return {
		restrict: 'E',
		scope: {
			options: "=",
			title: '@',
			instruction: '@',
			description: '@'
		},
		templateUrl: '../views/concepts/click_image_map.html',
		link: function (scope, element, attrs) {

			var opt = scope.options,
				countCompleted = 0;

			// Recuperamos cada valor de las variables
			scope.canvas = scope.$root.resources + '/' + opt.canvas + '.png'; // imagen a mapear
			scope.canvasAlt = opt.canvasAlt; // Texto alternativo de la imagen
			scope.targets = opt.targets; // mapas donde se da click para el sonido

			// Si la descripción o el título están, entonces la instrucción va al fondo
			scope.isBottom = scope.title || scope.description;

			/**
			 * Revisa si el elemento ya fue seleccionado
			 */
			scope.markCompleted = function (target) {
				// Marcamos el elemento seleccionado con un valor booleano
				if(! target.hasOwnProperty('_isCompleted')){
					target._isCompleted = true;
				}

				// Contamos los completos
				countCompleted = scope.targets.filter(function(target){
					return target._isCompleted;
				}).length;

				// revisamos si ya se completaron todos los objetivos
				if(countCompleted === scope.targets.length){
					scope.$root.isNextEnabled = true;
				}

			};

			/**
			 * Devuelve los estilos de cada target
			 */
			scope.getTargetStyles = function (target) {

				var styles = "";

				styles += "width: " + target.w + "%;";
				styles += "height: " + target.h + "%;";
				styles += "top: " + target.t + "%;";
				styles += "left: " + target.l + "%;";

				return styles;
				
			};


		}
	}; 
});
