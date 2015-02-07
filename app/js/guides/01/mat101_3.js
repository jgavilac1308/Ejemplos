var appManager = AppManager();
var mat101_3 = angular.module('mat101_3', ['activities']);

appManager.configModule(mat101_3, {
	resources: '../resources/01/mat/guide3/01',
  evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, actividad de evidencia, guía 3, lección 1; descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
  evidencesSound: true,
	farewell: '¡Muy bien!, ahora ya conoces las cantidades mayores, menores o iguales.',
	routes: [
		{ 
			name: '/competencias', 
			templateUrl: 'comp', 
			controller: 'CompCtrl',
			title:"Estándares básicos de competencias"
		},
		{ 
	      name: '/conceptualizacion-1', 
	      templateUrl: 'con1', 
	      controller: 'Con1Ctrl',
	      title: 'Lección 1: Cantidad mayor, menor o igual'
	    },		
		{ 
			name: '/actividad-1', 
			templateUrl: 'act1', 
			controller: 'Act1Ctrl',
			title:"Actividad 1 | Lección 1"
		},
		{ 
			name: '/actividad-2', 
			templateUrl: 'act2', 
			controller: 'Act2Ctrl',
			title:"Actividad 2 | Lección 1"
		},
		{ 
			name: '/actividad-3', 
			templateUrl: 'act3', 
			controller: 'Act3Ctrl',
			title:"Actividad 3 | Lección 1"
		},
		{ 
			name: '/actividad-4', 
			templateUrl: 'act4', 
			controller: 'Act4Ctrl',
			title:"Actividad 4 | Lección 1",
			
		},
		{ 
			name: '/actividad-5', 
			templateUrl: 'act5', 
			controller: 'Act5Ctrl',
			title:"Actividad 5 | Lección 1",
		}
	]
	
});

mat101_3.controller('CompCtrl', function($scope){
	$scope.data = [
		{
			title: 'Estándar de competencia:',
			text1: 'Reconozco significados del número en diferentes contextos (medición, conteo, comparación, codificación, localización entre otros). Pensamiento numérico y sistemas numéricos.',
		},
		{
			title: 'Elementos de competencia:',
			text1: 'Identifica  que las cantidades son mayor que,  menor que o igual en situaciones de la vida cotidiana.',
		}
		
	];
});

mat101_3.controller('Con1Ctrl', function($scope){
 $scope.data = {
    ext: '.png',
    customClass: 'width-700-400',
    items: [
      { 
        number:'1',
        src: "mayorque",
        alt: "Grupo de cinco niños y grupo de tres niñas y el signo mayor que, indicando que en la imagen hay mayor cantidad de niños que de niñas. Además aparece  la imagen de un joven con la mano derecha en la cabeza, de este modo el codo forma el signo mayor que",
      },
      { 
        number:'2',
        alt: "Estanque con tres peces de color naranja saltando y un lago con cinco hermosos patos de color blanco. Además la indicación de menor que, haciendo referencia que en la imagen hay menos peces que patos.También hay un niño con la mano izquierda en la cabeza, y al doblar el codo para poner su mano en la cabeza se forma el signo menor que",
        src: "menor que"
      },
      { 
        number:'3',
        alt: "Dos estanques con tres lindos peces de color naranja y el signo igual que hace referencia a que en ambos estanques hay el mismo número de peces",
        src: "igual que"
      }
    ]
  };
});

mat101_3.controller('Act1Ctrl', function($scope){
  $scope.$root.isNextEnabled = false; // Activa el botón de siguiente
  $scope.preserveOriginal ='keep' //define si el item que se arrastra se conserva
  $scope.rightAnswers = 0
  $scope.rightAnswer = false
  $scope.wrongAnswer = false
  $scope.completed = 0
  $scope.items = [
      { 
        text: '>',
        l:66  , t:11  
      },
      { 
        text: '<',
        l:29  , t:11  
      },
      { 
        text: '=',
        l:11  , t:11  
      }
  ];

  $scope.targets = [
      { 
      	text: '=',
        drop: true,
        l:17.8, t:10
      },
      { 
      	text: '>',
        drop: true,
        l:66, t:8
      },
      { 
      	text: '>',
        drop: true,
        l:17.8, t:31
      },
      { 
      	text: '<',
        drop: true,
        l:63, t:30
      }
  ];

  $scope.items.forEach(function (i) {
        i.drop = true
        i.chances = 2
        i.failure = 0
  });

  $scope.$root.dropCallback = function (e, ui, target) {
        // revisa el modelo interno y compara

        if(target.model.text === target.text) {
          // Respuesta correcta
          $scope.rightAnswer = Math.random();
          target.drop = false; // deshabilita el drop
          target.wrong = false;
          target.right =true;
          target.complete = true;  
          $scope.rightAnswers ++
        } else {
          // Respuesta incorrecta
          target.chances -= 1;
          target.model= {};
          $scope.wrongAnswer = Math.random();
          var itemdrag = $scope.items.filter(function(item){ return item.text === target.model.text; });
          itemdrag[0].failure++

          if(target.chances === 0) {
            target.drop = false; // deshabilita el drop
            target.disabled = true;
            target.complete = true;
            target.model= {};
          }
        }


            $scope.completed = $scope.targets.filter(function(target){ return target.complete; }).length;

            if($scope.completed >= $scope.targets.length ) { 
              $scope.$root.isNextEnabled = true; // Activamos el siguiente link
            };
  };
      
      $scope.$root.beforeGoNext = function () {
        if($scope.rightAnswers >= 3) {
          // fracaso
            $scope.success = true;
            return true;
          } else {
            // éxito
            $scope.failure = true;
            return true;
          }
      };
});

