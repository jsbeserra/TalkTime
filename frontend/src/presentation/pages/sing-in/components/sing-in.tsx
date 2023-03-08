import { Grid, Input, HStack, VStack, Flex, Button, FormControl, FormLabel, Image, Card, Heading, Container, Divider } from '@chakra-ui/react';
import React, { useState } from 'react';
import SignInUseCase from '../../../../aplication/usecase/sign-in/sign-in';

interface ISingIn {
    signInUseCase: SignInUseCase
}

const SingIn: React.FC<ISingIn> = ({ signInUseCase }) => {
    const [email, setemail] = useState<string>("")
    const [password, setpassword] = useState<string>("")
    const handleSubmit = (event: any) => {
        event.preventDefault();
        alert(`Email: ${email} & Password: ${password}`);
    };

    return (
        <VStack w={'50%'} spacing={4} justifyContent='center' alignItems={'center'} p='10'>
            <Flex minW='350' flexDir={'column'} justifyContent={'center'} alignItems='center'>
                <VStack spacing={4} w='100%' marginBottom={5}>
                    <Heading variant={'h1'}>
                        BEM VINDO
                    </Heading>
                    <Divider />
                    <Heading variant={'h2'}>
                        Entrar
                    </Heading>
                </VStack>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <VStack spacing='6' w='100%'>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder="Email" value={email} onChange={event => setemail(event.currentTarget.value)} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' placeholder="Password" value={password} onChange={event => setpassword(event.currentTarget.value)} />
                        </FormControl>
                        <Button type='submit' variant={'default'} w='100%'>Login</Button>
                    </VStack>
                </form>
            </Flex>
        </VStack>
    );
}

export default SingIn;