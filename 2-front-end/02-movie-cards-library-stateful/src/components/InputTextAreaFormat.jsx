import React from 'react';
import PropTypes from 'prop-types';

function InputAreaTextFormat(props) {
  const { name, text, handle, state } = props;
  const newName = name === 'imagePath' ? 'image' : name;
  return (
    <label htmlFor={ `${newName}-input` } data-testid={ `${newName}-input-label` }>
      {`${text}`}
      <textarea
        name={ `${name}` }
        cols="30"
        rows="10"
        data-testid={ `${newName}-input` }
        id={ `${name}-input` }
        value={ state }
        onChange={ handle }
      />
    </label>
  );
}

InputAreaTextFormat.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handle: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired,
};

export default InputAreaTextFormat;
