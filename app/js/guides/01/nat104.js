var appManager = AppManager();
var nat104 = angular.module('nat104', ['activities']);

appManager.configModule(nat104, {
	resources: '../resources/01/nat/04',
	competences1: 'Identifico y describo la flora, la fauna, el agua y el suelo de mi entorno',
	competences2: 'Identifica en su entorno la flora y la fauna dándole importancia a los elementos naturales',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia naturales lección N° 4”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	farewell: '¡Felicitaciones amiguito,  ahora ya sabes más sobre la tierra, la luna y el sol!',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title: 'Mi planeta tierra'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Mi planeta tierra'
		},
		{ 
			name: '/conceptualizacion-3', 
			templateUrl: 'con3', 
			controller: 'Con3Ctrl',
			title: 'Mi planeta tierra'
		},
		{ 
			name: '/actividad-1', 
			templateUrl: 'act1', 
			controller: 'Act1Ctrl',
			title: 'Actividad 1'
		},
		{ 
			name: '/actividad-2', 
			templateUrl: 'act2', 
			controller: 'Act2Ctrl',
			title: 'Actividad 2'
		},
		{ 
			name: '/actividad-3', 
			templateUrl: 'act3', 
			controller: 'Act3Ctrl',
			title: 'Actividad 3',
		},
		{ 
			name: '/actividad-4', 
			templateUrl: 'act4', 
			controller: 'Act4Ctrl',
			title: 'Actividad 4',
		},
		{ 
			name: '/actividad-5', 
			templateUrl: 'act5', 
			controller: 'Act5Ctrl',
			title: 'Actividad 5',
		},
	]
});

nat104.controller('Con1Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "tierra",
			alt: "planeta tierra"
		},
		{ 
			resource: "sol",
			alt: "sol"
		},
		{ 
			resource: "luna",
			alt: "luna"
		}
	]
});

nat104.controller('Con2Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "luna-nueva",
			alt: "Cielo con estrellas donde  la luna no aparece"
		},
		{ 
			resource: "media-luna",
			alt: "Cielo con estrellas donde sólo se muestra una parte de la luna"
		},
		{ 
			resource: "luna-llena",
			alt: "Cielo con estrellas donde aparece la luna Completa, con su forma circular"
		}
	]
});

nat104.controller('Con2Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "luna-nueva",
			alt: "Cielo con estrellas donde  la luna no aparece"
		},
		{ 
			resource: "media-luna",
			alt: "Cielo con estrellas donde sólo se muestra una parte de la luna"
		},
		{ 
			resource: "luna-llena",
			alt: "Cielo con estrellas donde aparece la luna Completa, con su forma circular"
		}
	]
});

nat104.controller('Con3Ctrl', function ($scope) {
	$scope.data = {
		canvas: 'planetas',
		canvasAlt: 'Imagen donde se muestra el sol y los nueve planetas girando alrededor de él',
		targets: [
			{ w: 10, h: 54, t: 26, l: 21, src: "mercurio" },
			{ w: 9, h: 61, t: 26, l: 31, src: "venus" },
			{ w: 9, h: 61, t: 22, l: 40, src: "tierra" },
			{ w: 8, h: 61, t: 26, l: 49, src: "marte" },
			{ w: 8, h: 56, t: 22, l: 57, src: "jupiter" },
			{ w: 11, h: 79, t: 12, l: 65, src: "saturno" },
			{ w: 7, h: 58, t: 33, l: 76, src: "urano" },
			{ w: 9, h: 60, t: 20, l: 83, src: "neptuno" },
			{ w: 8, h: 57, t: 34, l: 92, src: "pluton" },
		]
	};
});

nat104.controller('Act1Ctrl', function ($scope) {
	$scope.data = {
		// Cada respuesta debe tener un Id único, que es usado para definir las respuestas de cada item
		answers: [
			// Día
			{
				id: 1,
				src: "sol-II",
				alt: "sol"
			},
			// Noche
			{
				id: 2,
				src: "luna-II",
				alt: "luna"
			},
		],
		items: [
			{
				src: "oficio",
				alt: "Niña trapeando",
				answers: [1, 2]
			},
			{
				src: "banarse",
				alt: "Niño bañándose",
				answers: [1, 2]
			},
			{
				src: "jugar",
				alt: "Niño y niña Jugando con un balón",
				answers: [1, 2]
			},
			{
				src: "cepillarse-los-dientes",
				alt: "Niña cepillándose los dientes",
				answers: [1, 2]
			},
			{
				src: "estudiar",
				alt: "Niño estudiando",
				answers: [1, 2]
			},
			{
				src: "dormir",
				alt: "Niño durmiendo en su cama",
				answers: [2]
			},
		],
		chances: 6,
		minRightAnswers: 4	
	};
});

nat104.controller('Act2Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				src: "bebe",
				alt: "bebé",
				answer: true	
			},
			{
				src: "arbol",
				alt: "árbol",
				answer: true	
			},
			{
				src: "piedra",
				alt: "tres piedras",
				answer: false	
			},
			{
				src: "pajaro",
				alt: "pájaro",
				answer: true	
			},
		],
		minRightAnswers: 2,
		chances: 3
	};
});

