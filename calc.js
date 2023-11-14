
document.addEventListener('DOMContentLoaded', function () {
    // Get display element
    const display = document.getElementsByName('display')[0];

    // Add event listeners to number and operator buttons
    const buttons = document.querySelectorAll('input[type="button"]' );
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            handleButtonClick(this.value);
        });
    });

   

    // Function to handle button clicks
    function handleButtonClick(value) {
        switch (value) {
            case '=':
                calculate();
                break;
            case 'AC':
                clearDisplay();
                break;
            case 'X':
                backspace();
                break;
            default:
                appendValue(value);
        }
    }


    // Function to append value to the display
    function appendValue(value) {
        display.value += value;
    }

    // Function to clear the display
    function clearDisplay() {
        display.value = '';
    }


    // Function to handle backspace
    function backspace() {
        display.value = display.value.slice(0, -1);
    }

  

    // Function to perform calculations
    function calculate() {
        try {
            let expression = display.value;
            expression = expression.replace(/%/g, '/100');

            // Use regular expression to check for invalid characters
            if (/[^0-9+\-*/%().]/.test(expression)) {
                throw new Error('Invalid expression');
            }

            let result = Function('"use strict";return (' + expression + ')')();

            if (result !== undefined && result !== null && !isNaN(result) && result !== Infinity) {
                display.value = result;
            } else {
                throw new Error('Invalid calculation');
            }
        } catch (error) {
            display.value = 'Error';
        }

    }

});



// --------------------------------------------------------------
