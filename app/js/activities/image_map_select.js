var lizImageMapSelect = angular.module('lizImageMapSelect', []);

lizImageMapSelect.directive('imageMapSelect', function  () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			audio: '@',
			description: '@'
		},
		templateUrl: '../views/activities/image_map_select.html',
		link: function (scope, element, attrs) {
			var opt = scope.options,
				rightAnswers = 0,
				completedAnswers = 0;
				minRightAnswers = opt.minRightAnswers;

			// Asignación
			scope.items = opt.items;
			scope.img = opt.img;
			scope.alt = opt.alt;

			// Calificación
			scope.success = false;
			scope.failure = false;
			scope.wrongAnswer = false;

			scope.selectedItem = false;

			// Recorremos los items y añadimos el número de oportunidades por item
			scope.items.forEach(function(item){
				item.chances = 2;
			});


			/**
			 * Selecciona el item al dar click
			 */
			scope.selectItem = function (item) {
				scope.selectedItem = item;
			};


			/**
			 * Verifica la respuesta
			 */
			scope.verify = function (item) {
				// si no se ha seleccionado ningún elemento
				if(!scope.selectedItem) return;

				// validación
				if(scope.selectedItem === item) {
					// Respuesta correcta
					completedAnswers++; // Aumentamos el contador de respuestas terminadas
					rightAnswers++; // Aumenta el número de respuestas correctas

					scope.selectedItem.isRight = true;
					scope.selectedItem.completed = true; // marca el elemento como completo

					scope.selectedItem = false; // reinicia el objeto seleccionado
				} else {
					// Respuesta Incorrecta
					scope.selectedItem.chances--;

					// mostramos el ícono de error, solo la primera vez
					if(scope.selectedItem.chances === 1) scope.wrongAnswer = Math.random();
					
					// Desactivamos el elemento seleccionado
					if(scope.selectedItem.chances === 0) {
						completedAnswers++; // Aumentamos el contador de respuestas terminadas

						scope.selectedItem.isWrong = true;
						scope.selectedItem.completed = true;
						scope.selectedItem = false; // reinicia el objeto seleccionado
					}
				}

				// fin de la actividad
				if(scope.items.length === completedAnswers) {
					if(rightAnswers >= minRightAnswers) {
						// Éxito
						scope.$root.isNextEnabled = true;
						scope.success = true;
					} else {
						// Fracaso
						scope.failure = true;
					}
				}
			};

			/**
			 * Obtiene la posición de los elementos
			 */
			scope.getStyles = function (item) {
				var styles = '';

				styles += "top: " + item.t + "%;";
				styles += "left: " + item.l + "%;";
				
				return styles;
			};

		}
	}; 
});
