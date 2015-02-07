var appManager = AppManager();
var nat105 = angular.module('nat105', ['activities']);

appManager.configModule(nat105, {
	resources: '../resources/01/nat/05',
	competences1: 'Propongo y verifico diversas formas de medir sólidos y líquidos',
	competences2: 'Propone y verifica las diferentes formas que existen para medir las propiedades de los elementos',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia naturales lección N° 5”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	farewell: '¡Felicitaciones amiguito,  ahora ya sabes más sobre las propiedades de los objetos!',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title: 'Las propiedades de los objetos'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Las propiedades de los objetos'
		},
		{ 
			name: '/conceptualizacion-3', 
			templateUrl: 'con3', 
			controller: 'Con3Ctrl',
			title: 'Las propiedades de los objetos'
		},
		{ 
			name: '/conceptualizacion-4', 
			templateUrl: 'con4', 
			controller: 'Con4Ctrl',
			title: 'Las propiedades de los objetos'
		},
		{ 
			name: '/conceptualizacion-5', 
			templateUrl: 'con5', 
			controller: 'Con5Ctrl',
			title: 'Las propiedades de los objetos'
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
			name: '/actividad-1-3', 
			templateUrl: 'act1_3', 
			controller: 'Act1_3Ctrl',
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
		}
	]
});

nat105.controller('Con1Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				title: "Rectángulo",
				customClass: "figure rectangle",
				src: "rectangulo",
				alt: "Cuadro de flores con forma de rectángulo"
			},
			{
				title: "Círculo",
				customClass: "figure circle",
				src: "circulo",
				alt: "Reloj de pared con forma de círculo"
			},
			{
				title: "Cuadrado",
				customClass: "figure square",
				src: "cuadrado",
				alt: "Hojas de colores con forma de cuadro"
			},
			{
				title: "Triángulo",
				customClass: "figure triangle",
				src: "triangulo",
				alt: "Regla en forma de triángulo"
			}
		]
	};
});

nat105.controller('Con2Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "nevera",
			text: "Nevera",
			audio: "grande",
			alt: "Nevera"
		},
		{ 
			resource: "computador-II",
			text: "Computador portátil",
			audio: "pequeno",
			alt: "computador portátil"
		},
	]
});

nat105.controller('Con3Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "hoja",
			text: "Hoja de papel",
			audio: "liso",
			alt: "hoja de papel"
		},
		{ 
			resource: "madera-II",
			text: "Tabla de madera",
			audio: "aspero",
			alt: "tabla de madera"
		}
	]
});

nat105.controller('Con4Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "ladrillo",
			text: "Ladrillo",
			audio: "pesado",
			alt: "ladrillo"
		},
		{ 
			resource: "pluma",
			text: "Pluma",
			audio: "liviano",
			alt: "pluma"
		},
	]
});

nat105.controller('Con5Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "piedra",
			text: "Piedra",
			audio: "duro",
			alt: "piedra"
		},
		{ 
			resource: "pan",
			text: "Pan tajado",
			audio: "blando",
			alt: "pan tajado"
		},
	]
});

nat105.controller('Act1_1Ctrl', function ($scope) {
	$scope.data = {
		// Importante: no cambiar las posiciones. Las figuras se identifican con el index
		pos: [
			// triángulo naranja
			{ x: 745, y: 10, rot: -90 },
			// triángulo verde
			{ x: 30, y: 10, rot: -90 },
			// Romboide morado
			{ x: 493, y: 10, rot: 135 },
			// triángulo amarillo
			{ x: 620, y: 10, rot: 0 },
			// cuadro rojo
			{ x: 260, y: 10, rot: 0 },
			// triángulo azul 1
			{ x: 160, y: 10, rot: 90 },
			// triángulo azul 2
			{ x: 380, y: 10, rot: 0 }
		],
		figure: [
			// triángulo naranja
			{ x: 105, y: 0, rot: -90 },
			// triángulo verde
			{ x: 65, y: 100, rot: -90 },
			// Romboide morado
			{ x: 6, y: 14, rot: 135 },
			// triángulo amarillo
			{ x: 0, y: 85, rot: 0 },
			// cuadro rojo
			{ x: 41, y: -57, rot: 0 },
			// triángulo azul 1
			{ x: 140, y: 100, rot: 90 },
			// triángulo azul 2
			{ x: 115, y: 75, rot: 0 }
		],
		color: '#009500',
		name: 'Casa',
		chances: 8
	};
});

