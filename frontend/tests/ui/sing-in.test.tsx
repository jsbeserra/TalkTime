import { render } from "@testing-library/react"
import MakeSingIn from '../../src/main/factories/sing-in-factory'
import React from "react"
import  userEvent  from "@testing-library/user-event"

describe('SingIn', () => {
   test('Deve criar um componente de login', () => {
      const { getByText, getByPlaceholderText } = render(<MakeSingIn />)
      expect(getByText('BEM VINDO')).toBeInTheDocument()
      expect(getByText('Entrar')).toBeInTheDocument() 
      expect(getByPlaceholderText('Email')).toBeInTheDocument() 
      expect(getByPlaceholderText('Password')).toBeInTheDocument()  
      expect(getByText('Login')).toBeInTheDocument()   
   })

   test('Deve exibir e-mail invalido se o e-mail digitado não respeitar o formato de e-mail', () => {
      const { getByText, getByPlaceholderText } = render(<MakeSingIn />)
      const btn_login = getByText('Login')
      const input_password = getByPlaceholderText('Password')
      userEvent.type(input_password,"a")
      userEvent.click(btn_login)
      console.log(getByText('Campo obrigatório'))
      expect(getByText('Campo obrigatório')).toBeInTheDocument() 
   })
})