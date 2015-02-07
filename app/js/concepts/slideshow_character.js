var lizSlideShowCharacter = angular.module('lizSlideShowCharacter', []);

lizSlideShowCharacter.directive('slideShowCharacter', function () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			title: '@',
			description: '@',
			audio:'@',
			instruction: '@',
			mainimg: '@'
		},
		templateUrl: '../views/concepts/slideshow_character.html',
		link: function (scope, element, attrs) {
			var opt = scope.options;

			scope.items = opt.items;
			scope.ext = opt.ext ? opt.ext : '.png';
			scope.customClass = opt.customClass;

			/**
			 * Devuelve los estilos personalizados de los items
			 */
			scope.getItemStyles = function () {
				var styles = "";

				styles += "width: " + (100 / 1) + "%;";

				return styles;
			};

		}
	}; 
});

lizSlideShowCharacter.directive('slides', function($timeout){
	return {
	    restrict: 'A',
			scope: {
				items: '='
			},
	    link : function (scope, element, attrs) {
				$timeout(function(){
					$(element).slidesjs({
						width: 500,
						height: 550,
						navigation: {
							active: true,
							// [boolean] Generates next and previous buttons.
							// You can set to false and use your own buttons.
							// User defined buttons must have the following:
							// previous button: class="slidesjs-previous slidesjs-navigation"
							// next button: class="slidesjs-next slidesjs-navigation"
							effect: "slide"
							// [string] Can be either "slide" or "fade".
						},
						pagination: {
							active: false,
							// [boolean] Create pagination items.
							// You cannot use your own pagination. Sorry.
						},
						callback: {
							complete: function (number) {
								// Activa el siguiente cuando llega a la última diapositiva
								if(number === scope.items.length) {
									scope.$root.isNextEnabled = true;
									scope.$apply();
								}
							}
						}
					});
				});
    	}
	};
});
