var lizText1 = angular.module('lizText1', []);

lizText1.directive('text1', function ($sce) {
	return {
		restrict: 'E',
		templateUrl: '../views/concepts/text1.html',
		scope: {
			descriptionTop: '@',
			title: '@',
			description: '@',
			audio:'@',
			img: '@',
			titletop: '@',
			titlemain:'@',
			imgTitle: '@',
			alt: '@',
			click:'@',
			block: "@",
			float: '@'
		},

		link: function (scope) {
			scope.$root.isNextEnabled = true;

		// Para usar el html en angular
		scope.sanitize = function (item) {
			return $sce.trustAsHtml(item);
		}

		}
	};
});
