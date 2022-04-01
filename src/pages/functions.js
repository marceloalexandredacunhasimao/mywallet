import React from 'react';

function totalPrice(expenses) {
  if (!expenses) {
    return '0';
  }
  if (expenses.length === 0) {
    return '0';
  }
  const soma = expenses.reduce((total, expense) => {
    const ask = parseFloat(expense.exchangeRates[expense.currency].ask);
    return parseFloat(total) + ask * parseFloat(expense.value);
  }, 0);
  return `${Math.trunc(soma * 100) / 100}`;
}

function tabela(expenses) {
  return (
    <table style={ { width: '100%' } }>
      <thead>
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
      </thead>
      <tbody>
        {
          expenses.map((ezz) => {
            const valor = parseFloat(ezz.value).toFixed(2);
            const moeda = ezz.exchangeRates[ezz.currency].name;
            const cambio = parseFloat(ezz.exchangeRates[ezz.currency].ask);
            const convertido = parseFloat(ezz.value) * cambio;
            return (
              <tr key={ ezz.id }>
                <td>{ezz.description}</td>
                <td>{ezz.tag}</td>
                <td>{ezz.method}</td>
                <td>{valor}</td>
                <td>{moeda}</td>
                <td>{cambio.toFixed(2)}</td>
                <td>{ convertido.toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

export { totalPrice, tabela };
