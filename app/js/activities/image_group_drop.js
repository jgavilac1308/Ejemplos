var lizImageGroupDrop = angular.module('lizImageGroupDrop', ['factories']);

// Knockout Pairs Factory
lizImageGroupDrop.factory('imageGroupDropActivity', function ($rootScope, shuffleArrayFactory) {

	var imageGroupDropActivity = {};

	/**
	 * Crea el ViewModel
	 */
	imageGroupDropActivity.create = function (options) {
		return new imageGroupDropActivity._ViewModel(options);
	}

	/**
	 * Genera el ViewModel de las parejas con sus funcionalidades
	 */
	imageGroupDropActivity._ViewModel = function (opt) {
		var self = this,
			newGroup = false,
			totalItems = 0, // Número total de elementos
			chances = opt.chances,
			minRightAnswers = opt.minRightAnswers,
			rightAnswers = 0;

		function Group (opt) {
			this.sortable = ko.observableArray();
			this.sortable.id = (Math.random() + 1).toString(36).substring(7); // Creamos una cadena aleatoria

			// Medidas
			this.t = opt.t;
			this.l = opt.l;
			this.w = opt.w;
			this.h = opt.h;
		}

		// Imagen de fondo del conjunto
		self.bg = {
			src: opt.src,
			alt: opt.alt
		};

		// textos
		self.topText = opt.topText;
		self.bottomText = opt.bottomText;

		// Formación de grupos
		self.groups = ko.observableArray(); // Observable de grupos
		self.stack = ko.observableArray(); // pila de elementos

		opt.groups.forEach(function(group){
			newGroup = new Group(group);

			self.groups.push(newGroup);

			// añadimos cada item a la pila, añadiendole la referencia a su padre (grupo)
			group.items.forEach(function(item){
				item.id = newGroup.sortable.id;
				self.stack.push(item);
			});
		});

		

		// barajamos la pila
		shuffleArrayFactory.run(self.stack());

		totalItems = self.stack().length;

		// audio
		self.audio = ko.observable(opt.audio);

		// Carpeta de recursos desde angular
		self.resources = $rootScope.resources;

		// Calificaciones
		self.rightAnswer = ko.observable();
		self.wrongAnswer = ko.observable();
		self.failure = ko.observable(false);
		self.success = ko.observable(false);

		/**
		 * Reproduce el audio de la instrucción.
		 */
		self.playAudio = function () {
			$('#audio-instruction')[0].play();
		};


		/**
		 * Devuelve los estilos de los grupos
		 */
		self.getGroupStyles = function (group) {
			var styles = '';

			styles += "top: " + group.t + "%;";
			styles += "left: " + group.l + "%;";
			styles += "width: " + group.w + "%;";
			styles += "height: " + group.h + "%;";
			
			return styles;
		};

		/**
		 * Devuelve los estilos de los grupos
		 */
		self.getItemStyles = function (item) {
			var styles = '';

			styles += "top: " + item.t + "%;";
			styles += "left: " + item.l + "%;";
			
			return styles;
		};

		/**
		 * Verifica la respuesta cada vez que se suelta el elemento.
		 */
		self.verifyAnswer = function (arg) {
			var parent = arg.targetParent,
				item = arg.item;

			if(arg.sourceParent === parent) return;

			// Respuesta correcta
			if(item.id === parent.id) {
				self.rightAnswer(Math.random());
				rightAnswers++;
			} else {
				self.wrongAnswer(Math.random());
				arg.cancelDrop = true;
			}

			chances--;

			if (rightAnswers === totalItems || chances === 0) {
				if (rightAnswers >= minRightAnswers) {
					$rootScope.isNextEnabled = true;
					self.success(true);
				} else {
					self.failure(true);
				}
				// éxito
			} 
		};



	};

	/**
	 * Inicializa la instancia del ViewModel creado con imageGroupDropActivity.create
	 *
	 * @param {object} instance Intancia del VM de knockout
	 */
	imageGroupDropActivity.run = function (instance) {
		ko.cleanNode($('#main-container')[0]);
		ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
		ko.applyBindings(instance, $('#main-container')[0]);
	};

	return imageGroupDropActivity;

});

lizImageGroupDrop.directive('imageGroupDrop', function  (imageGroupDropActivity) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			options: '=',
			description: '@',
			audio:'@'
		},
		templateUrl: '../views/activities/image_group_drop.html',
		link: function postLink(scope, element, attrs) {
			// Añadimos el audio a options
			scope.options.audio = scope.hasOwnProperty('audio') ? scope.audio : false;

			// Corremos la aplicación
			var vm = imageGroupDropActivity.create(scope.options);
			imageGroupDropActivity.run(vm);
		}
	}; 
});
