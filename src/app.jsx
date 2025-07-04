import { useState } from 'preact/hooks'
import './app.css'

export function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  return (
    <div class="calculator">
      <h1>Calculator</h1>
      <div class="calculator-body">
        <div class="display">
          {display}
        </div>
        <div class="buttons">
          <button class="btn btn-clear" onClick={clear}>C</button>
          <button class="btn btn-operation" onClick={() => performOperation('÷')}>÷</button>
          <button class="btn btn-operation" onClick={() => performOperation('×')}>×</button>
          <button class="btn btn-operation" onClick={() => performOperation('-')}>-</button>
          
          <button class="btn" onClick={() => inputNumber(7)}>7</button>
          <button class="btn" onClick={() => inputNumber(8)}>8</button>
          <button class="btn" onClick={() => inputNumber(9)}>9</button>
          <button class="btn btn-operation btn-plus" onClick={() => performOperation('+')}>+</button>
          
          <button class="btn" onClick={() => inputNumber(4)}>4</button>
          <button class="btn" onClick={() => inputNumber(5)}>5</button>
          <button class="btn" onClick={() => inputNumber(6)}>6</button>
          <button class="btn btn-equals btn-plus-span" onClick={handleEquals}>=</button>
          
          <button class="btn" onClick={() => inputNumber(1)}>1</button>
          <button class="btn" onClick={() => inputNumber(2)}>2</button>
          <button class="btn" onClick={() => inputNumber(3)}>3</button>
          
          <button class="btn btn-zero" onClick={() => inputNumber(0)}>0</button>
          <button class="btn" onClick={inputDecimal}>.</button>
        </div>
      </div>
    </div>
  )
}
