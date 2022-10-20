import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateExpense } from '../../actions';

class FormToEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.expenseEdit = this.expenseEdit.bind(this);
  }

  componentDidMount() {
    this.setExpenses();
  }

  setExpenses() {
    const { expensesList: { expenses }, id } = this.props;
    const { value, description, currency, tag, method } = expenses[id];
    this.setState({ value, description, currency, tag, method });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
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

  expenseEdit() {
    const { editExpense, id } = this.props;
    editExpense({ ...this.state, id });
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

  render() {
    const { expensesList: { currencies } } = this.props;
    const { value, description, currency, method, tag } = this.state;
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
            {currencies.map((curr) => (
              curr === currency
                ? <option value={ curr } key={ curr } selected>{curr}</option>
                : <option value={ curr } key={ curr }>{curr}</option>
            ))}
          </select>
        </label>
        {this.tagLabel(tag)}
        {this.labellabel(method)}
        <button type="button" onClick={ this.expenseEdit }>Editar despesa</button>
      </form>
    );
  }
}

FormToEdit.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  editExpense: PropTypes.func.isRequired,
  expensesList: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  expensesList: state.wallet,
  id: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  editExpense: (editedExpense) => dispatch(updateExpense(editedExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormToEdit);
