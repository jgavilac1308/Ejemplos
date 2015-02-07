var lizSelectOptionsPositions = angular.module('lizSelectOptionsPositions', ['factories']);

lizSelectOptionsPositions.directive('selectOptionsPositions', function  (shuffleArrayFactory,$sce) {
    return {
        restrict: 'E',
        templateUrl: '../views/activities/select_options_positions.html',
		scope: {
			options: '=',
			description: '@',
			audio:'@'
			
		},

		link: function (scope, element, attrs) {
			// Corremos la aplicación
			scope.items = scope.options.items;
			scope.canvas = scope.options.canvas; // La imagen principal
			scope.canvasStyle = scope.options.canvasStyle; // La imagen principal
			scope.titlecanvas = scope.options.titlecanvas; // title de La imagen principal
			minRightAnswers = scope.options.minRightAnswers
			scope.itemsPerRow = scope.options.itemsPerRow ? scope.options.itemsPerRow : false;
			scope.selectindividual = scope.options.selectindividual //separa cada respuesta en un recuadro individual
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
				console.log(rightAnswers);
				if(rightAnswers >= minRightAnswers){
					scope.success = true;
					return true; 
				}else{scope.failure = true;}

				return true; 
			};

			// Para usar el html en angular
			scope.sanitize = function (item) {
				console.log($sce);
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

		

      // añadimos algunas opciones
      scope.items.forEach(function (q) {
        q.chances = scope.options.chances; // posibilidades por pregunta

        if(scope.options.optionsrandom){
        shuffleArrayFactory.run(q.options); // baraja
    	}
    	if(!scope.selectindividual){
	        q.options.unshift({
	          text: "Elige una respuesta",
	          default: true
	        });
        }

        q.selectedAnswer = q.options[0]; // elige la primera, en este caso, "elige una respuesta"

        q.rightAnswer = q.options.filter(function (answer) {
          return answer.answer;
        })[0];
      });

			/**
			 * Marca los elementos y verifica el final
			 */
			scope.verify = function (item) {
								
				 if(item.selectedAnswer.default) return; // Es "Elige una respuesta"
				
				if(item.selectedAnswer.answer) {
		          /*scope.rightAnswer = Math.random();*/
		          if(item.freeanswer){
			          	if(item.chances === scope.options.chances){
			          		item.wrong = false;
							item.right = true;
			          		rightAnswers += 1;
			          		item.chances -= 1;
			          	}else{item.chances -= 1;}

				          	if(item.chances === 0){
				          		 item.completed = true;
				          	}
			        }else{
			        	item.wrong = false;
						item.right = true;
				        rightAnswers += 1;
				        item.completed = true;
		     		}

	       		} else {
		          scope.wrongAnswer = Math.random();
		          item.chances -= 1;
		          item.wrong = true;
		          	if(item.chances === 0){
				        item.completed = true;
				        item.right = false;
						item.wrong = true;				        
					}
	        	}

				var countCompleted = scope.items.filter(function(item){
					return item.completed;
				}).length;
		
				if(countCompleted === scope.items.length || rightAnswers === scope.items.length ) {
					scope.$root.isNextEnabled = true; // Activa la flecha de siguiente
				}
			};

			/**
			 * Marca los elementos y verifica el final
			 */
			scope.verify2 = function (a,item) {

				if(item.completed) return; // Es "Elige una respuesta"
				console.log(item);	

				if(a.answer) {
		          
			        	item.wrong = false;
						item.right = true;
				        rightAnswers += 1;
				        item.completed = true;
				        a.istrue = true

	       		} else {
		          scope.wrongAnswer = Math.random();
		          item.chances -= 1;
		          item.wrong = true;
		          	if(item.chances === 0){
				        item.completed = true;
				        item.right = false;
						item.wrong = true;	
						 a.isfalse = true			        
					}
	        	}

				var countCompleted = scope.items.filter(function(item){
					return item.completed;
				}).length;
		
				if(countCompleted === scope.items.length || rightAnswers === scope.items.length ) {
					scope.$root.isNextEnabled = true; // Activa la flecha de siguiente
				}
			};

		}

    }; 
});




