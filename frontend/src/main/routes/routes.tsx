import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from '../../presentation/pages/chat'
import MakeSingIn from '../factories/sing-in-factory'

const Router: React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<MakeSingIn/>} />
                <Route path="/chat" element={<Chat/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router