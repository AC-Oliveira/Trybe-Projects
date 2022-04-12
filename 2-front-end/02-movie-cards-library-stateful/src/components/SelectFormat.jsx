import React from 'react';
import PropTypes from 'prop-types';

function SelectFormat(props) {
  const { name, text, handle, state } = props;
  const newName = name === 'imagePath' ? 'image' : name;
  return (
    <label htmlFor={ `${newName}-input` } data-testid={ `${newName}-input-label` }>
      {`${text}`}
      <select
        name={ `${name}` }
        data-testid={ `${newName}-input` }
        id="select-input"
        value={ state }
        onChange={ handle }
      >
        <option value="action" data-testid="genre-option">Ação</option>
        <option value="comedy" data-testid="genre-option">Comédia</option>
        <option value="thriller" data-testid="genre-option">Suspense</option>
      </select>
    </label>
  );
}

SelectFormat.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handle: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired,
};

export default SelectFormat;
