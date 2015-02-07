var lizSelectOptionsTable = angular.module('lizSelectOptionsTable', []);

lizSelectOptionsTable.directive('selectOptionsTable', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/select_options_table.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			title:'@'
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.itemsPerRow = scope.options.itemsPerRow;
			scope.rowsstyle = scope.options.rowsstyle;
			scope.mainimg = scope.options.mainimg;
			scope.minRightAnswers = scope.options.minRightAnswers
			rightAnswers = 0, // Contador de preguntas buenas
			scope.chancesPerItem = (scope.options.chancesPerItem)
			scope.success = false;
			scope.failure = false;
			scope.block = false;
			
			scope.questions = [];

			// añadimos el número de posibilidades
		    scope.items.forEach(function (q) {
		      q.list.forEach(function (i) {
			       if(i.hasOwnProperty('answers')) {

			       		scope.questions.push({
							item: i.answers,								      
					  	});

			       	if(i.default){
			       		i.answers.completed = true
			       		i.answers.right = true
			       		rightAnswers += 1
			       		i.answers.forEach(function (a) {

			       			if (a.answer) {

			       				i.answers.selectedAnswer = a
			       			};

		       			});
			       	}
			       	i.answers.chances = scope.chancesPerItem;
			       }
		       });
		    });

			/**
			 * Para obtener los estilos de los elementos, específicamente el ancho
			 */
			scope.getStyles = function function_name(argument) {
				var styles = "";

				if(scope.itemsPerRow){
					styles += "width: " + (100 / scope.itemsPerRow) + "%;";
					styles += "margin-left: " + (10 / scope.itemsPerRow) + "%;";
					styles += "margin-top: " + (10 / scope.itemsPerRow) + "%;";
					styles += "margin-right: " + (10 / scope.itemsPerRow) + "%!important;";
				} else {
					styles += "width: " + (100 / scope.items.length) + "%;";
					styles += "margin-left: " + (10 / scope.itemsPerRow) + "%;";
					styles += "margin-top: " + (10 / scope.itemsPerRow) + "%;";
				}
				
				return styles;

				
			};

			/**
	       * Verifica la respuesta.
	       */
		    scope.verify = function (item,a) {
		        if(item.selectedAnswer.answer) {
		          rightAnswers += 1;
		          item.right = true;
		          item.wrong = false;
		          item.completed = true;
		        } else {
		          item.chances -= 1;
		          item.right = false;
		          item.wrong = true;
		          if(item.chances === 0){ item.completed = true };
		        }

		        // Contamos los elementos terminados
		        var completedItems = scope.questions.filter(function (q) {
		          return q.item.completed;
		        }).length;

		        if(completedItems === scope.questions.length) {
		          // solo pasa la actividad si todas las respuestas son correctas
		          console.log(rightAnswers,scope.minRightAnswers);
		          if(rightAnswers === scope.questions.length || rightAnswers >= scope.minRightAnswers) {
		            scope.$root.isNextEnabled = true;
		            scope.success = true;
		          } else {
		            scope.failure = true;
		          }
		        }
		    };


		}


    }; 
});

