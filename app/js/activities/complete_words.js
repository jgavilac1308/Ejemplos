var lizCompleteWords = angular.module('lizCompleteWords', []);

lizCompleteWords.directive('completeWords', function () {
  return {
    restrict: 'E',
    templateUrl: '../views/activities/complete_words.html',
    scope: {
      options: '=',
      description: '@',
      audio: '@'
    },
    link: function (scope, element, attrs) {
      var opt = scope.options,
        minRightAnswers = opt.minRightAnswers,
        rightAnswers = 0, // Contador de preguntas buenas
        chances = 0; // el doble, ya que es izquierda y derecha

      // Corremos la aplicación
      scope.items = opt.items;
      scope.itemsPerRow = opt.itemsPerRow;
      scope.pattern = scope.items[0].pattern;
      scope.words = [];
      scope.success = false;
      scope.failure = false;
      scope.block = false;
      scope.samples = opt.samples; // ejemplos para llenar los cuadros

      chances = scope.items[0].pattern.length * 1; // el doble, ya que es izquierda y derecha

      /**
       * Devuelve los estilos del texto.
       */
      scope.getTextStyles = function () {
        var styles = "";

        if(! scope.items[0].resource) {
          styles = "margin-left: 0; width: 100%;";
        }

        return styles;
      };

      /**
       * Para obtener los estilos de los elementos, específicamente el ancho
       */
      scope.getStyles = function () {
        var styles = "";

        if (scope.itemsPerRow) {
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

      var string = scope.items[0].text;
      var words = string.split(" ");

      // Constructor de palabras
      for (var i = 0; i < words.length; i++) {

        if (scope.pattern.indexOf(i) > -1) {
          scope.words.push({
            isInput: true,
            input: '',
            word: (words[i])
          });
        }  else {
          scope.words.push({
            isInput: false,
            word: (words[i])
          });
        }

      }

      /**
       * Verifica si el input cumple con las condiciones del número
       */
      var chancesPerItem = 1;

      scope.verify = function (item) {
        if (item.input === '') return;

        // Verificamos la respuesta. Añadimos una propiedad right o wrong para definir si el item es correcto o no
        if (item.input === item.word || ((scope.items[0].hasOwnProperty('answer2')) && (item.input === scope.items[0].answer2))) {
          rightAnswers++;
          chances--;
          item.wrong = false;
          item.right = true;
          item.completed = true; // marcamos el item como completo, para desactivar el input
        } else {

          item.wrong ? chancesPerItem = 0 : chancesPerItem = 1;
          item.wrong = true;

          if (chancesPerItem === 0) {
            item.completed = true;
            chances--;
            chancesPerItem = 1;
          } else {
            item.input = "";
          }
        }

        // fin de la actividad
        if (chances === 0) {
          if (rightAnswers >= minRightAnswers) {
            scope.$root.isNextEnabled = true;
            scope.success = true;
          } else {
            scope.failure = true;
          }
        }

      }; // verify()
    }
  };
});

