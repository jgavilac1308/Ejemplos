/**
 * La actividad permite completar palabras en inputs
 */
var lizSelectOptionsImg = angular.module('lizSelectOptionsImg', ['factories']);

lizSelectOptionsImg.directive('selectOptionsImg', function(shuffleArrayFactory){
	return {
		restrict: 'E',
		templateUrl: '../views/activities/select_options_img.html',
		scope: {
			options: "=",
			title: '@',
			correctAnswer: '@',
			description: '@',
			instruction: '@',
			audio:'@'
		},
		link: function(scope, element, attrs){
			var opt = scope.options, // alias
        random = opt.hasOwnProperty('random') ? opt.random : true,
				minRightAnswers = opt.minRightAnswers,
				rightAnswers = 0; // contador de respuestas correctas

			// Inputs procesados
			scope.words = [];
			scope.extension = opt.extension ? opt.extension : '.png';

			// Procesamos cada elemento del array entrante
			angular.forEach(scope.inputs, function (input) {
				scope.words.push({ word: input, right: false, wrong: false });
			});

			scope.chancesPerItem = opt.chancesPerItem;
			scope.hideDescription = opt.hideDescription;
			scope.itemsPerRow = opt.itemsPerRow;
			scope.items = opt.items;
			scope.block = false;

			scope.success = false;
			scope.failure = false;

			// Si la descripción o el título están, entonces la instrucción va al fondo
			scope.isBottom = scope.title || scope.description;


			// Añadimos las variables necesarias para la funcionalidad
			scope.items.forEach(function(item){

        if(random) shuffleArrayFactory.run(item.options); // Barajamos las opciones

				item.options.unshift({
					text: 'Elige una repuesta',
					firstElement: true
				});

				item.selected = item.options[0];

				item.chances = scope.chancesPerItem; // ponemos el número de oportunidades de cada pregunta
			});


			/**
			 * Verifica cada una de las respuestas
			 */
			scope.verify = function (item) {
				// Si es el primer elemento, ocultamos los íconos de respuesta
				if(item.selected.firstElement) {
					delete item.right;
					delete item.wrong;

					return;
				}

				if(item.selected.answer) {
					// respuesta correcta
					delete item.wrong;

					item.right = true;
					item.disabled = true;
					rightAnswers += 1;
				} else {
					// respuesta incorrecta
					item.wrong = true;
					item.chances -= 1;
					if (item.chances === 0) item.disabled = true;
				}

				// Hay que mirar que la actividad haya sido completada
				var completedItems = scope.items.filter(function(item){
					return item.disabled;
				}).length;

				if(completedItems === scope.items.length) {
					if(rightAnswers >= minRightAnswers) {
						// éxito
						scope.$root.isNextEnabled = true;
						scope.success = true;
					} else {
						scope.failure = true;
					}
				}
			};


			/**
			 * Para obtener los estilos de los elementos, específicamente el ancho
			 */
			scope.getStyles = function () {
				var styles = "";

				if(scope.itemsPerRow){
					styles += "width: " + (100 / scope.itemsPerRow) + "%;";
				} else {
					styles += "width: " + (100 / (scope.options.data.length + 2)) + "%;";
					styles += "margin-left: " + (100 / (scope.options.data.length * 4)) + "%;";
				}
				
				return styles;
			}

		}
	};
});

