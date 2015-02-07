var lizCompleteInputsFree = angular.module('lizCompleteInputsFree', []);

lizCompleteInputsFree.directive('completeInputsFree', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/complete_inputs_free.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@'
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.itemsPerRow = scope.options.itemsPerRow;
			scope.pattern = scope.items[0].pattern;
			scope.words = [];
			minRightAnswers = scope.options.minRightAnswers //MAria Giraldo -> Se utiliza para validar la cantidad de letras en la caja de texto
			rightAnswers = 0, // Contador de preguntas buenas
			chances = scope.items[0].pattern.length * 1, // el doble, ya que es izquierda y derecha
			scope.success = false;
			scope.failure = false;
			scope.block = false;

			/**
			 * Para obtener los estilos de los elementos, específicamente el ancho
			 */
			scope.getStyles = function function_name(argument) {
				var styles = "";

				if(scope.itemsPerRow){
					styles += "width: " + (100 / scope.itemsPerRow) + "%;";
					styles += "margin-left: " + (10 / scope.itemsPerRow) + "%;";
					styles += "margin-top: " + (10 / scope.itemsPerRow) + "%;";
					styles += "margin-right: " + (10 / scope.itemsPerRow) + "%!important;";
				} else {
					styles += "width: " + (100 / scope.items.length) + "%;";
					styles += "margin-left: " + (10 / scope.itemsPerRow) + "%;";
					styles += "margin-top: " + (10 / scope.itemsPerRow) + "%;";
				}
				
				return styles;

				
			};

			

			/**
			 * Definimos nuestra función beforeGoNext para que muestre el cuadro de felicitaciones
			 */
			scope.$root.beforeGoNext = function () {
				scope.success = true;
				return true; 
			};

			/**
			 * Verifica si el input cumple con las condiciones del número 
			 */
			 var chancesPerItem = 1

			scope.verify = function (item) {

				if(item.input === '') return; 

				
				//if (item.input.length >= 15){ //COmentado por Maria Giraldo, para poner numero de letras dinámico

                /*
                * Maria Giraldo
                * Validación temporal para no afectar el numero estatico de 15 letras
                * if (minRightAnswers !== 30) minRightAnswers = 15; (*)
                * -- La validación dinámica del numero de letras, aplica al 100% si se elimina esta validación (*).
                * Por el momento funciona para 30 caracteres
                * */
                if (minRightAnswers !== 30) minRightAnswers = 15;

                if (item.input.length >= minRightAnswers){

                    scope.$root.isNextEnabled = true;

                }

					/*// fin de la actividad
					if(chances === 0){
						if(rightAnswers >= minRightAnswers){
							
							scope.success = true;
						} else {
							scope.failure = true;
						}
					} */
					
			}; // verify()



		}


    }; 
});

