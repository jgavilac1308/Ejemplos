// ===========================================================================
// Importante: Este módulo pertenece a la primera guía de español de primero
// ===========================================================================
var appManager = AppManager();
var esp103_ = angular.module('esp103_', ['activities']);

appManager.configModule(esp103_, {
  resources: '../resources/01/esp/03_/',
  farewell: 'Muy bien amiguito, ahora ya conoces el alfabeto.',
  routes: [
    {
      name: '/conceptualizacion-1',
      templateUrl: 'con1',
      controller: 'Con1Ctrl',
      title:"Lección 3: El abecedario"
    },
    { 
      name: '/conceptualizacion-2', 
      templateUrl: 'con2', 
      controller: 'Con2Ctrl',
      title:"Lección 3: El abecedario"
    },
    {
      name: '/conceptualizacion-3',
      templateUrl: 'con3',
      controller: 'Con3Ctrl',
      title:"Lección 3: El abecedario"
    },
    { 
      name: '/actividad-1', 
      templateUrl: 'act1', 
      controller: 'Act1Ctrl',
      title:"Actividad N° 1 de conceptualización"
    },
    { 
      name: '/actividad-1-2', 
      templateUrl: 'act1-2', 
      controller: 'Act1-2Ctrl',
      title:"Actividad N° 1 de conceptualización"
    },
    { 
      name: '/actividad-1-3', 
      templateUrl: 'act1-3', 
      controller: 'Act1-3Ctrl',
      title:"Actividad N° 1 de conceptualización"
    },
    { 
      name: '/actividad-1-4', 
      templateUrl: 'act1-4', 
      controller: 'Act1-4Ctrl',
      title:"Actividad N° 1 de conceptualización"
    },
     { 
      name: '/actividad-1-5', 
      templateUrl: 'act1-5', 
      controller: 'Act1-5Ctrl',
      title:"Actividad N° 1 de conceptualización"
    },
    { 
      name: '/actividad-2', 
      templateUrl: 'act2', 
      controller: 'Act2Ctrl',
      title:"Actividad N° 2 de conceptualización"
    },
    { 
      name: '/actividad-2-1', 
      templateUrl: 'act2-1', 
      controller: 'Act2-1Ctrl',
      title:"Actividad N° 2 de conceptualización"
    },
    { 
      name: '/actividad-2-2', 
      templateUrl: 'act2-2', 
      controller: 'Act2-2Ctrl',
      title:"Actividad N° 2 de conceptualización"
    },
    { 
      name: '/actividad-2-3', 
      templateUrl: 'act2-3', 
      controller: 'Act2-3Ctrl',
      title:"Actividad N° 2 de conceptualización"
    },
    { 
      name: '/actividad-2-4', 
      templateUrl: 'act2-4', 
      controller: 'Act2-4Ctrl',
      title:"Actividad N° 2 de conceptualización"
    },
    { 
      name: '/actividad-2-5', 
      templateUrl: 'act2-5', 
      controller: 'Act2-5Ctrl',
      title:"Actividad N° 2 de conceptualización"
    },
    { 
      name: '/actividad-2-6', 
      templateUrl: 'act2-6', 
      controller: 'Act2-6Ctrl',
      title:"Actividad N° 2 de conceptualización"
    },
    { 
      name: '/actividad-2-7', 
      templateUrl: 'act2-7', 
      controller: 'Act2-7Ctrl',
      title:"Actividad N° 2 de conceptualización"
    },
    { 
      name: '/actividad-2-8', 
      templateUrl: 'act2-8', 
      controller: 'Act2-8Ctrl',
      title:"Actividad N° 2 de conceptualización"
    },
    { 
      name: '/actividad-2-9', 
      templateUrl: 'act2-9', 
      controller: 'Act2-9Ctrl',
      title:"Actividad N° 2 de conceptualización"
    },
    { 
      name: '/actividad-3', 
      templateUrl: 'act3', 
      controller: 'Act3Ctrl',
      title:"Actividad N° 3 de conceptualización"
    },
    { 
      name: '/actividad-3-1', 
      templateUrl: 'act3-1', 
      controller: 'Act3-1Ctrl',
      title:"Actividad N° 3 de conceptualización"
    },
    { 
      name: '/actividad-3-2', 
      templateUrl: 'act3-2', 
      controller: 'Act3-2Ctrl',
      title:"Actividad N° 3 de conceptualización"
    },
    { 
      name: '/actividad-4', 
      templateUrl: 'act4', 
      controller: 'Act4Ctrl',
      title:"Actividad N° 4 "
    },
    { 
      name: '/actividad-4-2', 
      templateUrl: 'act4-2', 
      controller: 'Act4-2Ctrl',
      title:"Actividad N° 4 "
    },
    { 
      name: '/actividad-5', 
      templateUrl: 'act5', 
      controller: 'Act5Ctrl',
      title:"Actividad N° 5 "
    },
    { 
      name: '/actividad-5-1', 
      templateUrl: 'act5-1', 
      controller: 'Act5-1Ctrl',
      title:"Actividad N° 5 "
    }

  ]

  
});

