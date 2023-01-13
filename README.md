# My Wallet

## Sobre o projeto

My Wallet é uma aplicação de uma carteira para controle de gastos com um conversor de moedas que usa uma API para consultar a cotação das moedas. Nessa carteira é possível adicionar, editar e remover gastos, sendo que ao adicionar cada gasto é definido um valor, que pode ser em várias moedas, uma descrição, um método de pagamento e uma categoria. O valor de cada gasto é automaticamente convertido e apresentado individualmente em reais, além de ser exibido o somatório de todos os gastos em reais.

Para implementar o projeto foi utilizado a linguagem JavaScript, React e Redux.

## Orientações para a execução do projeto

Para executar o projeto é preciso ter o Node instalado.

Faça o clone do projeto:

    git clone https://github.com/marceloalexandredacunhasimao/mywallet

Instale as dependências

    cd mywallet
    npm install

Inicialize a execução do projeto:

    npm start

O funcionamento do projeto pode ser verificado inserindo o endereço http://127.0.0.1:3000 na barra de endereços do navegador.

Nota: a tela de login não está totalmente implementada, qualquer e-mail e senha com mais de 5 caracteres que for digitado dá acesso à aplicação.