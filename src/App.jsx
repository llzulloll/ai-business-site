import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import PricingPage from './pages/PricingPage'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ContactPage from './pages/ContactPage'
import RestaurantDemo from './pages/demos/RestaurantDemo'
import LawDemo from './pages/demos/LawDemo'
import DentalDemo from './pages/demos/DentalDemo'
import WebsiteRevampDemo from './pages/demos/WebsiteRevampDemo'
import DemosPage from './pages/DemosPage'
import ServicesPage from './pages/ServicesPage'
import AIReceptionistDemo from './pages/demos/AIReceptionistDemo'
import ScrollToTop from './components/ScrollToTop' // existing
import GlobalChatWidget from './components/GlobalChatWidget'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <GlobalChatWidget />
      <div className="app-container">
        <Routes>
          {/* Landing Page - Full Width */}
          <Route path="/" element={
            <>
              <Navbar />
              <LandingPage />
              <Footer />
            </>
          } />

          <Route path="/services" element={
            <>
              <Navbar />
              <ServicesPage />
              <Footer />
            </>
          } />

          {/* Other Pages - Contained */}
          <Route path="/pricing" element={
            <>
              <Navbar />
              <div style={{ minHeight: '80vh', paddingTop: '2rem' }}>
                <PricingPage />
              </div>
              <Footer />
            </>
          } />

          <Route path="/contact" element={
            <>
              <Navbar />
              <div style={{ minHeight: '80vh', paddingTop: '2rem' }}>
                <ContactPage />
              </div>
              <Footer />
            </>
          } />

          <Route path="/terms" element={
            <>
              <Navbar />
              <div style={{ minHeight: '80vh', paddingTop: '2rem' }}>
                <TermsOfService />
              </div>
              <Footer />
            </>
          } />

          <Route path="/privacy" element={
            <>
              <Navbar />
              <div style={{ minHeight: '80vh', paddingTop: '2rem' }}>
                <PrivacyPolicy />
              </div>
              <Footer />
            </>
          } />

          <Route path="/demos" element={
            <>
              <Navbar />
              <div style={{ minHeight: '80vh' }}>
                <DemosPage />
              </div>
              <Footer />
            </>
          } />

          {/* Demos Standalone Routes */}
          <Route path="/demos/restaurant" element={
            <>
              <Navbar />
              <RestaurantDemo />
            </>
          } />
          <Route path="/demos/law" element={
            <>
              <Navbar />
              <LawDemo />
            </>
          } />
          <Route path="/demos/dental" element={
            <>
              <Navbar />
              <DentalDemo />
            </>
          } />
          <Route path="/demos/revamp" element={<WebsiteRevampDemo />} />
          <Route path="/demos/ai-receptionist" element={<AIReceptionistDemo />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