esp103_.controller('Con1Ctrl', function($scope){
  $scope.activateNext = function () {
    $scope.$root.isNextEnabled = true;
  };
});

esp103_.controller('Con2Ctrl', function($scope, $sce){
  var regex = null, // Regex auxiliary variable
    completedLetters = 0; // Contador

  $scope.letters = [
    {
      letter: "a",
      name: "a",
      title: "avión"
    },
    {
      letter: "b",
      name: "be",
      title: "balón"
    },
    {
      letter: "c",
      name: "ce",
      title: "casa"
    },
    {
      letter: "d",
      name: "de",
      title: "dado"
    },
    {
      letter: "e",
      name: "e",
      title: "elefante"
    },
    {
      letter: "f",
      name: "efe",
      title: "flor"
    },
    {
      letter: "g",
      name: "ge",
      title: "gato"
    },
    {
      letter: "h",
      name: "hache",
      title: "hoja"
    },
    {
      letter: "i",
      name: "i",
      title: "iglesia"
    },
    {
      letter: "j",
      name: "jota",
      title: "jugo"
    },
    {
      letter: "k",
      name: "ka",
      title: "kiosco"
    },
    {
      letter: "l",
      name: "ele",
      title: "limón"
    },
    {
      letter: "m",
      name: "eme",
      title: "manzana"
    },
    {
      letter: "n",
      name: "ene",
      title: "naranja"
    },
    {
      letter: "ñ",
      name: "eñe",
      title: "ñandú"
    },
    {
      letter: "o",
      name: "o",
      title: "olla"
    },
    {
      letter: "p",
      name: "pe",
      title: "paleta"
    },
    {
      letter: "q",
      name: "cu",
      title: "queso"
    },
    {
      letter: "r",
      name: "ere",
      title: "ratón"
    },
    {
      letter: "s",
      name: "ese",
      title: "silla"
    },
    {
      letter: "t",
      name: "te",
      title: "tomate"
    },
    {
      letter: "u",
      name: "u",
      title: "uvas"
    },
    {
      letter: "v",
      name: "ve",
      title: "vaca"
    },
    {
      letter: "w",
      name: "ve doble",
      title: "wilson"
    },
    {
      letter: "x",
      name: "equis",
      title: "xilófono"
    },
    {
      letter: "y",
      name: "ye",
      title: "yate"
    },
    {
      letter: "z",
      name: "zeta",
      title: "zanahoria"
    }
  ];

  $scope.selectedLetter = false; // Letra seleccionada en cada momento

  // Añadimos la propiedad src a cada una
  $scope.letters.forEach(function (l) {
    // Recurso de la imagen
    if(l.letter !== 'ñ') l.src = l.letter;
    else l.src = 'n_'; // para la ñ

    regex = new RegExp(l.letter, "g");

    // Modifica el título en base a la letra, añadiendo strong
    l.title = l.title.replace(regex, '<strong>' + l.letter + '</strong>')
  });


  /**
   * Remueve la letra al dar click.
   * @param letter
   */
  $scope.remove = function (letter) {
    $scope.selectedLetter = letter; // selecciona la letra
    letter.hide = true; // oculta

    completedLetters += 1;

    // Fin de la actividad
    if(completedLetters === $scope.letters.length) {
      $scope.$root.isNextEnabled = true;
      $scope.success = true;
    }
  };

  /**
   * filtra el html antes de usarlo de forma segura.
   */
  $scope.sanitize = function (str) {
    return $sce.trustAsHtml(str);
  };

});

