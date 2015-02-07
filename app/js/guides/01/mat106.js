var appManager = AppManager();
var mat106 = angular.module('mat106', ['activities']);

appManager.configModule(mat106, {
	resources: '../resources/01/mat/06',
	competences1: 'Describo, comparo y cuantifico situaciones con números, en diferentes contextos y con diversas representaciones',
	competences2: 'Establece relaciones de pertenencia y no pertenencia entre los elementos de un conjunto',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia matemáticas lección N° 6”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	farewell: '¡Muy bien!, ahora ya identificas si un elemento pertenece o no a un conjunto',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title: 'Agrupo objetos por características iguales'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Agrupo objetos por características iguales'
		},
		{ 
			name: '/actividad-1-1', 
			templateUrl: 'act1_1', 
			controller: 'Act1_1Ctrl',
			title: 'Actividad 1'
		},
		{ 
			name: '/actividad-1-2', 
			templateUrl: 'act1_2', 
			controller: 'Act1_2Ctrl',
			title: 'Actividad 1'
		},
		{ 
			name: '/actividad-2-1', 
			templateUrl: 'act2_1', 
			controller: 'Act2_1Ctrl',
			title: 'Actividad 2'
		},
		{ 
			name: '/actividad-2-2', 
			templateUrl: 'act2_2', 
			controller: 'Act2_2Ctrl',
			title: 'Actividad 2'
		},
		{ 
			name: '/actividad-3-1', 
			templateUrl: 'act3_1', 
			controller: 'Act3_1Ctrl',
			title: 'Actividad 3',
		},
		{ 
			name: '/actividad-3-2', 
			templateUrl: 'act3_2', 
			controller: 'Act3_2Ctrl',
			title: 'Actividad 3',
		},
		{ 
			name: '/actividad-4', 
			templateUrl: 'act4', 
			controller: 'Act4Ctrl',
			title: 'Actividad 4',
		}
	]
});

mat106.controller('Con1Ctrl', function ($scope) {
	$scope.time = [0.2, 2, 1.5];
});

mat106.controller('Con2Ctrl', function ($scope) {
	$scope.time = [0.5, 3.7, 0.6, 0.2, 3.3];
});

mat106.controller('Act1_1Ctrl', function ($scope) {
	$scope.data = {
		sound: 'conjunto-mascotas',
		items: [
			{
				src: "conejo",
				alt: "conejo",
				w: 30, h: 0, t: 39, l: 60
			},
			{
				src: "elefante",
				alt: "elefante",
				answer: false
			},
			{
				src: "ave",
				alt: "ave",
				w: 30, h: 0, t: 50, l: 25
			},
			{
				src: "tigre",
				alt: "tigre",
				answer: false
			},
			{
				src: "perro",
				alt: "perro",
				w: 30, h: 0, t: 8, l: 51,
				startsInGroup: true
			},
			{
				src: "gato",
				alt: "gato",
				w: 30, h: 0, t: 15, l: 14,
				startsInGroup: true
			}
		],
		chances: 2,
		minRightAnswers: 2,
	};
});

mat106.controller('Act1_2Ctrl', function ($scope) {
	$scope.data = {
		sound: 'conjunto-balones',
		items: [
			{
				src: "balon-voleibol",
				alt: "balón de voleibol",
				w: 30, h: 0, t: 64, l: 37
			},
			{
				src: "balon-futbol-americano",
				alt: "balón de fútbol",
				w: 30, h: 0, t: 39, l: 60
			},
			{
				src: "pelota",
				alt: "pelota de playa",
				w: 30, h: 0, t: 46, l: 9
			},
			{
				src: "raqueta",
				alt: "raqueta de tenis",
				answer: false
			},
			{
				src: "balon-baloncesto",
				alt: "balón de baloncesto",
				w: 30, h: 0, t: 8, l: 51,
				startsInGroup: true
			},
			{
				src: "balon-futbol",
				alt: "balón de fútbol",
				w: 30, h: 0, t: 15, l: 14,
				startsInGroup: true
			}
		],
		chances: 3,
		minRightAnswers: 2,
	};
});

