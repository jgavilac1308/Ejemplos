var appManager = AppManager();
var soc102_3 = angular.module('soc102_3', ['activities']);

appManager.configModule(soc102_3, {
	resources: '../resources/01/soc/02_3',
	farewell: '¡Muy bien!, ahora ya conoces las emociones básicas que caracterizan a los seres humanos.',
	evidencesSound:true,
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, actividad de evidencia, guía 3, lección 2; descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados.',
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
			title: 'Lección 2:  Las emociones'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Lección 2:  Las emociones'
		},
    { 
      name: '/conceptualizacion-3', 
      templateUrl: 'con3', 
      controller: 'Con3Ctrl',
      title: 'Lección 2:  Las emociones'
    },
    { 
      name: '/conceptualizacion-4', 
      templateUrl: 'con4', 
      controller: 'Con4Ctrl',
      title: 'Lección 2:  Las emociones'
    },
    { 
      name: '/conceptualizacion-5', 
      templateUrl: 'con5', 
      controller: 'Con5Ctrl',
      title: 'Lección 2:  Las emociones'
    },
		{ 
			name: '/actividad-1', 
			templateUrl: 'act1', 
			controller: 'Act1Ctrl',
			title: 'Actividad 1 | Lección 2'
		},
		{ 
			name: '/actividad-2', 
			templateUrl: 'act2', 
			controller: 'Act2Ctrl',
			title: 'Actividad 2 | Lección 2'
		},
		{ 
			name: '/actividad-3', 
			templateUrl: 'act3', 
			controller: 'Act3Ctrl',
			title: 'Actividad 3 | Lección 2'
		},
		{ 
			name: '/actividad-4', 
			templateUrl: 'act4', 
			controller: 'Act4Ctrl',
			title: 'Actividad 4 | Lección 2'
		},
    { 
      name: '/actividad-5', 
      templateUrl: 'act5', 
      controller: 'Act5Ctrl',
      title: 'Actividad 5 | Lección 2'
    }
	]
	
});

soc102_3.controller('CompCtrl', function($scope){
	$scope.data = [
		{
			title: 'Estándar de competencia:',
			text1: 'Reconozco las emociones básicas (alegría, tristeza, rabia, temor) en mí y en las otras personas. (Competencias ciudadanas-competencias emocionales).'
		},
		{
			title: 'Elementos de competencia:',
			text1: 'Diferencia las emociones básicas de las personas en su diario vivir.'
		}
		
	];
});

soc102_3.controller('Con1Ctrl', function($scope) {
  $scope.$root.isNextEnabled = true; // Activa el botón de siguiente
  $scope.items = [
    {
      src: 'jugando.png',
      text: 'Cuando sentimos emociones saludables nos sentimos bien.',
      alt: 'Un niño y una niña que se sienten muy felices, mientras juegan en un parque.r',
    },
    {
      src: 'aburridos.png',
      text: 'Cuando sentimos emociones negativas nos sentimos mal.',
      alt: 'Un niño llorando y otro mirándolo con rabia. ',
    }
  ];
});

soc102_3.controller('Con2Ctrl', function($scope,$sce){
  $scope.$root.isNextEnabled = true; // Activa el botón de siguiente
  $scope.items = [
    {
      src: 'feliz-d7.png',
      text: 'Alegría',
      alt: 'Un niño y una niña que se sienten muy felices, mientras juegan en un parque.r',
    },
    {
      src: 'miedod7.png',
      text: 'Miedo',
      alt: 'Un niño y una niña que se sienten muy felices, mientras juegan en un parque.r',
    },
    {
      src: 'rabia-d7.png',
      text: 'Cólera- ira-rabia',
      alt: 'Un niño y una niña que se sienten muy felices, mientras juegan en un parque.r',
    },
    {
      src: 'aburrido-d7.png',
      text: 'Tristeza',
      alt: 'Un niño llorando y otro mirándolo con rabia. ',
    }
  ];
});

soc102_3.controller('Con3Ctrl', function($scope){
 $scope.$root.isNextEnabled = false; // Activa el botón de siguiente
 $scope.itemSelected = false
});

soc102_3.controller('Con4Ctrl', function ($scope ,$sce) {
 $scope.$root.isNextEnabled = false; // Activa el botón de siguiente
 $scope.itemSelected = false
});

soc102_3.controller('Con5Ctrl', function($scope){
 $scope.$root.isNextEnabled = false; // Activa el botón de siguiente
 $scope.itemSelected = false
});


soc102_3.controller('Act1Ctrl', function ($scope) {
 $scope.data = {
    itemsPerRow: 3,
    items: [
    
      {
        img:"feliz-d11.png",
        src:"A1_alegria",
        alt: "Niño  muy alegre",
        text: 'Alegría',
      },
      {
        img:"miedo-d11.png",
        src:"A1_miedo",
        alt: "Niña muy asustada",
        text:'miedo',
      },
      {
        img:"rabia-11.png",
        src:"A1_rabia",
        alt: "Niño muy enojado",
        text:'Cólera-ira-rabia',
      },
      {
        img:"aburrida-d1.png",
        src:"A1_tristeza",
        alt: "Niña muy triste",
        text:'tristeza',
      }
    ]  
  };
});

