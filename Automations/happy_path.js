describe('Donut Shop Tests', () => {
    beforeEach(() => {
      cy.visit('https://just-krispy.github.io/The-Donut-Shop/rl');
    });
  
    it('tests the initial prompt', () => {
      cy.get('#user-input').type('{enter}');
      cy.get('#chat-container h1').should('exist');
    });
  
    it('tests invalid choices', () => {
      cy.get('#user-input').type('invalid_choice{enter}');
      cy.get('#chat-container .system-message').should('exist');
    });
  
    it('tests existing order', () => {
      cy.get('#user-input').type('existing{enter}');
      cy.get('#user-input').type('John Doe{enter}');
      cy.get('#chat-container .system-message').should('exist');
    });
  
    it('tests sprinkle animation', () => {
      cy.get('#user-input').type('new{enter}');
      cy.get('#user-input').type('John Doe{enter}');
      cy.get('#user-input').type('john.doe@example.com{enter}');
      cy.get('#user-input').type('1234567890{enter}');
      cy.get('#user-input').type('y{enter}');
      cy.get('#user-input').type('Chocolate{enter}');
      cy.get('#user-input').type('3{enter}');
      cy.get('#user-input').type('done{enter}');
    });
  });
  