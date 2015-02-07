/**
 * Actividad donde los elementos pueden ser arrastrados en múltiples grupos
 */
var lizDragDropMultiples = angular.module('lizDragDropMultiples', []);

lizDragDropMultiples.factory('dragDropMultiplesActivity', function ($rootScope) {

  var dragDropMultiplesActivity = {};

  /**
   * Crea el ViewModel
   */
  dragDropMultiplesActivity.create = function (options) {
    return new dragDropMultiplesActivity._ViewModel(options);
  }

  /**
   * Genera el ViewModel de las parejas con sus funcionalidades
   *
   * Recibe un objeto con las siguientes propiedades
   *
   * @param {object}    options            Opciones a utilizar.
   * @param {Array}    options.groups        Grupos definidos. Cada grupo es un objeto que posee las siguientes propiedades
   *
   *  title: Título del bloque donde se sueltan los objetos
   *  items: elementos pertenecientes al grupo
   *
   * @param {integer}    options.chances        Número de posibilidades que tiene el usuario de hacer la actividad
   * @param {integer}    options.minRightAnswers    Número mínimo de respuestas correctas
   * @param {function}  options.successCallback    Función que se llama cuando se termina la actividad de forma satisfactoria
   * @param {function}  options.rightAnswerCallback  Función que se llama cuando la respuesta es correcta
   *
   */
  dragDropMultiplesActivity._ViewModel = function (options) {
    var self = this;

    var Group = function (options) {
      this._id = options._id;
      this.title = options.title;
      this.resource = options.resource ? options.resource : false;
      this.alt = options.alt ? options.alt : false;
      this.items = ko.observableArray();
      this.items._id = this._id;
    }

    var chances = options.chances,
      rightAnswers = 0,
      minRightAnswers = options.minRightAnswers;
      noSuffleArray = options.noSuffleArray;//esta opcion desactiva el orden aleatorio de los items ::: ejemplo esp304 act 5 :::
      self.itemsStyle = options.itemsStyle ? options.itemsStyle : '';

    // ordena el array de forma aleatoria usando el algoritmo de Fisher-Yates
    self.shuffleArray = function (array) {

      if(!noSuffleArray){//es importante para q las palabras queden el el orden deseado 
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }
      return array;
    };

    // Conjunto total de elementos
    self.items = ko.observableArray();
    self.groups = ko.observableArray(); 

    self.resources = $rootScope.resources;

    // audio
    self.audio = ko.observable(options.audio);

    // Triggers que se activan cuando la respuesta es correcta/incorrecta
    self.rightAnswer = ko.observable();
    self.wrongAnswer = ko.observable();

    // Triggers cuando la actividad termina satisfactoria y/o insatisfactoriamente
    self.failure = ko.observable(false);
    self.success = ko.observable(false);

    // Recorremos cada grupo y cada uno de los elementos, para agregarlos a items
    ko.utils.arrayForEach(options.groups, function (group) {
      // Creamos un nuevo grupo en base a la plantilla creada
     /* group._id = (Math.random() + 1).toString(36).substring(7);*/
      group._id = group.title;
      self.groups.push(new Group(group));

      ko.utils.arrayForEach(group.items, function (item) {
        item._id = item.groupId ? item.groupId : group._id;
        item.title = item.title ? item.title : false;
        self.items.push(item);
      });
    });


    // Organizamos los elementos de forma aleatoria
    self.items(self.shuffleArray(self.items()));

    // Definimos los estilos de cada elemento
    for (var i = 0; i < self.items().length; i++) {
      var width = (100 / self.items().length);
      self.items()[i]._style = "width: " + width + '%; ';
      self.items()[i]._style += "left: " + ( i * width ) + '%';
      self.items()[i]._style += ';' + self.itemsStyle;
    }
    ;

    // Después del constructor, definimos el número de intentos
    chances = options.chances ? options.chances : self.items().length;


    /**
     * Reproduce el audio de la instrucción.
     */
    self.playAudio = function () {
      $('#audio-instruction')[0].play();
    };


    /**
     * Función que se ejecuta cada vez que se suelta un elemento
     */
    self.verify = function (arg) {
      var item = arg.item,
        targetParent = arg.targetParent;

      if (targetParent._id === item._id || ( item.groupId && item.groupId.indexOf(targetParent._id) > -1 )  ) {
        // respuesta correcta
        self.rightAnswer(item);
        rightAnswers++;

        // Reproducimos el audio
        if (targetParent.resource) {
          $('#audio-' + targetParent._id)[0].play();
        }

        if (typeof options.rightAnswerCallback !== "undefined") options.rightAnswerCallback(item);
      } else {
        // respuesta incorrecta
        self.wrongAnswer(item);
        arg.cancelDrop = true;
      }

      // reducimos las posibilidades
      chances--;

      // Fin de la actividad
      if (chances === 0 || self.items().length === 1) {
        if (rightAnswers >= minRightAnswers) {
          // éxito
          self.success(true);

          // Activamos el siguiente
          $rootScope.isNextEnabled = true;

          if (typeof options.rightAnswerCallback !== "undefined") options.rightAnswerCallback(item);
        } else {
          self.failure(true);
        }
      }

    }

    /**
     * Propiedad Computed para el tamaño de los grupos
     */
    self.getGroupWidth = ko.computed(function () {
      return "width: " + (100 / self.groups().length) + "%";
    });

  };

  /**
   * Inicializa la instancia del ViewModel creado con dragDropMultiplesActivity.create
   *
   * @param {object} instance Intancia del VM de knockout
   */
  dragDropMultiplesActivity.run = function (instance) {
    ko.cleanNode($('#main-container')[0]);
    ko.bindingHandlers.sortable.beforeMove = instance.verify;
    ko.applyBindings(instance, $('#main-container')[0]);
  };

  return dragDropMultiplesActivity;
});

lizDragDropMultiples.directive('dragDropMultiples', function (dragDropMultiplesActivity) {
  return {
    restrict: 'E',
    scope: {
      options: '=',
      audio: '@',
      description: '@'
    },
    transclude: true,
    templateUrl: '../views/activities/drag_drop_multiples.html',
    link: function postLink(scope, element, attrs) {
      // Definimos los contenedores y los elementos transcluídos
      var itemChildren = element.find('.transcluded item').children(),
        itemContainer = element.find('.item');

      // Se añade cada uno de los hijos a la plantilla en la posición adecuada
      angular.forEach(itemChildren, function (elem) {
        itemContainer.append(elem);
      });

      // Se elimina el elemento transcluded del DOM
      element.find('.transcluded').remove();

      // Añadimos el audio a options
      scope.options.audio = typeof scope.audio !== "undefined" ? scope.audio : false;

      // Iniciar Knockout
      dragDropMultiplesActivity.run(dragDropMultiplesActivity.create(scope.options));
    }
  };
});
