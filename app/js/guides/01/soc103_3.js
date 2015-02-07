var appManager = AppManager();
var soc103_3 = angular.module('soc103_3', ['activities']);

appManager.configModule(soc103_3, {
	resources: '../resources/01/soc/03_3',
	farewell: '¡Muy bien!, ahora ya conoces las reglas básicas del diálogo.',
	evidencesSound:true,
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, actividad de evidencia, guía 3, lección 3; descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados.',
	routes:[
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
			title: 'Lección 3:   Reglas básicas del diálogo'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Lección 3:   Reglas básicas del diálogo'
		},
    { 
      name: '/conceptualizacion-3', 
      templateUrl: 'con3', 
      controller: 'Con3Ctrl',
      title: 'Lección 3:   Reglas básicas del diálogo'
    },
		{ 
			name: '/actividad-1', 
			templateUrl: 'act1', 
			controller: 'Act1Ctrl',
			title: 'Actividad 1 | Lección 3'
		},
		{ 
			name: '/actividad-2', 
			templateUrl: 'act2', 
			controller: 'Act2Ctrl',
			title: 'Actividad 2 | Lección 3'
		},
		{ 
			name: '/actividad-3', 
			templateUrl: 'act3', 
			controller: 'Act3Ctrl',
			title: 'Actividad 3 | Lección 3'
		},
		{ 
			name: '/actividad-4', 
			templateUrl: 'act4', 
			controller: 'Act4Ctrl',
			title: 'Actividad 4 | Lección 3'
		},
    { 
      name: '/actividad-5', 
      templateUrl: 'act5', 
      controller: 'Act5Ctrl',
      title: 'Actividad 5 | Lección 3'
    },
	]
	
});

soc103_3.controller('CompCtrl', function($scope){
	$scope.data = [
		{
			title: 'Estándar de competencia:',
			text1: 'Reconozco que los recursos naturales son finitos y exigen un uso responsable.'
		},
		{
			title: 'Elementos de competencia:',
			text1: 'Toma conciencia sobre el cuidado de los recursos naturales y básicos para el sostenimiento de la sociedad.'
		}
		
	];
});

soc103_3.controller('Con1Ctrl', function($scope){
  $scope.$root.isNextEnabled = true; // Activa el botón de siguiente
  $scope.items = [
    {
      src: 'dialogar2.png',
      alt: 'de un hombre y una mujer dialogando.',
    }
  ];
});

soc103_3.controller('Con2Ctrl', function($scope,$sce){
  $scope.$root.isNextEnabled = true; // Activa el botón de siguiente
  $scope.items = [
    {
      src: 'pedir.png',
      text: 'Levantar la mano',
      text2:'Sólo debes hablar  cuando llega tu turno.',
      alt: 'Niña que levanta la mano para pedir la palabra',
    },
    {
      src: 'escuchar.png',
      text: 'Escuchar',
      text2:'Se debe escuchar a la persona que tiene la palabra.',
      alt: 'Niños escuchando atentamente a la profesora',
    },
    {
      src: 'dialogar.png',
      text: 'Decir la verdad',
      text2:'Cuando hablas, siempre debes decir la verdad.',
      alt: 'Niño hablando con el abuelo y contándole cosas de su vida,  el niño siempre dice la verdad a su abuelo',
    },
    {
      src: 'escuchar2.png',
      text: 'Mirar a quien  está hablando',
      text2:'Cuando una persona habla, es importante que la observes y le prestes atención.',
      alt: 'Dos amigas conversando, ellas se miran a la cara para conversar',
    }
  ];
});

soc103_3.controller('Con3Ctrl', function($scope,$sce){
 $scope.$root.isNextEnabled = true; // Activa el botón de siguiente
  $scope.items = [
    {
      src: 'C3.png',
      alt: 'Hermosa familia dialogando alegremente, ellos viven en paz y armonía porque respetan las reglas básicas del diálogo',
    }
  ];
});

soc103_3.controller('Act1Ctrl', function ($scope) {
 $scope.data = {
    itemsPerRow: 4,
    items: [
    
      {
        img:"lapalabra.png",
        src:"1A1",
        alt: "Niño levantando la mano pidiendo la palabra",
        text: 'Levantar la mano',
      },
      {
        img:"escuchar3.png",
        src:"2A1",
        alt: "Niño poniendo su mano detrás del oído, en señal de escucha",
        text:'Escuchar',
      },
      {
        img:"dialogar.png",
        src:"3A1",
        alt: "Niño hablando con el abuelo y contándole cosas de su vida,  el niño siempre dice la verdad a su abuelo",
        text:'Decir la verdad',
      },
      {
        img:"mirar.png",
        src:"4A1",
        alt: "Un hombre y una mujer dialogando, ambos se miran fijamente",
        text:'Mirar a quien habla',
      }
    ]  
  };
});

