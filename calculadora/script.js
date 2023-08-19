// Definición de la función que muestra el resultado en la pantalla
function showResult(e) {
  e.preventDefault(); // Evita el comportamiento predeterminado del evento
  console.log(getResult()); // Muestra el resultado en la consola
  display.innerText = getResult(); // Muestra el resultado en la pantalla
}

// Obtención de la referencia al elemento con la clase "display"
const display = document.querySelector(".display");

// Obtención de la referencia al elemento "select" (lista desplegable)
const select = document.querySelector("select");

// Obtención de la referencia al primer elemento de entrada en el formulario
const input1 = document.querySelector("form input:first-child");

// Obtención de la referencia al segundo elemento de entrada en el formulario
const input2 = document.querySelector("form input:last-child");

// Obtención de la referencia al formulario
const form = document.querySelector("form");

// Obtención de la referencia al botón de reinicio en el formulario
const resetButton = document.querySelector("form button:last-child");

// Función que calcula y devuelve el resultado
function getResult() {
  const firstNumber = +input1.value; // Obtención del primer número
  const secondNumber = +input2.value; // Obtención del segundo número
  const operator = select.value; // Obtención del operador seleccionado

  if (isNaN(firstNumber) || isNaN(secondNumber)) {
    // Comprobación de si los números son inválidos
    alert("error"); // Alerta de error si los números son inválidos
  } else {
    let result = calculator[operator](firstNumber, secondNumber); // Cálculo del resultado utilizando el operador seleccionado
    return result; // Devolución del resultado
  }
}

// Objeto que contiene funciones de cálculo para diferentes operaciones
const calculator = {
  addition: function (a, b) {
    return a + b;
  },
  subtraction: function (a, b) {
    return a - b;
  },
  division: function (a, b) {
    return a / b;
  },
  multiplication: function (a, b) {
    return a * b;
  },
};

// Agregar un oyente de eventos al formulario para mostrar el resultado
form.addEventListener("submit", showResult);

// Agregar un oyente de eventos al botón de reinicio para restablecer los valores
resetButton.addEventListener("click", () => {
  form.reset(); // Restablece los valores del formulario
  display.innerText = "0"; // Muestra "0" en la pantalla
});

/* Casos de Prueba:

Caso de prueba: Se ingresó "10 + 5" .

Resultado esperado: 15
Resultado obtenido: 15
Caso de prueba: Se ingresó "8 - 3" ".

Resultado esperado: 5
Resultado obtenido: 5
Caso de prueba: Se ingresó "4 * 6" .

Resultado esperado: 24
Resultado obtenido: 24
Caso de prueba: Se ingresó "10 / 2" .

Resultado esperado: 5
Resultado obtenido: 5 */