mat101_3.controller('Act2Ctrl', function($scope){
	$scope.$root.isNextEnabled = false; // Activa el botón de siguiente
  $scope.preserveOriginal ='keep' //define si el item que se arrastra se conserva
  $scope.rightAnswers = 0
  $scope.rightAnswer = false
  $scope.wrongAnswer = false
  $scope.completed = 0
  $scope.items = [
      { 
        text: '>',
        l:66  , t:11  
      },
      { 
        text: '<',
        l:29  , t:11  
      },
      { 
        text: '=',
        l:11  , t:11  
      }
  ];

  $scope.targets = [
      { 
      	text: '<',
        l:14.4, t:3.5
      },
      { 
      	text: '>',
        l:14.4, t:11
      },
      { 
      	text: '>',
        l:14.4, t:18.5
      },
      { 
      	text: '<',
        l:14.4, t:27.5
      },
      { 
      	text: '=',
        l:14.4, t:35
      }
  ];

  $scope.targets.forEach(function (i) {
        i.drop = true
        i.chances = 2
  });

  $scope.$root.dropCallback = function (e, ui, target) {
        // revisa el modelo interno y compara
        console.log(target.model.text,target.text);
        if(target.model.text === target.text) {
          // Respuesta correcta
          $scope.rightAnswer = Math.random();
          target.drop = false; // deshabilita el drop
          target.wrong = false;
          target.right =true;
          target.complete = true;  
          $scope.rightAnswers ++
        } else {
          // Respuesta incorrecta
          target.chances -= 1;
          target.model = {};
          $scope.wrongAnswer = Math.random();

          if(target.chances === 0) {
            target.drop = false; // deshabilita el drop
            target.disabled = true;
            target.complete = true;
            target.model = {};
          }
        }


            $scope.completed = $scope.targets.filter(function(target){ return target.complete; }).length;

            if($scope.completed >= $scope.targets.length ) { 
              $scope.$root.isNextEnabled = true; // Activamos el siguiente link
            };
  };
      
      $scope.$root.beforeGoNext = function () {
        if($scope.rightAnswers >= 3) {
          // fracaso
            $scope.success = true;
            return true;
          } else {
            // éxito
            $scope.failure = true;
            return true;
          }
      };
});


mat101_3.controller('Act3Ctrl', function ($scope) {
  $scope.$root.isNextEnabled = false; // Activa el botón de siguiente
  $scope.preserveOriginal ='' //define si el item que se arrastra se conserva
  $scope.rightAnswers = 0
  $scope.rightAnswer = false
  $scope.wrongAnswer = false
  $scope.completed = 0
  $scope.images = [
      { 
        img: "4",
        alt: "Cuatro",
        l:58    , t:5  
      },
      { 
        img: "5",
        alt: "Cinco",
        l:47    , t:5  
      },
      { 
        img: "2",
        alt: "Dos",
        l:80    , t:5  
      },
      { 
        img: "/1",
        alt: "Uno",
        l:91    , t:5  
      },
      { 
        img: "9",
        alt: "Nueve",
        l:3  , t:5
      },
      { 
        img: "3",
        alt: "Tres",
        l:69    , t:5 
      },
      { 
        img: "6",
        alt: "Seis",
        l:36  , t:5  
      },
      { 
        img: "7",
        alt: "Siete",
        l:25  , t:5  
      },
      { 
        img: "8",
        alt: "Ocho",
        l:14.5  , t:5  
      },
  ];


  $scope.images.forEach(function (i) {
        i.drop = true
        i.chances = 2
        i.failure = 0
  });

  $scope.$root.dropCallback = function (e, ui, target) {
        // revisa el modelo interno y compara

        if(target.model.img === target.img) {
          // Respuesta correcta
          $scope.rightAnswer = Math.random();
          target.drop = false; // deshabilita el drop
          target.wrong = false;
          target.right =true;
          target.complete = true;  
          $scope.rightAnswers ++
        } else {
          // Respuesta incorrecta
          target.chances -= 1;
          $scope.wrongAnswer = Math.random();
          var itemdrag = $scope.images.filter(function(img){ return img.img === target.model.img; });
          itemdrag[0].failure++

          if(target.chances === 0) {
            target.drop = false; // deshabilita el drop
            target.disabled = true;
            target.complete = true;
          }
        }


            $scope.completed = $scope.images.filter(function(item){ return item.complete; }).length;

            if($scope.completed >= $scope.images.length ) { 
              $scope.$root.isNextEnabled = true; // Activamos el siguiente link
            };
  };
      
      $scope.$root.beforeGoNext = function () {
        if($scope.rightAnswers >= 2) {
          // fracaso
            $scope.success = true;
            return true;
          } else {
            // éxito
            $scope.failure = true;
            return true;
          }
      };
});

