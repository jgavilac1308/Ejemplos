var lizCompleteLetters = angular.module('lizCompleteLetters', []);

lizCompleteLetters.factory('completeLettersActivity', function ($rootScope) {

  var completeLettersActivity = {};

  /**
   * Crea el ViewModel. Aquí es donde ocurre la magia. SUPER IMPORTANTE.
   */
  completeLettersActivity.create = function (options) {
    var processedData = [];

    angular.forEach(options.items, function (item) {
      processedData.push(new Item(item.resource, item.name, item.pattern ,item.alt ? item.alt : false,item.help ? item.help : false));
    });

    options.items = processedData;

    return new completeLettersActivity._ViewModel(options);
  };


  // Clase necesaria para convertir cada letra en un input
  var Letter = function (letter, isInput) {
    this.letter = letter;
    this.input = isInput;
    this.value = ko.observable(''); // used for the user input
    this.lastValue = ko.observable();
    this.chances =  1
  };

  // Cada elemento de items que se ingrese debe ser convertido para generar los objetos Letter
  var Item = function (resource, name, positions , alt , help) {
    var self = this;

    self.resource = resource;
    self.alt = alt;
    self.name = [];
    self.help = help;

    // Constructor
    // Recorre el array comparando las posiciones y configurando los inputs
    $.each(name.split(''), function (key, value) {
      if ($.inArray(key, positions) !== -1) {
        self.name.push(new Letter(value, true));
      } else {
        self.name.push(new Letter(value, false));
      }
    });
  };

  /**
   * Genera el ViewModel de las parejas con sus funcionalidades
   *
   * Recibe un objeto con las siguientes propiedades
   *
   * @param {object}    options            Opciones a utilizar.
   * @param {object}    options.items        Elementos con las letras a completar
   * @param {object}    options.chances        Oportunidades para realizar la actividad
   * @param {object}    options.minRightAnswers    Número mínimo de respuestas buenas
   * @param {object}    options.resources      directorio de recursos
   */
  completeLettersActivity._ViewModel = function (options) {
    // Inicialización de variables
    var self = this;

    self.items = ko.observableArray(options.items);
    self.chances = ko.observable(options.chances ? options.chances : options.items.length);
    self.letterColor =  options.letterColor ? parseInt(options.letterColor) : false
    self.minRightAnswers = options.minRightAnswers;
    self.resources = options.resources;
    self.itemsPerRow = typeof options.itemsPerRow !== "undefined" ? options.itemsPerRow : 4;
    self.chancesPerItem = typeof options.chancesPerItem !== "undefined" ? options.chancesPerItem : 1;

    // audio
    self.audio = ko.observable(options.audio);

    // Si está buena, va al siguiente input
    self.verifyAnswer = function (item, e) {
      var input = e.currentTarget;

      if (item.value() !== '') {

        var aux = item.value().toLowerCase()


        if (aux === item.letter ) {
          // Es correcto
          self.rightAnswers(self.rightAnswers() + 1);
          self.chances(self.chances() - 1);
          input.disabled = 'disabled'; // desabilita el input

          // Va al siguiente input. Necesario que todo esté dentro de un elemento FORM
          var inputs = $(input).closest('form').find(':input:visible');
          inputs.eq(inputs.index(input) + 1).focus(); // Esta es la función de salto al siguiente input
        } else {
          // Incorrecto
          item.chances++
          if(item.chances > self.chancesPerItem){
            item.lastValue(item.value());
            self.chances(self.chances() - 1);
            item.value = item.letter;
            input.disabled = 'disabled'; // desabilita el input
            // Va al siguiente input. Necesario que todo esté dentro de un elemento FORM
            var inputs = $(input).closest('form').find(':input:visible');
            inputs.eq(inputs.index(input) + 1).focus(); // Esta es la función de salto al siguiente input
          }
        }

        
      }
    };

    /**
     * Reproduce el audio de la instrucción.
     */
    self.playAudio = function () {
      $('#audio-instruction')[0].play();
    };

    // Limpia el input después de teclear
    self.clearInput = function (item, e) {
      if (item.value() !== '' && item.value() != item.letter) {
        item.value(String.fromCharCode(e.charCode)); // set the pressed key
      }

      return true;
    };

    // Define el éxito de la actividad
    self.success = ko.computed(function () {
      // Activamos la siguiente
      if (self.chances() === 0 && self.rightAnswers() >= self.minRightAnswers) {
        $rootScope.isNextEnabled = true;
      }

      return self.chances() === 0 && self.rightAnswers() >= self.minRightAnswers;
    });

    // Define el fracaso de la actividad
    self.failure = ko.computed(function () {
      return self.chances() === 0 && self.rightAnswers() < self.minRightAnswers;
    });
  };


  /**
   * Inicializa la instancia del ViewModel creado con pairsActivity.create
   *
   * @param {object} instance Intancia del VM de knockout
   */
  completeLettersActivity.run = function (instance) {
    ko.cleanNode($('#main-container')[0]);
    ko.applyBindings(instance, $('#main-container')[0]);
  };

  return completeLettersActivity;
});


lizCompleteLetters.directive('completeLetters', function (completeLettersActivity) {
  return {
    restrict: 'E',
    templateUrl: '../views/activities/complete_letters.html',
    scope: {
      options: '=',
      description: '@',
      letter: '@',
      audio: '@'
    },
    link: function postLink(scope, element, attrs) {
      // Corremos la aplicación
      // Añadimos el audio a options
      scope.options.audio = typeof scope.audio !== "undefined" ? scope.audio : false;
      scope.options.resources = scope.$root.resources;
      completeLettersActivity.run(completeLettersActivity.create(scope.options));
    }
  };
});

