var lizClickTransition = angular.module('lizClickTransition', []);

lizClickTransition.directive('clickTransition', function () {
	return {
		restrict: 'E',
		templateUrl: '../views/concepts/click_transition.html',
		scope: {
			options: "=",
			title: '@',
			instruction: '@',
			description: '@'
		},
		controller: function ($scope, $sce) {
			// Si la descripción o el título están, entonces la instrucción va al fondo
			$scope.isBottom = $scope.title || $scope.description;

			// Para usar el html en angular
			$scope.sanitize = function (item) {
				return $sce.trustAsHtml(item);
			}

			// Verifica el final de la actividad, según el número de imágenes 
			// Para ello, manejamos un contador. Cada vez que se da click en una imagen,
			// se le agrega una propiedad con el fin de que se cuente una sola vez.
			// Cuando el contador es igual al número de imágenes, se termina la actividad
			$scope.verify = function (item) {
				if(typeof $scope.completeCounter === "undefined")
					$scope.completeCounter = 0;

				if(typeof item.clicked === "undefined"){
					item.clicked = true;
					$scope.completeCounter++;

					if($scope.completeCounter === $scope.options.length) {
						$scope.$root.isNextEnabled = true; // Activamos el botón de siguiente
					}
				}
			};
		}
	};
});
