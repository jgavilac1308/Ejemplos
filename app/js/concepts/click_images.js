var lizClickImages = angular.module('lizClickImages', []);

lizClickImages.directive('clickImages', function () {
	return {
		restrict: 'E',
		templateUrl: '../views/concepts/click_images.html',
		scope: {
			options: "=",
			img: '@', // Imagen al lado de click images
			alt: '@',
			title: '@',
			watch: '@',
			instruction: '@',
			description: '@',
			itemsPerRow: '@',
			priority: '@',
			audio:'@'
		},
		controller: function ($scope, $sce) {
			$scope.items = $scope.options; 

			// Recorremos los elementos para definir el audio
			$scope.items.forEach(function(item){
				item.audio = item.hasOwnProperty('audio') ? item.audio : item.resource;
				item.type = item.hasOwnProperty('type') ? item.type : 'png'; // Tipo de recurso
			});

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

			/**
			 * Para obtener los estilos de los elementos, específicamente el ancho
			 */
			$scope.getStyles = function function_name(argument) {
				var styles = "";

				if($scope.itemsPerRow){
					styles += "width: " + (100 / $scope.itemsPerRow) + "%;";
				} else {
					styles += "width: " + (100 / $scope.options.length) + "%;";
				}
				
				return styles;
			}

			// En caso de prioridad, se activa el siguiente vínculo
			if($scope.priority){
				$scope.$root.isNextEnabled = true;
			}

		}
	};
});
