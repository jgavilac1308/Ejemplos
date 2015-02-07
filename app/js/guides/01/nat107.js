var appManager = AppManager();
var nat107 = angular.module('nat107', ['activities']);

appManager.configModule(nat107, {
	resources: '../resources/01/nat/07',
	competences1: 'Identifico diferentes estados físicos de la materia (el agua, por ejemplo) y verifico causas para su cambio de estado.',
	competences2: 'Identifica los diferentes estados físicos de la materia descubriendo su causa.',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia naturales lección N° 7”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados.',
	farewell: '¡Felicitaciones amiguito,  ahora ya sabes más sobre el agua, la materia y sus estados!',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title: 'Lección 7: El agua'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Lección 7: El agua'
		},
		{ 
			name: '/conceptualizacion-3', 
			templateUrl: 'con3', 
			controller: 'Con3Ctrl',
			title: 'Lección 7: El agua'
		},
		{ 
			name: '/actividad-1', 
			templateUrl: 'act1', 
			controller: 'Act1Ctrl',
			title: 'Actividad 1 | Lección 7'
		},
		{ 
			name: '/actividad-2', 
			templateUrl: 'act2', 
			controller: 'Act2Ctrl',
			title: 'Actividad 2 | Lección 7'
		},
		{ 
			name: '/actividad-3', 
			templateUrl: 'act3', 
			controller: 'Act3Ctrl',
			title: 'Actividad 3 | Lección 7',
		},
		{ 
			name: '/actividad-4', 
			templateUrl: 'act4', 
			controller: 'Act4Ctrl',
			title: 'Actividad 4 | Lección 7',
		},
		{ 
			name: '/actividad-5', 
			templateUrl: 'act5', 
			controller: 'Act5Ctrl',
			title: 'Actividad 5 | Lección 7',
		},
		{ 
			name: '/actividad-6', 
			templateUrl: 'act6', 
			controller: 'Act6Ctrl',
			title: 'Actividad 6 | Lección 7',
		}
	]
});

nat107.controller('Con1Ctrl', function ($scope) {
	$scope.data = [
		{
			resource: 'rio',
		},
		{
			resource: 'mar',
		},
		{
			resource: 'lago',
		}
	];
});

nat107.controller('Con2Ctrl', function ($scope) {
  $scope.$root.isNextEnabled = false; // Activamos el siguiente link

  $scope.isCompleted = false
	$scope.itemclick = [];


  $scope.$root.verify = function (item) { 
  	
  	if($scope.itemclick.indexOf(item) === -1){

  		$scope.itemclick += item
	}
           
  	if($scope.itemclick.length >= 3){
  		$scope.$root.isNextEnabled = true; // Activamos el siguiente link
  	}

  };

});

nat107.controller('Con3Ctrl', function ($scope) {
  $scope.$root.isNextEnabled = false; // Activamos el siguiente link

  $scope.isCompleted = false
	$scope.itemclick = [];


  $scope.$root.verify = function (item) { 
  	
  	if($scope.itemclick.indexOf(item) === -1){

  		$scope.itemclick += item
	}
           
  	if($scope.itemclick.length >= 4){
  		$scope.$root.isNextEnabled = true; // Activamos el siguiente link
  	}

  };

});

nat107.controller('Act1Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				src: 'vaso',
				alt: 'Tres papeleras empleadas para el  reciclaje',
				answer: true	
			},
			{
				src: 'edificios',
				alt: 'una mujer sembrando una planta',
				answer: false	
			},
			{
				src: 'cubo2',
				alt: 'Una lata de gaseosa sobre la arena de la playa',
				answer: true	
			},
			{
				src: 'paisaje',
				alt: 'una señora depositando la basura en la basurera',
				answer: false	
			},
			{
				src: 'lluvia',
				alt: 'una señora depositando la basura en la basurera',
				title:"Calentador",
				answer: true	
			},
			{
				src: 'rio',
				alt: 'Varias bolsas de basura arrojadas sobre la calle',
				answer: true	
			}
		],
		minRightAnswers: 3,
		chances: 4,
		itemsfloat: true
	};
});

nat107.controller('Act2Ctrl', function ($scope) {
	$scope.data = {
    chancesPerItem: 1,
    extension: '.png',
    itemsPerRow: 3,
    randomItems: true,
    hideDescription: true,
    minRightAnswers: 2,
    data: [
      {
        resource: "lago",
        alt: "Lago rodeado por plantas y dos patos nadando sobre él",
        correctAnswer: "líquido"
      },
      {
        resource: "cubos",
        alt: "Tres cubos de hielo",
        correctAnswer: "sólido"
      },
      {
        resource: "gaseoso",
        alt: "Humo saliendo de una olla",
        correctAnswer: "gaseoso"
      },  
    ]
  };
});

