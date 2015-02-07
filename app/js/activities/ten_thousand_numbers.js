var lizTenThousandNumbers = angular.module('lizTenThousandNumbers', ['factories']);

lizTenThousandNumbers.directive('tenThousandNumbers', function  (shuffleArrayFactory) {
	return {
		restrict: 'E',
		scope: {
			description: '@',
			audio: '@'
		},
		templateUrl: '../views/activities/ten_thousand_numbers.html',
		link: function (scope, element, attrs) {
			scope.numberText = ''; // número convertido a texto
			scope.chances = 10;

			scope.selectedRange = 0; // Rango seleccionado
			scope.selectedBigRange = false; // gran rango seleccionado
			scope.bigRanges = [
				[1000, 1999],
				[2000, 2999],
				[3000, 3999],
				[4000, 4999],
				[5000, 5999],
				[6000, 6999],
				[7000, 7999],
				[8000, 8999],
				[9000, 9999],
			];

			scope.numberMatrix = []; // array multidimensional para la tabla
			scope.rangesLeft = [];
			scope.rangesRight = [];

			// Calificación
			scope.success = false;

			/**
			 * Selecciona el gran rango
			 */
			scope.selectBigRange = function (range) {
				scope.selectedBigRange = range;
			};

			// cada vez que cambia, se generan los rangos de izquierda y derecha
			scope.$watch('selectedBigRange', function (val) {
				if(val) {
					scope.rangesLeft.length = 0;
					scope.rangesRight.length = 0;

					for(var i = 0; i < 5; i++) {
						scope.rangesLeft.push([
							val[0] + (100 * i),
							val[0] + (100 * (i + 1)) - 1,
						]);
					}

					for(var i = 5; i <= 9; i++) {
						scope.rangesRight.push([
							val[0] + (100 * i),
							val[0] + (100 * (i + 1)) - 1,
						]);
					}
				}
			});

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
				var res = ''; // Número en palabras

				number = parseInt(number);

				var units = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
				var tens = ['', '', 'veinti', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];

				// =============================
				// Unidades de mil
				// =============================
				var uc = Math.floor(number / 1000);

				if(uc > 0) {
					if(uc === 1) {
						res += "mil "
					} else {
						res += units[uc] + " mil ";
					}

					number = number - (uc * 1000); // Eliminamos las unidades de mil
				}

				// =============================
				// Centenas
				// =============================
				var c = Math.floor(number / 100);

				// Cien
				if(number === 100){ 
					res += 'cien'; 
				} 
				else if(c > 0){
					if(c === 1){ 
						res += 'ciento '; 
					} else{
						// Casos especiales
						if(c === 5){ res += 'quinientos';  }
						else if(c === 7){ res += 'setecientos';  }
						else if(c === 9){ res += 'novecientos';  }
						else { 
							// Para el resto de centenas, se añaden las unidades al inicio
							res += units[c] + 'cientos';
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
				} else if(t >= 2 && t <= 9){
					res += tens[t]; // Añadimos la cadena de decenas

					// Agregamos el " y " si es mayor a 2
					if(t > 2 && number % 10 !== 0){ 
						res += ' y '; 
					} 

					number = number % 10; // Eliminamos las decenas del número
				}

				// =============================
				// Unidades y números hasta el veinte
				// =============================
				if(number < 10){
					res += units[number];
				} else if(number >= 10 && number < 20) {
					// del diez al quince
					if(number === 10) { res += 'diez'; }
					if(number === 11) { res += 'once'; }
					if(number === 12) { res += 'doce'; }
					if(number === 13) { res += 'trece'; }
					if(number === 14) { res += 'catorce'; }
					if(number === 15) { res += 'quince'; }

					// Deiciseis en adelante
					if(number > 15 && number < 20){ 
						res += 'dieci' + units[number % 10]; 
					} 
				} 

				return {
					text: res
				};

			}; // numberToWords()
			

			/**
			 * Función pricipal. Recibe un número, define el texto y lo reproduce
			 */
			scope.chooseNumber = function (number) {
				var result = numberToWords(number);

				scope.numberText = result.text; // Muestra el texto
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

			console.log(
				numberToWords(1099),
				numberToWords(1199),
				numberToWords(3199)
			);


		}
	}; 
});
