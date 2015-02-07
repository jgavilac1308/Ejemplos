var lizSideNumbers = angular.module('lizSideNumbers', []);

lizSideNumbers.directive('sideNumbers', function  () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			description: '@',
			audio: '@'
		},
		templateUrl: '../views/activities/side_numbers.html',
		link: function (scope, element, attrs) {

			var opt = scope.options,
				totalNumbers = opt.numbers.length,
				rightAnswers = 0, // Contador de preguntas buenas
				chances = totalNumbers * 2, // el doble, ya que es izquierda y derecha
				minRightAnswers = opt.minRightAnswers;

			scope.numbers = []; // Listado de números

			scope.success = false;
			scope.failure = false;
			scope.example = opt.example;

			// Constructor de numbers
			opt.numbers.forEach(function(num){
				// Anadimos un objeto con prev y next. Cada uno tiene una variable para el modelo y el número a comparar
				if (opt.allowAll) {
					var prev = '';
					var next = '';

					for(i=0; i <= num.length-1; i = i+1){
					if(i === num.length-1){prev = prev + (parseInt(num.charAt(i)) - 1).toString()}else{prev = prev + num.charAt(i)};
					if(i === num.length-1){next = next + (parseInt(num.charAt(i)) + 1).toString()}else{next = next + num.charAt(i)};  
				};

					scope.numbers.push({
						prev: {
							input: '',
							number: (prev).toString()
						},
						central: num,
						next: {
							input: '',
							number: (next).toString()
						}
					});
				}else{
					scope.numbers.push({
						prev: {
							input: '',
							number: (parseInt(num) - 1).toString()
						},
						central: num,
						next: {
							input: '',
							number: (parseInt(num) + 1).toString()
						}
					});
				};

				//si se nesecita q el primer item sea el ejemplo 
				var index = 0
				if(index === 0 && scope.example === true){

					rightAnswers++;
					scope.numbers[index].prev.right = true;
					scope.numbers[index].next.right = true;
					scope.numbers[index].prev.input = scope.numbers[index].prev.number;
					scope.numbers[index].next.input = scope.numbers[index].next.number;
					scope.numbers[index].prev.completed = true; // marcamos el item como completo, para desactivar el input
					scope.numbers[index].next.completed = true; // marcamos el item como completo, para desactivar el input
					chances -= 1;
					rightAnswers++;
					index ++;


				};

			});

			/**
			 * Verifica si el input cumple con las condiciones del número 
			 */
			scope.verify = function (item) {
				if(item.input === '') return;

				// Si no es un número, borramos el último caractér
				if(!opt.allowAll) {
					if(!item.input.match(/^\d+$/)){
						item.input = item.input.slice(0, -1);
						return;
					}		
				}

				// Si se ha llenado el input con los dígitos necesarios
				if(item.input.length === item.number.length){

					// Verificamos la respuesta. Añadimos una propiedad right o wrong para definir si el item es correcto o no
					if(item.input === item.number){
						rightAnswers++;
						item.right = true; 
					} else {
						item.wrong = true;
					}

					item.completed = true; // marcamos el item como completo, para desactivar el input
					chances -= 1;

					// fin de la actividad
					if(chances === 0){
						if(rightAnswers >= minRightAnswers){
							scope.$root.isNextEnabled = true;
							scope.success = true;
						} else {
							scope.failure = true;
						}
					} 
					
				} // if
			}; // verify()

		}
	}; 
});
