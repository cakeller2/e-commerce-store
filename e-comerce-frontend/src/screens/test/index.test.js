import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Index from '../SignIn/index'

describe('Index Component', () => {
  it('should render loading message when loading state is true', () => {
    // Arrange
    const { getByText } = render(Index)
    
    // Act
    
    // Assert
    const loadingMessage = getByText('Loading.....')
    expect(loadingMessage).toBeInTheDocument()
  })

  it('should call replace when the form is submitted with valid email and password', () => {
    // Arrange
    const { getByPlaceholderText, getByText } = render(Index)
    const emailInput = getByPlaceholderText('Your email..')
    const passwordInput = getByPlaceholderText('Your Password..')
    const signInButton = getByText('Sign in')

    // Act
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(signInButton)

    // Assert
    // Add assertion for calling replace function
  })

  it('should not call replace when the form is submitted with invalid email and password', () => {
    // Arrange
    const { getByPlaceholderText, getByText } = render(Index)
    const emailInput = getByPlaceholderText('Your email..')
    const passwordInput = getByPlaceholderText('Your Password..')
    const signInButton = getByText('Sign in')

    // Act
    fireEvent.change(emailInput, { target: { value: 'te' } })
    fireEvent.change(passwordInput, { target: { value: 'pw' } })
    fireEvent.click(signInButton)

    // Assert
    // Add assertion for not calling replace function
  })

  it('should set token in local storage when API call is successful', async () => {
    // Arrange
    // Mock the fetch API and test the behavior
    
    // Act
    
    // Assert
  })
})