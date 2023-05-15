import Contact from '@domain/entities/contact'
import React, { createContext, useContext, useState } from 'react'


interface ContactsContextData {
 current:Contact | null
 setCurrentContact(contact:Contact):void
}

const ContactsContext = createContext<ContactsContextData>({} as ContactsContextData)

interface PropsContactsContextProvider {
    children: React.ReactNode
}

export const ContactsProvider: React.FC<PropsContactsContextProvider> = ({ children }) => {
	const [current,setCurrent] = useState<Contact | null>(null)
	const setCurrentContact = (contact:Contact) => {
		setCurrent(contact)
	}
	return (
		<ContactsContext.Provider value={{current, setCurrentContact }}>
			{children}
		</ContactsContext.Provider>
	)
}

export function useContacts(): ContactsContextData {
	const context = useContext(ContactsContext)
	if (!context) throw new Error('useSocket must be used within a SideMenuProvider')
	return context
}