soc103_3.controller('Act2Ctrl', function ($scope) {
  $scope.items = [
      {         
        img: 'd10-1.png',
        altimg: 'Niño hablando con el abuelo y contándole cosas de su vida,  el niño siempre dice la verdad a su abuelo',
        w: 230, h: 420, t:1 , l:1,
        options: [
              { text: "Levantar la mano"},
              { text: "Decir la verdad", answer: true},
              { text: "Mirar a quien habla"}
            ]
      },
      {         
        img: 'd10-2.png',
        altimg: 'Profesora explicando a la clase y los estudiantes escuchando atentamente',
        w: 230, h: 420, t:1 , l:26,
        options: [
              { text: "Levantar la mano"},
              { text: "Escuchar", answer: true},
              { text: "Mirar a quien habla"}
            ]
      },
      {         
        img: 'd10-4.png',
        altimg: 'Mujer que mira a los ojos a un hombre mientras éste le habla',
        w: 230, h: 420, t:1 , l:51,
        options: [
              { text: "Levantar la mano"},
              { text: "Decir la verdad"},
              { text: "Mirar a quien habla", answer: true}
            ]
      },
      {   
        img: 'd10-3.png',
        altimg: 'Niño levantando la mano',
        w: 230, h: 420, t:1 , l:76,
        options: [
              { text: "Levantar la mano", answer: true},
              { text: "Escuchar"},
              { text: "Mirar a quien habla"}
            ]
      }
    ],

    $scope.options = {
      items: $scope.items,
      canvasStyle: 'width: 70%;height: 390px;',
      chances: 2,
      optionsrandom: true,
      minRightAnswers: 3,
      itemsPerRow : 1,
      selectindividual: true
    };
});

soc103_3.controller('Act3Ctrl', function($scope){
   $scope.data = {
    image: 'rompecabezas',
    rows: 2, cols: 3,
    chances: 6,
    minRightAnswers: 6,
    finalText: 'Mira y escucha atentamente a quien te habla',
    finalAudio: 'rompecabezas',
    finalDelay: 2500
  };
});

soc103_3.controller('Act4Ctrl', function ($scope) {
$scope.data = {
    minRightAnswers: 4,
    activateAfter: 5,
    chances: 4,
    itemsfloat: true,
    items: [
      {
        src: "5d12",
        text: 'Pedir la palabra',
        alt: "Niño poniendo su mano detrás del oído, en señal de escucha",
        answer: true
      },
      {
        src: "1d12",
        text: 'Escuchar',
        alt: "Niño poniendo su mano detrás del oído, en señal de escucha",
        answer: true
      },
      {
        src: "2d12",
        text: 'Ignorar a quien te habla',
        alt: "Niño dándole la espalda a una niña mientras ella le habla",
        answer: false
      },
      {
        src: "6d12",
        text: 'Guardar silencio',
        alt: "Niño con su dedo índice derecho sobre su boca, en señal de guardar silencio",
        answer: true
      },
      {
        src: "4d12",
        text: 'No escuchar',
        alt: "Niño tapándose sus oídos para no escuchar lo que le hablan",
        answer: false
      },
      {
        src: "3d12",
        text: 'Mirar a quien habla',
        alt: "Dos personas hablando y se miran a la cara mientras hablan",
        answer: true
      }
    ]
  };
});

soc103_3.controller('Act5Ctrl', function ($scope) {
  $scope.data = {
    groups: [
      {
        title: '<div style="text-align: center;width: 100%;">Correcto</div>',
        items: [
          {
            text: "Carlos le grita a sus amigos.",
            groupId:['<div style="text-align: center;width: 100%;">Incorrecto</div>']
          },
          {
            text: "Joaquín escucha atentamente al profesor."
          },
          {
            text: "En un grupo de amigos, Juana levanta la mano para hablar."
          },
          {
            text: "Roberto mira a su papá mientras éste le habla.",
          },  
          {
            text: "Lucía le habla a sus compañeros mientras el profesor explica.",
            groupId:['<div style="text-align: center;width: 100%;">Incorrecto</div>']
          }
        ]
      },
      {
        title: '<div style="text-align: center;width: 100%;">Incorrecto</div>',
        items: [
                    
        ]
      }
    ],
    minRightAnswers: 3,
    chances: 5,
    noSuffleArray: true

  };
});