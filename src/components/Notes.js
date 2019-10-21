import React from 'react';
import { connectFirestore } from './connectFirestore';
import Note from './Note';

export default function Notes({ notes, handleSelect }) {
  const noteListItems = (notes || []).map(doc => {
    return (
      <Note
        note={doc}
        key={doc.id}
        handleSelect={id => handleSelect(doc.id)}
      />
    )
  })

  return (
      <ul>
        {noteListItems}
      </ul>
  )
}

const mapFirestoreToProps = firestore => ({
  notes: firestore.collection('notes').orderBy('timestamp', 'asc'),
})

export const ConnectedNotes = connectFirestore(
  mapFirestoreToProps
)(Notes)
