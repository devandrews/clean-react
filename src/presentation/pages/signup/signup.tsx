import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './signup-styles.scss'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

type Props = {}

const SignUp: React.FC<Props> = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={ { state: {} }}>
        <form data-testid="form" className={Styles.form}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button data-testid="submit"className={Styles.submit} type="submit">Entrar</button>
          <Link data-testid="signup" to="/login" className={Styles.link}>Voltar para o Login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
