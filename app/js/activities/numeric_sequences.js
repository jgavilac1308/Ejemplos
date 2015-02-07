var lizNumericSequences = angular.module('lizNumericSequences', []);

lizNumericSequences.directive('numericSequences', function  () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			description: '@',
			audio: '@'
		},
		templateUrl: '../views/activities/numeric_sequences.html',
		link: function (scope, element, attrs) {

			var opt = scope.options,
				rightAnswers = 0, // Contador de preguntas buenas
				minRightAnswers = opt.minRightAnswers,
				chances = 0, // Contador de posibilidades
				sequences = opt.sequences;

			scope.sequences = [];

			// Disparadores para las preguntas buenas/malas
			scope.rightAnswer = false;
			scope.wrongAnswer = false;

			scope.success = false;
			scope.failure = false;
			
			// Constructor de sequences
			sequences.forEach(function(s){
				scope.sequences.push([]); // Añadimos el nuevo array

				var temp = scope.sequences[ scope.sequences.length - 1 ], // Puntero del último array
					number = {}; // variable temporal para los números

				for(var i=0; i < s.sequence.length; i++){
					number = { number: s.sequence[i] }; // Creamos el nuevo elemento

					// si el elemento definido esta lleno, entonces solo se muestra. En caso contrario
					// se crea un input (html)
					if(s.toFill.indexOf(i) >= 0) {
						chances++; // alimentamos el número de posibilidades
						number.filled = false;  
					} else {
						number.filled = true;
					} 

					// añadimos el elemento
					temp.push(number); 
				}
			}); // END forEach

			/**
			 * Verifica la respuesta en el item
			 */
			scope.verify = function (item) {
				if(item.input === '') return; 

				// Si no es un número, borramos el último caractér
				if(!opt.allowAll) {
					if(!item.input.match(/^\d+$/)){
						item.input = item.input.slice(0, -1);
						return;
					}		
				}

				// Si se ha llenado el input con los dígitos necesarios
				if(item.input.length === item.number.length){
					// Verificamos la respuesta
					if(item.input === item.number){
						scope.rightAnswer = item.number;
						rightAnswers++;
					} else {
						scope.wrongAnswer = item.number;
					}

					item.completed = true; // marcamos el item como completo, para desactivar el input
					chances--;

					// fin de la actividad
					if(chances === 0){
						if(rightAnswers >= minRightAnswers){
							scope.$root.isNextEnabled = true;
							scope.success = true;
						} else {
							scope.failure = true;
						}
					} // if 
				} // if
			}; // verify()

		}
	}; 
});
