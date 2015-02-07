/**
 * La actividad permite seleccionar varias opciones hubicadas en imagenes
 * de acuerdo a una imagen principal.
 */
var lizSelectTableImageMultiple = angular.module('lizSelectTableImageMultiple', []);

lizSelectTableImageMultiple.directive('selectTableImageMultiple', function () {
	return {
		restrict: 'E',
        templateUrl: '../views/activities/select_table_image_multiple.html',
        scope: {
            options: '=',
            instruction: '@',
            title: '@',
            description: '@',
            audio: '@'
        },
		link: function ($scope, iElement, iAttrs) {

			$scope.items = $scope.options.items;

			$scope.mainImageTitle = $scope.options.mainImageTitle;
			$scope.imageTitle2 = $scope.options.imageTitle2;
			$scope.imageTitle3 = $scope.options.imageTitle3;
			$scope.itemsLength = 0;
			$scope.rightAnswers = 0;
			$scope.complete = false; // Cuando termina la actividad
			$scope.block = false;
			$scope.success = false;
			$scope.failure = false;
			$scope.minRightAnswers = $scope.options.minRightAnswers;

			angular.forEach($scope.items, function (value, key) {
				$scope.itemsLength += value.cols.length;

				angular.forEach(value.cols, function (v, k) {
					v.chances = $scope.options.chancesPerItem-1;
				})
			})

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

			var counter = 0,
				chances = $scope.options.chancesPerItem-1;

			$scope.verify = function (obj, item) {

				if (true === item.correct) {
					$scope.rightAnswers++;
					obj.wrong = false;
					obj.right = true;
					obj.disabled = true; // marcamos el item como completo
					counter++;
				} else {
					// obj.wrong ? obj.chances=$scope.options.chancesPerItem-2: obj.chances=$scope.options.chancesPerItem-1;

                	obj.wrong = true;
                	

                    	if(obj.chances === 0){
                    	obj.disabled = true;
                    	counter++;
                    	}else{chances--;}
				}

				console.log(obj);

				if(counter === $scope.itemsLength){
                    $scope.complete = true;
                }
			};

			/**
			 * Devuelve los estilos de cada elemento
			 */
			$scope.getStyles = function (opt) {
				var styles = '';

				styles += "-webkit-border-radius: " + opt.bdrs + ";"
				styles += "-moz-border-radius: " + opt.bdrs + ";"
				styles += "border-radius: " + opt.bdrs + ";"
				styles += "width: " + opt.w + "px;";
				styles += "height: " + opt.h + "px;";
				styles += "top: " + opt.t + "%;";
				styles += "left: " + opt.l + "%;";
				
				return styles;
			};
		}
	};
});