var lizComplementary = angular.module('lizComplementary', []);

lizComplementary.directive('complementary', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/complementary.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@'
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			
			link = scope.options.link
			link2 = scope.options.link2
			link3 = scope.options.link3
			link4 = scope.options.link4

			scope.success = false;
			scope.failure = false;
			scope.block = false;
			
			var visitedlink = false;
			var visitedlink2 = scope.options.link2 ? false : true;
			var visitedlink3 = scope.options.link3 ? false : true;
			var visitedlink4 = scope.options.link4 ? false : true;

			scope.verify = function (item) {
				
				if(item === link) {visitedlink = true}
				if(item === link2){visitedlink2 = true};
				if(item === link3){visitedlink3 = true};
				if(item === link4){visitedlink4 = true};

				if ((visitedlink === true) && (visitedlink2 === true) && (visitedlink3 === true) && (visitedlink4 === true)){

					scope.$root.isNextEnabled = true;
					scope.success = true;
				}

			}; // verify()


			

		}


    }; 
});

