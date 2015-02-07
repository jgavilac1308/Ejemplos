var appManager = AppManager();
var soc101_3 = angular.module('soc101_3', ['activities']);

appManager.configModule(soc101_3, {
	resources: '../resources/01/soc/01_3',
	farewell: '¡Muy bien!, ahora ya conoces los recursos básicos  y naturales.',
	evidencesSound:true,
	evidences: 'Ingresar al curso “Primaria incluyente”, seleccionar la herramienta actividades, actividad de evidencia, guía 3, lección 1; descargar y realizar la actividad propuesta, y enviarla al facilitador por esta misma herramienta en los tiempos programados.',
	routes:[
		{ 
			name: '/competencias', 
			templateUrl: 'comp', 
			controller: 'CompCtrl',
			title:"Estándares básicos de competencias"
		},
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: 'Con1Ctrl',
			title: 'Cuidado responsable de los recursos naturales'
		},
		{ 
			name: '/conceptualizacion-2', 
			templateUrl: 'con2', 
			controller: 'Con2Ctrl',
			title: 'Cuidado responsable de los recursos naturales'
		},
    { 
      name: '/conceptualizacion-3', 
      templateUrl: 'con3', 
      controller: 'Con3Ctrl',
      title: 'Cuidado responsable de los recursos naturales'
    },
    { 
      name: '/conceptualizacion-4', 
      templateUrl: 'con4', 
       controller: function(){},
      title: 'Cuidado responsable de los recursos naturales'
    },
    { 
      name: '/conceptualizacion-5', 
      templateUrl: 'con5', 
      controller: 'Con5Ctrl',
      title: 'Cuidado responsable de los recursos naturales'
    },
    { 
      name: '/conceptualizacion-6', 
      templateUrl: 'con6', 
      controller: 'Con6Ctrl',
      title: 'Cuidado responsable de los recursos naturales'
    },
    { 
      name: '/conceptualizacion-7', 
      templateUrl: 'con7', 
      controller: 'Con7Ctrl',
      title: 'Cuidado responsable de los recursos naturales'
    },
    { 
      name: '/conceptualizacion-8', 
      templateUrl: 'con8', 
      controller: 'Con8Ctrl',
      title: 'Cuidado responsable de los recursos naturales'
    },
    { 
      name: '/conceptualizacion-9', 
      templateUrl: 'con9', 
      controller: 'Con9Ctrl',
      title: 'Cuidado responsable de los recursos naturales'
    },
    { 
      name: '/conceptualizacion-10', 
      templateUrl: 'con10', 
      controller: 'Con10Ctrl',
      title: 'Cuidado responsable de los recursos naturales'
    },
		{ 
			name: '/actividad-1', 
			templateUrl: 'act1', 
			controller: 'Act1Ctrl',
			title: 'Actividad 1 | Lección 1'
		},
    { 
      name: '/actividad-1-2', 
      templateUrl: 'act1-2', 
      controller: 'Act1-2Ctrl',
      title: 'Actividad 1-2 | Lección 1'
    },
		{ 
			name: '/actividad-2', 
			templateUrl: 'act2', 
			controller: 'Act2Ctrl',
			title: 'Actividad 2 | Lección 1'
		},
		{ 
			name: '/actividad-3', 
			templateUrl: 'act3', 
			controller: 'Act3Ctrl',
			title: 'Actividad 3 | Lección 1'
		},
		{ 
			name: '/actividad-4', 
			templateUrl: 'act4', 
			controller: 'Act4Ctrl',
			title: 'Actividad 4 | Lección 1'
		},
    { 
      name: '/actividad-5', 
      templateUrl: 'act5', 
      controller: 'Act5Ctrl',
      title: 'Actividad 5 | Lección 1'
    },
    { 
      name: '/actividad-6', 
      templateUrl: 'act6', 
      controller: 'Act6Ctrl',
      title: 'Actividad 6 | Lección 1'
    },
    { 
      name: '/actividad-7', 
      templateUrl: 'act7', 
      controller: 'Act7Ctrl',
      title: 'Actividad 7 | Lección 1'
    }
	]
	
});

