import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import PricingPage from './pages/PricingPage'
import TermsOfService from './pages/TermsOfService'
import RestaurantDemo from './pages/demos/RestaurantDemo'
import LawDemo from './pages/demos/LawDemo'
import DentalDemo from './pages/demos/DentalDemo'
import DemosPage from './pages/DemosPage'
// import './App.css' // Removing default App.css or keeping it empty

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Helper to hide Nav/Footer on Demo pages if desired, or keep them. 
            For now, we keep them but maybe we should hide the main Navbar on the demo page itself for immersion? 
            Let's keep the main wrapper but the demo takes over the full view if valid.
        */}
        <Routes>
          <Route path="/" element={<><Navbar /><div style={{ minHeight: '80vh', padding: '2rem' }}><LandingPage /></div><Footer /></>} />
          <Route path="/pricing" element={<><Navbar /><div style={{ minHeight: '80vh', padding: '2rem' }}><PricingPage /></div><Footer /></>} />
          <Route path="/terms" element={<><Navbar /><div style={{ minHeight: '80vh', padding: '2rem' }}><TermsOfService /></div><Footer /></>} />
          <Route path="/demos" element={<><Navbar /><div style={{ minHeight: '80vh', padding: '0' }}><DemosPage /></div><Footer /></>} />

          {/* Demos Standalone Routes */}
          <Route path="/demos/restaurant" element={<RestaurantDemo />} />
          <Route path="/demos/law" element={<LawDemo />} />
          <Route path="/demos/dental" element={<DentalDemo />} />
        </Routes>
      </div>
    </Router>
  )
}

function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid #333' }}>
      <p>&copy; {new Date().getFullYear()} Fluxaro. All rights reserved.</p>
    </footer>
  )
}

export default App
