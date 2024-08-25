// cypress/e2e/navigate_to_signin.cy.ts

describe('Navigate to Sign In Page', () => {
    it('should navigate to the Sign In page and verify elements', () => {
      // Visit the landing page
      cy.visit('https://diagnostic-omerald-dev.vercel.app/');
  
      // Click on the "Sign In" button
      cy.contains('Sign In').click();
  
      // Verify that the URL includes "/signIn"
      cy.url().should('include', '/signIn');
  
      // Verify the presence of the phone number input field
      cy.get('input[name="identifier"]').should('be.visible');
  
      // Verify the presence of the submit button
    //   cy.get('button[type="submit"]').should('contain.text', 'Submit').and('be.visible');
  
    });
  });
  