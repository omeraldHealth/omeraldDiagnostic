import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1440,
    viewportHeight: 746,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
