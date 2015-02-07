var lizDifferences = angular.module('lizDifferences', []);

lizDifferences.directive('differences', function  () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			audio: '@',
			description: '@'
		},
		templateUrl: '../views/activities/differences.html',
		link: function postLink(scope, element, attrs) {

			var opt = scope.options,
				pass = false; // Used to evaluate if the inputs are right

			scope.images = opt.images;
			scope.inputs = [];
			scope.passes = false; // Define si la actividad cumple o no

			// Activa el botón de siguiente desde el inicio
			scope.$root.isNextEnabled = true;

			// Constructor de inputs
			for (var i=0; i < opt.inputs; i++) {
				scope.inputs.push({
					input: ''
				});
			}

			scope.$root.beforeGoNext = function () {
				if(pass){
					scope.success = true;
					return true;
				} else {
					scope.failure = true;
					return false;
				}
			}

			/**
			 * Verifica el fin de la actividad
			 */
			scope.verify = function () {
				// Contamos los elementos que cumplen las condiciones
				var matches = scope.inputs.filter(function(item){
					return item.input.toLowerCase().match(/([bcdfghjklmnñpqrstvwxyz])/) &&
						item.input.toLowerCase().match(/([aeiou])/);
				}).length;

				// Comparamos el número con el total de elementos
				if(matches === scope.inputs.length){
					pass = true;
				} else {
					pass = false;
				}
			}


			
		}
	}; 
});
