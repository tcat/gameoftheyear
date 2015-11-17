(function(){
	
	WebFont.load({
        google: {
            families: ['Press+Start+2P']
        },
        active: function() {
            GameInitialize();
        }
    });

	var WINDOW_WIDTH = 800, 
		WINDOW_HEIGHT=400,
		SCENE = "",
		platform,
		player,
		cursor;

	var GameInitialize = function(){

		var game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO, SCENE, { preload: preload, create: create, update: update });
		function preload() {
			console.log('pre');
			game.load.image('sky', 'images/sky.png');
		    game.load.image('ground', 'images/Laputa.png');
		    game.load.spritesheet('dude', 'images/santa.png', 150, 116);
		    game.load.physics('physicsData', 'images/poligons/player.json');
		}

		function create() {
			console.log('create')
			game.physics.startSystem(Phaser.Physics.P2JS);

		    //  Make things a bit more bouncey
		    game.physics.p2.defaultRestitution = 0.8;
			game.physics.p2.gravity.y = 1000;
    
			

			
			
			
			var skybg = game.add.sprite(0, 0, 'sky');
			skybg.scale.setTo(1, .85);
			platforms = game.add.group();
			platforms.enableBody = true;
			var ground;



			
			ground = platforms.create(400, 300,'ground')
			//ground.scale.setTo(.12, .05);
			ground.body.immovable = true;

			ground = platforms.create(230, 200,'ground')
			//ground.scale.setTo(.12, .05);
			//ground.body.immovable = true;
			//ground.body.gravity.y = 2500;
			ground.body.bounce.y = 1;
			ground.body.bounce.x = 1;
			ground.body.collideWorldBounds = true;

			var mainground = game.add.sprite(400, 390, 'ground');
			mainground.scale.setTo(10, .5);

			player = game.add.sprite(-320, game.world.height - 350, 'dude');
			player.scale.setTo(.5, .5);

		    game.physics.p2.enable([ player, mainground], true);
		    

			mainground.body.clearShapes();
		    mainground.body.loadPolygon('physicsData', 'ground');
		    mainground.immovable = true;
		   

		    player.animations.add('left', [0, 1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15], 16, true);
		    player.animations.add('right', [16, 17, 18, 19,20,21,22,23,24,25,26,27,28,29,30,31], 16, true);
		    player.body.clearShapes();
			player.body.loadPolygon('physicsData', 'player');
			
		    cursors = game.input.keyboard.createCursorKeys();
		}

		function update() {
			//game.physics.arcade.collide(player, platforms);
			//game.physics.arcade.collide(platforms);
			player.body.velocity.x = 0;

			if (cursors.left.isDown)
		    {
		        //  Move to the left
		        player.body.velocity.x = -247;

		        player.animations.play('left');
		    }
		    else if (cursors.right.isDown)
		    {
		        //  Move to the right
		        player.body.velocity.x = 247;

		        player.animations.play('right');
		    }
		    else
		    {
		        //  Stand still
		        player.animations.stop();

		        //player.frame = 4;
		    }

		    //  Allow the player to jump if they are touching the ground.
		    if (cursors.up.isDown)
		    {
		    	player.animations.stop();
		        player.body.velocity.y = -650;
		    }
		}

	};

})();