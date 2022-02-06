import faker from 'faker'

import * as Helper from '../support/http-mocks'

export const mockInvalidCredentialsError = (): void =>
  Helper.mockInvalidCredentialsError(/login/, 'POST', 'login')

export const mockUnexpectedError = (): void =>
  Helper.mockUnexpectedError(/login/, 'POST', 'login')

export const mockSuccess = (): void =>
  Helper.mockSuccess(/login/, 'POST', 'login', {
    accessToken: faker.random.word()
  })
