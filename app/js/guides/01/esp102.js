var appManager = AppManager();
var esp102 = angular.module('esp102', ['activities']);

appManager.configModule(esp102, {
	resources: '../resources/01/esp/02',
	farewell: '¡Excelente amiguito, ya conoces los medios de comunicación!',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia español lección N° 2”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados.',
	competences1:'Reconozco los medios de comunicación masiva y caracterizo la información que difunden.',
	competences2:'Identifico los diversos medios de comunicación masiva con los que interactúo.',
	routes: [
		
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title: 'Lección 2: Los medios de comunicación'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Lección 2: Los medios de comunicación'
		},
		{ 
			name: '/actividad-1', 
			templateUrl: 'act1', 
			controller: 'Act1Ctrl',
			title: 'Actividad 1 | Lección 2'
		},
		{ 
			name: '/actividad-2', 
			templateUrl: 'act2', 
			controller: 'Act2Ctrl',
			title:"Actividad 2 | Lección 2"
		},
		{ 
			name: '/actividad-2-2', 
			templateUrl: 'act2_2', 
			controller: 'Act2_2Ctrl',
			title:"Actividad 2 | Lección 2"
		},
		{ 
			name: '/actividad-3', 
			templateUrl: 'act3', 
			controller: 'Act3Ctrl',
			title: 'Actividad 3 | Lección 2'
		}
	]
	
});

esp102.controller('Con1Ctrl', function ($scope) {
	$scope.data = [
		{ resource: "radio" },
		{ resource: "television" },
		{ resource: "periodico" }
	]
});

esp102.controller('Con2Ctrl', function ($scope) {
	$scope.data = [
		{ resource: "computador" },
		{ resource: "telefono" },
		{ resource: "carta" }
	]
});
esp102.controller('Act1Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				resource: "radio",
				alt: "Una niña hablando con un niño, pidiéndole un favor"
			},
			{
				resource: "periodico",
				alt: "Niña moviendo su mano, saludando"
			},
			{
				resource: "telefono",
				alt: "Niña compartiendo un dulce con un niño"
			},
			{
				resource: "television",
				alt: "Niño y niña dándose la mano en señal de agradecimiento"
			},
			{
				resource: "computador",
				alt: "Niña compartiendo un dulce con un niño"
			},
			{
				resource: "carta",
				alt: "Niño y niña dándose la mano en señal de agradecimiento"
			}
		],
		minRightAnswers: 3
	};
});
esp102.controller('Act2Ctrl', function($scope){
	$scope.items = [
		{
			src1: "telefono",
			src2: "hablar-por-telefono",
			alt2: "niño hablando por teléfono"
		},
		{
			src1: "computador",
			src2: "usar-computador",
			alt2: "Niño escribiendo en su computador"
		},
		{
			src1: "carta",
			src2: "escribir-carta",
			alt2: "niño escribiendo una carta"
		}
	];

	$scope.options = {
		data: $scope.items,
		minRightAnswers: 2,
		randomItems: true,
		randomTargets: true
	};
});
esp102.controller('Act2_2Ctrl', function($scope){
	$scope.items = [
		{
			src1: "radio",
			src2: "oir-radio",
			alt2: "Señor escuchando radio mediante audífonos."
		},
		{
			src1: "periodico",
			src2: "Leer-periodico",
			alt2: "Niño leyendo el periódico"
		},
		{
			src1: "television",
			src2: "ver-tv",
			alt2: "Dos niñas viendo televisión "
		}
	];

	$scope.options = {
		data: $scope.items,
		minRightAnswers: 2,
		randomItems: true,
		randomTargets: true
	};
});
esp102.controller('Act3Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				src: 'television',
				alt: 'televisión',
				answer: true	
			},
			{
				src: 'telefono',
				alt: 'teléfono',
				answer: true	
			},
			{
				src: 'computador',
				alt: 'computador',
				answer: true	
			},
			{
				src: 'carta',
				alt: 'carta',
				answer: true	
			},
			{
				src: 'radio',
				alt: 'radio',
				answer: true	
			},
			{
				src: 'periodico',
				alt: 'periódico',
				answer: true	
			},
		],
		minRightAnswers: 1,
		activateAfter: 2
		
	};
});
