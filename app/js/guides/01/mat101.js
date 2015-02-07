var appManager = AppManager();
var mat101 = angular.module('mat101', ['activities']);

appManager.configModule(mat101, {
	resources: '../resources/01/mat/01',
	competences1:'Describo, comparo y cuantifico situaciones con números, en diferentes contextos y con diversas representaciones',
	competences2:'Compara dos cantidades identificando las que corresponden a mayor que, menor que e igual a',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia matemáticas lección N° 1”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	farewell: '¡Felicitaciones lo has hecho muy bien, estas aprendiendo a contar!',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: function(){},
			title: 'Lección 1: Realizo conteos'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: function(){},
			title: 'Lección 1: Realizo conteos'
		},
		{ 
			name: '/conceptualizacion-3', 
			templateUrl: 'con3', 
			controller: 'Con3Ctrl',
			title: 'Lección 1: Realizo conteos'
		},
		{ 
			name: '/conceptualizacion-4', 
			templateUrl: 'con4', 
			controller: 'Con4Ctrl',
			title: 'Lección 1: Realizo conteos'
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
			name: '/actividad-4-1', 
			templateUrl: 'act4_1', 
			controller: 'Act4_1Ctrl',
			title: 'Actividad 4',
		},
		{ 
			name: '/actividad-4-2', 
			templateUrl: 'act4_2', 
			controller: 'Act4_2Ctrl',
			title: 'Actividad 4',
		}
	]
});

mat101.controller('Con3Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "cuatro-libros",
			alt: "Cuatro libros ubicados uno encima del otro",
			number: 4
		},
		{ 
			resource: "un-libro",
			alt: "Un libro con su pasta de color naranja",
			number: 1
		}
	]
});

mat101.controller('Con4Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "muchos-globos",
			alt: "Ramillete conformado por siete globos de diferentes colores",
			number: 7
		},
		{ 
			resource: "pocos-globos",
			alt: "Ramillete conformado por cinco globos de diferentes colores",
			number: 5
		}
	]
});

mat101.controller('Act1Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				options: [
					{  
						src: "ocho-lapices",
						alt: "Ocho lápices de colores",
						answer: true  
					},
					{  
						src: "pocos-lapices",
						alt: "Tres lápices de colores",
						answer: false  
					}
				]
			},
			{
				options: [
					{  
						src: "pocos-dulces",
						alt: "pocos dulces de colores",
						answer: false  
					},
					{  
						src: "muchos-dulces",
						alt: "muchos dulces de colores",
						answer: true  
					}
				]
			},
			{
				options: [
					{  
						src: "tres-manzanas",
						alt: "tres manzanas rojas",
						answer: true  
					},
					{  
						src: "manzana-II",
						alt: "una manzana roja",
						answer: false  
					}
				]
			},
			{
				options: [
					{  
						src: "una-colombina",
						alt: "una colombina",
						answer: false  
					},
					{  
						src: "cuatro-colombinas",
						alt: "cuatro colombinas",
						answer: true  
					}
				]
			},
		],
		minRightAnswers: 3
	};

});

mat101.controller('Act2Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				options: [
					{  
						src: "seis-zanahorias",
						alt: "seis zanahorias",
						answer: true  
					},
					{  
						src: "doce-zanahorias",
						alt: "doce zanahorias",
						answer: false  
					}
				]
			},
			{
				options: [
					{  
						src: "siete-flores",
						alt: "siete flores de diferentes colores",
						answer: false  
					},
					{  
						src: "tres-flores",
						alt: "tres flores de diferentes colores",
						answer: true  
					}
				]
			},
			{
				options: [
					{  
						src: "una-estrella",
						alt: "una estrella",
						answer: true  
					},
					{  
						src: "siete-estrellas",
						alt: "siete estrellas",
						answer: false  
					}
				]
			},
			{
				options: [
					{  
						src: "diez-peras",
						alt: "diez peras",
						answer: false  
					},
					{  
						src: "cuatro-peras",
						alt: "cuatro peras",
						answer: true  
					}
				]
			},
		],
		minRightAnswers: 3
	};

});

