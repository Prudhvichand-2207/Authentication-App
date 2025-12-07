import { Navigate, Route ,Routes} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import { useState } from "react"
import RefreshHeadler from "./pages/RefreshHeadler"

function App() {
  const [isAuthenticated,setAuthenticated]=useState(false);

  const PrivateRouting=({element})=>{
    return isAuthenticated ? element :<Navigate to='/login'/>
  }

  return (
    <div className="App">
      <RefreshHeadler setAuthenticated={setAuthenticated}></RefreshHeadler>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/login'  element={<Login/>}/>
        <Route path='/signup'  element={<Signup/>}/>
        <Route path='/home'  element={<PrivateRouting element={<Home />}/>}/>
      </Routes>
    </div>
  )
}

export default App
