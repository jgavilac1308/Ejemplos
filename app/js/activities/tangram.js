var lizTangram = angular.module('lizTangram', []);

lizTangram.directive('tangram', function  (shuffleArrayFactory) {
	return {
		restrict: 'E',
		scope: {
			options: '=',
			description: '@'
		},
		templateUrl: '../views/activities/tangram.html',
		link: function postLink(scope, element, attrs) {

			var opt = scope.options;

			// variables básicas de la acividad de angular
			scope.rightAnswer = false;
			scope.wrongAnswer = false;
			scope.success = false;
			scope.failure = false;
			
			scope.started = false;

			/**
			 * Muestra el canvas
			 */
			scope.start = function () {
				scope.started = true;
				scope.startCanvas();
			};


			/**
			 * Inicializa el canvas
			 */
			scope.startCanvas = function () {
				var tempPos = {}, // Posición temporal que tiene el objeto
					bs = 50, // blockSize: tamaño de los lados del bloque http://www.logicville.com/tangram1.htm
					hypotenuse = Math.sqrt( 2 * Math.pow(bs, 2) ), // tamaño de la hipotenusa
					finalFigure = {}, // Figura a armar
					figs = [], // Contenedor temporal para el array de figuras
					chances = opt.chances, // número total de posibilidades
					TOTAL_FIGURES = 7, // Número total de figuras
					completedFigures = 0; // Contador para figuras completas

				// Plantillas de las figuras. Basado en http://www.logicville.com/tangram1.htm
				var templates = {
					"bigTriangle": {
						"points": [ 
							0, 0,		
							bs*2, bs*2,		
							0, bs*4 
						],
						"offset": { x: bs, y: bs * 2 }
					},
					"mediumTriangle": {
						"points": [ 
							0, 0,		
							bs*2, 0,		
							0, bs*2
						],
						"offset": { x: hypotenuse / 2, y: hypotenuse / 2 }
					},
					"smallTriangle": {
						"points": [ 
							0, 0,		
							bs*2, 0,
							bs, bs
						],
						"offset": { x: bs, y: bs / 2 }
					},
					"square": {
						"points": [ 
							0, 0,		
							hypotenuse, 0,
							hypotenuse, hypotenuse,
							0, hypotenuse
						],
						"offset": { x: hypotenuse / 2, y: hypotenuse / 2 }
					},
					"rhomboid": {
						"points": [ 
							0, 0,
							bs, bs,
							bs*3, bs,
							bs*2, 0,
						],
						"offset": { x: bs * 1.5, y: bs * 0.5 }
					},
				};

				var stage = new Kinetic.Stage({
					container: 'kinetic-container',
					width: 960,
					height: 650
				});

				var layer = new Kinetic.Layer();

				var tangramFigures = new Kinetic.Group({ x: 0, y: 0 }); // Figuras iniciales
				var macros = new Kinetic.Group({ x: 0, y: 0 }); // Macros

				// rectángulos donde van la muestra y la figura objetivo
				var leftRect = new Kinetic.Rect({
					width: 455,
					height: 410,
					stroke: opt.color,
					strokeWidth: 2
				});
				macros.add(leftRect);

				// Rectángulo derecho
				macros.add(new Kinetic.Rect({
					x: 475,
					width: 455,
					height: 410,
					stroke: opt.color,
					strokeWidth: 2
				}));

				// Nombre de la figura
				var tangramName = new Kinetic.Text({
					text: opt.name,
					fontFamily: 'century_gothic',
					fontSize: 20,
					x: leftRect.getX(),
					y: leftRect.getY(),
					width: leftRect.getWidth(),
					padding: 10,
					align: 'center',
					fill: 'white'
				});

				// Fondo del nombre
				macros.add(new Kinetic.Rect({
					x: leftRect.getX(),
					y: leftRect.getY(),
					width: leftRect.getWidth(),
					height: tangramName.getHeight(),
					fill: opt.color
				}));

				macros.add(tangramName); // Agregamos el nombre sobre el rectángulo



				// Cuadro de texto con la descripción
				var descriptionGroup = new Kinetic.Group({ x: 0, y: 0 });

				var descriptionText = new Kinetic.Text({
					text: 'Arrastra hasta el recuadro las piezas del tangram y arma la figura que tienes como muestra.',
					fontFamily: 'century_gothic',
					fontSize: 20,
					width: stage.getWidth(),
					padding: 10,
					align: 'center',
					fill: 'white'
				});

				descriptionGroup.add(new Kinetic.Rect({
					width: stage.getWidth(),
					height: descriptionText.getHeight(),
					fill: opt.color
				}));

				descriptionGroup.add(descriptionText);

				// ===========================================================================
				// Inicio - creación de figuras
				// ===========================================================================
				// triángulo naranja
				tangramFigures.add(new Kinetic.Line({
					points: templates.bigTriangle.points,
					offset: templates.bigTriangle.offset,
					fill: '#F19700',
					id: 'triangleOrange',
					closed: true
				}));

				// triángulo verde
				tangramFigures.add(new Kinetic.Line({
					points: templates.bigTriangle.points,
					offset: templates.bigTriangle.offset,
					fill: '#70A83B',
					id: 'triangleGreen',
					closed: true
				}));

				// Romboide morado
				var rhomboid = new Kinetic.Line({
					points: templates.rhomboid.points,
					offset: templates.rhomboid.offset,
					fill: '#BA007C',
					id: 'rhomboid',
					closed: true
				});

				// para manejar imágenes espejadas
				if(opt.pos[2].scale){
					rhomboid.scale( opt.pos[2].scale );
				}
				tangramFigures.add(rhomboid);
				
				// triángulo amarillo
				tangramFigures.add(new Kinetic.Line({
					points: templates.mediumTriangle.points,
					offset: templates.mediumTriangle.offset,
					fill: '#FEEE00',
					id: 'triangleYellow',
					closed: true
				}));

				// cuadro rojo
				tangramFigures.add(new Kinetic.Line({
					points: templates.square.points,
					offset: templates.square.offset,
					fill: '#BF0411',
					id: 'square',
					closed: true
				}));

				// triángulo azul 1
				tangramFigures.add(new Kinetic.Line({
					points: templates.smallTriangle.points,
					offset: templates.smallTriangle.offset,
					fill: '#009BDB',
					id: 'triangleBlue1',
					closed: true
				}));

				// triángulo azul 2
				tangramFigures.add(new Kinetic.Line({
					points: templates.smallTriangle.points,
					offset: templates.smallTriangle.offset,
					fill: '#009BDB',
					id: 'triangleBlue2',
					closed: true
				}));

				// Clonamos el grupo de figuras para poder armar la figura final
				finalFigure = tangramFigures.clone();


				// ===========================================================================
				// Configuración de cada elemento - propiedades comunes
				// ===========================================================================
				tangramFigures.getChildren().forEach(function (f) {
					// Definimos los atributos comunes
					f.setAttrs({
						draggable: true, 
						stroke: 'black',
						strokeWidth: 1
					});


					// ===========================================================================
					// Eventos
					// ===========================================================================
					f.on('mouseover', function () {
						// Guardamos la posición temporal, por si es necesario retornar el elemento al punto
						tempPos.x = this.getX();
						tempPos.y = this.getY();
					});

					f.on('dragstart', function (e) {
						this.moveToTop(); // Cuando se empieza a arrastrar el elemento, se pone al tope
						layer.draw(); // Redibujamos la capa
					});

					/**
					 * La idea es identificar la figura en base al punto de intersección y luego verificar si
					 * la respuesta es correcta o incorrecta
					 */
					f.on('dragend', function (e) {
						var pos = this.getAbsolutePosition(); // Obtenemos la posición absoluta

						// Movemos el elemento, para poder obtener la intersección que deseamos
						this.setAttrs({ x: tempPos.x, y: tempPos.y });
						layer.draw();

						// Buscamos el elemento con la intersección de puntos
						var shape = this.getStage().getIntersection({ x: pos.x, y: pos.y });

						if(!shape) return; // no hay figura
						if(shape.getAttr('_type') !== 'target') return; // No es un objetivo

						if(this.getId() === shape.getId()){
							// Respuesta Correcta
							this.setAbsolutePosition( shape.getAbsolutePosition() ); // Ponemos el elemento exactamente sobre el objetivo
							this.setDraggable(false); // desactivamos el draggable
							layer.draw(); 

							scope.rightAnswer = Math.random();
							completedFigures++;
						} else {
							// Respuesta Incorrecta
							scope.wrongAnswer = Math.random();
						}

						chances--; // Reducimos las posibilidades

						/**
						 * Evaluamos si la actividad se ha terminado
						 */
						if(chances === 0 || completedFigures === TOTAL_FIGURES){
							if(completedFigures === TOTAL_FIGURES){
								// éxito
								scope.success = true;
								scope.$root.isNextEnabled = true;
							} else {
								// fracaso
								scope.failure = true;
							}
						}

						scope.$apply(); // Aplicamos el scope para poder ver los íconos de correcto / incorrecto

					});
				});

				/**
				 * Propiedades del puntero al pasar el mouse por encima
				 */
				tangramFigures.on('mouseover', function () {
					document.body.style.cursor = 'pointer';
				});

				tangramFigures.on('mouseout', function () {
					document.body.style.cursor = 'default';
				});

				// ===========================================================================
				// Configuración personal de la actividad
				// ===========================================================================
				figs = tangramFigures.getChildren(); // Array con las figuras del tangram

				// Configuración de las figuras
				for(var i=0; i < opt.pos.length; i++){
					// Movemos cada figura según la posición
					figs[i].move({
						x: opt.pos[i].x,
						y: opt.pos[i].y
					});

					if(opt.pos[i].hasOwnProperty('rot')){
						figs[i].setRotation(opt.pos[i].rot); // rotamos la figura
					}
				}

				// ===========================================================================
				// Configuración de la figura final
				// ===========================================================================
				figs = finalFigure.getChildren(); // Array con las figuras del tangram

				for(var i=0; i < opt.figure.length; i++){
					// Añadimos el borde a cada una
					figs[i].setAttrs({
						stroke: 'black',
						strokeWidth: 1
					});

					// Movemos cada figura según la posición
					figs[i].move({
						x: opt.figure[i].x,
						y: opt.figure[i].y
					});

					if(opt.figure[i].hasOwnProperty('rot')){
						figs[i].setRotation(opt.figure[i].rot); // rotamos la figura
					}
				}

				// ===========================================================================
				// Configuración de la figura objetivo
				// ===========================================================================
				targetFigure = finalFigure.clone(); // Clonamos de la figura final

				targetFigure.getChildren().forEach(function (child) {
					child.setFill('white'); // Quitamos el fondo de cada figura
					child.setAttr('_type', 'target'); // Definimos un tipo especial para identificar los targets
				});

				// ===========================================================================
				// Configuración Final
				// ===========================================================================
				// Movemos los grupos
				macros.move({ x: 15, y: 220 });
				finalFigure.move({ x: 160, y: 400 });
				targetFigure.move({ x: 660, y: 400 });
				tangramFigures.move({ x: 90, y: 130 });

				// Agregamos todo
				layer.add(macros);
				layer.add(descriptionGroup);
				layer.add(targetFigure);
				layer.add(finalFigure);
				layer.add(tangramFigures);
				stage.add(layer);
				
			};
			
		}
	}; 
});