mat101_3.controller('Act4Ctrl', function ($scope) {
  $scope.$root.isNextEnabled = false; // Activa el botón de siguiente
  $scope.preserveOriginal ='' //define si el item que se arrastra se conserva
  $scope.rightAnswers = 0
  $scope.rightAnswer = false
  $scope.wrongAnswer = false
  $scope.completed = 0
  $scope.images = [
      { 
        img: "4",
        alt: "Cuatro",
        l:35.5  , t:5.5  
      },
      { 
        img: "5",
        alt: "Cinco",
        l:45.5    , t:5.5  
      },
      { 
        img: "2",
        alt: "Dos",
        l:15  , t:5.5  
      },
      { 
        img: "/1",
        alt: "Uno",
        l:4.7  , t:5.5  
      },
      { 
        img: "9",
        alt: "Nueve",
        l:86.7    , t:5.5  
      },
      { 
        img: "3",
        alt: "Tres",
        l:25  , t:5.5  
      },
      { 
        img: "6",
        alt: "Seis",
        l:55.7    , t:5.5  
      },
      { 
        img: "7",
        alt: "Siete",
        l:66    , t:5.5  
      },
      { 
        img: "8",
        alt: "Ocho",
        l:76    , t:5.5  
      },
  ];


  $scope.images.forEach(function (i) {
        i.drop = true
        i.chances = 2
        i.failure = 0
  });

  $scope.$root.dropCallback = function (e, ui, target) {
        // revisa el modelo interno y compara

        if(target.model.img === target.img) {
          // Respuesta correcta
          $scope.rightAnswer = Math.random();
          target.drop = false; // deshabilita el drop
          target.wrong = false;
          target.right =true;
          target.complete = true;  
          $scope.rightAnswers ++
        } else {
          // Respuesta incorrecta
          target.chances -= 1;
          $scope.wrongAnswer = Math.random();
          var itemdrag = $scope.images.filter(function(img){ return img.img === target.model.img; });
          itemdrag[0].failure++

          if(target.chances === 0) {
            target.drop = false; // deshabilita el drop
            target.disabled = true;
            target.complete = true;
          }
        }


            $scope.completed = $scope.images.filter(function(item){ return item.complete; }).length;

            if($scope.completed >= $scope.images.length ) { 
              $scope.$root.isNextEnabled = true; // Activamos el siguiente link
            };
  };
      
      $scope.$root.beforeGoNext = function () {
        if($scope.rightAnswers >= 2) {
          // fracaso
            $scope.success = true;
            return true;
          } else {
            // éxito
            $scope.failure = true;
            return true;
          }
      };
});

mat101_3.controller('Act5Ctrl', function($scope){
	$scope.data = {
        chancesPerItem: 1,
        minRightAnswers: 2,
        maintext: '<div class="wid-100 fs-20">El primer día llegaron 6 personas.<br>El segundo  día llegaron 3 personas.<br>El tercer día llegaron 2 personas.</div><br><br>',
        imgwidth: '50',
        src: 'jovenleyendo.png',
        alt: 'Niño muy feliz, porque ha estudiado la lección y ahora se dispone a resolver un problema de la vida diaria, utilizando los conocimientos aprendidos en está lección',
        questions: [
            {
                number: 1,
                question: "¿En qué día llegaron más personas?",
                answerstyle: 'width: 33%;margin-bottom: 20px;',
                answers: [
                    {text: "Primer día",answer: true},
                    {text: "Segundo día"},
                    {text: "Tercer  día"}
                ]
            },
            {
                number: 2,
                question: "¿En qué día llegaron menos personas?",
                answerstyle: 'width: 33%;margin-bottom: 20px;',
                answers: [
                    {text: "Primer día"},
                    {text: "Segundo día"},
                    {text: "Tercer  día",answer: true}
                ]
            }
        ]
    };
});
