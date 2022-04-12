import React from 'react';
import PropTypes from 'prop-types';

function InFormat(props) {
  const { n, t, ty, h, s } = props;
  const newName = n === 'imagePath' ? 'image' : n;
  return (
    <label htmlFor={ `${newName}-input` } data-testid={ `${newName}-input-label` }>
      {`${t}`}
      <input
        name={ `${n}` }
        data-testid={ `${newName}-input` }
        type={ `${ty}` }
        id={ `${n}-input` }
        value={ s }
        onChange={ h }
        min="0"
        max="5"
      />
    </label>
  );
}

InFormat.propTypes = {
  n: PropTypes.string.isRequired,
  t: PropTypes.string.isRequired,
  ty: PropTypes.string.isRequired,
  h: PropTypes.func.isRequired,
  // Fonte: https://stackoverflow.com/questions/41808428/react-proptypes-allow-different-types-of-proptypes-for-one-prop
  s: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default InFormat;
