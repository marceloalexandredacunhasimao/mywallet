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
import { actionFetchCurrencies } from '../actions';

class Wallet extends React.Component {
/*
  constructor() {
    super();
  }
*/
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  total(expenses) {
    if (expenses.length === 0) {
      return 0;
    }
    return expenses.map((acc, expense) => acc + expense.price, 0);
  }

  render() {
    const {
      reduxState: {
        user: { email },
        wallet: {
          currencies,
          expenses,
        },
      },
    } = this.props;

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
            <span data-testid="total-field">{this.total(expenses)}</span>
          </div>
        </header>
        <div id="cadastrar-despesa">
          {'Valor: '}
          <input data-testid="value-input" type="text" />
          {'Descrição: '}
          <input data-testid="description-input" type="text" />
          <label htmlFor="selectCurrencie">
            {'Moeda: '}
            <select name="selectCurrencie" id="selectCurrencie">
              {
                currencies.map(
                  (cur, index) => <option key={ index } value={ cur }>{ cur }</option>,
                )
              }
            </select>
          </label>
          {'método de pagamento: '}
          <select data-testid="method-input" name="selectMethod">
            <option value="dinheiro">Dinheiro</option>
            <option value="crédito">Cartão de crédito</option>
            <option value="débito">Cartão de débito</option>
          </select>
          {'Categoria: '}
          <select data-testid="tag-input" name="selectTag">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({ reduxState: state });

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(actionFetchCurrencies()),
});

Wallet.propTypes = {
  reduxState: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
    }),
    wallet: PropTypes.shape({
      currencies: PropTypes.arrayOf(PropTypes.string), // (PropTypes.object),
      expenses: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
  getCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
//    <div>TrybeWallet</div>
