var lizAbacus = angular.module('lizAbacus', ['factories']);

lizAbacus.directive('abacus', function  (shuffleArrayFactory) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			baseDescription: '@',
			baseAudio: '@',
			inputDescription: '@',
			inputAudio: '@',
			formDescription: '@',
			formAudio: '@'
		},
		templateUrl: '../views/activities/abacus.html',
		link: function (scope, element, attrs) {
			var opt = scope.options, // alias de options
				columnTemp = {}, // Variable temporal para las columnas
				wrongAnswers = 0, // Número de respuestas incorrectas. Necesarias para activar failure
				minRightAnswers = opt.minRightAnswers;

			// Modos
			scope.FORM_MODE = 1,
			scope.INPUT_MODE = 2;
			scope.formChances = opt.chances; // Chances for FORM_MODE
			scope.inputChances = opt.chances; // Chances for INPUT_MODE

			// Calificaciones
			scope.rightAnswer = false;
			scope.wrongAnswer = false;
			scope.success = false;
			scope.failure = false;

			scope.description = scope.baseDescription; // Damos a description el valor base
			scope.mode = 0; // Modo seleccionado
			scope.userNumber = ''; // número ingresado por el usuario
			scope.abacusNumber = 0; // número a formar por el ábaco
			scope.audioMode = ''; // Audio a reproducir

			scope.$watch('mode', function (mode) {
				if(mode === 0) scope.audioMode = 'base';
				if(mode === 1) scope.audioMode = 'form';
				if(mode === 2) scope.audioMode = 'input';
			});

			scope.columns = []; // Array de columnas
			var columnNames = ['Uni', 'Dec', 'Cen', 'UMil', 'DMil'];

			// Constructor de columns
			for(var i=0; i < opt.numCols; i++){
				columnTemp = {
					name: columnNames[i], // Nombre de la columna
					ballText: Math.pow(10, i), // texto en la bola
					rings: [] // Array para los aros en cada columna
				};
				scope.columns.unshift(columnTemp); 
			}

			// ===================================================
			// Interfaz
			// ===================================================
			/**
			 * Selecciona el modo de trabajo
			 */
			scope.selectMode = function (mode) {
				scope.mode = mode;
				wrongAnswers = 0; // Reinicia las preguntas incorrectas

				// Cambia la descripción según el modo
				if(scope.mode === scope.FORM_MODE) scope.description = scope.formDescription;
				if(scope.mode === scope.INPUT_MODE) scope.description = scope.inputDescription; 

				// Corre el modo
				scope.run();
			};

			/**
			 * Función principal. Verifica la actividad según el modo
			 */
			scope.verify = function () {
				// FORM_MODE
				if(scope.mode === scope.FORM_MODE) {
					// recuperamos el número desde las columnas del ábaco
					var num = '';
					scope.columns.forEach(function (col) { num += col.rings.length; });

					if(parseInt(num) === scope.abacusNumber){
						// Respuesta Correcta
						scope.rightAnswer = scope.abacusNumber;
					} else {
						// Respuesta Incorrecta
						scope.wrongAnswer = scope.abacusNumber;
						wrongAnswers++;
					}

					scope.formChances--; // Reducimos las posibilidades
					if(scope.formChances === 0) scope.mode = 0;
				}

				// INPUT_MODE
				if(scope.mode === scope.INPUT_MODE) {
					if(parseInt(scope.userNumber) === scope.abacusNumber){
						// Respuesta Correcta
						scope.rightAnswer = scope.abacusNumber;
					} else {
						// Respuesta Incorrecta
						scope.wrongAnswer = scope.abacusNumber;
						wrongAnswers++;
					}

					scope.inputChances--; // Reducimos las posibilidades
					if(scope.inputChances === 0) scope.mode = 0;
				}

				// genera el próximo intento
				scope.run();

				// Vuelve a intentarlo
				if(wrongAnswers === opt.wrongAnswers) scope.failure = true;

				// Fin de la actividad satisfactorio
				if(scope.inputChances === 0 && scope.formChances === 0){
					scope.$root.isNextEnabled = true;
					scope.success = true;
				}
			};

			/**
			 * Inicia cada actividad según el modo
			 */
			scope.run = function () {
				scope.abacusNumber = scope.generateNumber(opt.numCols); // genera el número

				if(scope.mode === scope.FORM_MODE) {
					// reinicia los anillos
					scope.columns.forEach(function (col) { col.rings.length = 0; });
				}

				if(scope.mode === scope.INPUT_MODE) {
					scope.userNumber = ''; // Reinicia el input

					// Dividimos el número en digitos. Luego, llenamos cada array de anillos
					// con el número de elementos seleccionado
					var temp = scope.abacusNumber.toString();

					for (var i=0; i < temp.length; i++) {
						scope.columns[i].rings.length = 0; // Vacía el array de anillos
						for(var j=0; j < temp[i]; j++){
							scope.columns[i].rings.push(j);
						}
					}
				}
			};

			/**
			 * Añade un anillo a la columna
			 */
			scope.addRing = function (col) {
				if(col.rings.length < 9) col.rings.push(Math.random() * 10000);
			};

			/**
			 * Remueve un anillo de la columna
			 */
			scope.removeRing = function (col) {
				if(col.rings.length && scope.mode === scope.FORM_MODE) col.rings.pop();
			};

			// ===================================================
			// Útiles
			// ===================================================
			/**
			 * Genera números aleatorios, en base a una cantidad determinada de dígitos
			 */
			scope.generateNumber = function (digits) {
				var min = Math.pow(10, digits - 1);
				var max = (min * 9);

				return Math.floor(Math.random() * max) + min;
			};

			// ===================================================
			// Solo Estilos
			// ===================================================
			/**
			 * Devuelve los estilos de las columnas
			 */
			scope.getColStyles = function () {
				var styles = '';
				styles += "width: " + (100 / scope.columns.length) + "%;";

				return styles;
			};

			/**
			 * Devuelve los estilos de los aros o bolas que van en el abaco
			 */
			scope.getBallStyles = function (index) {
				var styles = '',
					ballHeight = element.find('.abcol-ball').outerHeight(); // altura de los aros

				styles += "bottom: " + (ballHeight * index) + "px;";

				return styles;
			};

		}
	}; 
});
