import React from 'react'
import Select from 'react-select'


const options = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'blue', label: 'Blue'},
    {value: 'red', label: 'Red'}
]
function CurrencyExchange() {
    return <div>
    Currency Exchange
    <Select options={options}/>
    
    </div>
}

export default CurrencyExchange