import { FaUsers } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai'
import { IoCallSharp } from 'react-icons/io5'
import { IoMdSettings } from 'react-icons/io'
import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import MakeFindContacts from '../../../../main/factories/find-contacts-factory';
import { useSearchContacts } from '../../../../main/context/search-contacts-context';

const SideMenu: React.FC = () => {
    const {toogle} = useSearchContacts()
    return (
        <VStack w={'100%'} alignItems={'center'} flexDir='column' justifyContent={'flex-start'}>
            <MakeFindContacts/>
            <Button variant={'icon'} borderRadius={'full'} w={'40px'} h={'40px'} p={0}>
                <AiFillMessage size={25}  />
            </Button>
            <Button variant={'icon'} borderRadius={'full'} w={'40px'} h={'40px'} p={0} onClick={()=>toogle(true)}>
                <FaUsers size={25}  />
            </Button>
            <Button variant={'icon'} borderRadius={'full'} w={'40px'} h={'40px'} p={0}>
                <IoCallSharp size={25}  />
            </Button>
            <Button variant={'icon'} borderRadius={'full'} w={'40px'} h={'40px'} p={0}>
                <IoMdSettings size={30}  />
            </Button>
        </VStack>
    );
}

export default SideMenu;