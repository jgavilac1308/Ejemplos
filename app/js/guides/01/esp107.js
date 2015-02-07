var appManager = AppManager();
var esp107 = angular.module('esp107', ['activities']);

appManager.configModule(esp107, {
	resources: '../resources/01/esp/07',
	farewell: '¡Excelente amiguito, ya conoces la letra D!',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia español lección N° 7”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados.',
	competences1:'Produzco textos escritos que responden a diversas necesidades comunicativas.',
	competences2:'Identifica las letras del abecedario relacionándolas a imágenes que comienzan por ellas.',
	routes: [
		
		{ 
			name: '/aprendo-la-letra-d', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title:"Lección 7: Aprendo la letra d"
		},
		{ 
			name: '/aprendo-la-letra-d-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title:"Lección 7: Aprendo la letra d"
		},
		{ 
			name: '/actividad-1', 
			templateUrl: 'act1', 
			controller: 'Act1Ctrl',
			title:"Actividad 1 | Lección 7"
		},
		{ 
			name: '/actividad-2', 
			templateUrl: 'act2', 
			controller: 'Act2Ctrl',
			title:"Actividad 2 | Lección 7"
		},
		{ 
			name: '/actividad-3', 
			templateUrl: 'act3', 
			controller: 'Act2Ctrl',
			title:"Actividad 3 | Lección 7"
		},
		{ 
			name: '/actividad-4', 
			templateUrl: 'act4', 
			controller: 'Act4Ctrl',
			title:"Actividad 4 | Lección 7",
		},
		{ 
			name: '/actividad-5', 
			templateUrl: 'act5', 
			controller: 'Act5Ctrl',
			title:"Actividad 5 | Lección 7",
		},
		{ 
			name: '/actividad-6', 
			templateUrl: 'act6', 
			controller: 'Act6Ctrl',
			title:"Actividad 6 | Lección 7",
		}
	]
	
});

esp107.controller('Con1Ctrl', function($scope){
	$scope.test = 'hola mundo';
});

esp107.controller('Con2Ctrl', function($scope){
	$scope.data = [
		{
			resource: 'dado',
			text: '<strong>D</strong>ado'
		},
		{
			resource: 'dientes',
			text: '<strong>D</strong>ientes'
		},
		{
			resource: 'dos',
			text: '<strong>D</strong>os'
		}
	];
});

esp107.controller('Act1Ctrl', function($scope){
	$scope.data = {
		items: [
			{ letter: 'd', answer: true },
			{ letter: 'p', answer: false },
			{ letter: 'e', answer: false },
			{ letter: 'D', answer: true },
			{ letter: 'l', answer: false }
		],
		minRightAnswers: 2,
		chances: 2
	};
});

esp107.controller('Act2Ctrl', function($scope){
	$scope.items = [
		{
			sil: '<strong>d</strong>a',
			text: "<strong>d</strong>ado",
			resource: "dado"
		},
		{
			sil: '<strong>d</strong>e',
			text: "<strong>d</strong>elfín",
			resource: "delfin"
		},
		{
			sil: '<strong>d</strong>i',
			text: "<strong>d</strong>ientes",
			resource: "dientes"
		},
		{
			sil: '<strong>d</strong>o',
			text: "<strong>d</strong>os",
			resource: "dos"
			
		},
		{
			sil: '<strong>d</strong>u',
			text: "<strong>d</strong>ulce",
			resource: "dulce"
			
		}
	];

	$scope.options = {
		data: $scope.items,
		minRightAnswers: 1,
		randomItems: true,
		randomTargets: true
	};
});

esp107.controller('Act4Ctrl', function($scope){
	$scope.inputs = ["da", "de", "di", "do", "du"]; 
});

esp107.controller('Act5Ctrl', function($scope){
	$scope.items = [
		{
			name: "delantal",
			pattern: [0, 1],
			resource: "delantal"
		},
		{
			name: "durazno",
			pattern: [0, 1],
			resource: "durazno"
		},
		{
			name: "diploma",
			pattern: [0, 1],
			resource: "diploma"
		},
		{
			name: "dominó",
			pattern: [0, 1],
			resource: "domino"
		}
	];

	$scope.options = {
		items: $scope.items,
		chances: 8,
		minRightAnswers: 5
	};
});
esp107.controller('Act6Ctrl', function($scope){
	$scope.items = [
		{
			name: "diadema",
			pattern: [0,3,4,6],
			resource: "diadema"
		},
		{
			name: "cadena",
			pattern: [0, 2,4],
			resource: "cadena"
		},
		{
			name: "bebida",
			pattern: [0, 2,4,5],
			resource: "bebida"
		},
		{
			name: "sandia",
			pattern: [0,2,3,4],
			resource: "sandia"
		},
		{
			name: "nido",
			pattern: [0,1,2,3],
			resource: "nido"
		},
		{
			name: "moneda",
			pattern: [0,1,2,3,4,5],
			resource: "moneda"
		}
	];

	$scope.options = {
		items: $scope.items,
		chances: 25,
		minRightAnswers: 13
	};
});
