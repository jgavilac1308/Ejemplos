var lizThousandNumbers = angular.module('lizThousandNumbers', ['factories']);

lizThousandNumbers.directive('thousandNumbers', function  (shuffleArrayFactory) {
	return {
		restrict: 'E',
		scope: {
			description: '@',
			audio: '@'
		},
		templateUrl: '../views/activities/thousand_numbers.html',
		link: function postLink(scope, element, attrs) {

			scope.selectedRange = 0; // Rango seleccionado
			scope.numberMatrix = []; // array multidimensional para la tabla
			scope.numberText = ''; // número convertido a texto
			scope.chances = 20; // Debe hacer al menos este número de intentos para pasar
			
			scope.rangesLeft = [
				[100, 199],
				[200, 299],
				[300, 399],
				[400, 499]
			];
			
			scope.rangesRight = [
				[500, 599],
				[600, 699],
				[700, 799],
				[800, 899],
				[900, 999]
			];

			/**
			 * Define el rango seleccionado
			 */
			scope.selectRange = function (range) {
				scope.numberMatrix.length = 0; // Se vacía el array
				scope.selectedRange = range; // seleccionamos el rango

				var temp = [],
					arrayIndex = 0,
					counter = 0;

				// Llenamos el array con los números
				scope.numberMatrix.push([]); // Añadimos el primer array
				temp = scope.numberMatrix[arrayIndex];

				for(var i = range[0]; i <= range[1]; i++){
					temp.push(i);
					counter++;

					// Cada 10, cambiamos de array. Además, si es el último número, no añadimos un nuevo array
					if(counter === 10 && (i !== range[1])){
						counter = 0;	
						arrayIndex++;

						// Añadimos el array nuevo y cambiamos el índice
						scope.numberMatrix.push([]); // Añadimos el primer array
						temp = scope.numberMatrix[arrayIndex];
					}
				}
			};


			/**
			 * Función pricipal. Recibe un número, define el texto y lo reproduce
			 */
			scope.chooseNumber = function (number) {
				var result = numberToWords(number);

				scope.numberText = result.text; // Muestra el texto
				//playAudio(result.intervals); // Reproduce el audio

				scope.chances--;

				// Reducimos las posibilidades, para llegar al final de la actividad
				if(scope.chances === 0){
					scope.$root.isNextEnabled = true;
					scope.$root.beforeGoNext = function () {
						scope.success = true;
						return true;
					}
				}
			};


			// =============================================================================
			// LÓGICA DE SELECCIÓN DE NÚMERO, CAMBIO A PALABRAS Y REPRODUCCIÓN DE SONIDO
			// =============================================================================
			// Intérvalos 
			var intervals = {
				"uno": [0, 0.4],
				"dos": [0.8, 1.4],
				"tres": [1.8, 2.3],
				"cuatro": [2.8, 3.3],
				"cinco": [3.7, 4.3],
				"seis": [4.8, 5.4],
				"siete": [5.8, 6.4],
				"ocho": [6.9, 7.3],
				"nueve": [7.8, 8.3],
				"diez": [8.6, 9.4],
				"once": [9.8, 10.4],
				"doce": [10.8, 11.3],
				"trece": [11.7, 12.5],
				"catorce": [12.7, 13.5],
				"quince": [13.7, 14.5],
				"dieci": [14.6, 15.17],
				"veinte": [15.7, 16.4],
				"veinti": [16.6, 17.25],
				"treinta": [17.6, 18.3],
				"cuarenta": [18.7, 19.5],
				"cincuenta": [19.7, 20.5],
				"sesenta": [20.8, 21.6],
				"setenta": [21.8, 22.8],
				"ochenta": [23.2, 23.8],
				"noventa": [24.1, 24.8],
				"y": [25.2, 25.5],
				"cien": [25.8, 26.5],
				"ciento": [26.9, 27.6],
				"cientos": [28, 28.8],
				"quinientos": [29, 29.9],
				"setecientos": [30.2, 31.4],
				"novecientos": [31.6, 32.7]
			};

			/**
			 * Convierte un número en palabras.
			 *
			 * Para hacerlo, la función va filtrando el número desde la mayor cifra (centenas, decenas... hasta unidades)
			 * después de cada filtro, se elimina la última cifra para poder pasar el número por siguiente filtro hasta
			 * llegar a las unidades.
			 *
			 * Rango actual: 1 al 999
			 *
			 * @param {integer} number número a convertir
			 * @return {Object} con 2 propiedades: text y intervals
			 *
			 */
			function numberToWords(number) {
				var res = '', // Número en palabras
					intervalsArray = []; // Interválo para reproducir

				number = parseInt(number);

				var units = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
				var tens = ['', '', 'veinti', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];

				// =============================
				// Centenas
				// =============================
				var c = Math.floor(number / 100);

				// Cien
				if(number === 100){ 
					res += 'cien'; 
					intervalsArray.push(intervals.cien);
				} 
				else if(c > 0){
					if(c === 1){ 
						res += 'ciento '; 
						intervalsArray.push(intervals.ciento);
					} else{
						// Casos especiales
						if(c === 5){ res += 'quinientos'; intervalsArray.push(intervals.quinientos); }
						else if(c === 7){ res += 'setecientos'; intervalsArray.push(intervals.setecientos); }
						else if(c === 9){ res += 'novecientos'; intervalsArray.push(intervals.novecientos); }
						else { 
							// Para el resto de centenas, se añaden las unidades al inicio
							res += units[c] + 'cientos';
							intervalsArray.push(intervals[ units[c] ]);
							intervalsArray.push(intervals.cientos);
						} 

						if(number % 100 !== 0){ res += ' ' } // Si el número no es redondo, añadimos un espacio
					}

					number = number - (c * 100); // Eliminamos las centenas
				}

				// =============================
				// Decenas
				// =============================
				var t = Math.floor(number / 10);

				if(number === 20) {
					res += 'veinte';
					intervalsArray.push(intervals.veinte);
				} else if(t >= 2 && t <= 9){
					res += tens[t]; // Añadimos la cadena de decenas
					intervalsArray.push(intervals[ tens[t] ]);

					// Agregamos el " y " si es mayor a 2
					if(t > 2 && number % 10 !== 0){ 
						res += ' y '; 
						intervalsArray.push(intervals.y);
					} 

					number = number % 10; // Eliminamos las decenas del número
				}

				// =============================
				// Unidades y números hasta el veinte
				// =============================
				if(number < 10){
					res += units[number];
					intervalsArray.push(intervals[ units[number] ]);
				} else if(number >= 10 && number < 20) {
					// del diez al quince
					if(number === 10) { res += 'diez'; intervalsArray.push(intervals.diez) };
					if(number === 11) { res += 'once'; intervalsArray.push(intervals.once) };
					if(number === 12) { res += 'doce'; intervalsArray.push(intervals.doce) };
					if(number === 13) { res += 'trece'; intervalsArray.push(intervals.trece) };
					if(number === 14) { res += 'catorce'; intervalsArray.push(intervals.catorce) };
					if(number === 15) { res += 'quince'; intervalsArray.push(intervals.quince) };

					// Deiciseis en adelante
					if(number > 15 && number < 20){ 
						res += 'dieci' + units[number % 10]; 
						intervalsArray.push(intervals.dieci);
						intervalsArray.push(intervals[ units[number % 10] ]);
					} 
				} 

				return {
					text: res,
					intervals: intervalsArray
				};

			}; // numberToWords()

			/**
			 * Reproduce los intérvalos especificados uno tras otro.
			 * Para ello, usa una función recursiva basada en un array
			 *
			 * @param {array} intervals Matrix de 2 dimensiones. Cada fila tiene tiempo de inicio y final del intervalo
			 */
			function playAudio(intervals) {
				if(intervals.length === 0) return; // Termina la función recursiva

				var audio = $('#audio-numbers')[0]; // Recuperamos el audio

				var actualInterval = intervals.shift(),
					starts = actualInterval[0],
					ends = actualInterval[1];

				audio.currentTime = starts;
				audio.play();

				var interv = setInterval(function() {
					if (audio.currentTime > ends) {
						audio.pause();
						clearInterval(interv);

						if(intervals.length !== 0) playAudio(intervals);
					}
				}, 10);
			}

		}
	}; 
});
