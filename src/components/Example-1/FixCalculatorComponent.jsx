import React, { useMemo, useState } from 'react';

const calculateExpensiveValue = (n) => {
    console.time("Expensive Calculation");
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += i;
    }
    console.timeEnd("Expensive Calculation");
    return result;
};



const FixCalculatorComponent = () => {
    const [counter, setCounter] = useState(0);
    const N = 900000000; 

    const findValue = useMemo(()=>{
        return calculateExpensiveValue(N);
    },[N]);

    return (
        <div>
            <h1>Counter: {counter}</h1>
            <button onClick={() => setCounter(c => c + 1)}>
                Increment Counter
            </button>
            <p>Calculated Value: {findValue}</p>
        </div>
    );
};

export default FixCalculatorComponent;