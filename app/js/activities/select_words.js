var lizSelectWords = angular.module('lizSelectWords', ['factories']);

lizSelectWords.directive('selectWords', function  (shuffleArrayFactory) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			description: '@',
			audio: '@',
			img: '@',
			alt: '@'
		},
		templateUrl: '../views/activities/select_words.html',
		link: function postLink(scope, element, attrs) {

			var opt = scope.options,
				text = opt.text.split(" "), // texto inicial
				changeWords = opt.words.slice(0), // Palabras a reemplazar
				rightAnswers = 0, // Contador de respuestas correctas
				minRightAnswers = opt.minRightAnswers, // Número mínimo de respuestas correctas
				chances = opt.chances; // posibilidades de realizar la actividad

			scope.words = []; // Palabras que se usarán al final
			scope.wordsOptions = []; // Opciones a usar en cada uno de los desplegables

			// variables de calificación
			scope.rightAnswer = false;
			scope.wrongAnswer = false;
			scope.success = false;
			scope.failure = false;

			// ============================================================================
			// Constructor de wordsOptions
			// ============================================================================
			// Añadimos la opción por defecto
			scope.wordsOptions.push({
				id: 0,
				text: "Elige una respuesta"
			});

			// Cargamos las demás opciones
			for(var i=0; i < changeWords.length; i++){
				scope.wordsOptions.push({
					id: i,
					text: changeWords[i]
				});
			}

			// ============================================================================
			// Constructor de scope.words
			// ============================================================================
			for(var i=0; i < text.length; i++){
				// Encuentra la expresión ${x}, donde x es el índice dentro del array de palabras
				if( text[i].match(/(^\$\{)\d(\}$)/) ){
					// Input
					// Recuperamos el índice del patrón
					var index = text[i].replace(/\D/g,'');

					scope.words.push({
						isInput: true,
						input: scope.wordsOptions[0],  // Se pone como valor inicial la respuesta
						word: changeWords[index] // Palabra a comparar
					});
				} else {
					// Palabra normal
					scope.words.push({
						isInput: false,
						word: text[i] + " "
					});
				}
			}

			// ============================================================================
			// Función de verificación
			// ============================================================================
			scope.verify = function (item) {

				if(item.word === item.input.text){
					// Respuesta Correcta
					scope.rightAnswer = Math.random(); // Disparador de respuesta
					item.completed = true;
					rightAnswers++;
				} else {
					// Respuesta Incorrecta
					scope.wrongAnswer = Math.random(); // Disparador de respuesta
				}

				chances--;

				// Si se acaban las oportunidades o 
				if(chances === 0 || changeWords.length === rightAnswers){
					if(rightAnswers >= minRightAnswers){
						// Éxito
						scope.$root.isNextEnabled = true;
						scope.success = true;
					} else {
						// Fracaso
						scope.failure = true;
					}
				}

			};
			
		}
	}; 
});
