var signArray = ['+'];
var timeLeft = 10;
var interval;
var score = 0;
var highScore = 0;
var equationLimit = 10;

$(document).on('change','.form-check-input', function(event) {
  if (this.checked) {
    var equationSign = $(this).next().text();
    signArray.push(equationSign);
    console.log(signArray);
  } else {
    var equationSign = $(this).next().text();
    signArray.splice(signArray.indexOf(equationSign), 1);
    console.log(signArray);
  }
})

var generateEquationSign = function() {
  return signArray[Math.floor(Math.random()*signArray.length)]
};

var currentEquation;
var generateRandomEquation = function () {
  var equation = {};
  var a = Math.floor(Math.random()*equationLimit);
  var b = Math.floor(Math.random()*equationLimit);
  var sign = generateEquationSign();
  equation.question = String(a) + sign + String(b);

  if (sign == '+') {
      equation.answer = a + b;
    } else if (sign == '-') {
      equation.answer = a - b;
    } else if (sign =='x') {
      equation.answer = a * b;
    } else if (sign == '/') {
      equation.answer = a /b;
    }

  console.log(equation.answer);
  $('#equation').html(equation.question);
  return equation;
};
var newEquation =  function() {
  currentEquation = generateRandomEquation();
}
var checkAnswer = function (answer, equationAnswer) {
  if (answer === equationAnswer) {
    newEquation();
    $('#answer').val('');
    addSecond(+1);
    updateScore(+1);
  }
}
var addSecond = function (amount) {
  timeLeft += amount;
  $('#seconds').text(timeLeft);
}
var startGame = function () {
  if (!interval) {
    if (timeLeft === 0) {
      if (highScore < score) {
        updateHighScore(score);
      }
      addSecond(+10);
      score = 0;
      updateScore(0);
    }
    interval = setInterval (function () {
      addSecond(-1);
      if (timeLeft === 0) {
        clearInterval(interval);
        interval = undefined;
      }
    }, 1000);
  }
}
var updateHighScore = function (amount) {
  highScore = amount;
  $('#highScore').text("High Score: " + highScore);
}
var updateScore = function (amount) {
  score += amount;
  $('#currentScore').text("Current Score: " + score);
}

$(document).ready(function() {
  currentEquation = generateRandomEquation();
  $('#answer').on('keyup', function(event) {
    startGame();
    checkAnswer(Number($(this).val()), currentEquation.answer);
  })
  $('#numberLimit').on('change', function() {
    equationLimit = $(this).val();
  })
});
