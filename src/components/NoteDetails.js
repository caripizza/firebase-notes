import React from 'react'
import { connectFirestore } from './connectFirestore';

export default function Note({ note }) {
  if (!note) return null
  return (
    <>
      <p>{note.title}</p>
      <p>{note.body}</p>
      <p>{note.timestamp}</p>
    </>
  )
}

const mapFirestoreToProps = (firestore, props) => ({
  note: firestore.collection('notes').doc(props.id)
})

export const SelectedNote = connectFirestore(
  mapFirestoreToProps
)(Note)
