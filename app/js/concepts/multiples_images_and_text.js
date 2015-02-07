var lizMultiplesImagesAndText = angular.module('lizMultiplesImagesAndText', []);

lizMultiplesImagesAndText.directive('multiplesImagesAndText', function ($sce) {
  return {
    restrict: 'E',
    templateUrl: '../views/concepts/multiples_images_and_text.html',
    scope: {
      options: "=",
      title: '@',
      description: '@',
      audio: '@',
      noafter: '@',
      addicon: '@'
    },

    link: function (scope) {
      // activamos las opciones
      scope.items = scope.options.items;
      scope.items2 = scope.options.items2;
      scope.itemsPerRow = scope.options.itemsPerRow;
      scope.$root.isNextEnabled = true;


      // Para usar el html en angular
      scope.sanitize = function (item) {
        console.log(item);
        return $sce.trustAsHtml(item);
      }

      console.log(scope.options);

    }
  };
});
