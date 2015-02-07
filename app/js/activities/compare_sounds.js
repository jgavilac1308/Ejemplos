var lizCompareSounds = angular.module('lizCompareSounds', ['factories']);

lizCompareSounds.directive('compareSounds', function  (shuffleArrayFactory) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			hideImages: '@',
			description: '@'
		},
		templateUrl: '../views/activities/compare_sounds.html',
		link: function (scope, element, attrs) {

			var items = scope.options.items;
			scope.items = shuffleArrayFactory.run(items.slice(0));
			scope.audios = items.slice(0).filter(function(item){ return !item.hasOwnProperty('noSound'); });
			scope.items.forEach(function(item){
				if(! item.hasOwnProperty('type')) item.type = 'class';
				if(! item.hasOwnProperty('audio')) item.audio = item.resource;
			});
		}
	}; 
});
