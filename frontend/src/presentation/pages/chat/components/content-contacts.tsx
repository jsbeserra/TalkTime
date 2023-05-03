import React, { useCallback, useEffect, useState } from 'react'
import { VStack } from '@chakra-ui/react'
import ContactUi from './contact'
import { UseCase } from '@aplication/usecase/use-case'
import { AppStorage } from '@domain/appStorage'
import Contact from '@domain/entities/contact'

interface IContentContacts {
    listContacts:UseCase
    appStorage: AppStorage
}
const ContentContacts: React.FC<IContentContacts> = ({ listContacts,appStorage }) => {
	const [contacts,setContacts] = useState<Contact[]>([])
	const ownerUsername = appStorage.getUser().username
	const getContacts = async() => {
		const contacts = await listContacts.handle(ownerUsername)
		setContacts(contacts.value)
		console.log(contacts.value)
	}
	useEffect(()=>{
		getContacts()
	},[])

	return (
		<VStack w='100%' spacing='4' p='5' overflowY="auto">
			{contacts.map(contact => <ContactUi key={contact.username} name={contact.name} username={contact.username} />)}	
		</VStack>
	)
}

export default ContentContacts