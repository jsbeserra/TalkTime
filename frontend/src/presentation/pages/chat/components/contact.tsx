import React from 'react'
import { Circle, Heading, HStack, VStack, Text,Image, Button } from '@chakra-ui/react'

interface IContactUi{
	name:string
	username:string
}
const ContactUi: React.FC <IContactUi>= ({name,username}) => {
	
	return (
		<Button bg='white' padding={2} borderRadius={11} flexDir={'row'} w='100%' h='auto'>
			<Image
				borderRadius='full'
				boxSize='60px'
				marginRight={5}
				src='https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_960_720.jpg'>
			</Image>
			<VStack w='100%' alignItems='flex-start' justifyContent='flex-start'>
				<HStack w='100%' justifyContent='space-between'>
					<Heading fontSize='5xs' fontWeight={'medium'}>{name}</Heading >
					<Text fontSize='14px'>13:28</Text>
				</HStack>
				<HStack w='100%' justifyContent='space-between'>
					<Text textColor="#909294">oi</Text>
					<Circle bg='green' size='20px' color='white' fontSize='14px'>2</Circle>
				</HStack>
			</VStack>
		</Button>

	)
}

export default ContactUi