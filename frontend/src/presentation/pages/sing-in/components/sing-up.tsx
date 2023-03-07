import { VStack, FormControl, FormLabel, Input, Button, Flex, Divider, Heading,Text } from '@chakra-ui/react';
import React from 'react';
import { object, string } from 'yup'
import { useFormik } from 'formik';

let userSchema = object().shape({
    name: string().min(4,'Minímo de 4 letras').required('Campo obrigatório'),
    username: string().min(4,'Minímo de 4 letras').required('Campo obrigatório'),
    email: string().email().required('Campo obrigatório'),
    password: string().min(6,'Minímo de 6 letras').required('Campo obrigatório'),
});

const SignUp: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: ''
        },
        validationSchema: userSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <VStack w={'50%'} spacing={4} justifyContent='center' alignItems={'center'} p='10'>
            <Flex minW='350' flexDir={'column'} justifyContent={'center'} alignItems='center'>
                <VStack spacing={4} w='100%' marginBottom={5}>
                    <Heading variant={'h1'}>
                        BEM VINDO
                    </Heading>
                    <Divider />
                    <Heading variant={'h2'}>
                        Cadastrar
                    </Heading >
                </VStack>
                <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
                    <VStack spacing='1' w='100%'>
                        <FormControl h='96px'>
                            <FormLabel>Nome</FormLabel>
                            <Input name='name' onChange={formik.handleChange} />
                            {formik.errors.name ? <Text variant={'error'}>{formik.errors.name}</Text> : null}
                        </FormControl>
                        <FormControl h='96px'>
                            <FormLabel>User name</FormLabel>
                            <Input name='username' onChange={formik.handleChange} />
                            {formik.errors.username ? <Text variant={'error'}>{formik.errors.username}</Text> : null}
                        </FormControl >
                        <FormControl h='96px'>
                            <FormLabel>E-mail</FormLabel>
                            <Input name='email' onChange={formik.handleChange} placeholder="Email" />
                            {formik.errors.email ? <Text variant={'error'}>{formik.errors.email}</Text> : null}
                        </FormControl>
                        <FormControl h='96px'>
                            <FormLabel>Senha</FormLabel>
                            <Input type='password' name='password' placeholder="Password" onChange={formik.handleChange} />
                            {formik.errors.password ? <Text variant={'error'}>{formik.errors.password}</Text> : null}
                        </FormControl>
                        <Button type='submit' variant={'default'} w='100%'>Login</Button>
                    </VStack>
                </form>
            </Flex>
        </VStack>
    );
}

export default SignUp;