nat105.controller('Act1_2Ctrl', function ($scope) {
	$scope.data = {
		// Importante: no cambiar las posiciones. Las figuras se identifican con el index
		pos: [
			// triángulo naranja
			{ x: 745, y: -30, rot: -135 },
			// triángulo verde
			{ x: 30, y: 25, rot: 45 },
			// Romboide morado
			{ x: 493, y: -5, rot: 90 },
			// triángulo amarillo
			{ x: 620, y: -5, rot: 90 },
			// cuadro rojo
			{ x: 245, y: 10, rot: 45 },
			// triángulo azul 1
			{ x: 125, y: 10, rot: 90 },
			// triángulo azul 2
			{ x: 380, y: 10, rot: 0 }
		],
		figure: [
			// triángulo naranja
			{ x: 19, y: 43, rot: -135 },
			// triángulo verde
			{ x: 140, y: 64, rot: 45 },
			// Romboide morado
			{ x: -41, y: 83, rot: 90 },
			// triángulo amarillo
			{ x: 140, y: 135, rot: 90 },
			// cuadro rojo
			{ x: 150, y: -68, rot: 45 },
			// triángulo azul 1
			{ x: 9, y: 150, rot: 90 },
			// triángulo azul 2
			{ x: 200, y: -93, rot: 0 }
		],
		color: '#009500',
		name: 'Perro',
		chances: 10
	};
});

nat105.controller('Act1_3Ctrl', function ($scope) {
	$scope.data = {
		// Importante: no cambiar las posiciones. Las figuras se identifican con el index
		pos: [
			// triángulo naranja
			{ x: 745, y: 30, rot: 135 },
			// triángulo verde
			{ x: 30, y: 10, rot: 90 },
			// Romboide morado
			{ x: 513, y: 5, rot: 90, scale: { x: -1, y: 1 } },
			// triángulo amarillo
			{ x: 640, y: 5, rot: -45 },
			// cuadro rojo
			{ x: 290, y: 10, rot: 45 },
			// triángulo azul 1
			{ x: 190, y: 10, rot: -90 },
			// triángulo azul 2
			{ x: 420, y: 10, rot: -45 }
		],
		figure: [
			// triángulo naranja
			{ x: 65, y: 160, rot: 135 },
			// triángulo verde
			{ x: 130, y: 104, rot: 90 },
			// Romboide morado
			{ x: 36, y: -51, rot: 90, scale: { x: -1, y: 1 } },
			// triángulo amarillo
			{ x: 9, y: 125, rot: -45 },
			// cuadro rojo
			{ x: 11, y: 23, rot: 45 },
			// triángulo azul 1
			{ x: -15, y: 73, rot: -90 },
			// triángulo azul 2
			{ x: -7, y: -73, rot: -45 }
		],
		color: '#009500',
		name: 'Cisne',
		chances: 10
	};
});

nat105.controller('Act2Ctrl', function ($scope) {
	$scope.data = {
		groups: [
			{
				title: 'Baúl',
				resource: "baul",
				alt: "baúl",
				items: [
					{
						resource: "reloj",
						alt: "reloj de mano"
					},
					{
						resource: "anillo",
						alt: "anillo"
					},
					{
						resource: "gorra",
						alt: "gorra"
					},
				]
			},
			{
				title: 'Casa',
				resource: "casa",
				alt: "casa",
				items: [
					{
						resource: "televisor",
						alt: "televisor"
					},
					{
						resource: "estufa",
						alt: "estufa"
					},
					{
						resource: "nevera",
						alt: "nevera"
					},
				]
			}
		],
		minRightAnswers: 4,
		chances: 6
	};
});

nat105.controller('Act3Ctrl', function ($scope) {
	$scope.data = {
		groupImg: "camion",
		groupAlt: "camión",
		data: [
			{
				src: "sofa.png",
				alt: "Mueble de dos puestos",
			},
			{
				src: "ladrillos.png",
				alt: "Tres ladrillos, uno encima del otro"
			},
			{
				src: "peluche.png",
				alt: "Oso de peluche",
				answer: false
			},
			{
				src: "cojines-rosa.png",
				alt: "Dos cojines",
				answer: false
			},
			{
				src: "nevera.png",
				alt: "nevera"
			},
			{
				src: "cemento.png",
				alt: "Cuatro bultos de cemento"
			}
		],
		minRightAnswers: 3,
		chances: 4
	};
});

nat105.controller('Act4Ctrl', function ($scope) {
	$scope.data = {
		groups: [
			{
				title: "Liso",
				numInputs: 3
			},
			{
				title: "Áspero",
				numInputs: 3
			},
			{
				title: "Duro",
				numInputs: 3
			},
			{
				title: "Blando",
				numInputs: 3
			}
		]
	};
});
