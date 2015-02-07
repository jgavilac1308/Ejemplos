var lizPairsInputs = angular.module('lizPairsInputs', []);

lizPairsInputs.directive('pairsInputs', function ($timeout) {
	return {
		restrict: 'E',
		templateUrl: '../views/activities/pairs_inputs.html',
		scope: {
			options: "=",
			title: '@',
			description: '@',
			img: '@',
			alt: '@',
			audio:'@',
			theme: '@'
		},
		link: function postLink(scope, element, attrs) {
			var opt = scope.options,
				minRightAnswers = opt.minRightAnswers,
				rightAnswers = 0,
				completedInputs = 0, // Contador para encontrar el fin de la actividad
				inputWidth = opt.hasOwnProperty('inputWidth') ? opt.inputWidth : false;

			attrs.$observe( 'theme', function(val) {
				if ( !angular.isDefined( val ) ) {
					scope.theme = 'default';
				}
			});

			scope.items = opt.items; // parejas de inputs
			scope.success = false; 
			scope.failure = false;

			// Constructor de items
			scope.items.forEach(function (item) {
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
						item.wrong = false; // Pasa a falso, para ocultarlo
						item.right = true; 
					} else {
						item.wrong = true;
						item._input = '';
						item.chances--;
					}

					// Termina y bloquea
					if(item.chances === 0 || item.right){
						item.completed = true; // marcamos el item como completo, para desactivar el input
						completedInputs++;
					}
					
					// fin de la actividad
					if(scope.items.length === completedInputs){
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
