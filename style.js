const ansDisplay = document.querySelector('.ans');
        const logList = document.querySelector('.log-list');

        let currentInput = '';
        let currentOperator = '';
        let previousResult = null; // Store the previous result
        let logEntries = [];

        function handleButtonClick(buttonText) {
            if (!isNaN(buttonText) || buttonText === '.') {
                currentInput += buttonText;
                ansDisplay.textContent = currentInput;
            } else if (buttonText === 'Clear') {
                clearDisplay();
            } else if (isOperator(buttonText)) {
                if (currentInput !== '') {
                    calculateResult();
                    currentOperator = buttonText;
                }
            } else if (buttonText === '=') {
                calculateResult();
            } else if (buttonText === '%') {
                handlePercentage();
            }
        }

        function clearDisplay() {
            currentInput = '';
            currentOperator = '';
            ansDisplay.textContent = '';
        }

        function isOperator(text) {
            return text === '+' || text === '-' || text === '*' || text === '/';
        }

        function calculateResult() {
            if (currentInput !== '') {
                const inputValue = parseFloat(currentInput);
                if (previousResult !== null && currentOperator !== '') {
                    const result = calculate(previousResult, currentOperator, inputValue);
                    ansDisplay.textContent = result;
                    logOperation(previousResult, currentOperator, inputValue, result);
                    previousResult = result;
                } else {
                    previousResult = inputValue;
                }
                currentInput = '';
                currentOperator = '';
            }
        }

        function toggleSign() {
            if (currentInput !== '') {
                currentInput = (parseFloat(currentInput) * -1).toString();
                ansDisplay.textContent = currentInput;
            }
        }

        function calculate(num1, operator, num2) {
            switch (operator) {
                case '+':
                    return num1 + num2;
                case '-':
                    return num1 - num2;
                case '*':
                    return num1 * num2;
                case '/':
                    return num1 / num2;
                default:
                    return num2;
            }
        }

        function logOperation(num1, operator, num2, result) {
            const operation = `${num1} ${operator} ${num2} = ${result}`;
            logEntries.push(operation);
            refreshLogDisplay();
        }

        function deleteLogEntry(index) {
            logEntries.splice(index, 1);
            refreshLogDisplay();
        }

        function refreshLogDisplay() {
            logList.innerHTML = '';
            logEntries.forEach((entry, index) => {
                const logEntryElement = document.createElement('li');
                logEntryElement.className = 'log-entry';
                logEntryElement.textContent = entry;

                const deleteButton = document.createElement('span');
                deleteButton.className = 'log-entry-delete';
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteLogEntry(index));

                logEntryElement.appendChild(deleteButton);
                logList.appendChild(logEntryElement);
            });
        }

        function selectLogEntry(index) {
            const selectedEntry = logEntries[index];
            const selectedOperation = selectedEntry.split('=')[0].trim();
            ansDisplay.textContent = selectedOperation;
            currentInput = selectedOperation;
        }

        function handlePercentage() {
            if (currentInput !== '') {
                const inputValue = parseFloat(currentInput);
                const percentValue = inputValue / 100;
                ansDisplay.textContent = percentValue;
                currentInput = percentValue.toString();
            }
        }
        function deleteLastCharacter() {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            ansDisplay.textContent = currentInput;
        }
    }
    document.addEventListener("DOMContentLoaded", function() {
        const inputElement = document.getElementById("input");
        const outputElement = document.getElementById("output");
        const buttonsContainer = document.getElementById("buttons");
        const logList = document.getElementById("log-list");
    
        let currentInput = "";
        let currentOperator = "";
        let previousResult = null;
        let logEntries = [];
    
        buttonsContainer.addEventListener("click", handleButtonClick);
        document.addEventListener("keydown", handleKeyboardInput);
    
        function handleButtonClick(event) {
            const buttonText = event.target.textContent;
            handleInput(buttonText);
        }
    
        function handleKeyboardInput(event) {
            const key = event.key;
            if (key.match(/[0-9.%/*\-+=]|Backspace|Enter/)) {
                if (key === "Enter") {
                    handleInput("=");
                } else if (key === "Backspace") {
                    handleInput("X");
                } else {
                    handleInput(key);
                }
            }
        }
    
        function handleInput(input) {
            if (input.match(/[0-9.%]/)) {
                currentInput += input;
                inputElement.textContent = currentInput;
            } else if (input === ".") {
                if (!currentInput.includes(".")) {
                    currentInput += input;
                    inputElement.textContent = currentInput;
                }
            } else if (input === "Clear") {
                clearDisplay();
            } else if (input === "+" || input === "-" || input === "*" || input === "/") {
                handleOperator(input);
            } else if (input === "=") {
                calculateResult();
            } else if (input === "+/-") {
                toggleSign();
            }
        }
    
        function clearDisplay() {
            currentInput = "";
            currentOperator = "";
            inputElement.textContent = "";
            outputElement.textContent = "";
        }
    
        function handleOperator(operator) {
            if (currentInput !== "") {
                calculateResult();
                currentOperator = operator;
            }
        }
    
        function calculateResult() {
            if (currentInput !== "" && currentOperator !== "") {
                const inputValue = parseFloat(currentInput);
                if (previousResult !== null) {
                    const result = calculate(previousResult, currentOperator, inputValue);
                    logOperation(previousResult, currentOperator, inputValue, result);
                    outputElement.textContent = result;
                    previousResult = result;
                } else {
                    previousResult = inputValue;
                }
                currentInput = "";
                currentOperator = "";
                inputElement.textContent = "";
            }
        }
    
        function toggleSign() {
            if (currentInput !== "") {
                currentInput = (parseFloat(currentInput) * -1).toString();
                inputElement.textContent = currentInput;
            }
        }
    
        function calculate(num1, operator, num2) {
            switch (operator) {
                case "+":
                    return num1 + num2;
                case "-":
                    return num1 - num2;
                case "*":
                    return num1 * num2;
                case "/":
                    return num1 / num2;
                default:
                    return num2;
            }
        }
    
        function logOperation(num1, operator, num2, result) {
            const operation = `${num1} ${operator} ${num2} = ${result}`;
            logEntries.push(operation);
            refreshLogDisplay();
        }
    
        function refreshLogDisplay() {
            logList.innerHTML = "";
            logEntries.forEach((entry) => {
                const logEntryElement = document.createElement("li");
                logEntryElement.textContent = entry;
                logList.appendChild(logEntryElement);
            });
        }
    });
    