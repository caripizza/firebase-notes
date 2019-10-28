import React from 'react';
import PropTypes from 'prop-types';
import { connectFirestore } from './connectFirestore';
import LoanApp from './LoanApp';

export default function LoanApps({ loanApps }) {
  const loanAppListItems = (loanApps || []).map(doc => {
    return (
      <LoanApp
        loanApp={doc}
        key={doc.id}
      />
    );
  });

  return (
    <>
      <ul>
        {loanAppListItems}
      </ul>
    </>
  );
}

LoanApps.propTypes = {
  loanApps: PropTypes.array.isRequired
};

const mapFirestoreToProps = firestore => ({
  loanApps: firestore
    .collection(process.env.REACT_APP_FIRESTORE_COLLECTION)
    .orderBy('timestamp', 'asc')
});

export const ConnectedLoanApps = connectFirestore(
  mapFirestoreToProps
)(LoanApps);
