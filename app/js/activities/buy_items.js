var lizBuyItems = angular.module('lizBuyItems', []);

// Knockout Pairs Factory
lizBuyItems.factory('buyItemsActivity', function ($rootScope) {

	var buyItemsActivity = {};

	/**
	 * Crea el ViewModel
	 */
	buyItemsActivity.create = function (options) {
		return new buyItemsActivity._ViewModel(options);
	}

	/**
	 * Genera el ViewModel de las parejas con sus funcionalidades
	 *
	 * Recibe un objeto con las siguientes propiedades
	 *
	 */
	buyItemsActivity._ViewModel = function (opt) {
		var self = this,
			rightAnswers = 0, // Contador
			total = 0, // Suma total de los productos
			chances = opt.chances; // Posibilidades de equivocarse

		self.products = ko.observableArray(opt.products); // productos
		self.showTotal = ko.observable(false); // activa el cuadro de texto de total
		self.total = ko.observable(''); // cuadro de texto con el total
		self.money = ko.observableArray(opt.money); // productos

		// Monedas
		self.coins = ko.observableArray([
			{
				src: 'coin_50',
				alt: "moneda de 50 pesos",
				title: "Banco de la Republica [Fotografía] (2013). Obtenido de http://www.banrep.gov.co/es/monedas/2140",
				value: 50
			},
			{
				src: 'coin_100',
				alt: "moneda de 100 pesos",
				title: "Banco de la Republica [Fotografía] (2013). Obtenido de http://www.banrep.gov.co/es/node/32360",
				value: 100
			},
			{
				src: 'coin_200',
				alt: "moneda de 200 pesos",
				title: "Banco de la Republica [Fotografía] (2013). Obtenido de http://www.banrep.gov.co/es/node/32361",
				value: 200
			},
			{
				src: 'coin_500',
				alt: "moneda de 500 pesos",
				title: "Banco de la Republica [Fotografía] (2013). Obtenido de http://www.banrep.gov.co/es/node/32363",
				value: 500
			},
		]);

		// Billetes
		self.bills = ko.observableArray([
			{
				src: "bill_1000",
				alt: "billete de 1000 pesos",
				title: "Banco de la Republica [Fotografía] (2013). Obtenido de: http://www.banrep.gov.co/es/contenidos/page/billete-1000-pesos",
				value: 1000
			},
			{
				src: "bill_2000",
				alt: "billete de 2000 pesos",
				title: "Banco de la Republica [Fotografía] (2013). Obtenido de: http://www.banrep.gov.co/es/contenidos/page/billete-2000-pesos",
				value: 2000
			},
			{
				src: "bill_5000",
				alt: "billete de 5000 pesos",
				title: "Banco de la Republica [Fotografía] (2013). Obtenido de: http://www.banrep.gov.co/es/contenidos/page/billete-5000-pesos",
				value: 5000
			}
		]);

		if (opt.money){

			self.bills = self.money;
			self.coins = false
		}

		// Añadimos a cada uno de los productos un observableArray para ir guardando los productos y 
		// una propiedad computed
		ko.utils.arrayForEach(self.products(), function(product){
			total += product.price;

			product.priceSum = ko.observableArray();
			product.priceSum.max = product.price; // Precio máximo

			product.priceSum.counter = ko.computed({
				read: function() {
					var total = 0;

					this.priceSum().forEach(function(item){
						total += item.value;
					});

					return total;
				},
				owner: product
			});
		});

		self.audio = ko.observable(opt.audio); // audio
		self.resources = $rootScope.resources; // Carpeta de recursos desde angular

		self.rightAnswers = 0; // Inicializamos el número de respuestas buenas a 0

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
		 * Obtiene los estilos de los productos.
		 */
		self.getProductStyles = function () {
			var styles = '';
			styles += 'width: ' + (100 / self.products().length) + '%;';

			return styles;
		};


		/**
		 * Verifica los elementos cada vez que se sueltan.
		 */
		self.verifyAnswer = function (arg) {
			var parent = arg.targetParent,
				item = arg.item;

			if(parent.max < parent.counter() + item.value) {
				// Respuesta incorrecta
				arg.cancelDrop = true;
				self.wrongAnswer(Math.random());
				chances--;
			} 

			// Si es igual, suma la respuesta correcta
			if(parent.max === parent.counter() + item.value) {
				self.rightAnswer(Math.random());
				rightAnswers++;
			}

			// Muestra el cuadro de texto para el total
			if(rightAnswers === self.products().length) {
				self.showTotal(true);
			}

			if(chances === 0) {
				// termina la actividad con fracaso
				self.failure(true);
			}
		};


		/**
		 * Verifica el total del cuadro.
		 */
		self.verifyTotal = function () {
			if(parseInt(self.total()) === total) {
				$rootScope.isNextEnabled = true; // activa la siguiente actividad
				self.success(true);
			} else {
				self.failure(true);
			}
		};


	};

	/**
	 * Inicializa la instancia del ViewModel creado con buyItemsActivity.create
	 *
	 * @param {object} instance Intancia del VM de knockout
	 */
	buyItemsActivity.run = function (instance) {
		ko.cleanNode($('#main-container')[0]);
		ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
		ko.applyBindings(instance, $('#main-container')[0]);
	};

	return buyItemsActivity;

});

lizBuyItems.directive('buyItems', function  (buyItemsActivity) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			description: '@',
			instruction: '@',
			audio: '@',
			customClass: '@'
		},
		templateUrl: '../views/activities/buy_items.html',
		link: function postLink(scope, element, attrs) {
			// Añadimos el audio a options
			scope.options.audio = typeof scope.audio !== "undefined" ? scope.audio : false;

			// Corremos la aplicación
			var vm = buyItemsActivity.create(scope.options);
			buyItemsActivity.run(vm);
		}
	}; 
});
