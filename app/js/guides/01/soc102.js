var appManager = AppManager();
var soc102 = angular.module('soc102', ['activities']);

appManager.configModule(soc102, {
	resources: '../resources/01/soc/02',
	farewell: 'Muy bien amiguito ahora ya sabes como tener una buena convivencia',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia sociales lección N° 2”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	competences1: 'Reconozco y respeto diferentes puntos de vista',
	competences2: 'Describir su entorno familiar e identificar normas, autoridades y sus funciones, para desarrollar valores cívicos y hábitos de convivencia',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: function () {},
			title: 'Las normas de convivencia'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Las normas de convivencia'
		},
		{ 
			name: '/conceptualizacion-3', 
			templateUrl: 'con3', 
			controller: 'Con3Ctrl',
			title: 'Las normas de convivencia'
		},
		{ 
			name: '/conceptualizacion-4', 
			templateUrl: 'con4', 
			controller: 'Con4Ctrl',
			title: 'Las normas de convivencia'
		},
		{ 
			name: '/conceptualizacion-5', 
			templateUrl: 'con5', 
			controller: 'Con5Ctrl',
			title: 'Las normas de convivencia'
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
		}
	]
});

soc102.controller('Con2Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "saludar",
			alt: "Niña moviendo su mano, saludando"
		},
		{ 
			resource: "despedirse",
			alt: "Una niña despidiéndose de un niño"
		},
		{ 
			resource: "dar-las-gracias",
			alt: "Un niño con su mano derecha en el pecho, en señal de agradecimiento"
		},
		{ 
			resource: "pedir-el-favor",
			alt: "Una niña hablando con un niño, pidiéndole un favor"
		}
	]
});

soc102.controller('Con3Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "escuchar",
			alt: "Una niña con una mano detrás de su oreja en señal de escucha"
		},
		{ 
			resource: "pedir-permiso",
			alt: "Un niño hablando con una niña pidiéndole permiso para tomar su juguete"
		},
		{ 
			resource: "pedir-perdon",
			alt: "Un niño con su mano derecha en el pecho y con cara triste, pidiendo perdón"
		},
		{ 
			resource: "no-gritar",
			alt: "Un niño con su boca abierta, gritando fuertemente"
		}
	];
});

soc102.controller('Con4Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "no-pegar",
			alt: "Un niño pegándole una patada a otro"
		},
		{ 
			resource: "no-escupir",
			alt: "Un niño escupiendo a otro"
		},
		{ 
			resource: "no-robar",
			alt: "Un señor tomando sin permiso la billetera del bolso de una señora"
		},
		{ 
			resource: "adultos",
			alt: "Una mujer y un hombre mayores"
		}
	];
});

soc102.controller('Con5Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "arrojar-basuras",
			text: "No arrojar basuras al piso",
			alt: "Un niño arrojando la basura a la papelera"
		},
		{ 
			resource: "escuchar-musica",
			text: "Escuchar música a bajo volumen",
			alt: "Una niña escuchando música"
		}
	];
});

soc102.controller('Act1Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				resource: "no-gritar",
				alt: "Un niño con su boca abierta, gritando fuertemente",
				answer: false
			},
			{
				resource: "saludar",
				alt: "Niña moviendo su mano, saludando",
				answer: true
			},
			{
				resource: "compartir",
				alt: "Niña compartiendo un dulce con un niño",
				answer: true
			},
			{
				resource: "dar-la-mano",
				alt: "Niño y niña dándose la mano en señal de agrado",
				answer: true
			},
			{
				resource: "escuchar",
				alt: "Una niña con una mano detrás de su oreja en señal de escucha",
				answer: true
			},
			{
				resource: "no-pegar",
				alt: "Un niño pegándole una patada a otro",
				answer: false
			},
		],
		minRightAnswers: 4	
	};
});

soc102.controller('Act2Ctrl', function ($scope) {
	$scope.data = {
		data: [
			{
				src: "orden.png",
				alt: "Dos niños compartiendo felices y en armonía en su salón de clases",
				answer: true
			},
			{
				src: "desorden.png",
				alt: "Dos niños peleando y ocasionando desorden en su salón de clases",
				answer: false
			}
		],
		chances: 1,
		minRightAnswers: 1,
		itemsPerRow: 2
	};
});

soc102.controller('Act3Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				resource: "pedir-el-favor",
				alt: "Una niña hablando con un niño, pidiéndole un favor"
			},
			{
				resource: "saludar",
				alt: "Niña moviendo su mano, saludando"
			},
			{
				resource: "compartir",
				alt: "Niña compartiendo un dulce con un niño"
			},
			{
				resource: "dar-la-mano",
				alt: "Niño y niña dándose la mano en señal de agradecimiento"
			}
		],
		minRightAnswers: 3
	};
});

soc102.controller('Act4Ctrl', function ($scope) {
	$scope.data = {
		data: [
			{
				src: "arrojar-basuras-2.png",
				alt: "Un niño arrojando la basura a la papelera",
				answer: true
			},
			{
				src: "compartir-2.png",
				alt: "Niña compartiendo un dulce con un niño",
				answer: true
			},
			{
				src: "dar-la-mano-2.png",
				alt: "Niño y niña dándose la mano en señal de agradecimiento",
				answer: true
			},
			{
				src: "no-gritar-2.png",
				alt: "No gritar",
				answer: true
			},
			{
				src: "no-robar-2.png",
				alt: "No tomar las cosas ajenas, sin pedir permiso",
				answer: true
			},
			{
				src: "saludar-2.png",
				alt: "Niña moviendo su mano, saludando",
				answer: true
			}
		],
		chances: 3,
		minRightAnswers: 3
	};
});
