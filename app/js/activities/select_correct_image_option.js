/**
 * La actividad permite seleccionar varias opciones hubicadas en una o varias imagenes.
 */
var lizSelectCorrectImageOption = angular.module('lizSelectCorrectImageOption', []);

lizSelectCorrectImageOption.directive('selectCorrectImageOption', function () {
	return {
		restrict: 'E',
        templateUrl: '../views/activities/select_correct_image_option.html',
        scope: {
            options: '=',
            instruction: '@',
            title: '@',
            description: '@',
            audio: '@'
        },
		link: function ($scope, iElement, iAttrs) {

			$scope.items = $scope.options.items;

			$scope.rightAnswers = 0;
			$scope.complete = false; // Cuando termina la actividad
			$scope.block = false;
			$scope.success = false;
			$scope.failure = false;
			$scope.itemsPerRow = $scope.options.itemsPerRow;
			$scope.minRightAnswers = $scope.options.minRightAnswers;

			angular.forEach($scope.items, function (value, key) {
				value.chances = $scope.options.chancesPerItem-1;
			});

			// watch if the activity is finished
			$scope.$watch('complete', function(complete) {
				if (complete) {
					if ($scope.rightAnswers >= $scope.minRightAnswers) {
						// éxito
						$scope.success = true;

						// Activamos la siguiente actividad o ruta
						$scope.$root.isNextEnabled = true;
					} else {
						// fracaso
						$scope.failure = true;
					}
				} 
			});

			// Si la descripción o el título están, entonces la instrucción va al fondo
			$scope.isBottom = $scope.title || $scope.description;

			var counter = 0;

			$scope.verify = function (item, opt) {

				if (true === opt.correct) {
					$scope.rightAnswers++;
					item.wrong = false;
					item.right = true;
					item.block = true; // marcamos el item como completo
					counter++;
				} else {
					// obj.wrong ? obj.chances=$scope.options.chancesPerItem-2: obj.chances=$scope.options.chancesPerItem-1;

                	item.wrong = true;
                	

                    	if(item.chances === 0){
                    	item.block = true;
                    	counter++;
                    	}else{chances--;}
				}

				if(counter === $scope.items.length){
                    $scope.complete = true;
                }
			}

			/**
			 * Para obtener los estilos de los elementos, específicamente el ancho
			 */
			$scope.getStyles = function (item) {
				var styles = "";

				if($scope.itemsPerRow){
					styles += "width: " + (100 / $scope.itemsPerRow) + "%;";
				} else {
					styles += "width: " + (100 / $scope.items.length) + "%;";
				}

				if(item.style){
					styles += item.style;
				}
				
				return styles;
			};

			/**
			 * Devuelve los estilos de cada elemento
			 */
			$scope.getOptionStyles = function (opt) {
				var styles = '';

				styles += "width: " + opt.w + "px;";
				styles += "height: " + opt.h + "px;";
				styles += "top: " + opt.t + "%;";
				styles += "left: " + opt.l + "%;";
				
				return styles;
			};
		}
	};
});