WebFont.load({
    google: {
        families: ['Press+Start+2P']
    },
    /*active: function() {
        GameInitialize();
    }*/
});

var WINDOW_WIDTH = 800,
    WINDOW_HEIGHT = 400,
    SCENE = "",
    platform,
    player,
    cursor,
    game,
    yAxis = p2.vec2.fromValues(0, 1);

var Main = function() {},
    game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO, SCENE);
Main.prototype = {
    preload: function() {
        console.log('pre');

        game.load.image('loading', 'images/loading.png');
        game.load.script('splash', 'states/Splash.js');
    },

    create: function() {
        game.state.add('Splash', Splash);
        game.state.start('Splash');


    }
}
/*var GameInitialize = function() {

    game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO, SCENE, {
        preload: preload,
        create: create,
        update: update
    });
    function preload() {
        console.log('pre');

        game.load.image('loading', 'images/loading.png');
        game.load.script('splash', 'states/Splash.js');
    }

    function create() {
        game.state.add('Splash', Splash);
        game.state.start('Splash');


    }

    function update() {
        //game.physics.arcade.collide(player, platforms);
        //game.physics.arcade.collide(platforms);

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
        if (cursors.up.isDown) {
            player.animations.stop();
            player.body.velocity.y = -650;
        }
    }

};*/
game.state.add('Main', Main);
game.state.start('Main');


