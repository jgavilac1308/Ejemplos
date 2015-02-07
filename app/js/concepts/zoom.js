var lizZoom = angular.module('lizZoom', []);

lizZoom.directive('zoom', function  () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			title: '@',
			instruction: '@',
			audio: '@',
			img: '@',
			bigImg: '@',
			alt: '@',
			description: '@'
		},
		templateUrl: '../views/concepts/zoom.html',
		link: function postLink(scope, element, attrs) {
			var opt = scope.options;

							
			// Si la descripción o el título están, entonces la instrucción va al fondo
			scope.isBottom = scope.title || scope.description;

			scope.mainimgstyles = opt.mainimgstyles;
			scope.items = opt.items;
			
			scope.showBig = false;

			/**
			 * Cierra el zoom y completa la actividad
			 */
			scope.complete = function () {
				scope.showBig = false;
				scope.$root.isNextEnabled = true;
			};
			
		}
	}; 
});
