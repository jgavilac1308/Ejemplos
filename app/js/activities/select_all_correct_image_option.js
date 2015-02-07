/**
 * La actividad permite seleccionar varias opciones hubicadas en una o varias imagenes.
 */
var lizSelectAllCorrectImageOption = angular.module('lizSelectAllCorrectImageOption', []);

lizSelectAllCorrectImageOption.directive('selectAllCorrectImageOption', function () {
	return {
		restrict: 'E',
        templateUrl: '../views/activities/select_all_correct_image_option.html',
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
			$scope.rightAnswer = false;
  			$scope.wrongAnswer = false;
  			$scope.classComplete = $scope.options.classComplete;
			$scope.itemsPerRow = $scope.options.itemsPerRow;
			$scope.minRightAnswers = $scope.options.minRightAnswers;


			angular.forEach($scope.items, function (value, key) {
				value.chances = $scope.options.chancesPerItem;
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
			if (opt.complete){return}

				if (true === opt.correct) {
					$scope.rightAnswers++;
					$scope.rightAnswer = Math.random();
					opt.complete = true; // marcamos el item como completo
					opt.right = true
					
				} else {
					// obj.wrong ? obj.chances=$scope.options.chancesPerItem-2: obj.chances=$scope.options.chancesPerItem-1;

                	item.wrong = true;
                	$scope.wrongAnswer = Math.random();
                	opt.complete = true; // marcamos el item como completo
                	opt.wrong = true

                    	
				}

				if(item.chances === 1 || $scope.rightAnswers === $scope.minRightAnswers){
                    	counter++;
                }else{item.chances--;}

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