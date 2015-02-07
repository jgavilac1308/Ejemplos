var lizGroupTableTextFree = angular.module('lizGroupTableTextFree', []);

lizGroupTableTextFree.directive('groupTableTextFree', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/group_table_text_free.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@',
			blockText: '@',
			mainimg: '@'
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.itemsPerRow = scope.options.itemsPerRow;
			scope.pattern = scope.items.pattern;
			scope.text = scope.items.text;
			minRightAnswers = scope.options.minRightAnswers
			rightAnswers = 0, // Contador de preguntas buenas
			chances = scope.options.chances,
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
			 * Verifica si el todos los inputs cumplen la longitud minima de caracteres 
			 */
			 
			scope.verify = function (item) {
				// Filtramos el array buscando los inputs que cumplen los requisitos y los contamos
				
				var completedInputs = scope.items.filter(function(item){
					return item.input.length >= item.length && item.input;
				}).length;

				// Si se han completado todos
				if (completedInputs === scope.items.length) {
					scope.$root.isNextEnabled = true; // Activamos el siguiente vínculo
				} else {
					scope.$root.isNextEnabled = false; // Desactivamos el siguiente vínculo
				}	
			}; // verify()

		}


    }; 
});

