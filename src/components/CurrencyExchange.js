import { useState, React } from "react";
import Select from "react-select";
import "../styles/Currency.css";
import "../App.css";

function CurrencyExchange(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [currAmount, setCurrAmount] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [clicked, setClicked] = useState(false);

  let options = [];
  for (let i = 0; i < props.currencies.length; i++) {
    options.push({
      value: props.currencies[i].country,
      label: props.currencies[i].country,
    });
  } // convert options for dropdown menu

  function calculate(currObj) {
    setClicked(true);
    const country = currObj.country;
    const exchangeRate = props.currencies.find((c) => c.country === country);
    console.log(exchangeRate);
    let exchangeAmount = exchangeRate.amount;
    let rate = exchangeRate.rate;
    let floatAmt = parseFloat(currObj.amt);
    setFinalAmount(String((floatAmt * exchangeAmount) / rate));
  }

  return (
    <div className="title">
      <p><b>Country:</b></p>
      <Select
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
      <br></br>
      <label>
        <b>Enter amount in CZK:  </b>
        <input
          value={currAmount}
          onChange={(e) => setCurrAmount(e.target.value)}
          name="myInput"
        />
      </label>
      <br></br>
      <br></br>
      <button
        onClick={(e) =>
          calculate({ country: selectedOption.value, amt: currAmount })
        }
      >
        Convert
      </button>
      {clicked ? (
        <div>
          <br></br>
          Total in {selectedOption.value} is <b>{finalAmount}</b>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CurrencyExchange;
