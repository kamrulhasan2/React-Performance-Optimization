import React, { useState } from 'react';

const calculateExpensiveValue = (n) => {
    console.time("Expensive Calculation");
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += i;
    }
    console.timeEnd("Expensive Calculation");
    return result;
};

//This component performs an expensive calculation on each render
// which can lead to performance issues.

const CalculatorComponent = () => {
    const [counter, setCounter] = useState(0);
    const N = 900000000; 

    return (
        <div>
            <h1>Counter: {counter}</h1>
            <button onClick={() => setCounter(c => c + 1)}>
                Increment Counter
            </button>
            <p>Calculated Value: {calculateExpensiveValue(N)}</p>
        </div>
    );
};

export default CalculatorComponent;