esp103_.controller('Con3Ctrl', function($scope,$sce,$timeout){
  $scope.$root.isNextEnabled = false; // Activamos el siguiente link

  $scope.input = '';
  $scope.selectedItem = false; // elemento seleccionado

  $scope.items = [
    {
      img: "cometa",
      alt: "Imagen de  árboles de naranjo y manzano que representan  el primer eslabón en la cadena alimentaria, o los productores.",
      style: 'background-color: transparent!important;',
      audio: 'cometa',
      letters:"cometa".split('')

    },
    {
      img: "dado",
      alt: "Imagen que contiene un caballo negro y café, dos ovejas blancas y tres cebras, todos ellos se están alimentando de hierva o pasto.",
      style: 'background-color: transparent!important;',
      audio: 'dado',
      letters:"dado".split('')

    },
    {
      img: "luna",
      alt: "Imagen que contiene varios animales que hacen parte del grupo de consumidores de segundo orden, estos animales son: león,  tigre y cocodrilo.",
      style: 'background-color: transparent!important;',
      audio: 'luna',
      letters:"luna".split('')
    },
    {
      img: "maleta",
      alt: "Imagen que contiene diferentes tipos de hongos los cuales hacen parte de los descomponedores en la cadena alimenticia.",
      style: 'background-color: transparent!important;',
      audio: 'maleta',
      letters:"maleta".split('')
    },
        {
      img: "nido",
      alt: "Imagen que contiene varios animales que hacen parte del grupo de consumidores de segundo orden, estos animales son: león,  tigre y cocodrilo.",
      style: 'background-color: transparent!important;',
      audio: 'nido',
      letters:"nido".split('')
    },    {
      img: "pelota",
      alt: "Imagen que contiene varios animales que hacen parte del grupo de consumidores de segundo orden, estos animales son: león,  tigre y cocodrilo.",
      style: 'background-color: transparent!important;',
      audio: 'pelota',
      letters:"pelota".split('')
    }
  ];
  

  // Para usar el html en angular
    $scope.sanitize = function (item) {
      return $sce.trustAsHtml(item);
    } 

  $scope.$root.selectItem = function (item) {
    //funcion que temporisa las letras   
    $scope.itemAnimate = 0;

    var countUp = function() {
          $scope.itemAnimate+= 1;

          if($scope.itemAnimate < item.letters.length){
            $timeout(countUp, 500);
          }

          if($scope.itemAnimate === item.letters.length){
            $("#audio-"+item.audio)[0].play();
          }
          
      }

    $timeout(countUp, 500);

      $scope.selectedItem = item; // seleccionamos el objeto
      item.complete = true // completamos el item para mostrar la imagen 
      $scope.letters = item.letters;

      var completedItems = $scope.items.filter(function (i) {
        return i.complete;
      }).length;

      if(completedItems >= $scope.items.length) { 
        $scope.$root.isNextEnabled = true;
      }


  };

     
});

esp103_.controller('Act1Ctrl', function($scope){
  $scope.data = {
    items: [
      { letter: 'a' },
      { letter: 'h' },
      { letter: 'c' },
      { letter: 'd' },
      { letter: 'e' },
      { letter: 'f' },
      { letter: 'o' },
      { letter: 'i' },
      { letter: 'u' }
    ],
    itemTemplate: '<div style="font-size: 65px; width: 70px; cursor: move; text-align:center;">{{ item.letter }}</div>',
    showIf: "letter",
    targets: 5,
    chances: 6,
    minRightAnswers: 3,
    pass: function (target) {
      return "aeiou".search(target.letter) >= 0;
    }
  };
});

