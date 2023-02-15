import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MakeSingIn from '../factories/sing-in-factory'

const Router: React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<MakeSingIn/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router