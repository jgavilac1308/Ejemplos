var lizReplaceWithInputs = angular.module('lizReplaceWithInputs', []);

lizReplaceWithInputs.directive('replaceWithInputs', function  ($compile) {
  return {
    restrict: 'E',
    scope: {
      options: '=',
      audio: '@',
      description: '@'
    },
    templateUrl: '../views/activities/replace_with_inputs.html',
    link: function postLink(scope, element, attrs) {
      var opt = scope.options,
        rightAnswers = 0,
        minRightAnswers = opt.minRightAnswers,
        cnt = opt.content, // Content to process
        placeholders = [], // Array con los placeholders
        placeholderCounter = 0; // Contador para crear scope.answers

      // imagen - audio
      scope.src = opt.src;
      scope.alt = opt.alt;
      scope.addAudio = opt.audio;

      scope.title = opt.title;
      scope.answers = [];

      // Busca los placeholders
      cnt.replace(/\$\{(\d+)\}/g, function (a, b) {
        a = a.substr(2, a.length - 3); // Remueve los elementos que producen la interpolación
        placeholders.push(a);
      });

      // En base a los placeholders, creamos cada uno de los targets
      placeholders.forEach(function (p) {
        var a = {},
          _data = null,
          answer = opt.answers[p];

        a.input = ''; // modelo
        a.chances = 2; // oportunidades

        if(typeof answer === 'object') {
          _data = answer.data
        } else {
          _data = answer;
        }

        if(_data instanceof Array) {
          a.answer = _data;
        } else {
          a.answer = _data.toString();
        }

        a.customClass = answer.hasOwnProperty('customClass') ? answer.customClass : '';
        a.placeholder = answer.hasOwnProperty('placeholder') ? answer.placeholder : '';

        scope.answers.push(a); // Añade a las respuestas
      });

      // Reemplaza los placeholders con los elementos funcionales (inputs)
      cnt = cnt.replace(/\$\{(\d+)\}/g, function (a, b) {
        a = "answers[" + placeholderCounter + "]";
        placeholderCounter += 1;

        var elem = '<span class="input-container">\n    <input style="_s_" class="input-primary {{ _x_.customClass }}" type="text" ng-model="_x_.input" ng-disabled="_x_.completed" ng-blur="verify(_x_)" placeholder="{{ _x_.placeholder }}"/>\n    <span class="icon-right" ng-show="_x_.right"></span>\n    <span class="icon-wrong" ng-show="_x_.wrong"></span>\n</span>\n';

        elem = elem.replace(/_s_/g, opt.inputStyles);
        return elem.replace(/_x_/g, a);
      });

      // Compilación
      element.find('.operation-content').append($compile(cnt)(scope));

      /**
       * Verifica cada campo de texto. Si hay errores, lo limpia instantáneamente.
       * @param item
       */
      scope.verify = function (item) {
        // Si esta completo o si el input no tiene el tamaño de la respuesta, salimos
        if(item.completed || item.input.trim() === "") return false;

        var completedItems = null,
          condition = null;

        if(item.answer instanceof Array) {
          condition = item.answer.indexOf(item.input.trim()) >= 0;
        } else {
          condition = item.answer === item.input.trim();
        }

        if(condition) {
          // Respuesta correcta
          delete item.wrong;

          item.right = true;
          item.completed = true; // Marca el item como terminado
          rightAnswers += 1; // Incrementa las respuestas correctas
        } else {
          // Respuesta incorrecta
          item.wrong = true;
          item.chances -= 1;

          if(item.chances === 0) {
            item.completed = true;
          } else {
            item.input = ''; // Limpia el input
          }
        }

        // Contamos los elementos completos
        completedItems = scope.answers.filter(function (a) {
          return a.completed;
        }).length;

        // Fin de la actividad
        if(completedItems === scope.answers.length) {
          // Hacemos la realimentación, poniendo todas las respuestas correctas
          scope.answers.forEach(function (answer) {
            answer.input = answer.answer;
          });

          scope.$root.isNextEnabled = true;
        }

      };

      // Función especial que se ejecuta al dar click en la flecha de siguiente
      scope.$root.beforeGoNext = function () {
        if(rightAnswers >= minRightAnswers) {
          scope.success = true;
          return true;
        } else {
          scope.failure = true;
          return false;
        }
      };

    }
  };
});
