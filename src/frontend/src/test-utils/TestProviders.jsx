import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { PokedexProvider } from '../context/PokedexContext'

export function TestProviders({ children, mockState }) {
  return (
    <BrowserRouter>
      <PokedexProvider initialState={mockState}>
        {children}
      </PokedexProvider>
    </BrowserRouter>
  )
}

export function renderWithProviders(ui, { mockState, ...options } = {}) {
  return render(ui, {
    wrapper: ({ children }) => (
      <TestProviders mockState={mockState}>{children}</TestProviders>
    ),
    ...options,
  })
}
