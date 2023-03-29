import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";


const fetchData = async() => {
  const res = await fetch("https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt")
  console.log(res.text)
  return res.text
}
function App() {
  const [exchange, showExchange] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      showExchange(true);
      const data = fetchData()
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown); // avoid memory leaks 
    };
  }, []);

  return (
    <div className="App">
      <div className="title">
        <h1>Welcome!</h1>
        <p>
          So I heard you're planning a trip to Prague. Exciting! This is a
          website for <b>Czech Currency Exchange</b>. Take a look at the
          information below, to check out what the exchange rates are for
          various countries. Feel free to use the currency calculator below for
          more refined searching.
        </p>
        <p>Press any key to begin.</p>
      </div>
      {exchange ? <div className="title"> Exchange </div> : <></>}
    </div>
  );
}

export default App;
