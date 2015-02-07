/**
 * La actividad para escribir textos largos.
 */

 var lizTextActivity = angular.module('lizTextActivity', []);

 lizTextActivity.directive('textActivity', function () {
 	return {
 		restrict: 'E',
 		templateUrl: '../views/activities/text_activity.html',
 		scope: {
 			options: '=',
 			title: '@',
 			description: '@',
 			instruction: '@',
 			audio: '@'
 		},
 		link: function (scope, iElement, iAttrs) {
 			console.log(scope);
 			// Inputs procesados
			scope.words = [];

			// Procesamos cada elemento del array entrante
			angular.forEach(scope.inputs, function (input) {
				scope.words.push({ word: input, right: false, wrong: false });
			});

 			scope.numLines = scope.options.numLines;
 			scope.complete = false;
 			scope.success = false;
			scope.failure = false;
			scope.block = false;
			scope.right = false;
			scope.wrong = false;

			scope.$watch('complete', function(complete) {
				if (complete) {
					if (scope.numCharacters === scope.options.numCharacters) {
						// éxito
						scope.success = true;

						// Activamos la siguiente actividad o ruta
						scope.$root.isNextEnabled = true;
					} else {
						// fracaso
						scope.failure = true;
					}
				} 
			});

			// Si la descripción o el título están, entonces la instrucción va al fondo
			scope.isBottom = scope.title || scope.description;

			var chances = scope.options.chances-1;

			scope.verify = function (input) {
				var letters = /^[A-Za-z]+$/,
					value = $("#text_activity_box").text(),
					lineHeight = parseInt($("#text_activity_box").css("line-height"));

					

				if (value === "" || value === null || value === "Escribe aqui...") { return; }

				var totalHeight = parseInt($("#text_activity_box").height()),
					lineUsed = totalHeight / lineHeight;

				console.log(totalHeight);

				if((value.match(letters) !== null) && (lineUsed >= scope.numLines)) {
                    
                    	
                	scope.wrong = false;
                    scope.right = true;
                    scope.block = true;
                    scope.numCharacters = scope.options.numCharacters;
                                                                   
                } else {
	                    	
                    	scope.wrong ? chances=scope.options.chances-2: chances=scope.options.chances-1;

                    	scope.wrong = true;
                    	

	                    	if(chances === 0){
	                    	scope.block = true;
	                    	chances=scope.options.chances-1;
	                    	}else{
	                    		chances--;value = "";
	                    		$('#text_activity_box').text("");
								$("#text_activity_box").focus();
	                    	}
            	}
                    	
                if (chances === 0) {
                	if ((value.match(letters) !== null) && (lineUsed >= scope.numLines)) {
						// éxito
						scope.success = true;

						// Activamos la siguiente actividad o ruta
						scope.$root.isNextEnabled = true;
					} else {
						// fracaso
						scope.failure = true;
					}
                }

			}


 		}
 	};
 });