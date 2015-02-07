var lizGroupInputs = angular.module('lizGroupInputs', ['factories']);

lizGroupInputs.directive('groupInputs', function  (shuffleArrayFactory) {

	return {
		restrict: 'E',
		scope: {
			options: '=',
			audio: '@',
			description: '@',
			mainimg: '@',
			mainalt: '@',
			maintitle: '@'
		},
		templateUrl: '../views/activities/group_inputs.html',
		link: function (scope, element, attrs) {
			var opt = scope.options, // Alias de options
				tempInput = {}, // variable temporal para la creación de inputs
				countInputs = 0, // número total de inputs
				inputsArray = []; // array usado para tener una referencia de todos los inputs 

			scope.groups = opt.groups;
			scope.hasExample = (opt.hasExample) ? true : false;

			// Creamos un array para hacer el foreach en cada grupo, basado en el número de inputs
			// Por otro lado, insertamos el mismo elemento en un array donde estarán todos los inputs
			// con el fin de filtrarlo posteriormente
			scope.groups.forEach(function(group){
				group.inputs = [];

				countInputs += group.numInputs; // Contamos los inputs

				for(var i = 0; i < group.numInputs; i++){
                    if  (i === 0) {
                        var example = (group.example) ? group.example : "";
                        tempInput = { value: '', example: example }; // Creamos un nuevo objeto a insertar
                    } else {
                        tempInput = { value: '' }; // Creamos un nuevo objeto a insertar
                    }
					group.inputs.push(tempInput); // inserta el input en su grupo respectivo
					inputsArray.push(tempInput); // inserta el input en el array general
				}

			});

			/**
			 * Definimos nuestra función beforeGoNext para que muestre el cuadro de felicitaciones
			 */
			scope.$root.beforeGoNext = function () {
				scope.success = true;
				return true; 
			};

            scope.checkHasExample = function (index, input) {
                if (index === 0 && scope.hasExample) {
                    input.value = scope.example;
                    return true;
                }

                return false;
            };

			/**
			 * Verifica el estado actual de los inputs para definir el final de la actividad
			 */
			scope.verify = function (input) {
				// Filtramos el array buscando los inputs que cumplen los requisitos y los contamos
				var completedInputs = inputsArray.filter(function(item){
					return item.value !== '' && !/[\d]/.test(input.value);
				}).length;
				// Si se han completado todos
				if (completedInputs === countInputs) {
					scope.$root.isNextEnabled = true; // Activamos el siguiente vínculo
				} else {
					scope.$root.isNextEnabled = false; // Desactivamos el siguiente vínculo
				}
				
			};

		}
	}; 

});
