/**
 * Created by Maria Giraldo
 */
var lizCorrectWordInSentence = angular.module('lizCorrectWordInSentence', []);

lizCorrectWordInSentence.directive('correctWordInSentence', function ($sce, $log) {
    return {
        restrict: 'E',
        scope: {
            options: '=',
            title: '@',
            description: '@',
            audio:'@',
            instruction: '@'
        },
        templateUrl: '../views/concepts/correct_word_in_sentence.html',
        link: function (scope, iElement, iAttrs) {

            var opt = scope.options,
                rightAnswers = 0;

            // variables básicas de la acividad de angular
            scope.rightAnswer = false;
            scope.wrongAnswer = false;
            scope.success = false;
            scope.failure = false;
            scope.$root.isNextEnabled = true;
            scope.imgwidth = (opt.imgwidth) ? opt.imgwidth : 60;
            scope.chancesPerItem = (opt.chancesPerItem) ? opt.chancesPerItem : 2;
            scope.minRightAnwers = opt.minRightAnwers;
            scope.randomItems = (scope.options.randomItems) ? true:false;
            scope.$root.isNextEnabled = false;


            // Preguntas
            scope.questions = opt.questions;

            //Numero de opciones por frase
            angular.forEach(opt, function (value, key) {
                angular.forEach(value.questions, function (v, k) {
                    v.chances = scope.chancesPerItem;
                    v.completed = false;  //Initialize
                })
            })

            /**
             * Verifica la respuesta.
             * item: iem actual: frase actual
             * text: palabra seleccionada
             * n: pocision del item, sirve para concatenar el Id del elemento
             * i: pocision de cada palabra deltro del item,  sirve para concatenar el Id del elemento
             */
            scope.verify = function (item, text, n, i) {
                item.chances -= 1;  //Resta opciones de clic

                // Si tiene opciones de clic
                if (item.chances >=0 ){
                    //Validar respuesta correcta
                    if (text === item.answer){
                        item.wrong = false;
                        item.right = true;
                        rightAnswers += 1;
                        item.completed = true;
                        item.ok = true;

                        // Destaca respuesta correcta
                        var element = "#"+n+i;
                        $(element).addClass("answer_ok");
                    }
                    else
                    {
                        //Evita mostrar la X si se ha acertado anteriormente
                        if (!item.completed)    item.wrong = true;
                    }
                    //No tiene opciones de clic
                    if(item.chances === 0)item.ok = true;
                }
                else{
                    item.ok = true;
                }


                //Contamos los elementos completados por item
                var completed =  scope.options[0].questions.filter(function (q) {
                    return q.ok;
                }).length;

                // Contamos los elementos terminados
                var completedItems =  scope.options[0].questions.filter(function (q) {
                    return q.completed;
                }).length;

                // Se ha intentado en todos los items
                if (completed ===  scope.options[0].questions.length) {
                    //Se ha acertado en el minimo requerido
                    if(completedItems >= scope.options[0].minRightAnwers) {
                        scope.$root.isNextEnabled = true;
                        //Hábilita mensaje de felicitaciones
                        scope.success = true;
                    }
                    else{
                        //Habilita mensaje para volver a intentar
                        scope.failure = true;
                    }
                }
                else{
                    return;
                }
            }

            // Permite el uso de html
            scope.sanitize = function (phrase) {
                return $sce.trustAsHtml(phrase);
            };

        }
    };
});