import React from 'react';
import PropTypes from 'prop-types';

export default function LoanApp({ loanApp }) {
  if(!loanApp) return null;
  const {
    id,
    name,
    mailingAddress,
    annualIncome,
    requestedLoanAmount,
    timestamp
  } = loanApp;

  return (
    <>
      <li key={id}>
        <span>{name}</span>
        <p>{mailingAddress}</p>
        <p>{annualIncome}</p>
        <p>{requestedLoanAmount}</p>
        <p>{timestamp}</p>
      </li>
    </>
  );
}

LoanApp.propTypes = {
  loanApp: PropTypes.object.isRequired
};
