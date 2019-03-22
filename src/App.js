import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import NoteForm from './components/NoteForm';
import { addNote } from './actions/notes';
import { ConnectedNotes } from './components/Notes';

class App extends Component {

  handleSubmit = (title, body, event) => {
    event.preventDefault();
    addNote({ title, body})
  }

  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
        <>
          <NoteForm handleSubmit={this.handleSubmit} />
          <ConnectedNotes/>
        </>
    );
  }
}

export default App;
