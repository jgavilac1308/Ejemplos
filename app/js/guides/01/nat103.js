var appManager = AppManager();
var nat103 = angular.module('nat103', ['activities']);

appManager.configModule(nat103, {
	resources: '../resources/01/nat/03',
	competences1: 'Identifico y describo la flora, la fauna, el agua y el suelo de mi entorno',
	competences2: 'Identifica en su entorno la flora y la fauna dándole importancia a los elementos naturales',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia naturales lección N° 3”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	farewell: '¡Felicitaciones amiguito,  ahora ya sabes más sobre los animales!',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: function () {},
			title: 'Los animales'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Los animales'
		},
		{ 
			name: '/conceptualizacion-3', 
			templateUrl: 'con3', 
			controller: 'Con3Ctrl',
			title: 'Los animales'
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
			title: 'Actividad 3'
		},
		{ 
			name: '/actividad-4-1', 
			templateUrl: 'act4_1', 
			controller: 'Act4_1Ctrl',
			title: 'Actividad 4',
		},
		{ 
			name: '/actividad-4-2', 
			templateUrl: 'act4_2', 
			controller: 'Act4_2Ctrl',
			title: 'Actividad 4',
		},
		{ 
			name: '/actividad-4-3', 
			templateUrl: 'act4_3', 
			controller: 'Act4_3Ctrl',
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

nat103.controller('Con2Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "oviparos",
			alt: "Gallina con pollitos saliendo de los huevos"
		},
		{ 
			resource: "viviparos",
			alt: "Mujer en embarazo con su hijo al lado"
		},
	]
});

nat103.controller('Con3Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				title: "Acuáticos",
				src: "acuaticos",
				alt: "Pez y tortuga nadando y un cangrejo caminando en el fondo del mar"
			},
			{
				title: "Aéreos",
				src: "aereos",
				alt: "Un búho y un pájaro posados sobre las ramas de un árbol y dos garzas volando"
			},
			{
				title: "Terrestres",
				src: "terrestres",
				alt: "Una jirafa, un león y un mico en la selva"
			},
		]
	};
});

nat103.controller('Act1Ctrl', function ($scope) {
	$scope.data = {
		canvas: 'huevo',
		canvasAlt: 'figura en forma de huevo',
		items: [
			{
				src: "cerdo",
				alt: "cerdo",
				answer: false
			},
			{
				src: "sapo",
				alt: "rana",
				w: 30, h: 0, t: 36, l: 16,
			},
			{
				src: "ave",
				alt: "pájaro",
				w: 44, h: 0, t: 1, l: 27,
			},
			{
				src: "tortuga",
				alt: "tortuga",
				w: 35, h: 0, t: 32, l: 47,
			},
			{
				src: "gallina",
				alt: "gallina",
				w: 40, h: 0, t: 56, l: 30,
			},
			{
				src: "caballo",
				alt: "caballo",
				answer: false
			},
		],
		chances: 4,
		minRightAnswers: 3
	};
});

nat103.controller('Act2Ctrl', function ($scope) {
	$scope.data = {
		canvas: 'circulo',
		canvasAlt: 'figura en forma de círculo',
		items: [
			{
				src: "perro",
				alt: "perro",
				w: 45, h: 0, t: 0, l: 25,
			},
			{
				src: "bebe",
				alt: "bebé",
				w: 45, h: 0, t: 30, l: 0,
			},
			{
				src: "ave",
				alt: "pájaro",
				answer: false
			},
			{
				src: "gallina",
				alt: "gallina",
				answer: false
			},
			{
				src: "cerdo",
				alt: "cerdo",
				w: 45, h: 0, t: 55, l: 26,
			},
			{
				src: "gato",
				alt: "gato",
				w: 45, h: 0, t: 28, l: 56,
			},
		],
		chances: 4,
		minRightAnswers: 3
	};
});

