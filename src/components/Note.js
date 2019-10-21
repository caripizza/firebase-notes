import React from 'react';

export default function Note({ note }) {
  const { id, title, body, timestamp } = note;

  const handleSelect = id => {
    console.log(id);
  };

  return (
    <ul>
        <li key={id} onClick={() => handleSelect(id)}>
          <p>{title}</p>
          <p>{body}</p>
          <p>{timestamp}</p>
        </li>
    </ul>
  );
};
