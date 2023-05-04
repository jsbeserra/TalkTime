import { UseCase } from '@aplication/usecase/use-case'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, Divider, ModalFooter, Button, useDisclosure } from '@chakra-ui/react'
import { AppStorage } from '@domain/appStorage'
import { useSideMenu } from '@main/context/side-menu-context'
import React, { useCallback, useEffect, useState } from 'react'
import InviteItem from './components/invite-item'
import { invite } from '@domain/entities/invite'

interface INotifications {
    listInvites:UseCase
    appStorage: AppStorage
}

const Notifications: React.FC <INotifications>= ({listInvites,appStorage}) => {
	const { isOpen,onOpen, onClose } = useDisclosure()
	const {isopenNotifications,openNotifications} = useSideMenu()
	const [invites,setInvites] = useState<invite[]>([])

	const closeModal = () => {
		openNotifications(false)
		onClose()
	}

	useEffect(() => {
		if (isopenNotifications) {
			findInvites()
			onOpen()
		}
	}, [isopenNotifications])
    
	const findInvites = useCallback(async () => {
		const ownerUsername = appStorage.getUser().username
		const usersList = await listInvites.handle(ownerUsername)
		if (usersList.isRight()) setInvites(usersList.value)
	}, [])

	return (
		<Modal isCentered isOpen={isOpen} onClose={closeModal}>
			<ModalOverlay
				bg="blackAlpha.300"
				backdropFilter="blur(10px) hue-rotate(90deg)"
			/>
			<ModalContent>
				<ModalHeader>Notificações</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack>
						<Divider />
						<VStack h={400} w={'100%'} spacing="4" p="5" overflowY="auto">
							{invites.map(e=> <InviteItem key={e.targuet_username} username={e.targuet_username} name={e.targuet_name} />)}  
						</VStack>
					</VStack>
				</ModalBody>
				<ModalFooter>
					<Button onClick={closeModal}>Close</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default Notifications