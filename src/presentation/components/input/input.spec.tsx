import React from 'react'
import { render } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'

describe('Input Component', () => {
  test('shoud begin with readOnly', () => {
    const { getByTestId } = render(
      <Context.Provider value={{ state: {} }}>
        <Input name="input" />
      </Context.Provider>
    )
    const input = getByTestId('input') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
