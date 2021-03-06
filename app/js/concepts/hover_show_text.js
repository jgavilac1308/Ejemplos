var lizHoverShowText = angular.module('lizHoverShowText', []);

lizHoverShowText.directive('hoverShowText', function  ($sce) {
    return {
        restrict: 'E',
        templateUrl: '../views/concepts/hover_show_text.html',
		scope: {
			options: '=',
			description: '@',
			titlehead: '@',
			instruction: '@',
			audio:'@'
			
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.canvas = scope.options.canvas; // La imagen principal
			scope.altcanvas = scope.options.altcanvas; // texto alternativo de La imagen principal
			scope.titlecanvas = scope.options.titlecanvas; // titulo de La imagen principal
			scope.imgStyle = scope.options.imgStyle; // estilos de La imagen principal
			scope.success = false;
			scope.event = scope.options.eventClick ? 'click' : 'mouseover';
			scope.block = false;
			completedItems = 0;
			scope.hidetext = scope.options.hidetext//activar para ocultar el popover cuando termina el evento
			scope.mainText = scope.options.mainText//agrga texto html ala actividad

			console.log(scope.mainText);

			/**
			 * Marca los elementos y verifica el final
			 */
			scope.verify = function (item) {
				if(item.completed) return;

				item.completed = true;

				var countCompleted = scope.items.filter(function(item){
					return item.completed;
				}).length;

				if(countCompleted === scope.items.length) {
					scope.$root.isNextEnabled = true; // Activa la flecha de siguiente
				}
			};

			// Para usar el html en angular
			scope.sanitize = function (item) {
				return $sce.trustAsHtml(item);
			}

			/**
			 * Para obtener los estilos de los elementos, específicamente el ancho
			 */
			scope.getTargetsStyles = function (item) {
				var styles = '';

				styles += 'width: ' + item.w + 'px;';
				styles += 'height: ' + item.h + 'px;';
				styles += 'top: ' + item.t + '%;';
				styles += 'left: ' + item.l + '%;';

				// estilos personalizados
					if(scope.options.hasOwnProperty('customStyles')) styles += scope.options.customStyles;

				return styles;
			};

		}
	}; 
});

lizHoverShowText.directive('popover', function($timeout){
	return {
	    restrict: 'A',
			scope: {
				item: '=',
				popoverText: '@',
				popoverPlacement: '@',
				popoverTitle: '@',
				popoverEvent:'@',
				hidetext: '@',

			},
	    link : function (scope, element, attrs) {
				var disable = false;

				$timeout(function(){
					$(element).popover({
						animation: true,
						placement: scope.popoverPlacement,
						title: scope.popoverTitle,
						trigger: 'manual',
						html: true,
						content: scope.popoverText//container: 'body'
					});
				});
				
				if(scope.hidetext){
					element.bind('mouseleave', function (e) {
						
						$(element).popover('hide');
					});

					element.bind(scope.popoverEvent, function (e) {
						
						$(element).popover('show');

					});
				};

					element.bind(scope.popoverEvent, function (e) {
						if(disable) return; // Solo se anima la primera vez
						
						$(element).popover('show');
						disable = true;
					});

    	}
	};
});



