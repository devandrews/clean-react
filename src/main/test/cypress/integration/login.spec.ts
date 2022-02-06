import faker from 'faker'
import * as Http from './login-mocks'
import * as FormHelper from '../support/form-helper'

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.internet.password(5))
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly')
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🔴')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(4))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🔴')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')
    cy.getByTestId('password').focus().type(faker.internet.password(5))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    Http.mockInvalidCredentialsError()
    simulateValidSubmit()
    cy.wait('@login')
    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'Credenciais inválidas')
    FormHelper.testUrl('login')
  })

  it('Should present UnexpectedError on 400', () => {
    Http.mockUnexpectedError()
    simulateValidSubmit()
    cy.wait('@login')
    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should(
        'contain.text',
        'Algo de errado aconteceu. Tente novamente em breve.'
      )
    FormHelper.testUrl('login')
  })

  it('Should save accessToken if valid credentials are provided', () => {
    Http.mockSuccess()
    simulateValidSubmit()
    cy.wait('@login')
    FormHelper.testUrl('')
    FormHelper.testLocalStorageItem('accessToken')
  })

  it('Should prevent multiple submits', () => {
    Http.mockSuccess()
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').dblclick()
    FormHelper.testHttpCallsCount(1, 'login')
  })

  it('Should not call submit if form is invalid', () => {
    Http.mockSuccess()
    cy.getByTestId('email')
      .focus()
      .type(faker.internet.email())
      .type('{enter}')
    FormHelper.testHttpCallsCount(0, 'login')
  })
})
