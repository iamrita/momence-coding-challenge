import { useQuery } from "react-query";
import CurrencyExchange from "./CurrencyExchange";
import "../App.css";

function CurrencyList() {
  const { isLoading, isError, data, error } = useQuery("currency", fetchData);
  let currencies = [];
  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (isError) {
    console.log(error);
    return <div>Error..</div>;
  }
  let arr = data.split("\n");
  for (let i = 2; i < 33; i++) {
    // go from the first country to last country
    const parsedArray = arr[i].split("|");
    const currencyFields = {
      country: parsedArray[0], // Australia
      currency: parsedArray[1], // dollar
      amount: parseInt(parsedArray[2]), // 1
      code: parsedArray[3], // AUD
      rate: parseFloat(parsedArray[4]), // 14.436
    };
    currencies.push(currencyFields);
  }

  return (
    <div>
      <div className="title">
        <table>
          <thead>
            <tr>
              <th className="table">Country</th>
              <th className="table">Currency</th>
              <th className="table">Amount</th>
              <th className="table">Code</th>
              <th className="table">Rate</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((item) => (
              <tr key={item.code}>
                <td className="table">{item.country}</td>
                <td className="table">{item.currency}</td>
                <td className="table">{item.amount}</td>
                <td className="table">{item.code}</td>
                <td className="table">{item.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CurrencyExchange currencies={currencies} />
    </div>
  );
}

const fetchData = async () => {
  const res = await fetch(
    "/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"
  ); // added proxy in the package.json
  return res.text();
};

export default CurrencyList;
