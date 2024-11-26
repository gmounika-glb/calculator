
# Test Cases for Calculator

Here are some common test cases to verify the functionality of the calculator:

## Basic Arithmetic

1. **Addition**:
   - Input: `2 + 3`
   - Expected Output: `5`

2. **Subtraction**:
   - Input: `7 - 4`
   - Expected Output: `3`

3. **Multiplication**:
   - Input: `6 * 8`
   - Expected Output: `48`

4. **Division**:
   - Input: `9 / 3`
   - Expected Output: `3`

## Special Cases

1. **Clear Button**:
   - Input: Enter `5 + 3` and press `C`.
   - Expected Output: The display should be empty.

2. **Division by Zero**:
   - Input: `10 / 0`
   - Expected Output: Display an error or infinity.

3. **Sequential Operations**:
   - Input: `2 + 3 * 4`
   - Expected Output: Ensure correct order of operations (`14`, not `20`).

4. **Chained Calculations**:
   - Input: `5 + 3 =`, followed by `* 2 =`.
   - Expected Output: `16`.

## keyboard access
1. **Clear display Button**:
   - Input: Enter `5 + 3` and press `delete` in keyboard.
   - Expected Output: The display should be empty.

2. **Backspace Button**:
   - Input: Enter `5 + 3` and press `Backspace` in keyboard.
   - Expected Output: The display should be like `5 +'.

3. **Equal Button**:
   - Input: Enter `5 + 3` and press `=` in keyboard.
   - Expected Output: The display should be like `8'.

4. **History Button**:
   - Clicking of 'h, H' in keyboard you can get history.

5. **Mode Button**:
   - Clicking of 'm, M' in keyboard you can get dark and light theme (mode button toggle).
   
5. **Close history Button**:
   - Clicking of 'Esc' M in keyboard you can close the history close button.

## Not repeating operators
   - Input: Enter `5 +-- 3` and it will take like this '5-3'.
   - Expected Output: The display should be empty.

## Dark and light theme
   - Input: onclick `moon` and it will toggle to the sun.
   - Expected Output: the display will be sun (light theme) style will appear.
---


