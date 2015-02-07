/**
 * La actividad permite escoger una opción entre tres
 * y verificar si es correcta de acuerdo a una condición.
 */
var lizChooseCorrectOption = angular.module('lizChooseCorrectOption', []);

lizChooseCorrectOption.directive('chooseCorrectOption', function () {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: '../views/activities/choose_correct_option.html',
        scope: {
            options: '=',
            instruction: '@',
            title: '@',
            description: '@',
            audio: '@'
        },
        link: function (scope, iElement, iAttrs) {
            scope.rightAnswers = 0;
            scope.complete = false; // Cuando termina la actividad
            scope.block = false;
            scope.success = false;
            scope.failure = false;

            // watch if the activity is finished
            scope.$watch('complete', function (complete) {
                if (complete) {
                    if (scope.rightAnswers >= scope.options.minRightAnswers) {
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

            scope.makeId = function (id) {
                var newId = id.replace(" ", "_");
                var text = newId + "_";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 5; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
				}

                return text;
            };

            scope.items = scope.options.data;
            
            angular.forEach(scope.options.aOptions, function (value, key) {
            	value.optId = scope.makeId(value.name);
            });

            scope.aOptions = scope.options.aOptions;

            // Si la descripción o el título están, entonces la instrucción va al fondo
            scope.isBottom = scope.title || scope.description;

            var counter = 0, chances = scope.options.chancesPerItem - 1;

            scope.verify = function (option, item, id) {
                if ((option === null) || (option === '')) { return; }

                // Verificamos la respuesta. Añadimos una propiedad right o wrong para definir si el item es correcto o no
                if (option.toLowerCase() === item.answer.toLowerCase()) {
                    scope.rightAnswers++;
                    item.wrong = false;
                    item.right = true;
                    item.block = true; // marcamos el item como completo, para desactivar el input
                    counter++;
                } else {

                    item.wrong ? chances = scope.options.chancesPerItem - 2 : chances = scope.options.chancesPerItem - 1;

                    item.wrong = true;


                    if (chances === 0) {
                        item.block = true;
                        counter++;
                        chances = scope.options.chancesPerItem - 1;
                    } else {
                        chances--;
                        $("#" + id).button('reset');
                    }
                }

                if (counter === scope.options.data.length) {

                    scope.complete = true;

                }

                scope.$apply();
            };

            
        }
    };
});