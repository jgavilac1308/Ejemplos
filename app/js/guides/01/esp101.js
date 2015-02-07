var appManager = AppManager();
var esp101 = angular.module('esp101', ['activities']);

appManager.configModule(esp101, {
	resources: '../resources/01/esp/01',
	farewell: '¡Excelente amiguito, ya conoces la letra t!',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia español lección N° 1”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados.',
	competences1:'Produzco textos escritos que responden a diversas necesidades comunicativas.',
	competences2:'Identifica las letras del abecedario relacionándolas a imágenes que comienzan por ellas.',
	routes: [
		{ 
			name: '/aprendo-la-letra-t', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title:"Lección 1: Aprendo la letra t"
		},
		{ 
			name: '/aprendo-la-letra-t-2',
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title:"Lección 1: Aprendo la letra c"
		},
		{ 
			name: '/actividad-1', 
			templateUrl: 'act1', 
			controller: 'Act1Ctrl',
			title:"Actividad 1 | Lección 1"
		},
		{ 
			name: '/actividad-2', 
			templateUrl: 'act2', 
			controller: 'Act2Ctrl',
			title:"Actividad 2 | Lección 1"
		},
		{ 
			name: '/actividad-3', 
			templateUrl: 'act3', 
			controller: 'Act2Ctrl',
			title:"Actividad 3 | Lección 1"
		},
		{ 
			name: '/actividad-4', 
			templateUrl: 'act4', 
			controller: 'Act4Ctrl',
			title:"Actividad 4 | Lección 1",
		},
		{ 
			name: '/actividad-5', 
			templateUrl: 'act5', 
			controller: 'Act5Ctrl',
			title:"Actividad 5 | Lección 1",
		}
	]
	
});

esp101.controller('Con1Ctrl', function($scope){
	$scope.test = 'hola mundo';
});

esp101.controller('Con2Ctrl', function($scope){
	$scope.data = [
		{
			resource: 'taza',
			text: '<strong>T</strong>aza'
		},
		{
			resource: 'tela',
			text: '<strong>T</strong>ela'
		},
		{
			resource: 'topo',
			text: '<strong>T</strong>opo'
		}
	];
});

esp101.controller('Act1Ctrl', function($scope){
	$scope.data = {
		items: [
			{ letter: 'c', answer: false },
			{ letter: 'T', answer: true },
			{ letter: 'd', answer: false },
			{ letter: 't', answer: true },
			{ letter: 'i', answer: false }
		],
		minRightAnswers: 2,
		chances: 2
	};
});

esp101.controller('Act2Ctrl', function($scope){
	$scope.items = [
		{
			sil: '<strong>t</strong>a',
			text: "<strong>t</strong>aza",
			resource: "taza"
		},
		{
			sil: '<strong>t</strong>e',
			text: "<strong>t</strong>ela",
			resource: "tela"
		},
		{
			sil: '<strong>t</strong>i',
			text: "<strong>t</strong>ijeras",
			resource: "tijera"
		},
		{
			sil: '<strong>t</strong>o',
			text: "<strong>t</strong>opo",
			resource: "topo"
		},
		{
			sil: '<strong>t</strong>u',
			text: "<strong>t</strong>ucán",
			resource: "tucan"
		}
	];

	$scope.options = {
		data: $scope.items,
		minRightAnswers: 1,
		randomItems: true,
		randomTargets: true
	};
});

esp101.controller('Act4Ctrl', function($scope){
	$scope.inputs = ["ta", "te", "ti", "to", "tu"]; 
});

esp101.controller('Act5Ctrl', function($scope){
	$scope.items = [
		{
			name: "televisor",
			pattern: [0, 1],
			resource: "televisor"
		},
		{
			name: "tubo",
			pattern: [0, 1],
			resource: "tubo"
		},
		{
			name: "tomate",
			pattern: [0, 1],
			resource: "tomate"
		},
		{
			name: "tacones",
			pattern: [0, 1],
			resource: "tacones"
		}
	];

	$scope.options = {
		items: $scope.items,
		chances: 8,
		minRightAnswers: 5
	};
});
