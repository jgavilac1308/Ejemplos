var appManager = AppManager();
var mat107 = angular.module('mat107', ['activities']);

appManager.configModule(mat107, {
	resources: '../resources/01/mat/07',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia matemáticas lección N° 7”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	farewell: '¡Muy bien!, has aprendido mucho',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title: 'Vamos a repasar'
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

mat107.controller('Con1Ctrl', function ($scope) {
	$scope.time = [0.2, 2, 1.5];
});

mat107.controller('Act1Ctrl', function ($scope) {
	$scope.data = {
		groups: [
			{
			sample: { class: 'red-circle' },
			items: [
				{ class: 'red-circle', answer: true },
				{ class: 'blue-triangle' },
				{ class: 'green-square' }
			]
		},
		{
			sample: { class: 'yellow-rectangle' },
			items: [
				{ class: 'yellow-rectangle', answer: true },
				{ class: 'green-square' },
				{ class: 'blue-triangle' }
			]
		},
		{
			sample: { class: 'green-square' },
			items: [
				{ class: 'green-square', answer: true },
				{ class: 'red-circle' },
				{ class: 'yellow-rectangle' }
			]
		},
		{
			sample: { class: 'blue-triangle' },
			items: [
				{ class: 'blue-triangle', answer: true },
				{ class: 'green-square' },
				{ class: 'red-circle' }
			]
		},
		],
		chances: 4,
		minRightAnswers: 3
	};

});

mat107.controller('Act2Ctrl', function ($scope) {
	$scope.data = {
		sound: 'conjunto',
		items: [
			{
			src: "eme",
			alt: "eme minúscula gris",
			answer: false,
			w: 30, h: 0, t: 0, l: 0
		},
		{
			src: "cinco",
			alt: "cinco azul",
			w: 30, h: 0, t: 65, l: 35
		},
		{
			src: "nueve",
			alt: "nueve rojo",
			w: 30, h: 0, t: 17, l: 6
		},
		{
			src: "siete",
			alt: "siete amarillo",
			w: 30, h: 0, t: 15, l: 64
		},
		{
			src: "seis",
			alt: "seis violeta",
			w: 30, h: 0, t: 47, l: 65
		},
		{
			src: "ocho",
			alt: "ocho morado",
			w: 30, h: 0, t: 47, l: 6
		},
		{
			src: "cuatro",
			alt: "cuatro naranja",
			w: 30, h: 0, t: 0, l: 34
		},
		{
			src: "i",
			alt: "i minúscula verde",
			answer: false,
			w: 30, h: 0, t: 0, l: 0
		},
		],
		chances: 6,
		minRightAnswers: 4
	};
});

mat107.controller('Act3Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				src: "avion",
				alt: "avión"
			},
			{
				src: "carro",
				alt: "carro"
			},
			{
				src: "moto",
				alt: "moto"
			}
		],
		sequence: [0, 1, 2], // Secuencia de elementos en base al index en el array
		spaces: 3, // Espacios a llenar
		minRightAnswers: 2
	};
});

mat107.controller('Act4Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				number: 1,
				src: "flor",
				alt: "flor de color fucsia"
			},
			{
				number: 2,
				src: "hoja",
				alt: "hoja de color verde"
			},
			{
				number: 3,
				src: "naranja",
				alt: "naranja"
			},
			{
				number: 4,
				src: "manzana",
				alt: "manzana roja"
			},
			{
				number: 5,
				src: "estrella",
				alt: "estrella amarilla"
			},
			{
				number: 6,
				src: "corazon",
				alt: "corazón"
			},
			{
				number: 7,
				src: "pera",
				alt: "pera verde"
			},
			{
				number: 8,
				src: "fresa",
				alt: "fresa roja"
			},
			{
				number: 9,
				src: "sol",
				alt: "sol de color amarillo y naranjado"
			}
		],
		minRightAnswers: 5
	};
});

mat107.controller('Act5Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{

				src: "sofa",
				alt: "sofa de color fucsia"
			},
			{
				src: "cama",
				alt: "cama"
			},
			{
				src: "computador",
				alt: "computador"
			},
			{
				src: "nevera",
				alt: "nevera"
			},
			{
				src: "tenedor",
				alt: "tenedor"
			},
			{
				src: "sarten",
				alt: "sartén"
			},
		],
		minRightAnswers: 4
	};
});