esp103_.controller('Act1-2Ctrl', function($scope){
 $scope.$root.isNextEnabled = false; // Activa el botón de siguiente
  $scope.preserveOriginal ='keep' //define si el item que se arrastra se conserva
  $scope.rightAnswers = 0
  $scope.items = [
    {
      letters: [{t:'a'},{t:'b'},{t:'c'},{t:'d'},{t:'e'},{t:'f'},{t:'g'},{t:'h'},{t:'i'}]
    },
    {
      letters: [{t:'j'},{t:'k'},{t:'l'},{t:'m'},{t:'n'},{t:'ñ'},{t:'o'},{t:'p'},{t:'q'}]
    },
    {
      letters: [{t:'r'},{t:'s'},{t:'t'},{t:'u'},{t:'v'},{t:'w'},{t:'x'},{t:'y'},{t:'z'}]
    },
  ];
  $scope.itemsClone = [
      { 
        text: "a",
      },
      { 
        text: "b",
      },
      { 
        text: "c",
      },
      { 
        text: "d",
      },
      { 
        text: "e",
      },
      { 
        text: "f",
      },
       { 
        text: "g",
      },
      { 
        text: "h",
      },
      { 
        text: "i",
      },
      { 
        text: "j",
      },
      { 
        text: "k",
      },
      { 
        text: "l",
      },
       { 
        text: "m",
      },
      { 
        text: "n",
      },
      { 
        text: "ñ",
      },
      { 
        text: "o",
      },
      { 
        text: "p",
      },
      { 
        text: "q",
      },
       { 
        text: "r",
      },
      { 
        text: "s",
      },
      { 
        text: "t",
      },
      { 
        text: "u",
      },
      { 
        text: "v",
      },
       { 
        text: "w",
      },
      { 
        text: "x",
      },
       { 
        text: "y",
      },
      { 
        text: "z",
      }

  ];

  // asiganmos las oportunidades de arrastre de los targets
  $scope.items.forEach(function (i) {
      i.letters.forEach(function (l) {  
          l.drop = true
          l.chances = 3
      });
  });

  // asiganmos las oportunidades de arrastre de las letras
  $scope.itemsClone.forEach(function (i) {
    i.chances = 3
  });  

  // ordena el array de forma aleatoria usando el algoritmo de Fisher-Yates
  self.shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }; 

  $scope.itemsClone = self.shuffleArray($scope.itemsClone);


  $scope.$root.dropCallback = function (e, ui, target) {
        var completedTargets = 0;
        var completedLetters = 0;
        // revisa el modelo interno y compara
        if( target.t === target.model.text ){
          // Respuesta correcta
          target.drop = false; // deshabilita el drop
          target.wrong = false;
          target.right = true;
          target.answer = target.model.text
          $scope.rightAnswers ++
          // ocultamos la letra para q no se pueda arrastrar
          $scope.itemsClone.forEach(function (i) {
            if(i.text === target.model.text ){i.chances = 0}
          });   
        } else {
          // Respuesta incorrecta
          target.chances -= 1;
          target.wrong = true;
          // ocultamos la letra para q no se pueda arrastrar
          $scope.itemsClone.forEach(function (i) {
            if(i.text === target.model.text ){i.chances -- ;console.log(i);}
          });   

          if(target.chances === 0) {
            target.drop = false; // deshabilita el drop
            target.disabled = true;
            target.wrong = true;
          }
        }

        // Fin de la actividad
        $scope.items.forEach(function (i) {
          i.letters.forEach(function (l) {  
              if(l.drop === false){completedTargets++}
          });
        });    

        // Fin de la actividad
        $scope.itemsClone.forEach(function (i) {
          if(i.chances === 0){completedLetters++}
        });    

        if(completedTargets === $scope.itemsClone.length || completedLetters === $scope.itemsClone.length) {
          if($scope.rightAnswers <= 25){
          // fracaso
            $scope.failure = true;
              return true;
          } else {
            // éxito
            $scope.success = true;
            $scope.$root.isNextEnabled = true; // Activa el botón de siguiente
            return true;
          }
        }
      };

});

