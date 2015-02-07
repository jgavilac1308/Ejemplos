var lizWriteTrueFalse = angular.module('lizWriteTrueFalse', []);

lizWriteTrueFalse.directive('writeTrueFalse', function ($sce) {
  return {
    restrict: 'E',
    scope: {
      options: '=',
      audio: '@',
      title: '@',
      description: '@'
    },
    templateUrl: '../views/activities/write_true_false.html',
    link: function (scope, element, attrs) {
      var opt = scope.options,
        rightAnswers = 0,
        minRightAnswers = opt.hasOwnProperty('minRightAnswers') ? opt.minRightAnswers : opt.items.length;
        scope.src = opt.src ? opt.src : false;
        scope.alt = opt.alt ? opt.alt : false;
        scope.bigImg = opt.hasOwnProperty('bigImg') ? opt.bigImg : false;

      scope.rightAnswers = false;
      scope.wrongAnswer = false;
      scope.success = false;
      scope.failure = false;

      scope.showFeedback = false; // Realimentación
      scope.feedback = opt.feedback;

      scope.items = opt.items;

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
       * Función de verificación
       *
       * @returns {boolean}
       */
      scope.verify = function (item) {
        item.input = item.input.toUpperCase();

        if (item.input === item.answer) {
          scope.rightAnswer = Math.random();
          rightAnswers += 1;
        } else {
          scope.wrongAnswer = Math.random();
        }

        item.completed = true;

        // Contamos los elementos completados
        var completedItems = scope.items.filter(function (item) {
          return item.completed;
        }).length;

        if (completedItems === scope.items.length) {
          scope.$root.isNextEnabled = true;
          scope.showFeedback = true;
        }
      };

    }
  };
});
