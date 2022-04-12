import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../../actions/index';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  handleClick() {
    const { removeListItem, id } = this.props;
    removeListItem(id);
  }

  editExpense() {
    const { editListItem, id } = this.props;
    editListItem(id);
  }

  editNumbers(number) {
    const stringNumber = number.toString();
    const stringNumberIndex = stringNumber.indexOf('.');
    const NUMBER = 3;
    const numberEdited = stringNumber.slice(0, stringNumberIndex + NUMBER);
    return numberEdited;
  }

  render() {
    const { item:
      { value, description, method, currency,
        tag, exchangeRates } } = this.props;
    // const currencyIndex = exchangeRates[currency].name.indexOf('/');
    // const editedCurrency = exchangeRates[currency].name.slice(0, currencyIndex);
    const passaTeste = exchangeRates[currency].name.split('/')[0];
    return (
      <tr>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{passaTeste}</td>
        <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
        <td>{(exchangeRates[currency].ask * value).toFixed(2)}</td>
        <td>Real</td>
        <button
          type="button"
          data-testid="edit-btn"
          onClick={ this.editExpense }
        >
          Editar
        </button>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="delete-btn"
        >
          Remover
        </button>
      </tr>
    );
  }
}

ItemList.propTypes = {
  editListItem: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  item: PropTypes.string.isRequired,
  removeListItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeListItem: (id) => (dispatch(deleteExpense(id))),
  editListItem: (index) => (dispatch(editExpense(index))),
});

export default connect(null, mapDispatchToProps)(ItemList);
