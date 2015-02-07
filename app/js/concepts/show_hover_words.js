var lizShowHoverWords = angular.module('lizShowHoverWords', []);

lizShowHoverWords.directive('showHoverWords', function () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			title: '@',
			description: '@',
			audio:'@',
			instruction: '@'
		},
		templateUrl: '../views/concepts/show_hover_words.html',
		link: function (scope, iElement, iAttrs) {
			scope.items = scope.options.items;
			scope.$root.isNextEnabled = true;

			angular.forEach(scope.items, function (value, key) {
				var	words = value.text.split(" "),
					mainWords = value.mainWord.toLowerCase().split(" ");
				value.words = [];

				if (mainWords.length > 1) {
					for (var i = 0; i < words.length; i++) {
						if (mainWords.indexOf(words[i].toLowerCase()) > -1) {
							value.words.push({
								main: true,
								title: value.mainTitle,
								word: words[i]
							});
						} else {
							value.words.push({
								main: false,
								title: "",
								word: words[i]
							});
						}
					}
				} else {
					for (var i = 0; i < words.length; i++) {
						if (words[i].toLowerCase() === value.mainWord.toLowerCase()) {
							value.words.push({
								main: true,
								title: value.mainTitle,
								word: words[i]
							});
						} else {
							value.words.push({
								main: false,
								title: "",
								word: words[i]
							});
						}
					}
				}
			});

			/**
		      * Devuelve los estilos del texto.
		      */
	      	scope.getTextStyles = function () {
	      		
	        	var styles = "";

	        	if(! scope.items[0].resource) {
        		  styles = "margin-left: 0; width: 100%;";
	        	}

	        	return styles;
	      	};

	      	scope.onWordReady = function () {
      			$("[data-toggle='tooltip']").tooltip();
	      	};	
		}
	};
});