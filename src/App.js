import React, { Component } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import { addNote } from './actions/notes';
import { ConnectedNotes } from './components/Notes';
import { SelectedNote } from './components/NoteDetails';

class App extends Component {

  handleSubmit = (title, body, timestamp, event) => {
    event.preventDefault();
    addNote({ title, body, timestamp })
  }

  render() {
    return (
        <>
          <SelectedNote 
            id="RsqF9yDL2Qb0bLpY9JXO"
          />
          <hr/>
          <NoteForm handleSubmit={this.handleSubmit} />
          <ConnectedNotes/>
        </>
    );
  }
}

export default App;
