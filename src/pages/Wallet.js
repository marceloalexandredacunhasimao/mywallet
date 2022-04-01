/*
5. Desenvolva um formulário para adicionar uma despesa contendo as seguintes características:

    Um campo para adicionar valor da despesa.
        Adicione o atributo data-testid="value-input".

    Um campo para adicionar a descrição da despesa.
        Adicione o atributo data-testid="description-input".

    Um campo para selecionar em qual moeda será registrada a despesa.

        O campo deve ter a label Moeda.

        As options devem ser preenchidas pelo valor da chave currencies do estado global, implementada no requisito anterior.

        O campo deve ser um <select>.

    Um campo para adicionar qual método de pagamento será utilizado.

        Adicione o atributo data-testid="method-input".

        Este campo deve ser um <select>. A pessoa usuária deve poder escolher entre os campos: 'Dinheiro', 'Cartão de crédito' e 'Cartão de débito'.

    Um campo para selecionar uma categoria (tag) para a despesa.

        Este campo deve ser um dropdown. a pessoa usuária deve poder escolher entre os campos: 'Alimentação', 'Lazer', 'Trabalho', 'Transporte' e 'Saúde'.

        O campo deve ser um <select>.

O que será verificado:

    Um campo para adicionar o valor da despesa
    Um campo para adicionar a descrição da despesa
    Um campo para selecionar em qual moeda será registrada a despesa
    Um campo para selecionar qual método de pagamento será utilizado
    Um campo para selecionar uma categoria (tag) para a despesa
*/
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchCurrencies, actionFetchExpanse } from '../actions';
import { totalPrice, tabela } from './functions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addExpanse = this.addExpanse.bind(this);
    //    this.totalPrice = this.totalPrice.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  addExpanse() {
    const { newExpanse } = this.props;
    newExpanse(this.state);
    this.setState({ value: '' });
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      reduxState: {
        user: { email },
        wallet: {
          // soma,
          currencies,
          expenses,
        },
      },
    } = this.props;

    const { value, currency, method, tag } = this.state;

    return (
      <>
        <header>
          <div>
            {'Email: '}
            <span data-testid="email-field">{email}</span>
          </div>
          <div>
            {'Câmbio: '}
            <span data-testid="header-currency-field">BRL</span>
          </div>
          <div>
            {'Despesa total: R$ '}
            <span data-testid="total-field">{ totalPrice(expenses) }</span>
          </div>
        </header>
        <div id="cadastrar-despesa">
          {'Valor: '}
          <input
            data-testid="value-input"
            type="text"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
          {'Descrição: '}
          <input
            data-testid="description-input"
            type="text"
            name="description"
            onChange={ this.handleChange }
          />
          <label htmlFor="currency">
            {'Moeda: '}
            <select
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              <option value="" hidden>selecione</option>
              {
                currencies.map(
                  (cur) => <option key={ cur } value={ cur }>{ cur }</option>,
                )
              }
            </select>
          </label>
          {'método de pagamento: '}
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="" hidden>selecione</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          {'Categoria: '}
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="" hidden>selecione</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <br />
          <button type="button" onClick={ this.addExpanse }>Adicionar despesa</button>
        </div>
        { tabela(expenses) }
      </>
    );
  }
}

const mapStateToProps = (state) => ({ reduxState: state });

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(actionFetchCurrencies()),
  newExpanse: (forms) => dispatch(actionFetchExpanse(forms)),
});

Wallet.propTypes = {
  reduxState: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
    }),
    wallet: PropTypes.shape({
      soma: PropTypes.string,
      currencies: PropTypes.arrayOf(PropTypes.string), // (PropTypes.object),
      expenses: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  newExpanse: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
