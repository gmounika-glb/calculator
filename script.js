document.addEventListener('DOMContentLoaded', () => {
  // Get the display element
  const display = document.getElementById('display');
  // Get all calculator buttons
  const darkButton = document.getElementById('dark');
  const buttons = document.querySelectorAll('.button');
  const historyButton = document.getElementById('history');
  const container = document.querySelector('.container');
  // Store the current input string
  let currentInput = '';
  // Array to store calculation history
  let history = [];
  // Limit input to 25 digits
  const MAX_DIGITS = 25;

  // Step 1: Highlight button on keypress (for UI feedback)
  const highlightButton = key => {
    buttons.forEach(button => {
      if (button.dataset.value === key || button.innerText === key) {
        button.classList.add('active');
        // Remove highlight after 200ms
        setTimeout(() => button.classList.remove('active'), 200);
      }
    });
  };

  // Step 2: Update the display with current input
  const updateDisplay = value => {
    // If empty, show "0"
    display.innerText = value || '0';
  };

  // Step 3: Handle button click input events
  buttons.forEach(button => {
    button.addEventListener('click', () =>
      handleInput(button.dataset.value || button.innerText)
    );
  });

  // Step 4: Handle keyboard input events
  document.addEventListener('keydown', event => {
    const key = event.key;
    // Evaluate on Enter
    if (key === 'Enter') handleInput('=');
    // Backspace behavior
    else if (key === 'Backspace') handleInput('Backspace');
    // Clear input on Escape
    else if (key === 'Escape') handleInput('Escape');
    // Handle number and operator keys
    else if (/^[0-9+\-*/.=]$/.test(key)) handleInput(key);
    // Highlight the pressed button
    highlightButton(key);
  });

  // Step 5: Main function to handle input
  const handleInput = input => {
    if (input === 'Escape') {
      currentInput = '';
      // Clear the current input
    } else if (input === 'Backspace') {
      currentInput = currentInput.slice(0, -1);
      // Remove the last character (Backspace)
    } else if (['+', '-', '*', '/'].includes(input)) {
      // Prevent consecutive operators and add the current operator
      if (
        currentInput &&
        !['+', '-', '*', '/'].includes(currentInput.slice(-1))
      ) {
        currentInput += input;
      }
    } else if (input === '.') {
      // Prevent multiple decimal points in the same segment
      const segments = currentInput.split(/[\+\-\*\/]/);
      if (!segments[segments.length - 1].includes('.')) {
        currentInput += input;
      }
    } else if (input === '=') {
      // Calculate resultF
      try {
        // Fix for negative number handling in expressions like 2*-3
        if (isValidExpression(currentInput)) {
          const result = eval(currentInput).toString();

          // Check for Infinity or invalid results
          if (
            result === 'Infinity' ||
            result === '-Infinity' ||
            result === 'NaN'
          ) {
            currentInput = 'Cal Error';
          } else {
            // Store both input (expression) and output (result) in history
            history.push({input: currentInput, output: result});
            currentInput = result; // After calculation, set input to the result
          }
          // Update the history display
        } else {
          currentInput = 'Cal Error';
        }
      } catch {
        currentInput = 'Cal Error'; // If there’s an error in the calculation, show "Error"
      }
    } else {
      // Numbers: add input while respecting the digit limit
      if (currentInput.length < MAX_DIGITS) {
        currentInput += input;
      }
    }

    updateDisplay(currentInput); // Update the display after every input
  };

  // Step 6: Validate the expression before evaluating
  const isValidExpression = expression => {
    // Ensure the expression only contains valid characters and doesn’t end with an operator
    const validChars = /^[0-9+\-*/().\s]*$/;
    return validChars.test(expression) && !/[+\-*/]$/.test(expression);
  };

  // History section display function
  function updateHistory() {
    const historyList = document.createElement('div');
    historyList.classList.add('history-list');

    // Loop through the history and display both input and output
    history.forEach(item => {
      const historyItem = document.createElement('div');
      historyItem.classList.add('history-item');

      // Format the history to show input and output together in the format "input=output"
      historyItem.innerHTML = `<strong>${item.input}</strong> = <span>${item.output}</span>`;

      historyList.appendChild(historyItem);
    });

    const historyContainer = document.createElement('div');
    historyContainer.classList.add('history-container');

    // Create and add a close button to history container
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-btn');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
      historyContainer.remove(); // Close the history container
    });

    historyContainer.appendChild(closeButton);
    historyContainer.appendChild(historyList);

    // Append to the container, or replace the existing history list
    const existingHistoryContainer =
      document.querySelector('.history-container');
    if (existingHistoryContainer) {
      existingHistoryContainer.remove(); // Remove previous history list
    }
    container.appendChild(historyContainer);
  }

  // History Button Click Event
  historyButton.addEventListener('click', () => {
    if (history.length === 0) {
      alert('No history available');
    } else {
      updateHistory();
    }
  });

  // Dark Mode Toggle
  darkButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Toggle the moon/sun icon
    if (document.body.classList.contains('dark-mode')) {
      // Change to sun icon
      darkButton.innerHTML = "<i class='bx bx-sun'></i>";
    } else {
      // Change to moon icon
      darkButton.innerHTML = "<i class='bx bx-moon'></i>";
    }
  });
});
