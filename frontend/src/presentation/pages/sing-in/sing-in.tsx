import { Grid, Input, HStack, VStack, Flex, Button, FormControl, FormLabel, Container, Card, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import SignInUseCase from '../../../aplication/usecase/sign-in';

interface ISingIn {
    signInUseCase: SignInUseCase
}
const SingIn: React.FC<ISingIn> = ({ signInUseCase }) => {
    const [email, setemail] = useState<string>("")
    const [password, setpassword] = useState<string>("")
    return (
        <Flex bg={''} w='100vw' h='100vh' alignItems={'center'} justifyContent={'center'}>
            <Card w={'50vw'} justifyContent={'center'} flexDirection='row'>
                <VStack w={'50%'} spacing={4} justifyContent='flex-start' alignItems={'flex-start'} p='10'>
                    <Heading>
                        Entrar
                    </Heading>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder="Email" value={email} />
                        <FormLabel>Password</FormLabel>
                        <Input placeholder="Password" value={password} />
                        <Button onClick={async () => await signInUseCase.handle({ email, password })}>Login</Button>
                    </FormControl>
                </VStack>
                <VStack w={'50%'} spacing={4} justifyContent='flex-start' alignItems={'flex-start'} p='10'>
                    <Heading>
                        Cadastrar
                    </Heading>
                    <FormControl>
                        <FormLabel>Nome</FormLabel>
                        <Input />
                        <FormLabel>Username</FormLabel>
                        <Input />
                        <FormLabel>E-mail</FormLabel>
                        <Input />
                        <FormLabel>Confirmar E-mail</FormLabel>
                        <Input />
                        <FormLabel>Senha</FormLabel>
                        <Input />
                        <FormLabel>Confirmar senha</FormLabel>
                        <Input />
                        <Button>Criar</Button>
                    </FormControl>
                </VStack>
            </Card>
        </Flex>
    );
}

export default SingIn;