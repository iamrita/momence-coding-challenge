import { useQuery } from "react-query";
import CurrencyExchange from "./CurrencyExchange";

let arr = [];

function CurrencyList() {
  const { isLoading, isError, data, error } = useQuery("currency", fetchData);
  let currencies = [];
  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (isError) {
    return <div>Error..</div>;
  }
  arr = data.split("\n");
  for (let i = 2; i < 33; i++) {
    const parsedArray = arr[i].split("|");
    let currencyFields = {
      country: parsedArray[0], // Australia
      currency: parsedArray[1], // dollar
      amount: parseInt(parsedArray[2]), // 1
      code: parsedArray[3], // AUD
      rate: parseFloat(parsedArray[4]), // 14.436
    };
    currencies.push(currencyFields);
  }

  let options = []
  for (let i = 0; i < currencies.length; i++) {
    options.push({value: currencies[i].country, label: currencies[i].country})
  }
  return (
    <div>
      {currencies.map((c) => (
        <li key={c.country}>{c.country}</li>
      ))}
      <CurrencyExchange options={options} />
    </div>
  );
}

const fetchData = async () => {
  // workaround: keep original url here and use a browser with cors disabled
  const res = await fetch(
    "/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"
  ); // add proxy in the package.json
  return res.text();
};

export default CurrencyList;
