var appManager = AppManager();
var nat102 = angular.module('nat102', ['activities']);

appManager.configModule(nat102, {
	resources: '../resources/01/nat/02',
	competences1: 'Identifico y describo la flora, la fauna, el agua y el suelo de mi entorno',
	competences2: 'Identifica en su entorno la flora y la fauna, dándole importancia a los elementos naturales',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia naturales lección N° 2”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	farewell: '¡Felicitaciones amiguito,  ahora ya sabes más sobre las plantas!',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title: 'Las plantas'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Las plantas'
		},
		{ 
			name: '/conceptualizacion-3', 
			templateUrl: 'con3', 
			controller: 'Con3Ctrl',
			title: 'Las plantas'
		},
		{ 
			name: '/conceptualizacion-4', 
			templateUrl: 'con4', 
			controller: 'Con4Ctrl',
			title: 'Las plantas'
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

nat102.controller('Con1Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "agua",
			alt: "Paisaje donde se muestra un río rodeado de vegetación"
		},
		{ 
			resource: "suelo",
			alt: "imagen donde se muestra el suelo y una parte de pasto cubriéndolo por encima"
		},
		{ 
			resource: "luz",
			alt: "imagen que muestra el sol y sus rayos de luz cayendo Sobre un árbol florecido"
		},
		{ 
			resource: "aire",
			alt: "imagen donde se muestra el cielo y el aire en movimiento rozando un árbol"
		}
	]
});

nat102.controller('Con2Ctrl', function ($scope) {
	$scope.data = {
		canvas: 'planta-funciones',
		alt: 'Planta completa, donde se muestra todas las partes de una planta, las hojas, las raíces, el tallo, el fruto, las ramas y las flores',
		items: [
			{
				title: 'Hoja',
				resource: "hoja",
				text: 'Es la parte de la planta que se encarga de la respiración',
				position: { w: 7, t: 0, l: 22 } // Ems
			},
			{
				title: 'Flor',
				resource: "flor",
				text: 'Este órgano tiene como función participar en la reproducción de la planta',
				position: { w: 10.6, t: 5.4, l: 18.4 } // Ems
			},
			{
				title: 'Fruto',
				resource: "fruto",
				text: 'Es el órgano encargado de contener y proteger las semillas',
				position: { w: 18.2, t: 8.7, l: 8.2 } // Ems
			},
			{
				title: 'Tallo',
				resource: "tallo",
				text: 'Tiene como función sostener todos los órganos de la planta',
				position: { w: 16, t: 12, l: 13 } // Ems
			},
			{
				title: 'Raíz',
				resource: "raiz",
				text: 'Es la parte de la planta encargada de obtener los nutrientes del suelo',
				position: { w: 11, t: 18, l: 18 } // Ems
			},
		]

	};
});

nat102.controller('Con3Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "arbol",
			alt: "Árbol de naranjas, rodeado por semillas germinando"
		},
		{ 
			resource: "naranja",
			alt: "naranja"
		},
		{ 
			resource: "semilla",
			alt: "semilla de naranja"
		},
	]
});

nat102.controller('Con4Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				title: "Hierbas",
				src: "hierbas",
				alt: "Hierbas"
			},
			{
				title: "Arbustos",
				src: "arbusto",
				alt: "Arbusto de tamaño pequeño, cuyo tronco se ramifica desde la base"
			},
			{
				title: "Árboles",
				src: "arbol-II",
				alt: "Árbol de gran altura, cuyo tronco se comienza a ramificar muy arriba de la base"
			},
		]
	};
});

nat102.controller('Act1Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				src: "dulces",
				alt: "dulces",
				answer: false
			},
			{
				src: "luz1",
				alt: "luz",
				answer: true
			},
			{
				src: "agua-II",
				alt: "agua",
				answer: true
			},
			{
				src: "suelo",
				alt: "suelo",
				answer: true
			},
			{
				src: "cama",
				alt: "cama",
				answer: false
			},
			{
				src: "aire1",
				alt: "aire",
				answer: true
			},
		],
		minRightAnswers: 2,
		chances: 4
	};
});

nat102.controller('Act2Ctrl', function ($scope) {
	$scope.data = {
		data: [
			{
				src: "banano.png",
				alt: "banano",
				answer: false
			},
			{
				src: "pinia.png",
				alt: "piña",
				answer: false
			},
			{
				src: "uvas.png",
				alt: "uvas",
				answer: true
			},
			{
				src: "naranja.png",
				alt: "naranja",
				answer: true
			},
			{
				src: "manzana.png",
				alt: "manzana",
				answer: true
			},
			{
				src: "sandia.png",
				alt: "sandía",
				answer: true
			},
		],
		chances: 4,
		minRightAnswers: 3,
		itemsPerRow: 3
	};
});

nat102.controller('Act3Ctrl', function ($scope) {
	$scope.data = {
		canvas: 'planta',
		targets: [
			{ 
				text: "Flor",
				w: 15, h: 15, t: 28, l: 33 
			},
			{ 
				text: "Hoja",
				w: 15, h: 15, t: 29, l: 12 
			},
			{ 
				text: "Fruto",
				w: 15, h: 15, t: 32, l: 65 
			},
			{ 
				text: "Tallo",
				w: 15, h: 15, t: 48, l: 44 
			},
			{ 
				text: "Raíz",
				w: 15, h: 15, t: 69, l: 57 
			},
			{ 
				text: "Rama",
				w: 15, h: 15, t: 24, l: 50 
			},
		],
		minRightAnswers: 4
	};
});

nat102.controller('Act4Ctrl', function ($scope) {
	$scope.options = {
		data: [
			{
				src: "hoja",
				alt: "hoja",
				title: "Respiración"
			},
			{
				src: "fruto",
				alt: "fruto",
				title: "Protección de las semillas"
			},
			{
				src: "tallo",
				alt: "tallo",
				title: "Sostener todos los órganos"
			},
			{
				src: "raices",
				alt: "raíces",
				title: "Obtener los nutrientes"
			},
			{
				src: "flor",
				alt: "flor",
				title: "Reproducción"
			},
		],
		minRightAnswers: 3,
		randomItems: true,
		randomTargets: true,
		padding: false
	};
});

nat102.controller('Act5Ctrl', function ($scope) {
	$scope.options = {
		data: [
			{
				src: "mesa",
				alt: "Mesa",
				title: "Construir Objetos"
			},
			{
				src: "frutas",
				alt: "conjunto de frutas: sandía, piña, manzana, naranja y racimo de uvas",
				title: "Alimentación"
			},
			{
				src: "bebida",
				alt: "Pocillo que contiene una bebida preparada con manzanilla",
				title: "Aliviar un dolor"
			},
			{
				src: "florero",
				alt: "Florero que contiene varias flores de diferentes colores y formas",
				title: "Decorar nuestra casa"
			},
		],
		minRightAnswers: 3,
		randomItems: true,
		randomTargets: true,
		border: false
	};
});

