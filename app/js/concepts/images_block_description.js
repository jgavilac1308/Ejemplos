/**
 * Muestra bloques de imagenes con o sin audio ejecutados
 * por los bloques.
 */
 var lizImagesBlockDescription = angular.module('lizImagesBlockDescription', []);

 lizImagesBlockDescription.directive('imagesBlockDescription', function ($sce){
 	// Runs during compile
 	return {
 		// name: '',
 		// priority: 1,
 		// terminal: true,
 		scope: {
 			options: "=",
 			title: "@",
      		description: '@',
      		instruction: '@',
      		audio: '@'
 		}, // {} = isolate, true = child, false/undefined = no change
 		// controller: function($$scope, $element, $attrs, $transclude) {},
 		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
 		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
 		// template: '',
 		templateUrl: '../views/concepts/images_block_description.html',
 		// replace: true,
 		// transclude: true,
 		// compile: function(tElement, tAttrs, function transclude(function($scope, cloneLinkingFn){ return function linking($scope, elm, attrs){}})),
 		link: function($scope) {

 			if (false === $scope.options.hasAudio) {
 				$scope.$root.isNextEnabled = true;
 			}

 			$scope.hasZoomImage = $scope.options.hasZoomImage || false;
 			$scope.blocks = $scope.options.blocks;
 			$scope.customClass = ($scope.options.customClass) ? $scope.options.customClass : "";
 			$scope.complete = false; // Cuando termina la actividad
      		$scope.hideDescription = $scope.options.hideDescription;
      		$scope.itemsPerRow = $scope.options.itemsPerRow;
      		// Si la descripción o el título están, entonces la instrucción va al fondo
      		$scope.isBottom = $scope.title || $scope.description;

      		$scope.$watch('complete', function (complete) {
		        if (complete) {
		          	$scope.$root.isNextEnabled = true;
		        }
	      	});

	      	$scope.sanitize = function (item) {
	      		console.log(item);
				return $sce.trustAsHtml(item);
			}

	      	/**
			 * Para obtener los estilos de los elementos, específicamente el ancho
			 */
			$scope.getStyles = function () {
				var styles = "";

				if($scope.itemsPerRow){
					styles += "width: " + (100 / $scope.itemsPerRow) + "%;";
				} else {
					styles += "width: " + (100 / $scope.blocks.length) + "%;";
				}
				
				return styles;
			}

	      	var counter = 0;

	      	$scope.verify = function (block) {
	      		counter++;

	      		if (counter === $scope.options.blocks.length) {
	      			$scope.complete = true;
	      		}
	      	}
 		}
 	};
 });