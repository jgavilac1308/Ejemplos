var lizPuzzle3 = angular.module('lizPuzzle3', []);

// Knockout Puzzle3 Factory
lizPuzzle3.factory('puzzle3Activity', function ($rootScope, shuffleArrayFactory) {

	var puzzle3Activity = {};

	/**
	 * Crea el ViewModel
	 */
	puzzle3Activity.create = function (options) {
		return new puzzle3Activity._ViewModel(options);
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
     * @param {integer}		options.chances				Número de posibilidades que tiene el usuario de hacer la actividad
     * @param {integer}		options.minRightAnswers		Número mínimo de respuestas correctas
     * @param {boolean}		options.randomItems			Define si los elementos deben ser puestos en forma aleatoria
     * @param {boolean}		options.randomTargets		Define si los objetivos debe ser puestos en forma aleatoria
     * @param {function}	options.successCallback		Función que se llama cuando se termina la actividad de forma satisfactoria
     * @param {function}	options.rightAnswerCallback	Función que se llama cuando la respuesta es correcta
     *
      */
    puzzle3Activity._ViewModel = function (options) {
        var self = this,
			coordinates = [],
			rows = options.rows,
			cols = options.cols,
			cells = rows * cols;

		/**
		 * Clase para los sortables
		 */
		self.Sortable = function (row, col) {
			this.row = row;
			this.col = col;
			this.puzzleBlock = ko.observableArray([ { row: i, col: j } ]);
			this.puzzleBlock._id = 'sortable';
		}

		/**
		 * Clase para los sortables
		 */
		self.Target = function (row, col) {
			this.row = row;
			this.col = col;
			this.puzzleBlock = ko.observableArray([]);

			// Necesarios para la comparación en beforeMove
			this.puzzleBlock.row = row;
			this.puzzleBlock.col = col;
		}

        // Inicializa las opciones
		var minRightAnswers = options.minRightAnswers ? options.minRightAnswers : cells,
			chances = options.chances ? options.chances : cells;
			
		// audio
		self.audio = ko.observable(options.audio);
		self.finalText = options.finalText;
		self.finalAudio = options.finalAudio;
		self.finalDelay = options.finalDelay;

		// Constructor para las celdas
		self.items = ko.observableArray();
		self.targets = ko.observableArray();
		self.image = options.image;

		// Creamos los objetos para definir su posición en cada fila
		for(var i = 0; i < rows; i++){
			for(var j = 0; j < cols; j++){
				// Las propiedades son fila y columna, usadas para definir posteriormente los estilos
				self.items.push(new self.Sortable(i, j));
				self.targets.push(new self.Target(i, j));

				// almacenamos las coordenadas en un array que después desorganizaremos
				coordinates.push({ row: i, col: j });
			}
		}

		// Organizamos aleatoriamente el array
		coordinates = shuffleArrayFactory.run(coordinates);

		// Procedemos a cambiar las coordenadas
		for(var i = 0; i < self.items().length; i++){
			self.items()[i].row = coordinates[i].row;
			self.items()[i].col = coordinates[i].col;
		}


        self.rightAnswers = 0; // Inicializamos el número de respuestas buenas a 0
        self.maximumElements = 1; // Número máximo de elementos

        self.resources = $rootScope.resources;

		// Triggers que se activan cuando la respuesta es correcta/incorrecta
        self.rightAnswer = ko.observable();
        self.wrongAnswer = ko.observable();

		// Triggers cuando la actividad termina satisfactoria y/o insatisfactoriamente
        self.failure = ko.observable(false);
        self.success = ko.observable(false);
        self.showFinalText = ko.observable(false);

		/**
		 * Previene la posibilidad de lanzar más de un elemento
		 */
        self.isContainerFull = function (parent) {
            return parent().length < self.maximumElements;
        };

        /**
         * Devuelve los estilos del sortable
         */
        self.getSortableStyles = function (sortable) {
        	var styles = '';

			// El tamaño se divide según el número de columnas y filas
        	styles += 'width: ' + (100 / cols) + '%;';
        	styles += 'height: ' + (100 / rows) + '%;';

			// Top y Left
        	styles += 'left: ' + (sortable.col * (100 / cols)) + '%;';
        	styles += 'top: ' + (sortable.row * (100 / rows)) + '%;';

        	return styles;
        }

        /**
		 * Reproduce el audio de la instrucción.
		 */
		self.playAudio = function () {
			$('#audio-instruction')[0].play();
		};

        /**
         * Devuelve los estilos según el elemento
         */
        self.getItemStyles = function (item) {
        	var styles = '';

        	styles += 'background: url(../' + self.resources + '/' + self.image  + '.png) no-repeat;'; // Recurso
            styles += 'background-size: ' + (100 * cols) + '% ' + (100 * rows) + '%;'; // porcentajes según el número de elementos
        	
            //styles += 'background-position: ' + (( item.col + 1 ) * (100 / cols)) + '% ' + (( item.row + 1 ) * (100 / rows)) + '%;';
        	styles += 'background-position: ';
        	console.log(item);
			if(item.col === 0){
				styles += '0% ';
			} else {
				styles += (item.col * (100 / (cols - 1) )) + '% ';
			}

			if(item.row === 0){
				styles += '0%;';
			} else {
				styles += (item.row * (100 / (rows - 1) )) + '%;';
			}
        	
        	return styles;
        }

		/**
		 * Función que se ejecuta cuando se suelta el elemento y hace toda la funcionalidad
		 */
		self.verifyAnswer = function (arg) {
			var item = arg.item,
				parent = arg.targetParent;

			// Si es el mismo elemento inicial, salimos de la función
			if(arg.sourceParent === parent) return;

			// Si se trata de los elementos iniciales, que vuelvan al padre
			if(parent._id === 'sortable'){
				arg.cancelDrop = true;
				return;
			}

			// Si es target, comparamos los valores
			if (parent.row === item.row && parent.col === item.col) {
				
				// RESPUESTA CORRECTA
				self.rightAnswers++;
				self.rightAnswer(item);

				// Si se definió una función cuando la respuesta es correcta, se corre
				if(typeof options.rightAnswerCallback !== "undefined" ) options.rightAnswerCallback(item);
				
			} else {

				// RESPUESTA INCORRECTA
				self.wrongAnswer(item);
				arg.cancelDrop = true;

			}

			// Reducimos en 1 las posibilidades
			chances--;

			// La actividad termina cuando el número de posibilidades se termina
			if(chances === 0 || self.rightAnswers === self.items.length) {
				// Si el número de respuestas correctas es mayor o igual al requerido inicialmente
				if(self.finalText || self.finalAudio){


        				self.showFinalText(true);
        				$('#audio-final')[0].play();
						setTimeout(function() {
                			if(self.rightAnswers >= minRightAnswers) {

								// Trigger de éxito
								self.success(true);
								$rootScope.isNextEnabled = true;


								// Se llama la función de éxito, definida por el desarrollador
								if (typeof options.successCallback !== "undefined") options.successCallback();

							} else {

								// Trigger de fracaso
								self.failure(true);

							}

            			}, self.finalDelay);
				
				}else{

					if(self.rightAnswers >= minRightAnswers) {

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
			}
		};
    };

	/**
	 * Inicializa la instancia del ViewModel creado con puzzle3Activity.create
	 *
	 * @param {object} instance Intancia del VM de knockout
	 */
    puzzle3Activity.run = function (instance) {
    	ko.cleanNode($('#main-container')[0]);
		ko.bindingHandlers.sortable.beforeMove = instance.verifyAnswer;
		ko.applyBindings(instance, $('#main-container')[0]);
    };

	return puzzle3Activity;
    
});


lizPuzzle3.directive('puzzle3', function  (puzzle3Activity) {
    return {
        restrict: 'E',
		scope: {
			options: '=',
			description: '@',
			audio: '@'
		},
        templateUrl: '../views/activities/puzzle3.html',
		link: function postLink(scope, element, attrs) {

			// Añadimos el audio a options
			scope.options.audio = typeof scope.audio !== "undefined" ? scope.audio : false;
			// Corremos la aplicación
			puzzle3Activity.run(puzzle3Activity.create(scope.options));
        }
    }; 
});


