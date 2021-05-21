import React from 'react';
import PropTypes from 'prop-types';

export default function Button({
  onClick,
  icon,
  className,
  style,
  children,
  direction = 'left',
}) {
  const text = children || '';

  return (
    <a
      className={`waves-effect waves btn-flat ${className}`}
      style={style}
      onClick={onClick}
    >
      {icon && (
        <i style={styles.icon} className={`material-icons ${direction}`}>
          {icon}
        </i>
      )}
      {text}
    </a>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string,
  direction: PropTypes.string,
  classNames: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.string,
};

const styles = {
  icon: {
    fontSize: '2em',
    margin: 'auto',
    color: 'grey',
  },
  button: {
    margin: '3px',
    padding: '3px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    cursor: 'pointer',
  },
};
