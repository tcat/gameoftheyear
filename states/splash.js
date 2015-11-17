var Splash = function() {};

Splash.prototype = {

    loadScripts: function() {},

    loadBgm: function() {},
    // varios freebies found from google image search
    loadImages: function() {
        game.load.image('sky', 'images/sky.png');

        game.load.image('ground', 'images/Laputa.png');
        game.load.spritesheet('dude', 'images/santa.png', 150, 116);
        game.load.physics('physicsData', 'images/poligons/player.json');

        /*Heavy files for dummy loading*/
        game.load.image('sky3', 'images/1.jpg');
        game.load.image('sky4', 'images/2.jpg');
        //game.load.script('splash', 'https://raw.githubusercontent.com/MattMcFarland/phaser-menu-system/master/game/vendor/phaser.js');
    },

    loadFonts: function() {
        /*WebFontConfig = {
          custom: {
            families: ['TheMinion'],
            urls: ['assets/style/theminion.css']
          }
        }*/
    },

    init: function() {

        this.loadingBar = game.make.sprite(game.world.centerX - (387 / 2), 200, "loading");

        this.status = game.make.text(game.world.centerX, 280, 'Loading...', {
            fill: 'white'
        });
        //utils.centerGameObjects([this.logo, this.status]);
    },

    preload: function() {
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        this.load.setPreloadSprite(this.loadingBar);

        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();

    },

    addGameStates: function() {

        /*game.state.add("GameMenu",GameMenu);
        game.state.add("Game",Game);
        game.state.add("GameOver",GameOver);
        game.state.add("Credits",Credits);
        game.state.add("Options",Options);*/
    },

    addGameMusic: function() {
        /*music = game.add.audio('dangerous');
        music.loop = true;
        music.play();*/
    },

    create: function() {
        this.status.setText('Ready!');
        this.addGameStates();
        this.addGameMusic();

        /*setTimeout(function () {
          game.state.start("GameMenu");
        }, 1000);*/

        game.physics.startSystem(Phaser.Physics.P2JS);

        //  Make things a bit more bouncey
        game.physics.p2.gravity.y = 850;
        game.physics.p2.world.defaultContactMaterial.friction = 0.3;
        game.physics.p2.world.setGlobalStiffness(1e5);



        var skybg = game.add.tileSprite(0, 0, 800, 600, 'sky');

        skybg.scale.setTo(1, .85);
        platforms = game.add.group();
        platforms.enableBody = true;
        var ground;




        ground = platforms.create(400, 300, 'ground')
        //ground.scale.setTo(.12, .05);
        ground.body.immovable = true;

        ground = platforms.create(230, 200, 'ground')
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

        game.physics.p2.enable([player, mainground], true);


        mainground.body.clearShapes();
        mainground.body.loadPolygon('physicsData', 'ground');
        mainground.immovable = true;


        player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 16, true);
        player.animations.add('right', [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], 16, true);
        player.body.clearShapes();
        player.body.loadPolygon('physicsData', 'player');
        player.body.fixedRotation = true;
        player.body.damping = .1;

        cursors = game.input.keyboard.createCursorKeys();
    },
    checkIfCanJump: function() {

        var result = false;

        for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
            var c = game.physics.p2.world.narrowphase.contactEquations[i];

            if (c.bodyA === player.body.data || c.bodyB === player.body.data) {
                var d = p2.vec2.dot(c.normalA, yAxis);

                if (c.bodyA === player.body.data) {
                    d *= -1;
                }

                if (d > 0.5) {
                    result = true;
                }
            }
        }

        return result;

    },
    update: function() {
        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -247;

            player.animations.play('left');
        } else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 247;

            player.animations.play('right');
        } else {
            //  Stand still
            player.animations.stop();

            //player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && this.checkIfCanJump()) {
            player.animations.stop();
            player.body.velocity.y = -350;
        }
    }
};