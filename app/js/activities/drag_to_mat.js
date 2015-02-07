var lizDragToMat = angular.module('lizDragToMat', ['ngDragDrop']);

lizDragToMat.directive('dragToMat', function  ($compile) {
  return {
    restrict: 'E',
    scope: {
      options: '=',
      audio: '@',
      description: '@',
    },
    templateUrl: '../views/activities/drag_to_mat.html',
    link: function (scope, element, attrs) {
      var opt = scope.options,
        replaceArray = [], // array con los índices de los targets
        targetCounter = 0, // Variable temporal usada como contador
        rightAnswers = 0, // contador de respuestas correctas
        minRightAnswers = opt.minRightAnswers, // respuestas correctas mínimas para pasar
        template = opt.template;

      // Models
      // --------------------------------------------------------------------
      scope.items = [];
      scope.targets = [];

      // img
      scope.src = opt.src;
      scope.alt = opt.alt;
    
      // iteramos sobre los objetos, para construir los draggables
      opt.items.forEach(function (item, index) {
        var _data = null;

        if(typeof item === 'object') _data = item.data;
        else _data = item;

        // Creación de item
        if(_data instanceof Array) {
          _data.forEach(function (i) {
            scope.items.push({
              _id: index,
              text: i
            });
          });
        } else {
          scope.items.push({
            _id: index,
            text: _data
          });
        }

      });

      // Template Creation
      // --------------------------------------------------------------------
      // Usamos replace para obtener los índices
      template.replace(/\$\{(\d+)\}/g, function (a, b) {
        a = a.substr(2, a.length - 3); // Remueve los elementos que producen la interpolación
        replaceArray.push(a);
        return false;
      });

      replaceArray.forEach(function (i) {
        // Creación de target
        scope.targets.push({
          _id: parseInt(i),
          drop: true,
          chances: 2,
          customClass: opt.items[i].customClass ? opt.items[i].customClass : '',
          model: {} // droppable
        });
      });

      // Formateamos el contenido para añadirlo a .operation-content
      template = template.replace(/\$\{(\d+)\}/g, function (a, b) {
        a = "targets[" + targetCounter + "]";
        targetCounter += 1;

        var elem = '<span class="drop-container bd-1 {{ _x_.customClass }}" ng-class="{ disabled: _x_.disabled }" data-drop="_x_.drop" ng-model="_x_.model" jqyoui-droppable="{ onDrop: \'dropCallback(_x_)\' }">\n    <span class="dropped-item">{{ _x_.model.text }}</span>\n    <span class="answer-icon icon-right" ng-show="_x_.right"></span>\n    <span class="answer-icon icon-wrong" ng-show="_x_.wrong"></span>\n</span>\n';

        return elem.replace(/_x_/g, a);
      });

      element.find('.template-container').append($compile(template)(scope));

      // Events
      // --------------------------------------------------------------------
      /**
       * Función que se ejecuta al soltar un elemento.
       *
       * @param e    event de jquery ui
       * @param ui
       * @param target    Modelo donde fue soltado el item
       */
      scope.dropCallback = function (e, ui, target) {
        var completedTargets = 0;
        console.log(e, ui, target);

        // revisa el modelo interno y compara _ids
        if(target._id === target.model._id) {
          // Respuesta correcta
          target.drop = false; // deshabilita el drop
          target.disabled = true;
          target.right = true;

          rightAnswers += 1;
        } else {
          // Respuesta incorrecta
          target.model = {}; // limpia el interno
          target.chances -= 1;

          if(target.chances === 0) {
            target.disabled = true;
            target.wrong = true;
          }
        }

        // Fin de la actividad
        completedTargets = scope.targets.filter(function (t) {
          return t.disabled;
        }).length;

        if(completedTargets === scope.targets.length) {
          scope.$root.isNextEnabled = true;
        }
      };

      /**
       * Función que se ejecuta al dar click en la flecha de siguiente.
       */
      scope.$root.beforeGoNext = function () {
        if(rightAnswers >= minRightAnswers) {
          scope.success = true;
          return true;
        } else {
          scope.failure = true;
          return true;
        }
      };


    }
  };
});