esp103_.controller('Act1-3Ctrl', function($scope){
$scope.items = [
    {
      name: "a",
      text: "a"
    },
    {
      name: "b",
      text: "b"
    },
    {
      name: "c",
      text: "c"
    },
    {
      name: "d",
      text: "d"
    },
    {
      name: "e",
      text: "e"
    },
    {
      name: "f",
      text: "f",
    },
     {
      name: "g",
      text: "g"
    },
       {
      name: "h",
      text: "h"
    },
       {
      name: "i",
      text: "i"
     },
     {
      name: "j",
      text: "j"
    }
    
  ];

  $scope.options = {
    items: $scope.items,
    chances: 10,
    customClass: 'items-small',
    minRightAnswers: 10,
    chancesPerItem : 2,
    itemsPerRow: 4
  };
});

esp103_.controller('Act1-4Ctrl', function($scope){
$scope.items = [
    {
      name: "k",
      text: "k"
    },
    {
      name: "l",
      text: "l"
    },
    {
      name: "m",
      text: "m"
    },
    {
      name: "n",
      text: "n"
    },
    {
      name: "ñ",
      text: "ñ"
    },
    {
      name: "o",
      text: "o",
    },
     {
      name: "p",
      text: "p"
    },
       {
      name: "q",
      text: "q"
    },
       {
      name: "r",
      text: "r"
     },
     {
      name: "s",
      text: "s"
    }
    
  ];

  $scope.options = {
    items: $scope.items,
    chances: 10,
    minRightAnswers: 10,
    customClass: 'items-small',
    chancesPerItem : 2,
    itemsPerRow: 4
  };
});

esp103_.controller('Act1-5Ctrl', function($scope){
$scope.items = [
    {
      name: "t",
      text: "t"
    },
    {
      name: "u",
      text: "u"
    },
    {
      name: "v",
      text: "v"
    },
    {
      name: "w",
      text: "w"
    },
    {
      name: "x",
      text: "x"
    },
    {
      name: "y",
      text: "y",
    },
     {
      name: "z",
      text: "z"
    }
  ];

  $scope.options = {
    items: $scope.items,
    chances: 7,
    minRightAnswers: 7,
    customClass: 'items-small',
    chancesPerItem : 2,
    itemsPerRow: 4
  };
});

esp103_.controller('Act2Ctrl', function($scope){
  $scope.items = [
    {
      resource:"sound",
      sound:"b",
      alt: "ìcono sonido",
      text: 'B',
      answer2:'b'
    },
    {
      resource:"sound",
      sound:"c",
      alt: "ìcono sonido",
      text:'C',
      answer2:'c'
    },
    {
      resource:"sound",
      sound:"d",
      alt: "ìcono sonido",
      text:'D',
      answer2:'d'
    },
    {
      resource:"sound",
      sound:"e",
      alt: "ìcono sonido",
      text:'E',
      answer2:'e'
    },
    {
      resource:"sound",
      sound:"f",
      alt: "ìcono sonido",
      text:'F',
      answer2:'f'
    },
   {
      resource:"sound",
      sound:"g",
      alt: "ìcono sonido",
      text:'G',
      answer2:'g'
    },
    {
      resource:"sound",
      sound:"h",
      alt: "ìcono sonido",
      text:'H',
      answer2:'h'
    },
    {
      resource:"sound",
      sound:"j",
      alt: "ìcono sonido",
      text:'J',
      answer2:'j'
    },
    {
      resource:"sound",
      sound:"k",
      alt: "ìcono sonido",
      text:'K',
      answer2:'k'
    }
  ];

  $scope.options = {
    items: $scope.items,
    chances: 9,
    minRightAnswers: 7,
    itemsPerRow : 3
  };
});
esp103_.controller('Act2-1Ctrl', function($scope){
  $scope.items = [
    {
      resource:"sound",
      sound:"l",
      alt: "ìcono sonido",
      text: 'L',
      answer2:'l'
    },
    {
      resource:"sound",
      sound:"m",
      alt: "ìcono sonido",
      text:'M',
      answer2:'m'
    },
    {
      resource:"sound",
      sound:"n",
      alt: "ìcono sonido",
      text:'N',
      answer2:'n'
    },
    {
      resource:"sound",
      sound:"en",
      alt: "ìcono sonido",
      text:'Ñ',
      answer2:'ñ'
    },
    {
      resource:"sound",
      sound:"p",
      alt: "ìcono sonido",
      text:'P',
      answer2:'p'
    },
    {
      resource:"sound",
      sound:"q",
      alt: "ìcono sonido",
      text:'Q',
      answer2:'q'
    },
    {
      resource:"sound",
      sound:"r",
      alt: "ìcono sonido",
      text:'R',
      answer2:'r'
    },
    {
      resource:"sound",
      sound:"s",
      alt: "ìcono sonido",
      text:'S',
      answer2:'s'
    },
    {
      resource:"sound",
      sound:"t",
      alt: "ìcono sonido",
      text:'T',
      answer2:'t'
    }
  ];

  $scope.options = {
    items: $scope.items,
    chances: 9,
    minRightAnswers: 7,
    itemsPerRow : 3
  };
});

