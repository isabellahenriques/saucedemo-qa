# SauceDemo E2E Tests

> Projeto de automação de testes end-to-end para a aplicação [SauceDemo](https://www.saucedemo.com/), desenvolvido com Cypress e JavaScript.

A suíte valida fluxos essenciais de autenticação, catálogo, carrinho e checkout, utilizando seletores estáveis, comandos reutilizáveis e asserções orientadas ao comportamento da aplicação.

## Cobertura

### Autenticação

- Login com `standard_user`, `problem_user`, `performance_glitch_user`, `error_user` e `visual_user`;
- Bloqueio de acesso para `locked_out_user`;
- Login com usuário ou senha inválidos;
- Validação de campos obrigatórios;
- Verificação do redirecionamento para o catálogo.

### Fluxo de compra

- Login com `standard_user`;
- Inclusão de dois produtos diferentes no carrinho;
- Validação dos produtos, preços e quantidade de itens;
- Preenchimento dos dados de checkout;
- Validação do resumo do pedido;
- Finalização da compra;
- Confirmação da mensagem `Thank you for your order!`.

### Ordenação do catálogo

- Preço: menor para maior;
- Preço: maior para menor;
- Nome: A-Z;
- Nome: Z-A.

As verificações de ordenação extraem os valores exibidos na interface e os comparam com a sequência esperada, em vez de validar apenas uma lista fixa de produtos.

## Tecnologias

- [Cypress](https://www.cypress.io/)
- JavaScript
- Node.js e npm

## Arquitetura

Os testes são organizados por domínio funcional:

- `cypress/e2e/login.cy.js`: cenários de autenticação;
- `cypress/e2e/compra.cy.js`: fluxo completo de compra;
- `cypress/e2e/ordenacao.cy.js`: ordenação do catálogo;
- `cypress/support/commands.js`: comandos customizados compartilhados;
- `cypress.config.js`: URL base, viewport e configurações do Cypress;
- `PROMPTS.md`: registro dos prompts usados como apoio ao desenvolvimento.

O comando `cy.login(usuario, senha)` centraliza o preenchimento do formulário, o envio das credenciais e a validação do acesso ao catálogo. O comando `cy.selecionarOrdenacao(opcao)` encapsula a interação com o filtro de produtos.

## Estratégia de seletores

A automação prioriza atributos `data-test`, que são menos dependentes de estilos e detalhes visuais da aplicação. Exemplos:

```javascript
cy.get('[data-test="shopping-cart-link"]');
cy.get('[data-test="product-sort-container"]');
```

Os testes também utilizam asserções do Cypress para aguardar o estado esperado da interface, sem depender de esperas fixas.

## Pré-requisitos

- Node.js 18 ou superior;
- npm.

Verifique o ambiente com:

```bash
node --version
npm --version
```

## Instalação

```bash
git clone https://github.com/isabellahenriques/saucedemo-qa.git
cd saucedemo-qa
npm install
```

## Execução

Executar toda a suíte em modo headless:

```bash
npm test
```

Abrir o Cypress em modo interativo:

```bash
npm run test:ui
```

Executar uma especificação específica:

```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
npx cypress run --spec "cypress/e2e/compra.cy.js"
npx cypress run --spec "cypress/e2e/ordenacao.cy.js"
```

A URL da aplicação e as configurações compartilhadas estão centralizadas em `cypress.config.js`.

## Uso de Inteligência Artificial

> Ferramentas de Inteligência Artificial foram utilizadas como apoio ao planejamento, à implementação, à revisão dos testes e à documentação. As decisões finais foram avaliadas com base no comportamento da aplicação e nos critérios de qualidade da automação.

Os principais prompts e respectivos contextos estão disponíveis em [PROMPTS.md](./PROMPTS.md).