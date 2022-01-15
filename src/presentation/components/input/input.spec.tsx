import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name="input" />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  test('shoud begin with readOnly', () => {
    const sut = makeSut()
    const input = sut.getByTestId('input') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
