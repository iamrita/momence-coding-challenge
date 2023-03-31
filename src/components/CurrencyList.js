import { QueryClient, QueryClientProvider, useQuery } from "react-query";


function CurrencyList() {
  let arr = []
  const { isLoading, isError, data, error } = useQuery("currency", fetchData);
  console.log(data);
  if (!isLoading && !isError) {
    arr = data.split("\n")
  }
  console.log(arr)
  //const arr = data.split("\n")

  return arr.map((c) => <li key={c}>{c}</li>);
}

const fetchData = async () => {
    // workaround: keep original url here and use a browser with cors disabled
    const res = await fetch(
      "/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"
    );
    return res.text();
  };

  export default CurrencyList
