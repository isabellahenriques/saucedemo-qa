// Lista os usuários que devem conseguir realizar o login.
const usuarios = [
  'standard_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user'
];

describe('Login', () => {
  beforeEach(() => {
    // Acessa a página de login antes de cada teste
    cy.visit('/');
  });

  // Verifica o login bem-sucedido para cada usuário válido
  usuarios.forEach((usuario) => {
    it(`deve realizar login com sucesso usando ${usuario}`, () => {
      cy.login(usuario, 'secret_sauce');
    });
  });

  // Verifica a mensagem exibida para um usuário bloqueado
  it('deve apresentar mensagem de erro para usuário bloqueado', () => {
    cy.get('input[data-test="username"]')
      .type('locked_out_user');

    cy.get('input[data-test="password"]')
      .type('secret_sauce');

    cy.get('input[data-test="login-button"]')
      .click();

    cy.get('.error-message-container')
      .should('be.visible')
      .and('contain', 'Epic sadface: Sorry, this user has been locked out.');
  });

  // Verifica a mensagem exibida para um usuário inválido
  it('deve apresentar mensagem de erro para usuário inválido', () => {
    cy.get('input[data-test="username"]')
      .type('usuario_invalido');

    cy.get('input[data-test="password"]')
      .type('secret_sauce');

    cy.get('input[data-test="login-button"]')
      .click();

    cy.get('.error-message-container')
      .should('be.visible')
      .and(
        'contain',
        'Epic sadface: Username and password do not match any user in this service'
      );
  });

  // Verifica a mensagem exibida para uma senha incorreta
  it('deve apresentar mensagem de erro para senha incorreta', () => {
    cy.get('input[data-test="username"]')
      .type('standard_user');

    cy.get('input[data-test="password"]')
      .type('senha_incorreta');

    cy.get('input[data-test="login-button"]')
      .click();

    cy.get('.error-message-container')
      .should('be.visible')
      .and(
        'contain',
        'Epic sadface: Username and password do not match any user in this service'
      );
  });

  // Verifica se os campos aceitam os valores informados
  it('deve preencher corretamente os campos de usuário e senha', () => {
    cy.get('input[data-test="username"]')
      .type('standard_user')
      .should('have.value', 'standard_user');

    cy.get('input[data-test="password"]')
      .type('secret_sauce')
      .should('have.value', 'secret_sauce');
  });

  // Verifica a validação quando os campos estão vazios
  it('deve apresentar erro ao tentar login sem preencher os campos', () => {
    cy.get('input[data-test="login-button"]')
      .click();

    cy.get('.error-message-container')
      .should('be.visible')
      .and('contain', 'Epic sadface: Username is required');
  });

  // Verifica a validação quando o usuário não é informado
  it('deve apresentar erro quando a senha for preenchida sem usuário', () => {
    cy.get('input[data-test="password"]')
      .type('secret_sauce');

    cy.get('input[data-test="login-button"]')
      .click();

    cy.get('.error-message-container')
      .should('be.visible')
      .and('contain', 'Epic sadface: Username is required');
  });

  // Verifica a validação quando a senha não é informada
  it('deve apresentar erro quando o usuário for preenchido sem senha', () => {
    cy.get('input[data-test="username"]')
      .type('standard_user');

    cy.get('input[data-test="login-button"]')
      .click();

    cy.get('.error-message-container')
      .should('be.visible')
      .and('contain', 'Epic sadface: Password is required');
  });
});