mat101.controller('Act3_1Ctrl', function ($scope) {
	// Obtenemos el audio deseado
	var source = '<audio id="audio-muchos" preload="auto">' +
					"<source src=\"" + $scope.resources + "/muchos.mp3\" type=\"audio/mpeg\">" +
				'</audio>';

	$('#main-container').append(source);

	$scope.data = {
		data: [
			{
				src: "tres-libros.png",
				alt: "Tres libros ubicados uno encima del otro",
				answer: false
			},
			{
				src: "diez-globos.png",
				alt: "ramillete conformado por muchos globos de diferentes colores"
			},
			{
				src: "dos-colombinas.png",
				alt: "Dos colombinas",
				answer: false
			},
			{
				src: "una-flor.png",
				alt: "una flor morada",
				answer: false
			},
			{
				src: "manzana-II.png",
				alt: "una manzana roja",
				answer: false
			},
			{
				src: "ocho-lapices.png",
				alt: "ocho lápices de diferentes colores"
			},
			{
				src: "siete-naranjas.png",
				alt: "siete naranjas"
			}
		],
		itemsPerRow: 4,
		chances: 3,
		minRightAnswers: 2,
		rightAnswerCallback: function (item) {
			// Reproducimos el audio
			$('#audio-muchos')[0].play();	
		}
	};

});

mat101.controller('Act3_2Ctrl', function ($scope) {
	// Obtenemos el audio deseado
	var source = '<audio id="audio-pocos" preload="auto">' +
					"<source src=\"" + $scope.resources + "/pocos.mp3\" type=\"audio/mpeg\">" +
				'</audio>';

	$('#main-container').append(source);

	$scope.data = {
		data: [
			{
				src: "tres-libros.png",
				alt: "Tres libros ubicados uno encima del otro"
			},
			{
				src: "diez-globos.png",
				alt: "ramillete conformado por muchos globos de diferentes colores",
				answer: false
			},
			{
				src: "dos-colombinas.png",
				alt: "Dos colombinas"
			},
			{
				src: "una-flor.png",
				alt: "una flor morada"
			},
			{
				src: "manzana-II.png",
				alt: "una manzana roja"
			},
			{
				src: "ocho-lapices.png",
				alt: "ocho lápices de diferentes colores",
				answer: false
			},
			{
				src: "siete-naranjas.png",
				alt: "siete naranjas",
				answer: false
			}
		],
		itemsPerRow: 4,
		chances: 3,
		minRightAnswers: 2,
		rightAnswerCallback: function (item) {
			// Reproducimos el audio
			$('#audio-pocos')[0].play();	
		}
	};

});

mat101.controller('Act4_1Ctrl', function ($scope) {
	// Obtenemos el audio deseado
	var source = '<audio id="audio-muchos-animales" preload="auto">' +
					"<source src=\"" + $scope.resources + "/muchos-animales.mp3\" type=\"audio/mpeg\">" +
				'</audio>';

	$('#main-container').append(source);

	$scope.data = {
		data: [
			{
				src: "pocos-animales.png",
				alt: "Un tigre y un elefante caminando por el campo",
				answer: false
			},
			{
				src: "muchos-animales.png",
				alt: "Dos tigres, una cebra, un elefante, un rinoceronte, y un reno caminando por el campo"
			}
		],
		itemsPerRow: 2,
		chances: 1,
		minRightAnswers: 1,
		rightAnswerCallback: function (item) {
			// Reproducimos el audio
			$('#audio-muchos-animales')[0].play();	
		}
	};

});

mat101.controller('Act4_2Ctrl', function ($scope) {
	// Obtenemos el audio deseado
	var source = '<audio id="audio-pocos-peces" preload="auto">' +
					"<source src=\"" + $scope.resources + "/pocos-peces.mp3\" type=\"audio/mpeg\">" +
				'</audio>';

	$('#main-container').append(source);

	$scope.data = {
		data: [
			{
				src: "muchos-peces.png",
				alt: "Seis peces de diferentes colores nadando en el agua",
				answer: false
			},
			{
				src: "pocos-peces.png",
				alt: "Tres peces de diferentes colores nadando en el agua"
			}
		],
		itemsPerRow: 2,
		chances: 1,
		minRightAnswers: 1,
		rightAnswerCallback: function (item) {
			// Reproducimos el audio
			$('#audio-pocos-peces')[0].play();	
		}
	};

});
