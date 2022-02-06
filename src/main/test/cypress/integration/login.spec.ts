import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl
const xhrRequest = {
  method: 'POST',
  url: /login/
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
    cy.intercept(xhrRequest, {
      statusCode: 401,
      response: {
        error: faker.random.words()
      }
    }).as('login')
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.internet.password(5))
    cy.getByTestId('submit').click()
    cy.wait('@login')
    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'Credenciais inválidas')
    cy.url().should('equal', `${baseUrl}login`)
  })

  it('Should present UnexpectedError on 400', () => {
    cy.intercept(xhrRequest, {
      statusCode: 400,
      response: {
        error: faker.random.words()
      }
    }).as('login')
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.internet.password(5))
    cy.getByTestId('submit').click()
    cy.wait('@login')
    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    cy.url().should('equal', `${baseUrl}login`)
  })

  it('Should save accessToken if valid credentials are provided', () => {
    cy.intercept(xhrRequest, {
      statusCode: 200,
      body: {
        accessToken: faker.random.word()
      }
    }).as('login')
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.wait('@login')
    cy.url().should('equal', `${baseUrl}`)
    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem('accessToken'))
    )
  })

  it('Should prevent multiple submits', () => {
    cy.intercept(xhrRequest, {
      statusCode: 200,
      body: {
        accessToken: faker.random.word()
      }
    }).as('login')
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').dblclick()
    cy.get('@login.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    cy.intercept(xhrRequest, {
      statusCode: 200,
      body: {
        accessToken: faker.random.word()
      }
    }).as('login')
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    cy.get('@login.all').should('have.length', 0)
  })
})
