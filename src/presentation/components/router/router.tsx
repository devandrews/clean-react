import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type Props = {
  makeLogin: Function
  makeSignup: Function
}

const Router: React.FC<Props> = ({ makeLogin, makeSignup }: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={makeLogin()} />
        <Route path="/signup" element={makeSignup()} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
