
import './App.css';
import { useState ,useEffect} from 'react';
import axios from 'axios';
function App() {


  const [exchangeRates, setExchangeRates] = useState({}); //value in object form;
  const [amount, SetAmount] = useState(1);
  const [fromCurrency ,setFromCurrency] = useState('usd');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  // call the page on first refresh
  useEffect(() => {
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
  // somthing special:::
  
    axios.get(apiUrl)
    .then(response => {
      setExchangeRates(response.data.rates);
    })
    .catch(error => {
      console.error('Error fetching exchange rates:', error);
    });
  
  
  
  },[fromCurrency]);

  useEffect(() => {
    // Convert currency when 'amount', 'fromCurrency', or 'toCurrency' changes
    const conversionRate = exchangeRates[toCurrency];
    if (conversionRate) {
      const converted = amount * conversionRate;
      setConvertedAmount(converted.toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]); // things which is going to change;
 
  


 const handleChange = (e) => {

  // for destructre
  const {name,value} = e.target; // name  written in input field;
  switch(name)
  {
    case 'amount':
      SetAmount(value);
      break;

  
    case'fromCurrency':
    setFromCurrency(value);
    break;


    case 'toCurrency':
    setToCurrency(value);
    break;

      

      
  }
}

 

 



  return (
    <div className="Card">
     <img  className="img1" src={ require('./Images/pik5.png')}></img>
     <h1 className='text-6x1'> Currancy Converter</h1>
       
       <div className='currancy_exchange'>
         
         <div className='input_container'>   {/* first input*/}
          <lable className="input_label">Ammount:</lable>
          <input type="number" name="amount" className='input_field' value={amount}  onChange={handleChange}/>
          </div>

          <div className='input_container'>  {/* second input*/}
          <lable className="input_label">From Currancy:</lable>
          
          <select  id="cars" className='input_field' name="fromCurrency" value={fromCurrency}  onChange={handleChange}>
          {Object.keys(exchangeRates).map(currency => (
            <option key={currency} value={currency} id="A100">
              {currency}
            </option>
          ))}
          </select>

          </div>

          <div className='input_container'>  {/* third input*/}
          <lable className="input_label">To Currancy:</lable>
          <select id="cars"  className='input_field' name="toCurrency" value={toCurrency}  onChange={handleChange}>
          
          {Object.keys(exchangeRates).map(currency => (
            <option key={currency} value={currency} id="A100">
              {currency}
            </option>
          ))}
         
          </select>
          </div>

       </div>

      <br/>
       <div className='output'>
         
         <h2>Converted Ammount::<span className='amount'>{convertedAmount}</span></h2>
       </div>
 </div>
  );
}

export default App;
//<input type="number" name="amount" className='input_field' value="" />
