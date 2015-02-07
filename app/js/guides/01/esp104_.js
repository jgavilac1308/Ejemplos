var appManager = AppManager();
var esp104_ = angular.module('esp104_', ['activities']);

appManager.configModule(esp104_, {
	resources: '../resources/01/esp/04_',
	farewell: 'Muy bien, ahora ya sabes escribir más palabras con el abecedario',
	routes: [
		
		{ 
			name: '/conceptualizacion-1', 
			templateUrl: 'con1', 
			controller: function(){},
			title:"Lección 4: El abecedario y las palabras"
		},		
		{ 
			name: '/actividad-1', 
			templateUrl: 'act1', 
			controller: 'Act1Ctrl',
			title:"Actividad 1 | Lección 4"
		},
		{ 
			name: '/actividad-1-2', 
			templateUrl: 'act1-2', 
			controller: 'Act1-2Ctrl',
			title:"Actividad 1-2 | Lección 4"
		},
		{ 
			name: '/actividad-1-3', 
			templateUrl: 'act1-3', 
			controller: 'Act1-3Ctrl',
			title:"Actividad 1-3 | Lección 4"
		},
		{ 
			name: '/actividad-1-4', 
			templateUrl: 'act1-4', 
			controller: 'Act1-4Ctrl',
			title:"Actividad 1-4 | Lección 4"
		},
		{ 
			name: '/actividad-1-5', 
			templateUrl: 'act1-5', 
			controller: 'Act1-5Ctrl',
			title:"Actividad 1-5 | Lección 4"
		},
		{ 
			name: '/actividad-1-6', 
			templateUrl: 'act1-6', 
			controller: 'Act1-6Ctrl',
			title:"Actividad 1-6 | Lección 4"
		},
		{ 
			name: '/actividad-1-7', 
			templateUrl: 'act1-7', 
			controller: 'Act1-7Ctrl',
			title:"Actividad 1-7 | Lección 4"
		},
		{ 
			name: '/actividad-2', 
			templateUrl: 'act2', 
			controller: 'Act2Ctrl',
			title:"Actividad 2 | Lección 4"
		},
		{ 
			name: '/actividad-2-2', 
			templateUrl: 'act2-2', 
			controller: 'Act2-2Ctrl',
			title:"Actividad 2-2 | Lección 4"
		},
		{ 
			name: '/actividad-3', 
			templateUrl: 'act3', 
			controller: 'Act3Ctrl',
			title:"Actividad 3 | Lección 4"
		},
		{ 
			name: '/actividad-3-2', 
			templateUrl: 'act3-2', 
			controller: 'Act3-2Ctrl',
			title:"Actividad 3-2 | Lección 4"
		},
		{ 
			name: '/actividad-3-3', 
			templateUrl: 'act3-3', 
			controller: 'Act3-3Ctrl',
			title:"Actividad 3-3 | Lección 4"
		},
		{ 
			name: '/actividad-4', 
			templateUrl: 'act4', 
			controller: 'Act4Ctrl',
			title:"Actividad 4 | Lección 4",
			
		},
		{ 
			name: '/actividad-4-2', 
			templateUrl: 'act4-2', 
			controller: 'Act4-2Ctrl',
			title:"Actividad 4-2 | Lección 4",
			
		},
		{ 
			name: '/actividad-4-3', 
			templateUrl: 'act4-3', 
			controller: 'Act4-3Ctrl',
			title:"Actividad 4-3 | Lección 4",
			
		},
		{ 
			name: '/actividad-4-4', 
			templateUrl: 'act4-4', 
			controller: 'Act4-4Ctrl',
			title:"Actividad 4-4 | Lección 4",
			
		},
		{ 
			name: '/actividad-4-5', 
			templateUrl: 'act4-5', 
			controller: 'Act4-5Ctrl',
			title:"Actividad 4-5 | Lección 4",
			
		},
		{ 
			name: '/actividad-5', 
			templateUrl: 'act5', 
			controller: 'Act5Ctrl',
			title:"Actividad 5 | Lección 4",
		},
		{ 
			name: '/actividad-5-2', 
			templateUrl: 'act5-2', 
			controller: 'Act5-2Ctrl',
			title:"Actividad 5-2 | Lección 4",
		},
		{ 
			name: '/actividad-5-3', 
			templateUrl: 'act5-3', 
			controller: 'Act5-3Ctrl',
			title:"Actividad 5-3 | Lección 4",
		},
		{ 
			name: '/actividad-6', 
			templateUrl: 'act6', 
			controller: 'Act6Ctrl',
			title:"Actividad 6 | Lección 4",
			
		},
	]
	
});

