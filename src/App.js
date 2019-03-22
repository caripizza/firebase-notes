import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import NoteForm from './components/NoteForm';
import { addNote } from './actions/notes';
import { ConnectedNotes } from './components/Notes';
import { ConnectedNote } from './components/NoteDetails';

class App extends Component {

  handleSubmit = (title, body, event) => {
    event.preventDefault();
    addNote({ title, body})
  }

  render() {
    return (
        <>
          <ConnectedNote id="2hiOEZv2xtPYz9j6oe0f" />
          <hr/>
          <NoteForm handleSubmit={this.handleSubmit} />
          <ConnectedNotes/>
        </>
    );
  }
}

export default App;
