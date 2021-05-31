import React from 'react';
import { formattedDate } from '../helpers/format';

export default function CardCallDetails({ date, caller, notes }) {
  return (
    <div className="row">
      <div className="col s12">
        <div className="card">
          <div className="card-content">
            <span style={{ fontSize: 'larger' }} className="card-title">
              {`${formattedDate()}: ${caller}`}
            </span>
            <p>{notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
