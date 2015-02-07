var lizImagesInfo = angular.module('lizImagesInfo', []);

lizImagesInfo.directive('imagesInfo', function () {
	return {
		restrict: 'E',
		templateUrl: '../views/concepts/images_info.html',
		scope: {
			options: "=",
      title: '@',
      description: '@',
			instruction: '@',
			audio:'@'
		},
		link: function (scope, element, attrs) {
      var opt = scope.options,
        completedImages = 0; // Contador

      scope.selectedImage = false;
      scope.images = opt.images;
      scope.isBottom = scope.title || scope.description; // Define donde va la instrucción

      scope.images.forEach(function (image) {
        image.imgExt = image.hasOwnProperty('imgExt') ? image.imgExt : 'png'
      });


      /**
       * Verificamos la imagen. Esta función define el fin de la actividad y selecciona la imagen.
       */
      scope.verify = function (image) {
        scope.selectedImage = image;

        if(image.completed) return;

        image.completed = true;
        completedImages += 1;

        if(completedImages === scope.images.length) {
          scope.$root.isNextEnabled = true;
        }
      };

		}
	};
});
