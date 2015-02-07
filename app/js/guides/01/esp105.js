var appManager = AppManager();
var esp105 = angular.module('esp105', ['activities']);

appManager.configModule(esp105, {
	resources: '../resources/01/esp/05',
	farewell: '¡Excelente amiguito, ya conoces la letra B!',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia español lección N° 5”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados.',
	competences1:'Produzco textos escritos que responden a diversas necesidades comunicativas.',
	competences2:'Identifica las letras del abecedario relacionándolas a imágenes que comienzan por ellas.',
	routes: [
		
		{ 
			name: '/aprendo-la-letra-b', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title:"Lección 5: Aprendo la letra b"
		},
		{ 
			name: '/aprendo-la-letra-b-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title:"Lección 5: Aprendo la letra b"
		},

		{ 
			name: '/actividad-1', 
			templateUrl: 'act1', 
			controller: 'Act1Ctrl',
			title:"Actividad 1 | Lección 5"
		},
		{ 
			name: '/actividad-2', 
			templateUrl: 'act2', 
			controller: 'Act2Ctrl',
			title:"Actividad 2 | Lección 5"
		},
		{ 
			name: '/actividad-3', 
			templateUrl: 'act3', 
			controller: 'Act2Ctrl',
			title:"Actividad 3 | Lección 5"
		},
		{ 
			name: '/actividad-4', 
			templateUrl: 'act4', 
			controller: 'Act4Ctrl',
			title:"Actividad 4 | Lección 5",

		},
		{ 
			name: '/actividad-5', 
			templateUrl: 'act5', 
			controller: 'Act5Ctrl',
			title:"Actividad 5 | Lección 5",
	
		},
		{ 
			name: '/actividad-6', 
			templateUrl: 'act6', 
			controller: 'Act6Ctrl',
			title:"Actividad 6 | Lección 5",
	
		}
	]
	
});

esp105.controller('Con1Ctrl', function($scope){
	$scope.test = 'hola mundo';
});

esp105.controller('Con2Ctrl', function($scope){
	$scope.data = [
		{
			resource: 'balon',
			text: '<strong>B</strong>alón'
		},
		{
			resource: 'bicicleta',
			text: '<strong>B</strong>icicleta'
		},
		{
			resource: 'botas',
			text: '<strong>B</strong>otas'
		}
	];
});

esp105.controller('Act1Ctrl', function($scope){
	$scope.data = {
		items: [
			{ letter: 'b', answer: true },
			{ letter: 'i', answer: false },
			{ letter: 'p', answer: false },
			{ letter: 'l', answer: false },
			{ letter: 'B', answer: true }
		],
		minRightAnswers: 2,
		chances: 2
	};
});

esp105.controller('Act2Ctrl', function($scope){
	$scope.items = [
		{
			sil: '<strong>b</strong>a',
			text: "<strong>b</strong>alón",
			resource: "balon"
		},
		{
			sil: '<strong>b</strong>e',
			text: "<strong>b</strong>ebe",
			resource: "bebe"
		},
		{
			sil: '<strong>b</strong>i',
			text: "<strong>b</strong>icicleta",
			resource: "bicicleta"
		},
		{
			sil: '<strong>b</strong>o',
			text: "<strong>b</strong>otas",
			resource: "botas"
			
		},
		{
			sil: '<strong>b</strong>u',
			text: "<strong>b</strong>úho",
			resource: "buho"
			
		}
	];

	$scope.options = {
		data: $scope.items,
		minRightAnswers: 1,
		randomItems: true,
		randomTargets: true
	};
});

esp105.controller('Act4Ctrl', function($scope){
	$scope.inputs = ["ba", "be", "bi", "bo", "bu"]; 
});

esp105.controller('Act5Ctrl', function($scope){
	$scope.items = [
		{
			name: "baloncesto",
			pattern: [0, 1],
			resource: "baloncesto"
		},
		{
			name: "bolos",
			pattern: [0, 1],
			resource: "bolos"
		},
		{
			name: "beisbol",
			pattern: [0, 1],
			resource: "beisbol"
		},
		{
			name: "bicicross",
			pattern: [0, 1],
			resource: "bicicross"
		}
	];

	$scope.options = {
		items: $scope.items,
		chances: 8,
		minRightAnswers: 5
	};
});
esp105.controller('Act6Ctrl', function($scope){
	$scope.items = [
		{
			name: "buso",
			pattern: [0,2,],
			resource: "buso"
		},
		{
			name: "lobo",
			pattern: [0,2],
			resource: "lobo"
		},
		{
			name: "bate",
			pattern: [0,1,2],
			resource: "bate"
		},
		{
			name: "bote",
			pattern: [0,1,2],
			resource: "bote"
		},
		{
			name: "bola",
			pattern: [0,1,2,3],
			resource: "bola"
		},
		{
			name: "nube",
			pattern: [0,1,2,3],
			resource: "nube"
		}
	];

	$scope.options = {
		items: $scope.items,
		chances: 18,
		minRightAnswers: 10,
		itemsPerRow:3
	};
});
