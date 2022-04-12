import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setLogin from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: '',
      inputPassword: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick() {
    const { inputEmail } = this.state;
    const { history, setUserLogin } = this.props;
    setUserLogin(inputEmail);
    history.push('/carteira');
  }

  render() {
    const PASSWORD_LENGTH = 5;
    const { inputPassword, inputEmail } = this.state;
    let validInput = false;
    // ref: https://regexlib.com/Search.aspx?k=&c=1&m=-1&ps=20
    const validEmail = inputEmail.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    const validPassword = inputPassword.length > PASSWORD_LENGTH;
    if (validEmail && validPassword) validInput = !validInput;
    return (
      <>
        <h1>Login</h1>
        <input
          type="text"
          name="inputEmail"
          value={ inputEmail }
          placeholder="Email"
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="inputPassword"
          value={ inputPassword }
          placeholder="Password"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        {validInput ? <button type="button" onClick={ this.handleClick }>Entrar</button>
          : <button type="button" disabled>Entrar</button>}
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setUserLogin: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({ state });
const mapDispatchToProps = (dispatch) => ({
  setUserLogin: (value) => dispatch(setLogin(value)),
});

export default connect(null, mapDispatchToProps)(Login);
