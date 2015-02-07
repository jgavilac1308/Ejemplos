var lizTransclusion = angular.module('lizTransclusion', []);

lizTransclusion.directive('transclusion', function ($sce) {
	return {
		restrict: 'E',
		templateUrl: '../views/concepts/transclusion.html',
		transclude: true,
		scope: {
			title: '@',
			description: '@',
			instruction: '@',
			audio: '@',
			arrow: '=',
			addicon: '@',
      		mouse: '='
		},

		link: function (scope) {

			// Para usar el html en angular
			scope.sanitize = function (item) {
				return $sce.trustAsHtml(item);
			}

		}
	};
});
