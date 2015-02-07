var appManager = AppManager();
var nat101 = angular.module('nat101', ['activities']);

appManager.configModule(nat101, {
	resources: '../resources/01/nat/01',
	competences1: 'Describo características de seres vivos y objetos inertes, establezco semejanzas y diferencias entre ellos',
	competences2: 'Identifico seres vivos de mi entorno, siendo capaz de establecer diferencias y semejanzas',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia naturales lección N° 1”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	farewell: '¡Felicitaciones amiguito,  ahora reconoces las plantas y los animales!',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title: 'Lección 1: Las plantas y los animales'
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
	]
});

nat101.controller('Con1Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "plantas",
			alt: "Árbol rodeado por flores y pasto"
		},
		{ 
			resource: "animales",
			alt: "Vaca y caballo comiendo pasto"
		}
	]
});

nat101.controller('Act1Ctrl', function ($scope) {
	$scope.data = {
		data: [
			{
				src: "palmas.png",
				alt: "palmera",
				answer: false
			},
			{
				src: "conejo.png",
				alt: "conejo"
			},
			{
				src: "rosa.png",
				alt: "rosa",
				answer: false
			},
			{
				src: "arbol.png",
				alt: "árbol",
				answer: false
			},
			{
				src: "mariposa.png",
				alt: "mariposa"
			},
			{
				src: "gallina.png",
				alt: "gallina"
			}
		],
		minRightAnswers: 2,
		chances: 3
	};
});

nat101.controller('Act2Ctrl', function ($scope) {
	$scope.data = {
		data: [
			{
				src: "palmas.png",
				alt: "palmera"
			},
			{
				src: "conejo.png",
				alt: "conejo",
				answer: false
			},
			{
				src: "rosa.png",
				alt: "rosa"
			},
			{
				src: "arbol.png",
				alt: "árbol"
			},
			{
				src: "mariposa.png",
				alt: "mariposa",
				answer: false
			},
			{
				src: "gallina.png",
				alt: "gallina",
				answer: false
			}
		],
		minRightAnswers: 2,
		chances: 3
	};
});

nat101.controller('Act3Ctrl', function ($scope) {
	$scope.data = {
		canvas: 'animales-y-plantas',
		targets: [
			{ w: 32, h: 46, t: 13, l: 68 }, // arbol
			{ w: 23, h: 23, t: 6, l: 37 }, // ave arriba 
			{ w: 23, h: 23, t: 21, l: 46 }, // ave abajo
			{ w: 26, h: 37, t: 61, l: 68 }, // flores
			{ w: 25, h: 30, t: 45, l: 48 }, // mariposa
			{ w: 25, h: 50, t: 0, l: 13 }, // palmera atrás
			{ w: 27, h: 81, t: 19, l: 0 }, // palmera adelante
			{ w: 32, h: 50, t: 50, l: 14 }, // ardilla
		],
		minRightAnswers: 5
	};
});

nat101.controller('Act4Ctrl', function ($scope) {
	$scope.data = {
		data: [
			{
				src: "mariposa.png",
				alt: "mariposa",
			},
			{
				src: "araucaria.png",
				alt: "árbol"
			},
			{
				src: "perro.png",
				alt: "perro",
			},
			{
				src: "naranjo.png",
				alt: "naranjo"
			},
			{
				src: "ardilla.png",
				alt: "ardilla"
			},
			{
				src: "rosa.png",
				alt: "rosa",
			}
		],
		priority: true,
		minRightAnswers: 2
	};
});
