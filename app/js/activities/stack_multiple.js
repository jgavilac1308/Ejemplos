/**
 * Actividad donde los elementos pueden ser arrastrados en múltiples grupos desde una pila definida
 */
var lizStackMultiple = angular.module('lizStackMultiple', []);

lizStackMultiple.factory('stackMultipleActivity', function ($rootScope, shuffleArrayFactory) {

	var stackMultipleActivity = {};

  /**
   * Crea el ViewModel
   */
  stackMultipleActivity.create = function (options) {
    return new stackMultipleActivity._ViewModel(options);
  };

	/**
	 * Genera el ViewModel de la actividad con las siguientes opciones
	 *
	 *
	 */
	stackMultipleActivity._ViewModel = function (options) {
		var self = this,
			tempItem = {}, // variable auxiliar para añadir nuevos elementos al stack
			stackCounter = 0, // Variable para poner Id's a elementos clonados
			tempStack = []; // Array auxiliar que después será ordenado aleatoriamente

		self.groups = ko.observableArray([]);
		self.stack = ko.observableArray([]);
		self.resources = $rootScope.resources; // Carpeta de recursos desde angular
		self.maxElementsPerGroup = options.hasOwnProperty('maxElementsPerGroup') ? options.maxElementsPerGroup : 2;

		// Triggers que se activan cuando la respuesta es correcta/incorrecta
		self.rightAnswer = ko.observable();
		self.wrongAnswer = ko.observable();

		// Triggers cuando la actividad termina satisfactoria y/o insatisfactoriamente
		self.success = ko.observable(false);

		/**
		 * Clase para los grupos
		 */
		self.Group = function (options) {
			this.name = options.name;
			this.sortable = ko.observableArray([]);
			this.sortable._array = this.sortable;

			this.min = options.hasOwnProperty('min') ? options.min : 0;
			this.max = options.hasOwnProperty('max') ? options.max : 99;
		};

		// Constructor de los grupos
		ko.utils.arrayForEach(options.groups, function(group){
			self.groups.push(new self.Group(group));
		});

		// Constructor del stack
		ko.utils.arrayForEach(options.stack, function(item){

			// Procesamos cada elemento para pasarlo al stack
			if(! item.hasOwnProperty('copies')) item.copies = 1;

			stackCounter++;

			// Creamos las copias
			for(var i=0; i < item.copies; i++){

				tempItem = $.extend(true, {}, item);

				tempItem._id = stackCounter; // definimos un id idéntico a las copias
				tempItem.serial = (Math.random() + 1).toString(36).substring(7); // Clave primaria

				tempStack.push(tempItem); // Añade el elemento

			}

		});

		// Añadimos el array a self.stack
		self.stack(shuffleArrayFactory.run(tempStack));

		/**
		 * Función que se ejecuta cada vez que se suelta un elemento
		 * El objetivo es revisar los elementos para definir las condiciones 
		 * propuestas por el desarrollador en cada grupo
		 */
		self.verifyAfter = function (arg) {
			var item = arg.item,
				filteredArray = [], // variable que recibe los elementos filtrados del array
				wrongElement = {}, // elemento removido en caso de que ya exista el elemento en la lista
				arrayTarget = arg.targetParent._array; // Puntero al arreglo de objetos del objetivo


			// Cuando es el mismo destino
			if(arg.sourceParent === arg.targetParent) return;


			// Filtramos el array en busca de elementos repetidos
			filteredArray = arrayTarget().filter(function(elem){
				return elem._id === item._id;
			});


			// Si es mayor a 1, entonces hay elementos repetidos
			if(filteredArray.length > 1){
				// Respuesta Incorrecta	
				self.wrongAnswer(item);

				// Removemos el elemento y lo lanzamos de nuevo al stack
				wrongElement = arrayTarget.remove(function(elem){
					return elem.serial === item.serial;
				})[0];

				// Devolvemos el elemento al stack
				self.stack.push(wrongElement);

			} else {
				// Respuesta Correcta
				self.rightAnswer(item);
			}

			// Analizamos las condiciones para así activar el botón de siguiente
			var condition = true;

			ko.utils.arrayForEach(self.groups(), function(group){
				// mínimos
				if(group.sortable().length >= group.min )
					condition = condition && true; 
				else
					condition = condition && false; 

				// máximos
				if(group.sortable().length <= group.max)
					condition = condition && true; 
				else
					condition = condition && false; 
			});

			// Activamos / desactivamos el botón de siguiente 
			if(condition) 
				$rootScope.isNextEnabled = true;
			else 
				$rootScope.isNextEnabled = false;

			// Aplicamos el cambio del scope
			$rootScope.$apply();

		}

		/**
		 * Función que se ejecuta al dar click en siguiente
		 */
		$rootScope.beforeGoNext = function () {
			self.success(true);
			return true;
		};

		/**
		 * Define si el target esta lleno utilizando self.maximumElements
		 */
		self.isContainerFull = function (parent) {
			return parent().length < self.maxElementsPerGroup;
		};

		/**
		 * Estilos de los grupos
		 */
		self.getGroupStyles = function () {
			 return "width: " + (100 / self.groups().length) + "%;";
		}

	};

	/**
	 * Inicializa la instancia del ViewModel creado con stackMultipleActivity.create
	 *
	 * @param {object} instance Intancia del VM de knockout
	 */
	stackMultipleActivity.run = function (instance) {
		ko.cleanNode($('#main-container')[0]);
		ko.bindingHandlers.sortable.afterMove = instance.verifyAfter;
		ko.applyBindings(instance, $('#main-container')[0]);
	};

	return stackMultipleActivity;

});

lizStackMultiple.directive('stackMultiple', function  (stackMultipleActivity) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			description: '@',
			audio: '@'
		},
		transclude: true,
		templateUrl: '../views/activities/stack_multiple.html',
		link: function postLink(scope, element, attrs) {
			// Definimos los contenedores y los elementos transcluídos
			var groupContainer = element.find('.group .item'),
				itemContainer = element.find('.stack .item');

			// Se añade cada uno de los hijos a la plantilla en la posición adecuada
			angular.forEach(element.find('.transcluded item').clone().children(), function (elem) { groupContainer.append(elem); });
			angular.forEach(element.find('.transcluded item').clone().children(), function (elem) { itemContainer.append(elem); });

			// Se elimina el elemento transcluded del DOM
			element.find('.transcluded').remove();

			// Iniciar Knockout
			stackMultipleActivity.run(stackMultipleActivity.create(scope.options));
		}
	}; 
});
