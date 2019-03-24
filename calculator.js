let calcContainer = document.querySelector('#calc-container');
let calcDisplay = document.getElementById('calc-display');
let displayTop = document.getElementById('display-top');
let displayBottom = document.getElementById('display-bottom');
let numRows = 4;
let numColumns = numRows;
let operationString = '';
let currentInput = '';
let displayValue = '0';
document.body.onload = createCalculator;

function createCalculator()
{
  createButtons();
  updateDisplay();
  manageButtonFunctionality();
}


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
        allButtons[i].setAttribute('title', "Division");
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
        allButtons[i].textContent = "*";
        allButtons[i].setAttribute('id', 'mult-button');
        allButtons[i].setAttribute('title', "Multiplication");
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
        allButtons[i].setAttribute('title', "Subtraction");
        break;
      case 12:
        allButtons[i].textContent = "C";
        allButtons[i].setAttribute('id', 'clear-button');
        allButtons[i].setAttribute('title', "Clear");
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
        allButtons[i].setAttribute('title', "Addition");
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
  if(b != 0)
  {
    return a / b;
  }
  else
  {
    alert("Thank Douglas Adams.");
    disableButtons();
    return 42;
  }
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

function updateDisplay()
{
  displayTop.textContent = operationString;
  displayBottom.textContent = displayValue;
}

function clearDisplay()
{
  operationString = "";
  displayValue = '0';
  currentInput = '';
}

function manageButtonFunctionality()
{
  calcContainer.addEventListener("click", function(e){
    if(e.target.id == "clear-button")
    {
      clearDisplay();
    }
    else if(e.target.id == "equals-button")
    {
      manageOperations();
    }
    else
    {
      if(operationString.length <= 20)
      {
        operationString += e.target.textContent;
      }
    }
    updateDisplay();
  });
}

function manageOperations()
{
  var stringStart = operationString[0];
  var operator;
  var solution;
  var firstNum;
  var operatorCount = 0;
  var totalOperations = 0;

  for (var i = 0; i < operationString.length; i++)
  {
    if(operationString[i] == '+' || operationString[i] == '-' || operationString[i] == '*' || operationString[i] == '/')
    {
      operatorCount++;
      totalOperations = operatorCount;
      operator = operationString[i];
      currentInput = '';
      if(operationString[i] == stringStart)
      {
        displayValue = 'INVALID';
      }
      else
      {
        var previousInput = operationString[i-1];

      }
      if(previousInput == '+' || previousInput == '-' || previousInput == '*' || previousInput == '/')
      {
        displayValue = 'INVALID';
      }
    }
    else
    {
      currentInput = currentInput + operationString[i];
      if(displayValue == '0')
      {
        if(operatorCount == 1)
        {
          firstNum = operationString.slice(0, operationString[i]);
          secondNum = currentInput;
        }
        else if(operatorCount == 2)
        {
          if(operationString.includes('*') && operationString.includes('+'))
          {
            multLocation = operationString.indexOf('*');
            plusLocation = operationString.indexOf('+');
            if(plusLocation > multLocation)
            {
              tempString = operationString.slice(0, plusLocation);
              operand1 = operationString.slice(0, multLocation);
              operand2 = operationString.slice(multLocation+1, plusLocation);
              temp = operate(operand1, operand2, '*');
              firstNum = temp;
              secondNum = currentInput;
            }
            else
            {
              tempString = operationString.slice(0, multLocation);
              operand1 = operationString.slice(plusLocation+1, multLocation);
              operand2 = currentInput;
              temp = operate(operand1, operand2, '*');
              secondNum = temp;
              firstNum = operationString.slice(0, plusLocation);
              operator = '+';
            }
          }
        }
      }
      else
      {
        firstNum = displayValue;
      }
    }
  }
  var parsedFirst = parseInt(firstNum, 10);
  var parsedSecond = parseInt(secondNum, 10);
  if(operationString.charAt(operationString.length - 1) != operator)
  {
    solution = operate(parsedFirst, parsedSecond, operator);
    //console.log(tempString);
    /*console.log(multLocation);
    console.log(plusLocation);
    console.log(tempString);
    console.log(operand1);
    console.log(operand2);
    console.log(temp);
    console.log(parsedFirst);
    console.log(parsedSecond);
    console.log(operatorCount);
    console.log(totalOperations);*/
    if(solution % 1 === 0)
    {
      displayValue = solution;
    }
    else
    {
      displayValue = solution.toFixed(4);
    }
  }
  else
  {
    displayValue = 'INVALID';
  }
}

function disableButtons()
{
  var allButtons = document.querySelectorAll('.calc-button');
  {
    for(var i = 0; i < allButtons.length; i++)
    {
      if(allButtons[i].id != 'clear-button')
      {
        allButtons[i].disabled = true;
      }
      else
      {
        allButtons[i].addEventListener("click", function(){
        window.location.reload();
        });
      }
    }
  }
}
