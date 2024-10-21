/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(identity: string, password: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', (identity, password) => {
  let token = ''
  cy.session([identity, password], () => {
    cy.visit('/login')
    cy.get('[data-test=username]').type(identity)
    cy.get('[data-test=password]').type(password)

    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/login',
      body: {
        identity,
        password
      }
    })
      .its('body')
      .then((body) => {
        token = body.data
        window.localStorage.setItem('token', token)
      })
    // our auth cookie should be present
    cy.getAllLocalStorage().then((result) => {
      expect(result).to.deep.equal({
        '127.0.0.1': {
          token
        }
      })
    })
  })
})

export {}
