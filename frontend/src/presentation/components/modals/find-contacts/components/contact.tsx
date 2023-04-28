import { Heading, HStack, VStack, Image, Button } from '@chakra-ui/react'
import React from 'react'
import { IoMdPersonAdd } from 'react-icons/io'

interface IContactButton {
    name: string,
    username: string,
    email: string
}
const ContactButton: React.FC<IContactButton> = ({ email, name, username }) => {
	return (
		<HStack bg='white' padding={2} borderRadius={11} flexDir={'row'} w='100%'>
			<Image
				borderRadius='full'
				boxSize='60px'
				src='https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_960_720.jpg'>
			</Image>
			<HStack w='100%' alignItems='center' justifyContent='flex-start'>
				<VStack w='100%' justifyContent='space-between' alignItems='flex-start'>
					<Heading fontSize='5xs' fontWeight={'medium'}>{name}</Heading >
					<Heading fontSize='sm' fontWeight={'light'}>{username}</Heading >
					<Heading fontSize='sm' fontWeight={'light'}>{email}</Heading >
				</VStack>
				<Button>
					<IoMdPersonAdd size={25} color="#008000"/>
				</Button>
			</HStack>
		</HStack>
	)
}

export default ContactButton