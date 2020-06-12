// Created by: Joshua C. Magoliman
$(document).ready(function () {
    let gameTableContainer = $('#gameTableContainer');
    let bird = $('#bird');
    let tunnel = $('.tunnel');
    let upperTunnel = $('#upperTunnel');
    let lowerTunnel = $('#lowerTunnel');
    let score = $('#score');
    let speedSpan = $('#speed');
    let restartButton = $('#restartButton');
    let gameTableContainerWidth = parseInt(gameTableContainer.width());
    let gameTableContainerHeight = parseInt(gameTableContainer.height());
    let tunnelInitialPosition = parseInt(tunnel.css('right'));
    let tunnelInitialHeight = parseInt(tunnel.css('height'));
    let birdLeft = parseInt(bird.css('left'));
    let birdHeight = parseInt(bird.height());
    let speed = 5;
    let goUp = false;
    let updatingScore = false;
    let gameOver = false;
    let animation;
    // start the game
    animation = requestAnimationFrame(game);
    function game() {
        if (checkForCollision(bird, upperTunnel) || checkForCollision(bird, lowerTunnel) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > gameTableContainerHeight - birdHeight) {
            gameIsOver();
        }
        else {
            let tunnelCurrentPosition = parseInt(tunnel.css('right'));
            // update the score when tunnels have passed the bird successfully
            if (tunnelCurrentPosition > gameTableContainerWidth - birdLeft) {
                if (updatingScore === false) {
                    score.text(parseInt(score.text()) + 1);
                    updatingScore = true;
                }
            }
            // check if the tunnels went out of the container
            if (tunnelCurrentPosition > gameTableContainerWidth) {
                let newHeight = parseInt(Math.random() * 100);
                // change the tunnels height
                upperTunnel.css('height', tunnelInitialHeight + newHeight);
                lowerTunnel.css('height', tunnelInitialHeight - newHeight);
                // increase speed
                speed = speed + 1;
                speedSpan.text(speed);
                updatingScore = false;
                tunnelCurrentPosition = tunnelInitialPosition;
            }
            // move the tunnels
            tunnel.css('right', tunnelCurrentPosition + speed);
            if (goUp === false) {
                moveDown();
            }
        }
        animation = requestAnimationFrame(game);
    };
    $(document).on('keydown', function (e) {
        let key = e.keyCode;
        if (key === 32 && goUp === false && gameOver === false) {
            goUp = requestAnimationFrame(moveUp);
        }
    });
    $(document).on('keyup', function (e) {
        let key = e.keyCode;
        if (key === 32) {
            cancelAnimationFrame(goUp);
            goUp = false;
        }
    });
    function moveDown() {
        bird.css('top', parseInt(bird.css('top')) + 3);
    }
    function moveUp() {
        bird.css('top', parseInt(bird.css('top')) - 6);
        goUp = requestAnimationFrame(moveUp);
    }
    function gameIsOver() {
        cancelAnimationFrame(animation);
        gameOver = true;
        restartButton.slideDown();
    }
    restartButton.click(function () {
        location.reload();
    });
    function checkForCollision($div1, $div2) {
        let x1 = $div1.offset().left;
        let y1 = $div1.offset().top;
        let h1 = $div1.outerHeight(true);
        let w1 = $div1.outerWidth(true);
        let b1 = y1 + h1;
        let r1 = x1 + w1;
        let x2 = $div2.offset().left;
        let y2 = $div2.offset().top;
        let h2 = $div2.outerHeight(true);
        let w2 = $div2.outerWidth(true);
        let b2 = y2 + h2;
        let r2 = x2 + w2;
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
});