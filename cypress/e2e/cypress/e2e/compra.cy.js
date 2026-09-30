describe('Fluxo de compra', () => {
    beforeEach(() => {
        // Acessa o catálogo com um usuário válido antes do teste
        cy.visit('/');
        cy.login('standard_user', 'secret_sauce');
    });

    // Valida a compra de dois produtos até a confirmação do pedido
    it('deve realizar uma compra completa com dois produtos', () => {
        // Adiciona os produtos ao carrinho
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
            .should('be.visible')
            .click();

        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
            .should('be.visible')
            .click();

        // Confirma que os dois produtos foram adicionados
        cy.get('[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('have.text', '2');

        // Abre o carrinho e valida os produtos
        cy.get('[data-test="shopping-cart-link"]')
            .should('be.visible')
            .click();

        cy.url().should('include', '/cart.html');

        cy.contains('.inventory_item_name', 'Sauce Labs Bike Light')
            .should('be.visible');

        cy.contains('.inventory_item_price', '$9.99')
            .should('be.visible');

        cy.contains('.inventory_item_name', 'Sauce Labs Bolt T-Shirt')
            .should('be.visible');

        cy.contains('.inventory_item_price', '$15.99')
            .should('be.visible');

        // Inicia o checkout e preenche os dados do comprador
        cy.get('[data-test="checkout"]')
            .should('be.visible')
            .click();

        cy.url().should('include', '/checkout-step-one.html');

        cy.get('[data-test="firstName"]')
            .should('be.visible')
            .type('Isabella')
            .should('have.value', 'Isabella');

        cy.get('[data-test="lastName"]')
            .should('be.visible')
            .type('Henriques')
            .should('have.value', 'Henriques');

        cy.get('[data-test="postalCode"]')
            .should('be.visible')
            .type('30110-000')
            .should('have.value', '30110-000');

        // Avança para o resumo e valida os produtos do pedido
        cy.get('[data-test="continue"]')
            .should('be.visible')
            .click();

        cy.url().should('include', '/checkout-step-two.html');

        cy.contains('.inventory_item_name', 'Sauce Labs Bike Light')
            .should('be.visible');

        cy.contains('.inventory_item_price', '$9.99')
            .should('be.visible');

        cy.contains('.inventory_item_name', 'Sauce Labs Bolt T-Shirt')
            .should('be.visible');

        cy.contains('.inventory_item_price', '$15.99')
            .should('be.visible');

        // Finaliza a compra e valida a mensagem de confirmação
        cy.get('[data-test="finish"]')
            .should('be.visible')
            .click();

        cy.url().should('include', '/checkout-complete.html');

        cy.get('[data-test="complete-header"]')
            .should('be.visible')
            .and('have.text', 'Thank you for your order!');
    });

    
});