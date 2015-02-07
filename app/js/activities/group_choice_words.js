var lizGroupChoiceWords = angular.module('lizGroupChoiceWords', []);

lizGroupChoiceWords.directive('groupChoiceWords', function  (shuffleArrayFactory) {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/group_choice_words.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			titleBlock: '@',
			blockText: '@',
			style: '@',
			mainimg: '@',
			titletop:'@'
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.examples = scope.options.examples;
			scope.itemsrow = scope.options.itemsrow;
			scope.pattern = scope.items.pattern;
			scope.customClass = (scope.options.customClass) ? scope.options.customClass : "";
			scope.words = [];
			minRightAnswers = scope.options.minRightAnswers
			rightAnswers = 0, // Contador de preguntas buenas
			chances = scope.options.chances,
			scope.success = false;
			scope.failure = false;
			scope.block = false;
			random = scope.options.hasOwnProperty('random') ? scope.options.random : true; // Verdadero por defecto


			var items = scope.items;

		   // Constructor de palabras
		   for(var j=0; j < items.length; j++){

		   	var string = items[j].text;
			var words = string.split(" ");

			scope.items[j].words = [];
			
				
				for(var i=0; i < words.length; i++){

					if( scope.items[j].pattern.indexOf(i) > -1 ){
							
							if(random) shuffleArrayFactory.run(scope.items[j]["answers"+i]); // baraja
							scope.items[j]["answers"+i].unshift({
						          	text: "Elige una respuesta",
						          	default: true
							      });
							scope.items[j].words.push({
								  isInput: true,
							      chances: 2,
							      answers: scope.items[j]["answers"+i],
							      rightAnswer: scope.items[j]["answers"+i].filter(function (answer) {
							          return answer.answer;
						          })[0],
						          selectedAnswer: scope.items[j]["answers"+i][0] // elige la primera, en este caso, "elige una respuesta"
					      	});	
					      	 if(scope.items[j].hasOwnProperty('default')){
					      	 	item =  scope.items[j].words[i];
					      	 	  scope.rightAnswer = Math.random();
						          rightAnswers += 1;
						          item.right = true
						          item.wrong = false
						          item.completed = true;
						          item.selectedAnswer = item.rightAnswer;
						      }

					}else{
						scope.items[j].words.push({
								 isInput: false,
							     word: (words[i])
						});
					}

				}

			}


		/**
		 * Verifica si el input cumple con las condiciones del número 
		 */
		scope.verify = function (item,q) {
	        if(item.selectedAnswer.default) return; // Es "Elige una respuesta"

	        if(item.selectedAnswer.answer) {
	          scope.rightAnswer = Math.random();
	          rightAnswers += 1;
	          item.right = true
	          item.wrong = false
	          item.completed = true;
	        } else {
	          scope.wrongAnswer = Math.random();
	          item.chances -= 1;
	          item.right = false
	          item.wrong = true
	          if(item.chances === 0) {item.completed = true;q.callback = item.rightAnswer.text;}
	        }

	        // Contamos los elementos terminados
	        var questions = 0
	        var completedItems = 0
	        scope.items.forEach(function(q) {
			   q.words.forEach(function(w) {
			   		if(w.hasOwnProperty('answers')){
	        			questions ++
	          		};
			    	if(w.hasOwnProperty('completed')){
	        			completedItems ++
	          		};
				});
			});
	        
	        if(completedItems === questions) {
	          if(rightAnswers >= minRightAnswers) {
		          scope.$root.isNextEnabled = true;
		          scope.success = true;
		          return true;
		        }

		        scope.failure = true;
		        return false;
	        }
     	};



		}


    }; 
});