esp103_.controller('Act2-2Ctrl', function($scope){
  $scope.items = [
    {
      resource:"sound",
      sound:"w",
      alt: "ìcono sonido",
      text: 'W',
      answer2:'w'
    },
    {
      resource:"sound",
      sound:"v",
      alt: "ìcono sonido",
      text:'V',
      answer2:'v'
    },
    {
      resource:"sound",
      sound:"x",
      alt: "ìcono sonido",
      text:'X',
      answer2:'x'
    },
    {
      resource:"sound",
      sound:"y",
      alt: "ìcono sonido",
      text:'Y',
      answer2:'y'
    },
    {
      resource:"sound",
      sound:"z",
      alt: "ìcono sonido",
      text:'Z',
      answer2:'z'
    }
  ];

  $scope.options = {
    items: $scope.items,
    chances: 5,
    minRightAnswers: 4,
    itemsPerRow : 3
  };
});
esp103_.controller('Act2-3Ctrl', function($scope){
  $scope.items = [
    {
      name: "avión",
      letter: "a"
    },
    {
      name: "balón",
      letter: "b"
    },
    {
      name: "casa",
      letter: "c"
    },
    {
      name: "dado",
      letter: "d"
    }
  ];

  $scope.items.forEach(function (item) {
    item.src = item.letter;
  });

  $scope.description = "Las letras del abecedario pueden escribirse de diferentes formas y tamaños, pero su nombre nunca cambia. Arrastra el objeto hacia el cuadro que contiene la letra con la cual comienza su nombre.";

  $scope.data = {
    data: $scope.items,
    chances: 8,
    minRightAnswers: 3,
    randomItems: true,
    randomTargets: true,
    padding: false,
    border: false
  };
});

esp103_.controller('Act2-4Ctrl', function($scope){
  $scope.items = [
    {
      name: "elefante",
      letter: "e"
    },
    {
      name: "flor",
      letter: "f"
    },
    {
      name: "gato",
      letter: "g"
    },
    {
      name: "hoja",
      letter: "h"
    }
  ];

  $scope.items.forEach(function (item) {
    item.src = item.letter;
  });

  $scope.description = "Arrastra el objeto hacia el cuadro que contiene la letra con la cual comienza su nombre.";

  $scope.data = {
    data: $scope.items,
    chances: 8,
    minRightAnswers: 3,
    randomItems: true,
    randomTargets: true,
    padding: false,
    border: false
  };
});

esp103_.controller('Act2-5Ctrl', function($scope){
  $scope.items = [
    {
      name: "iglesia",
      letter: "i"
    },
    {
      name: "jugo",
      letter: "j"
    },
    {
      name: "limón",
      letter: "l"
    },
    {
      name: "kiosco",
      letter: "k"
    }
  ];

  $scope.items.forEach(function (item) {
    item.src = item.letter;
  });

  $scope.description = "Arrastra el objeto hacia el cuadro que contiene la letra con la cual comienza su nombre.";

  $scope.data = {
    data: $scope.items,
    chances: 8,
    minRightAnswers: 3,
    randomItems: true,
    randomTargets: true,
    padding: false,
    border: false
  };
});

