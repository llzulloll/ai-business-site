import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false)
    }, [location])

    const handleBookCall = () => {
        navigate('/contact')
        setIsMenuOpen(false)
    }

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/services', label: 'Services' },
        { path: '/demos', label: 'Demos' },
        { path: '/pricing', label: 'Pricing' },
        { path: '/contact', label: 'Contact' }
    ]

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.5rem',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            width: '100%',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--card-border)'
        }}>
            <Link to="/" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.2rem',
                fontWeight: '800',
                color: 'var(--primary-color)',
                letterSpacing: '-0.5px',
                zIndex: 1001 // Keep logo above menu
            }}>
                <div style={{ width: '24px', height: '24px', background: 'var(--primary-color)', borderRadius: '4px' }}></div>
                FLUXARO
            </Link>

            {/* Desktop Menu */}
            <div className="mobile-hidden" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                {navLinks.map(link => (
                    <Link
                        key={link.path}
                        to={link.path}
                        style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '500' }}
                        className="nav-link"
                    >
                        {link.label}
                    </Link>
                ))}
                <button
                    onClick={handleBookCall}
                    className="btn btn-primary"
                    style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
                >
                    📞 Book a Call
                </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
                className="desktop-hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                    zIndex: 1001,
                    background: 'transparent',
                    fontSize: '1.5rem',
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {isMenuOpen ? '✕' : '☰'}
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: '#fff',
                            padding: '6rem 2rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            zIndex: 1000 // Below logo/button
                        }}
                    >
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '600',
                                    color: 'var(--text-color)',
                                    borderBottom: '1px solid #f1f5f9',
                                    paddingBottom: '1rem'
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <button
                            onClick={handleBookCall}
                            className="btn btn-primary"
                            style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                fontSize: '1.1rem',
                                width: '100%'
                            }}
                        >
                            📞 Book a Call
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .nav-link:hover {
                    color: var(--primary-color) !important;
                }
            `}</style>
        </nav>
    )
}