soc101_3.controller('CompCtrl', function($scope){
	$scope.data = [
		{
			title: 'Estándar de competencia:',
			text1: 'Reconozco que los recursos naturales son finitos y exigen un uso responsable.'
		},
		{
			title: 'Elementos de competencia:',
			text1: 'Toma conciencia sobre el cuidado de los recursos naturales y básicos para el sostenimiento de la sociedad.'
		}
		
	];
});

soc101_3.controller('Con1Ctrl', function($scope){
 $scope.data = {
    ext: '.png',
    customClass: 'width-700-400',
    items: [
      { 
        number:'1',
        src: "aseopersonal",
        alt: "Imagen de niña cepillándose los dientes",
      },
      { 
        number:'2',
        alt: "Imagen de  niño acostado en su cama",
        src: "acostarse"
      },
      { 
        number:'3',
        alt: "Imagen de niño feliz estudiando",
        src: "estudiar"
      },
      { 
        number:'4',
        alt: "Imagen de un joven enjabonándose con la llave del agua cerrada",
        src: "cuidar"
      },
      { 
        number:'5',
        alt: "Imagen de niña feliz comiendo algunas frutas",
        src: "nodesperdiciar"
      }
    ]
  };
});

soc101_3.controller('Con2Ctrl', function($scope,$sce){
 $scope.$root.isNextEnabled = false; // Activamos el siguiente link

  $scope.input = '';
  $scope.selectedItem = false; // elemento seleccionado

  $scope.items = [
    {
      src: "oceano",
      alt: "Hermoso océano, que representa el agua como fuente de vida.",
      text: "El agua",
      style: 'background-color: #0c64e9!important;',
      audio: 'D9',
      content:'<strong>El Agua: </strong><br><br>El agua es uno de los recursos más importantes, ya que el agua genera vida;  por ello todos debemos estar comprometidos a cuidarla, evitando contaminarla o malgastarla.'
    },
    {
      src: "alimentos",
      alt: "Imagen de varios alimentos cómo la manzana, el banano, la leche, galletas, huevos y torta.",
      text: "Los alimentos",
      style: 'background-color: #0c64e9!important;',
      audio: 'D10',
      content:'<strong>Los alimentos: </strong><br><br>Los alimentos son otro recurso tan importante como el agua,  ya que éstos nos mantienen vivos,  brindándonos energía para realizar las actividades diarias y para nuestro crecimiento. '
    },
    {
      src: "objetos",
      alt: "Imagen de libros, bolsa de papel y dinero, todos ellos elaborados con papel.",
      text: "El papel",
      style: 'background-color: #0c64e9!important;',
      audio: 'D11',
      content:'<strong>El papel:</strong><br><br>El papel es un recurso muy importante para todos, porque gracias a él podemos guardar alimentos, escribir sobre él, tener dinero y comunicarnos.'
    },
    {
      src: "energia",
      alt: "Imagen de una bombilla encendida, que representa la electricidad.",
      text: "La energía eléctrica",
      style: 'background-color: #0c64e9!important;',
      audio: 'D12',
      content:'<strong>La energía eléctrica:</strong><br><br>La electricidad es muy importante para el  desarrollo industrial de todos los países y  satisfacer nuestras necesidades básicas, preparar alimentos y utilizar aparatos tecnológicos como el computador.'
    }
  ];

  // Para usar el html en angular
    $scope.sanitize = function (item) {
      return $sce.trustAsHtml(item);
    }


  $scope.$root.selectItem = function (item) {
        $scope.selectedItem = item; // seleccionamos el objeto
        item.complete = true // completamos el item para mostrar la imagen 

        var completedItems = $scope.items.filter(function (i) {
          return i.complete;
        }).length;

        if(completedItems >= $scope.items.length) { 
          $scope.$root.isNextEnabled = true;
        }

  };

     
});

