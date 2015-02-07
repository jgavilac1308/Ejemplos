var appManager = AppManager();
var mat104 = angular.module('mat104', ['activities']);

appManager.configModule(mat104, {
	resources: '../resources/01/mat/04',
	competences1: 'Reconozco significados del número en diferentes contextos (medición, conteo, comparación, codificación, localización entre otros)',
	competences2: 'Compara cantidades iguales con objetos y simbolos en conjuntos',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia matemáticas lección N° 4”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	farewell: '¡Felicitaciones!, estás contando muy bien',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title: 'Cantidades iguales'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Cantidades iguales'
		},
		{ 
			name: '/conceptualizacion-3', 
			templateUrl: 'con3', 
			controller: 'Con3Ctrl',
			title: 'Cantidades iguales'
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

mat104.controller('Con1Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "cinco-gatos",
			alt: "Conjunto conformado por cinco gatos",
			number: 5
		},
		{ 
			resource: "cinco-perros",
			alt: "Conjunto conformado por cinco perros",
			number: 5
		}
	]
});

mat104.controller('Con2Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "flores",
			alt: "Conjunto conformado por cuatro flores de color naranjado",
			number: 4
		},
		{ 
			resource: "globos",
			alt: "Conjunto conformado por cuatro globos de color verde",
			number: 4
		}
	]
});

mat104.controller('Con3Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "estrellas",
			alt: "Conjunto conformado por dos estrellas",
			number: 2
		},
		{ 
			resource: "balones",
			alt: "Conjunto conformado por dos balones de colores",
			number: 2
		}
	]
});

mat104.controller('Act1Ctrl', function ($scope) {
	$scope.options = {
		data: [
			{
				src1: "conjunto-manzanas",
				alt1: "Profesor enseñando las vocales en el tablero",
				src2: "conjunto-lapices",
				alt2: "Tablero"
			},
			{
				src1: "conjunto-perros",
				alt1: "Chef con un pollo asado en sus manos",
				src2: "conjunto-sillas",
				alt2: "Cucharón, olla y sartén"
			},
			{
				src1: "conjunto-globos",
				alt1: "Bombero con extintor a un lado",
				src2: "conjunto-computadores",
				alt2: "Extintor"
			},
			{
				src1: "conjunto-helados",
				alt1: "Médico con un tarro de medicinas en su mano",
				src2: "conjunto-naranjas",
				alt2: "Aparato usado por los médicos para oír los sonidos internos del cuerpo humano"
			}
		],
		minRightAnswers: 3,
		randomItems: true,
		randomTargets: true,
		padding: false,
		border: false
	};
});

mat104.controller('Act2Ctrl', function ($scope) {
	$scope.options = {
		data: [
			{
				number: 1,
				color: "#7030A0"
			},
			{
				number: 2,
				color: "#FF0000"
			},
			{
				number: 3,
				color: "#00B050"
			},
			{
				number: 4,
				color: "#FFC000"
			},
			{
				number: 5,
				color: "#00B0F0"
			}
		],
		minRightAnswers: 3,
		randomItems: true,
		randomTargets: true,
		padding: false,
		border: false
	};
});

mat104.controller('Act3Ctrl', function ($scope) {
	$scope.options = {
		items: [
			{
				number: 2,
				textClass: "red",
				answer: true
			},	
			{
				number: 4,
				textClass: "yellow"
			},	
			{
				number: 7,
				textClass: "green"
			},	
			{
				number: 8,
				textClass: "purple",
				answer: true
			},	
			{
				number: 9,
				textClass: "blue",
				answer: true
			}
		],
		pairs: 3,
		chances: 6,
		minRightAnswers: 2
	};

});

mat104.controller('Act4Ctrl', function ($scope) {

	$scope.options = {
		data: [
			{
				number: 2,
				src: "conjunto-mesas",
				alt: "Conjunto conformado por dos mesas"
			},
			{
				number: 3,
				src: "conjunto-camas",
				alt: "conjunto conformado por tres camas"
			},
			{
				number: 4,
				src: "conjunto-sillas-2",
				alt: "Conjunto conformado por cuatro sillas"
			},
			{
				number: 5,
				src: "conjunto-cucharas",
				alt: "conjunto conformado por cinco cucharas"
			}
		],
		minRightAnswers: 3,
		randomItems: true,
		randomTargets: true,
		padding: false,
		border: false
	};
});
