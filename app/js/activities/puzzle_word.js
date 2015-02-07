/**
 * Actividad donde se arma una palabra en orden y luego se valida usando un botón.
 */
var lizPuzzleWord = angular.module('lizPuzzleWord', ['factories']);

// Knockout Pairs Factory
lizPuzzleWord.factory('puzzleWordActivity', function ($rootScope, shuffleArrayFactory) {

  var puzzleWordActivity = {};

  /**
   * Crea el ViewModel
   */
  puzzleWordActivity.create = function (options) {
    return new puzzleWordActivity._ViewModel(options);
  };

  /**
   * Modelo de la actividad.
   */
  puzzleWordActivity._ViewModel = function (opt) {
    var self = this,
      chances = opt.hasOwnProperty('chances') ? opt.chances : opt.word.length,
      minRightAnswers = opt.hasOwnProperty('minRightAnswers') ? opt.minRightAnswers : opt.word.length,
      rightAnswers = 0,
      word = opt.word.split("");


    self.Letter = function (id) {
      this.sortable = ko.observableArray();
      this.sortable.id = id;
    };

    self.audio = ko.observable(opt.audio); // audio
    self.resources = $rootScope.resources; // Carpeta de recursos desde angular
    self.maximumElements = 1; // número máximo de elementos

    self.rightAnswer = ko.observable();
    self.wrongAnswer = ko.observable();
    self.failure = ko.observable(false);
    self.success = ko.observable(false);

    self.img = opt.img; // imagen adicional
    self.letters = ko.observableArray([]);
    self.finalWord = ko.observableArray([]);

    // Constructor
    word.forEach(function (l) {
      var id = (Math.random() + 1).toString(36).substring(7);

      // añadimos cada una de las letras (stack)
      self.letters.push({
        id: id,
        letter: l
      });

      self.finalWord.push(new self.Letter(l));
    });

    // Barajamos el array de letras, mientras que las letras sea diferentes a la respuesta
    var shuffledWord = '';

    do {
      shuffleArrayFactory.run(self.letters());
      shuffledWord = self.letters().map(function (l) {
        return l.letter;
      });
    } while(shuffledWord.join("") === word.join(""));

    /**
     * Reproduce el audio de la instrucción.
     */
    self.playAudio = function () {
      $('#audio-instruction')[0].play();
    };

    /**
     * Define si el target esta lleno utilizando self.maximumElements
     */
    self.isContainerFull = function (parent) {
      return parent().length < self.maximumElements;
    };

    /**
     * Verifica la respuesta después de soltar cada uno de los elementos.
     */
    self.verifyAnswer = function (arg) {
      var parent = arg.targetParent,
        item = arg.item;

      // Si es el mismo padre
      if(parent === arg.sourceParent) return;

      // Si el target es igual al contenedor inicial, se devuelve a su posición original
      // Compara el _id para encontrar la pareja idéntica. Si es igual, la respuesta es correcta
      if(parent.id === item.letter){
        // RESPUESTA CORRECTA
        rightAnswers += 1;
        self.rightAnswer(item);
      } else {
        // RESPUESTA INCORRECTA
        self.wrongAnswer(item);
        arg.cancelDrop = true;
      }

      // Reducimos en 1 las posibilidades
      chances -= 1;

      // La actividad termina cuando el número de posibilidades se termina
      if(chances === 0 || word.length === rightAnswers) {
        // Si el número de respuestas correctas es mayor o igual al requerido inicialmente
        if(rightAnswers >= minRightAnswers) {
          self.success(true); // Trigger de éxito
          $rootScope.isNextEnabled = true; // Activamos el siguiente
        } else {
          self.failure(true); // Trigger de fracaso
        }
      }
    };

  };

  /**
   * Inicializa la instancia del ViewModel creado con puzzleWordActivity.create
   *
   * @param {object} instance Intancia del VM de knockout
   */
  puzzleWordActivity.run = function (instance) {
    ko.cleanNode($('#main-container')[0]);
    ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
    ko.applyBindings(instance, $('#main-container')[0]);
  };

  return puzzleWordActivity;

});

lizPuzzleWord.directive('puzzleWord', function  (puzzleWordActivity) {
  return {
    restrict: 'E',
    scope: {
      options: '=',
      description: '@',
      audio:'@',
      customClass: '@'
    },
    templateUrl: '../views/activities/puzzle_word.html',
    link: function postLink(scope, element, attrs) {
      // Añadimos el audio a options
      scope.options.audio = typeof scope.audio !== "undefined" ? scope.audio : false;

      // Corremos la aplicación
      puzzleWordActivity.run(puzzleWordActivity.create(scope.options));
    }
  };
});
