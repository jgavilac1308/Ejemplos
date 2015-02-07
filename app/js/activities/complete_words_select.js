/**
 * La actividad permite completar palabras de uno o varios textos.
 * por medio de selects.
 */

var lizCompleteWordsSelect = /**
 * lizCompleteWordsSelect Module
 */
  angular.module('lizCompleteWordsSelect', []);

lizCompleteWordsSelect.directive('completeWordsSelect', function ($log) {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      options: '=',
      instruction: '@',
      title: '@',
      description: '@',
      audio: '@'
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    templateUrl: '../views/activities/complete_words_select.html',
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function (scope, iElm, iAttrs, controller) {
      scope.items = scope.options.items;
      scope.itemsPerRow = scope.options.itemsPerRow;
      var minRightAnswers = scope.options.minRightAnswers,
        chances = scope.options.chancesPerItem - 1;
      scope.inputsCounter = 0;
      scope.rightAnswers = 0;
      scope.complete = false;
      scope.success = false;
      scope.failure = false;
      scope.block = false;

      // watch if the activity is finished
      scope.$watch('complete', function (complete) {
        if (complete) {
          if (scope.rightAnswers >= minRightAnswers) {
            // success
            scope.success = true;

            // Turn on next route
            scope.$root.isNextEnabled = true;
          } else {
            // failure
            scope.failure = true;
          }
        }
      });

      angular.forEach(scope.items, function (item, key) {

        angular.forEach(item.answers, function (value, key) {
          item.text = item.text.replace(value.answer, "inputhere");
        });

        item.words = [];

        var words = item.text.split(" ");

        // Constructor de palabras
        for (var i = 0; i < words.length; i++) {
          if (item.pattern.indexOf(i) > -1) {
            scope.inputsCounter++;
            item.words.push({
              isInput: true,
              input: '',
              word: item.answers[i].answer,
              index: i,
              options: item.answers[i].options
            });
          } else {
            item.words.push({
              isInput: false,
              word: (words[i])
            });
          }
        }
      });

      var counter = 0;
      scope.verify = function (item) {
        $log.log(item);
        if (item.input === '') return;

        // Verificamos la respuesta. Añadimos una propiedad right o wrong para definir si el item es correcto o no
        if (item.input.toLowerCase() === item.word.toLowerCase()) {
          scope.rightAnswers++;
          item.wrong = false;
          item.right = true;
          item.completed = true; // marcamos el item como completo, para desactivar el input
          counter++;
        } else {
          item.wrong ? chances = scope.options.chancesPerItem - 2 : chances = scope.options.chancesPerItem - 1;

          item.wrong = true;

          if (chances === 0) {
            item.completed = true;
            counter++;
            chances = scope.options.chancesPerItem - 1;
            item.input = item.word;
          } else {
            chances--;
            item.input = "";
          }
        }

        if (counter === scope.inputsCounter) {
          scope.complete = true;
        }

      };
    }
  };
});