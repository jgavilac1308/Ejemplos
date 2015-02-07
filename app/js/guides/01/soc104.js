var appManager = AppManager();
var soc104 = angular.module('soc104', ['activities']);

appManager.configModule(soc104, {
	resources: '../resources/01/soc/04',
	competences1:'Reconozco, describo y comparo las actividades económicas de algunas personas en mi entorno y el efecto de su trabajo en la comunidad',
	competences2:'Identifico algunas profesiones y oficios propios de mi entorno social y cultural',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia sociales lección N° 4”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	farewell: '¡Felicitaciones!, ya conoces la diferencia entre profesiones y oficios',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title: 'Las profesiones y los oficios'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Las profesiones y los oficios'
		},
		{ 
			name: '/conceptualizacion-3', 
			templateUrl: 'con3', 
			controller: 'Con3Ctrl',
			title: 'Las profesiones y los oficios'
		},
		{ 
			name: '/conceptualizacion-4', 
			templateUrl: 'con4', 
			controller: 'Con4Ctrl',
			title: 'Las profesiones y los oficios'
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

soc104.controller('Con1Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "medico",
			alt: "Médico con un tarro de medicinas en su mano"
		},
		{ 
			resource: "profesor",
			alt: "Profesor enseñando las vocales en el tablero"
		},
		{ 
			resource: "enfermera",
			alt: "Enfermera con una pastilla en su mano"
		}
	]
});

soc104.controller('Con2Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "odontologo",
			alt: "Odontóloga con aparato odontológico en su mano"
		},
		{ 
			resource: "sacerdote",
			alt: "Sacerdote"
		},
		{ 
			resource: "arquitecto",
			alt: "Arquitecto con casco, sujetando en su mano varios planos"
		}
	]
});

soc104.controller('Con3Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "conductor",
			alt: "Señor manejando un taxi"
		},
		{ 
			resource: "bombero",
			alt: "Bombero con extintor a un lado"
		},
		{ 
			resource: "panadero",
			alt: "Panadero con un rodillo en sus manos"
		}
	]
});

soc104.controller('Con4Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "tendero",
			alt: "Tendero ofreciendo sus productos"
		},
		{ 
			resource: "carpintero",
			alt: "Carpintero con un serrucho y un martillo en sus manos"
		},
		{ 
			resource: "carnicero",
			alt: "Carnicero con delantal y un trozo de carne en una de sus manos"
		}
	]
});

soc104.controller('Act1Ctrl', function ($scope) {
	$scope.options = {
		data: [
			{
				src1: "profesor",
				alt1: "Profesor enseñando las vocales en el tablero",
				src2: "tablero",
				alt2: "Tablero"
			},
			{
				src1: "cocinero",
				alt1: "Chef con un pollo asado en sus manos",
				src2: "ollas",
				alt2: "Cucharón, olla y sartén"
			},
			{
				src1: "bombero",
				alt1: "Bombero con extintor a un lado",
				src2: "extintor",
				alt2: "Extintor"
			},
			{
				src1: "medico",
				alt1: "Médico con un tarro de medicinas en su mano",
				src2: "herramienta1",
				alt2: "Aparato usado por los médicos para oír los sonidos internos del cuerpo humano"
			}
		],
		minRightAnswers: 3,
		randomItems: true,
		randomTargets: true
	};
});

soc104.controller('Act2Ctrl', function ($scope) {
	// Obtenemos el audio deseado
	var source = '<audio id="audio-oficio" preload="auto">' +
					"<source src=\"" + $scope.resources + "/oficio.mp3\" type=\"audio/mpeg\">" +
				'</audio>';

	$('#main-container').append(source);

	$scope.data = {
		data: [
			{
				src: "arquitecto.png",
				alt: "Arquitecto con casco, sujetando en su mano varios planos",
				answer: false
			},
			{
				src: "panadero.png",
				alt: "Panadero con un rodillo en sus manos"
			},
			{
				src: "cirujano.png",
				alt: "Médico con una jeringa en su mano",
				answer: false
			},
			{
				src: "odontologo.png",
				alt: "Odontóloga con aparato odontológico en su mano",
				answer: false
			},
			{
				src: "pintor.png",
				alt: "Pintor con una brocha en su mano"
			},
			{
				src: "conductor.png",
				alt: "Conductor manejando un taxi"
			}
		],
		minRightAnswers: 2,
		chances: 3,
		rightAnswerCallback: function (item) {
			// Reproducimos el audio
			$('#audio-oficio')[0].play();	
		}
	};
});

soc104.controller('Act3Ctrl', function ($scope) {
	// Obtenemos el audio deseado
	var source = '<audio id="audio-profesion" preload="auto">' +
					"<source src=\"" + $scope.resources + "/profesion.mp3\" type=\"audio/mpeg\">" +
				'</audio>';

	$('#main-container').append(source);

	$scope.data = {
		data: [
			{
				src: "arquitecto.png",
				alt: "Arquitecto con casco, sujetando en su mano varios planos"
			},
			{
				src: "panadero.png",
				alt: "Panadero con un rodillo en sus manos",
				answer: false
			},
			{
				src: "cirujano.png",
				alt: "Médico con una jeringa en su mano"
			},
			{
				src: "odontologo.png",
				alt: "Odontóloga con aparato odontológico en su mano"
			},
			{
				src: "pintor.png",
				alt: "Pintor con una brocha en su mano",
				answer: false
			},
			{
				src: "conductor.png",
				alt: "Conductor manejando un taxi",
				answer: false
			}
		],
		minRightAnswers: 2,
		chances: 3,
		rightAnswerCallback: function (item) {
			// Reproducimos el audio
			$('#audio-profesion')[0].play();	
		}
	};
});

soc104.controller('Act4Ctrl', function ($scope) {

	$scope.data = {
		data: [
			{
				src: "panadero.png",
				alt: "Panadero con un rodillo en sus manos"
			},
			{
				src: "enfermera.png",
				alt: "Enfermera con una pastilla en su mano"
			},
			{
				src: "tendero.png",
				alt: "Tendero ofreciendo sus productos"
			},
			{
				src: "profesor.png",
				alt: "Profesor enseñando las vocales en el tablero"
			},
			{
				src: "pintor.png",
				alt: "Pintor con una brocha en su mano"
			},
			{
				src: "carpintero.png",
				alt: "Carpintero con un serrucho y un martillo en sus manos"
			},
			{
				src: "medico.png",
				alt: "Médico con un tarro de medicinas en su mano"
			}
		],
		minRightAnswers: 4,
		itemsPerRow: 4,
		priority: true
	};

});

soc104.controller('Act5Ctrl', function ($scope) {

	$scope.data = {
		data: [
			{
				src: "medico.png",
				alt: "Médico con un tarro de medicinas en su mano"
			},
			{
				src: "arquitecto.png",
				alt: "Arquitecto con casco, sujetando en su mano varios planos"
			},
			{
				src: "profesor.png",
				alt: "Profesor enseñando las vocales en el tablero"
			},
			{
				src: "bombero.png",
				alt: "Bombero con extintor a un lado"
			},
			{
				src: "policia.png",
				alt: "Policía"
			},
			{
				src: "cocinero.png",
				alt: "Chef con un pollo asado en sus manos"
			},
			{
				src: "odontologo.png",
				alt: "Odontóloga con aparato odontológico en su mano"
			}
		],
		minRightAnswers: 2,
		itemsPerRow: 4,
		priority: true
	};

});

