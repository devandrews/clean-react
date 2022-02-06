const baseUrl: string = Cypress.config().baseUrl

export const testHttpCallsCount = (count: number, alias: string): void => {
  cy.get(`@${alias}.all`).should('have.length', count)
}

export const testUrl = (path: string): void => {
  cy.url().should('equal', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (key: string): void => {
  cy.window().then((window) =>
    assert.isOk(window.localStorage.getItem(key))
  )
}
