var lizComplementary2 = angular.module('lizComplementary2', []);

lizComplementary2.directive('complementary2', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/complementary2.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			mainimg: "@",
			mainalt: "@"
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			
			scope.caseLinks = scope.options.caseLinks;
			scope.success = false;
			scope.failure = false;
			scope.block = false;

			angular.forEach(scope.caseLinks, function (value, key) {
				value.visited = false;
			});
			
			var counter = 0;
			scope.verify = function (item) {
				
				item.visited = true;

				counter++;

				if (scope.caseLinks.length === counter) {

					scope.$root.isNextEnabled = true;
					scope.success = true;
				}

			}; // verify()


			/**
			 * Devuelve los estilos de cada elemento
			 */
			scope.getStyles = function (item) {
				var styles = '';

				styles += "top: " + item.t + "%;";
				styles += "left: " + item.l + "%;";
				styles += "width: " + item.w + "px;";
				styles += "height: " + item.h + "px;";
				
				return styles;
			};

		}


    }; 
});

