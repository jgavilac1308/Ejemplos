var lizGiraffe = angular.module('lizGiraffe', ['factories']);

lizGiraffe.directive('giraffe', function  (shuffleArrayFactory) {
	return {
		restrict: 'E',
		scope: {
			audio: '@',
			description: '@'
		},
		templateUrl: '../views/activities/giraffe.html',
		link: function postLink(scope, element, attrs) {

			// Vamos contando el número de respuestas incorrectas
			// Con el fin de tener una forma de reiniciar la tabla
			var wrongAnswers = 0; 

			scope.number = 0; // Número que se multiplica con el valor actual de la tabla
			scope.balloons = []; // Posibles respuestas
			scope.answers = []; // Array de respuestas. Usado para mostrar cuantas respuestas lleva

			// Si existe la sesión, se asigna a table
			if(sessionStorage.getItem('table')){
				scope.table = sessionStorage.getItem('table');
			} else {
				scope.table = 2; // Tabla actual
			}

			// Calificaciones
			scope.success = false;
			scope.failure = false;
			scope.rightAnswer = false;

			// Guardamos el número usando sessionStorage
			sessionStorage.setItem('table', scope.table);

			/**
			 * Genera la nueva operación.
			 */
			scope.generateOperation = function () {
				var balloonSeed = 0; // Usado para alimentar el array balloons

				scope.balloons.length = 0; // Reinicia el array

				// Fin de la actividad
				if(scope.number === 9 && scope.table === 9){
					scope.$root.isNextEnabled = true;
					scope.success = true;

					// Removemos el elemento de sessionStorage
					sessionStorage.removeItem('table'); // Actualiza sessionStorage
				}

				// Cuando llegue a ser 9, se reinicia a 0 y se cambia de tabla
				if(scope.number === 9){
					scope.rightAnswer = Math.random(); // Dispara el ícono de respuesta correcta
					scope.number = 0;
					scope.table++;
					wrongAnswers = 0; 
					sessionStorage.setItem('table', scope.table); // Actualiza sessionStorage

					// Reinicia las respuestas
					scope.answers.length = 0;
				}

				// Aumentamos el número en 1
				scope.number++;

				// Generamos inicialmente la respuesta y la añadimos
				scope.balloons.push({
					number: scope.table * scope.number
				});

				// Luego, añadimos otros 6 elementos, generados aleatoriamente
				for(var i = 0; i < 6; i++){
					// Generamos números, teniendo en cuenta que el número no puede
					// ser igual a la respuesta
					do{
						balloonSeed = Math.floor( Math.random() * (100 - 2) + 2 );
					} while(balloonSeed === scope.balloons[0].number);

					// Añadimos el elemento
					scope.balloons.push({ number: balloonSeed });
				}

				// Después, se baraja el array
				shuffleArrayFactory.run(scope.balloons);
				
			};

			// Generamos el primer valor a mostrar
			scope.generateOperation();

			/**
			 * Verifica la operación
			 */
			scope.verify = function (balloon) {

				if(balloon.number === scope.number * scope.table){
					// Respuesta Correcta
					scope.answers.push({
						right: true
					});
				} else {
					// Respuesta Incorrecta
					wrongAnswers++;

					scope.answers.push({
						right: false
					});
				}

				// Si tiene al menos 4 respuestas incorrectas, reinicia la actividad
				if(wrongAnswers === 4){
					scope.failure = true;
				}

				// Al final de la verificación, se genera nuevamente la operación
				scope.generateOperation();
			};

		}
	}; 
});
