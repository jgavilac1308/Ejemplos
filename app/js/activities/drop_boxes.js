var lizDropBoxes = angular.module('lizDropBoxes', ['factories']);

lizDropBoxes.directive('dropBoxes', function  (shuffleArrayFactory) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			audio: '@',
			description: '@'
		},
		templateUrl: '../views/activities/drop_boxes.html',
		link: function postLink(scope, element, attrs) {

			var opt = scope.options,
				chances = opt.chancesPerPhase; // posibilidades por fase

			scope.phases = opt.phases; // Fases del juego
			scope.dropTarget = null; // Padre en donde cae el objeto
			scope.remaining = []; // Objetos sobrantes
			scope.actualPhase = {}; // Fase Actual

			// variables de calificación
			scope.rightAnswer = false;
			scope.wrongAnswer = false;
			scope.success = false;

			// Constructor de remaining
			scope.phases.forEach(function(phase){
				phase.groups.forEach(function(group){
					// Creamos un objeto por cada uno de los items del grupo
					// mientras que los vamos eliminando del mismo array usando shift
					// Se deben diferenciar por phase y grupo
					while(group.items.length){
						scope.remaining.push({
							phase: phase.title,
							group: group.title,
							word: group.items.shift()
						})
					};
				});
			});

			// Se barajan los elementos
			shuffleArrayFactory.run(scope.remaining);

			// Se carga la fase actual
			scope.actualPhase = scope.phases.shift();

			// Opciones del sortable
			scope.sortableOptions = {
				connectWith: '.connected',
			};

			/**
			 * -----------------------------------------------------------------------------
			 * Verify
			 * -----------------------------------------------------------------------------
			 * Verifica la fase actual. Es la función principal de la actividad.
			 *
			 * Primero se buscan todos los elementos erróneos dentro de la fase actual, así
			 * como los elementos que no se hayan agregado. Después, si se han encontrado elementos
			 * entonces la respuesta es incorrecta, de lo contrario, es correcta y se carga la siguiente
			 * fase.
			 *
			 * La actividad termina cuando ya no hay más fáses.
			 */
			scope.verify = function () {
				var badAnswers = []; // puestos por error
				var missedItems = []; // objetos perdidos

				// ============================================================================
				// Búsqueda de elementos
				// ============================================================================
				// Recorremos cada group y comparamos los objetos adentro
				scope.actualPhase.groups.forEach(function(group){
					// Si aún hay objetos pendientes que van dentro de las casillas
					var missedInGroup = scope.remaining.filter(function(item){
						return item.phase === scope.actualPhase.title &&
							item.group === group.title;
					});

					// Concatenamos los objetos perdidos
					missedItems = missedItems.concat(missedInGroup);

					// Objetos no pertenecientes a la lista
					group.items.forEach(function(item){
						if(item.group !== group.title || item.phase !== scope.actualPhase.title){
							badAnswers.push(item)
						}
					});
				});

				// ============================================================================
				// Verificación de respuesta correcta/incorrecta
				// ============================================================================
				if(missedItems.length || badAnswers.length){
					// Respuesta Incorrecta
					scope.wrongAnswer = Math.random(); // Disparador de respuesta
					chances--;

					// Se debe reiniciar la serie si se acaban las posibilidades
					if(chances === 0){
						chances = opt.chancesPerPhase; // Reinicia el contador

						// Recorremos los grupos y eliminamos los elementos, añadiéndolos nuevamente a la
						// gran lista
						scope.actualPhase.groups.forEach(function(group){
							while(group.items.length){
								scope.remaining.push( group.items.shift() ); 
							};
						});
					}
				} else {
					// Respuesta Correcta
					scope.rightAnswer = Math.random(); // Disparador de respuesta
					chances = opt.chancesPerPhase; // Reinicia el contador

					// ============================================================================
					// Fin de la actividad
					// ============================================================================
					if(scope.phases.length === 0){
						scope.$root.isNextEnabled = true;
						scope.success = true;
					} else {
						scope.actualPhase = scope.phases.shift();
					}
				}

			};
			
		}
	}; 
});
