/**
 * La actividad permite completar palabras en inputs
 */
var lizCompleteInputsDescription = angular.module('lizCompleteInputsDescription', []);

lizCompleteInputsDescription.directive('completeInputsDescription', function ($sce) {
  return {
    restrict: 'E',
    templateUrl: '../views/activities/complete_inputs_description.html',
    scope: {
      options: "=",
      title: '@',
      correctAnswer: '@',
      description: '@',
      instruction: '@',
      titleBlock: '@',
      audio: '@',
      tableTextTitle: '@',
      inputTextTitle: '@'
    },
    link: function (scope, element, attrs) {
      var opt = scope.options;

      // Inputs procesados
      scope.words = [];

      // Procesamos cada elemento del array entrante
      angular.forEach(scope.inputs, function (input) {
        scope.words.push({ word: input, right: false, wrong: false });
      });

      scope.feedback = opt.hasOwnProperty('feedback') ? opt.feedback : false;

      scope.extension = opt.extension ? opt.extension : '.png';
      scope.complete = false; // Cuando termina la actividad
      scope.hideDescription = scope.options.hideDescription;
      scope.descriptionTop = scope.options.descriptionTop;
      scope.itemsPerRow = scope.options.itemsPerRow;
      scope.block = false;

      scope.rightAnswers = 0; // número de respuestas correctas
      scope.success = false;
      scope.failure = false;

      // watch if the activity is finished
      scope.$watch('complete', function (complete) {
        if (complete) {

          if (scope.rightAnswers >= minRightAnswers) {
            // éxito
            scope.success = true;

            // Activamos la siguiente actividad o ruta
            scope.$root.isNextEnabled = true;
          } else {
            // fracaso
            scope.failure = true;
          }
        }
      });

      // Permite el uso de html
      scope.sanitize = function (item) {
        return $sce.trustAsHtml(item);
      };

      // ordena el array de forma aleatoria usando el algoritmo de Fisher-Yates
      self.shuffleArray = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      };

      scope.items = scope.options.data,
        minRightAnswers = scope.options.minRightAnswers,
        randomItems = scope.options.randomItems ? true : false,
        scope.description_data = scope.options.data.slice(0);   // Clonamos el array para empezar a trabajar

      if (randomItems) {
        data = self.shuffleArray(scope.items);
      }

      // Si la descripción o el título están, entonces la instrucción va al fondo
      scope.isBottom = scope.title || scope.description;


      /**
       * Para obtener los estilos de los elementos, específicamente el ancho
       */
      scope.getStyles = function () {
        var styles = "";

        if (scope.itemsPerRow) {
          styles += "width: " + (100 / scope.itemsPerRow) + "%;";
        } else {
          styles += "width: " + (100 / (scope.options.data.length + 2)) + "%;";
          styles += "margin-left: " + (100 / (scope.options.data.length * 4)) + "%;";
        }

        return styles;
      };

      /**
       * Función de Jeison
       */
      var counter = 0,
        chances = scope.options.chancesPerItem - 1;

      /**
       * Verifica los inputs y da fin a la actividad.
       * @param input
       */
      scope.verify = function (input) {
        // aquí se hace lo que quiera con el input
        // Good answer -> increase good answers
        if ( ((input.correctAnswer.toLowerCase() === input.input.toLowerCase()) && (input.input != "" )) || input.correctAnswer.toLowerCase() === 'free') {
          input.wrong = false;
          input.right = true;
          input.block = true;
          scope.rightAnswers++;

          counter++;
        }

        if ((input.correctAnswer.toLowerCase() != input.input.toLowerCase()) && ((input.input != null ) && (input.input != "" ) && (input.correctAnswer.toLowerCase() != "free" ))) {
          input.wrong ? chances = scope.options.chancesPerItem - 2 : chances = scope.options.chancesPerItem - 1;
          input.wrong = true;

          if (chances === 0) {
            input.block = true;
            counter++;
            chances = scope.options.chancesPerItem - 1;
          } else {
            chances--;
            input.input = "";
          }
        }

        if (counter === scope.options.data.length) {
          // Solamente activa la flecha, permitiendo al estudiante ver la realimentación
          scope.$root.isNextEnabled = true;

          if(scope.feedback) {
            scope.showFeedback = true;
          } else {
            scope.complete = true;
          }
        }
      };

      // If feedback is activated, show the feedback
      if(scope.feedback) {
        scope.$root.beforeGoNext = function () {
          if (scope.rightAnswers >= minRightAnswers) {
            scope.success = true;
            return true;
          } else {
            scope.failure = true;
            return false;
          }
        };
      }

    }
  };
});

