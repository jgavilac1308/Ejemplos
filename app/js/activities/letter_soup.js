var lizLetterSoup = angular.module('lizLetterSoup', ['factories']);

lizLetterSoup.directive('letterSoup', function () {
  return {
    restrict: 'E',
    scope: {
      options: '=',
      audio: '@',
      description: '@',
      instruction: '@'
    },
    templateUrl: '../views/activities/letter_soup.html',
    link: function (scope, element, attrs) {
      var opt = scope.options, // Alias de opciones
        chances = opt.chances, // Oportunidades totales
        minRightAnswers = opt.minRightAnswers, // Número mínimo de respuestas correctas
        totalWords = 0, // Número total de palabras
        rightAnswers = 0; // contador de preguntas correctas

      scope.groupStyle = opt.groupStyle ? opt.groupStyle : false; // estilos que define com se ven los grupos de palbras
      scope.tableStyle = opt.tableStyle ? opt.tableStyle : false; // estilos que define com se ve la tabla con las letras
      console.log(scope.groupStyle);
      scope.table = []; // Array para la tabla
      scope.startPoint = false; // punto inicial
      scope.wordGroups = opt.wordGroups;

      scope.inverted = opt.inverted; // Define si las pistas y la sopa de letra intercambian espacios

      // variables de calificación
      scope.rightAnswer = false;
      scope.wrongAnswer = false;
      scope.success = false;
      scope.failure = false;

      // Recorremos todas las palabras
      scope.wordGroups.forEach(function (group) {
        group.items.forEach(function (word) {
          // Contamos el número total de palabras
          totalWords++;

          // Si no tiene propiedad front, usamos la propiedad back
          if (!word.hasOwnProperty('front')) word.front = word.back;
        });
      });


      // ------------------------------------------
      // Constructor de table
      // ------------------------------------------
      // Recorremos el array en opciones y creamos un nuevo array multidimensional,
      // añadiendo objetos para cada celda
      for (var i = 0; i < opt.table.length; i++) {
        var temp = [];

        // Añadimos a cada uno el índice (x - y) y la letra (obviamente)
        for (var j = 0; j < opt.table[i].length; j++) {
          temp.push({
            x: j,
            y: i,
            letter: opt.table[i][j]
          });
        }

        scope.table.push(temp);
      }

      /**
       * Busca la palabra en base a las coordenadas (índices)
       */
      scope.searchWord = function (cell) {
        if (!scope.startPoint) {
          // Define el punto inicial
          scope.startPoint = cell;
        } else {
          // ============================================================================
          // Validación y calificación
          // ============================================================================
          var str = '', // cadena encontrada
            rightSelection = false, // define si la selección fue bien realizada
            found = false; // Variable que alberga la palabra encontrada, si es el caso

          // Recorremos las celdas y recuperamos la palabra formada
          rightSelection = scope.forEachCell(scope.startPoint, cell, function (cell) {
            str += cell.letter;
          });

          // Si la selección no se hizo bien, entonces termina la función
          if (!rightSelection) {
            scope.startPoint = false; // vuelve al estado inicial
            return;
          }

          scope.wordGroups.forEach(function (group) {
            group.items.forEach(function (word) {
              // Verificamos la palabra, tanto de una forma, como al revés
              if (word.back === str || word.back === str.split("").reverse().join("")) {
                found = word;
              }
            });
          });

          // Si la palabra ha sido encontrada y no ha sido completada anteriormente, la completamos
          if (found) {
            if (!found.completed) {
              found.completed = true; // la marcamos como completada
              scope.rightAnswer = Math.random(); // Disparamos el evento de respuesta correcta

              rightAnswers++;

              // Recorremos nuevamente las celdas para marcarlas como terminadas
              scope.forEachCell(scope.startPoint, cell, function (cell) {
                cell.completed = true;
              });
            }
          } else {
            // Respuesta incorrecta
            scope.wrongAnswer = Math.random();
          }

          chances--; // Reducimos las posibilidades
          scope.startPoint = false; // vuelve al estado inicial

          // Si se acaban las oportunidades, o se terminan todas las palabras
          if (chances === 0 || rightAnswers === totalWords) {
            if (rightAnswers >= minRightAnswers) {
              scope.$root.isNextEnabled = true;
              scope.success = true;
            } else {
              scope.failure = true;
            }
          }
        }

        scope.cleanTable(); // Limpia la tabla
      };


      /**
       * Muestra el camino en caso de que sea correcto
       */
      scope.showPath = function (cell) {
        if (scope.startPoint) {
          scope.cleanTable(); // Limpia la tabla

          scope.forEachCell(scope.startPoint, cell, function (cell) {
            cell.selected = true;
          });
        }
      };


      /**
       * Limpia la tabla
       */
      scope.cleanTable = function () {
        for (var i = 0; i < opt.table.length; i++) {
          for (var j = 0; j < opt.table[i].length; j++) {
            scope.table[i][j].selected = false;
          }
        }
      };

      /**
       * Recorre las celdas desde el punto de inicio al punto final.
       *
       * @return boolean Selección correcta o no
       */
      scope.forEachCell = function (start, end, callback) {
        var rightSelection = false;

        // Horizontales
        if (end.x === start.x) {

          rightSelection = true;

          if (end.y > start.y) {
            for (var i = start.y; i <= end.y; i++) {
              callback(scope.table[i][end.x]);
            }
          } else {
            for (var i = start.y; i >= end.y; i--) {
              callback(scope.table[i][end.x]);
            }
          }
        } //fin Horizontales

        // Verticales
        if (end.y === start.y) {

          rightSelection = true;

          if (end.x > start.x) {
            for (var i = start.x; i <= end.x; i++) {
              callback(scope.table[end.y][i]);
            }
          } else {
            for (var i = start.x; i >= end.x; i--) {
              callback(scope.table[end.y][i]);
            }
          }
        } //fin Verticales

        // abajo - derecha
        if (start.x < end.x && start.y < end.y && (start.x - end.x === start.y - end.y)) {

          rightSelection = true;

          for (var y = start.y; y <= end.y; y++) {
            for (var x = start.x; x <= end.x; x++) {
              if (start.x - x === start.y - y) {
                callback(scope.table[y][x]);
              }
            }
          }
        } // fin abajo - derecha

        // arriba - derecha
        if (start.x < end.x && start.y > end.y && (start.x - end.x === end.y - start.y)) {

          rightSelection = true;

          for (var y = end.y; y <= start.y; y++) {
            for (var x = start.x; x <= end.x; x++) {
              if (start.x - x === y - start.y) {
                callback(scope.table[y][x]);
              }
            }
          }
        } // fin arriba - derecha

        // abajo - izquierda
        if (start.x > end.x && start.y < end.y && (end.x - start.x === start.y - end.y)) {

          rightSelection = true;

          for (var y = start.y; y <= end.y; y++) {
            for (var x = end.x; x <= start.x; x++) {
              if (x - start.x === start.y - y) {
                callback(scope.table[y][x]);
              }
            }
          }
        } // fin abajo - izquierda

        // arriba - izquierda
        if (start.x > end.x && start.y > end.y && (end.x - start.x === end.y - start.y)) {

          rightSelection = true;

          for (var y = end.y; y <= start.y; y++) {
            for (var x = end.x; x <= start.x; x++) {
              if (x - start.x === y - start.y) {
                callback(scope.table[y][x]);
              }
            }
          }
        } // fin arriba - izquierda

        return rightSelection;
      };

      /**
       * Devuelve los estilos personalizados de las pistas.
       */
      scope.getClueStyles = function () {
        return opt.clueStyle ? opt.clueStyle : '';
      };


    }
  };
});
