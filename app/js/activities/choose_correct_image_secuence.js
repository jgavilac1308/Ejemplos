/**
 * Pertime escoger entre varias imagenes una correcta haciendo click.
 */
 var lizChooseCorrectImageSecuence = angular.module('lizChooseCorrectImageSecuence', []);

lizChooseCorrectImageSecuence.directive('chooseCorrectImageSecuence', function(){
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
 		templateUrl: '../views/activities/choose_correct_image_secuence.html',
 		// replace: true,
 		// transclude: true,
 		// compile: function(tElement, tAttrs, function transclude(function($scope, cloneLinkingFn){ return function linking($scope, elm, attrs){}})),
 		link: function($scope, $sce) {

 			$scope.items = $scope.options.items;
 			// $scope.customClass = $scope.options.customClass;
 			$scope.complete = false; // Cuando termina la actividad
      		// $scope.itemsPerRow = $scope.options.itemsPerRow;
      		$scope.chances = $scope.options.chances-1;
      		$scope.counter = 0;
            $scope.indexI = 0;

      		$scope.$watch('complete', function (complete) {
		        if (complete) {
		          	if ($scope.counter === 0) {
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

	      	/**
			 * Para obtener los estilos de los elementos, específicamente el ancho
			 */
			$scope.getStyles = function () {
				var styles = "";

				/*if($scope.itemsPerRow){
					styles += "width: " + (100 / $scope.itemsPerRow) + "%;";
				} else {
					//styles += "width: " + (100 / $scope.items.length) + "%;";
				}
				*/
				return styles;
			};


	      	$scope.verify = function (item) {

                $scope.chances--;

                // Si la imagen seleccionada es la que sigue en el orden
                if (item.img === $scope.options.answers[$scope.indexI].img){
                    $scope.options.answers[$scope.indexI].imgDefault = $scope.options.answers[$scope.indexI].img;
                    $scope.options.answers[$scope.indexI].completed = true;
                    $("#right-answer").fadeIn(300).delay(400).fadeOut(300);
                    $scope.indexI++;
                }
                else{
                    $("#wrong-answer").fadeIn(300).delay(400).fadeOut(300);
                    $scope.counter++;
                }

                console.log("verirfy");


                // Si ha cumplido con todas, se termina
                var completedItems =  $scope.options.answers.filter(function (q) {
                    return q.completed;
                }).length;

                if (completedItems == $scope.options.answers.length){
                    $scope.complete = true;
                    scope.$root.isNextEnabled = true;
                }

                if($scope.chances === 0){
                    $scope.complete = true;
                }


                //$scope.options.answers[$scope.indexI].imgDefault = $scope.options.answers[$scope.indexI].img;


	      		/*if (true === item.correct) {
	      			$("#right-answer").fadeIn(300).delay(400).fadeOut(300);
	      			$scope.complete = true;
	      		} else {
	      			if($scope.chances === 0){
                    	$scope.complete = true;
                    } else {
                    	chances--;
                    }
                    $scope.counter++;
                    $("#wrong-answer").fadeIn(300).delay(400).fadeOut(300);
	      		}*/
	      	};
 		}
 	};
 });