import React from 'react'
import { Input, VStack, Button, FormControl, FormLabel, useToast, Text } from '@chakra-ui/react'
import SignInUseCase from '@aplication/usecase/sign-in/sign-in'
import { object, string } from 'yup'
import { useFormik } from 'formik'
import { useAuth } from '@main/context/auth-context'
interface ISingIn {
    signInUseCase: SignInUseCase
}

const userSchema = object().shape({
	email: string().email('E-mail inválido.').required('Campo obrigatório.'),
	password: string().min(6, 'Minímo de 6 caracteres.').required('Campo obrigatório.'),
})

const SingIn: React.FC<ISingIn> = ({ signInUseCase }) => {
	const { authenticate } = useAuth()
	const toast = useToast()
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: userSchema,
		onSubmit: async (values) => {
			const result = await signInUseCase.handle(values)
			if (result.isLeft()) {
				toast({
					title: 'Erro',
					description: result.value.message,
					position: 'top-right',
					status: 'error',
					duration: 2000,
					isClosable: true,
				})
				return
			}
			authenticate(true)
		},
	})


	return (
		<form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
			<VStack spacing='4' w='100%'>
				<FormControl>
					<FormLabel variant={'flex-b'}>Email {formik.errors.email ? <Text variant={'error'}>{formik.errors.email}</Text> : null}
					</FormLabel>
					<Input bg='transparent'name='email' placeholder="Email" onChange={formik.handleChange} />
				</FormControl>
				<FormControl >
					<FormLabel variant={'flex-b'}>Password {formik.errors.password ? <Text variant={'error'}>{formik.errors.password}</Text> : null}</FormLabel>
					<Input name='password' type='password' placeholder="Password" onChange={formik.handleChange} />
				</FormControl>
				<VStack style={{width:'100%',alignItems:'end'}}>
					<Button variant={'forgotPassword'} style={{padding:0,height:25,margin:0}}>Esqueceu a senha?</Button>
				</VStack>	
				<Button type='submit' variant={'default'} w='100%'>Sign In</Button>
			</VStack>
		</form>

	)
}

export default SingIn