soc101_3.controller('Con3Ctrl', function($scope,$sce){
$scope.$root.isNextEnabled = false; // Activamos el siguiente link
$scope.selectedItem = false; // seleccionamos el objeto

  $scope.items = [

    {
      resource: 'sequia.png',
      alt: 'Árboles y suelo seco, a causa de un mal uso del agua.',
      title: 'Agua',
      text: 'Los seres vivos podrían morir, tanto seres humanos, como plantas y animales. Es importante no desperdiciar el agua.',
      style: 'background-color: #d44a27;'
    },
    {
      resource: 'hambre.png',
      alt: 'Niño con mucha hambre, pensado en rica comida.',
      title: 'Alimentos',
      text: 'Podríamos enfermar y morir. Es importante no desperdiciar los alimentos.',
      style: 'background-color: #d44a27;'
    },
    {
      resource: 'contaminacion.png',
      alt: 'Planeta contaminado por el mal uso del papel.',
      title: 'Papel',
      text: 'Se podría contaminar el medio ambiente, es decir, nuestro planeta. Por eso debemos evitar contaminarlo.',
      style: 'background-color: #d44a27;'
    },
    {
      resource: 'calentamiento.png',
      alt: 'Planeta Tierra sobrecalentado por el mal uso de la electricidad',
      title: 'Electricidad',
      text: 'Si la usas mal  el planeta Tierra se puede sobrecalentar',
      style: 'background-color: #d44a27;'
    }
  ];

  // Para usar el html en angular
    $scope.$root.sanitize = function (item) {
      return $sce.trustAsHtml(item);
    }

  $scope.$root.selectItem = function (item) {
        $scope.selectedItem = item; // seleccionamos el objeto
        item.complete = true // completamos el item para mostrar la imagen 

        var completedItems = $scope.items.filter(function (i) {
          return i.complete;
        }).length;

        if(completedItems >= $scope.items.length) { 
          $scope.$root.isNextEnabled = true;
        }

  };

});

soc101_3.controller('Con5Ctrl', function($scope) {
  $scope.$root.isNextEnabled = true; // Activa el botón de siguiente
  $scope.items = [
    {
      src: 'casa.png',
      text: 'Viviendas',
      alt: 'Hermosa casa',
    },
    {
      src: 'alimentos2.png',
      text: 'Alimentos',
      alt: 'Delicioso chocolate y rica torta',
    },
    {
      src: 'joyas.png',
      text: 'Joyas',
      alt: 'Hermosas argollas de oro',
    },
    {
      src: 'gasolina.png',
      text: 'Gasolina',
      alt: 'Automóvil al que  se le está poniendo gasolina',
    }
  ];
});

soc101_3.controller('Con6Ctrl', function($scope) {
  $scope.$root.isNextEnabled = true; // Activa el botón de siguiente
  $scope.items = [
    {
      src: 'nina.png',
      alt: 'Joven explicando sobre la explotación de los recursos.',
    }
  ];
});

soc101_3.controller('Con7Ctrl', function($scope){
 $scope.data = {
    ext: '.png',
    customClass: 'width-700-400',
    items: [
      { 
        number:'1',
        src: "bosque1",
        alt: "Imagen de un bosque",
      },
      { 
        number:'2',
        alt: "Imagen varios troncos de madera",
        src: "madera2"
      },
      { 
        number:'3',
        alt: "Imagen de  una casa",
        src: "vivienda"
      },
      { 
        number:'4',
        alt: "Imagen de un libro abierto",
        src: "libros"
      },
      { 
        number:'5',
        alt: "Imagen de varios muebles de madera",
        src: "muebles2"
      },
      { 
        number:'6',
        alt: "Joven sembrando varios árboles",
        src: "siembra"
      }
    ]
  };
});

soc101_3.controller('Con8Ctrl', function($scope) {
  $scope.$root.isNextEnabled = true; // Activa el botón de siguiente
  $scope.items = [
    {
      src: 'oceano.png',
      text: 'El agua hace posible la vida en la Tierra.',
      alt: 'Hermoso océano, que representa el agua como fuente de vida',
    },
    {
      src: 'lavar.png',
      text: 'Cuida el agua, recuerda cerrar la llave mientras no la utilices.',
      alt: 'Joven lavando algunos platos, ella tiene la llave del agua cerrada ya que no la está utilizando',
    }
  ];
});

