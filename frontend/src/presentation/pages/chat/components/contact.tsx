import React from 'react';
import { Circle, Heading, HStack, VStack, Text } from '@chakra-ui/react';

const Contact: React.FC = () => {
    return (
        <HStack flexDir={'row'} w='100%' >
            <Circle bg='tomato' size='60px' color='white'></Circle>
            <VStack w='100%' alignItems='flex-start' justifyContent='flex-start'>
                <HStack w='100%' justifyContent='space-between'>
                    <Heading fontSize='5xs' fontWeight={'medium'}>Fake name</Heading >
                    <Text fontSize='14px'>13:28</Text>
                </HStack>
                <HStack w='100%' justifyContent='space-between'>
                    <Text>oi</Text>
                    <Circle bg='green' size='20px' color='white' fontSize='14px'>2</Circle>
                </HStack>
            </VStack>
        </HStack>
    );
}

export default Contact;