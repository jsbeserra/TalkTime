import Router from './main/routes/routes'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Router></Router>
    </ChakraProvider>
  )
}

export default App
