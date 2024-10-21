// https://on.cypress.io/api

describe('User account page', () => {
  beforeEach(() => {
    cy.login('user1', 'p4ssw0rd123')
  })

  it('should actually be accessible', () => {
    cy.visit('/')
  })

  it('should have the correct page title', () => {
    cy.visit('/')
    cy.title().should('eq', 'Dashboard')
  })
})
