var appManager = AppManager();
var soc107 = angular.module('soc107', ['activities']);

appManager.configModule(soc107, {
	resources: '../resources/01/soc/07',
	competences1:'Identifico los principales recursos naturales (renovables y no renovables)',
	competences2:'Reconoce los recursos renovables y no renovables y los asocia con su medio físico',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia sociales lección N° 7”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	farewell: '¡Felicitaciones!, has aprendido mucho',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: function(){},
			title: 'Vamos a repasar'
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
			title: 'Actividad 3'
		},
		{ 
			name: '/actividad-3-2', 
			templateUrl: 'act3_2', 
			controller: 'Act3_2Ctrl',
			title: 'Actividad 3'
		},
		{ 
			name: '/actividad-4-1', 
			templateUrl: 'act4_1', 
			controller: 'Act4_1Ctrl',
			title: 'Actividad 4'
		},
		{ 
			name: '/actividad-4-2', 
			templateUrl: 'act4_2', 
			controller: 'Act4_2Ctrl',
			title: 'Actividad 4'
		}
	]
});

soc107.controller('Act1Ctrl', function ($scope) {
	$scope.options = {
		data: [
			{
				src1: "policia",
				alt1: "Policía ",
				src2: "ladron",
				alt2: "Ladrón con una bolsa en su mano donde lleva los objetos que se robó"
			},
			{
				src1: "hospital",
				alt1: "hospital",
				src2: "enfermo",
				alt2: "Niño enfermo recibiendo la fórmula médica de manos de su médico"
			},
			{
				src1: "bombero",
				alt1: "Bombero con extintor a un lado",
				src2: "incendio",
				alt2: "Casa incendiándose"
			},
			{
				src1: "colegio",
				alt1: "colegio",
				src2: "estudiar",
				alt2: "Niño con un libro en su mano, estudiando"
			}
		],
		minRightAnswers: 3,
		randomItems: true,
		randomTargets: true
	};
});

soc107.controller('Act2Ctrl', function ($scope) {
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
				src1: "cabello",
				alt1: "Niña mostrando su cabello",
				src2: "peinarse",
				alt2: "Niña peinándose su cabello con una peinilla"
			},
			{
				src1: "pie",
				alt1: "pie",
				src2: "cortar-unas",
				alt2: "Mujer cortándose las uñas de los pies con el cortauñas"
			}
		],
		minRightAnswers: 3,
		randomItems: true,
		randomTargets: true,
		rightAnswerCallback: function (item) {
			// Buscamos el elemento de audio y lo reproducimos	
			$('#audio-' + item.src2)[0].play();
		}
	};
});

soc107.controller('Act3_1Ctrl', function ($scope) {
	// Obtenemos el audio deseado
	var source = '<audio id="audio-contaminacion" preload="auto">' +
					"<source src=\"" + $scope.resources + "/contaminacion.mp3\" type=\"audio/mpeg\">" +
				'</audio>';

	$('#main-container').append(source);

	$scope.data = {
		data: [
			{
				src: "humo.png",
				alt: "Industria arrojando humo al aire libre"
			},
			{
				src: "sembrar.png",
				alt: "Niña sembrando una planta",
				answer: false
			},
			{
				src: "basurera.png",
				alt: "Joven arrojando la basura dentro de una caneca",
				answer: false
			},
			{
				src: "reciclar.png",
				alt: "Tres canecas, una para depositar el vidrio y el cartón, otra para depositar los residuos ordinarios y la tercera para depositar el material plástico",
				answer: false
			},
			{
				src: "fumar.png",
				alt: "Cenicero con tres colillas de cigarrillo"
			},
			{
				src: "basura.png",
				alt: "Basura arrojada por fuera de la caneca"
			},
		],
		minRightAnswers: 2,
		chances: 3,
		rightAnswerCallback: function (item) {
			// Reproducimos el audio
			$('#audio-contaminacion')[0].play();	
		}
	};
});

soc107.controller('Act3_2Ctrl', function ($scope) {
	// Obtenemos el audio deseado
	var source = '<audio id="audio-proteccion" preload="auto">' +
					"<source src=\"" + $scope.resources + "/proteccion.mp3\" type=\"audio/mpeg\">" +
				'</audio>';

	$('#main-container').append(source);

	$scope.data = {
		data: [
			{
				src: "humo.png",
				alt: "Industria arrojando humo al aire libre",
				answer: false
			},
			{
				src: "sembrar.png",
				alt: "Niña sembrando una planta"
			},
			{
				src: "basurera.png",
				alt: "Joven arrojando la basura dentro de una caneca"
			},
			{
				src: "reciclar.png",
				alt: "Tres canecas, una para depositar el vidrio y el cartón, otra para depositar los residuos ordinarios y la tercera para depositar el material plástico"
			},
			{
				src: "fumar.png",
				alt: "Cenicero con tres colillas de cigarrillo",
				answer: false
			},
			{
				src: "basura.png",
				alt: "Basura arrojada por fuera de la caneca",
				answer: false
			},
		],
		minRightAnswers: 2,
		chances: 3,
		rightAnswerCallback: function (item) {
			// Reproducimos el audio
			$('#audio-proteccion')[0].play();	
		}
	};
});

soc107.controller('Act4_1Ctrl', function ($scope) {

	$scope.data = {
		data: [
			{
				src: "tractor.png",
				alt: "Tractor",
				answer: false
			},
			{
				src: "animales.png",
				alt: "Tres vacas caminando por el campo",
				answer: false
			},
			{
				src: "edificio.png",
				alt: "Edificio"
			},
			{
				src: "plantas-de-banano.png",
				alt: "Cultivo de banano",
				answer: false
			},
			{
				src: "semaforo.png",
				alt: "Semáforo"
			},
			{
				src: "metroplus.png",
				alt: "Bus de Metroplús"
			},
		],
		minRightAnswers: 2,
		chances: 3
	};
});

soc107.controller('Act4_2Ctrl', function ($scope) {

	$scope.data = {
		data: [
			{
				src: "tractor.png",
				alt: "Tractor"
			},
			{
				src: "animales.png",
				alt: "Tres vacas caminando por el campo"
			},
			{
				src: "edificio.png",
				alt: "Edificio",
				answer: false
			},
			{
				src: "plantas-de-banano.png",
				alt: "Cultivo de banano"
			},
			{
				src: "semaforo.png",
				alt: "Semáforo",
				answer: false
			},
			{
				src: "metroplus.png",
				alt: "Bus de Metroplús",
				answer: false
			},
		],
		minRightAnswers: 2,
		chances: 3
	};
});
