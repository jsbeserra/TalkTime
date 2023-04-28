import { Stack, Text, HStack, CardBody, Image, Card } from '@chakra-ui/react'
import React from 'react'

interface Message {
    me?: boolean
}
const Message: React.FC<Message> = ({ me = true }) => {
	return (
		<HStack p='2' minW='100%' justifyContent={me ? 'flex-end' : 'flex-start'}>
			<Card maxW='sm' bg='#FFFF' boxShadow={'none'}>
				<CardBody>
					<Image
						src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
						alt='Green double couch with wooden legs'
						borderRadius='lg'
					/>
					<Stack mt='6' spacing='3'>
						<Text>
                            This sofa is perfect for modern tropical spaces, baroque inspired
                            spaces, earthy toned spaces and for people who love a chic design with a
                            sprinkle of vintage design.
						</Text>
						<HStack justifyContent={'flex-end'}>
							<Text fontSize={12} color='#8A8C8E'>11:43</Text>
						</HStack>
					</Stack>
				</CardBody>
			</Card>
		</HStack>

	)
}

export default Message