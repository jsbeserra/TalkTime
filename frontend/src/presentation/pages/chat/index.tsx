import React from 'react';
import { Flex, HStack, Container, Heading, Circle, Text, VStack, Input, InputGroup, InputLeftElement, InputRightElement, Divider, Button } from '@chakra-ui/react';
import Contact from './components/contact';
import { SearchIcon, SettingsIcon, PhoneIcon,ArrowForwardIcon, } from '@chakra-ui/icons';

// import { Container } from './styles';

const Chat: React.FC = () => {
    return (
        <Flex w='100vw' h='100vh' alignItems={'center'} justifyContent={'flex-start'} >
            <HStack h={'100%'} w={'60px'} bg='#191A1E'>
                <Container>
                    <SettingsIcon />
                </Container>
            </HStack>
            <HStack h={'100%'} w={'350px'} flexDir={'column'} p='5' >
                <VStack alignItems='flex-start' w='100%'>
                    <HStack pb='3'>
                        <Heading fontSize='3xl'>Mensagens</Heading >
                        <Text>(30)</Text>
                    </HStack>
                    <InputGroup pb='3'>
                        <InputRightElement
                            pointerEvents='none'
                            children={<SearchIcon color='gray.300' />}
                        />
                        <Input type='tel' placeholder='Phone number' />
                    </InputGroup>
                    <Divider orientation='horizontal' />
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
            <HStack h={'100%'} flex='1' width={'auto'} flexDir={'column'} p='2'>
                <HStack flexDir={'row'} w='100%' p='5' justifyContent='space-between'>
                    <HStack>
                        <Circle bg='tomato' size='60px' color='white'></Circle>
                        <Heading fontSize='3xl'> Edirlei brito</Heading >
                    </HStack>
                    <Circle size='60px' bg='tomato' color='white'>
                        <PhoneIcon />
                    </Circle>
                </HStack>
                <VStack bg='#F8F8F8' flex={1} borderRadius='2xl' w='100%' spacing='4' p='5' overflowY="auto">
                    <VStack flex={1}>
                        <Text>Oi tudo bem?</Text>
                    </VStack>
                    <VStack h='80px' w='50%'>
                        <Divider orientation='horizontal' />
                        <InputGroup pb='3'>
                            <InputRightElement
                                pointerEvents='none'
                                children={
                                <Button bg='#191A1E' color='white'>
                                    <ArrowForwardIcon/>
                                </Button>}
                            />
                            <Input bg='white' type='tel' placeholder='Mensagem...' />
                        </InputGroup>
                    </VStack>
                </VStack>
            </HStack>
            <Divider orientation='vertical' />
            <HStack h={'100%'} minW={300}  alignItems='flex-start' justifyContent='center'>
                <VStack p='10'>
                    <Circle size='240px' bg='#191A1E' color='white'>
                        {/* <PhoneIcon /> */}
                    </Circle>
                </VStack>
            </HStack>
        </Flex>
    );
}

export default Chat;