document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      let output = document.querySelector('output');
      let firstNum = document.querySelector('#first-num').value;
      let secondNum = document.querySelector('#second-num').value;
      let operator = document.querySelector('#operator').value;
      output.innerHTML = eval(`${firstNum} ${operator} ${secondNum}`);
    });

    let errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));

    const consoleLogBtn = document.getElementById('consoleLogBtn');
    const consoleErrorBtn = document.getElementById('consoleErrorBtn');
    const consoleCountBtn = document.getElementById('consoleCountBtn');
    const consoleWarnBtn = document.getElementById('consoleWarnBtn');
    const consoleAssertBtn = document.getElementById('consoleAssertBtn');
    const consoleClearBtn = document.getElementById('consoleClearBtn');
    const consoleDirBtn = document.getElementById('consoleDirBtn');
    const consoleDirxmlBtn = document.getElementById('consoleDirxmlBtn');
    const consoleGroupStartBtn = document.getElementById('consoleGroupStartBtn');
    const consoleGroupEndBtn = document.getElementById('consoleGroupEndBtn');
    const consoleTableBtn = document.getElementById('consoleTableBtn');
    const startTimerBtn = document.getElementById('startTimerBtn');
    const endTimerBtn = document.getElementById('endTimerBtn');
    const consoleTraceBtn = document.getElementById('consoleTraceBtn');
    const triggerGlobalErrorBtn = document.getElementById('triggerGlobalErrorBtn');

    consoleLogBtn.addEventListener('click', () => {
        console.log('This is a console.log message!');
        console.log({ name: 'Jane Doe', occupation: 'Software Engineer', age: 28 });
    });

    consoleErrorBtn.addEventListener('click', () => {
        console.error('An error message from console.error!', new Error('Demo Error Object'));
    });

    consoleCountBtn.addEventListener('click', () => {
        console.count('myFunctionCall');
        console.count('anotherCounter');
        console.count('myFunctionCall');
    });

    consoleWarnBtn.addEventListener('click', () => {
        console.warn('This is a warning message from console.warn!');
    });

    consoleAssertBtn.addEventListener('click', () => {
        const value = 5;
        console.assert(value === 10, 'Assertion failed: value is not 10', value);
        console.assert(value === 5, 'Assertion passed: value is 5');
    });

    consoleClearBtn.addEventListener('click', () => {
        console.clear();
        console.log('Console should be clear now!');
    });

    const elementToInspect = document.getElementById('elementToInspect');
    consoleDirBtn.addEventListener('click', () => {
        console.dir(elementToInspect);
    });

    consoleDirxmlBtn.addEventListener('click', () => {
        console.dirxml(elementToInspect);
    });

    consoleGroupStartBtn.addEventListener('click', () => {
        console.group('My Custom Group');
        console.log('Message inside the group.');
        console.warn('Warning inside the group.');
        console.group('Nested Group');
        console.log('Message inside the nested group.');
        console.groupEnd();
    });

    consoleGroupEndBtn.addEventListener('click', () => {
        console.log('This message is outside any group.');
        console.groupEnd();
    });

    consoleTableBtn.addEventListener('click', () => {
        const users = [
            { id: 1, name: 'Alice', age: 25, city: 'New York' },
            { id: 2, name: 'Bob', age: 30, city: 'London' },
            { id: 3, name: 'Charlie', age: 35, city: 'Paris' }
        ];
        console.table(users);
    });

    startTimerBtn.addEventListener('click', () => {
        console.time('DataProcessing');
        let result = 0;
        for (let i = 0; i < 1000000; i++) {
            result += Math.sqrt(i);
        }
    });

    endTimerBtn.addEventListener('click', () => {
        console.timeEnd('DataProcessing');
    });

    consoleTraceBtn.addEventListener('click', () => {
        function funcA() {
            funcB();
        }

        function funcB() {
            funcC();
        }

        function funcC() {
            console.trace('Tracing call stack from funcC');
        }
        funcA();
    });

    const calculateBtn = document.getElementById('calculate');

    calculateBtn.addEventListener('click', () => {
        let output = document.querySelector('output');
        let firstNum = document.querySelector('#first-num').value;
        let secondNum = document.querySelector('#second-num').value;
        let operator = document.querySelector('#operator').value;

        try {
            if (operator === '/' && parseFloat(secondNum) === 0) {
                throw new Error('Division by zero is not allowed!');
            }
            let result;
            switch (operator) {
                case '+':
                    result = parseFloat(firstNum) + parseFloat(secondNum);
                    break;
                case '-':
                    result = parseFloat(firstNum) - parseFloat(secondNum);
                    break;
                case '*':
                    result = parseFloat(firstNum) * parseFloat(secondNum);
                    break;
                case '/':
                    result = parseFloat(firstNum) / parseFloat(secondNum);
                    break;
                default:
                    throw new Error('Invalid operator provided.');
            }
            if (isNaN(result)) {
                throw new Error('Invalid number input.');
            }
            output.innerHTML = result;
        } catch (error) {
            console.error('Calculator Error Caught:', error.message);
            output.innerHTML = `Error: ${error.message}`;
            try {
                const missingElement = document.getElementById('definitely-not-here');
                missingElement.textContent = 'This will never happen';
            } catch (domError) {
                console.error('DOM Error in inner try/catch:', domError.message);
            }
        } finally {
            console.log('Calculator operation attempted, try/catch block finished.');
        }
    });

    class DataValidationError extends Error {
        constructor(message, dataField) {
            super(message);
            this.name = 'DataValidationError';
            this.dataField = dataField;
        }
    }

    const throwCustomErrorBtn = document.createElement('button');
    throwCustomErrorBtn.textContent = 'Throw Custom Error';
    throwCustomErrorBtn.id = 'throwCustomErrorBtn';
    document.getElementById('error-btns').appendChild(throwCustomErrorBtn);

    throwCustomErrorBtn.addEventListener('click', () => {
        const userData = {
            username: '',
            email: 'test@example.com'
        };

        try {
            if (!userData.username) {
                throw new DataValidationError('Username cannot be empty.', 'username');
            }
            if (!userData.email.includes('@')) {
                throw new DataValidationError('Invalid email format.', 'email');
            }
            console.log('User data is valid:', userData);
        } catch (error) {
            if (error instanceof DataValidationError) {
                console.error(`Custom Error Caught: ${error.name} - ${error.message} (Field: ${error.dataField})`);
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    });

    window.onerror = function(message, source, lineno, colno, error) {
        console.error('------------------------------------------');
        console.error('GLOBAL ERROR CAUGHT (window.onerror):');
        console.error('Message:', message);
        console.error('Source (URL):', source);
        console.error('Line Number:', lineno);
        console.error('Column Number:', colno);
        console.error('Error Object:', error);
        console.error('------------------------------------------');
        return true;
    };

    triggerGlobalErrorBtn.addEventListener('click', () => {
        nonExistentFunctionCall();
    });

    // Manual test for TrackJS (can be removed after verification)
    TrackJS.track('Manual Test Error: Testing TrackJS from script.js!');
});
