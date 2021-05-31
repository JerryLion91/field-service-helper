import React from 'react';

export default function PhoneCard({ document }) {
  const { phoneNumber, details } = document;
  const { calls, result, name } = details;

  return (
    <div>
      <span>{phoneNumber}</span>
      {name !== '' && <span>Nome: {name}</span>}
      <span>Chamadas: {calls}</span>
      {result !== '' && <span>Result: {result}</span>}
    </div>
  );
}
