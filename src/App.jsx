import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Contact from './pages/Contact'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />

      {/* Navigation Links */}
      <nav>
        <Link to="/">Inicio</Link> |{" "}
        <Link to="/menu">Menú</Link> |{" "}
        <Link to="/contact">Contacto</Link>
      </nav>

      {/* Route paths */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App