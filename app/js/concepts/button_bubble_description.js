/**
 * La actividad consiste en varios botones que al ser presionados activan una burbuja
 * con contenido.
 */
var lizButtonBubbleDescription = angular.module('lizButtonBubbleDescription', []);

lizButtonBubbleDescription.directive('buttonBubbleDescription', function () {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      options: '=',
      title: '@',
      description: '@',
      audio: '@',
      instruction: '@',
      mainimg: '@',
      alt: '@'
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    templateUrl: '../views/concepts/button_bubble_description.html',
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function (scope, iElm, iAttrs) {

      scope.bubbles = scope.options.bubbles;
      scope.complete = false; // Cuando termina la actividad

      // watch if the activity is finished
      scope.$watch('complete', function (complete) {
        if (scope.complete) {

          // Activamos la siguiente actividad o ruta
          scope.$root.isNextEnabled = true;
        }
      });

      scope.makeId = function (id) {
        var newId = id.replace(" ", "_");
        var text = newId + "_";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
      };

      angular.forEach(scope.bubbles, function (value, key) {
        value.btnId = scope.makeId(value.name);
        value.audioId = scope.makeId(value.audio);
        value.btnChecked = false;
        value.displayInfo = false;
        value.activeBtn = false;
      });

      // Si la descripción o el título están, entonces la instrucción va al fondo
      scope.isBottom = scope.title || scope.description;

      var counter = 0;

      scope.activateBubble = function (bubble) {

        angular.forEach(scope.bubbles, function (value, key) {
          value.displayInfo = false;
          if (value.btnId != bubble.btnId) {
            value.activeBtn = false;
          }
        });

        bubble.activeBtn = true;
        bubble.displayInfo = true;

        if (bubble.btnChecked === false) {
          counter++;
          bubble.btnChecked = true;
        }
        if (counter === scope.bubbles.length) {
          scope.complete = true;
        }
      };
    }
  };
});