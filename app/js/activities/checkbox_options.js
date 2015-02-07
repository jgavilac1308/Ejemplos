var lizCheckboxOptions = angular.module('lizCheckboxOptions', ['factories']);

lizCheckboxOptions.directive('checkboxOptions', function  (shuffleArrayFactory) {
  return {
    restrict: 'E',
    scope: {
      options: '=',
      audio: '@',
      description: '@'
    },
    templateUrl: '../views/activities/checkbox_options.html',
    link: function (scope, element, attrs) {
      var opt = scope.options,
        rightAnswers = 0;

      // variables básicas de la acividad de angular
      scope.rightAnswer = false;
      scope.wrongAnswer = false;
      scope.success = false;
      scope.failure = false;
      scope.hasModalImage = (opt.hasModalImage) ? true : false;
      scope.hasNoQuestions = (opt.hasNoQuestions) ? true : false;
      scope.chancesPerItem = (opt.chancesPerItem) ? opt.chancesPerItem : 2;
      scope.minRightAnwers = opt.minRightAnwers;
      scope.globalNumAnswers = 0;
      scope.randomItems = (!scope.options.randomItems) ? false:true;

      if (scope.hasModalImage) {
        scope.modalSrc = opt.modalSrc;
        scope.modalAlt = opt.modalAlt;
        scope.modalBtnText = opt.modalBtnText;
      }

      // Imagen principal
      scope.src = opt.src;
      scope.alt = opt.alt;

      // Preguntas
      scope.questions = opt.questions;
        angular.forEach(scope.questions, function (question, key) {
          question.numAnswers = opt.numAnswers;
          question.chances = scope.chancesPerItem - 1;
          scope.globalNumAnswers += opt.numAnswers;
        });

      // añadimos el número de posibilidades
      scope.questions.forEach(function (q) {
        q.chances = scope.chancesPerItem;
        if (scope.randomItems) {
          shuffleArrayFactory.run(q.answers);
        }
      });

      /**
       * Verifica la respuesta.
       */
       var counter = 0;
      scope.verify = function (item, answer) {
        if(answer.answer) {
          scope.rightAnswer = Math.random();
          answer.wrong = false;
          answer.right = true;
          rightAnswers += 1;
          counter++;
          answer.completed = true;
          item.chances--;
          if (0 === item.chances) {
            item.completed = true;
          }
        } else {
          answer.wrong = true;
          answer.selectedAnswer = false;
          scope.wrongAnswer = Math.random(); 
          item.chances -= 1;
          counter++;
          if(item.chances === 0) {item.completed = true;}
        }

        // Contamos los elementos terminados
        //var completedItems = scope.questions.filter(function (q) {
        //  return q.completed;
        //}).length;

        if(counter === scope.globalNumAnswers) {
          // solo pasa la actividad si todas las respuestas son correctas
          if(rightAnswers === scope.globalNumAnswers || rightAnswers >= scope.minRightAnwers) {
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
