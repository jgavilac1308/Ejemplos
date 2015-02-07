var appManager = AppManager();
var mat105 = angular.module('mat105', ['activities']);

appManager.configModule(mat105, {
	resources: '../resources/01/mat/05',
	competences1: 'Describo, comparo y cuantifico situaciones con números, en diferentes contextos y con diversas representaciones',
	competences2: 'Reconoce el uso de los conjuntos para hacer agrupaciones de objetos de acuerdo a sus características',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia matemáticas lección N° 5”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	farewell: '¡Felicitaciones!, ahora ya sabes agrupar elementos similares',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title: 'Agrupo objetos por características iguales'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Agrupo objetos por características iguales'
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

mat105.controller('Con1Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "conjunto-animales",
			alt: "Círculo con cinco animales adentro: elefante, cebra, tigre, rinoceronte y reno"
		},
		{ 
			resource: "conjunto-transporte",
			alt: "Círculo que contiene en su interior un avión, una moto, un carro y un barco"
		}
	]
});

mat105.controller('Con2Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "conjunto-frutas",
			alt: "Círculo que contiene en su interior una fresa, un banano, una pera, una naranja, una manzana y un racimo de uvas"
		},
		{ 
			resource: "conjunto-verduras",
			alt: "Círculo que contiene en su interior una zanahoria, arvejas, un tomate, un pimentón, un repollo y un ajo"
		}
	]
});

mat105.controller('Act1Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				resource: "conjunto-juguetes",
				alt: "conjunto de juguetes conformado por una muñeca, un tambor, un balde y una pala, una volqueta y un trencito de madera"
			},
			{
				resource: "conjunto-arboles",
				alt: "Conjunto conformado por tres árboles y una palmera"
			},
			{
				resource: "conjunto-zapatos",
				alt: "conjunto conformado por tres pares de zapatos de mujer y dos pares de zapatos de hombre",
				noSound: true
			},
			{
				resource: "conjunto-numeros",
				alt: "conjunto conformado por los números del uno al siete"
			}
		],
		chances: 3,
		minRightAnswers: 2
	};
});

mat105.controller('Act2Ctrl', function ($scope) {
	$scope.options = {
		data: [
			{
				src1: "conjunto-instrumentos-1",
				alt1: "Conjunto conformado por un tambor, dos maracas, una guitarra eléctrica, una trompeta y un violín",
				src2: "conjunto-instrumentos-2",
				alt2: "conjunto conformado por una pandereta, un xilófono, una batería y una guitarra"
			},
			{
				src1: "conjunto-herramientas-1",
				alt1: "conjunto conformado por un taladro, una motosierra y una segueta eléctrica",
				src2: "conjunto-herramientas-2",
				alt2: "Conjunto conformado por un destornillador, un martillo, una llave, un taladro y un pie de rey"
			},
			{
				src1: "conjunto-balones-1",
				alt1: "conjunto conformado por una bola de bolos, un balón de voleibol, una pelota de tenis y un balón de baloncesto",
				src2: "conjunto-balones-2",
				alt2: "conjunto conformado por una bola de billar, una bola de golf, un balón de baloncesto, un balón de fútbol y una pelota de beisbol"
			}
		],
		minRightAnswers: 2,
		randomItems: true,
		randomTargets: true,
		border: false,
		padding: false
	};
});

mat105.controller('Act3Ctrl', function ($scope) {
	$scope.options = {
		data: [
			{
				src1: "pez",
				alt1: "pez",
				src2: "conjunto-animales-marinos",
				alt2: "conjunto conformado por una tortuga marina, un pez, un cangrejo, una ballena y un tiburón"
			},
			{
				src1: "hamburguesa",
				alt1: "hamburguesa",
				src2: "conjunto-comida-rapida",
				alt2: "Conjunto de comida conformado por una pizza, un perro caliente y un sánduche"
			},
			{
				src1: "camiseta",
				alt1: "camiseta",
				src2: "conjunto-camisetas",
				alt2: "conjunto conformado por dos camisetas de hombre y dos camisetas de mujer"
			}
		],
		minRightAnswers: 2,
		randomItems: true,
		randomTargets: true,
		border: false,
		padding: false
	};
});

mat105.controller('Act4Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				src: "conjunto-cubiertos",
				alt: "Conjunto conformado por una cuchara, un tenedor y un cuchillo",
				options: [
					{  src: "tenedor", alt: "tenedor", answer: false  },
					{  src: "bombillo", alt: "bombillo", answer: true  }
				]
			},
			{
				src: "conjunto-muebles",
				alt: "Conjunto conformado por una cama, una silla, una mesa para el televisor y un sofá",
				options: [
					{  src: "mueble", alt: "mueble", answer: false  },
					{  src: "tijeras", alt: "tijeras", answer: true  }
				]
			},
			{
				src: "conjunto-mujeres",
				alt: "Conjunto conformado por tres mujeres",
				options: [
					{  src: "hombre", alt: "hombre", answer: true  },
					{  src: "mujer", alt: "mujer", answer: false  }
				]
			}
		],
		minRightAnswers: 2,
		optionsPerRow: 2
	};

});
