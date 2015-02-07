var lizGroupPuzzleWord = angular.module('lizGroupPuzzleWord', ['ngDragDrop']);

lizGroupPuzzleWord.directive('groupPuzzleWord', function  ($compile) {
  return {
    restrict: 'E',
    scope: {
      options: '=',
      audio: '@',
      description: '@'
    },
    templateUrl: '../views/activities/group_puzzle_word.html',
    link: function (scope, element, attrs) {
      var opt = scope.options,
        replaceArray = [], // array con los índices de los targets
        targetCounter = 0, // Variable temporal usada como contador
        rightAnswers = 0, // contador de respuestas correctas
        minRightAnswers = opt.minRightAnswers, // respuestas correctas mínimas para pasar
        template = opt.template;

      // Models
      // --------------------------------------------------------------------
      scope.groups = opt.groups;
      scope.itemsPerRow = opt.itemsPerRow;
      scope.preserveOriginal = opt.preserveOriginal;
      scope.chancesPerItem = opt.chancesPerItem ? opt.chancesPerItem : 1;

      scope.groups.forEach(function (g,index) {
        g.id = index;
        g.itemsAux = [];
        g.targets = [];
        g.rightAnswers = 0;

        for(var i=0; i < g.items.length; i++){
          targetCounter++ //incrementamos el contador para saber cuantos targets hay en total 

            // Creación de item y target
            g.itemsAux.push({
              text: g.items[i],
              drag: true,
              index: i
            });

            g.targets.push({
              drop: true,
              textAccept: g.answer[i],
              accept: g.id,
              chances: scope.chancesPerItem,
              model: {} // droppable
            });

            /**
            * auqui se busca la propiedad default en el grupo para completarlo y sea el ejemplo de la actividad.
            */
            if(g.default){

              // Respuesta correcta
              g.targets[i].model.text = g.answer[i],
              g.targets[i].drop = false; // deshabilita el drop
              g.targets[i].disabled = true;
              g.targets[i].right = true;
              g.rightAnswers++
              if(g.rightAnswers === g.items.length){
                rightAnswers += 1;
              }

               g.itemsAux[i].drag = false

            }


        };

        g.items = g.itemsAux;
      });

      
      scope.dropCallback = function (e, ui, target,group) {
        var completedTargets = 0;
        // revisa el modelo interno y compara
        if(target.model.text === target.textAccept) {

          // Respuesta correcta
          target.drop = false; // deshabilita el drop
          target.disabled = true;
          target.wrong = false;
          target.right = true;
          group.rightAnswers++
          if(group.rightAnswers === group.items.length){
            rightAnswers += 1;
          }

          group.items.forEach(function (i,$index) {
              
              if($index === target.model.index ){
                i.drag = false; 
              }
          });
        } else {
          // Respuesta incorrecta
          target.chances -= 1;
          target.wrong = true;

          if(target.chances === 0) {

            group.items.forEach(function (i,$index) {
              
                if($index === target.model.index ){
                  i.drag = false; 
                }
            });
            target.model = {}//limpiamos el model interno
            target.wrong = true;
          }
        }

        // Fin de la actividad
        scope.groups.forEach(function (g) {
            g.items.forEach(function (i) {
                  if(i.drag === false){completedTargets++}
            });
        });


        if(completedTargets === targetCounter) {
          scope.$root.isNextEnabled = true;
        }
      };

      scope.stopCallback = function (e, ui, item,group) {
       
      }

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
