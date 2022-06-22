describe('constructor page', () => {
  it('create and send order', () => {
    cy.visit('/');

    cy.get('.bun li:first-of-type').trigger('dragstart').trigger('dragleave');

    cy.get('.constructor_section')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend');

    cy.get('main li').each((item) => {
      cy.get(item).trigger('dragstart').trigger('dragleave');
      cy.get('.constructor_section')
        .trigger('dragenter')
        .trigger('dragover')
        .trigger('drop')
        .trigger('dragend');
    });

    cy.get('.button_wrap button').click();

    cy.get('.login_form_wrap input[type="email"]').type('al.tulin@gmail.com');
    cy.get('.login_form_wrap input[type="password"]').type(1);
    cy.get('.login_button_wrap').click();

    cy.get('.button_wrap button').click();

    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders').as(
      'order',
    );

    cy.wait('@order').then((response) => {
      cy.get('.order_details_number').should(
        'have.text',
        response.response.body.order.number,
      );
    });
  });

  it('visit page ingridients', () => {
    cy.visit('/');

    cy.get('.burger_item_card')
      .then(($li) => {
        const items = $li.toArray();
        return Cypress._.sample(items);
      })
      .then(($li) => {
        // cy.log($li);
        cy.get($li)
          .find('a')
          .should('have.attr', 'href')
          .then((href) => {
            cy.visit(href);
          });
      });
  });

  it('visit page ingridients', () => {
    cy.visit('/');

    cy.get('.burger_item_card')
      .then(($li) => {
        const items = $li.toArray();
        return Cypress._.sample(items);
      })
      .then(($li) => {
        cy.get($li)
          .find('a')
          .click()
          .then(($el) => {
            cy.url().should(
              'include',
              Cypress.config().baseUrl + $el.attr('href'),
            );
          });
      });
  });
});
