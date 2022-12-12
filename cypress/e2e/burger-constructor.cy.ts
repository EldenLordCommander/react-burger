/// <reference types="cypress" />

describe('Проект работает', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('Открыть модальное окно с ингредиентом', function ()  {
    cy.visit('http://localhost:3000');

    cy.get('#60d3b41abdacab0026a733c7').click();
    cy.get('#modal_form').contains('Детали ингридиента');
    cy.get('#modal_form').contains('Флюоресцентная булка R2-D3');
    cy.get('#modal_form').contains('Калории, ккал');
    cy.get('#modal_form').contains('Белки, г');
    cy.get('#modal_form').contains('Жиры, г');
    cy.get('#modal_form').contains('Углеводы, г');
    cy.get('#modal_form').contains('643');
    cy.get('#modal_form').contains('44');
    cy.get('#modal_form').contains('26');
    cy.get('#modal_form').contains('85').wait(5000);
    cy.get('#divCloseModalWindow').click();
    cy.get('#modal_form').should('not.exist');
  });

  const dt = new DataTransfer();

  it('dnd и создание заказа', function () {
    cy.visit('http://localhost:3000');
    
    cy.get('#60d3b41abdacab0026a733c7').trigger("dragstart", {dt});
    cy.get('#constructorToDrop').trigger("drop", {dt});

    cy.get('#60d3b41abdacab0026a733cd').trigger("dragstart", {dt});
    cy.get('#constructorToDrop').trigger("drop", {dt});
    cy.get('#btnCreateOrder').click();

    cy.get('input[type="email"]').type('test5@gmail.com');
    cy.get('input[type="password"]').type('12');
    cy.get('#btnLogin').click().wait(5000);
    cy.get('#btnCreateOrder').click().wait(20000);

    cy.get('#modal_form').contains('Идентификатор заказа');
    cy.get('#modal_form').contains('Ваш заказ начали готовить');
    cy.get('#modal_form').contains('Дождитесь готовности на орбитальной станции').wait(5000);;
    cy.get('#divCloseModalWindow').click();
    cy.get('#modal_form').should('not.exist');
  });

});

