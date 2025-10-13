import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Contact from './pages/Contact'
import {Link} from 'react-router-dom'

// Here we create the routes for navigation between pages

function App() {
return (
    <div>
      {/* Navigation Links */}
      <nav>
        <Link to="/">Inicio</Link> |{" "}
        <Link to="/menu">Menu</Link> |{" "}
        <Link to="/contact">Contacto</Link>
      </nav>

      {/* Route paths */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
