import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from '../../presentation/pages/chat'
import Sing from '../../presentation/pages/sing-in/sing'

const Router: React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Sing/>} />
                <Route path="/chat" element={<Chat/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router