var lizShowConcepts = angular.module('lizShowConcepts', []);

lizShowConcepts.directive('showConcepts', function () {
  return {
    restrict: 'E',
    scope: {
      options: '=',
      title: '@',
      description: '@',
      audio: '@',
      instruction: '@'
    },
    templateUrl: '../views/concepts/show_concepts.html',
    link: function (scope, element, attrs) {

      var opt = scope.options,
        completedItems = 0;

      scope.items = opt.items;
      scope.selectedItem = false; // elemento seleccionado

      /**
       * Selecciona el elemento indicado
       */
      scope.selectItem = function (item) {

        scope.selectedItem = item; // seleccionamos el objeto

        // Contamos los elementos completos
        if (!item.hasOwnProperty('isCompleted')) {
          item.isCompleted = true; // marcamos el elemento, para no volver a seleccionarlo
          completedItems++;
        }

        // Fin de la actividad
        if (completedItems === scope.items.length) {
          scope.$root.isNextEnabled = true;
        }
      };

      /**
       * Devuelve los estilos personalizados de los items
       */
      scope.getItemStyles = function () {
        var styles = "";

        styles += "width: " + (100 / scope.items.length) + "%;";

        return styles;
      };

    }
  };
});