esp104_.controller('Act1Ctrl', function($scope){
   $scope.data = {

      minRightAnswers: 2,
      itemsPerRow: 1, //define el tamaño de las palabras 
      chancesPerItem: 2,
      preserveOriginal: 'keep', //define si el item que se arrastra se conserva
      groups:[
         {
          img: 'pelota.png',
          alt: 'Pelota de color azul',
          answer:['p','e','l','o','t','a'],
          items: [
            'a',
            'e',
            't',
            'o',
            'p',
            'l'
          ]
        },
        {
          img: 'cometa.png',
          alt: 'Cometa de color rojo y amarillo',
          answer:['c','o','m','e','t','a'],
          items: [
            'e',
            'a',
            't',
            'o',
            'm',
            'c'
          ]
        },
        {
          img: 'camisa.png',
          alt: 'Camisa de hombre color verde',
          answer:['c','a','m','i','s','a'],
          items: [
            'a',
            's',
            'a',
            'i',
            'm',
            'c'
          ]
        }
      ]
  }
});

esp104_.controller('Act1-2Ctrl', function($scope){
   $scope.data = {

      minRightAnswers: 2,
      itemsPerRow: 1, //define el tamaño de las palabras 
      chancesPerItem: 2,
      preserveOriginal: 'keep', //define si el item que se arrastra se conserva
      groups:[
         {
          img: 'mariposa.png',
          alt: 'Mariposa azul, rosada y negra',
          answer:['m','a','r','i','p','o','s','a'],
          items: [
            'm',
            'p',
            's',
            'o',
            'a',
            'i',
            'r',
            'a'
          ]
        },
        {
          img: 'tomate.png',
          alt: 'Tomate rojo',
          answer:['t','o','m','a','t','e'],
          items: [
            't',
            'a',
            't',
            'o',
            'm',
            'e'
          ]
        },
        {
          img: 'elefante.png',
          alt: 'Elefante gris',
          answer:['e','l','e','f','a','n','t','e'],
          items: [
            'e',
            'l',
            'a',
            'n',
            't',
            'e',
            'f',
            'e'
          ]
        }
      ]
  }
});

esp104_.controller('Act1-3Ctrl', function($scope){
	$scope.items = [
		{
			name: "micrófono",
			pattern: [0, 1],
			resource: "microfono",
			alt: "Micrófono"
		},
		{
			name: "mono",
			pattern: [0, 1],
			resource: "mono",
			alt: "Mono comiendo un banano"
		},
		{
			name: "maleta",
			pattern: [4, 5],
			resource: "maleta",
			alt: "Maleta color café"
		},
		{
			name: "lupa",
			pattern: [0, 1],
			resource: "lupa",
			alt: "Lupa"
		},
		{
			name: "paraguas",
			pattern: [0, 1],
			resource: "paraguas",
			alt: "Paraguas de color amarillo y blanco"
		},
		{
			name: "pila",
			pattern: [0, 1],
			resource: "pila",
			alt: "Pila"
		}
	];

	$scope.options = {
		items: $scope.items,
		chances: 12,
		minRightAnswers: 8,
		itemsPerRow: 300
	};
});

esp104_.controller('Act1-4Ctrl', function($scope){
	$scope.items = [
		{
			name: "pera",
			pattern: [2, 3],
			resource: "pera",
			alt: "Pera"
		},
		{
			name: "pintura",
			pattern: [3, 4],
			resource: "botepintura",
			alt: "Bote de pintura color blanco"
		},
		{
			name: "zapatos",
			pattern: [2, 3],
			resource: "zapatos",
			alt: "Par de zapatos color café"
		},
		{
			name: "queso",
			pattern: [0, 1, 2],
			resource: "queso",
			alt: "Queso"
		},
		{
			name: "rosa",
			pattern: [2, 3],
			resource: "rosa",
			alt: "Rosa roja"
		},
		{
			name: "serrucho",
			pattern: [0, 1],
			resource: "serrucho",
			alt: "Serrucho"
		}
	];

	$scope.options = {
		items: $scope.items,
		chances: 12,
		minRightAnswers: 8,
		itemsPerRow: 3
	};
});