mat106.controller('Act2_1Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				src: "maracas",
				alt: "par de maracas",
				answer: false,
				w: 30, h: 0, t: 4, l: 37
			},
			{
				src: "zanahoria",
				alt: "zanahoria",
				w: 22, h: 0, t: 15, l: 14
			},
			{
				src: "guitarra",
				alt: "guitarra eléctrica",
				answer: false,
				w: 30, h: 0, t: 21, l: 60
			},
			{
				src: "martillo",
				alt: "martillo",
				w: 30, h: 0, t: 51, l: 12
			},
			{
				src: "trompeta",
				alt: "trompeta",
				answer: false,
				w: 42, h: 0, t: 70, l: 42
			}
		],
		chances: 2,
		minRightAnswers: 2,
	};
});

mat106.controller('Act2_2Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				src: "avion",
				alt: "avión",
				w: 54, h: 0, t: 5, l: 20
			},
			{
				src: "carro",
				alt: "carro familiar de 4 puertas",
				w: 40, h: 0, t: 23, l: 9
			},
			{
				src: "perro-II",
				alt: "perro",
				w: 35, h: 0, t: 32, l: 57
			},
			{
				src: "barco",
				alt: "barco de gran tamaño",
				w: 50, h: 0, t: 55, l: 4
			},
			{
				src: "moto",
				alt: "moto deportiva",
				w: 30, h: 0, t: 59, l: 58
			},
		],
		chances: 1,
		minRightAnswers: 1
	};
});

mat106.controller('Act3_1Ctrl', function ($scope) {
	$scope.data = {
		sound: 'conjunto-cocina',
		items: [
			{
				src: "sarten",
				alt: "sartén",
				w: 49, h: 0, t: 55, l: 33
			},
			{
				src: "tenedor",
				alt: "tenedor",
				w: 40, h: 0, t: 18, l: 60
			},
			{
				src: "computador",
				alt: "computador portátil",
				answer: false
			},
			{
				src: "nevera",
				alt: "nevera",
				w: 51, h: 0, t: 13, l: 4
			},
		],
		chances: 3,
		minRightAnswers: 2,
	};
});

mat106.controller('Act3_2Ctrl', function ($scope) {
	$scope.data = {
		sound: 'conjunto-navidad',
		items: [
			{
				src: "arbol-de-navidad",
				alt: "Árbol de navidad, decorado con bolas, estrellas y bastones",
				w: 40, h: 0, t: 14, l: 7
			},
			{
				src: "bola-de-navidad",
				alt: "Bola decorativa navideña de color rojo",
				w: 33, h: 0, t: 19, l: 57
			},
			{
				src: "pelota-tenis",
				alt: "pelota de tenis",
				answer: false
			},
			{
				src: "papa-noel",
				alt: "Papá Noel cargando una bolsa de tela",
				w: 43, h: 0, t: 52, l: 32
			}
		],
		chances: 3,
		minRightAnswers: 2
	};
});

mat106.controller('Act4Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				src: "conejo",
				alt: "conejo",
				answer: false,
				w: 30, h: 0, t: 25, l: 3
			},
			{
				src: "elefante",
				alt: "elefante",
				w: 30, h: 0, t: 36, l: 37
			},
			{
				src: "rinoceronte",
				alt: "rinoceronte",
				w: 35, h: 0, t: 56, l: 57
			},
			{
				src: "tigre",
				alt: "tigre",
				w: 30, h: 0, t: 65, l: 19
			},
			{
				src: "perro",
				alt: "perro",
				answer: false,
				w: 30, h: 0, t: 18, l: 63
			},
			{
				src: "gato",
				alt: "gato",
				answer: false,
				w: 30, h: 0, t: 4, l: 37
			}
		],
		chances: 3,
		minRightAnswers: 2,
	};
});
