import faker from 'faker'
import * as Http from '../support/signup-mocks'
import * as FormHelper from '../support/form-helper'

const simulateValidSubmit = (): void => {
  cy.getByTestId('name').focus().type(faker.random.alphaNumeric(4))
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.internet.password(5))
  cy.getByTestId('submit').click()
}

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readOnly')
    cy.getByTestId('name-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
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
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(2))
    cy.getByTestId('name-status')
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🔴')
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
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('name-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')
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

  it('Should present EmailInUseError on 403', () => {
    Http.mockEmailInUseError()
    simulateValidSubmit()
    cy.wait('@signup')
    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'Email já está sendo utilizado')
    FormHelper.testUrl('signup')
  })

  it('Should present UnexpectedError on 400', () => {
    Http.mockUnexpectedError()
    simulateValidSubmit()
    cy.wait('@signup')
    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should(
        'contain.text',
        'Algo de errado aconteceu. Tente novamente em breve.'
      )
    FormHelper.testUrl('signup')
  })

  it('Should save accessToken if valid credentials are provided', () => {
    Http.mockSuccess()
    simulateValidSubmit()
    cy.wait('@signup')
    FormHelper.testUrl('')
    FormHelper.testLocalStorageItem('accessToken')
  })

  it('Should prevent multiple submits', () => {
    Http.mockSuccess()
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').dblclick()
    FormHelper.testHttpCallsCount(1, 'signup')
  })

  it('Should not call submit if form is invalid', () => {
    Http.mockSuccess()
    cy.getByTestId('email')
      .focus()
      .type(faker.internet.email())
      .type('{enter}')
    cy.getByTestId('password')
      .focus()
      .type(faker.random.alphaNumeric(5))
      .type('{enter}')
    FormHelper.testHttpCallsCount(0, 'signup')
  })
})
