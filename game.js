let gamePattern=[];
let userClickPattern=[];
let buttonColor = ["red","blue","green","yellow"];
let level=-1
let started = false;

$(document).keydown(function(){
    if(!started){
        started =true;
        nextSequence();
    }
});



function checkAnswer(currentLevel){    
    if(userClickPattern[currentLevel]=== gamePattern[currentLevel]){
        if(userClickPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound('wrong');
        $('body').addClass('game-over');
        $('#level-title').text('Game Over, Press Any key to restart!!');
        setTimeout(function(){
            $('body').removeClass('game-over')
        },200)
    }
}
$(".btn").on('click',function(){
    let userChosenColor=(this.id);
    userClickPattern.push(userChosenColor);
    checkAnswer(userClickPattern.length-1);
    playSound(userChosenColor);
    animatePress(userChosenColor);
});

function animatePress(clickButton){
    $('#'+clickButton).addClass('pressed');
    setTimeout(function(){
        $('#'+clickButton).removeClass('pressed');
    },100);
}


function nextSequence(){        
    userClickPattern=[]
    level +=1;
    $('#level-title').text("Level "+level);
    let randomNumber = Math.floor(Math.random()*4);
    let chooseRandomColor = buttonColor[randomNumber];
    gamePattern.push(chooseRandomColor);
    $('#'+ chooseRandomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(chooseRandomColor);
    console.log(gamePattern);
}

function playSound(clickButton){
    let audio1 = new Audio('sounds/'+clickButton+'.mp3');
    audio1.play();
}

function startOver(){
    level=0;
    gamePattern=[];
    started = false;
}