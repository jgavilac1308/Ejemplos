var lizPuzzle4 = angular.module('lizPuzzle4', []);

// Knockout Puzzle2 Factory
lizPuzzle4.factory('puzzle4Activity', function ($rootScope,$sce) {

	var puzzle4Activity = {};

	/**
	 * Crea el ViewModel
	 */
	puzzle4Activity.create = function (options) {
		return new puzzle4Activity._ViewModel(options);
	}

	/**
	 * Genera el ViewModel de las parejas con sus funcionalidades
	 *
	 * Recibe un objeto con las siguientes propiedades
	 *
	 * @param {object}		opt						Opciones a utilizar.
	 * @param {Array}		opt.data				Información de los elementos. Dentro de cada objeto, se pueden definir las propiedades:
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
	puzzle4Activity._ViewModel = function (opt) {
		var self = this;

		// Inicializa las opciones
		var targets = opt.targets,
				minRightAnswers = opt.minRightAnswers ? opt.minRightAnswers : targets.length,
				chances = opt.chances ? opt.chances : targets.length;

		// audio
		self.audio = ko.observable(opt.audio);

		self.canvas = opt.canvas ? opt.canvas : false; // La imagen en sí
		self.extcanvas = opt.extcanvas ? opt.extcanvas : '.png'; // La imagen en sí
		self.altcanvas = opt.altcanvas ? opt.altcanvas : false;//texto alternativo de la imagen principal 
		self.maintext = opt.maintext ? opt.maintext : false; // el texto q remplaza la imagen 
		self.maintextstyle = opt.maintextstyle ? opt.maintextstyle : opt.maintext ? false : 'display: none;';
		self.items = ko.observableArray(opt.targets); // Sortable de targets
		self.targets = ko.observableArray(opt.targets); // Sortable de targets
		self.noDrag = opt.noDrag ? opt.noDrag : false;
		self.preserveText = ko.observable(opt.hasOwnProperty('preserveText') ? true : false);
		self.preserveimg = opt.preserveimg ? true : false;

    // Recorremos los items para definir los valores
    self.items().forEach(function (item) {
      item.text = item.hasOwnProperty('text') ? item.text : false;
      item.img = item.hasOwnProperty('img') ? item.img : false;
      item.alt = item.hasOwnProperty('alt') ? item.alt : false;
    });

		// Constructor para los targets
		ko.utils.arrayForEach(self.targets(), function(target){
				target._id = (Math.random() + 1).toString(36).substring(7); // Genera un código aleatorio como id
				target.preserveimg = self.preserveimg;
				
				// Creamos el lugar a donde cae el elemento
				target._targets = ko.observableArray();
				target._targets._id = target._id;
				target._targets._acept= target.acept ? target.acept : false;

		});

		self.rightAnswers = 0; // Inicializamos el número de respuestas buenas a 0
		self.targetslength= targets.length - self.noDrag; // numero de items 
		self.maximumElements = 1; // Número máximo de elementos

		self.resources = $rootScope.resources;

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

		// Para usar el html en angular
		self.sanitize = function (item) {
			return $sce.trustAsHtml(item);
		}

		/**
		 * Previene la posibilidad de lanzar más de un elemento
		 */
		self.isContainerFull = function (parent) {
			return parent().length < self.maximumElements;
		};


		/**
		 * Devuelve los estilos según el elemento
		 */
		self.getItemsContainerStyles = function () {
			var styles = '';

			if(opt.hasOwnProperty('itemsWidth')) styles += "width: " + opt.itemsWidth + ";";

			return styles;
		}


		/**
		 * Devuelve los estilos según el elemento
		 */
		self.getItemsStyles = function (item) {
			var styles = '';

			if(opt.hasOwnProperty('itemsPerRow')){
				styles += "width: " + (98 / opt.itemsPerRow) + "%;";
			} 

			if(opt.hasOwnProperty('itemCustomStyles')) styles += opt.itemCustomStyles;
     		if(item.hasOwnProperty('style')) styles += item.style;

			return styles;
		}


		self.getDroppedStyles = function () {
			var styles = '';

			if(!self.preserveText()) styles += "color: transparent;";
			// agrega solo el tamaño de la fuente de los estilos personalizados (debe estar la propiedad font-size al final de la cadena)
			if(opt.hasOwnProperty('customStyles')){
				if(/font-size/.test(opt.customStyles)) styles += 'font-size:'+ opt.customStyles.substring(opt.customStyles.length - 5,opt.customStyles.length);
			};

			return styles;
		}

		/**
		 * Devuelve los estilos según el elemento
		 */
		self.getTargetsStyles = function (item) {
			var styles = '';

			if(opt.hasOwnProperty('borderColor')) styles += "box-shadow: 0px 0px 0px 3px " + opt.borderColor + ";";
			styles += 'width: ' + item.w + '%;';
			styles += 'height: ' + item.h + '%;';
			styles += 'top: ' + item.t + '%;';
			styles += 'left: ' + item.l + '%;';
			if(item.hasOwnProperty('z')) styles += 'z-index: ' + item.z + ';';

			// estilos personalizados
			if(opt.hasOwnProperty('customStyles')) styles += opt.customStyles;

			return styles;
		}


		/**
		 * Función que se ejecuta cuando se suelta el elemento y hace toda la funcionalidad
		 */
		self.verifyAnswer = function (arg) {
			var item = arg.item,
				parent = arg.targetParent;
				console.log(parent._acept);
			// Si es el mismo elemento inicial, salimos de la función
			if(arg.sourceParent === arg.targetParent) return;

			// Si cae en el mismo elemento, es correcto
			if(parent._id === item._id || (parent._acept!= false && parent._acept.indexOf(item.text) > -1)){
				// RESPUESTA CORRECTA
				self.rightAnswers++;
				self.rightAnswer(item);
				console.log(arg);

				// Si se definió una función cuando la respuesta es correcta, se corre
				if(typeof opt.rightAnswerCallback !== "undefined" ) opt.rightAnswerCallback(item);
			} else {
				// RESPUESTA INCORRECTA
				self.wrongAnswer(item);
				arg.cancelDrop = true;
			}

			// Reducimos en 1 las posibilidades
			chances--;
			// La actividad termina cuando el número de posibilidades se termina
			if(chances === 0 || (self.rightAnswers === self.targetslength)) {
				// Si el número de respuestas correctas es mayor o igual al requerido inicialmente
				if(self.rightAnswers >= minRightAnswers) {
					self.success(true); // Trigger de éxito
					$rootScope.isNextEnabled = true;
					if (typeof opt.successCallback !== "undefined") opt.successCallback(); // Se llama la función de éxito, definida por el desarrollador
				} else {
					// Trigger de fracaso
					self.failure(true);
				}
			}
		};
	};

	/**
	 * Inicializa la instancia del ViewModel creado con puzzle4Activity.create
	 *
	 * @param {object} instance Intancia del VM de knockout
	 */
	puzzle4Activity.run = function (instance) {
		ko.cleanNode($('#main-container')[0]);
		ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
		ko.applyBindings(instance, $('#main-container')[0]);
	};

	return puzzle4Activity;

});

lizPuzzle4.directive('puzzle4', function  (puzzle4Activity) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			description: '@',
			titletop: '@',
			audio:'@',
		},
		templateUrl: '../views/activities/puzzle4.html',
		link: function postLink(scope, element, attrs) {
			// Añadimos el audio a options
			scope.options.audio = typeof scope.audio !== "undefined" ? scope.audio : false;

			// Corremos la aplicación
			puzzle4Activity.run(puzzle4Activity.create(scope.options));
		}
	}; 
});


