var lizSelectCheckbox = angular.module('lizSelectCheckbox', []);

lizSelectCheckbox.directive('selectCheckbox', function ($sce) {
  return {
    restrict: 'E',
    scope: {
      options: '=',
      audio: '@',
      title: '@',
      description: '@'
    },
    templateUrl: '../views/activities/select_checkbox.html',
    link: function (scope, element, attrs) {
      var opt = scope.options,
        rightAnswers = 0,
        chances = opt.chances,
        minRightAnswers = opt.minRightAnswers;

      scope.rightAnswers = false;
      scope.wrongAnswer = false;
      scope.success = false;
      scope.failure = false;
      scope.noNumber = opt.noNumber ? opt.noNumber : false;
      scope.customClass = opt.customClass ? opt.customClass : false;

      scope.showFeedback = false; // Realimentación

      scope.questions = opt.questions;
      scope.answerwidth = opt.answerwidth;

      //configuramos las opciones para cada pregunta
      scope.questions.forEach(function (q) {

        q.maxRightAnswers = q.items.filter(function (i) {
          return i.answer;
        }).length;//numero de respustas buenas
        q.chances = opt.chancesperitem // posibilidades por pregunta
         q.showFeedback = false; // Realimentación
         q.feedback = "Las respuestas correctas son:";
         
      });


      scope.$root.beforeGoNext = function () {
        if (rightAnswers >= minRightAnswers) {
          scope.success = true;
          return true;
        } else {
          scope.failure = true;
          return true;
        }
      };

      // Permite el uso de html
      scope.sanitize = function (item) {
        return $sce.trustAsHtml(item);
      };

      /**
       * Verifica el elemento.
       * @param item
       */
      scope.verify = function (item,q) {
        if(item.answer === item.selectedAnswer) {
          scope.rightAnswer = Math.random();
          rightAnswers += 1;
          q.maxRightAnswers -= 1;
        } else {
          scope.wrongAnswer = Math.random();
        }

        item.completed = true;
        q.chances -= 1;

        if (q.chances === 0 || q.maxRightAnswers === 0) {
          q.items.forEach(function (i,index) {
            if(i.answer){
              var coma = index > 1 ? ',' : ''
              q.feedback += coma + " " + '<strong>'+i.text+'<strong>'
            }
          }); 
          q.disableAll = true;
          q.showFeedback = true;
          chances -= 1;
        }

        if (chances === 0) {
          scope.$root.isNextEnabled = true;
        }

      };

    }
  };
});
