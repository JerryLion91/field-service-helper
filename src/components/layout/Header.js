import React from 'react';
import PropTypes from 'prop-types';

export default function Header({
  title = 'Ajudante de Servico',
  subtitle = '',
  children,
}) {
  const { divFlexColumn, divFlexRow, header, lineStyle } = localStyles;
  return (
    <header style={header}>
      <div style={divFlexRow}>{children}</div>
      <div style={divFlexColumn}>
        <h4 className={'center-align'}>{title}</h4>
        <div style={lineStyle}></div>
        {subtitle && (
          <h5
            className={'center-align teal-text'}
            style={{
              fontWeight: 'bold',
              fontSize: '1.2em',
              textAlign: 'center',
            }}
          >
            {subtitle}
          </h5>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

const localStyles = {
  divFlexColumn: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  divFlexRow: {
    maxWidth: '800px',
    width: '100vw',
    height: '2vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexDirection: 'row-reverse',
  },
  header: {
    flex: '0 0 auto',
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  lineStyle: {
    width: '100%',
    height: '2px',
    backgroundColor: '#e5e8ea',
  },
};
