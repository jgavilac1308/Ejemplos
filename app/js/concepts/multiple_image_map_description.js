var lizMultipleImageMapDescription = angular.module('lizMultipleImageMapDescription', []);

lizMultipleImageMapDescription.directive('multipleImageMapDescription', function () {
    return {
        restrict: 'E',
        scope: {
            options: '=',
            title: '@',
            description: '@',
            audio:'@',
            instruction: '@',
            mainimg: '@',
            alt: '@'
        },
        templateUrl: '../views/concepts/multiple_image_map_description.html',
        link: function (scope, element, attr) {
            scope.maps = scope.options.maps;
            completedItems = 0;

            angular.forEach(scope.maps, function (value, key) {
                value.display = false;
                value.data.multiple = true;
                value.checked = false;
            });
            console.log(scope.maps);
            scope.displayOptions = true;
            scope.backEnabled = false;

            // watch if the activity is finished
            scope.$watch('complete', function(complete) {
                if (complete) {

                    // Activamos la siguiente actividad o ruta
                    scope.$root.isNextEnabled = true;
                }
            });

            scope.goBack = function () {
                angular.forEach(scope.maps, function (value, key) {
                    value.display = false;
                });

                scope.displayOptions = true;
                scope.backEnabled = false;

                if (completedItems === scope.maps.length) {
                    scope.complete = true;
                }
            };

            scope.selectMap = function (map) {
                scope.displayOptions = false;
                map.display = true;
                scope.title = map.title;
                scope.description = map.description;
                scope.audio = map.audio;
                scope.instruction = map.instruction;
                scope.backEnabled = true;

                if (map.checked === false) {
                    completedItems++;
                    map.checked = true;
                }
            };
        }
    };
});
