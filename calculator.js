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
  operatorCount = 0;
  plusCount = 0;
  minusCount = 0;
  multCount = 0;
  divCount = 0;
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
          opLocation = operationString.indexOf(operator);
          firstNum = operationString.slice(0, opLocation);
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
          plusCount = 0;
          minusCount = 0;
          multCount = 0;
          divCount = 0;

          for(var i= 0; i < operationString.length; i++)
          {
            if(operationString[i] == '+')
            {
              plusCount++;
            }
            if(operationString[i] == '-')
            {
              minusCount++;
            }
            if(operationString[i] == '*')
            {
              multCount++;
            }
            if(operationString[i] == '/')
            {
              divCount++;
            }
          }
          if(plusCount == 1 && minusCount == 1)
          {
            plusLocation = operationString.indexOf('+');
            minusLocation = operationString.indexOf('-');
            if(multCount == 1)
            {
              priorityOp = '*';
            }
            if(divCount == 1)
            {
              priorityOp = '/';
            }
            priorityOpLoc = operationString.indexOf(priorityOp);
            if(priorityOpLoc < plusLocation && plusLocation < minusLocation
            || priorityOpLoc < minusLocation && minusLocation < plusLocation)
            {
              if(priorityOpLoc < plusLocation && plusLocation < minusLocation)
              {
                closestOp = '+';
                furthestOp = '-';
              }
              else
              {
                closestOp = '-'
                furthestOp = '+';
              }
              closestOpLoc = operationString.indexOf(closestOp);
              furthestOpLoc = operationString.indexOf(furthestOp);
              operand1 = parseFloat(operationString.slice(0, priorityOpLoc));
              operand2 = parseFloat(operationString.slice(priorityOpLoc+1, closestOpLoc));
              operand3 = parseFloat(operationString.slice(closestOpLoc+1, furthestOpLoc));
              temp = operate(operand1, operand2, priorityOp);
              firstNum = operate(temp, operand3, closestOp);
              secondNum = currentInput;
            }
            else if(priorityOpLoc > plusLocation && plusLocation < minusLocation
            || priorityOpLoc > minusLocation && minusLocation < plusLocation)
            {
              if(priorityOpLoc > plusLocation && plusLocation < minusLocation)
              {
                precedingOp = '+';
                followingOp = '-';
              }
              else
              {
                precedingOp = '-';
                followingOp = '+';
              }
              precedingOpLoc = operationString.indexOf(precedingOp);
              followingOpLoc = operationString.indexOf(followingOp);
              operand1 = parseFloat(operationString.slice(0, precedingOpLoc));
              operand2 = parseFloat(operationString.slice(precedingOpLoc+1, priorityOpLoc));
              operand3 = parseFloat(operationString.slice(priorityOpLoc+1, followingOpLoc));
              temp = operate(operand2, operand3, priorityOp);
              firstNum = operate(operand1, temp, precedingOp);
              secondNum = currentInput;
              operator = followingOp;
            }
            if(priorityOpLoc > plusLocation && plusLocation > minusLocation
            || priorityOpLoc > minusLocation && minusLocation > plusLocation)
            {
              if(priorityOpLoc > plusLocation && plusLocation > minusLocation)
              {
                closestOp = '+';
                furthestOp = '-';
              }
              else
              {
                closestOp = '-';
                furthestOp = '+';
              }
              closestOpLoc = operationString.indexOf(closestOp);
              furthestOpLoc = operationString.indexOf(furthestOp);
              operand1 = parseFloat(operationString.slice(0, furthestOpLoc));
              operand2 = parseFloat(operationString.slice(furthestOpLoc+1, closestOpLoc));
              operand3 = parseFloat(operationString.slice(closestOpLoc+1, priorityOpLoc));
              operand4 = currentInput;
              temp = operate(operand3, operand4, priorityOp);
              temp2 = operate(operand1, operand2, furthestOp);
              firstNum = temp2;
              secondNum = temp;
              operator = closestOp;
            }
          }
          if(multCount == 1 && divCount == 1)
          {
            multLocation = operationString.indexOf('*');
            divideLocation = operationString.indexOf('/');
            if(plusCount == 1)
            {
              leastPriorityOp = '+';
            }
            if(minusCount == 1)
            {
              leastPriorityOp = '-';
            }
            leastPriorityOpLoc = operationString.indexOf(leastPriorityOp);
            if(leastPriorityOpLoc < multLocation && multLocation < divideLocation
            || leastPriorityOpLoc < divideLocation && divideLocation < multLocation)
            {
              if(leastPriorityOpLoc < multLocation && multLocation < divideLocation)
              {
                closestOp = '*';
                furthestOp = '/';
              }
              else
              {
                closestOp = '/';
                furthestOp = '*';
              }
              closestOpLoc = operationString.indexOf(closestOp);
              furthestOpLoc = operationString.indexOf(furthestOp);
              operand1 = parseFloat(operationString.slice(0, leastPriorityOpLoc));
              operand2 = parseFloat(operationString.slice(leastPriorityOpLoc+1, closestOpLoc));
              operand3 = parseFloat(operationString.slice(closestOpLoc+1, furthestOpLoc));
              operand4 = currentInput;
              temp = operate(operand2, operand3, closestOp);
              firstNum = operand1;
              secondNum = operate(temp, operand4, furthestOp);
              operator = leastPriorityOp;
            }
            else if(leastPriorityOpLoc > multLocation && multLocation < divideLocation
            || leastPriorityOpLoc > divideLocation && divideLocation < multLocation)
            {
              if(leastPriorityOpLoc > multLocation && multLocation < divideLocation)
              {
                precedingOp = '*';
                followingOp = '/';
              }
              else
              {
                precedingOp = '/';
                followingOp = '*';
              }
              precedingOpLoc = operationString.indexOf(precedingOp);
              followingOpLoc = operationString.indexOf(followingOp);
              operand1 = parseFloat(operationString.slice(0, precedingOpLoc));
              operand2 = parseFloat(operationString.slice(precedingOpLoc+1, leastPriorityOpLoc));
              operand3 = parseFloat(operationString.slice(leastPriorityOpLoc+1, followingOpLoc));
              operand4 = currentInput;
              temp = operate(operand1, operand2, precedingOp);
              firstNum = temp;
              secondNum = operate(operand3, operand4, followingOp);
              operator = leastPriorityOp;
            }
            if(leastPriorityOpLoc > multLocation && multLocation > divideLocation
            || leastPriorityOpLoc > divideLocation && divideLocation > multLocation)
            {
              if(leastPriorityOpLoc > multLocation && multLocation > divideLocation)
              {
                closestOp = '*';
                furthestOp = '/';
              }
              else
              {
                closestOp = '/';
                furthestOp = '*';
              }
              closestOpLoc = operationString.indexOf(closestOp);
              furthestOpLoc = operationString.indexOf(furthestOp);
              operand1 = parseFloat(operationString.slice(0, furthestOpLoc));
              operand2 = parseFloat(operationString.slice(furthestOpLoc+1, closestOpLoc));
              operand3 = parseFloat(operationString.slice(closestOpLoc+1, leastPriorityOpLoc));
              temp = operate(operand1, operand2, furthestOp);
              firstNum = operate(temp, operand3, closestOp);
              secondNum = currentInput;
            }
          }
          if(plusCount >= 2 || minusCount >=2 || multCount >=2 || divCount >= 2)
          {
            if(plusCount >=2)
            {
              majorityOp = '+';
              majorityCount = plusCount;
            }
            if(minusCount >= 2)
            {
              majorityOp = '-';
              majorityCount = minusCount;
            }
            if(multCount >= 2)
            {
              majorityOp = '*';
              majorityCount = multCount;
            }
            if(divCount >=2)
            {
              majorityOp = '/';
              majorityCount = divCount;
            }
            majorityOpLoc1 = operationString.indexOf(majorityOp);
            majorityOpLoc2 = operationString.indexOf(majorityOp, majorityOpLoc1+1);
            if(majorityCount == 3)
            {
              majorityOpLoc3 = operationString.indexOf(majorityOp, majorityOpLoc2+1);
              operand1 = parseFloat(operationString.slice(0, majorityOpLoc1));
              operand2 = parseFloat(operationString.slice(majorityOpLoc1+1, majorityOpLoc2));
              operand3 = parseFloat(operationString.slice(majorityOpLoc2+1, majorityOpLoc3));
              temp = operate(operand1, operand2, majorityOp);
              firstNum = operate(temp, operand3, majorityOp);
              secondNum = currentInput;
            }
            else
            {
              if(plusCount == 1)
              {
                minorityOp = '+';
              }
              if(minusCount == 1)
              {
                minorityOp = '-';
              }
              if(multCount == 1)
              {
                minorityOp = '*';
              }
              if(divCount == 1)
              {
                minorityOp = '/';
              }
              minorityOpLoc = operationString.indexOf(minorityOp);
              if(majorityOp == '+' && minorityOp == '-' || majorityOp == '-' && minorityOp == '+'
              || majorityOp == '*' && minorityOp == '/' || majorityOp == '/' && minorityOp == '*')
              {
                if(minorityOpLoc < majorityOpLoc1)
                {
                  operand1 = parseFloat(operationString.slice(0, minorityOpLoc));
                  operand2 = parseFloat(operationString.slice(minorityOpLoc+1, majorityOpLoc1));
                  operand3 = parseFloat(operationString.slice(majorityOpLoc1+1, majorityOpLoc2));
                  temp = operate(operand1, operand2, minorityOp);
                  firstNum = operate(temp, operand3, majorityOp);
                  secondNum = currentInput;
                }
                else if(minorityOpLoc > majorityOpLoc1 && minorityOpLoc < majorityOpLoc2)
                {
                  operand1 = parseFloat(operationString.slice(0, majorityOpLoc1));
                  operand2 = parseFloat(operationString.slice(majorityOpLoc1+1, minorityOpLoc));
                  operand3 = parseFloat(operationString.slice(minorityOpLoc+1, majorityOpLoc2));
                  temp = operate(operand1, operand2, majorityOp);
                  firstNum = operate(temp, operand3, minorityOp);
                  secondNum = currentInput;
                }
                else
                {
                  operand1 = parseFloat(operationString.slice(0, majorityOpLoc1));
                  operand2 = parseFloat(operationString.slice(majorityOpLoc1+1, majorityOpLoc2));
                  operand3 = parseFloat(operationString.slice(majorityOpLoc2+1, minorityOpLoc));
                  temp = operate(operand1, operand2, majorityOp);
                  firstNum = operate(temp, operand3, majorityOp);
                  secondNum = currentInput;
                }
              }
              if(majorityOp == '+' && minorityOp == '*' || majorityOp == '-' && minorityOp == '*'
              || majorityOp == '+' && minorityOp == '/' || majorityOp == '-' && minorityOp == '/')
              {
                if(minorityOpLoc < majorityOpLoc1)
                {
                  operand1 = parseFloat(operationString.slice(0, minorityOpLoc));
                  operand2 = parseFloat(operationString.slice(minorityOpLoc+1, majorityOpLoc1));
                  operand3 = parseFloat(operationString.slice(majorityOpLoc1+1, majorityOpLoc2));
                  temp = operate(operand1, operand2, minorityOp);
                  firstNum = operate(temp, operand3, majorityOp);
                  secondNum = currentInput;
                }
                else if(minorityOpLoc > majorityOpLoc1 && minorityOpLoc < majorityOpLoc2)
                {
                  operand1 = parseFloat(operationString.slice(0, majorityOpLoc1));
                  operand2 = parseFloat(operationString.slice(majorityOpLoc1+1, minorityOpLoc));
                  operand3 = parseFloat(operationString.slice(minorityOpLoc+1, majorityOpLoc2));
                  temp = operate(operand2, operand3, minorityOp);
                  firstNum = operate(operand1, temp, majorityOp);
                  secondNum = currentInput;
                }
                else
                {
                  operand1 = parseFloat(operationString.slice(0, majorityOpLoc1));
                  operand2 = parseFloat(operationString.slice(majorityOpLoc1+1, majorityOpLoc2));
                  operand3 = parseFloat(operationString.slice(majorityOpLoc2+1, minorityOpLoc));
                  operand4 = currentInput;
                  temp = operate(operand3, operand4, minorityOp);
                  firstNum = operate(operand1, operand2, majorityOp);
                  secondNum = temp;
                  operator = majorityOp;
                }
              }
              if(majorityOp == '*' && minorityOp == '+' || majorityOp == '*' && minorityOp == '-'
              || majorityOp == '/' && minorityOp == '+' || majorityOp == '/' && minorityOp == '-')
              {
                if(minorityOpLoc < majorityOpLoc1)
                {
                  operand1 = parseFloat(operationString.slice(0, minorityOpLoc));
                  operand2 = parseFloat(operationString.slice(minorityOpLoc+1, majorityOpLoc1));
                  operand3 = parseFloat(operationString.slice(majorityOpLoc1+1, majorityOpLoc2));
                  operand4 = currentInput;
                  temp = operate(operand2, operand3, majorityOp);
                  firstNum = operand1;
                  secondNum = operate(temp, operand4, majorityOp);
                  operator = minorityOp;
                }
                else if(minorityOpLoc > majorityOpLoc1 && minorityOpLoc < majorityOpLoc2)
                {
                  operand1 = parseFloat(operationString.slice(0, majorityOpLoc1));
                  operand2 = parseFloat(operationString.slice(majorityOpLoc1+1, minorityOpLoc));
                  operand3 = parseFloat(operationString.slice(minorityOpLoc+1, majorityOpLoc2));
                  operand4 = currentInput;
                  temp = operate(operand1, operand2, majorityOp);
                  temp2 = operate(operand3, operand4, majorityOp);
                  firstNum = temp;
                  secondNum = temp2;
                  operator = minorityOp;
                }
                else
                {
                  operand1 = parseFloat(operationString.slice(0, majorityOpLoc1));
                  operand2 = parseFloat(operationString.slice(majorityOpLoc1+1, majorityOpLoc2));
                  operand3 = parseFloat(operationString.slice(majorityOpLoc2+1, minorityOpLoc));
                  temp = operate(operand1, operand2, majorityOp);
                  firstNum = operate(temp, operand3, majorityOp);
                  secondNum = currentInput;
                }
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
    console.log(plusCount);
    console.log(minusCount);
    console.log(multCount);
    console.log(divCount);
    if(solution.toString().length <= 15)
    {
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
      if(solution.toExponential().toString().length <= 15)
      {
        displayValue = solution.toExponential();
      }
      else
      {
        alert("Display capacity exceeded. The solution is: " + solution + " or " + solution.toExponential() + '.\n' + "\nNOTE: The display will be cleared once the alert is closed, so record this value elsewhere if needed.");
        clearDisplay();
      }
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
