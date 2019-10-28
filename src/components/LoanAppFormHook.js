import React, { useState, useEffect } from 'react';
import { addLoanApp } from '../actions/loanApps';
import { geocodeApiSearch } from '../services/geocoder';

export default function LoanAppFormHook() {
  const [results, setResults] = useState([]);
  const [name, setName] = useState('');
  const [mailingAddress, setMailingAddress] = useState('');
  const [annualIncome, setAnnualIncome] = useState(0);
  const [requestedLoanAmount = 100, setRequestedLoanAmount] = useState(0);

  useEffect(() => {
    mailingAddress && results && geocodeApiSearch(mailingAddress)
      .then(data => setResults(data));
  }, [mailingAddress, results]);

  const radioButtonAddressResults = mailingAddress && results.map((el, i) => {
    return (
      <li key={i}>
        <label htmlFor="address-result">
          <input type="radio" id="id"
            name="address-result"
            value={el.formatted_address}
            onChange={e => handleStreetAddressCheck(e.target.value)}
          />
          {el.formatted_address}
        </label>
      </li>
    );
  });

  const handleStreetAddressCheck = addr => {
    if(addr && addr.match(/^[0-9]*/g).toString().length === 0) {
      alert('Please use a valid street address.');
      addr = '';
    }
    setMailingAddress(addr);
  };
  // const goodPostalCodes = postalCodeResults && postalCodeResults.filter(el => el.match(/^97|^9[0-6]|^3[2-4]/gi));
  const correctStatesTrue = mailingAddress && (mailingAddress.includes('CA') || mailingAddress.includes('OR') || mailingAddress.includes('FL'));

  const clearInputs = () => {
    setName('');
    setMailingAddress('');
    setAnnualIncome(0);
    setRequestedLoanAmount(0);
  };

  const validateAndAddToFirebase = () => {
    const timestamp = new Date(Date.now()).toLocaleString();
    if(requestedLoanAmount < 5000) {
      alert('Sorry, your application has been declined. Loan amount over $5,000 required.');
      clearInputs();
    } else if(requestedLoanAmount > 50000) {
      alert('Sorry, your application has been declined. Loan amount under $50,000 required.');
      clearInputs();
    } else if(requestedLoanAmount > annualIncome * .3) {
      alert('Sorry, your application has been declined. Loan amount over 30% of annual income.');
      clearInputs();
    } else if(!correctStatesTrue) {
      alert('Sorry, your application has been declined. Only accepting applications in FL, CA, and OR.');
      clearInputs();
    }
    else {
      alert('Congratulations! Your loan has been approved and added to the database.');
      addLoanApp({
        name,
        mailingAddress,
        annualIncome: `$${annualIncome}`,
        requestedLoanAmount: `$${requestedLoanAmount}`,
        timestamp
      });
      clearInputs();
    }
  };

  return (
    <>
      <h3>Submit your loan application today!</h3>
      <form onSubmit={e => {
        e.preventDefault();
        validateAndAddToFirebase();
      }}>
        <fieldset>
          <legend>Contact information</legend>
          <label htmlFor="name" >
            Name
            <br/>
            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} required/>
          </label>
          <br/>
          <label htmlFor="address">
            Address
            <br/>
            <input
              type="text" 
              required
              value={mailingAddress}
              name="text" 
              onChange={e => setMailingAddress(e.target.value)}
            />
          </label>
          <button onClick={() => setMailingAddress('')}>Clear</button>
          <ul>
            {radioButtonAddressResults}
          </ul>
        </fieldset>
        <fieldset>
          <legend>Finances</legend>
          <label htmlFor="annualIncome">
            Annual Income
            <br/>
            <input type="number" name="annualIncome" value={annualIncome} onChange={e => setAnnualIncome(e.target.value)} required min="100"/>
          </label>
          <br/>
          <label htmlFor="requestedLoanAmount">
            Loan Amount
            <br/>
            <input type="number" name="requestedLoanAmount" value={requestedLoanAmount} onChange={e => setRequestedLoanAmount(e.target.value)} required min="100"/>
          </label>
        </fieldset>
        <br/>
        <button>Submit</button>
      </form>
    </>
  );
}
