var lizShowConceptsGroupExamples = angular.module('lizShowConceptsGroupExamples', []);

lizShowConceptsGroupExamples.directive('showConceptsGroupExamples', function  ($sce) {
    return {
        restrict: 'E',
        templateUrl: '../views/concepts/show_concepts_group_examples.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			addicon: '@'
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.groups = scope.options.groups;
			scope.items = [];
			minRightAnswers = scope.options.minRightAnswers
			rightAnswers = 0, // Contador de preguntas buenas
			chances = scope.options.chances,
			scope.success = false;
			scope.failure = false;
			scope.block = false;
			scope.customClass = (scope.options.hasOwnProperty("customClass")) ? scope.options.customClass : ""; 
			
			// Recorremos todas las grupos y sus items
			      scope.groups.forEach(function (group) {
			        if(group.items){ group.items.forEach(function (item) {
				          // agregamos cada item a el array de items
				          scope.items.push({
								item: item,								      
						  });

				        });
			        };
			      });
			
			
			scope.$root.isNextEnabled = true; // Activamos el siguiente vínculo
			
		// Para usar el html en angular
		scope.sanitize = function (item) {
			return $sce.trustAsHtml(item);
		}

		}

		


    }; 
});

