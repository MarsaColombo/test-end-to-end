import "./App.css";
import { useCallback, useState } from "react";

const sum = (a: number, b: number) => a + b;
const multiplication = (a: number, b: number) => a * b;
const soustraction = (a: number, b: number) => a - b;

interface IOperation {
  func: (a: number, b: number) => number;
  symbol: string;
}

type OperationObject = {
  [key in Operation]: IOperation;
};

type Operation = "sum" | "soustraction" | "multiplication";

const operations: OperationObject = {
  sum: { func: sum, symbol: "+" },
  soustraction: { func: soustraction, symbol: "-" },
  multiplication: { func: multiplication, symbol: "x" },
};

function App() {
  const [currentValue, updateCurrent] = useState<number | undefined>(undefined);
  const [chiffre, updateChiffre] = useState<number | undefined>(undefined);
  const [operation, updateOp] = useState<Operation | undefined>(undefined);
  const [lastResult, setLastResult] = useState<number | undefined>(undefined);

  const handleNumClick = useCallback(
    (num: number) => {
      const myNum = num;
      if (operation) {
        if (chiffre) {
          updateChiffre(chiffre * 10 + myNum);
        } else {
          updateChiffre(myNum);
        }
      } else {
        if (currentValue) {
          updateCurrent(currentValue * 10 + myNum);
        } else {
          updateCurrent(myNum);
        }
      }
      setLastResult(undefined);
    },
    [currentValue, operation, chiffre]
  );

  const handleOperation = (newOperation: Operation) => {
    if (currentValue !== undefined && chiffre !== undefined && operation) {

      const result = operations[operation].func(currentValue, chiffre);
      updateCurrent(result);
      updateChiffre(undefined);
      setLastResult(result);
    } else if (lastResult !== undefined) {
      updateCurrent(lastResult);
      setLastResult(undefined);
    }
    updateOp(newOperation);
  };

  const handleEqual = () => {
    if (currentValue !== undefined && chiffre !== undefined && operation) {
      const result = operations[operation].func(currentValue, chiffre);
      updateCurrent(result);
      updateChiffre(undefined);
      updateOp(undefined);
      setLastResult(result);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="screen">
          {lastResult !== undefined 
            ? `${lastResult}`
            : `${currentValue || 0} ${
                currentValue && operation ? operations[operation].symbol : ""
              } ${
                currentValue && operation && (chiffre || chiffre === 0)
                  ? chiffre
                  : ""
              }`
          }
        </div>
        <div>
          {Object.keys(operations).map((opName) => (
            <button onClick={() => handleOperation(opName as Operation)}>
              {opName}
            </button>
          ))}
        </div>
        <div className="numbers">
          {new Array(10)
            .fill("")
            .map((e, i) => i)
            .map((e) => (
              <button id={e.toString()} onClick={() => handleNumClick(e)}>
                {e}
              </button>
            ))}
        </div>
        <button
          className="btnEqual"
          style={{ color: "red" }}
          onClick={handleEqual}
        >
          =
        </button>
        <button
          className="btnClear"
          onClick={() => {
            updateCurrent(undefined);
            updateChiffre(undefined);
            updateOp(undefined);
            setLastResult(undefined);
          }}
        >
          C
        </button>
      </header>
    </div>
  );
}

export default App;