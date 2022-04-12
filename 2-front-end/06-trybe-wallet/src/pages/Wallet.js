import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencyThunk } from '../actions';
import Form from './Utils/Form';

class Wallet extends React.Component {
  componentDidMount() {
    const { setCurrency } = this.props;
    setCurrency();
  }

  expensesCalc() {
    const { state: { wallet: { expenses } } } = this.props;
    const expensesList = expenses
      .map((expense) => {
        const currentCurrencyExpensePrice = (expense.exchangeRates[expense.currency].ask);
        const currentCurrencyQuotation = expense.value;
        const expensePrice = (currentCurrencyExpensePrice * currentCurrencyQuotation)
          .toFixed(2);
        return expensePrice;
      });
    const totalExpenseInBRL = expensesList.reduce((curr, acc) => {
      acc = Number(acc);
      curr += acc;
      return Number(curr.toFixed(2));
    }, 0);
    return totalExpenseInBRL;
  }

  render() {
    const { state: { user, wallet: { currencies, expenses } } } = this.props;
    const currenciesArray = Object.keys(currencies);
    currenciesArray.splice(1, 1);
    return (
      <>
        <p data-testid="email-field">{user.email}</p>
        <p>
          Gastos: R$
          <span data-testid="total-field">
            {expenses.length === 0 ? 0
              : this.expensesCalc()}
          </span>
        </p>
        <p>
          Câmbio:
          <span data-testid="header-currency-field">BRL</span>
        </p>
        <Form currencies={ currencies } />
      </>
    );
  }
}

Wallet.propTypes = {
  setCurrency: PropTypes.func.isRequired,
  state: PropTypes.arrayOf().isRequired,
};

const mapStateToProps = (state) => ({ state });
const mapDispatchToProps = (dispatch) => ({
  setCurrency: () => dispatch(getCurrencyThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