esp103_.controller('Act2-6Ctrl', function($scope){
  $scope.items = [
    {
      name: "manzana",
      letter: "m"
    },
    {
      name: "naranja",
      letter: "n"
    },
    {
      name: "ñandú",
      letter: "ñ"
    },
    {
      name: "olla",
      letter: "o"
    }
  ];

  $scope.items.forEach(function (item) {
    if(item.letter !== "ñ") item.src = item.letter;
    else item.src = "n_";
  });

  $scope.description = "Arrastra el objeto hacia el cuadro que contiene la letra con la cual comienza su nombre.";

  $scope.data = {
    data: $scope.items,
    chances: 8,
    minRightAnswers: 3,
    randomItems: true,
    randomTargets: true,
    padding: false,
    border: false
  };
});

esp103_.controller('Act2-7Ctrl', function($scope){
  $scope.items = [
    {
      name: "paleta",
      letter: "p"
    },
    {
      name: "queso",
      letter: "q"
    },
    {
      name: "ratón",
      letter: "r"
    },
    {
      name: "silla",
      letter: "s"
    }
  ];

  $scope.items.forEach(function (item) {
    item.src = item.letter;
  });

  $scope.description = "Arrastra el objeto hacia el cuadro que contiene la letra con la cual comienza su nombre.";

  $scope.data = {
    data: $scope.items,
    chances: 8,
    minRightAnswers: 3,
    randomItems: true,
    randomTargets: true,
    padding: false,
    border: false
  };
});

esp103_.controller('Act2-8Ctrl', function($scope){
  $scope.items = [
    {
      name: "tomate",
      letter: "t"
    },
    {
      name: "uvas",
      letter: "u"
    },
    {
      name: "vaca",
      letter: "v"
    },
    {
      name: "Wilson",
      letter: "w"
    }
  ];

  $scope.items.forEach(function (item) {
    item.src = item.letter;
  });

  $scope.description = "Arrastra el objeto hacia el cuadro que contiene la letra con la cual comienza su nombre.";

  $scope.data = {
    data: $scope.items,
    chances: 8,
    minRightAnswers: 3,
    randomItems: true,
    randomTargets: true,
    padding: false,
    border: false
  };
});

esp103_.controller('Act2-9Ctrl', function($scope){
  $scope.items = [
    {
      name: "xilófono",
      letter: "x"
    },
    {
      name: "yate",
      letter: "y"
    },
    {
      name: "zanahoria",
      letter: "z"
    }
  ];

  $scope.items.forEach(function (item) {
    item.src = item.letter;
  });

  $scope.description = "Arrastra el objeto hacia el cuadro que contiene la letra con la cual comienza su nombre.";

  $scope.data = {
    data: $scope.items,
    chances: 8,
    minRightAnswers: 3,
    randomItems: true,
    randomTargets: true,
    padding: false,
    border: false
  };
});

esp103_.controller('Act3Ctrl', function($scope){
  $scope.items = [
    {
      name: "hoja",
      pattern: [0],
      resource: "h"
    },
    {
      name: "manzana",
      pattern: [0, 3],
      resource: "m"
    },
    {
      name: "flor",
      pattern: [0, 3],
      resource: "f"
    },
    {
      name: "zanahoria",
      pattern: [0, 4],
      resource: "z"
    }
  ];

  $scope.options = {
    items: $scope.items,
    chances: 7,
    minRightAnswers: 4
  };
});

esp103_.controller('Act3-1Ctrl', function($scope){
  $scope.items = [
    {
      name: "kiosco",
      pattern: [0, 3, 4],
      resource: "k"
    },
    {
      name: "naranja",
      pattern: [0, 2, 5],
      resource: "n"
    },
    {
      name: "xilófono",
      pattern: [0, 4, 6],
      resource: "x"
    },
    {
      name: "ñandú",
      pattern: [0, 2, 3],
      resource: "n_"
    }
  ];

  $scope.options = {
    items: $scope.items,
    chances: 12,
    minRightAnswers: 7
  };
});

