import React from 'react';
import CardCallDetails from './CardCallDetails';

export default function ReturnVisits({ callsArray }) {
  console.log(callsArray);
  return (
    <>
      {callsArray.map((call, index) => {
        return (
          <div key={index}>
            <CardCallDetails
              date={call.details.date}
              caller={call.details.caller}
              notes={call.details.notes}
            />
          </div>
        );
      })}
    </>
  );
}
