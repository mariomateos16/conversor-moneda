import React, { useEffect, useState } from 'react';
import './ConversorApp.css'

const ConversorApp = () => {

  const [symbol, setSymbol] = useState([]);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("EUR");
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    resetConversion();
  }, [currency1, currency2]);

  const fetchCurrencies = () => {
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/currencies`)
      .then(resp => resp.json())
      .then((data) => {
        setSymbol(Object.keys(data));
      });
  };

  const resetConversion = () => {
    setAmount("");
    setResult("");
  };

  const handleConvert = () => {
    if (currency1 !== currency2 && amount !== (null || 0)) {
      const host = 'api.frankfurter.app';
      fetch(`https://${host}/latest?amount=${amount}&from=${currency1}&to=${currency2}`)
        .then(resp => resp.json())
        .then((data) => {
          setResult(data.rates[currency2]);
        });
    }
    console.log(result);
  };

  const handleInvert = () => {
    const actualCurrency1 = currency1;
    const actualCurrency2 = currency2;
    setCurrency1(actualCurrency2);
    setCurrency2(actualCurrency1);
  };

    return(
        <div className='ConversorContainer'>
            <div><h2>Conversión Moneda</h2></div>
                <div className='CurrencyInput'>
                    <label htmlFor="currency1">De:</label>
                    <select className='form-select' id="currency1" value={currency1} onChange={(e) => setCurrency1(e.target.value)}>
                        {symbol.map((item) => (<option key={item}>{item}</option>))}
                    </select>
                    <label htmlFor="currency2">A:</label>
                    <select className='form-select' id="currency2" value={currency2} onChange={(e) => setCurrency2(e.target.value)}>
                        {symbol.map((item) => (<option key={item}>{item}</option>))}
                    </select>
                </div>
                <div className='resultContainer'>
                    <div className="input-group">
                        <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                        <span className="input-group-text">{currency2 + " = " + " " + result } </span>
                    </div>
                </div>

                <div className='btn_container'>
                    <button className='btn btn-primary mb-2 mx-2' onClick={handleConvert}>Convertir</button>
                    <button className='btn btn-primary mb-2 mx-2' onClick={handleInvert}>Reiniciar</button>
                </div>
            </div>
    )
}

export { ConversorApp }