import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { AiFillMessage } from 'react-icons/ai'
import { IoCallSharp,IoExit,IoNotifications } from 'react-icons/io5'
import { IoMdSettings } from 'react-icons/io'
import { Button, VStack,Text} from '@chakra-ui/react'
import { useSearchContacts } from '@main/context/search-contacts-context'
import Exit from '@aplication/usecase/exit/exit'
import { useAuth } from '@main/context/auth-context'
import { useSideMenu } from '@main/context/side-menu-context'
import { store } from '@infra/adpters/redux/store'
import { clearContacts } from '@infra/adpters/redux/contacts-slice'
import { clearMessages } from '@infra/adpters/redux/messages-slice'

interface ISideMenu {
    exit:Exit
}

const SideMenu: React.FC<ISideMenu>= ({exit}) => {
	const {toogle} = useSearchContacts()
	const {openContentContacts,isOpenContentContacts,isopenNotifications,openNotifications,notifications,setNotifications} = useSideMenu()
	const {authenticate} = useAuth()

	const loggof =()=> {
		exit.handle(authenticate)
		store.dispatch(clearContacts())
		store.dispatch(clearMessages())
	}
	const openNotification = () =>{
		openNotifications(!isopenNotifications)
		if (!isopenNotifications) setNotifications(0)
	}
	return (
		<VStack w={'100%'} alignItems={'center'} flexDir='column' justifyContent={'flex-start'}>
			<Button variant={'icon'} borderRadius={'full'} w={'40px'} h={'40px'} p={0} onClick={()=>openContentContacts(!isOpenContentContacts)}>
				<AiFillMessage size={25} />
			</Button>
			<Button variant={'icon'} borderRadius={'full'} w={'40px'} h={'40px'} p={0} onClick={()=>openNotification()}>
				<IoNotifications size={25} />
				<Text 
					bg={'#059183'}
					textAlign={'center'}
					color={'white'}
					fontSize={10}
					borderRadius={'full'}
					position={'absolute'} 
					left={'20px'}
					top={'0px'}
					w={4} 
					h={4}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'end'}
					pb='0.5'
				>
					{notifications}					
				</Text>
			</Button>
			<Button variant={'icon'} borderRadius={'full'} w={'40px'} h={'40px'} p={0} onClick={()=>toogle(true)}>
				<FaUsers size={25} />
			</Button>
			<Button variant={'icon'} borderRadius={'full'} w={'40px'} h={'40px'} p={0}>
				<IoCallSharp size={25} />
			</Button>
			<Button variant={'icon'} borderRadius={'full'} w={'40px'} h={'40px'} p={0}>
				<IoMdSettings size={30} />
			</Button>
			<Button className='btn-exit' variant={'icon'} borderRadius={'full'} w={'40px'} h={'40px'} p={0} onClick={loggof}>
				<IoExit size={30} />
			</Button>
		</VStack>
	)
}

export default SideMenu