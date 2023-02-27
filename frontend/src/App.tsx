import Router from './main/routes/routes'
import { ChakraProvider} from '@chakra-ui/react'
import { customtheme } from './infra/theme/custom-theme'

function App() {
  return (
    <ChakraProvider theme={customtheme}>
      <Router></Router>
    </ChakraProvider>
  )
}

export default App