esp104_.controller('Act1-5Ctrl', function($scope){
	$scope.items = [
		{
			name: "silla",
			pattern: [0, 1],
			resource: "silla",
			alt: "Silla de madera"
		},
		{
			name: "semaforo",
			pattern: [0, 1],
			resource: "semaforo",
			alt: "Semáforo"
		},
		{
			name: "serpiente",
			pattern: [0, 1],
			resource: "serpiente",
			alt: "Serpiente"
		},
		{
			name: "palmera",
			pattern: [3, 4],
			resource: "palmera",
			alt: "Palmera"
		},
		{
			name: "piña",
			pattern: [0, 1],
			resource: "pina",
			alt: "piña"
		},
		{
			name: "camisa",
			pattern: [2, 3],
			resource: "camisa",
			alt: "Camisa de hombre color verde"
		}
	];

	$scope.options = {
		items: $scope.items,
		chances: 12,
		minRightAnswers: 8,
		itemsPerRow: 3
	};
});

esp104_.controller('Act1-6Ctrl', function($scope){
	$scope.items = [
		{
			name: "Mesa",
			pattern: [1, 2, 3],
			resource: "mesa",
			alt: "Mesa"
		},
		{
			name: "Fresa",
			pattern: [1, 2, 3, 4],
			resource: "fresa",
			alt: "Fresa"
		},
		{
			name: "Manzana",
			pattern: [1, 2, 3, 4, 5, 6],
			resource: "manzana",
			alt: "Manzana roja"
		},
		{
			name: "Helado",
			pattern: [1, 2, 3, 4, 5],
			resource: "cono",
			alt: "Helado de chocolate"
		},
		{
			name: "Libro",
			pattern: [1, 2, 3, 4],
			resource: "libro",
			alt: "Libro"
		},
		{
			name: "Silla",
			pattern: [1, 2, 3, 4],
			resource: "silla",
			alt: "Silla"
		}
	];

	$scope.options = {
		items: $scope.items,
		chances: 26,
		minRightAnswers: 19,
		letterColor: '0',
		itemsPerRow: 3
	};
});

esp104_.controller('Act1-7Ctrl', function($scope){
	$scope.items = [
		{
			name: "Conejo",
			pattern: [1, 2, 3, 4, 5],
			resource: "conejo",
			alt: "Mesa"
		},
		{
			name: "Perro",
			pattern: [1, 2, 3, 4],
			resource: "perro",
			alt: "Fresa"
		},
		{
			name: "Gato",
			pattern: [1, 2, 3, 4, 5, 6],
			resource: "gato",
			alt: "Manzana roja"
		},
		{
			name: "Caballo",
			pattern: [1, 2, 3, 4, 5, 6],
			resource: "caballo",
			alt: "Helado de chocolate"
		},
		{
			name: "Vaca",
			pattern: [1, 2, 3, 4],
			resource: "vaca",
			alt: "Libro"
		},
		{
			name: "Mono",
			pattern: [1, 2, 3, 4],
			resource: "mono",
			alt: "Silla"
		}
	];

	$scope.options = {
		items: $scope.items,
		chances: 12,
		minRightAnswers: 8,
		letterColor: '0',
		itemsPerRow: 3
	};
});

esp104_.controller('Act2Ctrl', function($scope){
	$scope.items = [
		{
			resource:"sound",
			sound:"caballo",
			alt: "ìcono sonido",
			text:"caballo"
		},
		{
			resource:"sound",
			sound:"vaca",
			alt: "ìcono sonido",
			text:"vaca"
		},
		{
			resource:"sound",
			sound:"cama",
			alt: "ìcono sonido",
			text:"cama"
		},
		{
			resource:"sound",
			sound:"computador",
			alt: "ìcono sonido",
			text:"computador"
		},
		{
			resource:"sound",
			sound:"colegio",
			alt: "ìcono sonido",
			text:"colegio"
		},
		{
			resource:"sound",
			sound:"luna",
			alt: "ìcono sonido",
			text:"luna"
		},
		{
			resource:"sound",
			sound:"comida",
			alt: "ìcono sonido",
			text:"comida"
		},
		{
			resource:"sound",
			sound:"camino",
			alt: "ìcono sonido",
			text:"camino"
		},
		{
			resource:"sound",
			sound:"muleta",
			alt: "ìcono sonido",
			text:"muleta"
		}
	];

	$scope.options = {
		items: $scope.items,
		chances: 9,
		minRightAnswers: 2,
		itemsPerRow : 3
	};
});

