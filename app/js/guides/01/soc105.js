var appManager = AppManager();
var soc105 = angular.module('soc105', ['activities']);

appManager.configModule(soc105, {
	resources: '../resources/01/soc/05',
	competences1:'Identifico los principales recursos naturales (renovables y no renovables)',
	competences2:'Reconoce los recursos renovables y no renovables y los asocia con su medio físico',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia sociales lección N° 5”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	farewell: 'Muy bien, ahora a cuidar los recursos naturales',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title: 'Recursos renovables y no renovables'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Recursos renovables y no renovables'
		},
		{ 
			name: '/conceptualizacion-3', 
			templateUrl: 'con3', 
			controller: 'Con3Ctrl',
			title: 'Recursos renovables y no renovables'
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
			title: 'Actividad 3'
		},
		{ 
			name: '/actividad-4', 
			templateUrl: 'act4', 
			controller: 'Act4Ctrl',
			title: 'Actividad 4',
		},
		{ 
			name: '/actividad-5', 
			templateUrl: 'act5', 
			controller: 'Act5Ctrl',
			title: 'Actividad 5',
		}
	]
});

soc105.controller('Con1Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "plantas",
			alt: "Paisaje que presenta dos árboles, pasto y flores"
		},
		{ 
			resource: "animales",
			alt: "imagen con un perro, un gato y una mariposa"
		},
		{ 
			resource: "suelo",
			alt: "imagen donde se muestra el suelo y una parte de pasto cubriéndolo por encima"
		}
	]
});

soc105.controller('Con2Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "agua",
			alt: "Paisaje donde se muestra un río rodeado de vegetación"
		},
		{ 
			resource: "aire",
			alt: "imagen donde se muestra el cielo y el aire en movimiento"
		}
	]
});

soc105.controller('Con3Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "oro",
			alt: "Tres lingotes de oro"
		},
		{ 
			resource: "petroleo",
			alt: "una gota de petróleo"
		},
		{ 
			resource: "carbon",
			alt: "Dos trozos de carbón"
		}
	]
});

soc105.controller('Act1Ctrl', function ($scope) {

	$scope.data = {
		data: [
			{
				src: "agua.png",
				alt: "Paisaje donde se muestra un río rodeado de vegetación"
			},
			{
				src: "aire.png",
				alt: "imagen donde se muestra el cielo y el aire en movimiento"
			},
			{
				src: "oro-II.png",
				alt: "tres lingotes de oro",
				answer: false
			},
			{
				src: "petroleo-II.png",
				alt: "una gota de petróleo",
				answer: false
			},
			{
				src: "animales-II.png",
				alt: "un gato"
			},
			{
				src: "plantas-II.png",
				alt: "paisaje con un árbol florecido y pasto a su alrededor"
			},
			{
				src: "suelo.png",
				alt: "imagen donde se muestra el suelo y una parte de pasto cubriéndolo por encima"
			},
			{
				src: "carbon-II.png",
				alt: "dos trozos de carbón",
				answer: false
			}
		],
		chances: 5,
		minRightAnswers: 3,
		itemsPerRow: 4
	};

});

soc105.controller('Act2Ctrl', function ($scope) {

	$scope.data = {
		data: [
			{
				src: "agua.png",
				alt: "Paisaje donde se muestra un río rodeado de vegetación",
				answer: false
			},
			{
				src: "aire.png",
				alt: "imagen donde se muestra el cielo y el aire en movimiento",
				answer: false
			},
			{
				src: "oro-II.png",
				alt: "tres lingotes de oro"
			},
			{
				src: "petroleo-II.png",
				alt: "una gota de petróleo"
			},
			{
				src: "animales-II.png",
				alt: "un gato",
				answer: false
			},
			{
				src: "plantas-II.png",
				alt: "paisaje con un árbol florecido y pasto a su alrededor",
				answer: false
			},
			{
				src: "suelo.png",
				alt: "imagen donde se muestra el suelo y una parte de pasto cubriéndolo por encima",
				answer: false
			},
			{
				src: "carbon-II.png",
				alt: "dos trozos de carbón"
			}
		],
		chances: 3,
		minRightAnswers: 2,
		itemsPerRow: 4
	};

});

soc105.controller('Act3Ctrl', function ($scope) {

	$scope.options = {
		data: [
			{
				src1: "agua-III",
				alt1: "Una gota de agua",
				src2: "beber-agua",
				alt2: "un señor tomando un vaso con agua"
			},
			{
				src1: "arbol",
				alt1: "un árbol",
				src2: "frutas",
				alt2: "tres frutas: una manzana, una pera y una naranja"
			},
			{
				src1: "oro",
				alt1: "tres lingotes de oro",
				src2: "anillos",
				alt2: "dos anillos de oro"
			},
			{
				src1: "petroleo",
				alt1: "una gota de petróleo",
				src2: "carro",
				alt2: "Un señor manejando un carro"
			}
		],
		minRightAnswers: 3,
		randomItems: true,
		randomTargets: true
	};
});

soc105.controller('Act4Ctrl', function ($scope) {
	$scope.data = {
		canvas: 'actividad',
		targets: [
			{ w: 30, h: 41, t: 0, l: 70 },
			{ w: 100, h: 28, t: 0, l: 0 },
			{ w: 19, h: 25, t: 21, l: 51 },
			{ w: 33, h: 45, t: 17, l: 0 },
			{ w: 44, h: 38, t: 41, l: 12 },
			{ w: 29, h: 28, t: 72, l: 71 }
		],
		minRightAnswers: 4
	};

});

soc105.controller('Act5Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				src: "canilla",
				alt: "Llave de agua abierta",
				options: [
					{  text: "Cerrar la llave cuando no la utilicemos", answer: true  },
					{  text: "Mantener la llave abierta", answer: false  }
				]
			},
			{
				src: "sembrar",
				alt: "niña sembrando una planta en el jardín",
				options: [
					{  text: "Dañar las plantas", answer: false  },
					{  text: "Sembrar plantas", answer: true  }
				]
			},
			{
				src: "bombillo",
				alt: "Bombillo",
				options: [
					{  text: "Apagar las luces que no necesitemos", answer: true  },
					{  text: "Prender todas las luces de la casa", answer: false  }
				]
			}
		],
		minRightAnswers: 2
	};

});
