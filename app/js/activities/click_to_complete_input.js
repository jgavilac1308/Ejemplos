var lizClickToCompleteInput = angular.module('lizClickToCompleteInput', []);

lizClickToCompleteInput.directive('clickToCompleteInput', function  () {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/click_to_complete_input.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@'
			
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.canvas = scope.options.canvas; // La imagen principal
			scope.titlecanvas = scope.options.titlecanvas; // title de La imagen principal
			minRightAnswers = scope.options.minRightAnswers
			rightAnswers = 0, // Contador de preguntas buenas
			chances = scope.options.chances,
			scope.success = false;
			scope.failure = false;
			scope.block = false;
			completedItems = 0;

			/**
			 * Definimos nuestra función beforeGoNext para que muestre el cuadro de felicitaciones
			 */
			scope.$root.beforeGoNext = function () {
				scope.success = true;
				return true; 
			};


			/**
			 * Para obtener los estilos de los elementos, específicamente el ancho
			 */
			scope.getTargetsStyles = function (item) {
				var styles = '';

				styles += 'width: ' + item.w + 'px;';
				styles += 'height: ' + item.h + 'px;';
				styles += 'top: ' + item.t + '%;';
				styles += 'left: ' + item.l + '%;';

				/*// estilos personalizados
				if(opt.hasOwnProperty('customStyles')) styles += opt.customStyles;*/

				return styles;
			};
			/**
			 * Para obtener los estilos las calificaciones de los targets 
			 */
			scope.getTargetsStyles2 = function (item) {
				var styles = '';

				styles += 'width: ' + item.w + 'px;';
				styles += 'height: ' + item.h + 'px;';
				styles += 'top: ' + item.t + '%;';
				styles += 'left: ' + item.l + '%;';
				styles += 'background-size: ' + item.w + 'px;' + item.w + 'px;';
				/*// estilos personalizados
				if(opt.hasOwnProperty('customStyles')) styles += opt.customStyles;*/

				return styles;
			};

			

			/**
			 * Marca los elementos y verifica el final
			 */
			scope.verify = function (item) {
								
				if(/*item.completed ||*/ item.input === "") return;

				if( ((item.answer[0] === 'free') && (item.input.length >= item.length)) || ( item.answer.indexOf(item.input) > -1 )  ){
					item.completed = true;
					item.wrong = false;
					item.right = true;
					
				}else{

					item.right = false;
					item.wrong = true;					
				}

				var countCompleted = scope.items.filter(function(item){
					return item.completed;
				}).length;
				
				if(countCompleted === chances) {
					scope.$root.isNextEnabled = true; // Activa la flecha de siguiente
				}
			};

		}

    }; 
});

lizClickToCompleteInput.directive('popclick', function($timeout, $compile){
	return {
	    restrict: 'A',
			scope: {
				item: '=popoverItem',
				popoverText: '@',
				popoverPlacement: '@'
			},
	    link : function (scope, element, attrs) {
				var disable = false,
					isHidden = true,
					data = ''; // template del input

				data = '<input type="text" class="popover-input" ng-model="item.input" ng-blur="verifyInput()" placeholder="Escribe aqui">';
				scope.item.input = ''; // Añade el modelo para el input

				element.bind('click', function (e) {
					if(disable) return; // Solo se anima la primera vez

					$(element).popover({
						animation: true,
						placement: scope.popoverPlacement,
						trigger: 'manual',
						content: $compile(data)(scope),
						html : true
						/*content: scope.popoverText*/
						//container: 'body'
					});
					
					if(isHidden){
						$(element).popover('show');
						isHidden = false;
					}else{
						$(element).popover('destroy');
						isHidden = true;
					}

				});

				scope.verifyInput = function () {

					scope.$parent.verify(scope.item);
				};

    	}
	};
});


