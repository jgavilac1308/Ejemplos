/**
 * Actividad donde los elementos pueden ser arrastrados en múltiples grupos
 */
var lizDragDropMultiplesDiff = angular.module('lizDragDropMultiplesDiff', []);

lizDragDropMultiplesDiff.factory('dragDropMultiplesDiffActivity', function ($rootScope) {

	var dragDropMultiplesDiffActivity = {};

	/**
	 * Crea el ViewModel
	 */
	dragDropMultiplesDiffActivity.create = function (options) {
		return new dragDropMultiplesDiffActivity._ViewModel(options);
	}

	/**
	 * Genera el ViewModel de las parejas con sus funcionalidades
	 *
	 * Recibe un objeto con las siguientes propiedades
	 *
	 * @param {object}		options						Opciones a utilizar.
	 * @param {Array}		options.groups				Grupos definidos. Cada grupo es un objeto que posee las siguientes propiedades
	 *
	 *	title: Título del bloque donde se sueltan los objetos
	 *	items: elementos pertenecientes al grupo	
	 *
	 * @param {integer}		options.chances				Número de posibilidades que tiene el usuario de hacer la actividad
	 * @param {integer}		options.minRightAnswers		Número mínimo de respuestas correctas
	 * @param {function}	options.successCallback		Función que se llama cuando se termina la actividad de forma satisfactoria
	 * @param {function}	options.rightAnswerCallback	Función que se llama cuando la respuesta es correcta
	 *
	 */
	dragDropMultiplesDiffActivity._ViewModel = function (options) {
		var self = this;
		var cc = options.customClass;
	var Group = function (options) {

		this.title = options.title;
		this.resource = options.resource;
		this.alt = options.alt;
		this.items = ko.observableArray();
		this.items._id = options.id;
		this.customClass = (cc) ? cc : "";
	}

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

	rightAnswers = 0,
	minRightAnswers = options.minRightAnswers;

	self.hasCountdown = (options.hasCountdown) ? true : false;
	self.countdownTime = (options.countdownTime) ? options.countdownTime : "";

	// Conjunto total de elementos
	self.items = ko.observableArray();
	self.groups = ko.observableArray();

	self.resources = $rootScope.resources;

	// Triggers que se activan cuando la respuesta es correcta/incorrecta
	self.rightAnswer = ko.observable();
	self.wrongAnswer = ko.observable();

	// Triggers cuando la actividad termina satisfactoria y/o insatisfactoriamente
	self.failure = ko.observable(false);
	self.success = ko.observable(false);

	// Recorremos cada grupo y cada uno de los elementos, para agregarlos a items
	ko.utils.arrayForEach(options.groups, function (group) {
		// Creamos un nuevo grupo en base a la plantilla creada
		self.groups.push(new Group(group));

		ko.utils.arrayForEach(group.items, function (item) {
			item._id = group.id;
			item.htmlId = item.resource;
			item.chances = options.chancesPerItem-1;
			self.items.push(item);
		});
	});

	// Organizamos los elementos de forma aleatoria
	self.items( self.shuffleArray( self.items()  )  );

	// Definimos los estilos de cada elemento
	for(var i = 0; i < self.items().length; i++){
		var width = (100 / self.items().length);
		self.items()[i]._style = "width: " + width + '%; ';
		self.items()[i]._style += "left: " + ( i * width ) + '%';
	};

	self.playSound = function () {
		$("#audio-instruction").get(0).play();
	};

	// Después del constructor, definimos el número de intentos
	//chances = options.chances ? options.chances : self.items().length; 

	/**
	 * Función que se ejecuta cada vez que se suelta un elemento
	 */
	var counter = 0;
	var numItems = self.items().length;
	self.verify = function (arg) {
		var item = arg.item,
		targetParent = arg.targetParent;

		if(targetParent._id === item._id){
			// respuesta correcta
			self.rightAnswer(item);
			rightAnswers++;
			$("#" + item.htmlId).attr("style", "");
			/*// Reproducimos el audio
			$('#audio-' + targetParent._id)[0].play();*/

			numItems--;
			if(typeof options.rightAnswerCallback !== "undefined") options.rightAnswerCallback(item);
		} else {
			// respuesta incorrecta
			self.wrongAnswer(item);
			arg.cancelDrop = true;
			// reducimos las posibilidades
			if(item.chances === 0){
				$("#" + item.htmlId).hide(200);
				numItems--;
        	}else{item.chances--;}
		}

		// Fin de la actividad
		if(0 === numItems){
			if(rightAnswers >= minRightAnswers){
				// éxito
				self.success(true);

				// Activamos el siguiente
				$rootScope.isNextEnabled = true;

				if(typeof options.rightAnswerCallback !== "undefined") options.rightAnswerCallback(item);
			} else {
				self.failure(true);
			}
		}

	};

	self.countDown = ko.observable();

	ko.bindingHandlers.timer = {

	    update: function (element, valueAccessor) {

	        // retrieve the value from the span
	        var sec = $(element).text();
	        var timer = setInterval(function() { 

	            $(element).text(--sec);
	            if (sec == 0) {
	                if(rightAnswers >= minRightAnswers){
						// éxito
						self.success(true);

						// Activamos el siguiente
						$rootScope.isNextEnabled = true;

						if(typeof options.rightAnswerCallback !== "undefined") options.rightAnswerCallback(item);
					} else {
						self.failure(true);
					}
					clearInterval(timer);	
	            }

	            if (true === self.success() || true === self.failure()) {
	            	clearInterval(timer);
	            }
	        }, 1000);
	    }
	};

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
dragDropMultiplesDiffActivity.run = function (instance) {
	ko.cleanNode($('#main-container')[0]);
	ko.bindingHandlers.sortable.beforeMove = instance.verify;
	ko.applyBindings(instance, $('#main-container')[0]);
};

return dragDropMultiplesDiffActivity;
});


lizDragDropMultiplesDiff.directive('dragDropMultiplesDiff', function  (dragDropMultiplesDiffActivity) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			description: '@',
			audio: '@'
		},
		transclude: true,
		templateUrl: '../views/activities/drag_drop_multiples_diff.html',
		link: function postLink(scope, element, attrs) {
			// Definimos los contenedores y los elementos transcluídos
			var itemChildren = element.find('.transcluded item').children(),
			itemContainer = element.find('.item');

			// Se añade cada uno de los hijos a la plantilla en la posición adecuada
			angular.forEach(itemChildren, function (elem) { itemContainer.append(elem); });

			// Se elimina el elemento transcluded del DOM
			element.find('.transcluded').remove();

			// Iniciar Knockout
			dragDropMultiplesDiffActivity.run(dragDropMultiplesDiffActivity.create(scope.options));
		}
	}; 
});
