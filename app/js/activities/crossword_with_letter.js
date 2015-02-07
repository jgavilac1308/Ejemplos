var lizCrosswordWithLetter = angular.module('lizCrosswordWithLetter', []);

lizCrosswordWithLetter.directive('crosswordWithLetter', function () {
    return {
        restrict: 'E',
        scope: {
            options: '=',
            audio:'@',
            description: '@'
        },
        templateUrl: '../views/activities/crossword_with_letter.html',
        link: function (scope, element, attrs) {
            var opt = scope.options; // Alias de opciones

            // Número de columnas y filas en la tabla
            var cols = 0,
                rows = 0,
                start = 0, // punto inicial usado en words.foreach
                end = 0, // punto final usado en words.foreach
                filtered = null; // Filtrado de palabras

            scope.table = []; // Tabla de trabajo
            scope.words = opt.words; // Tomamos las palabras desde el controlador
            scope.selectedWord = false; // palabra seleccionada actualmente
            scope.selectedCell = false; // palabra seleccionada actualmente
            scope.prevParent = false; // padre anterior. Usado para las palabras cruzadas en el salto de celda

            // calificaciones
            scope.success = false;
            scope.failure = false;

            // ===================================================
            // CONSTRUCCIÓN DE PALABRAS
            // ===================================================
            // Recorremos las palabras para obtener la configuración.
            // Inicialmente, se busca el tamaño del crucigrama
            scope.words.forEach(function (word) {
                // Convertimos las palabras a mayúsculas
                word.word = word.word.toUpperCase();

                // columnas
                if(word.pos[0][0] > cols) cols = word.pos[0][0];
                if(word.pos[1][0] > cols) cols = word.pos[1][0];

                // filas
                if(word.pos[0][1] > rows) rows = word.pos[0][1];
                if(word.pos[1][1] > rows) rows = word.pos[1][1];

                // Creamos el objeto de palabra
                if(word.pos[0][1] === word.pos[1][1]){
                    // horizontal
                    word.horizontal = true;
                    word._word = []

                    // si x en cada posición es igual, es horizontal
                    for(var i = word.pos[0][0]; i <= word.pos[1][0]; i++){
                        var item = {
                            x: i,
                            y: word.pos[0][1],
                            $parent: word,
                            letter: word.word[i - word.pos[0][0]], // añade la letra de la palabra
                            init_letter: word.init_letter[i - word.pos[0][0]] // añade la letra de la palabra
                        };

                        // si es la letra inicial, añadimos el número
                        if(i === word.pos[0][0]) item.number = word.number;
                        word._word.push(item);
                    }

                } else if(word.pos[0][0] === word.pos[1][0]){
                    // vertical
                    word.vertical = true;
                    word._word = [];

                    // antes que nada, debemos ver desde donde empieza la palabra
                    if(word.pos[0][1] < word.pos[1][1]) {
                        // de arriba a abajo
                        // si y en cada posición es igual, entonces es vertical
                        for(var i = word.pos[0][1]; i <= word.pos[1][1]; i++){
                            var item = {
                                x: word.pos[0][0],
                                y: i,
                                $parent: word,
                                letter: word.word[i - word.pos[0][1]],
                                init_letter:  word.init_letter[i - word.pos[0][1]]
                            };

                            // si es la letra inicial, añadimos el número
                            if(i === word.pos[0][1]) item.number = word.number;
                            word._word.push(item);
                        }
                    } else if(word.pos[0][1] > word.pos[1][1]) {
                        // De abajo a arriba
                        // Reversa la palabra
                        word.word = word.word.split("").reverse().join("");
                        word.reverse = true; // propiedad para definir que la palabra vertical viene invertida

                        for(var i = word.pos[1][1]; i <= word.pos[0][1]; i++){
                            var item = {
                                x: word.pos[0][0],
                                y: i,
                                $parent: word,
                                letter: word.word[i - word.pos[1][1]],
                                init_letter: word.init_letter[i - word.pos[1][1]]
                            };

                            // si es la letra inicial, añadimos el número
                            if(i === word.pos[0][1]) item.number = word.number;
                            word._word.push(item);
                        }
                    }
                }
            });


            // ===================================================
            // CONSTRUCCIÓN DE TABLA
            // ===================================================
            var temp = null, // Variable temporal
                number = null;

            for(var y = 0; y <= rows; y++){
                // Añadimos una nueva fila
                scope.table.push([]);

                // para cada celda
                for(var x = 0; x <= cols; x++){
                    // Buscamos la palabra que coincide con (x,y)
                    filtered = scope.words.filter(function (w) {
                        return ((w.pos[0][0] <= x && w.pos[1][0] >= x)
                        && (w.pos[0][1] <= y && w.pos[1][1] >= y)) ||
                        ((w.pos[1][0] <= x && w.pos[0][0] >= x)
                        && (w.pos[1][1] <= y && w.pos[0][1] >= y));
                    });

                    // Agrega el nuevo objeto en la tabla
                    if(filtered.length > 0){
                        // Recuperamos la celda idéntica desde las palabras
                        temp = filtered[0]._word.filter(function (w) {
                            return w.x === x && w.y === y;
                        })[0];

                        // Añadimos el modelo a vincular con cada uno de los inputs
                        temp.$parent._word.forEach(function (letter) { letter.input = ''; });

                        // Para las celdas que se cruzan, debemos hacer una funcionalidad especial
                        if(filtered.length > 1){
                            temp.cross = true;
                        }

                    } else {
                        // Si no, es un cuadro vacío
                        temp = {
                            x: x,
                            y: y,
                            empty: true
                        };
                    }

                    // Añade el objeto
                    scope.table[y].push(temp);
                }
            }


            // Añadimos los números a las palabras que empiezan dentro de otra palabra
            var iX = 0,
                iY = 0;

            scope.words.forEach(function(word){
                iX = word.pos[0][0];
                iY = word.pos[0][1];

                // si no tiene número, se agrega
                if(! scope.table[iY][iX].hasOwnProperty('number')) {
                    scope.table[iY][iX].number = word.number;
                }
            });


            /**
             * Selecciona la palabra y la celda, para que el estudiante pueda empezar a
             * escribir la palabra
             *
             * @param {Object} item celda seleccionada en el crucigrama
             */
            scope.selectWord = function (item) {
                // si no es parte de una palabra, cancelamos inmediatamente
                if(item.empty) return;

                // si existe una palabra seleccionada previamente, limpiamos activated
                if(scope.selectedWord){
                    scope.selectedWord._word.forEach(function (letter) {
                        delete scope.table[letter.y][letter.x].actived;
                    });
                }

                // se limpia la celda
                if(scope.selectedCell){
                    delete scope.selectedCell.mainCell;
                }

                // Actualizamos la palabra y la celda seleccionada
                scope.prevParent = scope.selectedCell.$parent;
                scope.selectedWord = item.$parent;
                scope.selectedCell = item;

                // Buscamos la celda, para enfocarse en el input
                element.find('.c' + item.x + '.r' + item.y + ' input').focus();

                // Marcamos la palabra y la celda para que se vean activas
                scope.selectedCell.mainCell = true;
                item.$parent._word.forEach(function (letter) { scope.table[letter.y][letter.x].actived = true; });
            }; // selectWord()


            /**
             * Función que se dispara al escribir en los inputs. Permite el cambio de celda
             * al escribir
             */
            scope.changeCell = function () {
                // Se debe haber seleccionado una celda
                if(!scope.selectedCell) return;

                //08 08 2014 Maria Giraldo -Validar que escriba una sola letra

                var cell = scope.selectedCell, // alias
                    next = false, // siguiente celda
                    parent = cell.$parent;

                /*


                 // si el input no tiene nada, volvemos.
                 if(cell.input === '') return;
                 // solo letras. No espacios
                 if(! cell.input.match("^[A-ZÑ]+$ ")){
                 cell.input = cell.input.slice(0, -1);
                 return;
                 }
                */


                // Cambia a mayúsculas
                cell.input = cell.input.toUpperCase();
               
                // si tiene más de una letra, se borra todo y se deja siempre la última letra
                if(cell.input.length > 1){
                    cell.input = cell.input[ cell.input.length - 1 ];
                }


                // Celdas cruzadas
                if(cell.cross){
                    // Si la celda es cruzada y el padre es igual al padre anterior, es necesario
                    // buscar al otro padre y actualizar la misma celda
                    if(parent === scope.prevParent){
                        var cells = null,
                            otherCell = null;

                        // El otro padre. Usando filtros anidados
                        var otherParent = scope.words.filter(function(word){
                            cells = word._word.filter(function(letter){
                                return letter.x === cell.x && letter.y === cell.y;
                            });

                            return cells.length && word !== parent;
                        })[0];

                        // Buscamos la celda y la actualizamos
                        otherCell = otherParent._word.filter(function (letter) {
                            return letter.x === cell.x && letter.y === cell.y;
                        })[0];

                        otherCell.input = cell.input;
                    } else {
                        parent = scope.prevParent;
                    }

                    // debemos buscar la otra celda cruzada y actualizar su input
                    var crossCell = parent._word.filter(function (letter) {
                        return letter.x === cell.x && letter.y === cell.y;
                    })[0];

                    // Actualizamos el input
                    if(crossCell) crossCell.input = cell.input;
                }

                // ===================================================
                // Próxima celda en base a la actual
                // ===================================================
                // Miramos cual será la siguiente celda
                if(parent.horizontal){
                    next = scope.table[cell.y][cell.x + 1];
                }

                if(parent.vertical){
                    // de arriba a abajo
                    if(parent.pos[0][1] < parent.pos[1][1]) next = scope.table[cell.y + 1] ? scope.table[cell.y + 1][cell.x] : false;
                    // de abajo a arriba
                    if(parent.pos[0][1] > parent.pos[1][1]) next = scope.table[cell.y - 1] ? scope.table[cell.y - 1][cell.x] : false;
                }

                // Si la próxima celda no esta vacía
                if(!next || next.hasOwnProperty('empty')){
                    // si es vertical de arriba a abajo
                    if(parent.vertical && parent.pos[0][1] > parent.pos[1][1]){
                        // último elemento, ya que va al revés
                        next = scope.table[ parent._word[parent._word.length - 1].y ][ parent._word[parent._word.length - 1].x ];
                    } else {
                        next = scope.table[ parent._word[0].y ][ parent._word[0].x ];
                    }
                }
                scope.selectWord(next);
            }; // changeCell()


            /**
             * Verifica si el crucigrama es correcto o no
             */
            scope.verify = function () {
                // Contadores
                var total = 0,
                    rightAnswers = 0;

                // Empezamos a recorrer todas las palabras y sumando
                scope.words.forEach(function(word){
                    // Total de letras
                    total += word._word.length;

                    // Contamos las letras correctas
                    rightAnswers += word._word.filter(function(letter){

                        //08 08 2014 -  Maria Giraldo, se añade validación de letras estáticas
                        if (letter.init_letter != '' && letter.init_letter === letter.letter){
                            return letter.letter === letter.init_letter;
                        }

                       // return letter.input === letter.init_letter;
                        return letter.input === letter.letter;
                    }).length;

                });

                // se resta 1 porque se desborda
                total = total - 1;

                if (total === rightAnswers) {
                    scope.success = true;
                    scope.$root.isNextEnabled = true;
                }
                else {
                    scope.failure = true;
                }
            }


            scope.onClick = function() {
                console.log("click");
                var cell = scope.selectedCell, // alias
                    next = false, // siguiente celda
                    parent = cell.$parent;

                /*
                 // si el input no tiene nada, volvemos.
                 if(cell.input === '') return;
                 // solo letras. No espacios
                 if(! cell.input.match("^[A-ZÑ]+$ ")){
                 cell.input = cell.input.slice(0, -1);
                 return;
                 }
                 */

                // Cambia a mayúsculas
                cell.input = cell.input.toUpperCase();

                console.log("aca ");
                console.log(cell);



            }

            // ============================================================================
            // IMPORTANTE!!!! IMPIDE EL USO DE LA BARRA ESPACIADORA EN EL CRUCIGRAMA
            // ============================================================================
            element.bind("keyup keypress keydown", function (e) {
                if(e.keyCode === 32){
                    e.preventDefault();
                }
            });



        }
    };
});
