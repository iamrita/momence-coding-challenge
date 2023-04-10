import "./App.css";
import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import CurrencyList from "./components/CurrencyList";
const queryClient = new QueryClient();

function App() {
  const [exchange, showExchange] = useState(false);
  useEffect(() => {
    const handleKeyDown = async () => {
      showExchange(true);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown); // avoid memory leaks
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
        <div className="title">
          <h1>Welcome!</h1>
          <p>
            So I heard you're planning a trip abroad. Exciting! This is a
            website for <b>Czech Currency Exchange</b>. Take a look at the
            information below, to check out what the exchange rates are for
            various countries. Feel free to use the currency calculator below
            for more refined searching.
          </p>
          <p>Press any key to begin.</p>
        </div>
        {exchange ? <CurrencyList></CurrencyList> : <></>}
    </QueryClientProvider>
  );
}

export default App;
