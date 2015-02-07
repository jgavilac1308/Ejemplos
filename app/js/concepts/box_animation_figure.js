var lizBoxAnimationFigure = angular.module('lizBoxAnimationFigure', []);

lizBoxAnimationFigure.directive('boxAnimationFigure', function () {
	return {
		restrict: 'E',
		templateUrl: '../views/concepts/box_animation_figure.html',
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
