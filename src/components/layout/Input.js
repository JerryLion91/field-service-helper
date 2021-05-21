import React from 'react';
import PropTypes from 'prop-types';

export default function Input({
  type,
  value,
  onChange,
  icon,
  label,
  className,
  helperText,
  readOnly = false,
  required = false,
  id = 'inputFunction',
}) {
  const [labelUp, setLabelUp] = React.useState(false);
  const checkValue = () => {
    if (value) {
      setLabelUp(true);
    } else {
      setLabelUp(false);
    }
  };
  return (
    <div className={`input-field ${className}`}>
      {icon && <i className="material-icons prefix">{icon}</i>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        required={required}
        readOnly={readOnly}
        onBlur={checkValue}
        onFocus={() => setLabelUp('active')}
      />
      {label && (
        <label
          forhtml={id}
          className={labelUp ? 'active' : null}
          style={{ zIndex: '-1' }}
        >
          {label}
        </label>
      )}
      {helperText && <span className="helper-text">{helperText}</span>}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  helperText: PropTypes.string,
  readOnly: PropTypes.bool,
};
