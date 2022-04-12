import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSecondThunk, updateExpense } from '../../actions/index';
import ItemList from './ItemList';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.createExpen = this.createExpen.bind(this);
    this.formToFill = this.formToFill.bind(this);
    this.tagLabel = this.tagLabel.bind(this);
    this.labellabel = this.labellabel.bind(this);
    this.expenseEdit = this.expenseEdit.bind(this);
  }

  FormInputText(value, text, name, handle) {
    return (
      <label htmlFor={ name }>
        {text}
        <input
          type="text"
          name={ name }
          value={ value }
          id={ name }
          onChange={ handle }
        />
      </label>
    );
  }

  tagLabel(tag) {
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Saúde', 'Transporte'];
    return (
      <label htmlFor="tag">
        Tag
        <select name="tag" id="tag" onChange={ this.handleChange }>
          {tags.map((type) => {
            if (type === tag) return <option value={ type } selected>{type}</option>;
            return <option key={ type } value={ type }>{type}</option>;
          })}
        </select>
      </label>
    );
  }

  labellabel(method) {
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <label htmlFor="method">
        Método de Pagamento
        <select name="method" id="method" onChange={ this.handleChange }>
          {methods.map((met) => {
            if (met === method) return <option value={ met } selected>{met}</option>;
            return <option key={ met } value={ met }>{met}</option>;
          })}
        </select>
      </label>);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  createExpen() {
    const { id } = this.state;
    this.setState({
      id: id + 1,
    });
    const { attCurrencyThunk } = this.props;
    attCurrencyThunk({ ...this.state });
  }

  formToFill() {
    const { currencies, expensesList: { editor } } = this.props;
    const { value, description } = this.state;
    return (
      <form>
        {this.FormInputText(value, 'Valor', 'value', this.handleChange)}
        {this.FormInputText(description, 'Descrição', 'description', this
          .handleChange)}
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            id="currency"
            onChange={ this.handleChange }
          >
            {currencies.map((currencie) => (
              <option
                value={ currencie }
                key={ currencie }
              >
                {currencie}
              </option>
            ))}
          </select>
        </label>
        {this.tagLabel()}
        {this.labellabel()}
        { !editor
          ? <button type="button" onClick={ this.createExpen }>Adicionar despesas</button>
          : <button type="button" onClick={ this.expenseEdit }>Editar despesa</button>}
      </form>
    );
  }

  expenseEdit() {
    const { editExpense, id, expenses } = this.props;
    const { exchangeRates } = expenses[id];
    editExpense({ ...this.state, id, exchangeRates });
  }

  render() {
    const { expensesList } = this.props;
    return (
      <>
        {this.formToFill()}
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {expensesList.expenses.length === 0 ? null : expensesList.expenses
            .map((item,
              index) => <ItemList item={ item } key={ index } id={ index } />)}
        </table>
      </>
    );
  }
}

Form.propTypes = {
  attCurrencyThunk: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired, // exchangeRates: PropTypes.string.isRequired,
  editExpense: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  expensesList: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  expensesList: state.wallet,
  id: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  attCurrencyThunk: (value) => dispatch(getSecondThunk(value)),
  editExpense: (editedExpense) => dispatch(updateExpense(editedExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
