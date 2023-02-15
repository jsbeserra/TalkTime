import { Grid, Input, Text, HStack, Flex, Button, FormControl, FormLabel } from '@chakra-ui/react';
import React, { useState } from 'react';
import SignInUseCase from '../../../aplication/usecase/sign-in';

interface ISingIn {
    signInUseCase:SignInUseCase
}
const SingIn: React.FC<ISingIn> = ({signInUseCase}) => {
    const [email,setemail] = useState<string>("")
    const [password,setpassword] = useState<string>("")
    return (
        <HStack w='full' h={'100vh'}>
            <Flex w={'full'} h={'100vh'} borderRadius={1}>
                <Grid height={200}>
                    <Text>E-mail</Text>
                    <Input name='email' type='email' onChange={(e)=>setemail(e.currentTarget.value)}/>
                    <Text>Senha</Text>
                    <Input name='password' type='password' onChange={(e)=>setpassword(e.currentTarget.value)}/>
                    <Button onClick={async()=> await signInUseCase.handle({email,password})}>Login</Button>
                </Grid >
            </Flex>
            <Flex w={'full'} h={'100vh'} borderRadius={1}>
                <Grid height={200}>
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

                </Grid >
            </Flex>
        </HStack>
    );
}

export default SingIn;