import * as Helper from './http-mocks'

export const mockEmailInUseError = (): void =>
  Helper.mockEmailInUseError(/signup/, 'POST', 'signup')

export const mockUnexpectedError = (): void =>
  Helper.mockUnexpectedError(/signup/, 'POST', 'signup')