esp104_.controller('Act2-2Ctrl', function($scope){
	$scope.items = [
		{
			resource:"sound",
			sound:"cebolla",
			alt: "ìcono sonido",
			text:"cebolla"
		},
		{
			resource:"sound",
			sound:"montana",
			alt: "ìcono sonido",
			text:"montaña"
		},
		{
			resource:"sound",
			sound:"risas",
			alt: "ìcono sonido",
			text:"risas"
		},
		{
			resource:"sound",
			sound:"paloma",
			alt: "ìcono sonido",
			text:"paloma"
		},
		{
			resource:"sound",
			sound:"carro",
			alt: "ìcono sonido",
			text:"carro"
		},
		{
			resource:"sound",
			sound:"moto",
			alt: "ìcono sonido",
			text:"moto"
		},
		{
			resource:"sound",
			sound:"tapete",
			alt: "ìcono sonido",
			text:"tapete"
		},
		{
			resource:"sound",
			sound:"camino",
			alt: "ìcono sonido",
			text:"camino"
		},
		{
			resource:"sound",
			sound:"tableta",
			alt: "ìcono sonido",
			text:"tableta"
		}
	];

	$scope.options = {
		items: $scope.items,
		chances: 9,
		minRightAnswers: 2,
		itemsPerRow : 3
	};
});

esp104_.controller('Act3Ctrl', function ($scope) {
  $scope.items = [
        {         
        img: 'nube.png',
        altimg: 'Nube azul',
        w: 168, h: 282, t:1 , l:5,
        options: [
              { text: "Nu - do"},
              { text: "Nu - be", answer: true},
            ]
      },
        {         
        img: 'tigre.png',
        altimg: 'Tigre naranja con rayas negras',
        w: 168, h: 282, t:1 , l:42,
        options: [
              { text: "Ti - gre", answer: true},
              { text: "Ti - gro"},
            ]
      },
      {   
        img: 'mula.png',
        altimg: 'Mula de color café',
        w: 168, h: 282, t:1 , l:78,
        options: [
              { text: "Mu -  la", answer: true},
              { text: "Mu - le"},
            ]
      },
      {   
        img: 'botas.png',
        altimg: 'Par de botas negras',
        w: 168, h: 282, t:50 , l:78,
        options: [
              { text: "Bo - te"},
              { text: "Bo -  tas", answer: true},
            ]
      },
      {   
        img: 'sopa.png',
        altimg: 'Plato con sopa',
        w: 168, h: 282, t:50 , l:42,
        options: [
              { text: "So -  po"},
              { text: "So -  pa", answer: true},
            ]
      },
      {   
        img: 'luna.png',
        altimg: 'Luna rodeada de estrellas',
        w: 168, h: 282, t:50 , l:5,
        options: [
              { text: "Lu - na", answer: true},
              { text: "Lu -  no"},
            ]
      }
    ],

    $scope.options = {
      items: $scope.items,
      canvasStyle: 'width: 70%;height: 600px;',
      chances: 1,
      optionsrandom: true,
      minRightAnswers: 5,
      itemsPerRow : 1,
      selectindividual: true
    };
});

esp104_.controller('Act3-2Ctrl', function($scope){
$scope.items = [
      {         
        img: 'tortuga.png',
        altimg: 'Tortuga de color verde y café',
        w: 300, h: 374, t:2 , l:-1,
        options: [
              { text: "Tor"},
              { text: "tu"},
              { text: "ga"},
              { text: "tro", answer: true}
            ]
      },
      {   
        img: 'hipopotamo.png',
        altimg: 'Hipopótamo gris',
        w: 300, h: 374, t:2 , l:34,
        options: [
              { text: "Hi" },
              { text: "po"},
              { text: "pó" },
              { text: "ta" },
              { text: "mo" },
              { text: "lo", answer: true}
            ]
      },
      {   
        img: 'leon.png',
        altimg: 'León',
        w: 300, h: 374, t:2 , l:68,
        options: [
              { text: "Le" },
              { text: "ón"},
              { text: "ga", answer: true}
            ]
      }
    ],

    $scope.options = {
      items: $scope.items,
      canvasStyle: 'width: 100%;height: 500px;',
      chances: 2,
      optionsrandom: false,
      minRightAnswers: 3,
      itemsPerRow : 6,
      selectindividual: true
    };
});

