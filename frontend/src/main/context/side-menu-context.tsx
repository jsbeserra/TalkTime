import React, { createContext, useContext } from 'react'
import { useState } from 'react'

interface SideMenuContextData {
    openContentContacts(value: boolean): void;
    isOpenContentContacts: boolean
}

const SideMenuContext = createContext<SideMenuContextData>({} as SideMenuContextData)

interface PropsSideMenuContextProvider {
    children: React.ReactNode
}

export const SideMenuProvider: React.FC<PropsSideMenuContextProvider> = ({ children }) => {
	const [isOpenContentContacts, setIsOpenContentContacts] = useState<boolean>(true)

	const openContentContacts = (value = false) =>{
		setIsOpenContentContacts(value)
	}

	return (
		<SideMenuContext.Provider value={{ openContentContacts, isOpenContentContacts }}>
			{children}
		</SideMenuContext.Provider>
	)
}

export function useSideMenu(): SideMenuContextData {
	const context = useContext(SideMenuContext)
	if (!context) throw new Error('useSideMenu must be used within a SideMenuProvider')
	return context
}