soc101_3.controller('Con9Ctrl', function($scope) {
  $scope.$root.isNextEnabled = true; // Activa el botón de siguiente
  $scope.items = [
    {
      src: 'joyas.png',
      text: 'Con el oro se pueden hacer hermosas joyas, pero si se saca el oro de las minas se daña la tierra.',
      alt: 'Hermosas argollas de oro',
    },
    {
      src: 'extraeroro.png',
      text: 'El oro es costoso pero su explotación  puede dañar la tierra, por eso es mejor práctica sacar oro del río.',
      alt: 'Señor extrayendo oro de un río',
    }
  ];
});

soc101_3.controller('Con10Ctrl', function($scope) {
  $scope.$root.isNextEnabled = true; // Activa el botón de siguiente
  $scope.items = [
    {
      src: 'extraccion.png',
      text: 'Plataforma petrolera en medio del mar.',
      alt: 'Plataforma petrolera ubicada en medio del mar.',
    }
  ];
});

soc101_3.controller('Act1Ctrl', function ($scope) {
 $scope.data = {
    itemsPerRow: 4,
    items: [
    
      {
        img:"llaveagua.png",
        src:"A1-A",
        alt: "Llave de agua abierta",
        text: 'Agua',
      },
      {
        img:"hojas.png",
        src:"A1-b",
        alt: "Dos hojas de papel color rosado",
        text:'Papel',
      },
      {
        img:"alimentos3.png",
        src:"A1-C",
        alt: "Imagen de varios alimentos cómo la manzana, el banano, la leche, galletas, huevos y torta",
        text:'Alimentos',
      },
      {
        img:"bombillo.png",
        src:"A1-D",
        alt: "Imagen de bombilla encendida",
        text:'Energía',
      }
    ]  
  };
});

soc101_3.controller('Act1-2Ctrl', function ($scope) {
 $scope.data = {
    itemsPerRow: 4,
    items: [
    
      {
        img:"llavedeagua.png",
        src:"A1-2A",
        alt: "Llave de agua abierta",
        text: 'Agua',
      },
      {
        img:"petroleo.png",
        src:"A1-2B",
        alt: "Petróleo",
        text:'Petróleo',
      },
      {
        img:"oro.png",
        src:"A1-2C",
        alt: "Lingotes y monedas de oro",
        text:'Oro ',
      },
      {
        img:"madera.png",
        src:"A1-2D",
        alt: "Troncos de madera",
        text:'Madera',
      }
    ]  
  };
});

soc101_3.controller('Act2Ctrl', function ($scope) {
  $scope.items = [
    {
      sil: 'llaveagua',
      text2: 'Agua',
      text: 'Sequía',
      alt2: 'Llave de agua abierta',  
      resource: "sequia",
      alt: 'Terreno erosionado'
    },
    {
      sil: 'hojas',
      text2: 'Papel',
      alt2: 'Dos hojas de papel',
      text: 'Contaminación',
      resource: "contaminacion",
      alt: 'Planeta contaminado'
    },
    {
      sil: 'alimentos3',
      text2: 'Alimentos',
      alt2: 'Varios alimentos',
      text: 'Hambre',
      resource: "hambre",
      alt: 'Niño con hambre, pensando en comida'
    },
    {
      sil: 'bombillo',
      text2: 'Electricidad',
      alt2: 'Bombilla encendida que representa la electricidad',
      text: 'Calentamiento global',
      resource: "calentamiento",
      alt: 'Planeta Tierra sobrecalentado por el mal uso de la electricidad'
    }
  ];

  $scope.options = {
    data: $scope.items,
    minRightAnswers: 4,
    randomItems: true,
  };
});

