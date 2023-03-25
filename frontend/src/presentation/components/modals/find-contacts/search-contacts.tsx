import React, { useCallback, useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, Text, ModalOverlay, Input, Divider, VStack } from '@chakra-ui/react';
import ContactButton from './components/contact';
import Contact from '../../../../domain/entities/contact';
import FindContacts from '../../../../aplication/usecase/find-contacts/find-contact';
import { useSearchContacts } from '../../../../main/context/search-contacts-context';

interface ISearchContacts {
    findContactsUsecase: FindContacts
    // addContactsUsecase:UseCase
}
const SearchContacts: React.FC<ISearchContacts> = ({ findContactsUsecase }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [users, setUsers] = useState<Contact[]>([])
    const { visible, toogle } = useSearchContacts()
    const closeModal = () => {
        toogle(false)
        onClose()
    }
    useEffect(() => {
        if (visible) onOpen()
        setUsers([])
    }, [visible])

    const findUsers = useCallback(async (identifier: string) => {
        const usersList = await findContactsUsecase.handle(identifier)
        if (usersList.isRight()) setUsers(usersList.value)
    }, [])

    return (
        <Modal isCentered isOpen={isOpen} onClose={closeModal}>
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px) hue-rotate(90deg)'
            />
            <ModalContent>
                <ModalHeader>Buscar contatos</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack >
                        <Input variant='filled' placeholder='Buscar...' onKeyUp={(value) => findUsers(value.currentTarget.value)} />
                        <Divider />
                        <VStack h={400} w={"100%"} spacing='4' p='5' overflowY="auto">
                            {users.map(user => <ContactButton name={user.name} email={user.email} username={user.username} key={user.id} />)}
                        </VStack>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={closeModal}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default SearchContacts;