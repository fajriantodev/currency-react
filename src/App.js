import { useEffect, useState } from "react";

function App() {
  const [currency, setCurrency] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getCurrency = async () => {
    try {
      const apiKey = process.env.REACT_APP_CURRENCY_FREAKS_API_KEY;
      const res = await fetch(
        `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&symbols=CAD,IDR,JPY,CHF,EUR,GBP&base=USD`,
      );

      const data = await res.json();
      setCurrency(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrency();
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-white">
      <table className="table-fixed text-center text-xl text-white">
        <thead className="text-orange-500">
          <tr className="h-10">
            <th className="w-36">Currency</th>
            <th className="w-36">We Buy</th>
            <th className="w-36">Exchange Rate</th>
            <th className="w-36">We Sell</th>
          </tr>
        </thead>
        <tbody className="text-gray-900">
          {isLoading ? (
            <tr className="h-60">
              <td colSpan={4}>
                <div className="flex justify-center">
                  <LoadingSpinner />
                </div>
              </td>
            </tr>
          ) : (
            Object.keys(currency.rates).map((item, index) => (
              <tr key={index} className="h-10">
                <td>{item}</td>
                <td>{Number((105 / 100) * currency.rates[item]).toFixed(4)}</td>
                <td>{Number(currency.rates[item]).toFixed(4)}</td>
                <td>{Number((95 / 100) * currency.rates[item]).toFixed(4)}</td>
              </tr>
            ))
          )}
        </tbody>
        )
      </table>

      <small className="text-center text-gray-500">
        Rates are based from 1 USD
        <br />
        This application uses API from https://currencyfreaks.com.
      </small>
    </div>
  );
}

const LoadingSpinner = () => (
  <svg
    className="h-7 w-7 animate-spin text-orange-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx={12}
      cy={12}
      r={10}
      stroke="currentColor"
      strokeWidth={4}
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export default App;
