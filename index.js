var signArray = ['+'];
var timeLeft = 10;

$(document).on('change','.form-check-input', function(event) {
  if (this.checked) {
    var equationSign = $(this).next().text();
    signArray.push(equationSign);
  } else {
    var equationSign = $(this).next().text();
    signArray.splice(signArray.indexOf(equationSign), 1);
  }
})

var generateEquationSign = function() {
  console.log(signArray);
  return signArray[Math.floor(Math.random()*signArray.length)]
};

var currentEquation;
var generateRandomEquation = function () {
  var equation = {};
  var a = Math.floor(Math.random()*10);
  var b = Math.floor(Math.random()*10);
  var sign = generateEquationSign();
  equation.question = String(a) + sign + String(b);
  // to be orrected as the sign needs to change
  equation.answer = a + b;
  console.log(equation.question);
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
    addSecond(+1);
  }
}

var interval = setInterval (function () {
  addSecond(-1);
  $('#seconds').text(timeLeft);
  if (timeLeft === 0) {
    clearInterval(interval);
  }
  console.log(timeLeft);
}, 1000);

var addSecond = function (amount) {
  timeLeft += amount;
  $('#seconds').text(timeLeft);
}

$(document).ready(function() {
  currentEquation = generateRandomEquation();

  $('#answer').on('keyup', function(event) {
    checkAnswer(Number($(this).val()), currentEquation.answer);
    $(this).val('');
  })

});