soc101_3.controller('Act3Ctrl', function ($scope) {
  $scope.items = [
        {         
        img: 'extraeroro.png',
        altimg: 'Imagen de señor sacando oro del río, lo que es una práctica responsable',
        w: 300, h: 420, t:1 , l:1,
        options: [
              { text: "Uso responsable", answer: true},
              { text: "Uso no responsable"}
            ]
      },
        {         
        img: 'lavarse.png',
        altimg: 'Imagen de  alguien lavándose las manos, con la llave del agua cerrada mientras se enjabona',
        w: 300, h: 420, t:1 , l:36,
        options: [
              { text: "Uso responsable"},
              { text: "Uso no responsable", answer: true}
            ]
      },
      {   
        img: 'sembrar.png',
        altimg: 'Imagen de joven sembrando varias semillas de un árbol',
        w: 300, h: 420, t:1 , l:70,
        options: [
              { text: "Uso responsable", answer: true},
              { text: "Uso no responsable"}
            ]
      }
    ],

    $scope.options = {
      items: $scope.items,
      canvasStyle: 'width: 70%;height: 390px;',
      chances: 1,
      optionsrandom: true,
      minRightAnswers: 2,
      itemsPerRow : 1,
      selectindividual: true
    };
});

soc101_3.controller('Act4Ctrl', function($scope){
   $scope.data = {
    image: 'ninos',
    rows: 2, cols: 3,
    chances: 6,
    minRightAnswers: 6
  };
});

soc101_3.controller('Act5Ctrl', function ($scope) {
$scope.items = [
    {
      sil: 'llaveagua',
      text2: 'Explotación agua',
      text: 'No malgastar el agua',
      alt2: 'Llave de agua abierta',  
      resource: "lavarse",
      alt: 'Imagen de  alguien lavándose las manos, con la llave del agua cerrada mientras se enjabona'
    },
    {
      sil: 'muebles',
      text2: 'Explotación madera',
      alt2: 'Muebles de madera',
      text: 'Sembrar árboles',
      resource: "sembrar",
      alt: 'Joven plantando árboles'
    },
    {
      sil: 'mina',
      text2: 'Explotación oro',
      alt2: 'Mina de oro',
      text: 'Extracción de oro del río',
      resource: "extraeroro",
      alt: 'Señor sacando oro del río, lo que es una práctica responsable'
    },
    {
      sil: 'petroleo2',
      text2: 'Explotación petróleo',
      alt2: 'Extracción de petróleo',
      text: 'Plataforma petrolera',
      resource: "extraccion",
      alt: 'Plataforma petrolera bien construida para cuidar el mar'
    }
  ];

  $scope.options = {
    data: $scope.items,
    minRightAnswers: 4,
    randomItems: true,
  };
});

soc101_3.controller('Act6Ctrl', function ($scope) {
  $scope.data = {
    chances: 1,
    noNumber: true,
    chancesperitem: 2,
    minRightAnswers: 2,
    answerwidth:'100%',
    questions:[
      {
        text:'Selecciona aquellas prácticas que describen un comportamiento responsable en el uso de los recursos naturales.',
        items: [
        { text: "Un hombre corta cientos de árboles y no siembra ningún árbol.", answer: false },
        { text: "Varias empresas extraen petróleo del suelo y se producen varios derrames en las aguas que desembocan en el mar.", answer: false },
        { text: "Una empresa minera extrae oro usando vasijas en el río.", answer: true },
        { text: "Un niño cierra la llave del agua al lavarse los dientes. ", answer: true },
      ]
      }
    ]
  };
});

soc101_3.controller('Act7Ctrl', function ($scope) {
$scope.items = [
    {
      sil: 'Uso responsable del agua',
      resource: "ahorraragua",
      alt: 'Niño con la llave del agua cerrada, mientas se enjabona las manos'
    },
    {
      sil: 'Uso responsable de los alimentos',
      resource: "nodeperdiciar",
      alt: 'Niña comiéndose todas las frutas que su madre le ha servido'
    },
    {
      sil: 'Uso responsable del papel',
      resource: "reciclar",
      alt: 'Niño reciclando papel'
    },
    {
      sil: 'Uso responsable de la energía',
      resource: "ahorrarenergia",
      alt: 'Niño apagando una bombilla de luz que no necesita'
    }
  ];

  $scope.options = {
    data: $scope.items,
    minRightAnswers: 4,
    border: false,
    chances: 8,
    randomItems: true,
  };
});
