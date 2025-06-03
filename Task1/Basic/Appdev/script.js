const stop_btn = document.getElementById("stop-btn");
const spike = document.getElementById("spike");
const n0 = document.getElementById("n0");
const n1 = document.getElementById("n1");
const n2 = document.getElementById("n2");
const n3 = document.getElementById("n3");
const n4 = document.getElementById("n4");
const turn = document.getElementById("p1-turn");
const p1_score_ele = document.getElementById('score1')
const p2_score_ele = document.getElementById("score2");
const round_ele = document.getElementById("round")
const end_ele = document.getElementById("end");

end_ele.style.visibility = "hidden";

function update() {
    spike.style.left = document.documentElement.clientWidth/2-1 + 'px';
    stop_btn.style.left = document.documentElement.clientWidth/2-30 + 'px';
    n0.style.left = document.documentElement.clientWidth/2 -320+ 'px';
    n1.style.left = document.documentElement.clientWidth/2 +310+ 'px';
    n2.style.left = document.documentElement.clientWidth/2 +220+ 'px';
    n3.style.left = document.documentElement.clientWidth/2 -240+ 'px';
    n4.style.left = document.documentElement.clientWidth/2 -25+ 'px';
    p2_score_ele.style.left = document.documentElement.clientWidth -150 + 'px';
    turn.style.left = document.documentElement.clientWidth/2 - document.documentElement.clientWidth*0.95/2 + 'px'
    round_ele.style.left = document.documentElement.clientWidth/2 - 25;
}
update();

window.onresize = function(){update();}

player = 0;
run = true;
p1_score = 0
round = 1;
p2_score = 0
is_pause = false;
var score;

function check() {
    is_pause = true;
    if (player === 0) {
        p1_score += score;
        document.getElementById("turn").innerHTML = "Player 2's turn";
    }
    if (player === 1) {
        p2_score += score;
        document.getElementById("turn").innerHTML = "Player 1's turn";
    }
    turn.style.transform = 'scale(1)';
    setTimeout ( () => {turn.style.transform = 'scale(0)';is_pause = false}, 600);
    round += 0.5
    
    player = (player === 0) ? 1: 0;
    
}

document.addEventListener('keydown', function(e) {
    if (event.code === 'Space' && run) {
        check();
    }
});
stop_btn.addEventListener('click', function(e) {
    if (run){
        check();
    }
})
var angle = 0;
var speed = -0.5;
function rotate() {
    if (!is_pause){
        angle += speed;
    }
    if (angle < 0 && angle > -90){
        speed = speed > 0 ? Math.abs(angle)*1.5/90 + 0.5 : -1*Math.abs(angle)*1.5/90 -0.5;
        score = Math.floor(Math.abs(angle)*100/90);
    }
    if (angle < -90 && angle > -180){
        a = 180-Math.abs(angle)
        speed = speed > 0 ? Math.abs(a)*1.5/90 + 0.5 : -1*Math.abs(a)*1.5/90 -0.5;
        score = Math.floor(Math.abs(a)*100/90);
    }
    if( angle<=-180 || angle >= 0){
        speed *= -1;
    }
    spike.style.transform = `rotate(${angle}deg)`;
    p1_score_ele.innerHTML = `Player 1: ${p1_score}`;
    p2_score_ele.innerHTML = `Player 2: ${p2_score}`;
    round_ele.innerHTML = `Round: ${Math.min(10, Math.floor(round))}`
    requestAnimationFrame(rotate);
    if(round >= 11){
        is_pause = true;
        run = false;
        turn.style.visibility = "hidden";
        document.getElementById("win").innerHTML = (p1_score > p2_score) ? "Player 1 wins!" : (p1_score < p2_score) ? "Player 2 wins!" : "Tie!!";
        end_ele.style.visibility = "visible";
    }
}
rotate();
