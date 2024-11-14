declare global {
  namespace Cypress {
    interface Chainable {
      navigateTo(page: string): Chainable<void>;
    }
  }
}