nat104.controller('Act3Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				resource: "media-luna",
				alt: "Cielo con estrellas donde sólo se muestra una parte de la luna"
			},
			{
				resource: "luna-llena",
				alt: "Cielo con estrellas donde aparece la luna completa, con su forma circular"
			},
			{
				resource: "luna-nueva",
				alt: "Cielo con estrellas donde  la luna no aparece"
			}
		],
		chances: 3,
		minRightAnswers: 2
	};
});

nat104.controller('Act4Ctrl', function ($scope) {
	$scope.data = {
		canvas: 'sin-planetas',
		canvasAlt: 'Imagen del espacio donde aparecen el sol y las orbitas donde se ubican los planetas',
		sample: 'planetas',
		sampleAlt: 'Imagen donde se muestra el sol y los nueve planetas girando alrededor de él',
		targets: [
			{ 
				src: "mercurio",
				targetPos: { w: 10, h: 100, t: 0, l: 21 },
				innerPos: { w: 175, h: 54, t: 52, l: -30 }
			},
			{ 
				src: "venus",
				targetPos: { w: 8, h: 100, t: 0, l: 31 },
				innerPos: { w: 228, h: 61, t: 62.4, l: -55 }
			},
			{ 
				src: "tierra-III",
				alt: "tierra",
				targetPos: { w: 8, h: 100, t: 0, l: 39 },
				innerPos: { w: 203, h: 62, t: 62.3, l: -41 }
			},
			{ 
				src: "marte",
				targetPos: { w: 8, h: 100, t: 0, l: 47 },
				innerPos: { w: 215, h: 61, t: 63, l: -44 }
			},
			{ 
				src: "jupiter",
				alt: "júpiter",
				targetPos: { w: 9, h: 100, t: 0, l: 55 },
				innerPos: { w: 200, h: 56, t: 50, l: -35 }
			},
			{ 
				src: "saturno",
				targetPos: { w: 9, h: 100, t: 0, l: 64 },
				innerPos: { w: 181, h: 79, t: 38, l: -35 }
			},
			{ 
				src: "urano",
				targetPos: { w: 9, h: 100, t: 0, l: 73 },
				innerPos: { w: 204, h: 58, t: 51, l: -42 }
			},
			{ 
				src: "neptuno",
				targetPos: { w: 10, h: 100, t: 0, l: 82 },
				innerPos: { w: 175, h: 59, t: 45, l: -42 }
			},
			{ 
				src: "pluton",
				alt: "plutón",
				targetPos: { w: 8, h: 100, t: 0, l: 92 },
				innerPos: { w: 236, h: 57, t: 59, l: -77 }
			}
		],
		rightAnswerCallback: function (item) {
			$('#audio-' + item.src)[0].play();
		},
		minRightAnswers: 5,
		itemsContainerHeight: '112px'
	};
});

nat104.controller('Act5Ctrl', function ($scope) {
	$scope.data = {
		canvas: 'sin-planetas',
		canvasAlt: 'Imagen del espacio donde aparecen el sol y las orbitas donde se ubican los planetas',
		targets: [
			{ 
				src: "mercurio",
				targetPos: { w: 10, h: 100, t: 0, l: 21 },
				innerPos: { w: 175, h: 54, t: 52, l: -30 }
			},
			{ 
				src: "venus",
				targetPos: { w: 8, h: 100, t: 0, l: 31 },
				innerPos: { w: 228, h: 61, t: 62.4, l: -55 }
			},
			{ 
				src: "tierra-III",
				alt: "tierra",
				targetPos: { w: 8, h: 100, t: 0, l: 39 },
				innerPos: { w: 203, h: 62, t: 62.3, l: -41 }
			},
			{ 
				src: "marte",
				targetPos: { w: 8, h: 100, t: 0, l: 47 },
				innerPos: { w: 215, h: 61, t: 63, l: -44 }
			},
			{ 
				src: "jupiter",
				alt: "júpiter",
				targetPos: { w: 9, h: 100, t: 0, l: 55 },
				innerPos: { w: 200, h: 56, t: 50, l: -35 }
			},
			{ 
				src: "saturno",
				targetPos: { w: 9, h: 100, t: 0, l: 64 },
				innerPos: { w: 181, h: 79, t: 38, l: -35 }
			},
			{ 
				src: "urano",
				targetPos: { w: 9, h: 100, t: 0, l: 73 },
				innerPos: { w: 204, h: 58, t: 51, l: -42 }
			},
			{ 
				src: "neptuno",
				targetPos: { w: 10, h: 100, t: 0, l: 82 },
				innerPos: { w: 175, h: 59, t: 45, l: -42 }
			},
			{ 
				src: "pluton",
				alt: "plutón",
				targetPos: { w: 8, h: 100, t: 0, l: 92 },
				innerPos: { w: 236, h: 57, t: 59, l: -77 }
			}
		],
		rightAnswerCallback: function (item) {
			$('#audio-' + item.src)[0].play();
		},
		minRightAnswers: 5,
		itemsContainerHeight: '112px'
	};
});

