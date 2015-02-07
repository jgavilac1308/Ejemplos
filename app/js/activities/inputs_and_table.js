var lizInputsAndTable = angular.module('lizInputsAndTable', []);

lizInputsAndTable.directive('inputsTable', function () {
	return {
		restrict: 'E',
		templateUrl: '../views/activities/inputs_and_table.html',
		scope: {
			options: "=",
			instruction: '@',
			audio: '@',
			description: '@'
		},
		link: function (scope) {
			var opt = scope.options,
				rightAnwers = 0, // Respuestas correctas
				backCounter = opt.inputs.length + opt.table.body.length; // total de inputs

			// Si la descripción o el título están, entonces la instrucción va al fondo
			scope.isBottom = scope.title || scope.description;
			scope.inputs = opt.inputs;
			scope.table = opt.table;

			// calificación
			scope.rightAnswer = false;
			scope.wrongAnswer = false;
			scope.success = false;
			scope.failure = false;

			// Se añade el input a inputs y a table
			scope.inputs.forEach(function (i) { 
				i.input = ''; 
				i.chances = opt.chancesPerInput; // Se definen las posibilidades para cada input
			});

			scope.table.body.forEach(function (i) { 
				i.input = ''; 
				i.chances = opt.chancesPerInput; // Se definen las posibilidades para cada input
			});

			console.log(scope.table);

			/**
			 * Compara el valor ingresado por el usuario con el especificado en el objeto
			 */
			scope.verify = function (item) {
				// Valida solamente si tiene el mismo número de letras
				if(item.input.length !== item.expects.length) return;

				// respuesta correcta/incorrecta
				if(item.input === item.expects){
					scope.rightAnswer = Math.random(); // Dispara el flash
					item.disabled = true; // Deshabilita el input

					rightAnwers++;
					backCounter--; // Reduce el contador para finalizar la actividad
				} else {
					scope.wrongAnswer = Math.random();
					item.chances--; // Reducimos las posibilidades
					item.input = ''; // Limpia el input

					// Deshabilita el input si se acaban las posibilidades
					if(item.chances === 0){
						item.disabled = true; 
						backCounter--; // Reduce el contador para finalizar la actividad
					} 
				}

				console.log(backCounter);

				// Fin de la actividad
				if(backCounter === 0)	{
					if(rightAnwers >= opt.minRightAnswers){
						scope.$root.isNextEnabled = true;
						scope.success = true;
					} else {
						scope.failure = true;
					}
				}
			};
			
			/**
			 * Devuelve los estilos para los inputs.
			 * Usado principalmente para definir el width de cada elemento.
			 */
			scope.getInputStyles = function () {
				var styles = '';
				styles += "width: " + (100 / scope.inputs.length) + "%;";

				return styles;
			};


		}
	};
});
