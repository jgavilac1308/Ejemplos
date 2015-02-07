var lizLetter1 = angular.module('lizLetter1', []);

lizLetter1.directive('letter1', function () {
	return {
		restrict: 'E',
		templateUrl: '../views/concepts/letter1.html',
		transclude: true,
		scope: {
			letter: "@"
		},
		link: function (scope) {
			scope.activateNext = function () {
				scope.$root.isNextEnabled = true;
			}
		}
	};
});
