var appManager = AppManager();
var esp103 = angular.module('esp103', ['activities']);

appManager.configModule(esp103, {
	resources: '../resources/01/esp/03',
	farewell: '¡Excelente amiguito, ya conoces la letra n!',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia español lección N° 3”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados.',
	competences1:'Produzco textos escritos que responden a diversas necesidades comunicativas.',
	competences2:'Identifica las letras del abecedario relacionándolas a imágenes que comienzan por ellas.',
	routes: [
		
		{ 
			name: '/aprendo-la-letra-n', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title:"Lección 3: Aprendo la letra n"
		},
		{ 
			name: '/aprendo-la-letra-n-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title:"Lección 3: Aprendo la letra n"
		},
		{ 
			name: '/actividad-1', 
			templateUrl: 'act1', 
			controller: 'Act1Ctrl',
			title:"Actividad 1 | Lección 3"
		},
		{ 
			name: '/actividad-2', 
			templateUrl: 'act2', 
			controller: 'Act2Ctrl',
			title:"Actividad 2 | Lección 3"
		},
		{ 
			name: '/actividad-3', 
			templateUrl: 'act3', 
			controller: 'Act2Ctrl',
			title:"Actividad 3 | Lección 3"
		},
		{ 
			name: '/actividad-4', 
			templateUrl: 'act4', 
			controller: 'Act4Ctrl',
			title:"Actividad 4 | Lección 3",
		},
		{ 
			name: '/actividad-5', 
			templateUrl: 'act5', 
			controller: 'Act5Ctrl',
			title:"Actividad 5 | Lección 3",
		}
	]
	
});

esp103.controller('Con1Ctrl', function($scope){
	$scope.test = 'hola mundo';
});

esp103.controller('Con2Ctrl', function($scope){
	$scope.data = [
		{
			resource: 'nino',
			text: '<strong>N</strong>iño'
		},
		{
			resource: 'nido',
			text: '<strong>N</strong>ido'
		},
		{
			resource: 'nudo',
			text: '<strong>N</strong>udo'
		}
	];
});

esp103.controller('Act1Ctrl', function($scope){
	$scope.data = {
		items: [
			{ letter: 'a', answer: false },
			{ letter: 'm', answer: false },
			{ letter: 'N', answer: true },
			{ letter: 's', answer: false },
			{ letter: 'n', answer: true }
		],
		minRightAnswers: 2,
		chances: 2
	};
});

esp103.controller('Act2Ctrl', function($scope){
	$scope.items = [
		{
			sil: '<strong>n</strong>a',
			text: "<strong>n</strong>aranja",
			resource: "naranja"
		},
		{
			sil: '<strong>n</strong>e',
			text: "<strong>n</strong>evera",
			resource: "nevera"
		},
		{
			sil: '<strong>n</strong>i',
			text: "<strong>n</strong>iño",
			resource: "nino"
		},
		{
			sil: '<strong>n</strong>o',
			text: "<strong>n</strong>ota",
			resource: "nota"
			
		},
		{
			sil: '<strong>n</strong>u',
			text: "<strong>n</strong>ube",
			resource: "nube"
			
		}
	];

	$scope.options = {
		data: $scope.items,
		minRightAnswers: 1,
		randomItems: true,
		randomTargets: true
	};
});

esp103.controller('Act4Ctrl', function($scope){
	$scope.inputs = ["na", "ne", "ni", "no", "nu"]; 
});

esp103.controller('Act5Ctrl', function($scope){
	$scope.items = [
		{
			name: "nevera",
			pattern: [0, 1],
			resource: "nevera"
		},
		{
			name: "naranja",
			pattern: [0, 1],
			resource: "naranja"
		},
		{
			name: "niña",
			pattern: [0, 1],
			resource: "niña"
		},
		{
			name: "nueces",
			pattern: [0, 1],
			resource: "nueces"
		}
	];

	$scope.options = {
		items: $scope.items,
		chances: 8,
		minRightAnswers: 5
	};
});
