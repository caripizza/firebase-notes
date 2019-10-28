import React, { PureComponent } from 'react';
import { app, firestore } from '../services/firebase';
import { Circle } from 'better-react-spinkit';

export const connectFirestore = mapFirestoreToProps => Component => {
  class ConnectFirestore extends PureComponent {
    state = {}

    subscribe = (ref, dataKey) => {
      return ref.onSnapshot(snap => {
        if(snap instanceof app.firestore.DocumentSnapshot) {
          this.setState({
            [dataKey]: {
              ...snap.data(),
              id: snap.id
            }
          });
        } else if(snap instanceof app.firestore.QuerySnapshot) {
          const data = snap.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));
          this.setState({ [dataKey]: data });
        }
      });
    }

    // componentDidUpdate() {
    //   console.log('componentDidUpdate', { ...this.props, ...this.state });
    // }

    UNSAFE_componentWillMount() {
      const mapObject = mapFirestoreToProps(firestore, this.props);
      this.unsubscribe = Object.keys(mapObject).map(dataKey => {
        const ref = mapObject[dataKey];
        return this.subscribe(ref, dataKey);
      });
    }

    componentWillUnmount() {
      this.unsubscribe && this.unsubscribe.map(u => u());
    }

    render() {
      const props = { ...this.props };
      const state = { ...this.state };
      // console.log(state); //loanApps
      // console.log(props); //null
      return (
        state.loanApps ? <Component {...props} {...state}/> : (
          <Circle 
            size={100}
            style={{
              width: '100%',
              height: '33vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          />
        )
      );
    }
  }

  return ConnectFirestore;
};
