import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

export function TestProviders({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>
}

export function renderWithProviders(ui, options = {}) {
  return render(ui, {
    wrapper: TestProviders,
    ...options,
  })
}
