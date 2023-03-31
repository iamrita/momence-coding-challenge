import {useState, React} from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "blue", label: "Blue" },
  { value: "red", label: "Red" },
];

function CurrencyExchange(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [currAmount, setCurrAmount] = useState("")
  const [finalAmount, setFinalAmount] = useState("")


  function calculate(currObj) {
    console.log(currObj)
    console.log(props.options)
    setFinalAmount(String(100/(parseFloat(currObj.amt))))

}
  return (
    <div>
      <Select
        value={selectedOption}
        onChange={setSelectedOption}
        options={props.options}
      />
       <label>
        Text input: <input value={currAmount} onChange={(e) => setCurrAmount(e.target.value)} name="myInput" />
      </label>
      <button onClick={(e) => calculate({country: selectedOption.value, amt: currAmount})}>Go</button>
      <div>{finalAmount}</div>
    </div>
  );
}

export default CurrencyExchange;
