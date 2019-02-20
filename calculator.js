function add(a, b)
{
  return a + b;
}

function subtract(a, b)
{
  return a - b;
}

function multiply(a, b)
{
  return a * b;
}

function divide(a, b)
{
  if(b === 0)
  {
    alert("This value is undefined.");
  }
  return a / b;
}

function operate(a, b, operator)
{
  var result;
  switch (operator)
  {
    case '+':
      result = add(a, b);
      break;
    case '-':
      result = subtract(a, b);
      break;
    case '*':
      result = multiply(a, b);
      break;
    case '/':
      result = divide(a, b);
      break;
  }
  return result;
}
