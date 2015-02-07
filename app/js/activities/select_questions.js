var lizSelectQuestions = angular.module('lizSelectQuestions', ['factories']);

lizSelectQuestions.directive('selectQuestions', function  (shuffleArrayFactory,$sce) {
  return {
    restrict: 'E',
    scope: {
      options: '=',
      audio: '@',
      description: '@',
      titletop: '@'
    },
    templateUrl: '../views/activities/select_questions.html',
    link: function (scope, element, attrs) {
      var opt = scope.options,
        rightAnswers = 0,
        minRightAnswers = opt.minRightAnswers,
        random = opt.hasOwnProperty('random') ? opt.random : true; // Verdadero por defecto

      // variables básicas de la acividad de angular
      scope.rightAnswer = false;
      scope.wrongAnswer = false;
      scope.success = false;
      scope.failure = false;

      // Imagen principal
      scope.src = opt.hasOwnProperty('src') ? opt.src : false;
      scope.text = opt.hasOwnProperty('text') ? opt.text : false;
      scope.bigImg = opt.hasOwnProperty('bigImg') ? opt.bigImg : false;
      scope.alt = opt.alt;
      scope.title = opt.title;
      scope.stylequestions = opt.stylequestions;

      // Preguntas
      scope.questions = opt.questions;

      // añadimos algunas opciones
      scope.questions.forEach(function (q) {
        q.chances = 2; // posibilidades por pregunta

        if(random) shuffleArrayFactory.run(q.answers); // baraja

        q.answers.unshift({
          text: "Elige una respuesta",
          default: true
        });

        q.selectedAnswer = q.answers[0]; // elige la primera, en este caso, "elige una respuesta"

        q.rightAnswer = q.answers.filter(function (answer) {
          return answer.answer;
        })[0];

      });

      /**
       * Cuando se da click en la flecha de siguiente
       */
      scope.$root.beforeGoNext = function () {
        if(rightAnswers >= minRightAnswers) {
          scope.success = true;
          return true;
        }

        scope.failure = true;
        return true;
      };

      // Para usar el html en angular
      scope.sanitize = function (item) {
        return $sce.trustAsHtml(item);
      }
      
      /**
       * abre el zoom 
       */
      scope.zoom = function () {
        if(scope.bigImg){
          scope.showBig = true;
        }
      };

      /**
       * Cierra el zoom 
       */
      scope.complete = function () {
        
          scope.showBig = false;
      };

      /**
       * Verifica la respuesta.
       */
      scope.verify = function (item) {
        if(item.selectedAnswer.default) return; // Es "Elige una respuesta"

        if(item.selectedAnswer.answer) {
          scope.rightAnswer = Math.random();
          rightAnswers += 1;
          item.completed = true;
        } else {
          scope.wrongAnswer = Math.random();
          item.chances -= 1;
          if(item.chances === 0){ item.completed = true;item.feedback = true;console.log(item);}
        }

        // Contamos los elementos terminados
        var completedItems = scope.questions.filter(function (q) {
          return q.completed;
        }).length;

        if(completedItems === scope.questions.length) {
          scope.$root.isNextEnabled = true;
          scope.feedback = true; // muestra la realimentación
        }
      };
    }
  };
});
