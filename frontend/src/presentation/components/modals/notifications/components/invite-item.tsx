import React from 'react'
import { Heading, HStack, VStack, Image, Button } from '@chakra-ui/react'
import { BsCheckCircleFill } from 'react-icons/bs'
import {FcCancel} from 'react-icons/fc'


interface IInviteItem {
    name:string
    username:string
}

const InviteItem: React.FC<IInviteItem> = ({ name, username }) => {
	
	return (
		<HStack bg='white' padding={2} borderRadius={11} flexDir={'row'} w='100%'>
			<Image
				borderRadius='full'
				boxSize='60px'
				src='https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_960_720.jpg'>
			</Image>
			<HStack w='100%' alignItems='center' justifyContent='flex-start'>
				<VStack w='100%' justifyContent='space-between' alignItems='flex-start'>
					<Heading fontSize='5xs' fontWeight={'medium'}>{name} ({username})</Heading >
					<Heading fontSize='sm' fontWeight={'light'}>Convite de amizade</Heading >
				</VStack>
			</HStack>
			<Button disabled={true}>
				<BsCheckCircleFill size={30} color="#008000"/>
			</Button>
			<Button disabled={true}>
				<FcCancel size={30} color="#008000"/>
			</Button>
		</HStack>
	)
}

export default InviteItem