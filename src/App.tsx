import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavbarComponents from "./components/Layouts/NavbarComponents"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import StorePage from "./pages/StorePage"
import ContactPage from "./pages/ContactPage"
import FooterComponents from "./components/Layouts/FooterComponents"
import SignInComponents from "./components/Authenticate/SignInComponents"
import SignUpComponents from "./components/Authenticate/SignUpComponents"
import ProfilePage from "./pages/ProfilePage"
import AuthenticateRoute from "./PrivateRoute/AuthenticateRoute"
import CheckoutComponents from "./components/Product/CheckoutComponents"
import ProductDetailComponents from "./components/Product/ProductDetailComponents"

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
          <Route path="/profile" element={
            <AuthenticateRoute>
              <ProfilePage />
            </AuthenticateRoute>
          }
          />
          <Route path="/checkout" element={<CheckoutComponents />} />
          <Route path="/product-detail/:productId" element={<ProductDetailComponents />} />
        </Routes>
        <FooterComponents />
      </BrowserRouter>
    </>
  )
}


export default App