nat107.controller('Act3Ctrl', function ($scope) {
	$scope.data = {
		groupImg: "congelador",
		groupAlt: "Nevera abierta",
		data: [
			{
				src: "cono.png",
				alt: "Helado",
			},
			{
				src: "paleta.png",
				alt: "paleta"
			},
			{
				src: "manzana.png",
				alt: "manzana",
				answer: false
			},
			{
				src: "pan.png",
				alt: "Pan tajado",
				answer: false
			},
			{
				src: "cubos.png",
				alt: "tres cubos de hielo"
			},
			{
				src: "bolis.png",
				alt: "bolis"
			}
		],
		minRightAnswers: 3,
		chances: 4
	};
});

nat107.controller('Act4Ctrl', function ($scope) {
	$scope.data = {
		groupImg: "fogon2",
		groupAlt: "Olla sobre un fogón",
		data: [
			{
				src: "chocolate.png",
				alt: "Barras de chocolate",
			},
			{
				src: "manzana.png",
				alt: "manzana",
				answer: false
			},
			{
				src: "vela.png",
				alt: "vela",
			},
			{
				src: "cubos.png",
				alt: "tres cubos de hielo"
			},
			{
				src: "paleta.png",
				alt: "paleta"
			},
			{
				src: "tabla.png",
				alt: "tabla de madera",
				answer: false
			}
		],
		minRightAnswers: 3,
		chances: 4
	};
});

nat107.controller('Act5Ctrl', function ($scope) {
	$scope.items = [
			{ 				
				img: 'llave.png',
				altimg: 'Llave del agua abierta',
				w: 300, h: 470, t:2	, l:0,
				options: [
		          { text: "Cerrar la llave cuando no la utilicemos.", answer: true },
		          { text: "Dejar la llave abierta."},
		        ]
			},
			{ 	
				img: 'banarse.png',
				altimg: 'Niño bañándose',
				w: 300, h: 470, t:2	, l:35,
				options: [
		          { text: "Tomar un baño corto.", answer: true },
		          { text: "Tomar un baño largo con la ducha abierta."},
		        ]
			},
			{ 				
				img: 'cepillarse.png',
				altimg: 'Niña cepillándose los dientes',
				w: 300, h: 470, t:2	, l:70,
				options: [
		          { text: "Cerrar la llave del agua mientras te cepillas.", answer: true },
		          { text: "Deja abierta la llave del agua mientras te cepillas."},
		        ]
			}
		],

		$scope.options = {
			items: $scope.items,
			canvasStyle: 'width: 100%;height: 500px;',
			chances: 1,
			optionsrandom: true,
			minRightAnswers: 2,
			itemsPerRow : 3,
			selectindividual: true
		};
});

nat107.controller('Act6Ctrl', function ($scope) {
	$scope.items = [
			{ 				
				img: 'cubos.png',
				title:'¿Si dejas varias horas por fuera del congelador, algunos cubos de hielo a qué estado pasarán?',
				altimg: 'Llave del agua abierta',
				w: 300, h: 520, t:2	, l:0,
				options: [
		          { text: "Sólido" },
		          { text: "Líquido", answer: true},
		        ]
			},
			{ 	
				img: 'fogon2.png',
				title: '¿Si dejas varias horas en el fogón una olla con agua, a qué estado pasará el agua?',
				altimg: 'Niño bañándose',
				w: 300, h: 520, t:2	, l:35,
				options: [
		          { text: "Gaseoso", answer: true },
		          { text: "Líquido"},
		        ]
			},
			{ 				
				img: 'jugo.png',
				title: '¿Si dejas en el congelador de un día para otro un vaso con jugo, a qué estado pasará el jugo?',
				altimg: 'Niña cepillándose los dientes',
				w: 300, h: 520, t:2	, l:70,
				options: [
		          { text: "Líquido"},
		          { text: "Sólido", answer: true },
		        ]
			}
		],

		$scope.options = {
			items: $scope.items,
			canvasStyle: 'width: 100%;height: 570px;',
			chances: 1,
			optionsrandom: true,
			minRightAnswers: 2,
			itemsPerRow : 3,
			selectindividual: true
		};
});
