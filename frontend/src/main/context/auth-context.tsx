import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'

interface AuthContextData {
    authenticate(value: boolean): void;
    authenticated: boolean;
	name?: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface PropsAuthProvider {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<PropsAuthProvider> = ({ children }) => {
	const [authenticated, setAuthenticated] = useState<boolean>(false)
	const [name,setname] = useState<string>()

	useEffect(()=>{
		hasAuthenticated()
	},[])
	useEffect(()=>{
		if (authenticated == true) hasAuthenticated()
	},[authenticated])
	const authenticate = (value = false) =>{
		setAuthenticated(value)
	}
	const hasAuthenticated = () => {
		const token = sessionStorage.getItem('token')
		const nameuser =sessionStorage.getItem('name')
		const username =sessionStorage.getItem('username')
		const email =sessionStorage.getItem('email')
		if (nameuser) setname(nameuser)
		if (token && username && username && email) setAuthenticated(true)
	}
	return (
		<AuthContext.Provider value={{ authenticate, authenticated, name }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth(): AuthContextData {
	const context = useContext(AuthContext)
	if (!context) throw new Error('useAuth must be used within a AuthProvider')
	return context
}