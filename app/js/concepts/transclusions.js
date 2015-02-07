var lizTransclusions = angular.module('lizTransclusions', []);

lizTransclusions.directive('transclusions', function () {
	return {
		restrict: 'E',
		templateUrl: '../views/concepts/transclusions.html',
		transclude: true,
		scope: {
			title: '@',
			description: '@',
			instruction: '@',
			audio: '@',
			arrow: '=',
			addicon: '@',
      		mouse: '='
		}
	};
   
});
