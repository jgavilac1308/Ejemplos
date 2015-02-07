var appManager = AppManager();
var esp106 = angular.module('esp106', ['activities']);

appManager.configModule(esp106, {
	resources: '../resources/01/esp/06',
	farewell: '¡Excelente amiguito, ya conoces la letra C!',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia español lección N° 6”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados.',
	competences1:'Produzco textos escritos que responden a diversas necesidades comunicativas.',
	competences2:'Identifica las letras del abecedario relacionándolas a imágenes que comienzan por ellas.',
	routes: [
		
		{ 
			name: '/aprendo-la-letra-c', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title:"Lección 6: Aprendo la letra c"
		},
		{ 
			name: '/aprendo-la-letra-c-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title:"Lección 6: Aprendo la letra c"
		},
		{ 
			name: '/actividad-1', 
			templateUrl: 'act1', 
			controller: 'Act1Ctrl',
			title:"Actividad 1 | Lección 6"
		},
		{ 
			name: '/actividad-2', 
			templateUrl: 'act2', 
			controller: 'Act2Ctrl',
			title:"Actividad 2 | Lección 6"
		},
		{ 
			name: '/actividad-3', 
			templateUrl: 'act3', 
			controller: 'Act2Ctrl',
			title:"Actividad 3 | Lección 6"
		},
		{ 
			name: '/actividad-4', 
			templateUrl: 'act4', 
			controller: 'Act4Ctrl',
			title:"Actividad 4 | Lección 6",
		},
		{ 
			name: '/actividad-5', 
			templateUrl: 'act5', 
			controller: 'Act5Ctrl',
			title:"Actividad 5 | Lección 6",
		},
		{ 
			name: '/actividad-6', 
			templateUrl: 'act6', 
			controller: 'Act6Ctrl',
			title:"Actividad 6 | Lección 6",
		}
	]
	
});

esp106.controller('Con1Ctrl', function($scope){
	$scope.test = 'hola mundo';
});

esp106.controller('Con2Ctrl', function($scope){
	$scope.data = [
		{
			resource: 'casa',
			text: '<strong>C</strong>asa'
		},
		{
			resource: 'corazon',
			text: '<strong>C</strong>orazón'
		},
		{
			resource: 'cuchara',
			text: '<strong>C</strong>uchara'
		}
	];
});

esp106.controller('Act1Ctrl', function($scope){
	$scope.data = {
		items: [
			{ letter: 'b', answer: false },
			{ letter: 'o', answer: false },
			{ letter: 'C', answer: true },
			{ letter: 'm', answer: false },
			{ letter: 'c', answer: true }
		],
		minRightAnswers: 2,
		chances: 2
	};
});

esp106.controller('Act2Ctrl', function($scope){
	$scope.items = [
		{
			sil: '<strong>c</strong>a',
			text: "<strong>c</strong>asa",
			resource: "casa"
		},
		{
			sil: '<strong>c</strong>e',
			text: "<strong>c</strong>ebra",
			resource: "cebra"
		},
		{
			sil: '<strong>c</strong>i',
			text: "<strong>c</strong>isce",
			resource: "cisne"
		},
		{
			sil: '<strong>c</strong>o',
			text: "<strong>c</strong>orazón",
			resource: "corazon"
			
		},
		{
			sil: '<strong>c</strong>u',
			text: "<strong>c</strong>uchara",
			resource: "cuchara"
			
		}
	];

	$scope.options = {
		data: $scope.items,
		minRightAnswers: 1,
		randomItems: true,
		randomTargets: true
	};
});

esp106.controller('Act4Ctrl', function($scope){
	$scope.inputs = ["ca", "ce", "ci", "co", "cu"]; 
});

esp106.controller('Act5Ctrl', function($scope){
	$scope.items = [
		{
			name: "cama",
			pattern: [0, 1],
			resource: "cama"
		},
		{
			name: "computador",
			pattern: [0, 1],
			resource: "computador"
		},
		{
			name: "cebolla",
			pattern: [0, 1],
			resource: "cebolla"
		},
		{
			name: "cubiertos",
			pattern: [0, 1],
			resource: "cubiertos"
		}
	];

	$scope.options = {
		items: $scope.items,
		chances: 8,
		minRightAnswers: 5
	};
});
esp106.controller('Act6Ctrl', function($scope){
	$scope.items = [
		{
			name: "cono",
			pattern: [0,2],
			resource: "cono"
		},
		{
			name: "copa",
			pattern: [0, 2],
			resource: "copa"
		},
		{
			name: "boca",
			pattern: [0, 1,2],
			resource: "boca"
		},
		{
			name: "ceja",
			pattern: [0,1,2],
			resource: "ceja"
		},
		{
			name: "cometa",
			pattern: [0,1,2,3,4,5],
			resource: "cometa"
		},
		{
			name: "camisa",
			pattern: [0,1,2,3,4,5],
			resource: "camisa"
		}
	];

	$scope.options = {
		items: $scope.items,
		chances: 22,
		minRightAnswers: 12
	};
});
