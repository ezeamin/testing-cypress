/// <reference types="cypress" />

describe('US001 - Registro', () => {
  beforeEach(() => {
    cy.visit('https://automationteststore.com/');
  });

  it('TC-ATS-002-01 - Registro exitoso', () => {
    const random = Math.random().toString(36).substring(7);

    cy.get('#customer_menu_top > li > a').click();

    cy.get('button[title=Continue]').click();

    cy.get('#AccountFrm_firstname').type('elsa');

    cy.get('#AccountFrm_lastname').type('pato');

    cy.get('#AccountFrm_email').type(`elsapato${random}@gmail.com`);

    cy.get('#AccountFrm_address_1').type('calle 123');

    cy.get('#AccountFrm_city').type('ciudad');

    cy.get('#AccountFrm_country_id').select('Mexico');

    cy.get('#AccountFrm_zone_id').select('Jalisco');

    cy.get('#AccountFrm_postcode').type('12345');

    cy.get('#AccountFrm_loginname').type(`elsapato-ats-${random}`);

    cy.get('#AccountFrm_password').type('1234Abcd*');

    cy.get('#AccountFrm_confirm').type('1234Abcd*');

    cy.get('#AccountFrm_agree').click();

    cy.get('button[title=Continue]').click();

    cy.get('.maintext').should('contain', 'Your Account Has Been Created!');
  });
});

describe('US002 - Login', () => {
  beforeEach(() => {
    cy.visit('https://automationteststore.com/');
  });

  it('TC-ATS-002-01 - Inicio de sesión exitoso', () => {
    cy.get('#customer_menu_top > li > a').click();

    cy.get('#loginFrm_loginname').type('elsapato-ats');

    cy.get('#loginFrm_password').type('1234Abcd*');

    cy.get('button[title=Login]').click();

    cy.get('.menu_text').should('contain', 'elsa');
  });

  it('TC-ATS-002-02 - Inicio de sesión sin exito', () => {
    cy.get('#customer_menu_top > li > a').click();

    cy.get('#loginFrm_loginname').type('elsapato-ats');

    cy.get('#loginFrm_password').type('1234Abcd');

    cy.get('button[title=Login]').click();

    cy.get('.alert-error').should('be.visible');

    cy.get('.alert-error').should(
      'contain',
      'Error: Incorrect login or password provided.',
    );
  });
});

describe('US003 - Llenar el carrito', () => {
  beforeEach(() => {
    cy.visit('https://automationteststore.com/');
  });

  it('TC-ATS-003-01 - Agregar producto al carrito', () => {
    cy.get('#customer_menu_top > li > a').click();

    cy.get('#loginFrm_loginname').type('elsapato-ats');

    cy.get('#loginFrm_password').type('1234Abcd*');

    cy.get('button[title=Login]').click();

    cy.get('.menu_text').should('contain', 'elsa');

    cy.get('#categorymenu > nav > ul > li:nth-child(4) > a').click();

    cy.get(
      '#maincontainer > div > div > div > div > div.thumbnails.grid.row.list-inline > div:nth-child(2) > div.thumbnail > div.pricetag.jumbotron > a',
    ).click();

    cy.get(
      'body > div > header > div.container-fluid > div > div.block_7 > ul > li > a > span.label.label-orange.font14',
    ).should('contain', '1');
  });

  it('TC-ATS-003-02 - Eliminar producto del carrito', () => {
    cy.get('#customer_menu_top > li > a').click();

    cy.get('#loginFrm_loginname').type('elsapato-ats');

    cy.get('#loginFrm_password').type('1234Abcd*');

    cy.get('button[title=Login]').click();

    cy.get('.menu_text').should('contain', 'elsa');

    cy.get('#categorymenu > nav > ul > li:nth-child(4) > a').click();

    cy.get(
      '#maincontainer > div > div > div > div > div.thumbnails.grid.row.list-inline > div:nth-child(2) > div.thumbnail > div.pricetag.jumbotron > a',
    ).click();

    cy.get(
      'body > div > header > div.container-fluid > div > div.block_7 > ul > li > a',
    ).click();

    cy.get(
      '#cart > div > div.container-fluid.cart-info.product-list > table > tbody > tr:nth-child(2) > td:nth-child(7) > a',
    ).click();

    cy.get('#maincontainer > div > div > div > div').should(
      'contain',
      'Your shopping cart is empty!',
    );
  });
});

describe('US004 - Compra', () => {
  beforeEach(() => {
    cy.visit('https://automationteststore.com/');
  });

  it('TC-ATS-004-01 - Realizar compra', () => {
    cy.get('#customer_menu_top > li > a').click();

    cy.get('#loginFrm_loginname').type('elsapato-ats');

    cy.get('#loginFrm_password').type('1234Abcd*');

    cy.get('button[title=Login]').click();

    cy.get('.menu_text').should('contain', 'elsa');

    cy.get('#categorymenu > nav > ul > li:nth-child(4) > a').click();

    cy.get(
      '#maincontainer > div > div > div > div > div.thumbnails.grid.row.list-inline > div:nth-child(2) > div.thumbnail > div.pricetag.jumbotron > a',
    ).click();

    cy.get(
      'body > div > header > div.container-fluid > div > div.block_7 > ul > li > a',
    ).click();

    cy.get('#cart_checkout1').click();

    cy.get('#checkout_btn').click();

    cy.get('.maintext').should('contain', 'Your Order Has Been Processed!');
  });
});
