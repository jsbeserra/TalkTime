import React from 'react'
import Router from './main/routes/routes'
import { ChakraProvider, HStack } from '@chakra-ui/react'
import { customtheme } from './infra/theme/custom-theme'
import './App.css'
import { AuthProvider } from './main/context/auth-context'
import { SearchContactsProvider } from './main/context/search-contacts-context'

function App() {
	return (
		<ChakraProvider theme={customtheme}>
			<HStack className={'app'}>
				<HStack className='content'>
					<AuthProvider>
						<SearchContactsProvider>
							<Router></Router>
						</SearchContactsProvider>
					</AuthProvider>
				</HStack>
			</HStack>
		</ChakraProvider>
	)
}

export default App
