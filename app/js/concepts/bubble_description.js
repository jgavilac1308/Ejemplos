var lizBubbleDescription = angular.module('lizBubbleDescription', []);

lizBubbleDescription.directive('bubbleDescription', function () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			title: '@',
			description: '@',
			audio:'@',
			instruction: '@'
		},
		templateUrl: '../views/concepts/bubble_description.html',
		link: function (scope, iElement, iAttrs) {
			scope.items = scope.options.items;
			completedItems = 0;

			angular.forEach(scope.items, function (item) {
				item.hoverBubble = false
			});

			scope.onHoverBubble = function (item) {
				item.hoverBubble = true;
			};

			scope.onLeaveBubble = function (item) {
				item.hoverBubble = false;
				completedItems++;

				if(completedItems === scope.items.length){
					scope.$root.isNextEnabled = true;
				}
			}	
		}
	};
});