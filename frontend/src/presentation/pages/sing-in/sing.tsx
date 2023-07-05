import { HStack, VStack, Button, Divider, Flex, Heading, Image ,Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import MakeSingIn from '@main/factories/sing-in-factory'
import MakeSingUp from '@main/factories/sing-up-factory'
import backgroundImage from '@public/assets/unsplash-2.jpg'
import LOGO from '@public/assets/LOGO.png'

const Sing: React.FC = () => {
	const [toogle, settoogle] = useState<boolean>(true)

	return (
		<HStack bg='#FAFCFF' w='100%' h='100%'>
			
			<VStack w={'50%'} spacing={4} alignItems={'center'} p='10'>
				<Flex minW='350' flexDir={'column'} alignItems='center'>
					<VStack spacing={4} w='100%' marginBottom={5} alignItems={'flex-start'}>
						<Image style={{width:300}} src={LOGO}/>
						<Divider />
						<br/>
						<Heading variant={'h1'} style={{fontSize:35}}>
						Bem Vindo!
						</Heading>
						{toogle && <Text variant={'medium'} style={{fontSize:18,marginBottom:10}}>
                        Novo aqui? 
							<Button variant={'transparent'} style={{paddingLeft:5}} onClick={()=>settoogle(false)}>Criar uma conta.</Button>
						</Text>
						}
						{!toogle && <Text variant={'medium'} style={{fontSize:18,marginBottom:10}}>
                        Já tem uma conta? 
							<Button variant={'transparent'} style={{paddingLeft:5}} onClick={()=>settoogle(true)}>Logar.</Button>
						</Text >
						}
					</VStack>
					{toogle ? <MakeSingIn/> : <MakeSingUp />}
				</Flex>
			</VStack>
			<VStack w={'90%'} h='100%' spacing={4} justifyContent='center' alignItems={'center'} p='0'
				backgroundImage={`url(${backgroundImage})`}
				backgroundSize='cover'
				backgroundPosition={'center'}
			>
			</VStack>
		</HStack>
	)
}

export default Sing