import react, { useEffect, useState } from 'react';

function QuantityInput({ onChange, defaultValue }) {
    const [value, setValue] = useState(defaultValue || 1)

    const increase = () => {
        if (value + 1 > 5) return
        setValue(pre => pre + 1)
    }

    const decrease = () => {
        if (value - 1 === 0) return
        setValue(pre => pre - 1)
    }

    useEffect(() => {
        onChange(value);
    }, [value])

    return (
        <div id="quantity">
            <button onClick={decrease}>-</button>
            {value}
            <button onClick={increase}>+</button>
        </div>
    )
}

export default QuantityInput;
