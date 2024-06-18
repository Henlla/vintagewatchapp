import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import StorePage from "./pages/StorePage"
import ContactPage from "./pages/ContactPage"
import HeaderVideo from "./components/HeaderVideo"
import SignInComponents from "./components/SignInComponents"
import SignUpComponents from "./components/SignUpComponents"
import FogotPassWord from "./components/FogotPassWordComponents"
import VerificationComponents from "./components/VerificationComponents"
import CaroselComponent from "./components/CaroselComponent"


function App() {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<StorePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signin" element={<SignInComponents />} />
          <Route path="/signup" element={<SignUpComponents />} />
    
        </Routes>
     
      </BrowserRouter>
    </>
  )
}


export default App