esp104_.controller('Act3-3Ctrl', function($scope){
$scope.items = [
      {         
        img: 'bandera.png',
        altimg: 'Bandera de Colombia',
        w: 300, h: 374, t:2 , l:-1,
        options: [
              { text: "Ban"},
              { text: "de"},
              { text: "ra"},
              { text: "ro", answer: true}
            ]
      },
      {   
        img: 'muletas.png',
        altimg: 'Muletas',
        w: 300, h: 374, t:2 , l:34,
        options: [
              { text: "Mu" },
              { text: "le" },
              { text: "tas" },
              { text: "to", answer: true}
            ]
      },
      {   
        img: 'lapicero.png',
        altimg: 'Lapicero',
        w: 300, h: 374, t:2 , l:68,
        options: [
              { text: "La" },
              { text: "pi"},
              { text: "ce"},
              { text: "ro"},
              { text: "ra", answer: true}
            ]
      }
    ],

    $scope.options = {
      items: $scope.items,
      canvasStyle: 'width: 100%;height: 500px;',
      chances: 2,
      optionsrandom: false,
      minRightAnswers: 3,
      itemsPerRow : 5,
      selectindividual: true
    };
});

esp104_.controller('Act4Ctrl', function ($scope) {
  $scope.items = [
    {
      sil: '<strong>Muela</strong>',
      src: 'muela',
      alt:'Muela'
    },
    {
      sil: '<strong>Limón</strong>',
      src: 'limon',
      alt:'Limón'
    },
    {
      sil: '<strong>Mula</strong>',
      src: 'mula',
      alt:'Mula de color café'
    },
    {
      sil: '<strong>Mono</strong>',
      src: 'mono',
      alt:'Mono comiendo banano'
    },
    {
      sil: '<strong>Sapo</strong>',
      src: 'sapo',
      alt:'Sapo de color verde'
    },
    {
      sil: '<strong>Sol</strong>',
      src: 'sol',
      alt:'Sol'
    }
  ];

  $scope.options = {
    data: $scope.items,
    minRightAnswers: 3,
    chances: 12,
    randomItems: true,
    randomTargets: true
  };
});

esp104_.controller('Act4-2Ctrl', function ($scope) {
  $scope.items = [
    {
      sil: '<strong>Pato</strong>',
      src: 'pato',
      alt:'Pato'
    },
    {
      sil: '<strong>Bananos</strong>',
      src: 'bananos',
      alt:'Tres bananos'
    },
    {
      sil: '<strong>Sandía</strong>',
      src: 'sandia',
      alt:'Sandía'
    },
    {
      sil: '<strong>Manzana</strong>',
      src: 'manzana',
      alt:'Manzana'
    },
    {
      sil: '<strong>Uvas</strong>',
      src: 'uvas',
      alt:'Racimo de uvas'
    },
    {
      sil: '<strong>Ave</strong>',
      src: 'ave',
      alt:'Ave volando'
    }
  ];

  $scope.options = {
    data: $scope.items,
    minRightAnswers: 3,
    chances: 12,
    randomItems: true,
    randomTargets: true
  };
});

esp104_.controller('Act4-3Ctrl', function($scope){
	$scope.data = {
		groups: [
			{
				title: '<div style="text-align: center;width: 100%;">M</div>',
				items: [
					{
						text: "Maleta",
					},
					{
						text: "Moto"
					},
					{
						text: "Misa"
					},
					{
						text: "Mochila",
					},	
					{
						text: "Maracas"
					}					
					
				]
			},
			{
				title: '<div style="text-align: center;width: 100%;">P</div>',
				items: [
					
					{
						text: "Pelota"
					},
					{
						text: "Perro"
					},
					{
						text: "Pocillo"
					},
					{
						text: "Pesas"
					},
					{
						text: "Peinilla"
					}
										
				]
			}
		],
		minRightAnswers: 9,
		chances: 10,

	};
});

esp104_.controller('Act4-4Ctrl', function($scope){
	$scope.data = {
		groups: [
			{
				title: '<div style="text-align: center;width: 100%;">S</div>',
				items: [
					{
						text: "Sumas",
					},
					{
						text: "Sopa"
					},
					{
						text: "Suerte"
					},
					{
						text: "Soplar",
					},	
					{
						text: "Subir"
					}					
					
				]
			},
			{
				title: '<div style="text-align: center;width: 100%;">L</div>',
				items: [
					
					{
						text: "Luna"
					},
					{
						text: "Leer"
					},
					{
						text: "Lomo"
					},
					{
						text: "Luz"
					},
					{
						text: "Lila"
					}
										
				]
			}
		],
		minRightAnswers: 9,
		chances: 10,

	};
});

