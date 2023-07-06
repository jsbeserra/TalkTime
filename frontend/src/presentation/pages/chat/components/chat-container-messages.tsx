import React, { useEffect, useRef, useLayoutEffect } from 'react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { HStack, Button, Divider, Input, InputGroup, InputRightElement, VStack, Box } from '@chakra-ui/react'
import {useSocket} from '@main/context/socket-context'
import HeaderCurrentChat from './header-current-chat'
import { store, useAppSelector } from '@infra/adpters/redux/store'
import Message from './message'
import { resetAmountOfNewMessages } from '@infra/adpters/redux/messages-slice'
import background from '@public/assets/vback.jpg'


type IChatContent = {
    recipientUsername?:string
	showDetails:Function
}

const ChatContainerMessages: React.FC<IChatContent> = ({recipientUsername,showDetails}) => {
	const inputMessage = useRef<HTMLInputElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const socketContext = useSocket()
	const messages = useAppSelector(state=>state.messagesCache.chat.find(e=>e.username == recipientUsername))
	const bottomRef = useRef<HTMLDivElement>(null)

	useEffect(()=>{
		if (bottomRef){
			bottomRef.current?.scrollIntoView({behavior: 'auto'})
		}
		if (recipientUsername) store.dispatch(resetAmountOfNewMessages({username:recipientUsername}))
	},[recipientUsername])
	
	const sendMessage = (message:any) =>{
		if (message == null || recipientUsername == null) return
		if (inputMessage.current && inputMessage.current.value != ''){
			socketContext.sendMessage(recipientUsername,inputMessage.current.value)
			inputMessage.current.value = ''
			store.dispatch(resetAmountOfNewMessages({username:recipientUsername}))
		}
	}
	const handleKeyPress = (event:any) => {
		if (event.key === 'Enter' && buttonRef.current && inputMessage.current && inputMessage.current.value != '') {
			buttonRef.current.click()
		}
	}
  
	return (
		<HStack bg='#FAFCFF' h={'100%'} flex='1' width={'auto'} flexDir={'column'} >
			<HeaderCurrentChat showUser={showDetails} />
			<VStack flex={1} w='100%' bg={'#F6F8FC' } overflowY="auto" margin={'0 !important'} padding={5} position={'relative'}>
				<Box
					position="absolute"
					top={0}
					left={0}
					right={0}
					bottom={0}
					bg={`url(${background})`}
					opacity={0.2}
					backgroundSize="cover"
					zIndex={0}
				/>
				{messages?.messages.map(e=> <Message key={e.id} message={e.message} me={e.me} sendAt={e.sendAt}/>)}
				<div ref={bottomRef} />
			</VStack> 
			<HStack h='80px' w='90%'>
				<InputGroup pb='3'>
					<InputRightElement
						pointerEvents='auto'
						children={
							<Button variant='sendmessage'type='submit' bg='transparent' color='white' ref={buttonRef} onClick={()=>sendMessage(inputMessage)}>
								<ArrowForwardIcon/>
							</Button>}
					/>
					<Input variant='inputmessage' placeholder='Mensagem...' ref={inputMessage} onKeyPress={handleKeyPress} onChange={(e)=>e.target.value}/>
				</InputGroup>
			</HStack>
		</HStack>

	)
}

export default ChatContainerMessages

