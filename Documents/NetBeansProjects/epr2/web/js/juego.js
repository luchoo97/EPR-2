var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
 
function preload() {
	 game.load.image('fondo', 'assets/sky.png');
	 game.load.image('plataforma', 'assets/platform.png');
	 game.load.image('diamante', 'assets/diamond.png');
	 game.load.spritesheet('personaje', 'assets/dude.png', 32, 48);
}
 
var plataforma;
var suelo;
var personaje;
var diamantes;
var bandeja;
 
function create(){
	//imagen fondo
	game.add.sprite(0, 0, 'fondo');
 
	//plataforma xdd
	plataforma = game.add.sprite(0, 100, 'plataforma');
	plataforma.width = 800;
 	
	//suelo para cuando los diamantes caigan
	suelo = game.add.sprite(0, game.world.height - 5, 'plataforma');
	suelo.width = 800;
	suelo.height = 5;
 
	//atrapar los diamantes
	bandeja = game.add.sprite(50, game.world.height - 100, 'plataforma');
	bandeja.width = 150;
 
	//Agregamos el personaje
	personaje = game.add.sprite(32, 0, 'personaje');
 
	//
	game.physics.startSystem(Phaser.Physics.ARCADE);
 
	game.physics.arcade.enable(plataforma);
	game.physics.arcade.enable(suelo);
	game.physics.arcade.enable(bandeja);
	game.physics.arcade.enable(personaje);
 
	//personaje no se caiga
	personaje.body.gravity.y = 300;
	plataforma.body.immovable = true;
 
	//correr
	personaje.body.velocity.x = 250;
 
	personaje.animations.add('left', [0, 1, 2, 3], 10, true);
 	personaje.animations.add('right', [5, 6, 7, 8], 10, true);
 	personaje.animations.play('right');
 
 	//Variables del juego
	game.giro = 250;
	game.gravedadDiamantes = 150;
	
	diamantes = game.add.group();
}
 
function update(){
	//para que el wn  se caiga
	game.physics.arcade.collide(personaje, plataforma);
	
	//Correr aleatoriamante
	if(personaje.body.velocity.x > 0 && personaje.x > game.giro){
		personaje.body.velocity.x *= -1;
		game.giro = game.rnd.integerInRange(100, personaje.x-1);
		personaje.animations.play('left');
		soltarDiamante();
	}
	
	if(personaje.body.velocity.x < 0 && personaje.x < game.giro){
		personaje.body.velocity.x *= -1;
		game.giro = game.rnd.integerInRange(personaje.x+1, 688);
		personaje.animations.play('right');
		soltarDiamante();
	}
	
	//mover la cosa con el mouse
	bandeja.body.x = game.input.mousePointer.x - bandeja.width / 2;
}

function soltarDiamante() {
    var diamante = diamantes.create(personaje.x, 100, 'diamante');
    game.physics.arcade.enable(diamante);
    diamante.body.gravity.y = game.gravedadDiamantes;
}