esp103_.controller('Act3-2Ctrl', function($scope){
  $scope.items = [
    {
      name: "balón",
      pattern: [0, 2, 4],
      resource: "b"
    },
    {
      name: "uvas",
      pattern: [1, 3],
      resource: "u"
    },
    {
      name: "paleta",
      pattern: [0, 2, 4],
      resource: "p"
    },
    {
      name: "gato",
      pattern: [0, 2],
      resource: "g"
    }
  ];

  $scope.options = {
    items: $scope.items,
    chances: 10,
    minRightAnswers: 5
  };
});

esp103_.controller('Act4Ctrl', function ($scope) {
$scope.items = [
    {
 
     
      pattern: [2,6,11,15,20,24],
      text:"a b c d e f g h i j k l m n ñ o p q r s t u v w x y z",

    }
  ];

  $scope.options = {
    items: $scope.items,
    chances: 6,
    minRightAnswers: 5,
    itemsPerRow : 1,
    chancesPerItem: 3,
    lettersStyles: "width: 10%;font-size: 51px;margin: 5px;background: #d44a27;text-align: center; color:white ;margin-top: 20px;margin-bottom: 30px;",
    inputsStyles: "margin-bottom: 0px;width: 100%;background: white;border: 1px solid #d44a27;font-size: 51px;color: #d44a27!important"

  };
});


esp103_.controller('Act4-2Ctrl', function ($scope) {
$scope.items = [
    {
 
     
      pattern: [0,3,6,9,12,15,18,21,24],
      text:"a b c d e f g h i j k l m n ñ o p q r s t u v w x y z ",

    }
  ];

  $scope.options = {
    items: $scope.items,
    chances: 9,
    minRightAnswers: 5,
    itemsPerRow : 1,
    chancesPerItem: 3,
    lettersStyles: "width: 10%;font-size: 51px;margin: 5px;background: #d44a27;text-align: center; color:white ;margin-top: 20px;margin-bottom: 30px;",
    inputsStyles: "margin-bottom: 0px;width: 100%;background: white;border: 1px solid #d44a27;font-size: 51px;color: #d44a27!important"
  };
});
esp103_.controller('Act5Ctrl', function ($scope) {
  $scope.data = {
    chances: 1,
    noNumber: true,
    chancesperitem: 4,
    minRightAnswers: 8,
    answerwidth:'13%',
    customClass: 'items-big',
    questions:[
      {
        text:'mamá',
        items: [
        { text: "m", answer: true },
        { text: "a", answer: true },
        { text: "d", answer: false },
        { text: "m", answer: true },
        { text: "s", answer: false },
        { text: "r", answer: false },
        { text: "á", answer: true }
      ]
      },
      {
        text:'sapo',
        items: [
        { text: "m", answer: false },
        { text: "s", answer: true },
        { text: "a", answer: true },
        { text: "m", answer: false },
        { text: "p", answer: true },
        { text: "o", answer: true },
        { text: "l", answer: false }
      ]
       },
    ]
  };
});

esp103_.controller('Act5-1Ctrl', function ($scope) {
  $scope.data = {
    chances: 1,
    noNumber: true,
    chancesperitem: 4,
    minRightAnswers: 8,
    customClass: 'items-big',
    answerwidth:'13%',
    questions:[
      {
        text:'casa',
        items: [
        { text: "c", answer: true },
        { text: "a", answer: true },
        { text: "d", answer: false },
        { text: "m", answer: false },
        { text: "s", answer: true },
        { text: "r", answer: false },
        { text: "a", answer: true }
      ],
     
      },
      {
             text:'papá ',
        items: [
        { text: "p", answer: true },
        { text: "s", answer: false },
        { text: "a", answer: true },
        { text: "m", answer: false },
        { text: "p", answer: true },
        { text: "á", answer: true },
        { text: "l", answer: false }
      ]
       },
    ]
  };
});


