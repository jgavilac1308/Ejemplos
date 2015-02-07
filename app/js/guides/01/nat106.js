var appManager = AppManager();
var nat106 = angular.module('nat106', ['activities']);

appManager.configModule(nat106, {
	resources: '../resources/01/nat/06',
	competences1: 'Identifico diferentes estados físicos de la materia (el agua, por ejemplo) y verifico causas para su cambio de estado.',
	competences2: 'Identifica los diferentes estados físicos de la materia descubriendo su causa.',
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, hacer clic sobre el nombre “Actividades de evidencia naturales lección N° 6”, descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados.',
	farewell: '¡Felicitaciones amiguito,  ahora ya sabes más sobre la materia y sus estados!',
	routes: [
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title: 'Lección 6: La materia'
		},
		{ 
			name: '/actividad-1', 
			templateUrl: 'act1', 
			controller: 'Act1Ctrl',
			title: 'Actividad 1 | Lección 6'
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
		},
		{ 
			name: '/actividad-5', 
			templateUrl: 'act5', 
			controller: 'Act5Ctrl',
			title: 'Actividad 5',
		}
	]
});

nat106.controller('Con1Ctrl', function ($scope) {
	$scope.data = {
    items: [
      {
        title: "Líquido",
        number: "1",
        img: "jugo.png",
    	imgAlt: "Vaso con jugo en su interior",
        text: "Los líquidos no tienen forma definida, sino que se adaptan a la forma del recipiente que los Contiene. Algunos ejemplos son: el jugo, el agua, la gaseosa y la sopa",
        imgstyle: "border-radius: 50%;border: solid #009500;"
      },
      {
        title: "Sólido",
        number: "2",
        img: "ladrillos.png",
    	imgAlt: "tres ladrillos , uno encima del otro",
        text: "Los sólidos tienen forma definida, se caracterizan por ser duros y resistentes. Algunos ejemplos son: los ladrillos, la madera y las piedras.",
        imgstyle: "border-radius: 50%;border: solid #009500;"
      },
      {
        title: "Gaseoso",
        number: "3",
        img: "globos.png",
    	imgAlt: "Cinco globos de colores",
        text: "La materia en estado gaseoso no tiene forma definida, ella tiende a escaparse del recipiente que la contiene. Algunos ejemplos son: el aire en los globos y el gas en las pipetas.",
        imgstyle: "border-radius: 50%;border: solid #009500;"
      }
    ]
  }
});

nat106.controller('Act1Ctrl', function ($scope) {
	$scope.options = {
		data: [
			{
				src1: "jugo2",
				alt1: "Gaseosa de naranja",
				src2: "botella",
				alt2: "Envase de gaseosa"
			},
			{
				src1: "agua",
				alt1: "agua",
				src2: "vaso",
				alt2: "Vaso con agua"
			},
			{
				src1: "leche",
				alt1: "Leche",
				src2: "tetero",
				alt2: "Tetero"
			},
			{
				src1: "pintura",
				alt1: "pintura color rojo",
				src2: "bote",
				alt2: "tarro de pintura"
			}
		],
		minRightAnswers: 3,
		
	};
});

nat106.controller('Act2Ctrl', function ($scope) {
	$scope.options = {
		data: [
			{
				src1: "mesa",
				alt1: "Mesa",
				src2: "mesa",
				alt2: "Mesa"
			},
			{
				src1: "pina",
				alt1: "Piña",
				src2: "pina",
				alt2: "Piña"
			},
			{
				src1: "mueble",
				alt1: "Mueble",
				src2: "mueble",
				alt2: "Mueble"
			},
			{
				src1: "lapiz",
				alt1: "Lapiz",
				src2: "lapiz",
				alt2: "Lapiz"
			},
			{
				src1: "nevera",
				alt1: "Nevera",
				src2: "nevera",
				alt2: "Nevera"
			},
			{
				src1: "libro",
				alt1: "Libro",
				src2: "libro",
				alt2: "Libro"
			}
		],
		minRightAnswers: 3,
	};
});

nat106.controller('Act3Ctrl', function ($scope) {
	$scope.data = {
		items: [
			{
				src: 'estufa',
				alt: 'Tres papeleras empleadas para el  reciclaje',
				title:"Estufa",
				answer: true	
			},
			{
				src: 'equipo',
				alt: 'una mujer sembrando una planta',
				title:"Equipo de sonido",
				answer: false	
			},
			{
				src: 'carro',
				alt: 'Una lata de gaseosa sobre la arena de la playa',
				title:"Carro",
				answer: true	
			},
			{
				src: 'candela',
				alt: 'una señora depositando la basura en la basurera',
				title:"Candela",
				answer: true	
			},
			{
				src: 'calentador',
				alt: 'una señora depositando la basura en la basurera',
				title:"Calentador",
				answer: true	
			},
			{
				src: 'silla',
				alt: 'Varias bolsas de basura arrojadas sobre la calle',
				title:"Silla",
				answer: false	
			}
		],
		minRightAnswers: 3,
		chances: 4,
		itemsfloat: true
	};
});

nat106.controller('Act4Ctrl', function ($scope) {
	$scope.data = {
    chancesPerItem: 1,
    extension: '.png',
    itemsPerRow: 3,
    descriptionTop: true,
    randomItems: true,
    minRightAnswers: 3,
    data: [
      {
        resource: "manzana",
        alt: "Manzana",
        correctAnswer: "Sólido"
      },
      {
        resource: "botelladeagua",
        alt: "Botella con agua",
        correctAnswer: "Líquido"
      },
      {
        resource: "vapor",
        alt: "olla con vapor saliendo de su interior",
        correctAnswer: "Gaseoso"
      },  
    ]
  };

});

nat106.controller('Act5Ctrl', function ($scope) {
	$scope.data = {
		groups: [
			{
				title: "Sólido",
				numInputs: 3
			},
			{
				title: "Líquido",
				numInputs: 3
			},
			{
				title: "Gaseoso",
				numInputs: 3
			}
			
		]
	};
});
