var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", onClick);
function onClick(click) {
  var userChosenColour = click.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}



function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  var color = $("." + currentColor);
  if (color) {
    color.addClass("pressed");
    setTimeout(function () {
      color.removeClass("pressed");
    }, 100);
  }
}

$(document).ready(function() {
  
  $("#howToPlayBtn").click(function() {
    $("#howToPlayModal").fadeIn();   
  });

  $(".close").click(function() {
    $("#howToPlayModal").fadeOut();  
  });

  $(window).click(function(e) {
    if ($(e.target).is("#howToPlayModal")) {
      $("#howToPlayModal").fadeOut();
    }
  });

});
