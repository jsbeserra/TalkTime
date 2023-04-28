import { VStack} from '@chakra-ui/react'
import React from 'react'
import Message from './message'


const ContentMessages: React.FC = () => {
	return (
		<VStack flex={1} w='100%' bg='#F6F8FC' overflowY="auto" margin={'0 !important'}>
			<VStack flex={1} w='100%'>
				<Message me={false}/>
				<Message me={true}/>
				<Message me={true}/>
				<Message me={false}/>
				<Message me={false}/>
			</VStack> 
		</VStack> 
	)
}

export default ContentMessages