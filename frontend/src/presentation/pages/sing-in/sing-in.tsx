import { Grid, Input, HStack, VStack, Flex, Button, FormControl, FormLabel, Image, Card, Heading, Container, Divider, Switch } from '@chakra-ui/react';
import React, { useState } from 'react';
import SignInUseCase from '../../../aplication/usecase/sign-in';
import SingIn from './components/sing-in';
import SingUp from './components/sing-up';


interface ISingIn {
    signInUseCase: SignInUseCase
}
const Sing: React.FC<ISingIn> = ({ signInUseCase }) => {
    const [toogle, settoogle] = useState<boolean>(false)

    return (
        <HStack bg='#FAFCFF' w='100%' h='100%'>
            {toogle ? <SingIn signInUseCase={signInUseCase} /> : <SingUp />}
            <VStack w={'50%'} h='100%' spacing={4} justifyContent='center' alignItems={'center'} p='0'
                backgroundImage={'../../../../public/assets/unsplash-2.jpg'}
                backgroundSize='cover'
                backgroundPosition={'center'}
            >
                <Button onClick={()=>settoogle(!toogle)}>{toogle ? 'Entrar':'Cadastrar'}</Button>
            </VStack>
        </HStack>
    );
}

export default Sing;