esp104_.controller('Act4-5Ctrl', function($scope){
	$scope.data = {
		groups: [
			{
				title: '<div style="text-align: center;width: 100%;">N</div>',
				items: [
					{
						text: "Niño",
					},
					{
						text: "Nacional"
					},
					{
						text: "Nacer"
					},
					{
						text: "Nene",
					},	
					{
						text: "Nilo"
					}					
					
				]
			},
			{
				title: '<div style="text-align: center;width: 100%;">T</div>',
				items: [
					
					{
						text: "Tetero"
					},
					{
						text: "Tomate"
					},
					{
						text: "Totuma"
					},
					{
						text: "Timón"
					},
					{
						text: "Terraza"
					}
										
				]
			}
		],
		minRightAnswers: 9,
		chances: 10,

	};
});

esp104_.controller('Act5Ctrl', function($scope){
	$scope.items = [
    {
      name: "A",
      text: "a"
    },
    {
      name: "B",
      text: "b"
    },
    {
      name: "C",
      text: "c"
    },
    {
      name: "D",
      text: "d"
    },
    {
      name: "E",
      text: "e"
    },
    {
      name: "F",
      text: "f",
    },
     {
      name: "G",
      text: "g"
    },
       {
      name: "H",
      text: "h"
    },
       {
      name: "I",
      text: "i"
     },
     {
      name: "J",
      text: "j"
    }
    
  ];

  $scope.options = {
    items: $scope.items,
    chances: 10,
    minRightAnswers: 10,
    chancesPerItem : 2,
    customClass: "items-small",
    itemsPerRow: 3
  };
});

esp104_.controller('Act5-2Ctrl', function($scope){
$scope.items = [
    {
      name: "K",
      text: "k"
    },
    {
      name: "L",
      text: "l"
    },
    {
      name: "M",
      text: "m"
    },
    {
      name: "N",
      text: "n"
    },
    {
      name: "Ñ",
      text: "ñ"
    },
    {
      name: "O",
      text: "o",
    },
     {
      name: "P",
      text: "p"
    },
       {
      name: "Q",
      text: "q"
    },
       {
      name: "R",
      text: "r"
     },
     {
      name: "S",
      text: "s"
    }
    
  ];

  $scope.options = {
    items: $scope.items,
    chances: 10,
    minRightAnswers: 10,
    customClass: "items-small",
    chancesPerItem : 2,
    itemsPerRow: 3
  };
});

esp104_.controller('Act5-3Ctrl', function($scope){
$scope.items = [
    {
      name: "T",
      text: "t"
    },
    {
      name: "U",
      text: "u"
    },
    {
      name: "V",
      text: "v"
    },
    {
      name: "W",
      text: "w"
    },
    {
      name: "X",
      text: "x"
    },
    {
      name: "Y",
      text: "y",
    },
     {
      name: "Z",
      text: "z"
    }
  ];

  $scope.options = {
    items: $scope.items,
    chances: 7,
    minRightAnswers: 7,
    chancesPerItem : 2,
    customClass: "items-small",
    itemsPerRow: 3
  };
});

esp104_.controller('Act6Ctrl', function($scope){
 $scope.inputs = [];
  $scope.$root.isNextEnabled = true; // Activamos el siguiente link

  $scope.items = [];

  // llenamos el array
  for (var i = 0; i < 5; i++) {
    $scope.items.push({
      uno: '',
      dos: '',
      tres: '',
      cuatro: '',
      cinco: '',
      seis: ''
    });
  }

  var regex = function (value,letter) {
  	console.log(letter);
    return !( value.match(/([bcdfghjklmnñpqrstvwxyz])/) && value.match(/([aeiou])/) && value.toLowerCase().substring(0,1) === letter );
  };

  // antes de ir a la siguiente actividad, verificamos
  $scope.$root.beforeGoNext = function () {
    var error = false;

    // Recorremos los elementos, buscando que cumplan con las condiciones
    // Al menos una mayúscula, una minúscula y 4 letras
    $scope.items.forEach(function(item){
      if( regex(item.uno,'b') || regex(item.dos,'d') || regex(item.tres,'s') || regex(item.cuatro,'c') || regex(item.cinco,'l') || regex(item.seis,'g'))error = true;
    });

    if(error){
      // fracaso
      $scope.failure = true;
      return true;
    } else {
      // éxito
      $scope.success = true;
      return true;
    }
  };

});
