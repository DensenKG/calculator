This document is also available in [English](README.md).

## Descripción general ##

Este proyecto es parte del [currículo](https://www.theodinproject.com/courses/web-development-101/lessons/calculator) del Proyecto Odín. Creado principalmente con una combinación de CSS y JavaScript, es una calculadora de veinte botones que puede realizar las operaciones aritméticas elementales (i.e. adición, sustracción, multiplicación y división). Los dieciséis botones restantes constan de los dígitos de cero a nueve, un punto decimal, un signo igual, un botón para limpiar la pantalla, un botón para suprimir y dos botones de idiomas.

Cada botón está pulsado haciendo clic en él con el cursor del ratón. Cerniendo sobre alguno con el cursor los oscurece. Además, cerniendo sobre el botón para limpiar la pantalla, el botón para suprimir, un botón de idioma o un botón de operación muestra un tooltip que presenta el nombre del botón.

La calculadora puede realizar expresiones que tienen hasta tres operadores. Estas expresiones aparecen en la parte superior de la pantalla, mientras que sus soluciones aparecen en la parte inferior. Las expresiones tienen un largo máximo de 20 caracteres, y soluciones tienen un largo máximo de 15 caracteres.

## Las características y funcionalidad ##
### Avisos ###

Si una expresión contiene más de tres operadores, si el largo de la solución de una expresión excede cierto límite de caracteres, o si los usuarios intentan dividir entre cero, la calculadora mostrará un aviso correspondiente. En el primer caso, se aconseja a los usuarios que reduzcan el número de operadores, y hasta que no lo hagan, ninguna solución es mostrada.

En el segundo caso, la solución se muestra en el aviso en la forma estándar y en la forma exponencial. Se aconseja a los usuarios que anoten este número en otro lugar porque la pantalla de la calculadora estará limpiado una vez que el aviso está cerrado.

En el tercero caso, los usuarios son informados que han encontrado o han manipulado la respuesta a la pregunta final de la vida, el universo y todo lo demás: 42. Una vez que el aviso está cerrado, este número (o algo que es mayor o menor, dependiendo de si una operación adicional ha sido realizada) es mostrado, y todos los botones excepto el botón para limpiar la pantalla están desactivados.

### Botones ###

Los botones asociados con los dígitos de cero a nueve llenan la pantalla con sus respectivos valores. Porque las funciones de los otros no pueden inmediatamente ser visibles, cada una se ha incluido en la lista abajo:

* __limpiar la pantalla (CLR)__: Vuelve la pantalla a su estado inicial y activa los botones que han estado desactivados.
* __suprimir (SUPR)__: Elimina la entrada más reciente de la parte superior de la pantalla.
* __inglés (ING)__: Cambia el idioma usado en avisos, tooltips y en la pantalla a inglés.
* __español (ESP)__: Cambia el idioma usado en avisos, tooltips y en la pantalla a español.
* __el signo igual (=)__: Si es posible, evalúa la expresión en la pantalla y muestra la solución.
* __el punto decimal (.)__: Transforma un operando en una fracción decimal. A veces limitado o desabilitado en respuesta a la entrada del usuario o ciertas alertas siguentes.
* __adición (+)__: Habilita la calculadora de realizar adición.
* __sustracción (-)__: Habilita la calculadora de realizar sustracción.
* __multiplicación (*)__: Habilita la calculadora de realizar multiplicación.
* __división (/)__: Habilita la calculadora de realizar división.

## Restricciones y notas adicionales ##

Las soluciones a las expresiones pueden ser números negativos, pero los números negativos no pueden ser operandos. La única excepción a esto es si la expresión implica la suma de un operando positivo a un operando negativo, tal como `-1 + 20`. Si el orden es contrario, la calculadora devuelve `NaN` (no es un número).

Haciendo clic en el espacio entre los botones puede producir una cadena de caracteres `CLRINGESPSUPR123/456*789-.0=+` que extiende más allá de las dimensiones de la calculadora. Si esto ocurre, pulsando el botón para limpiar la pantalla restablecerá funcionalidad normal.