soc102_3.controller('Act2Ctrl', function ($scope) {
  $scope.items = [
    {
      sil: 'feliz-d11',
      text: 'Alegría',
      alt2: 'Niño feliz',  
      resource: "feliz-d12",
      alt: 'Cara de un niño alegre'
    },
    {
      sil: 'miedo-d11',
      alt2: 'Niña asustada',
      text: 'Miedo',
      resource: "miedo-d12",
      alt: 'Cara de un niño asustado o con miedo'
    },
    {
      sil: 'rabia-11',
      alt2: 'Niño con rabia',
      text: 'Rabia',
      resource: "rabia-d12",
      alt: 'Cara de un niño enojado, con ira y rabia'
    },
    {
      sil: 'aburrida-d1',
      alt2: 'Niña triste',
      text: 'Tristeza',
      resource: "aburrido-d12",
      alt: 'Cara de niño triste'
    }
  ];

  $scope.options = {
    data: $scope.items,
    minRightAnswers: 4,
    randomItems: true,
  };
});

soc102_3.controller('Act3Ctrl', function ($scope) {
  $scope.items = [
        {         
        img: 'feliz-d2.png',
        altimg: 'Niña rubia sonriendo',
        w: 220, h: 435, t:1 , l:2,
        options: [
              { text: "Alegría", answer: true},
              { text: "Tristeza"},
              { text: "Rabia-enojo"},
              { text: "Miedo"},
            ]
      },
        {         
        img: 'miedo-d13.png',
        altimg: 'Niña asustada',
        w: 220, h: 435, t:1 , l:27,
        options: [
              { text: "Alegría"},
              { text: "Tristeza"},
              { text: "Rabia- enojo"},
              { text: "Miedo", answer: true},
            ]
      },
      {   
        img: 'aburrido-d13.png',
        altimg: 'Niño llorando',
        w: 220, h: 435, t:1 , l:53,
        options: [
              { text: "Alegría"},
              { text: "Tristeza", answer: true},
              { text: "Rabia- enojo"},
              { text: "Miedo"},
            ]
      },
      {   
        img: 'rabia-d13.png',
        altimg: 'Niña enojada',
        w: 220, h: 435, t:1 , l:77,
        options: [
              { text: "Alegría"},
              { text: "Tristeza"},
              { text: "Rabia- enojo", answer: true},
              { text: "Miedo"},
            ]
      },
    ],

    $scope.options = {
      items: $scope.items,
      canvasStyle: 'width: 70%;height: 390px;',
      chances: 2,
      optionsrandom: true,
      minRightAnswers: 2,
      itemsPerRow : 1,
      selectindividual: true
    };
});

soc102_3.controller('Act4Ctrl', function($scope){
   $scope.items = [
    {
      sil: 'miedo-d14',
      text: 'Miedo',  
      resource: "cara-d14",
      alt: 'Imagen donde se muestra una niña en silla de ruedas, ella está ubicada junto a una rampa que facilita su acceso a un edificio'
    },
    {
      sil: 'aburrido-d14',
      text: 'Tristeza',
      resource: "cara-d14",
      alt: 'En la imagen se muestran tres jóvenes, uno de ellos está en el piso debido a que los otros dos le han quitado sus bastones de apoyo'
    },
    {
      sil: 'rabia-d14',
      text: 'Rabia',
      resource: "cara-d14",
      alt: 'Niña feliz compartiendo con una amiga en situación de discapacidad'
    },
    {
      sil: 'feliz-d14',
      text: 'Alegría',
      resource: "cara-d14",
      alt: 'Imagen en la que se muestra un parqueadero exclusivo para personas en situación de discapacidad'
    }
  ];

  $scope.options = {
    data: $scope.items,
    minRightAnswers: 4,
    chances: 8,
    border: false,
    randomItems: true,
  };
});

soc102_3.controller('Act5Ctrl', function ($scope) {
$scope.data = {
    canvas: 'd15',  
    targets: [
      { 
        text: "Alegría",
        w: 16, h: 7, t: 89, l: 72 ,
        acept:['Alegría'],
        style:'background-color: #0c64e9;color: white;margin-left: 10px;margin-bottom: 20px;'       
      },
      { 
        text: "Tristeza",
        w: 16, h: 7, t: 29, l: 41 ,
        style:'background-color: #0c64e9;color: white;margin-left: 10px;margin-bottom: 20px;',

      },
      { 
        text: "Rabia",
        w: 16, h: 7, t: 69, l: 26 ,
        style:'background-color: #0c64e9;color: white;margin-left: 10px;margin-bottom: 20px;' 
      },
      { 
        text: "Miedo",
        w: 16, h: 7, t: 39, l: 60 ,
        style:'background-color: #0c64e9;color: white;margin-left: 10px;margin-bottom: 20px;'  
      },
      { 
        text: "Alegría",
        w: 16, h: 7, t: 79, l: 6 ,
        acept:['Alegría'],
        style:'background-color: #0c64e9;color: white;margin-left: 10px;margin-bottom: 20px;',
      },
    ],

    minRightAnswers: 3,
    itemsWidth: "250px",
    itemsPerRow: 1,
    chances:10,
    customStyles: "border-radius: 0px; background: #fff;",
    preserveText: true
  };
});