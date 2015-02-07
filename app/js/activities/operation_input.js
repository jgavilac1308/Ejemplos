var lizOperationInput = angular.module('lizOperationInput', []);

lizOperationInput.directive('operationInput', function  () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			audio: '@',
			description: '@'
		},
		templateUrl: '../views/activities/operation_input.html',
		link: function postLink(scope, element, attrs) {
			var opt = scope.options,
				minRightAnswers = opt.minRightAnswers,
				rightAnswers = 0,
				completedInputs = 0, // Contador para encontrar el fin de la actividad
				totalInputs = opt.units.length + 1, // Unidades + total
				inputWidth = opt.hasOwnProperty('inputWidth') ? opt.inputWidth : false;

			// Remotamos las variables desde el controlador
			scope.units = opt.units;
			scope.total = opt.total;

			scope.rightAnswer = false; 
			scope.wrongAnswer = false; 
			scope.success = false; 
			scope.failure = false;

			// Constructor de items
			scope.units.forEach(function (item) {
				item._input = ''; // Modelo que se vincula al input 
				item.chances = opt.chancesPerInput; // Posibilidades por cada input
			});

			/**
			 * Verifica si el input cumple con las condiciones del número 
			 */
			scope.verify = function (item) {
				if(item._input === '') return; 

				// Si se ha llenado el input con los dígitos necesarios
				if(item.input.length === item._input.length){

					// Verificamos la respuesta. Añadimos una propiedad right o wrong para definir si el item es correcto o no
					if(item.input === item._input){
						rightAnswers++; // aumenta las respuestas correctas
						scope.rightAnswer = Math.random(); // Disparador de respuesta
						item.right = true;
					} else {
						item._input = '';
						scope.wrongAnswer = Math.random(); // Disparador de respuesta
						item.chances--;
					}

					// Termina y bloquea
					if(item.chances === 0 || item.right){
						item.completed = true; // marcamos el item como completo, para desactivar el input
						completedInputs++;
					}
					
					// fin de la actividad
					if(totalInputs === completedInputs){
						if(rightAnswers >= minRightAnswers){
							scope.$root.isNextEnabled = true;
							scope.success = true;
						} else {
							scope.failure = true;
						}
					} 
					
				} // if
			}; // verify()


			/*
			 * Devuelve los estilos de los inputs
			 */
			scope.getInputStyles = function () {
				var styles = '';

				if(inputWidth){
					styles += "width: " + inputWidth + ';';
				}

				return styles;
			};

		}
	}; 
});
