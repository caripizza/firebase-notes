import React, {
  Component,
  Suspense
} from 'react';
import './App.css';
import LoanAppFormHook from './components/LoanAppFormHook';
import { ConnectedLoanApps } from './components/LoanApps';
const Header = React.lazy(() => import('./components/Header'));

class App extends Component {
  render() {
    return (
      <>
        <Suspense fallback={''}>
          <Header>
            <>
              <h1>Loan Origination System</h1>
            </>
          </Header>
          <main>
            <LoanAppFormHook/>
            <section>
              <h3>Loan Database</h3>
              <ConnectedLoanApps/>
            </section>
          </main>
        </Suspense>
      </>
    );
  }
}

export default App;
