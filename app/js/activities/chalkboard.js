var lizChalkboard = angular.module('lizChalkboard', []);

lizChalkboard.directive('chalkboard', function  () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			audio: '@',
			description: '@'
		},
		templateUrl: '../views/activities/chalkboard.html',
		link: function postLink(scope, element, attrs) {

			var opt = scope.options,
				rightAnswers = 0, // Preguntas correctas
				questions = opt.questions, // Preguntas por modo
				completedRanges = 0, // Número completado de rangos
				minRightAnswers = opt.minRightAnswers, // Preguntas mínimas para pasar
				chances = opt.chances;

			// Constantes para las operaciones
			var oprs = {
				addition: {
					sign: '+'
				},
				subtraction: {
					sign: '-'
				},
				multiplication: {
					sign: 'x'
				},
				division: {
					sign: '/'
				}
			};

			scope.ranges = opt.ranges; // Rangos u opciones de dificultad
			scope.selectedOpr = oprs[opt.operation]; // Operación seleccionada al inicio
			scope.selectedRange = false; // Rango a seleccionar

			// Números y total
			scope.number1 = 0;
			scope.number2 = 0;
			scope.total = 0;

			// Calificaciones 
			scope.rightAnswer = false;
			scope.wrongAnswer = false;
			scope.success = false;
			scope.failure = false;

			// Input
			scope._total = '';

			// Cada vez que cambia el rango, se genera la nueva operación
			scope.$watch('selectedRange', function (val) {
				if(val){
					scope.generateOperation();
				}
			});

			/**
			 * Verifica el campo de texto con el número total
			 */
			scope.verify = function () {
				if(scope._total === '') return; 

				// Si no es un número, borramos el último caractér
				if(!scope._total.match(/^\d+$/)){
					scope._total = scope._total.slice(0, -1);
					return;
				}		

				// Si se ha llenado el input con los dígitos necesarios
				if(scope._total.length === scope.total.toString().length){
					if(parseInt(scope._total) === scope.total) {
						// Respuesta Correcta
						scope.rightAnswer = Math.random(); // Disparador de respuesta

						rightAnswers++;
						chances = opt.chances;
						scope._total = ''; // Reinicia el input
						scope.generateOperation(); // Genera la siguiente operación
						questions--; // reducimos las preguntas

					} else {
						// Respuesta Incorrecta
						scope.wrongAnswer = Math.random(); // Disparador de respuesta
						scope._total = ''; // Reinicia el input

						chances--; // Reduce las posibilidades

						// Si se acaban las oportunidades
						if(chances === 0){
							scope.generateOperation(); // Genera la siguiente operación
							chances = opt.chances;
							questions--; // reducimos las preguntas
						}
					}
				}

				// Si no hay más preguntas
				if(questions === 0){
					questions = opt.questions; // Reiniciamos las preguntas
					completedRanges++; // Aumeta el número de rangos completados

					scope.selectedRange.completed = true; // Se añade esta propiedad para deshabilitar
					scope.selectedRange = false; // Reinicia
				}

				// Fin del juego
				if(scope.ranges.length === completedRanges){
					if(rightAnswers >= minRightAnswers){
						scope.$root.isNextEnabled = true;
						scope.success = true;
					} else {
						scope.failure = true;
					}
				}
				
			};

			/**
			 * Genera el siguiente número
			 */
			scope.generateOperation = function () {

				var min = scope.selectedRange.range[0];
				var max = scope.selectedRange.range[1];


				// Suma
				if(opt.operation === "addition"){
					scope.number1 = Math.floor( Math.random() * (max - min) + min	);
					scope.number2 = Math.floor( Math.random() * (max - min) + min	);

					scope.total = scope.number1 + scope.number2;
				}

				// Resta
				if(opt.operation === "subtraction"){
					// Nos aseguramos que el primero número siempre sea mayor al segundo
					do{
						scope.number1 = Math.floor( Math.random() * (max - min) + min	);
						scope.number2 = Math.floor( Math.random() * (max - min) + min	);
					} while(scope.number1 < scope.number2);

					scope.total = scope.number1 - scope.number2;
				}

				// Multiplicación
				if(opt.operation === "multiplication"){
					// Para la multiplicación, hay que usar 2 rangos distintos
					var r = scope.selectedRange.range; // Alias

					// Se toman los primeros dos elementos de range
					scope.number1 = Math.floor( Math.random() * (r[1] - r[0]) + r[0]	);

					// Se toman los últimos dos elementos de range
					scope.number2 = Math.floor( Math.random() * (r[2] - r[3]) + r[3]	);

					scope.total = scope.number1 * scope.number2;
				}

				// Division
				if(opt.operation === "division"){
					// Nos aseguramos que el segundo número no sea 0, y que se pueda dividir
					// sin decimales
					do{
						scope.number1 = Math.floor( Math.random() * (max - min) + min	);
						scope.number2 = Math.floor( Math.random() * (max - min) + min	);
					} while(scope.number1 < scope.number2 || scope.number1 % scope.number2 !== 0 || scope.number1 / scope.number2 === 1);

					scope.total = scope.number1 / scope.number2;
				}

			};

			scope.disableInput = function (range) {
				return scope.selectedRange || range.completed;
			};


		}
	}; 
});
