import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavbarComponents from "./components/NavbarComponents"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import StorePage from "./pages/StorePage"
import ContactPage from "./pages/ContactPage"
import FooterComponents from "./components/FooterComponents"
import SignInComponents from "./components/SignInComponents"
import SignUpComponents from "./components/SignUpComponents"

function App() {
  return (
    <>
      <NavbarComponents />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<StorePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signin" element={<SignInComponents />} />
          <Route path="/signup" element={<SignUpComponents />} />
        </Routes>
        <FooterComponents />
      </BrowserRouter>
    </>
  )
}


export default App
