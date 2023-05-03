import React from 'react'
import ContactsGateway from '@infra/gateways/contacts/contacts-gateway'
import AxiosAdapter from '@infra/http/http-axios-adpter'
import { environment } from '../config/config'
import SessionStorageAdpter from '@infra/SessionStorageAdpter'
import ContentContacts from '@presentation/pages/chat/components/content-contacts'
import ListContacts from '@aplication/usecase/list-contacts/ListContacts'

const MakeContentContacts: React.FC = () => {
	const axiosAdapter = new AxiosAdapter(environment.API_CONTACTS_URL)
	const contactsGateway = new ContactsGateway(axiosAdapter)
	const listContacts = new ListContacts(contactsGateway)
	const sessionStorageAdpter = new SessionStorageAdpter()
	return <ContentContacts listContacts={listContacts} appStorage={sessionStorageAdpter}/>
}

export default MakeContentContacts