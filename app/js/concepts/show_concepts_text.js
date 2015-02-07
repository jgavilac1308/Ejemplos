var lizShowConceptsText = angular.module('lizShowConceptsText', []);

lizShowConceptsText.directive('showConceptsText', function ($sce) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			titletop: '@',
			titleimg: '@',
			description: '@',
			audio:'@',
			instruction: '@',
			noplay: '@',
			mainimg: '@',
			imgpre: '@',
			imgpreAlt: '@',
			alt:'@',
			itemsperrow: '@'
		},
		templateUrl: '../views/concepts/show_concepts_text.html',
		link: function (scope, element, attrs) {

			var opt = scope.options,
				completedItems = 0;

			scope.items = opt.items;
			scope.examples = opt.items.examples;
			scope.selectedItem = false; // elemento seleccionado
			scope.imgStyle = opt.imgStyle ? opt.imgStyle : '';
			scope.hasImageItems = scope.options.hasImageItems; // si los items son solo imagenes
			scope.itemsperrow2 = scope.itemsperrow ? scope.itemsperrow : 1;

			console.log(scope.itemsperrow);

			// Para usar el html en angular
			scope.sanitize = function (item) {
				return $sce.trustAsHtml(item);
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
				if(completedItems === scope.items.length){
					scope.$root.isNextEnabled = true;
				}
			};

			/**
			 * Devuelve los estilos personalizados de los items
			 */
			scope.getItemStyles = function (item) {
				var styles = "";


				if(item.hasOwnProperty('title') || scope.mainimg === undefined){


					styles += "width: " + (100 /scope.itemsperrow2) + "%;";
				}

				return styles;	
			};

			/**
			 * Devuelve los estilos personalizados de los items
			 */
			scope.getItemStyles2 = function () {
				var styles = scope.imgStyle;

				return styles;
			};

		}
	}; 
});

