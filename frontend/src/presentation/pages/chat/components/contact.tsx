import React from 'react'
import { Circle, Heading, HStack, VStack, Text,Image } from '@chakra-ui/react'

const Contact: React.FC = () => {
	return (
		<HStack bg='white' padding={2} borderRadius={11} flexDir={'row'} w='100%'>
			<Image
				borderRadius='full'
				boxSize='60px'
				src='https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_960_720.jpg'>
			</Image>
			<VStack w='100%' alignItems='flex-start' justifyContent='flex-start'>
				<HStack w='100%' justifyContent='space-between'>
					<Heading fontSize='5xs' fontWeight={'medium'}>Fake name</Heading >
					<Text fontSize='14px'>13:28</Text>
				</HStack>
				<HStack w='100%' justifyContent='space-between'>
					<Text textColor="#909294">oi</Text>
					<Circle bg='green' size='20px' color='white' fontSize='14px'>2</Circle>
				</HStack>
			</VStack>
		</HStack>
	)
}

export default Contact