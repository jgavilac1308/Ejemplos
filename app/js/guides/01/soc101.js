var appManager = AppManager();
var soc101 = angular.module('soc101', ['activities']);

appManager.configModule(soc101, {
	resources: '../resources/01/soc/01',
	competences1:'Reconozco y respeto diferentes puntos de vista',
	competences2:'Ubicarse en el entorno o medio en el que vive, expresando cómo lo puede cuidar y conservar',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia sociales lección N° 1”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados',
	farewell: 'Muy bien amiguito, ahora ya sabes como cuidar y conservar tu entorno',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: function () {},
			title: 'Lección 1: Ayudo a cuidar y conservar mi entorno'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Lección 1: Ayudo a cuidar y conservar mi entorno'
		},
		{ 
			name: '/conceptualizacion-3', 
			templateUrl: 'con3', 
			controller: 'Con3Ctrl',
			title: 'Lección 1: Ayudo a cuidar y conservar mi entorno'
		},
		{ 
			name: '/conceptualizacion-4', 
			templateUrl: 'con4', 
			controller: 'Con4Ctrl',
			title: 'Lección 1: Ayudo a cuidar y conservar mi entorno'
		},
		{ 
			name: '/conceptualizacion-5', 
			templateUrl: 'con5', 
			controller: 'Con5Ctrl',
			title: 'Lección 1: Ayudo a cuidar y conservar mi entorno'
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

soc101.controller('Con2Ctrl', function ($scope) {
	$scope.data = [

		{ 
			resource: "limpiar",
			alt: "Niña sacudiendo el televisor"
		},
		{ 
			resource: "organizar" ,
			alt: "Niño organizando su escritorio" 
		}
	]
});

soc101.controller('Con3Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "llave",
			alt: "Llave de agua, con un chorro de agua saliendo por ella",
			alt2: "Llave de agua cerrada"
		}
	]
});

soc101.controller('Con4Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "televisor",
			alt: "Televisor encendido",
			alt2: "televisor apagado"
		},
		{ 
			resource: "bombillo",
			alt: "bombillo encendido",
			alt2: "bombillo apagado"
		}
	]
});

soc101.controller('Con5Ctrl', function ($scope) {
	$scope.data = [
		{ 
			resource: "basura1",
			alt: "Niño recogiendo la basura del piso y arrojándola en la papelera"
		}
	]
});

soc101.controller('Act1Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				src: 'reciclar',
				alt: 'Tres papeleras empleadas para el  reciclaje',
				title: "Cardoso, R. (2007). Recycle 1 [Fotografía]. Obtenido de: http://www.sxc.hu/photo/736425",
				answer: true	
			},
			{
				src: 'plantar',
				alt: 'una mujer sembrando una planta',
				title: "Roveri, R. (2005). Planting [Fotografía]. Obtenido de: http://www.sxc.hu/photo/428778",
				answer: true	
			},
			{
				src: 'lata',
				alt: 'Una lata de gaseosa sobre la arena de la playa',
				title: "Cristian G. (2008). Can u see it? [Fotografía]. Obtenido de: http://www.sxc.hu/photo/967434",
				answer: false	
			},
			{
				src: 'basura2',
				alt: 'una señora depositando la basura en la basurera',
				title: "Gjenero S. (2008). Keep it clean [Fotografía]. Obtenido de: http://www.sxc.hu/photo/1109269",
				answer: true	
			},
			{
				src: 'chimenea',
				alt: 'una señora depositando la basura en la basurera',
				title: "Richert C. & Richert M. (2012). Industrial smokestack [Fotografía]. Obtenido de: http://www.sxc.hu/photo/1401832",
				answer: false	
			},
			{
				src: 'basura3',
				alt: 'Varias bolsas de basura arrojadas sobre la calle',
				title: "Lis J. (2005). Garbage 2 [Fotografía]. Obtenido de: http://www.sxc.hu/browse.phtml?f=view&id=348617",
				answer: false	
			}
		],
		minRightAnswers: 2,
		chances: 3
	};
});

soc101.controller('Act2Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				src: 'tender-cama',
				alt: 'Niño tendiendo su cama',
				answer: true	
			},
			{
				src: 'recoger-juguetes',
				alt: 'Niña recogiendo y guardando sus juguetes, después de jugar',
				answer: true	
			},
			{
				src: 'desordenar',
				alt: 'Niño desordenando su escritorio',
				answer: false	
			}
		],
		minRightAnswers: 2,
		chances: 2
	};
});

