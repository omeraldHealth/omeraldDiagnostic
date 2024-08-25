// cypress/e2e/landing_page_spec.cy.ts

describe('Landing Page Test', () => {
  it('should load the landing page and verify elements', () => {
    // Visit the landing page
    cy.visit('https://diagnostic-omerald-dev.vercel.app/');
    
    // Verify the main heading is visible
    cy.contains('Managing Diagnostic Centre has never been easier').should('be.visible');

    // Verify the navigation links
    cy.contains('About Us').should('be.visible');
    cy.contains('FAQ').should('be.visible');
    cy.contains('Privacy Policy').should('be.visible');

    // Verify the "Sign In" button is visible and clickable
    cy.contains('Sign In').should('be.visible').click();

    // Verify redirection after clicking "Sign In"
    cy.url().should('include', '/signIn');

    // Navigate back to the landing page
    cy.visit('https://diagnostic-omerald-dev.vercel.app/');

    // Verify footer presence (if any)
    cy.get('footer').should('be.visible');

  });
});
