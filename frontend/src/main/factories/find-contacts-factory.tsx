import React from 'react'
import FindContacts from '@aplication/usecase/find-contacts/find-contact';
import ContactsGateway from '@infra/gateways/contacts/contacts-gateway';
import AxiosAdapter from '@infra/http/http-axios-adpter';
import SearchContacts from '@presentation/components/modals/find-contacts/search-contacts';
import { environment } from '../config/config';

const MakeFindContacts: React.FC = () => {
    const axiosAdapter =  new AxiosAdapter(environment.API_CONTACTS_URL)
    const contactsGateway = new ContactsGateway(axiosAdapter)
    const findContacts = new FindContacts(contactsGateway)
    return <SearchContacts findContactsUsecase={findContacts}/>
}

export default MakeFindContacts;