soc101.controller('Act3Ctrl', function ($scope) {
	$scope.data = {
		groups: [
			{
				title: 'Basura',
				resource: 'basura',
				alt: "Caneca de la basura",
				items: [
					{
						resource: 'manzana',
						alt: "Desperdicio de una manzana"
					},
					{
						resource: 'caja_vacia',
						alt: "Caja y envase vacíos"
					}
				]
			},
			{
				title: 'Escritorio',
				resource: 'escritorio',
				alt: "escritorio",
				items: [
					{
						resource: 'computador',
						alt: "Computador"
					},
					{
						resource: 'lapiz',
						alt: "Lápiz"
					},
					{
						resource: 'libro',
						alt: "Un libro de pasta naranjada"
					}
				]
			}
		],
		minRightAnswers: 3,
		chances: 5

	};
});

soc101.controller('Act4_1Ctrl', function ($scope) {
	// Obtenemos el audio deseado
	var source = '<audio id="audio-contaminacion" preload="auto">' +
					"<source src=\"" + $scope.resources + "/contaminacion.mp3\" type=\"audio/mpeg\">" +
				'</audio>';

	$('#main-container').append(source);

	$scope.data = {
		data: [
			{
				src: 'reciclar.jpg',
				alt: 'Tres papeleras empleadas para el  reciclaje',
				title: "Cardoso, R. (2007). Recycle 1 [Fotografía]. Obtenido de: http://www.sxc.hu/photo/736425",
				answer: false
			},
			{
				src: 'plantar.jpg',
				alt: 'Una mujer sembrando una planta',
				title: "Roveri, R. (2005). Planting [Fotografía]. Obtenido de: http://www.sxc.hu/photo/428778",
				answer: false
			},
			{
				src: 'chimenea.jpg',
				alt: 'La chimenea de una fábrica arrojando humo al aire libre',
				title: "Richert C. & Richert M. (2012). Industrial smokestack [Fotografía]. Obtenido de: http://www.sxc.hu/photo/1401832",
				answer: true
			},
			{
				src: 'cigarrillos.jpg',
				alt: 'Varias colillas de cigarrillo',
				title: "Jac L. (2005). Cigarettes [Fotografía]. Obtenido de: http://www.sxc.hu/photo/330326",
				answer: true
			},
			{
				src: 'botella.jpg',
				alt: 'Una botella plástica arrojada sobre la manga',
				title: "Kiser K. (2004). Litter Bug 4 [Fotografía]. Obtenido de: http://www.sxc.hu/photo/115166",
				answer: true
			},
			{
				src: 'papelera.jpg',
				alt: 'Una papelera',
				title: "Pebley G. (2008). File_13 [Fotografía]. Obtenido de: http://www.sxc.hu/photo/1020163",
				answer: false
			}
		],
		minRightAnswers: 2,
		chances: 3,
		rightAnswerCallback: function (item) {
			// Reproducimos el audio
			$('#audio-contaminacion')[0].play();	
		}
	};
});

soc101.controller('Act4_2Ctrl', function ($scope) {

	// Obtenemos el audio deseado
	var source = '<audio id="audio-proteccion" preload="auto">' +
					"<source src=\"" + $scope.resources + "/proteccion.mp3\" type=\"audio/mpeg\">" +
				'</audio>';

	$('#main-container').append(source);

	$scope.data = {
		data: [
			{
				src: 'reciclar.jpg',
				alt: 'Tres papeleras empleadas para el  reciclaje',
				title: "Cardoso, R. (2007). Recycle 1 [Fotografía]. Obtenido de: http://www.sxc.hu/photo/736425",
				answer: true
			},
			{
				src: 'plantar.jpg',
				alt: 'Una mujer sembrando una planta',
				title: "Roveri, R. (2005). Planting [Fotografía]. Obtenido de: http://www.sxc.hu/photo/428778",
				answer: true
			},
			{
				src: 'chimenea.jpg',
				alt: 'La chimenea de una fábrica arrojando humo al aire libre',
				title: "Richert C. & Richert M. (2012). Industrial smokestack [Fotografía]. Obtenido de: http://www.sxc.hu/photo/1401832",
				answer: false
			},
			{
				src: 'cigarrillos.jpg',
				alt: 'Varias colillas de cigarrillo',
				title: "Jac L. (2005). Cigarettes [Fotografía]. Obtenido de: http://www.sxc.hu/photo/330326",
				answer: false
			},
			{
				src: 'botella.jpg',
				alt: 'Una botella plástica arrojada sobre la manga',
				title: "Kiser K. (2004). Litter Bug 4 [Fotografía]. Obtenido de: http://www.sxc.hu/photo/115166",
				answer: false
			},
			{
				src: 'papelera.jpg',
				alt: 'Una papelera',
				title: "Pebley G. (2008). File_13 [Fotografía]. Obtenido de: http://www.sxc.hu/photo/1020163",
				answer: true
			}
		],
		minRightAnswers: 2,
		chances: 3,
		rightAnswerCallback: function (item) {
			// Reproducimos el audio
			$('#audio-proteccion')[0].play();	
		}
	};
});
