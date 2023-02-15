import { Agents } from "./agents/agents"
import { Route, Routes,} from 'react-router-dom'
import { Main } from "./main"

export const Pages = () => {
    return(
        <Routes>
            <Route path="/" element={<Main/>}></Route>
            <Route path='/agentes' element={<Agents/>}></Route>
        </Routes>
    )
}