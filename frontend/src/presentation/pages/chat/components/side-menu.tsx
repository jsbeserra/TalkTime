import { SettingsIcon } from '@chakra-ui/icons';
import { FaUsers } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai'
import { IoCallSharp } from 'react-icons/io5'
import { IoMdSettings } from 'react-icons/io'
import { Button, VStack } from '@chakra-ui/react';
import React from 'react';

const SideMenu: React.FC = () => {
    return (
        <VStack w={'100%'} alignItems={'center'} flexDir='column' justifyContent={'flex-start'}>
            <Button variant={'icon'} borderRadius={'full'} w={'40px'} h={'40px'} p={0}>
                <AiFillMessage size={25}  />
            </Button>
            <Button variant={'icon'} borderRadius={'full'} w={'40px'} h={'40px'} p={0}>
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