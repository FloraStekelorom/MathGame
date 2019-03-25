var signArray = ['+'];

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

var generateRandomEquation = function () {
  var a = Math.floor(Math.random()*10);
  var b = Math.floor(Math.random()*10);
  var sign = generateEquationSign();
  var equation = String(a) + sign + String(b);
  console.log(equation);
  $('#equation').html(equation);
};

$(document).ready(function() {
  generateRandomEquation();
})
