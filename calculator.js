let calcContainer = document.querySelector('#calc-container');
let numRows = 4;
let numColumns = numRows;
document.body.onload = createButtons;

function createButtons()
{
  for (var i = 0; i < numRows; i++)
  {
    for (var j =0; j < numColumns; j++)
    {
      var calcButton = document.createElement("button");
      calcButton.classList.add("calc-button");
      calcButton.setAttribute('type', 'button');
      calcContainer.appendChild(calcButton);
    }
  }
  labelButtons();
}

function labelButtons()
{
  var allButtons = document.querySelectorAll('.calc-button');
  for (var i = 0; i < allButtons.length; i++)
  {
    switch (i)
    {
      case 0:
        allButtons[i].textContent = "1";
        allButtons[i].setAttribute('id', 'one-button');
        break;
      case 1:
        allButtons[i].textContent = "2";
        allButtons[i].setAttribute('id', 'two-button');
        break;
      case 2:
        allButtons[i].textContent = "3";
        allButtons[i].setAttribute('id', 'three-button');
        break;
      case 3:
        allButtons[i].textContent = "/";
        allButtons[i].setAttribute('id', 'divide-button');
        break;
      case 4:
        allButtons[i].textContent = "4";
        allButtons[i].setAttribute('id', 'four-button');
        break;
      case 5:
        allButtons[i].textContent = "5";
        allButtons[i].setAttribute('id', 'five-button');
        break;
      case 6:
        allButtons[i].textContent = "6";
        allButtons[i].setAttribute('id', 'six-button');
        break;
      case 7:
        allButtons[i].textContent = "x";
        allButtons[i].setAttribute('id', 'mult-button');
        break;
      case 8:
        allButtons[i].textContent = "7";
        allButtons[i].setAttribute('id', 'seven-button');
        break;
      case 9:
        allButtons[i].textContent = "8";
        allButtons[i].setAttribute('id', 'eight-button');
        break;
      case 10:
        allButtons[i].textContent = "9";
        allButtons[i].setAttribute('id', 'nine-button');
        break;
      case 11:
        allButtons[i].textContent = "-";
        allButtons[i].setAttribute('id', 'sub-button');
        break;
      case 12:
        allButtons[i].textContent = "C";
        allButtons[i].setAttribute('id', 'clear-button');
        break;
      case 13:
        allButtons[i].textContent = "0";
        allButtons[i].setAttribute('id', 'zero-button');
        break;
      case 14:
        allButtons[i].textContent = "=";
        allButtons[i].setAttribute('id', 'equals-button');
        break;
      case 15:
        allButtons[i].textContent = "+";
        allButtons[i].setAttribute('id', 'add-button');
    }
  }
}

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
