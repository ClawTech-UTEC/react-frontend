import { render, screen } from '@testing-library/react';
import App from './App';

test('test pantalla login', () => {
  render(<App />);
 // const titulo = screen.getByText("Login");
 // expect(titulo).toBeInTheDocument();
  const emailInput = screen.getByText("Email");
  expect(emailInput).toBeInTheDocument();
  const passordInput = screen.getByText("Password");
  expect(passordInput).toBeInTheDocument();
});
