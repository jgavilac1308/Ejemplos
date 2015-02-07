var lizCompetences = angular.module('lizCompetences', []);

lizCompetences.directive('competencesNew', function () {
	return {
		restrict: 'E',
		templateUrl: '../views/concepts/competences.html',
		scope: {
			options: "="			
		},
		link: function (scope) {
			scope.$root.isNextEnabled = true;
		}		
	};
});
