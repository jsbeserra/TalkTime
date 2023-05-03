import React from 'react'
import FindContacts from '@aplication/usecase/find-contacts/find-contact'
import ContactsGateway from '@infra/gateways/contacts/contacts-gateway'
import AxiosAdapter from '@infra/http/http-axios-adpter'
import SearchContacts from '@presentation/components/modals/find-contacts/search-contacts'
import { environment } from '../config/config'
import SendInviteContact from '@aplication/usecase/send-invite-contact/send-invite-contact'
import SessionStorageAdpter from '@infra/SessionStorageAdpter'

const MakeSearchContacts: React.FC = () => {
	const axiosAdapter = new AxiosAdapter(environment.API_CONTACTS_URL)
	const contactsGateway = new ContactsGateway(axiosAdapter)
	const findContacts = new FindContacts(contactsGateway)
	const sendInviteContact = new SendInviteContact(contactsGateway)
	const sessionStorageAdpter = new SessionStorageAdpter()
	return <SearchContacts findContactsUsecase={findContacts} inviteContactUsecase={sendInviteContact} appStorage={sessionStorageAdpter}/>
}

export default MakeSearchContacts