import { VStack, FormControl, FormLabel, Input, Button, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { object, string } from 'yup'
import { useFormik } from 'formik'
import SingUpUseCase from '@aplication/usecase/sign-up/sign-up'
import SignInUseCase from '@aplication/usecase/sign-in/sign-in'
import { useAuth } from '@main/context/auth-context'

const userSchema = object().shape({
	name: string().min(4, 'Minímo de 4 letras.').required('Campo obrigatório'),
	username: string().min(4, 'Minímo de 4 letras.').required('Campo obrigatório'),
	email: string().email('E-mail inválido.').required('Campo obrigatório.'),
	password: string().min(6, 'Minímo de 6 caracteres.').required('Campo obrigatório.'),
})

interface ISingUp {
    signUpUseCase: SingUpUseCase
    signInUseCase: SignInUseCase
}

const SignUp: React.FC<ISingUp> = ({ signUpUseCase, signInUseCase }) => {
	const toast = useToast()
	const { authenticate } = useAuth()
	const formik = useFormik({
		initialValues: {
			name: '',
			username: '',
			email: '',
			password: ''
		},
		validationSchema: userSchema,
		onSubmit: async (values) => {
			const result = await signUpUseCase.handle(values)
			if (result.isLeft()) {
				toast({
					title: 'Erro',
					description: result.value.message,
					position: 'top-right',
					status: 'error',
					duration: 2000,
					isClosable: true,
				})
			}
			if (result.isRight()) {
				toast({
					title: 'Sucesso',
					description: 'Cadastro realizado com sucesso',
					position: 'top-right',
					status: 'success',
					duration: 2000,
					isClosable: true,
				})
				singIn(values.email,values.password)
                
			}
		},
	})

	const singIn = async (email:string,password:string) => {
		const success = await signInUseCase.handle({ email, password })
		if (success.isRight()){
			authenticate(true)
		}
	}

	return (
		<form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
			<VStack spacing='4' w='100%'>
				<FormControl >
					<FormLabel variant={'flex-b'}>Nome {formik.errors.name ? <Text variant={'error'}>{formik.errors.name}</Text> : null}</FormLabel>
					<Input bg='transparent' name='name' onChange={formik.handleChange} />	
				</FormControl>
				<FormControl>
					<FormLabel variant={'flex-b'}>User name {formik.errors.username ? <Text variant={'error'}>{formik.errors.username}</Text> : null}</FormLabel>
					<Input bg='transparent' name='username' onChange={formik.handleChange} />
				</FormControl >
				<FormControl>
					<FormLabel variant={'flex-b'}>E-mail {formik.errors.email ? <Text variant={'error'}>{formik.errors.email}</Text> : null}</FormLabel>
					<Input bg='transparent' name='email' onChange={formik.handleChange} placeholder="Email" />
				</FormControl>
				<FormControl bg='transparent'>
					<FormLabel variant={'flex-b'}>Senha {formik.errors.password ? <Text variant={'error'}>{formik.errors.password}</Text> : null}</FormLabel>
					<Input type='password' name='password' placeholder="Password" onChange={formik.handleChange} />
				</FormControl>
				<br/>
				<Button type='submit' variant={'default'} w='100%'>Sign Up</Button>
			</VStack>
		</form>

	)
}

export default SignUp