var appManager = AppManager();
var soc103 = angular.module('soc103', ['activities']);

appManager.configModule(soc103, {
	resources: '../resources/01/soc/03',
	competences1:'Reconozco y describo las características físicas de las principales formas del paisaje',
	competences2:'Identifica las principales características y formas del paisaje',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia sociales lección N° 3”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados.',
	farewell: 'Felicitaciones, ya conoces la diferencia entre paisajes naturales y artificiales',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: function(){},
			title: 'El paisaje y sus elementos'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'El paisaje y sus elementos'
		},
		{ 
			name: '/conceptualizacion-3', 
			templateUrl: 'con3', 
			controller: 'Con3Ctrl',
			title: 'El paisaje y sus elementos'
		},
		{ 
			name: '/conceptualizacion-4', 
			templateUrl: 'con4', 
			controller: 'Con4Ctrl',
			title: 'El paisaje y sus elementos'
		},
		{ 
			name: '/conceptualizacion-5', 
			templateUrl: 'con5', 
			controller: 'Con5Ctrl',
			title: 'El paisaje y sus elementos'
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
			
		}
	]
});

soc103.controller('Con2Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "montanias",
			alt: "Paisaje conformado por dos montañas grandes, el cielo y el sol"
		},
		{ 
			resource: "arboles",
			alt: "Paisaje conformado por el cielo, cuatro árboles y pasto"
		},
		{ 
			resource: "animales",
			alt: "Elefante, cebra, tigre y rinoceronte caminando por el campo"
		}
	]
});

soc103.controller('Con3Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "rio",
			alt: "Paisaje conformado por un río rodeado de mucha vegetación"
		},
		{ 
			resource: "mar",
			alt: "Paisaje conformado por el cielo, el mar, la arena de la playa y las palmeras"
		}
	]
});

soc103.controller('Con4Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "edificios",
			alt: "Paisaje conformado por tres edificios altos, varios árboles y una carretera",
		},
		{ 
			resource: "casas",
			alt: "Paisaje conformado por el cielo, el pasto y dos casas"
		},
		{ 
			resource: "carros",
			alt: "Paisaje donde se muestra dos carros desplazándose por una carretera"
		}
	]
});

soc103.controller('Con5Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "carreteras",
			alt: "Paisaje conformado por una larga carretera, rodeada por árboles y un carro desplazándose por ella"
		},
		{ 
			resource: "puente",
			alt: "Paisaje donde se muestra  un puente muy largo que va por encima de un río y que comunica con una ciudad"
		}
	]
});

soc103.controller('Act1Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				src: "arcoiris",
				alt: "Arco iris" ,
				z: 2, t: -11, l: -26, w: 53
			},
			{
				src: "arbol-I",
				alt: "árbol de forma redondeada" ,
				z: 2, t: 5, l: -22, w: 88
			},
			{
				src: "arbol-II",
				alt: "Árbol de forma triangular" ,
				z: 2, t: 4, l: 44, w: 56
			},
			{
				src: "sol",
				alt: "sol" ,
				z: 2, t: -9, l: 45, w: 30
			},
			{
				src: "mariposa",
				alt: "Mariposa" ,
				z: 2, t: 48, l: 28, w: 45
			},
			{
				src: "base-montaje-elementos-nat",
				alt: "río rodeado por vegetación" ,
				z: 1 , t: 0, l: 0, w: 100
			}
		],
		minRightAnswers: 6,
		chances: 6
	};
});

soc103.controller('Act2Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				src: "edificio",
				alt: "Edificio de varios pisos" ,
				z: 2, t: 2, l: 29, w: 54
			},
			{
				src: "casa",
				alt: "casa" ,
				z: 2, t: 22, l: -2, w: 44
			},
			{
				src: "arbol-I",
				alt: "árbol" ,
				answer: false
			},
			{
				src: "base-montaje-elementos-artif",
				alt: "Carretera rodeada por vegetación y edificios" ,
				z: 1, t: 0, l: 0, w: 100
			},
			{
				src: "camioneta",
				alt: "Camioneta de color rojo" ,
				z: 2, t: 41, l: 21, w: 51
			},
			{
				src: "base-montaje-elementos-nat",
				alt: "Río rodeado por vegetación" ,
				answer: false
			}
		],
		minRightAnswers: 3,
		chances: 4
	};
});

soc103.controller('Act3Ctrl', function ($scope) {
	$scope.data = {
		canvas: 'seleccion-artificial',
		targets: [
			{ w: 46, h: 71, t: 29, l: 54 },
			{ w: 25, h: 25, t: 8, l: 0 },
			{ w: 20, h: 23, t: 10, l: 34 },
			{ w: 23, h: 23, t: 77, l: 17 },
			{ w: 25, h: 28, t: 44, l: 0 },
			{ w: 19, h: 18, t: 34, l: 33 }
		],
		minRightAnswers: 4
	};
});

soc103.controller('Act4Ctrl', function ($scope) {
	$scope.data = {
		image: 'rompecabezas-ciudad',
		rows: 2, cols: 2,
		chances: 4,
		minRightAnswers: 4
	};
});

soc103.controller('Act5Ctrl', function ($scope) {
	$scope.data = {
		image: 'rompecabezas-campo',
		rows: 2, cols: 2,
		chances: 4,
		minRightAnswers: 4
	};
});
