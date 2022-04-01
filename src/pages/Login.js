import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  validateForm(email, password) {
    const minChars = 6;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = regex.test(email);
    return validEmail && password.length >= minChars;
  }

  doLogin() {
    const { userLogin } = this.props;
    const { email } = this.state;
    const { history } = this.props;
    userLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    return (
      <>
        <input
          data-testid="email-input"
          type="text"
          name="email"
          id="email"
          placeholder="e-mail"
          value={ email }
          onChange={ this.handleChange }
        />
        <br />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          id="password"
          placeholder="senha"
          value={ password }
          onChange={ this.handleChange }
        />
        <br />
        <button
          type="button"
          id="login-button"
          disabled={ !this.validateForm(email, password) }
          onClick={ this.doLogin }
        >
          Entrar
        </button>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userLogin: (email) => dispatch(actionUser(email)),
  };
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
/*
  31:13  error  'userLogin' is missing in props validation         react/prop-types
  33:13  error  'history' is missing in props validation           react/prop-types
  35:13  error  'history.push' is missing in props validation      react/prop-types
  40:13  error  'handleChange' is assigned a value but never used  no-unused-vars
  64:9   error  Missing an explicit type attribute for button      react/button-has-type
*/
