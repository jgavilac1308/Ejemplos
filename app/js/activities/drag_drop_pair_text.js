var lizDragDropPairText = angular.module('lizDragDropPairText', []);

// Knockout Pairs Factory
lizDragDropPairText.factory('dragDropPairTextActivity', function ($rootScope) {

	var dragDropPairTextActivity = {};

  /**
   * Crea el ViewModel
   */
  dragDropPairTextActivity.create = function (options) {
    return new dragDropPairTextActivity._ViewModel(options);
  };

	/**
	 * Genera el ViewModel de las parejas con sus funcionalidades
	 *
	 * Recibe un objeto con las siguientes propiedades
	 *
	 * @param {object}		opt						Opciones a utilizar.
	 * @param {Array}			opt.data				Información de los elementos. Dentro de cada objeto, se pueden definir las propiedades:
	 *
	 *	target: Permite darle un orden apropiado a los targets. Debe empezar desde 0 y la propiedad opt.randomTargets debe estar desactivada
	 *
	 * @param {integer}		opt.chances				Número de posibilidades que tiene el usuario de hacer la actividad
	 * @param {integer}		opt.minRightAnswers		Número mínimo de respuestas correctas
	 * @param {boolean}		opt.randomItems			Define si los elementos deben ser puestos en forma aleatoria
	 * @param {boolean}		opt.randomTargets		Define si los objetivos debe ser puestos en forma aleatoria
	 * @param {function}	opt.successCallback		Función que se llama cuando se termina la actividad de forma satisfactoria
	 * @param {function}	opt.rightAnswerCallback	Función que se llama cuando la respuesta es correcta
	 *
	 */
	dragDropPairTextActivity._ViewModel = function (opt) {
		var self = this;

		// ordena el array de forma aleatoria usando el algoritmo de Fisher-Yates
		self.shuffleArray = function(array) {
			for (var i = array.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
			return array;
		};

		// Inicializa las opciones
		var data = opt.data,
      minRightAnswers = opt.minRightAnswers ? opt.minRightAnswers : data.length,
      randomItems = opt.randomItems ? true : false,
      randomTargets = opt.randomTargets ? true : false,
      chances = opt.chances ? opt.chances : data.length,
      targets_data = data.slice(0),   // Clonamos el array para empezar a trabajar
      completedItems = 0, // contador de elementos completos
      border = opt.hasOwnProperty('border') ? opt.border : true,
      padding = opt.hasOwnProperty('padding') ? opt.padding : true;

		// Objetos aleatorios
		if(randomItems) {
			data = self.shuffleArray(data);
		}

		// Creamos los índices para la posición absoluta
		for(var i = 0; i < data.length; i++){
			data[i]._index = i;
		}

		self.itemsPerRow = (opt.hasOwnProperty("itemsPerRow")) ? opt.itemsPerRow : opt.data.length;

		// audio
		self.audio = ko.observable(opt.audio);

		// Definimos los observableArrays para items y targets
		self.items = ko.observableArray(data);
		self.targets = ko.observableArray();

		// Carpeta de recursos desde angular
		self.resources = $rootScope.resources;

		self.maximumElements = 1; // IMPORTANTE: Requerido para que los sortables no acepten más de un elemento
		self.rightAnswers = 0; // Inicializamos el número de respuestas buenas a 0

		// Triggers que se activan cuando la respuesta es correcta/incorrecta
		self.rightAnswer = ko.observable();
		self.wrongAnswer = ko.observable();

		// Triggers cuando la actividad termina satisfactoria y/o insatisfactoriamente
		self.failure = ko.observable(false);
		self.success = ko.observable(false);

		// ======================================================================================
		// Constructor de los targets
		// ======================================================================================

		// Si la opción de randomTargets está activada, aplicamos el orden aleatorio
		if(randomTargets){
			targets_data = self.shuffleArray(targets_data);
		} else {
			// En caso contrario, se utiliza la propiedad target, dentro del array de data
			targets_data.sort(function (a, b) {
				return ((a.target < b.target) ? -1 : ((a.target > b.target) ? 1 : 0));
			});
		}

		var _index = 1; // índice que se le asignará a cada uno de los elementos

		ko.utils.arrayForEach(targets_data, function (item) {
			// Creamos el nuevo target. Añadimos un índice para hacer la relación 1 a 1
			item._items = ko.observableArray();
			if (opt.hasOwnProperty("chancesPerItem")) {
				item.chances = opt.chancesPerItem - 1;
			}
			item._items._id = _index++;

			self.targets.push(item);
		});
		
		// ======================================================================================
		// FIN Constructor
		// ======================================================================================

		/**
		 * Reproduce el audio de la instrucción.
		 */
		self.playAudio = function () {
			$('#audio-instruction')[0].play();
		};

		// Define si el target esta lleno utilizando self.maximumElements
		self.isContainerFull = function (parent) {
			return parent().length < self.maximumElements;
		};


		// Función que se ejecuta cuando se suelta el elemento y hace toda la funcionalidad
		self.verifyAnswer = function (arg) {
			var parent = arg.targetParent,
			item = arg.item;
         

			// Si el target es igual al contenedor inicial, se devuelve a su posición original
			if(typeof parent._id === "undefined") {
				arg.cancelDrop = true;
				return;
			} else {
				// Compara el _id para encontrar la pareja idéntica. Si es igual, la respuesta es correcta
				if(parent._id === item._items._id){

					// RESPUESTA CORRECTA
					self.rightAnswers++;
					self.rightAnswer(item);
          			completedItems += 1;
          			// Reducimos en 1 las posibilidades
					chances -= 1;

					// Si se definió una función cuando la respuesta es correcta, se corre
					if(typeof opt.rightAnswerCallback !== "undefined" ) opt.rightAnswerCallback(item);

				} else {

					// RESPUESTA INCORRECTA
					self.wrongAnswer(item);
					arg.cancelDrop = true;

					if (item.hasOwnProperty("chances")) {
						if(item.chances === 0){
							// Reducimos en 1 las posibilidades
							chances -= 1;
							$("#" + item._items._id).hide(200);
			        	}else{item.chances--;}
					} else {
						// Reducimos en 1 las posibilidades
						chances -= 1;
					}
				}
			}

			// La actividad termina cuando el número de posibilidades se termina
			if(chances === 0 || completedItems === self.targets().length) {
				// Si el número de respuestas correctas es mayor o igual al requerido inicialmente
				if(self.rightAnswers >= minRightAnswers) {
					self.success(true); // Trigger de éxito

					// Se llama la función de éxito, definida por el desarrollador
					if (typeof opt.successCallback !== "undefined") opt.successCallback();

					$rootScope.isNextEnabled = true; // Activamos el siguiente
				} else {
					self.failure(true); // Trigger de fracaso
				}
			}
		};

    /**
     * Estilos de los elementos.
     */
     var _itemIndex = 0;
    self.getItemStyles = function (item) {
      var styles = '';

     //  if (opt.hasOwnProperty("itemsPerRow")) {
     //  	if (_itemIndex === opt.itemsPerRow) {
     //  		_itemIndex = 0;
     //  	}

     //  	if (item._index >= opt.itemsPerRow) {
  			// styles += 'top: 33%;';
     //  	}
     //  	styles += 'width: ' + (100 / opt.itemsPerRow) + '%;';
     //  	styles += 'left: ' + ((100 / opt.itemsPerRow) * _itemIndex ) + '%;';
     //  	_itemIndex++
     //  } else {
      	styles += 'width: ' + (100 / self.targets().length) + '%;';
      

      
      	styles += 'left: ' + ((100 / self.targets().length) * item._index ) + '%;';
      // }
      
      styles += 'position: absolute;';
      return styles;
    };

    /**
     * Estilos de cada objetivo.
     * @returns {string}
     */
    self.getTargetStyles = function () {
      var styles = '';

      if (opt.hasOwnProperty("itemsPerRow")) {
  		styles += 'width: ' + (100 / opt.itemsPerRow) + '%;';
      } else {
      	styles += 'width: ' + (100 / self.targets().length) + '%;';
      }
      
      if(typeof opt.targetStyles !== "undefined") styles += opt.targetStyles;

      return styles;
    };

		/**
		 * Estilos para elementos internos de target e item.
		 */
		self.getInnerStyles = function (item) {
			var styles = '';

			// Estilos Opcionales
			if(border) styles += 'border: 4px solid #000;';
			if(padding) styles += 'padding: 4px;';

			return styles;
		}

	};

	/**
	 * Inicializa la instancia del ViewModel creado con pairsActivity.create
	 *
	 * @param {object} instance Intancia del VM de knockout
	 */
	dragDropPairTextActivity.run = function (instance) {
		console.log(ko.bindingHandlers);
		ko.cleanNode($('#main-container')[0]);
		ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
		ko.applyBindings(instance, $('#main-container')[0]);
	};

	return dragDropPairTextActivity;

});

lizDragDropPairText.directive('dragDropPairText', function  (dragDropPairTextActivity) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			customClass: '@'
		},
		templateUrl: '../views/activities/drag_drop_pair_text.html',
		link: function postLink(scope, element, attrs) {
			console.log(arguments);
			if(typeof scope.customClass !== "undefined"){
				scope.$root.customClass = scope.customClass;
			}

			// Definimos los contenedores y los elementos transcluídos
			var itemChildren = element.find('.transcluded item').children(),
			itemContainer = element.find('.item'),
			targetChildren = element.find('.transcluded target').children(),
			targetContainer = element.find('.target')
			itemTargetChildren = element.find('.transcluded item-target').children(),
			itemTargetContainer = element.find('.item-target');

			// Se añade cada uno de los hijos a la plantilla en la posición adecuada
			angular.forEach(itemChildren, function (elem) { itemContainer.append(elem); });
			angular.forEach(targetChildren, function (elem) { targetContainer.append(elem); });
			angular.forEach(itemTargetChildren, function (elem) { itemTargetContainer.append(elem); });

			// Se elimina el elemento transcluded del DOM
			element.find('.transcluded').remove();

			// Añadimos el audio a options
			// scope.options.audio = typeof scope.audio !== "undefined" ? scope.audio : false;

			// Corremos la aplicación
			var vm = dragDropPairTextActivity.create(scope.options);
			dragDropPairTextActivity.run(vm);
		}
	}; 
});
