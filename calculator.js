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
    alert("Congratulations. You have found and/or manipulated the answer to the ultimate question of life, the universe, and everything: 42.");
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
  operationString = '';
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

  for (var i = 0; i < operationString.length; i++)
  {
    if(operationString[i] == '+' || operationString[i] == '-' || operationString[i] == '*' || operationString[i] == '/')
    {
      operatorCount++;
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

      if(displayValue == '0' || displayValue == '')
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
              operand1 = operationString.slice(0, multLocation);
              operand2 = operationString.slice(multLocation+1, plusLocation);
              temp = operate(operand1, operand2, '*');
              firstNum = temp;
              secondNum = currentInput;
            }
            else
            {
              operand1 = operationString.slice(plusLocation+1, multLocation);
              operand2 = currentInput;
              temp = operate(operand1, operand2, '*');
              secondNum = temp;
              firstNum = operationString.slice(0, plusLocation);
              operator = '+';
            }
          }
          else if(operationString.includes('*') && operationString.includes('-'))
          {
            multLocation = operationString.indexOf('*');
            minusLocation = operationString.indexOf('-');
            if(minusLocation > multLocation)
            {
              operand1 = operationString.slice(0, multLocation);
              operand2 = operationString.slice(multLocation+1, minusLocation);
              temp = operate(operand1, operand2, '*');
              firstNum = temp;
              secondNum = currentInput;
            }
            else
            {
              operand1 = operationString.slice(minusLocation+1, multLocation);
              operand2 = currentInput;
              temp = operate(operand1, operand2, '*');
              secondNum = temp;
              firstNum = operationString.slice(0, minusLocation);
              operator = '-';
            }
          }
          else if(operationString.includes('*') && operationString.includes('/'))
          {
            multLocation = operationString.indexOf('*');
            divideLocation = operationString.indexOf('/');

            if(divideLocation > multLocation)
            {
              operand1 = operationString.slice(0, multLocation);
              operand2 = operationString.slice(multLocation+1, divideLocation);
              temp = operate(operand1, operand2, '*');
              firstNum = temp;
              secondNum = currentInput;
            }
            else
            {
              operand1 = operationString.slice(0, divideLocation);
              operand2 = operationString.slice(divideLocation+1, multLocation);
              temp = operate(operand1, operand2, '/');
              firstNum = temp;
              secondNum = currentInput;
              operator = '*';
            }
          }
          else if(operationString.includes('*') && operationString.includes('*'))
          {
            firstMult = operationString.indexOf('*');
            secondMult = operationString.indexOf('*', firstMult+1);
            operand1 = operationString.slice(0, firstMult);
            operand2 = operationString.slice(firstMult+1, secondMult);
            temp = operate(operand1, operand2, '*');
            firstNum = temp;
            secondNum = currentInput;
          }
          else if(operationString.includes('/') && operationString.includes('+'))
          {
            divideLocation = operationString.indexOf('/');
            plusLocation = operationString.indexOf('+');
            if(plusLocation > divideLocation)
            {
              operand1 = operationString.slice(0, divideLocation);
              operand2 = operationString.slice(divideLocation+1, plusLocation);
              temp = operate(operand1, operand2, '/');
              firstNum = temp;
              secondNum = currentInput;
              operator = '+';
            }
            else
            {
              operand1 = operationString.slice(plusLocation+1, divideLocation);
              operand2 = currentInput;
              temp = operate(operand1, operand2, '/');
              firstNum = temp;
              secondNum = operationString.slice(0, plusLocation);
              operator = '+';
            }
          }
          else if(operationString.includes('/') && operationString.includes('-'))
          {
            divideLocation = operationString.indexOf('/');
            minusLocation = operationString.indexOf('-');
            if(minusLocation > divideLocation)
            {
              operand1 = operationString.slice(0, divideLocation);
              operand2 = operationString.slice(divideLocation+1, minusLocation);
              temp = operate(operand1, operand2, '/');
              firstNum = temp;
              secondNum = currentInput;
              operator = '-';
            }
            else
            {
              operand1 = operationString.slice(minusLocation+1, divideLocation);
              operand2 = currentInput;
              temp = operate(operand1, operand2, '/');
              firstNum = temp;
              secondNum = operationString.slice(0, minusLocation);
              operator = '-';
            }
          }
          else if(operationString.includes('/') && operationString.includes('/'))
          {
            firstDivide = operationString.indexOf('/');
            secondDivide = operationString.indexOf('/', firstDivide+1);
            operand1 = operationString.slice(0, firstDivide);
            operand2 = operationString.slice(firstDivide+1, secondDivide);
            temp = operate(operand1, operand2, '/');
            firstNum = temp;
            secondNum = currentInput;
          }
          else if(operationString.includes('-') && operationString.includes('+'))
          {
            minusLocation = operationString.indexOf('-');
            plusLocation = operationString.indexOf('+');
            if(minusLocation > plusLocation)
            {
              operand1 = parseFloat(operationString.slice(0, plusLocation));
              operand2 = parseFloat(operationString.slice(plusLocation+1, minusLocation));
              temp = operate(operand1, operand2, '+');
              firstNum = temp;
              secondNum = currentInput;
            }
            else
            {
              operand1 = operationString.slice(0, minusLocation);
              operand2 = operationString.slice(minusLocation+1, plusLocation);
              temp = operate(operand1, operand2, '-');
              firstNum = temp;
              secondNum = currentInput;
            }
          }
          else if(operationString.includes('-') && operationString.includes('-'))
          {
            firstMinus = operationString.indexOf('-');
            secondMinus = operationString.indexOf('-', firstMinus+1);
            operand1 = operationString.slice(0, firstMinus);
            operand2 = operationString.slice(firstMinus+1, secondMinus);
            temp = operate(operand1, operand2, '-');
            firstNum = temp;
            secondNum = currentInput;
          }
          else
          {
            firstPlus = operationString.indexOf('+');
            secondPlus = operationString.indexOf('+', firstPlus+1);
            operand1 = parseFloat(operationString.slice(0, firstPlus));
            operand2 = parseFloat(operationString.slice(firstPlus+1, secondPlus));
            temp = operate(operand1, operand2, '+');
            firstNum = temp;
            secondNum = currentInput;
          }
        }
        else if(operatorCount == 3)
        {
          if(operationString.includes('+') && operationString.includes('+'))
          {
            firstPlus = operationString.indexOf('+');
            secondPlus = operationString.indexOf('+', firstPlus+1);
            if(operationString.includes('+'))
            {
              thirdPlus = operationString.indexOf('+', secondPlus+1);
              operand1 = parseFloat(operationString.slice(0, firstPlus));
              operand2 = parseFloat(operationString.slice(firstPlus+1, secondPlus));
              operand3 = parseFloat(operationString.slice(secondPlus+1, thirdPlus));
              temp = operate(operand1, operand2, '+');
              firstNum = operate(temp, operand3, '+');
              secondNum = currentInput;
            }
            if(operationString.includes('-'))
            {
              minusLocation = operationString.indexOf('-');
              if(minusLocation < firstPlus)
              {
                operand1 = parseFloat(operationString.slice(0, minusLocation));
                operand2 = parseFloat(operationString.slice(minusLocation+1, firstPlus));
                operand3 = parseFloat(operationString.slice(firstPlus+1, secondPlus));
                temp = operate(operand1, operand2, '-');
                firstNum = operate(temp, operand3, '+');
                secondNum = currentInput;
              }
              else if(minusLocation > firstPlus && minusLocation < secondPlus)
              {
                operand1 = parseFloat(operationString.slice(0, firstPlus));
                operand2 = parseFloat(operationString.slice(firstPlus+1, minusLocation));
                operand3 = parseFloat(operationString.slice(minusLocation+1, secondPlus));
                temp = operate(operand1, operand2, '+');
                firstNum = operate(temp, operand3, '-');
                secondNum = currentInput;
              }
              else
              {
                operand1 = parseFloat(operationString.slice(0, firstPlus));
                operand2 = parseFloat(operationString.slice(firstPlus+1, secondPlus));
                operand3 = parseFloat(operationString.slice(secondPlus+1, minusLocation));
                temp = operate(operand1, operand2, '+');
                firstNum = operate(temp, operand3, '+');
                secondNum = currentInput;
              }
            }
            if(operationString.includes('*'))
            {
              multLocation = operationString.indexOf('*');
              if(multLocation < firstPlus)
              {
                operand1 = parseFloat(operationString.slice(0, multLocation));
                operand2 = parseFloat(operationString.slice(multLocation+1, firstPlus));
                operand3 = parseFloat(operationString.slice(firstPlus+1, secondPlus));
                temp = operate(operand1, operand2, '*');
                firstNum = operate(temp, operand3, '+');
                secondNum = currentInput;
              }
              else if(multLocation > firstPlus && multLocation < secondPlus)
              {
                operand1 = parseFloat(operationString.slice(firstPlus+1, multLocation));
                operand2 = parseFloat(operationString.slice(multLocation+1, secondPlus));
                operand3 = parseFloat(operationString.slice(0, firstPlus));
                temp = operate(operand1, operand2, '*');
                firstNum = operate(temp, operand3, '+');
                secondNum = currentInput;
              }
              else
              {
                operand1 = parseFloat(operationString.slice(secondPlus+1, multLocation));
                operand2 = currentInput;
                temp = operate(operand1, operand2, '*');
                operand3 = parseFloat(operationString.slice(0, firstPlus));
                operand4 = parseFloat(operationString.slice(firstPlus+1, secondPlus));
                firstNum = operate(temp, operand3, '+');
                secondNum = operand4;
                operator = '+';
              }
            }
            if(operationString.includes('/'))
            {
              divideLocation = operationString.indexOf('/');
              if(divideLocation < firstPlus)
              {
                operand1 = parseFloat(operationString.slice(0, divideLocation));
                operand2 = parseFloat(operationString.slice(divideLocation+1, firstPlus));
                operand3 = parseFloat(operationString.slice(firstPlus+1, secondPlus));
                temp = operate(operand1, operand2, '/');
                firstNum = operate(temp, operand3, '+');
                secondNum = currentInput;
              }
              else if(divideLocation > firstPlus && divideLocation < secondPlus)
              {
                operand1 = parseFloat(operationString.slice(firstPlus+1, divideLocation));
                operand2 = parseFloat(operationString.slice(divideLocation+1, secondPlus));
                operand3 = parseFloat(operationString.slice(0, firstPlus));
                temp = operate(operand1, operand2, '/');
                firstNum = operate(temp, operand3, '+');
                secondNum = currentInput;
              }
              else
              {
                operand1 = parseFloat(operationString.slice(secondPlus+1, divideLocation));
                operand2 = currentInput;
                temp = operate(operand1, operand2, '/');
                operand3 = parseFloat(operationString.slice(0, firstPlus));
                operand4 = parseFloat(operationString.slice(firstPlus+1, secondPlus));
                firstNum = operate(temp, operand3, '+');
                secondNum = operand4;
                operator = '+';
              }
            }
          }
          if(operationString.includes('-') && operationString.includes('-'))
          {
            firstMinus = operationString.indexOf('-');
            secondMinus = operationString.indexOf('-', firstMinus+1);
            if(operationString.includes('+'))
            {
              plusLocation = operationString.indexOf('+');
              if(plusLocation < firstMinus)
              {
                operand1 = parseFloat(operationString.slice(0, plusLocation));
                operand2 = parseFloat(operationString.slice(plusLocation+1, firstMinus));
                operand3 = parseFloat(operationString.slice(firstMinus+1, secondMinus));
                temp = operate(operand1, operand2, '+');
                firstNum = operate(temp, operand3, '-');
                secondNum = currentInput;
              }
              else if(plusLocation > firstMinus && plusLocation < secondMinus)
              {
                operand1 = parseFloat(operationString.slice(0, firstMinus));
                operand2 = parseFloat(operationString.slice(firstMinus+1, plusLocation));
                operand3 = parseFloat(operationString.slice(plusLocation+1, secondMinus));
                temp = operate(operand1, operand2, '-');
                firstNum = operate(temp, operand3, '+');
                secondNum = currentInput;
              }
              else
              {
                operand1 = parseFloat(operationString.slice(0, firstMinus));
                operand2 = parseFloat(operationString.slice(firstMinus+1, secondMinus));
                operand3 = parseFloat(operationString.slice(secondMinus+1, plusLocation));
                temp = operate(operand1, operand2, '-');
                firstNum = operate(temp, operand3, '-');
                secondNum = currentInput;
              }
            }
            if(operationString.includes('-'))
            {
              thirdMinus = operationString.indexOf('-', secondMinus+1);
              operand1 = parseFloat(operationString.slice(0, firstMinus));
              operand2 = parseFloat(operationString.slice(firstMinus+1, secondMinus));
              operand3 = parseFloat(operationString.slice(secondMinus+1, thirdMinus));
              temp = operate(operand1, operand2, '-');
              firstNum = operate(temp, operand3, '-');
              secondNum = currentInput;
            }
            if(operationString.includes('*'))
            {
              multLocation = operationString.indexOf('*');
              if(multLocation < firstMinus)
              {
                operand1 = parseFloat(operationString.slice(0, multLocation));
                operand2 = parseFloat(operationString.slice(multLocation+1, firstMinus));
                operand3 = parseFloat(operationString.slice(firstMinus+1, secondMinus));
                temp = operate(operand1, operand2, '*');
                firstNum = operate(temp, operand3, '-');
                secondNum = currentInput;
              }
              else if(multLocation > firstMinus && multLocation < secondMinus)
              {
                operand1 = parseFloat(operationString.slice(firstMinus+1, multLocation));
                operand2 = parseFloat(operationString.slice(multLocation+1, secondMinus));
                operand3 = parseFloat(operationString.slice(0, firstMinus));
                temp = operate(operand1, operand2, '*');
                firstNum = operate(operand3, temp, '-');
                secondNum = currentInput;
              }
              else
              {
                operand1 = parseFloat(operationString.slice(secondMinus+1, multLocation));
                operand2 = currentInput;
                temp = operate(operand1, operand2, '*');
                operand3 = parseFloat(operationString.slice(0, firstMinus));
                operand4 = parseFloat(operationString.slice(firstMinus+1, secondMinus));
                firstNum = operate(operand3, operand4, '-');
                secondNum = temp;
                operator = '-';
              }
            }
            if(operationString.includes('/'))
            {
              divideLocation = operationString.indexOf('/');
              if(divideLocation < firstMinus)
              {
                operand1 = parseFloat(operationString.slice(0, divideLocation));
                operand2 = parseFloat(operationString.slice(divideLocation+1, firstMinus));
                operand3 = parseFloat(operationString.slice(firstMinus+1, secondMinus));
                temp = operate(operand1, operand2, '/');
                firstNum = operate(temp, operand3, '-');
                secondNum = currentInput;
              }
              else if(divideLocation > firstMinus && divideLocation < secondMinus)
              {
                operand1 = parseFloat(operationString.slice(firstMinus+1, divideLocation));
                operand2 = parseFloat(operationString.slice(divideLocation+1, secondMinus));
                operand3 = parseFloat(operationString.slice(0, firstMinus));
                temp = operate(operand1, operand2, '/');
                firstNum = operate(operand3, temp, '-');
                secondNum = currentInput;
              }
              else
              {
                operand1 = parseFloat(operationString.slice(secondMinus+1, divideLocation));
                operand2 = currentInput;
                temp = operate(operand1, operand2, '/');
                operand3 = parseFloat(operationString.slice(0, firstMinus));
                operand4 = parseFloat(operationString.slice(firstMinus+1, secondMinus));
                firstNum = operate(operand3, operand4, '-');
                secondNum = temp;
                operator = '-';
              }
            }
          }
        }
      }
      else
      {
        firstNum = displayValue;
        displayValue = '';
      }
    }
  }

  var parsedFirst = parseFloat(firstNum, 10);
  var parsedSecond = parseFloat(secondNum, 10);

  if(operationString.charAt(operationString.length - 1) != operator)
  {
    solution = operate(parsedFirst, parsedSecond, operator);

    if(solution % 1 === 0)
    {
      displayValue = solution;
    }
    else
    {
      displayValue = solution.toFixed(4);
    }
    operationString = displayValue.toString();
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
