/* ===========================================================
 * Drop Condition
 * ===========================================================
 * Permite arrastrar elementos a cuadros basado en una condición definida por medio de una función.
 */
var lizDropCondition = angular.module('lizDropCondition', ['ngDragDrop']);

lizDropCondition.directive('dropCondition', function  ($compile) {
  return {
    restrict: 'E',
    scope: {
      options: '=',
      audio: '@',
      description: '@'
    },
    templateUrl: '../views/activities/drop_condition.html',
    link: function (scope, element, attrs) {
      var opt = scope.options,
        iTemplate = opt.itemTemplate,
        tTemplate = iTemplate.replace('item', 'target.model'), // Usa la misma plantilla de los items
        $itemsTemplate = null, // Plantilla de los objetos
        $targetsTemplate = null,
        chances = opt.chances,
        minRightAnswers = opt.minRightAnswers,
        rightAnswers = 0; // Contador de respuestas correctas

      // Models
      // --------------------------------------------------------------------
      scope.items = opt.items.slice(0);
      scope.targets = _.range(opt.targets).map(function () { return { drop: "true", model: {} }; });

      // Calificación
      scope.success = false;
      scope.failure = false;
      scope.wrongAnswer = false;

      // Template Configuration
      // --------------------------------------------------------------------
      $itemsTemplate = '<div ng-repeat="item in items" class="item" ng-show="item._showIf_" data-drag="true" data-jqyoui-options="{ revert: \'invalid\' }" ng-model="items"\n     jqyoui-draggable="{index: {{$index}} }">\n</div>\n'
      $itemsTemplate = $itemsTemplate.replace('_showIf_', opt.showIf);
      $itemsTemplate = angular.element($itemsTemplate);
      $itemsTemplate.append(iTemplate);

      $targetsTemplate = '<div class="targets">\n    <div class="target" ng-repeat="target in targets" data-drop="! target.completed" ng-model="target.model" jqyoui-droppable="{ onDrop: \'dropCallback(target)\' }"></div>\n</div>\n';
      $targetsTemplate = angular.element($targetsTemplate);
      $targetsTemplate.find('.target').append($compile(tTemplate)(scope));

      element.find('.items').append($compile($itemsTemplate)(scope));
      element.find('.targets-container').append($compile($targetsTemplate)(scope));


      // Callback
      // --------------------------------------------------------------------
      scope.dropCallback = function (event, ui, target) {
        var completedTargets = 0;

        // Revisamos el target utilizando la función personalizada
        if(opt.pass(target.model)) {
          // Respuesta correcta
          target.completed = true;
          rightAnswers += 1;
        } else {
          // Respuesta incorrecta: Devuelve a su posición inicial
          scope.items.push(target.model); // Devuelve a los items
          target.model = {}; // limpia el interno
          scope.wrongAnswer = Math.random();
        }

        chances -= 1;

        // Fin de la actividad
        completedTargets = scope.targets.filter(function (t) {
          return t.completed;
        }).length;

        if(completedTargets === scope.targets.length || chances === 0) {
          if(rightAnswers >= minRightAnswers) {
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
