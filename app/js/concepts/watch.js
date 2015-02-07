var lizWatch = angular.module('lizWatch', []);

lizWatch.directive('watch', function () {
	return {
		restrict: 'E',
		templateUrl: '../views/concepts/watch.html',
		scope: {
			options: "=",
			title: '@',
			description: '@',
			instruction: '@',
			audio:'@'
		},
		link: function (scope, element, attrs) {
			scope.items = scope.options; // Elementos a mostrar
			scope.$root.isNextEnabled = true; // Activamos el botón de siguiente
		}
	};
});
