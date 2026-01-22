import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()

    const handleBookCall = () => {
        navigate('/contact')
    }

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
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
                letterSpacing: '-0.5px'
            }}>
                {/* Placeholder for Logo Icon */}
                <div style={{ width: '24px', height: '24px', background: 'var(--primary-color)', borderRadius: '4px' }}></div>
                FLUXARO
            </Link>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '500' }} className="nav-link">Home</Link>
                <Link to="/services" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '500' }} className="nav-link">Services</Link>
                <Link to="/demos" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '500' }} className="nav-link">Demos</Link>
                <Link to="/pricing" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '500' }} className="nav-link">Pricing</Link>
                <Link to="/contact" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '500' }} className="nav-link">Contact</Link>
                <button
                    onClick={handleBookCall}
                    className="btn btn-primary"
                    style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
                >
                    📞 Book a Call
                </button>
            </div>

            <style>{`
                .nav-link:hover {
                    color: var(--primary-color) !important;
                }
            `}</style>
        </nav>
    )
}
