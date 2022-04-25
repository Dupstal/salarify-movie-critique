describe("Add movie test", () => {

  beforeEach(() => {
    cy.visit('/');
  })
  it("should add a movie", () => {
    cy.get('[data-cy="add-movie"]').click();

    cy.get('input[formControlName=name]').type('Star Wars Episode III: Revenge of the Sith');
    cy.get('input[formControlName=year]').type('2005');
    cy.get('input[formControlName=director]').type('George Lucas');
    cy.get('input[formControlName=stars]').type('Hayden Christensen, Natalie Portman, Ewan McGregor');
    cy.get('input[formControlName=writers]').type('George Lucas, John Ostrander, Jan Duursema');
    cy.get('input[formControlName=imgUrl]').type('https://images.justwatch.com/poster/167246309/s718');
    cy.get('textarea[formControlName=review]').type('Three years into the Clone Wars, the Jedi rescue Palpatine from Count Dooku. As Obi-Wan pursues a new threat, Anakin acts as a double agent between the Jedi Council and Palpatine and is lured into a sinister plan to rule the galaxy.');
    cy.get('input[formControlName=directing]').type('4');
    cy.get('input[formControlName=acting]').type('4');
    cy.get('input[formControlName=costumeDesign]').type('5');
    cy.get('input[formControlName=editing]').type('5');
    cy.get('input[formControlName=music]').type('5');
    cy.get('input[formControlName=visualEffects]').type('5');
    cy.get('input[formControlName=screenplay]').type('4');
    
    cy.window().trigger('blur');
    cy.get('[data-cy=save-button]').click();
  });
});