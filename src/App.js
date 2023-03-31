import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient()

function CurrencyList() {
  const { isLoading, isError, data, error } = useQuery("currency", fetchData);
  console.log(data)

  return (
    <div>
      {data}
    </div>
  );
}
const fetchData = async () => {
  // workaround: keep original url here and use a browser with cors disabled
  const res = await fetch(
    "/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"
  );
  return res.text();
  // const currencyArray = body.split("\n");
  // console.log(currencyArray)
  // return currencyArray;
};
function App() {
  const [exchange, showExchange] = useState(false);


  useEffect(() => {
    const handleKeyDown = async (event) => {
      showExchange(true);
      fetchData()
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown); // avoid memory leaks
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div className="title">
          <h1>Welcome!</h1>
          <p>
            So I heard you're planning a trip to Prague. Exciting! This is a
            website for <b>Czech Currency Exchange</b>. Take a look at the
            information below, to check out what the exchange rates are for
            various countries. Feel free to use the currency calculator below
            for more refined searching.
          </p>
          <p>Press any key to begin.</p>
        </div>
        {exchange ? <CurrencyList></CurrencyList>: <></>}
      </div>
    </QueryClientProvider>
  );
}

export default App;
