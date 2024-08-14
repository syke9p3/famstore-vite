import { render, screen } from '@testing-library/react'
import App from './App'

it("App component renders with hello world text", () => {
  render(<App />)
  expect(screen.getByText(/Home/i)).toBeInTheDocument()
})


it("App component renders Navbar", () => {
  render(<App />)
  const navbarElement = screen.getByRole("navbar");
  expect(navbarElement).toBeInTheDocument()
})

it("ProductPage correctly calculates price per quantity")