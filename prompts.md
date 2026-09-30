# Histórico de Prompts — Automação de Testes E2E

Este documento apresenta os principais prompts utilizados durante o desenvolvimento do projeto de automação E2E com **Cypress e JavaScript**.

A documentação tem como objetivo demonstrar como a Inteligência Artificial foi utilizada como ferramenta de apoio durante o planejamento, implementação e revisão dos testes.

As decisões finais de implementação foram avaliadas e ajustadas de acordo com os requisitos do projeto e com a análise da aplicação.



## 1. Automação do formulário de Login

### Prompt utilizado:

```text
Objetivo:
- Realizar testes automatizados usando cypress e JS

Contexto:
- Realizar os testes do formulário de login, preenchimento dos campos
  'Nome de usuário' e 'senha'
- Clicar no botão [ Login ]

- Os nomes de usuários aceitos:
  standard_user
  locked_out_user
  problem_user
  performance_glitch_user
  error_user
  visual_user

- Senha para todos os usuários:
  secret_sauce

- O HTML do formulário do site:

<form aria-label="Login">
  <div class="form_group">
    <input
      class="input_error form_input"
      placeholder="Username"
      aria-label="Username"
      data-test="username"
      id="user-name"
      type="text"
      value=""
      name="user-name"
    >
  </div>

  <div class="form_group">
    <input
      class="input_error form_input"
      placeholder="Password"
      aria-label="Password"
      data-test="password"
      id="password"
      type="password"
      value=""
      name="password"
    >
  </div>

  <div class="error-message-container"></div>

  <input
    class="submit-button btn_action"
    data-test="login-button"
    id="login-button"
    type="submit"
    value="Login"
    name="login-button"
  >
</form>

Regras:
- Teste de login com sucesso
- Teste de campos obrigatórios
- Teste de preenchimento dos campos
- Teste para as mensagens de erros
- Utilizar consultas baseadas em seletores CSS
```

## 2. Automação do Fluxo de Compra E2E

### Prompt utilizado:

```text
Objetivo:
- Realizar testes automatizados utilizando Cypress e JavaScript
  para o site https://www.saucedemo.com/
- Realizar testes automatizados para validar o Fluxo de Compra
  Completo (E2E)
- Aproveitar o comando customizado do login

Utilizar o comando de login no beforeEach:

beforeEach(() => {
    cy.visit('/');
    cy.login('standard_user', 'secret_sauce');
});

Fluxo:
- Login
- Adicionar Produto 1
- Adicionar Produto 2
- Acessar Carrinho
- Validar Produto 1 e Produto 2
- Checkout
- Preencher dados
- Finalizar compra
- Validar "Thank you for your order!"

Contexto:
- Após o login, o usuário é direcionado para a página de catálogo
  de produtos.
- Para adicionar o produto, utilizar os elementos encontrados
  no HTML.
- Para abrir o carrinho, utilizar o ícone do carrinho.
- Para seguir para o checkout, utilizar o botão Checkout.
- Preencher os campos:
  First Name
  Last Name
  Zip/Postal Code
- Finalizar a compra através do botão Finish.
- Validar a mensagem:
  "Thank you for your order!"

Regras:
- Criar um comando customizado se necessário em
  cypress/support/commands.js
- Utilizar beforeEach() quando apropriado.
- Cada teste deve ser independente.
- Utilizar seletores CSS.
- Dar preferência aos atributos data-test.
- Evitar seletores frágeis como :nth-child() e :nth-of-type().
- Não assumir ou inventar seletores antes de analisar o HTML.
- Evitar duplicação de código.
- Utilizar comandos customizados quando houver ações repetidas.
- Não utilizar cy.wait() com tempos fixos desnecessariamente.
- Utilizar as esperas automáticas e assertions do Cypress.
- Manter o código simples e legível.
```

## 3. Automação da Ordenação de Produtos

### Prompt utilizado:

```text
Objetivo:
- Realizar testes automatizados utilizando Cypress e JavaScript
  para o site https://www.saucedemo.com/
- Realizar testes automatizados para validar o filtro de ordenação
  dos produtos na página de catálogo.
- Criar um comando customizado do Cypress para realizar o login
  e evitar duplicação de código.
- Validar todas as opções de ordenação disponíveis no catálogo.
- O primeiro teste e requisito principal deve ser:
  Price (low to high)

Contexto:
- A aplicação possui uma página de login e, após o login,
  o usuário é direcionado para a página de catálogo.
- Credenciais:
  Usuário: standard_user
  Senha: secret_sauce

HTML do filtro:

<select
  class="product_sort_container"
  aria-label="Sort products"
  data-test="product-sort-container">

  <option value="az">Name (A to Z)</option>
  <option value="za">Name (Z to A)</option>
  <option value="lohi">Price (low to high)</option>
  <option value="hilo">Price (high to low)</option>

</select>

Regras:
- Criar um comando customizado de login em:
  cypress/support/commands.js

- O comando deve permitir:
  cy.login('standard_user', 'secret_sauce');

- O comando deve encapsular:
  preenchimento do usuário;
  preenchimento da senha;
  clique no botão Login;
  validação do acesso ao catálogo.

- Não repetir a lógica de login nos testes.

- Criar os testes em:
  cypress/e2e/ordenacao.cy.js

- Utilizar beforeEach() quando apropriado.
- Cada teste deve ser independente.

Teste 1:
- Selecionar Price (low to high)
- Obter os preços dos produtos exibidos.
- Remover o símbolo "$", quando necessário.
- Converter os preços para números.
- Validar que os preços estão ordenados do menor para o maior.
- Validar a ordem real dos produtos exibidos.

Teste 2:
- Selecionar Price (high to low)
- Obter os preços.
- Converter para números.
- Validar a ordem do maior para o menor.

Teste 3:
- Selecionar Name (A to Z)
- Obter os nomes dos produtos.
- Validar a ordem alfabética A-Z.

Teste 4:
- Selecionar Name (Z to A)
- Obter os nomes dos produtos.
- Validar a ordem alfabética Z-A.

Seletores:
- Utilizar consultas baseadas em CSS.
- Dar preferência aos atributos data-test.
- Evitar :nth-child() e :nth-of-type().
- Não utilizar seletores baseados apenas na posição.
- Não inventar seletores.
- Analisar o HTML antes de criar os testes.

Validação:
- Validar o resultado efetivo da ordenação.
- Para preços, comparar valores numéricos.
- Para nomes, comparar os textos em ordem alfabética.
- Não utilizar uma lista fixa de produtos apenas para afirmar
  que a ordenação está correta.
- Obter os valores diretamente da página.

Boas práticas:
- Código simples e legível.
- Nomes dos testes em português.
- Comentários nas principais etapas.
- Evitar duplicação.
- Utilizar comandos customizados para ações repetidas.
- Não utilizar cy.wait() desnecessariamente.
- Utilizar esperas automáticas e assertions do Cypress.
- Manter cada teste independente.
```
