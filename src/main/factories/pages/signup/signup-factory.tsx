import React from 'react'
import { SignUp } from '@/presentation/pages'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '@/main/factories/usecases/remote-add-account/remote-add-account'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'

export const makeSignup: React.FC = () => {
  return (
  <SignUp
    validation={makeSignUpValidation()}
    addAccount={makeRemoteAddAccount()}
    saveAccessToken={makeLocalSaveAccessToken()}
  />
  )
}
