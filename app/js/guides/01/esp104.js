var appManager = AppManager();
var esp104 = angular.module('esp104', ['activities']);

appManager.configModule(esp104, {
	resources: '../resources/01/esp/04',
	farewell: '¡Excelente amiguito, ya conoces la letra L!',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia español lección N° 4”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados.',
	competences1:'Produzco textos escritos que responden a diversas necesidades comunicativas.',
	competences2:'Identifica las letras del abecedario relacionándolas a imágenes que comienzan por ellas.',
	routes: [
		
		{ 
			name: '/aprendo-la-letra-l', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title:"Lección 4: Aprendo la letra l"
		},
		{ 
			name: '/aprendo-la-letra-l-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title:"Lección 4: Aprendo la letra l"
		},
		
		{ 
			name: '/actividad-1', 
			templateUrl: 'act1', 
			controller: 'Act1Ctrl',
			title:"Actividad 1 | Lección 4"
		},
		{ 
			name: '/actividad-2', 
			templateUrl: 'act2', 
			controller: 'Act2Ctrl',
			title:"Actividad 2 | Lección 4"
		},
		{ 
			name: '/actividad-3', 
			templateUrl: 'act3', 
			controller: 'Act2Ctrl',
			title:"Actividad 3 | Lección 4"
		},
		{ 
			name: '/actividad-4', 
			templateUrl: 'act4', 
			controller: 'Act4Ctrl',
			title:"Actividad 4 | Lección 4",
			
		},
		{ 
			name: '/actividad-5', 
			templateUrl: 'act5', 
			controller: 'Act5Ctrl',
			title:"Actividad 5 | Lección 4",
			
		}
	]
	
});

esp104.controller('Con1Ctrl', function($scope){
	$scope.test = 'hola mundo';
});

esp104.controller('Con2Ctrl', function($scope){
	$scope.data = [
		{
			resource: 'lampara',
			text: '<strong>L</strong>ámpara'
		},
		{
			resource: 'leon',
			text: '<strong>L</strong>eon'
		},
		{
			resource: 'luna',
			text: '<strong>L</strong>una'
		}
	];
});

esp104.controller('Act1Ctrl', function($scope){
	$scope.data = {
		items: [
			{ letter: 'm', answer: false },
			{ letter: 'L', answer: true },
			{ letter: 'p', answer: false },
			{ letter: 'l', answer: true },
			{ letter: 'o', answer: false }
		],
		minRightAnswers: 2,
		chances: 2
	};
});

esp104.controller('Act2Ctrl', function($scope){
	$scope.items = [
		{
			sil: '<strong>l</strong>a',
			text: "<strong>l</strong>ámpara",
			resource: "lampara"
		},
		{
			sil: '<strong>l</strong>e',
			text: "<strong>l</strong>eon",
			resource: "leon"
		},
		{
			sil: '<strong>l</strong>i',
			text: "<strong>l</strong>ima",
			resource: "lima"
		},
		{
			sil: '<strong>l</strong>o',
			text: "<strong>l</strong>oro",
			resource: "loro"
			
		},
		{
			sil: '<strong>l</strong>u',
			text: "<strong>l</strong>una",
			resource: "luna"
			
		}
	];

	$scope.options = {
		data: $scope.items,
		minRightAnswers: 1,
		randomItems: true,
		randomTargets: true
	};
});

esp104.controller('Act4Ctrl', function($scope){
	$scope.inputs = ["la", "le", "li", "lo", "lu"]; 
});

esp104.controller('Act5Ctrl', function($scope){
	$scope.items = [
		{
			name: "loción",
			pattern: [0, 1],
			resource: "locion"
		},
		{
			name: "lupa",
			pattern: [0, 1],
			resource: "lupa"
		},
		{
			name: "labial",
			pattern: [0, 1],
			resource: "labial"
		},
		{
			name: "libro",
			pattern: [0, 1],
			resource: "libro"
		}
	];

	$scope.options = {
		items: $scope.items,
		chances: 8,
		minRightAnswers: 5
	};
});
