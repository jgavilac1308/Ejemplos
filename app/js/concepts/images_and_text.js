var lizImagesAndText = angular.module('lizImagesAndText', []);

lizImagesAndText.directive('imagesAndText', function ($sce) {
  return {
    restrict: 'E',
    templateUrl: '../views/concepts/images_and_text.html',
    scope: {
      options: "=",
      title: '@',
      description: '@',
      audio: '@',
      noafter: '@',
      maintext: '@',
      itemswidth:'@',
      addicon: '@',
      ext: '@'
    },

    link: function (scope) {
      scope.$root.isNextEnabled = true;
      
      scope.ext = scope.ext ? scope.ext : '.png';

      // Para usar el html en angular
      scope.sanitize = function (item) {

        return $sce.trustAsHtml(item);
      }

    }
  };
});
