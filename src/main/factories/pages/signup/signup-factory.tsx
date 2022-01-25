import React from 'react'
import { SignUp } from '@/presentation/pages'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignup: React.FC = () => {
  return (
  <SignUp
    validation={makeSignUpValidation()}
  />
  )
}
