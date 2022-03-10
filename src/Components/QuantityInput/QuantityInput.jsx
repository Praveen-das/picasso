import React, { useState } from 'react';

function QuantityInput({ quantity, setQuantity, index }) {
    const [value, setValue] = useState(parseInt(quantity))

    const handleValue = (action) => {
        switch (action) {
            case 'increase':
                if (value + 1 > 5) return
                setValue(pre => pre + 1)
                setQuantity(pre => pre.map((o, i) => i === index ? (o = value + 1) : o))
                break;

            case 'decrease':
                if (value - 1 === 0) return
                setValue(pre => pre - 1)
                setQuantity(pre => pre.map((o, i) => i === index ? (o = value - 1) : o))
                break;

            default:
                break;
        }

    }

    return (
        <div id="quantity">
            <button onClick={() => handleValue('decrease')}>-</button>
            {value ? value : quantity}
            <button onClick={() => handleValue('increase')}>+</button>
        </div>
    )
}

export default QuantityInput;
