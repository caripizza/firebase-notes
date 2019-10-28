import { loanAppsCollection } from '../services/firebase';

export const addLoanApp = loanApp => loanAppsCollection.add(loanApp);
