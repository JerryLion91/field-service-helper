import React from 'react';

export default function Subtitle({ children }) {
  return (
    <h5
      className={'center-align teal-text'}
      style={{
        fontWeight: 'bold',
        fontSize: '1.2em',
        textAlign: 'center',
      }}
    >
      {children}
    </h5>
  );
}
