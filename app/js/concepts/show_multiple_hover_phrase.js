/**
 * Created by mateoquintero on 5/19/14.
 */
var lizShowMultipleHoverPhrase = angular.module('lizShowMultipleHoverPhrase', []);

lizShowMultipleHoverPhrase.directive('showMultipleHoverPhrase', function ($sce, $log) {
    return {
        restrict: 'E',
        scope: {
            options: '=',
            title: '@',
            description: '@',
            audio:'@',
            instruction: '@'
        },
        templateUrl: '../views/concepts/show_multiple_hover_phrase.html',
        link: function (scope, iElement, iAttrs) {
            $log.log(scope);
            scope.$root.isNextEnabled = true;

            // Permite el uso de html
            scope.sanitize = function (phrase) {
                return $sce.trustAsHtml(phrase);
            };
        }
    };
});