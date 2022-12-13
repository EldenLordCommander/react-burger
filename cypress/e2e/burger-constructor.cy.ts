/// <reference types="cypress" />

describe('Проект работает', function () {
  before(function () {
    cy.visit('');
  });

  it('Открыть модальное окно с ингредиентом', function ()  {
    cy.visit('');

    cy.get('#60d3b41abdacab0026a733c7').click();
    cy.get('#modal_form').as('modal');
    cy.get('@modal').contains('Детали ингридиента');
    cy.get('@modal').contains('Флюоресцентная булка R2-D3');
    cy.get('@modal').contains('Калории, ккал');
    cy.get('@modal').contains('Белки, г');
    cy.get('@modal').contains('Жиры, г');
    cy.get('@modal').contains('Углеводы, г');
    cy.get('@modal').contains('643');
    cy.get('@modal').contains('44');
    cy.get('@modal').contains('26');
    cy.get('@modal').contains('85').wait(5000);
    cy.get('#divCloseModalWindow').click();
    cy.get('@modal').should('not.exist');
  });

  const dt = new DataTransfer();

  it('dnd и создание заказа', function () {
    cy.visit('');
    
    cy.get('#60d3b41abdacab0026a733c7').trigger("dragstart", {dt});
    cy.get('#constructorToDrop').trigger("drop", {dt});

    cy.get('#60d3b41abdacab0026a733cd').trigger("dragstart", {dt});
    cy.get('#constructorToDrop').trigger("drop", {dt});
    cy.get('#btnCreateOrder').click();

    cy.get('input[type="email"]').type('test5@gmail.com');
    cy.get('input[type="password"]').type('12');
    cy.get('#btnLogin').click().wait(5000);
    cy.get('#btnCreateOrder').click().wait(20000);

    cy.get('#modal_form').as('modal');
    cy.get('@modal').contains('Идентификатор заказа');
    cy.get('@modal').contains('Ваш заказ начали готовить');
    cy.get('@modal').contains('Дождитесь готовности на орбитальной станции').wait(5000);;
    cy.get('#divCloseModalWindow').click();
    cy.get('@modal').should('not.exist');
  });

});

