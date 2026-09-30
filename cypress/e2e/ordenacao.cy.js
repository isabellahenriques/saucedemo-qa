describe('Ordenação dos produtos', () => {
    beforeEach(() => {
        // Acessa o catálogo com um usuário válido antes de cada teste
        cy.visit('/');
        cy.login('standard_user', 'secret_sauce');
    });

    // Verifica a ordenação dos preços do menor para o maior
    it('deve ordenar os produtos por preço do menor para o maior', () => {
        cy.selecionarOrdenacao('lohi');

        // Obtém os preços exibidos e converte os valores para números
        cy.get('[data-test="inventory-item-price"]')
            .then(($precos) => {
                const precos = [...$precos].map((elemento) => {
                    return Number(elemento.innerText.replace('$', '').trim());
                });

                // Compara a ordem exibida com a ordem numérica crescente
                const precosOrdenados = [...precos].sort((a, b) => a - b);

                expect(precos).to.deep.equal(precosOrdenados);
            });
    });

    // Verifica a ordenação dos preços do maior para o menor
    it('deve ordenar os produtos por preço do maior para o menor', () => {
        cy.selecionarOrdenacao('hilo');

        // Obtém os preços exibidos e converte os valores para números
        cy.get('[data-test="inventory-item-price"]')
            .then(($precos) => {
                const precos = [...$precos].map((elemento) => {
                    return Number(elemento.innerText.replace('$', '').trim());
                });

                // Compara a ordem exibida com a ordem numérica decrescente
                const precosOrdenados = [...precos].sort((a, b) => b - a);

                expect(precos).to.deep.equal(precosOrdenados);
            });
    });

    // Verifica a ordenação dos nomes de A a Z
    it('deve ordenar os produtos por nome de A a Z', () => {
        cy.selecionarOrdenacao('az');

        // Obtém os nomes dos produtos exibidos
        cy.get('[data-test="inventory-item-name"]')
            .then(($nomes) => {
                const nomes = [...$nomes].map((elemento) => {
                    return elemento.innerText.trim();
                });

                // Compara a ordem exibida com a ordem alfabética crescente
                const nomesOrdenados = [...nomes].sort((a, b) => {
                    return a.localeCompare(b);
                });

                expect(nomes).to.deep.equal(nomesOrdenados);
            });
    });

    // Verifica a ordenação dos nomes de Z a A
    it('deve ordenar os produtos por nome de Z a A', () => {
        cy.selecionarOrdenacao('za');

        // Obtém os nomes dos produtos exibidos
        cy.get('[data-test="inventory-item-name"]')
            .then(($nomes) => {
                const nomes = [...$nomes].map((elemento) => {
                    return elemento.innerText.trim();
                });

                // Compara a ordem exibida com a ordem alfabética decrescente
                const nomesOrdenados = [...nomes].sort((a, b) => {
                    return b.localeCompare(a);
                });

                expect(nomes).to.deep.equal(nomesOrdenados);
            });
    });
});