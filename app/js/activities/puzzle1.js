var lizPuzzle1 = angular.module('lizPuzzle1', []);

// Knockout Puzzle1 Factory
lizPuzzle1.factory('puzzle1Activity', function ($rootScope) {

  var puzzle1Activity = {};

  /**
   * Crea el ViewModel
   */
  puzzle1Activity.create = function (options) {
    return new puzzle1Activity._ViewModel(options);
  }

  /**
   * Genera el ViewModel de las parejas con sus funcionalidades
   *
   * Recibe un objeto con las siguientes propiedades
   *
   * @param {object}    options            Opciones a utilizar.
   * @param {Array}    options.data        Información de los elementos. Dentro de cada objeto, se pueden definir las propiedades:
   *
   *  target: Permite darle un orden apropiado a los targets. Debe empezar desde 0 y la propiedad options.randomTargets debe estar desactivada
   *
   * @param {integer}    options.chances        Número de posibilidades que tiene el usuario de hacer la actividad
   * @param {integer}    options.minRightAnswers    Número mínimo de respuestas correctas
   * @param {boolean}    options.randomItems      Define si los elementos deben ser puestos en forma aleatoria
   * @param {boolean}    options.randomTargets    Define si los objetivos debe ser puestos en forma aleatoria
   * @param {function}  options.successCallback    Función que se llama cuando se termina la actividad de forma satisfactoria
   * @param {function}  options.rightAnswerCallback  Función que se llama cuando la respuesta es correcta
   *
   */
  puzzle1Activity._ViewModel = function (options) {
    var self = this;

    // Inicializa las opciones
    var items = options.items,
      minRightAnswers = options.minRightAnswers ? options.minRightAnswers : items.length,
      chances = options.chances ? options.chances : items.length;

    // Definimos los observableArrays para items
    self.items = ko.observableArray(items);

    // Añadimos a cada item la propiedad answer: true si no está definida. (por defecto)
    ko.utils.arrayForEach(self.items(), function (item) {
      if (typeof item.answer === "undefined")
        item.answer = true;
    });

    self.canvas = ko.observableArray(); // Donde caen las imágenes

    self.rightAnswers = 0; // Inicializamos el número de respuestas buenas a 0

    self.resources = $rootScope.resources;
    self.audio = ko.observable(options.audio);

    // Triggers que se activan cuando la respuesta es correcta/incorrecta
    self.rightAnswer = ko.observable();
    self.wrongAnswer = ko.observable();

    // Triggers cuando la actividad termina satisfactoria y/o insatisfactoriamente
    self.failure = ko.observable(false);
    self.success = ko.observable(false);

    /**
     * Reproduce el audio de la instrucción.
     */
    self.playAudio = function () {
      $('#audio-instruction')[0].play();
    };

    // Función que se ejecuta cuando se suelta el elemento y hace toda la funcionalidad
    self.verifyAnswer = function (arg) {
      var item = arg.item;

      if (arg.sourceParent === arg.targetParent) return;

      if (item.answer === true) {

        // RESPUESTA CORRECTA
        self.rightAnswers++;
        self.rightAnswer(item);

        // Si se definió una función cuando la respuesta es correcta, se corre
        if (typeof options.rightAnswerCallback !== "undefined") options.rightAnswerCallback(item);

      } else {

        // RESPUESTA INCORRECTA
        self.wrongAnswer(item);
        arg.cancelDrop = true;

      }

      // Reducimos en 1 las posibilidades
      chances--;

      // La actividad termina cuando el número de posibilidades se termina
      if (chances === 0) {
        // Si el número de respuestas correctas es mayor o igual al requerido inicialmente
        if (self.rightAnswers >= minRightAnswers) {

          // Trigger de éxito
          self.success(true);

          $rootScope.isNextEnabled = true;

          // Se llama la función de éxito, definida por el desarrollador
          if (typeof options.successCallback !== "undefined") options.successCallback();

        } else {

          // Trigger de fracaso
          self.failure(true);

        }
      }
    };
  };

  /**
   * Inicializa la instancia del ViewModel creado con puzzle1Activity.create
   *
   * @param {object} instance Intancia del VM de knockout
   */
  puzzle1Activity.run = function (instance) {
    ko.cleanNode($('#main-container')[0]);
    ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
    ko.applyBindings(instance, $('#main-container')[0]);
  };

  return puzzle1Activity;

});


lizPuzzle1.directive('puzzle1', function (puzzle1Activity) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      options: '=',
      description: '@',
      audio: '@'
    },
    templateUrl: '../views/activities/puzzle1.html',
    link: function postLink(scope, element, attrs) {
      // Añadimos el audio a options
      scope.options.audio = typeof scope.audio !== "undefined" ? scope.audio : false;

      // Corremos la aplicación
      puzzle1Activity.run(puzzle1Activity.create(scope.options));
    }
  };
});


