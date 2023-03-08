import Router from './main/routes/routes'
import { ChakraProvider, HStack } from '@chakra-ui/react'
import { customtheme } from './infra/theme/custom-theme'
import './App.css'

function App() {
  return (
    <ChakraProvider theme={customtheme}>
      <HStack className={'app'}>
        <HStack className='content'>
          <Router></Router>
        </HStack>
      </HStack>
    </ChakraProvider>
  )
}

export default App
