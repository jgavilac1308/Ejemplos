var lizTablePath = angular.module('lizTablePath', []);

lizTablePath.directive('tablePath', function  () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			imgLeft: '@',
			imgLeftAlt: '@',
			imgRight: '@',
			imgRightAlt: '@',
			titlehead: '@',
			audio: '@',
			instruction: '@',
			description: '@'
		},
		templateUrl: '../views/activities/table_path.html',
		link: function (scope, element, attrs) {
			var opt = scope.options,
				path = opt.path.slice(0), // Camino a elegir por el estudiante
				rightAnswers = 0, // Contador de respuestas correctas
				chances = opt.chances, // Se puede equivocar este número de eces
				rows = opt.table.length, 
				cols = opt.table[0].length;

			// Si la descripción o el título están, entonces la instrucción va al fondo
			scope.isBottom = scope.title || scope.description;

			// Calificación
			scope.rightAnswer = false;
			scope.wrongAnswer = false;
			scope.success = false;
			scope.failure = false;

			scope.table = [];

			// Llenamos la tabla
			for(var i = 0; i < rows; i++) {
				scope.table.push([]); // Añade el nuevo array

				for(var j = 0; j < cols; j++) {
					scope.table[i].push({
						x: j,
						y: i,
						text: opt.table[i][j]
					});
				}
			}

			/** 
			 * Verifica si la celda pertenece al camino.
			 */
			scope.verify = function (cell) {
				// Si hay elementos en el path
				if(cell.x === path[0][0] && cell.y === path[0][1]) {
					// Respuesta correcta
					cell.completed = true; // Marcamos la casilla como completa
					scope.rightAnswer = Math.random(); // Disparador de respuesta
					path.shift(); // Eliminamos el primer elemento
				} else {
					scope.wrongAnswer = Math.random(); // Disparador de respuesta
					chances --;

					if(chances === 0) {
						scope.failure = true;
					}
				}

				// Fin de la actividad exitoso
				if(path.length === 0) {
					scope.$root.isNextEnabled = true;
					scope.success = true;
				}
			};
			

		}
	}; 
});