nat103.controller('Act3Ctrl', function ($scope) {
	$scope.data = {
		groups: [
			{
				title: 'Selva',
				resource: 'selva',
				alt: "Selva donde se muestran muchas plantas",
				items: [
					{
						resource: "tigre",
						alt: "tigre"
					},
					{
						resource: "mico",
						alt: "mico"
					},
					{
						resource: "guacamaya",
						alt: "guacamaya"
					},
				]
			},
			{
				title: 'Finca',
				resource: 'finca',
				alt: "finca",
				items: [
					{
						resource: "vaca",
						alt: "vaca"
					},
					{
						resource: "cerdo",
						alt: "cerdo"
					},
					{
						resource: "perro",
						alt: "perro"
					},
				]
			}
		],
		minRightAnswers: 4,
		chances: 6
	};
});

nat103.controller('Act4_1Ctrl', function ($scope) {
	$scope.data = {
		canvas: 'circulo',
		canvasAlt: 'figura en forma de círculo',
		items: [
			{
				src: "perro",
				alt: "perro",
				w: 45, h: 0, t: 7, l: 27,
			},
			{
				src: "ave",
				alt: "pájaro",
				answer: false
			},
			{
				src: "mariposa",
				alt: "mariposa",
				answer: false
			},
			{
				src: "pez",
				alt: "pez",
				answer: false
			},
			{
				src: "pato",
				alt: "pato",
				answer: false
			},
			{
				src: "gato",
				alt: "gato",
				w: 45, h: 0, t: 46, l: 28,
			},
		],
		chances: 2,
		minRightAnswers: 2
	};
});

nat103.controller('Act4_2Ctrl', function ($scope) {
	$scope.data = {
		canvas: 'nube',
		canvasAlt: 'figura en forma de nube',
		items: [
			{
				src: "perro",
				alt: "perro",
				answer: false
			},
			{
				src: "ave",
				alt: "pájaro",
				w: 45, h: 0, t: 34, l: 49,
			},
			{
				src: "mariposa",
				alt: "mariposa",
				w: 45, h: 0, t: 29, l: 8,
			},
			{
				src: "pez",
				alt: "pez",
				answer: false
			},
			{
				src: "pato",
				alt: "pato",
				answer: false
			},
			{
				src: "gato",
				alt: "gato",
				answer: false
			},
		],
		chances: 2,
		minRightAnswers: 2
	};
});

nat103.controller('Act4_3Ctrl', function ($scope) {
	$scope.data = {
		canvas: 'gota-de-agua',
		canvasAlt: 'figura en forma de gota de agua',
		items: [
			{
				src: "perro",
				alt: "perro",
				answer: false
			},
			{
				src: "ave",
				alt: "pájaro",
				answer: false
			},
			{
				src: "mariposa",
				alt: "mariposa",
				answer: false
			},
			{
				src: "pez",
				alt: "pez",
				w: 45, h: 0, t: 54, l: 28,
			},
			{
				src: "pato",
				alt: "pato",
				w: 45, h: 0, t: 17, l: 28,
			},
			{
				src: "gato",
				alt: "gato",
				answer: false
			},
		],
		chances: 2,
		minRightAnswers: 2
	};
});

nat103.controller('Act5Ctrl', function ($scope) {
	$scope.options = {
		data: [
			{
				src1: "vaca",
				alt1: "vaca",
				src2: "leche",
				alt2: "vaso y caja con leche"
			},
			{
				src1: "oveja",
				alt1: "oveja",
				src2: "lana",
				alt2: "lana"
			},
			{
				src1: "caballo-II",
				alt1: "caballo",
				src2: "montar-a-caballo",
				alt2: "señor montando a caballo"
			},
			{
				src1: "perro-II",
				alt1: "perro",
				src2: "senor-con-perro",
				alt2: "señor cargando un perro"
			},
			{
				src1: "gallina",
				alt1: "gallina",
				src2: "huevo-II",
				alt2: "huevo"
			},
		],
		minRightAnswers: 3,
		randomItems: true,
		randomTargets: true
	};
});
