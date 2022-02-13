import faker from 'faker'
import * as Helper from './http-mocks'

export const mockEmailInUseError = (): void =>
  Helper.mockEmailInUseError(/signup/, 'POST', 'signup')

export const mockUnexpectedError = (): void =>
  Helper.mockUnexpectedError(/signup/, 'POST', 'signup')

export const mockSuccess = (): void =>
  Helper.mockSuccess(/signup/, 'POST', 'signup', {
    accessToken: faker.random.word()
  })
