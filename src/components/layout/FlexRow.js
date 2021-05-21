import React from 'react';

export default function FlexRow({ className, children }) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row-reverse',
      }}
    >
      {children}
    </div>
  );
}
