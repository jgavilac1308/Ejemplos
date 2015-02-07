var lizClickAndListen = angular.module('lizClickAndListen', []);

lizClickAndListen.directive('clickAndListen', function  () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			audio: '@',
			description: '@'
		},
		templateUrl: '../views/activities/click_and_listen.html',
		link: function postLink(scope, element, attrs) {
			var opt = scope.options;

			// Elementos de la actividad
			scope.headings = opt.headings;
			scope.items = opt.items;

			// calificación
			scope.success = false;
			scope.failure = false;


			/**
			 * Añade la propiedad de completado y verifica el fin de la actividad
			 */
			scope.verify = function (item) {
				// si esta completo, entonces sale automáticamente
				if(item.completed) return;

				item.completed = true;

				var completed = scope.items.filter(function(item){ return item.completed; }).length;

				// fin de la actividad
				if(completed === scope.items.length) {
					scope.$root.isNextEnabled = true;
					scope.success = true;
				}
			};


		}
	}; 
});
