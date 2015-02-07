var appManager = AppManager();
var soc106 = angular.module('soc106', ['activities']);

appManager.configModule(soc106, {
	resources: '../resources/01/soc/06',
	competences1:'Cuido mi cuerpo y mis relaciones con los demás',
	competences2:'Realiza acciones de autocuidado con su cuerpo aplicándolas en su vida diaria',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia sociales lección N° 6”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	farewell: 'Muy bien, ahora ya sabes como cuidar tu cuerpo',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title: 'Cuido mi cuerpo'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Cuido mi cuerpo'
		},
		{ 
			name: '/conceptualizacion-3', 
			templateUrl: 'con3', 
			controller: 'Con3Ctrl',
			title: 'Cuido mi cuerpo'
		},
		{ 
			name: '/conceptualizacion-4', 
			templateUrl: 'con4', 
			controller: 'Con4Ctrl',
			title: 'Cuido mi cuerpo'
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
	]
});

soc106.controller('Con1Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "banarse",
			alt: "Niño bañándose"
		}
	]
});

soc106.controller('Con2Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "lavar-dientes",
			alt: "Niña lavándose los dientes"
		}
	]
});

soc106.controller('Con3Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "jugar",
			alt: "Niño en silla de ruedas y niña jugando con un balón"
		}
	]
});

soc106.controller('Con4Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "dormir",
			alt: "Niño acostado en su cama durmiendo"
		}
	]
});

soc106.controller('Act1Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				src: "lavar-dientes",
				alt: "Niña lavándose los dientes",
				answer: true
			},
			{
				src: "banarse",
				alt: "Niño bañándose",
				answer: true
			},
			{
				src: "nina-comiendo",
				alt: "Niña comiendo con las manos sucias",
				answer: false
			},
			{
				src: "lavarse-las-manos",
				alt: "Niño lavándose las manos en el lavamanos",
				answer: true
			}
		],
		minRightAnswers: 2,
		chances: 3
	};
});

soc106.controller('Act2Ctrl', function ($scope) {
	$scope.options = {
		data: [
			{
				src1: "manos",
				alt1: "Manos",
				src2: "lavarse-las-manos",
				alt2: "Niño lavándose las manos en el lavamanos"
			},
			{
				src1: "dientes",
				alt1: "boca abierta donde se pueden ver los dientes y la lengua",
				src2: "lavar-dientes",
				alt2: "Niña lavándose los dientes"
			},
			{
				src1: "pie",
				alt1: "pie",
				src2: "cortar-unas",
				alt2: "Mujer cortándose las uñas de los pies con el cortauñas"
			}
		],
		minRightAnswers: 2,
		randomItems: true,
		randomTargets: true,
		rightAnswerCallback: function (item) {
			// Buscamos el elemento de audio y lo reproducimos	
			$('#audio-' + item.src2)[0].play();
		}
	};
});

soc106.controller('Act3Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				resource: "peinarse",
				alt: "Niña peinándose el cabello con una peinilla"
			},
			{
				resource: "lavarse-las-manos",
				alt: "Niño lavándose las manos en el lavamanos"
			},
			{
				resource: "lavar-dientes",
				alt: "Niña lavándose los dientes"
			},
			{
				resource: "banarse",
				alt: "Niño bañándose"
			}
		],
		minRightAnswers: 3
	};
});
