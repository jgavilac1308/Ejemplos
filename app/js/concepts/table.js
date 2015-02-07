var lizTable = angular.module('lizTable', []);

lizTable.directive('tableConcept', function () {
	return {
		restrict: 'E',
		templateUrl: '../views/concepts/table.html',
		scope: {
			options: "=",
			title: '@',
			audio: '@',
			instruction: '@',
			description: '@',
			buttonText: '@'
		},
		link: function (scope) {

			var opt = scope.options;

			// Si la descripción o el título están, entonces la instrucción va al fondo
			scope.isBottom = scope.title || scope.description;

			scope.head = opt.head;
			scope.body = opt.body;
			scope.buttonText = scope.buttonText;

			scope.$root.isNextEnabled = true;

		}
	};
});
