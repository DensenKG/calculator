Este documento también es disponible en [español](README.sp.md).

## Overview ##

This project is part of the Odin Project's [curriculum](https://www.theodinproject.com/courses/web-development-101/lessons/calculator). Primarily made using a combination of CSS and JavaScript, it is a 20-button calculator that performs the four basic arithmetic operations (i.e. addition, subtraction, multiplication, and division). The remaining 16 buttons consist of the digits zero through nine, a decimal point, an equals sign, a clear button, a delete button, and two language buttons.

Each button is pressed by clicking on it with the mouse cursor. Hovering over any of them makes them darken in color. Additionally, hovering over the clear button, the delete button, a language button, or an operation button displays a tooltip featuring the button's name.

The calculator can evaluate expressions containing up to three operators. These expressions appear in the top portion of the display, while their solutions appear in the bottom portion. Expressions have a maximum length of 20 characters, and solutions have a maximum length of 15 characters.  

## Features and Functionality ##
### Alerts ###
If an expression contains more than three operators, if the solution to an expression exceeds a certain character limit, or if users attempt division by zero, the calculator will display a corresponding alert. In the first case, users are advised to reduce the number of operators, and until they do so, no solution is displayed.

In the second case, the solution is displayed in the alert in both standard and exponential form. Users are advised to write down this value because the calculator's display is cleared once the alert is closed.

In the third case, users are told that they "have found and/or manipulated the answer to the ultimate question of life, the universe and everything: 42." Once the alert is closed, this value (or something higher or lower, depending on whether an additional operation has been performed) is displayed, and all buttons except for the clear button are disabled.

### Buttons ###
The buttons associated with the digits zero through nine populate the display with their respective values. Because the functions of the others may not be immediately apparent, each has been included in the list below:

* __Clear (CLR)__: Reverts the display to its initial state and re-enables buttons that have been disabled.
* __Delete (DEL)__: Removes the most recent input from the top portion of the display.
* __English (ENG)__: Changes the language used in alerts, tooltips, and the calculator's display to English.
* __Spanish (SPA)__: Changes the language used in alerts, tooltips, and the calculator's display to Spanish.
* __Equals sign (=)__: Evaluates the expression in the display if able and displays the solution.
* __Decimal point (.)__: Turns an operand into a decimal fraction. Sometimes limited or disabled in response to user input or following certain alerts.
* __Addition (+)__: Enables the calculator to perform addition.
* __Subtraction (-)__: Enables the calculator to perform subtraction.
* __Multiplication (*)__: Enables the calculator to perform multiplication.
* __Division (/)__: Enables the calculator to perform division.

## Restrictions and Additional Notes ##

Solutions to expressions can be negative numbers, but negative numbers cannot be operands. The only exception to this is if the expression involves adding a positive operand to a negative operand, such as `-1 + 20`. If the order is reversed, then the calculator returns `NaN` (not a number).

Clicking in the space between buttons may produce the character string `CLRENGSPADEL123/456*789-.0=+`, which extends beyond the calculator's dimensions. If this happens, pressing the clear button will restore normal functionality.
