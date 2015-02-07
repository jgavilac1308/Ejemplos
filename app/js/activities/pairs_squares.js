var lizPairsSquares = angular.module('lizPairsSquares', []);

// Knockout Pairs Factory
lizPairsSquares.factory('pairsSquaresActivity', function ($rootScope, shuffleArrayFactory) {

	var pairsSquaresActivity = {};

	/**
	 * Crea el ViewModel
	 */
	pairsSquaresActivity.create = function (options) {
		return new pairsSquaresActivity._ViewModel(options);
	}

	/**
	 * Genera el ViewModel de las parejas con sus funcionalidades
	 *
	 * Recibe un objeto con las siguientes propiedades
	 *
	 * @param {object}		options						Opciones a utilizar.
	 * @param {Array}		options.data				Información de los elementos. Dentro de cada objeto, se pueden definir las propiedades:
	 *
	 *	target: Permite darle un orden apropiado a los targets. Debe empezar desde 0 y la propiedad options.randomTargets debe estar desactivada
	 *
	 * @param {integer}		options.pairs				Número de parejas a colocar
	 * @param {integer}		options.chances				Número de posibilidades que tiene el usuario de hacer la actividad
	 * @param {integer}		options.minRightAnswers		Número mínimo de respuestas correctas
	 * @param {function}	options.successCallback		Función que se llama cuando se termina la actividad de forma satisfactoria
	 * @param {function}	options.rightAnswerCallback	Función que se llama cuando la respuesta es correcta
	 *
	 */
	pairsSquaresActivity._ViewModel = function (options) {
		var self = this;

		/**
		 * Usamos una clase especial para poder definir las parejas
		 */
		self.Pair = function (options) {
			this.container1 = ko.observableArray();
			this.container2 = ko.observableArray();

			this.container1._id = 1;
			this.container2._id = 2;

			this.container1._parent = this;
			this.container2._parent = this;
		}

		// Inicializa las opciones
		var chances = options.chances ? options.chances : options.items.lenght,
			counter = 0, // Contador para poner los id en los elementos de stack
			pairs = options.pairs,
			item_clone = {}, // Variable auxiliar para clonar el índice
			tempStack = []; // array temporal para stack

		self.pairsArray = ko.observableArray(); // Conjunto de parejas

		self.stack = ko.observableArray(); // Pila de elementos arrastrables

		// Alimentamos el array de parejas
		for (var i=0; i < pairs; i++) {
			self.pairsArray.push(new self.Pair({}));
		}

		// tomamos los items para crear el stack
		ko.utils.arrayForEach(options.items, function(item){
			// Si no tiene la propiedad answer, se define en falso
			if(! item.hasOwnProperty('answer')) item.answer = false;


			if(item.answer){
				item._id = ++counter;

				// Creamos un clon del elemento para añadirlo con otro serial
				item_clone = $.extend(true, {}, item);

				delete item_clone.answer;
				item_clone.serial = (Math.random() + 1).toString(36).substring(7);
				tempStack.push(item_clone); // Debemos agregarlo dos veces para así crear la pareja

			} else {
				item._id = -1;
			}

			delete item.answer; // Elimina el elemento answer
			item.serial = (Math.random() + 1).toString(36).substring(7); // añade una clave única
			tempStack.push(item);

		});

		// Añadimos los elementos al stack (observableArray)
		self.stack(shuffleArrayFactory.run(tempStack));

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

		// Define si el target esta lleno utilizando self.maximumElements
		self.isContainerFull = function (parent) {
			return parent().length < self.maximumElements;
		};

		// Función que se ejecuta cuando se suelta el elemento y hace toda la funcionalidad
		self.verifyAnswer = function (arg) {
			var item = arg.item,
			parent = arg.targetParent._parent,
			comparedItem = {};

			// Si se trata del stack, salimos
			if(arg.targetParent === arg.sourceParent) return;

			// si el elemento pertenece a una pareja
			if(item._id > 0){
				// Si ambos cuadros tienen elementos
				if(parent.container1().length || parent.container2().length){
					// Aquí, comparamos los elementos para ver si la respuesta es correcta o incorrecta
					if(parent.container1().length) comparedItem = parent.container1()[0];
					if(parent.container2().length) comparedItem = parent.container2()[0];

					if(comparedItem._id === item._id){
						// Respuesta Correcta
						self.rightAnswer(item);
						self.rightAnswers++;
					} else {
						// Respuesta Incorrecta
						self.wrongAnswer(item);
						arg.cancelDrop = true;
					}
				}
			} else {
				// respuesta mala desde el inicio
				self.wrongAnswer(item);
				arg.cancelDrop = true;
			}

			// Reducimos en 1 las posibilidades
			chances--;

			// La actividad termina cuando el número de posibilidades se termina
			if(chances === 0) {
				// Si el número de respuestas correctas es mayor o igual al requerido inicialmente
				if(self.rightAnswers >= options.minRightAnswers) {
					// Trigger de éxito
					self.success(true);

					// Se llama la función de éxito, definida por el desarrollador
					if (typeof options.successCallback !== "undefined") options.successCallback();

					// Activamos el siguiente
					$rootScope.isNextEnabled = true;

				} else {
					// Trigger de fracaso
					self.failure(true);
				}
			}


		};

};

	/**
	 * Inicializa la instancia del ViewModel creado con pairsSquaresActivity.create
	 *
	 * @param {object} instance Intancia del VM de knockout
	 */
	pairsSquaresActivity.run = function (instance) {
		ko.cleanNode($('#main-container')[0]);
		ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
		ko.applyBindings(instance, $('#main-container')[0]);
	};

	return pairsSquaresActivity;

});


lizPairsSquares.directive('pairsSquares', function  (pairsSquaresActivity) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			options: '=',
			description: '@'
		},
		templateUrl: '../views/activities/pairs_squares.html',
		link: function postLink(scope, element, attrs) {

			// Definimos los contenedores y los elementos transcluídos
			var square1Container = element.find('.square1 .item'),
			square2Container = element.find('.square2 .item'),
			itemContainer = element.find('.stack .item');

			// Se añade cada uno de los hijos a la plantilla en la posición adecuada
			angular.forEach(element.find('.transcluded item').clone().children(), function (elem) { square1Container.append(elem); });
			angular.forEach(element.find('.transcluded item').clone().children(), function (elem) { square2Container.append(elem); });
			angular.forEach(element.find('.transcluded item').clone().children(), function (elem) { itemContainer.append(elem); });

			// Se elimina el elemento transcluded del DOM
			element.find('.transcluded').remove();

			// Corremos la aplicación
			var vm = pairsSquaresActivity.create(scope.options);
			pairsSquaresActivity.run(vm);
		}
	}; 
});
