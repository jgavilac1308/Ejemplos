var lizQuestionsImages = angular.module('lizQuestionsImages', ['factories']);

lizQuestionsImages.directive('questionsImages', function  (shuffleArrayFactory) {
    return {
        restrict: 'E',
        scope: {
            options: '=',
            audio: '@',
            description: '@'
        },
        templateUrl: '../views/activities/questions_images.html',
        link: function (scope, element, attrs) {

            var opt = scope.options,
                rightAnswers = 0;


            // variables básicas de la acividad de angular
            scope.rightAnswer = false;
            scope.wrongAnswer = false;
            scope.success = false;
            scope.failure = false;
            scope.$root.isNextEnabled = false;
            scope.imgwidth = (opt.imgwidth) ? opt.imgwidth : 60;
            scope.chancesPerItem = (opt.chancesPerItem) ? opt.chancesPerItem : 2;
            scope.minRightAnwers = opt.minRightAnwers;
            scope.randomItems = (scope.options.randomItems) ? true:false;

            // Imagen principal
            scope.src = opt.src;
            scope.alt = opt.alt;

            // Preguntas
            scope.questions = opt.questions;

            // añadimos el número de posibilidades
            scope.questions.forEach(function (q) {
                q.chances = scope.chancesPerItem;
                if (scope.randomItems === true) {
                    shuffleArrayFactory.run(q.answers);
                }
            });

            /**
             * Verifica la respuesta.
             */
            scope.verify = function (item, select) {

                console.log("item ");
                console.log(item);

                if ( item.completed) return ;

                if (select.answer)    {
                    console.log("bien");

                    scope.rightAnswer = Math.random();
                    item.wrong = false;
                    item.right = true;
                    rightAnswers += 1;
                    item.completed = true;
                }
                else {
                    item.wrong = true;
                    scope.wrongAnswer = Math.random();
                    item.chances -= 1;
                    if(item.chances === 0) {item.completed = true;console.log(item);item.feedback = item.answers.filter(function (a) {
                        return a.answer;
                    })[0].text}
                }

                /*

                if(item.selectedAnswer.answer) {
                    scope.rightAnswer = Math.random();
                    item.wrong = false;
                    item.right = true;
                    rightAnswers += 1;
                    item.completed = true;
                } else {
                    item.wrong = true;
                    scope.wrongAnswer = Math.random();
                    item.chances -= 1;
                    if(item.chances === 0) {item.completed = true;console.log(item);item.feedback = item.answers.filter(function (a) {
                        return a.answer;
                    })[0].text}
                }*/

                // Contamos los elementos terminados
                var completedItems = scope.questions.filter(function (q) {
                    return q.completed;
                }).length;

                if(completedItems === scope.questions.length) {
                    scope.$root.isNextEnabled = true;

                    scope.$root.beforeGoNext = function () {
                        // solo pasa la actividad si todas las respuestas son correctas
                        if(rightAnswers === scope.questions.length || rightAnswers >= scope.minRightAnwers) {
                            scope.success = true;
                            return true;
                        } else {
                            scope.failure = true;
                            return true;
                        }

                    };

                }

            };
        }
    };
});
