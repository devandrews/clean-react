import faker from 'faker'

export const mockInvalidCredentialsError = (url: RegExp, method: string, alias: string): void => {
  cy.intercept({
    method,
    url
  }, {
    statusCode: 401,
    response: {
      error: faker.random.words()
    }
  }).as(alias)
}

export const mockEmailInUseError = (url: RegExp, method: string, alias: string): void => {
  cy.intercept({
    method,
    url
  }, {
    statusCode: 403,
    response: {
      error: faker.random.words()
    }
  }).as(alias)
}

export const mockUnexpectedError = (url: RegExp, method: string, alias: string): void => {
  cy.intercept({
    method,
    url
  }, {
    statusCode: faker.helpers.randomize([400, 404, 500]),
    response: {
      error: faker.random.words()
    }
  }).as(alias)
}

export const mockSuccess = (url: RegExp, method: string, alias: string, body: any): void => {
  cy.intercept({
    method,
    url
  }, {
    statusCode: 200,
    body
  }).as(alias)
}
