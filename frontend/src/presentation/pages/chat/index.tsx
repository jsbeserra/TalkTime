import React, { useState } from 'react';
import { Flex, HStack, Container, Heading, Circle, Text, VStack, Input, InputGroup, InputLeftElement, InputRightElement, Divider, Button } from '@chakra-ui/react';
import Contact from './components/contact';
import { SearchIcon, SettingsIcon, PhoneIcon, ArrowForwardIcon, } from '@chakra-ui/icons';
import ContentMessages from './components/content-messages';
import HeaderCurrentChat from './components/header-current-chat';
import MakeSideMenu from '@main/factories/sideMenu-factory';


const Chat: React.FC = () => {
    const [showUserDetails, setShowUserDetails] = useState<boolean>(false)
    function showContact() {
        setShowUserDetails(!showUserDetails)
    }
    return (
        <Flex w='100%' h='100%' alignItems={'center'} justifyContent={'flex-start'}  >
            <HStack h={'100%'} w={'60px'} bg='#F6F8FC'>
                <MakeSideMenu />
            </HStack>
            <Divider orientation='vertical' />
            <HStack h={'100%'} w={'350px'} bg='#FAFCFF' flexDir={'column'} p='5' >
                <VStack alignItems='flex-start' w='100%'>
                    <HStack pb='3'>
                        <Heading fontSize='3xl' variant='h1'>Mensagens</Heading >
                        <Text variant='sub'>(30)</Text>
                    </HStack>
                    <InputGroup pb='3'>
                        <InputRightElement
                            pointerEvents='none'
                            children={<SearchIcon color='gray.300' />}
                        />
                        <Input variant='default' type='tel' placeholder='Phone number' />
                    </InputGroup>
                    {/* <Divider orientation='horizontal' /> */}
                </VStack>

                <VStack w='100%' spacing='4' p='5' overflowY="auto">
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                </VStack>
            </HStack>
            <Divider orientation='vertical' />
            <HStack bg='#FAFCFF' h={'100%'} flex='1' width={'auto'} flexDir={'column'} >
                <HeaderCurrentChat showUser={showContact} />
                <Divider orientation='horizontal' m={'0 !important'} />
                <ContentMessages />
                <HStack h='80px' w='50%'>
                    <InputGroup pb='3'>
                        <InputRightElement
                            pointerEvents='none'
                            children={
                                <Button bg='#191A1E' color='white'>
                                    <ArrowForwardIcon />
                                </Button>}
                        />
                        <Input variant='default' type='tel' placeholder='Mensagem...' />
                    </InputGroup>
                </HStack>
            </HStack>
            <Divider orientation='vertical' />
            {showUserDetails && (
                <HStack bg='#FAFCFF' h={'100%'} minW={300} alignItems='flex-start' justifyContent='center'>
                    <VStack p='10'>
                        <Circle size='100px' bg='#191A1E' color='white'>
                        </Circle>
                        <Heading fontSize='5xs' fontWeight={'medium'}>Fake name</Heading >
                        <Text>Tal tal</Text>
                    </VStack>
                </HStack>
            )}
        </Flex>
    );
}

export default Chat;

function useStates(arg0: boolean) {
    throw new Error('Function not implemented.');
}
