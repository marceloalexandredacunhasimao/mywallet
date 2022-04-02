import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  actionFetchCurrencies, actionFetchExpanse, actionDeleteItem, actionEditItem,
} from '../actions';
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
      editIndex: -1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.addExpanse = this.addExpanse.bind(this);
    this.formEditItem = this.formEditItem.bind(this);
    this.btnEditItem = this.btnEditItem.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  addExpanse() {
    const { newExpanse } = this.props;
    const { value, description, currency, method, tag } = this.state;
    newExpanse({ value, description, currency, method, tag });
    this.setState({ value: '' });
  }

  formEditItem(index) {
    const {
      reduxState: {
        wallet: {
          expenses,
        },
      },
    } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = expenses[index];
    this.setState({ value, description, currency, method, tag, editIndex: index });
  }

  btnEditItem() {
    const { editItem } = this.props;
    editItem(this.state);
    this.setState({ value: '', editIndex: -1 });
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
          currencies,
          expenses,
        },
      },
      deleteItem,
    } = this.props;

    const { value, description, currency, method, tag, editIndex } = this.state;

    let btnFunc = this.addExpanse;
    let btnText = 'Adicionar despesa';
    if (editIndex >= 0) {
      btnFunc = this.btnEditItem;
      btnText = 'Editar despesa';
    }

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
            value={ description }
            onChange={ this.handleChange }
          />
          <label htmlFor="currency">
            {'Moeda: '}
            <select
              data-testid="currency-input"
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
          <button type="button" onClick={ btnFunc }>{ btnText }</button>
        </div>
        { tabela(expenses, deleteItem, this.formEditItem) }
      </>
    );
  }
}

const mapStateToProps = (state) => ({ reduxState: state });

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(actionFetchCurrencies()),
  newExpanse: (forms) => dispatch(actionFetchExpanse(forms)),
  deleteItem: (index) => dispatch(actionDeleteItem(index)),
  editItem: (data) => dispatch(actionEditItem(data)),
});

Wallet.propTypes = {
  reduxState: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
    }),
    wallet: PropTypes.shape({
      soma: PropTypes.string,
      currencies: PropTypes.arrayOf(PropTypes.string),
      expenses: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  newExpanse: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
