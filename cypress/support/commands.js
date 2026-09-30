// Realiza o login e valida o acesso ao catálogo
Cypress.Commands.add('login', (usuario, senha) => {
    // Preenche o campo de usuário
    cy.get('input[data-test="username"]')
        .should('be.visible')
        .type(usuario);

    // Preenche o campo de senha
    cy.get('input[data-test="password"]')
        .should('be.visible')
        .type(senha);

    // Envia o formulário de login
    cy.get('input[data-test="login-button"]')
        .should('be.visible')
        .click();

    // Confirma o redirecionamento para o catálogo
    cy.url().should('include', '/inventory.html');
});

// Seleciona uma opção no filtro de ordenação dos produtos
Cypress.Commands.add('selecionarOrdenacao', (opcao) => {
    cy.get('select[data-test="product-sort-container"]')
        .select(opcao);
});