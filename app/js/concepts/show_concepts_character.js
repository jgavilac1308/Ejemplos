var lizShowConceptsCharacter = angular.module('lizShowConceptsCharacter', []);

lizShowConceptsCharacter.directive('showConceptsCharacter', function () {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			title: '@',
			description: '@',
			audio:'@',
			instruction: '@',
			alt: '@',
			mainimg: '@'
		},
		templateUrl: '../views/concepts/show_concepts_character.html',
		link: function (scope, element, attrs) {

			var opt = scope.options,
				completedItems = 0;

			scope.videoLink = (opt.videoLink) ? opt.videoLink : false;
			scope.items = opt.items;
			scope.items2 = opt.items2;
			scope.selectedItem = false; // elemento seleccionado

			/**
			 * si no hay elementos que mostrar simplemente se activa el boton adelante
			 */
			if (scope.items.length === 0){
				scope.$root.isNextEnabled = true;
			}

			/**
			 * Selecciona el elemento indicado
			 */
			scope.selectItem = function (item) {

				scope.selectedItem = item; // seleccionamos el objeto

				// Contamos los elementos completos
				if(!item.hasOwnProperty('isCompleted')){
					item.isCompleted = true; // marcamos el elemento, para no volver a seleccionarlo
					completedItems++;
				}

				// Fin de la actividad
				if(completedItems === (scope.items.length + scope.items2.length) ){
					scope.$root.isNextEnabled = true;
				}
			};

			/**
			 * Devuelve los estilos personalizados de los items
			 */
			scope.getItemStyles = function () {
				var styles = "";

				styles += "width: " + (100 / 1) + "%;";

				return styles;
			};

		}
	}; 
});

