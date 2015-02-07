var appManager = AppManager();
var mat102 = angular.module('mat102', ['activities']);

appManager.configModule(mat102, {
	resources: '../resources/01/mat/02',
	competences1:'Explico –desde mi experiencia– la posibilidad o imposibilidad de ocurrencia de eventos cotidianos',
	competences2:'Diferencia entre contextos adecuados e inadecuados  y lógicos en su espacio y en el de su entorno',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia matemáticas lección N° 2”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	farewell: '¡Felicitaciones lo has hecho muy bien!',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title: 'Los absurdos'
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

mat102.controller('Con1Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "tv",
			alt: "Un señor viendo televisión, pero la imagen en la televisión se ve al revés"
		},
		{ 
			resource: "peinarse-con-escoba",
			alt: "Una niña peinándose con una escoba"
		},
		{ 
			resource: "echar-comida-en-la-lavadora",
			alt: "Una niña echando a la lavadora una hamburguesa"
		}
	];
});

mat102.controller('Act1Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				src: "pato-remando",
				alt: "Un pato montado en un bote y remando",
				answer: true	
			},
			{
				src: "dormir",
				alt: "Un niño acostado en la cama durmiendo",
				answer: false	
			},
			{
				src: "pescar-en-la-carretera",
				alt: "Un señor pescando en la carretera",
				answer: true	
			},
			{
				src: "comer",
				alt: "Un niño comiendo pollo con papitas fritas",
				answer: false	
			},
		],
		minRightAnswers: 2,
		chances: 2
	};
});

mat102.controller('Act2Ctrl', function ($scope) {

	$scope.options = {
		data: [
			{
				src1: "lluvia-saliendo-de-sombrilla",
				alt1: "Un señor cubriéndose con su sombrilla, pero de ella cae agua",
				src2: "protegerse-del-agua",
				alt2: "Un señor cubriéndose de la lluvia con su sombrilla"
			},
			{
				src1: "zapato-de-florero",
				alt1: "Una mesa y sobre ella se encuentra un zapato con flores adentro",
				src2: "florero-sobre-mesa",
				alt2: "Una mesa que tiene encima un florero con flores"
			},
			{
				src1: "tomar-el-sol-nevando",
				alt1: "Una señora con vestido de baño acostada sobre su toalla tomando el sol en época de invierno",
				src2: "tomar-el-sol",
				alt2: "Una señora con vestido de baño acostada sobre su toalla tomando el sol en un día soleado"
			}
		],
		minRightAnswers: 2,
		randomItems: true,
		randomTargets: true
	};
});

mat102.controller('Act3_1Ctrl', function ($scope) {

	$scope.data = {
		data: [
			{
				src: "pintar-con-pincel.png",
				alt: "Una señora pintando con un pincel"
			},
			{
				src: "silla.png",
				alt: "una silla"
			},
			{
				src: "avion-con-alas-de-ave.png",
				alt: "un avión con alas de un ave",
				answer: false
			},
			{
				src: "pintar-con-zanahoria.png",
				alt: "Una señora pintando con una zanahoria",
				answer: false
			},
			{
				src: "silla-con-brazos.png",
				alt: "una silla con dos brazos",
				answer: false
			},
			{
				src: "avion.png",
				alt: "un avión"
			}
		],
		minRightAnswers: 2,
		chances: 3
	};
});

mat102.controller('Act3_2Ctrl', function ($scope) {

	$scope.data = {
		data: [
			{
				src: "pintar-con-pincel.png",
				alt: "Una señora pintando con un pincel",
				answer: false
			},
			{
				src: "silla.png",
				alt: "una silla",
				answer: false
			},
			{
				src: "avion-con-alas-de-ave.png",
				alt: "un avión con alas de un ave"
			},
			{
				src: "pintar-con-zanahoria.png",
				alt: "Una señora pintando con una zanahoria"
			},
			{
				src: "silla-con-brazos.png",
				alt: "una silla con dos brazos"
			},
			{
				src: "avion.png",
				alt: "un avión",
				answer: false
			}
		],
		minRightAnswers: 2,
		chances: 3
	};
});

mat102.controller('Act4Ctrl', function ($scope) {
	$scope.data = {
		canvas: 'actividad-absurdos',
		targets: [
			{ w: 22, h: 36, t: 9, l: 74 },
			{ w: 25, h: 28, t: 13, l: 2 },
			{ w: 17, h: 22, t: 0, l: 17 },
			{ w: 17, h: 24, t: 56, l: 30 },
			{ w: 20, h: 28, t: 59, l: 80 },
			{ w: 28, h: 57, t: 40, l: 1 }
		],
		minRightAnswers: 4
	};

});
