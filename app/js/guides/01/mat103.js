var appManager = AppManager();
var mat103 = angular.module('mat103', ['activities']);

appManager.configModule(mat103, {
	resources: '../resources/01/mat/03',
	competences1:'Desarrollo habilidades para relacionar dirección, distancia y posición en el espacio',
	competences2:'Reconoce los días de la semana asociándolos con su horario de clases y demás actividades lúdicas y familiaresReconoce los días de la semana asociándolos con su horario de clases y demás actividades lúdicas y familiares',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia matemáticas lección N° 3”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	farewell: '¡Felicitaciones ahora ya sabes los días de la semana!',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title: 'Los días de la semana'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Los días de la semana'
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

mat103.controller('Con1Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "lunes",
			text: "Lunes",
			hideImg: true,
			textClass: "day yellow"
		},
		{ 
			resource: "martes",
			text: "Martes",
			hideImg: true,
			textClass: "day green"
		},
		{ 
			resource: "miercoles",
			text: "Miércoles",
			hideImg: true,
			textClass: "day blue"
		},
		{ 
			resource: "jueves",
			text: "Jueves",
			hideImg: true,
			textClass: "day red"
		},
		{ 
			resource: "viernes",
			text: "Viernes",
			hideImg: true,
			textClass: "day purple"
		},
		{ 
			resource: "sabado",
			text: "Sábado",
			hideImg: true,
			textClass: "day pink"
		},
		{ 
			resource: "domingo",
			text: "Domingo",
			hideImg: true,
			textClass: "day brown"
		}
	];
});

mat103.controller('Con2Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "estudiar",
			alt: "Niño leyendo un libro"
		},
		{ 
			resource: "trabajar",
			alt: "Señor haciendo un trabajo en su computador"
		},
		{ 
			resource: "descansar",
			alt: "Niña sentada en una silla, tomando jugo"
		}
	];
});

mat103.controller('Act1Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				resource: "lunes",
				text: "Lunes",
				textClass: "day yellow"
			},
			{
				resource: "martes",
				text: "Martes",
				textClass: "day green"
			},
			{
				resource: "miercoles",
				text: "Miércoles",
				textClass: "day blue"
			},
			{
				resource: "jueves",
				text: "Jueves",
				textClass: "day red"
			},
			{
				resource: "viernes",
				text: "Viernes",
				textClass: "day purple"
			},
			{
				resource: "sabado",
				text: "Sábado",
				textClass: "day pink"
			},
			{
				resource: "domingo",
				text: "Domingo",
				textClass: "day brown"
			}
		],
		minRightAnswers: 3
	};
});

mat103.controller('Act2Ctrl', function ($scope) {
	$scope.options = {
		data: [
		{ 
			text: "Lunes",
			audio: "lunes",
			textClass: "day yellow"
		},
		{ 
			text: "Martes",
			audio: "martes",
			textClass: "day green"
		},
		{ 
			text: "Miércoles",
			audio: "miercoles",
			textClass: "day blue"
		},
		{ 
			text: "Jueves",
			audio: "jueves",
			textClass: "day red"
		},
		{ 
			text: "Viernes",
			audio: "viernes",
			textClass: "day purple"
		},
		{ 
			text: "Sábado",
			audio: "sabado",
			textClass: "day pink"
		},
		{ 
			text: "Domingo",
			audio: "domingo",
			textClass: "day brown"
		}
		],
		chances: 7,
		minRightAnswers: 4,
		randomItems: true,
		randomTargets: true,
		rightAnswerCallback: function (item) {
			$('#audio-' + item.audio)[0].play();
		},
		border: false, // sin borde
		padding: false // sin padding
	};
});

mat103.controller('Act3Ctrl', function ($scope) {
	$scope.data = {
		groups: [
			{
				name: "Lunes",
				min: 1
			},
			{
				name: "Martes",
				min: 1
			},
			{
				name: "Miércoles",
				min: 1
			},
			{
				name: "Jueves",
				min: 1
			},
			{
				name: "Viernes"	
			},
			
		],
		stack: [
			{
				src: "icon_esp",
				alt: "Cuadrado de color naranjado que tiene en la parte superior las letras a, b y c de color blanco, este Cuadrado representa el área de español",
				copies: 2
			},
			{
				src: "icon_soc",
				alt: "Cuadrado de color azul que tiene en la parte superior el mapa de Colombia, este Cuadrado representa el área de ciencias sociales",
				copies: 2
			},
			{
				src: "icon_mat",
				alt: "Cuadrado de color rojo que tiene en la parte superior los números uno, dos y tres, este Cuadrado representa el área de matemáticas",
				copies: 2
			},
			{
				src: "icon_nat",
				alt: "Cuadrado de color verde que tiene en la parte superior un árbol de color blanco, Este Cuadrado representa el área de ciencias naturales",
				copies: 2
			}

		],
		
			maxElementsPerGroup: 2
	};
});

mat103.controller('Act4Ctrl', function ($scope) {

	$scope.data = {
		groups: [
			{
				name: "Lunes",
				min: 1
			},
			{
				name: "Martes",
				min: 1
			},
			{
				name: "Miércoles",
				min: 1
			},
			{
				name: "Jueves",
				min: 1
			},
			{
				name: "Viernes",
				min: 1
			}
		],
		stack: [
			{
				src: "ayudar",
				alt: "Niña trapeando"
			},
			{
				src: "comer",
				alt: "niña comiendo papitas fritas con pollo"
			},
			{
				src: "estudiar",
				alt: "niño estudiando",
				copies: 2
			},
			{
				src: "jugar",
				alt: "Niño y niña jugando con un balón"
			},
			{
				src: "ver-tv",
				alt: "dos niñas viendo televisión"
			},
			{
				src: "banarse",
				alt: " niño bañándose",
				copies: 2
			},
			{
				src: "descansar",
				alt: "Niña sentada en una silla, tomando jugo"
			},
			{
				src: "dormir",
				alt: "niño durmiendo sobre su cama"
			},
			{
				src: "deporte",
				alt: "niño jugando con su balón de fútbol"
			},
			{
				src: "cepillarse",
				alt: "niña cepillándose los dientes"
			},
			{
				src: "trabajar-en-computador",
				alt: "niño trabajando en su computador"
			},
			{
				src: "jugar-2",
				alt: "niña jugando con un balón"
			}
		],
		maxElementsPerGroup: 2
	};
});



