const display = document.getElementById('display');
    let currentInput = '';
    let resetNext = false;

    function appendNumber(num) {
      if (resetNext) {
        currentInput = '';
        resetNext = false;
      }
      currentInput += num;
      updateDisplay();
    }

    function appendOperator(op) {
      if (currentInput === '') return;
      const lastChar = currentInput[currentInput.length - 1];
      if ("+-*/%".includes(lastChar)) {
        currentInput = currentInput.slice(0, -1);
      }
      currentInput += op;
      updateDisplay();
    }

    function clearDisplay() {
      currentInput = '';
      updateDisplay('0');
    }

    function deleteLast() {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput || '0');
    }

    function toggleSign() {
      if (currentInput === '') return;
      try {
        let value = eval(currentInput);
        value = -value;
        currentInput = value.toString();
        updateDisplay();
      } catch {
        updateDisplay('Error');
        currentInput = '';
      }
    }

    function calculate() {
      try {
        let expression = currentInput.replace(/%/g, "/100");
        let result = eval(expression);
        currentInput = result.toString();
        updateDisplay();
        resetNext = true;
      } catch {
        updateDisplay('Error');
        currentInput = '';
      }
    }

    function updateDisplay(value = currentInput) {
      display.textContent = value;
    }

    // Keyboard support
    document.addEventListener("keydown", (e) => {
      const key = e.key;
      if (!isNaN(key) || key === '.') appendNumber(key);
      else if ("+-*/%".includes(key)) appendOperator(key);
      else if (key === 'Enter') calculate();
      else if (key === 'Backspace') deleteLast();
      else if (key.toLowerCase() === 'c') clearDisplay();
    });