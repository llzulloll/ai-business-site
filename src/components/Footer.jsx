import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer style={{
            padding: '4rem 2rem',
            borderTop: '1px solid var(--card-border)',
            background: 'var(--bg-color)'
        }}>
            <div className="container grid-2" style={{ gap: '4rem', alignItems: 'start' }}>
                <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>FLUXARO</h3>
                    <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                        Shaping the future of business with intelligent automation.
                        We build the systems that power modern enterprises.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                        <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '1rem' }}>Product</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}><Link to="/demos" className="text-muted">Demos</Link></li>
                            <li style={{ marginBottom: '0.5rem' }}><Link to="/pricing" className="text-muted">Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '1rem' }}>Company</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}><Link to="/" className="text-muted">About</Link></li>
                            <li style={{ marginBottom: '0.5rem' }}><Link to="/terms" className="text-muted">Terms</Link></li>
                            <li style={{ marginBottom: '0.5rem' }}><Link to="/privacy" className="text-muted">Privacy</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container" style={{
                marginTop: '4rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--card-border)',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.9rem'
            }}>
                &copy; {new Date().getFullYear()} Fluxaro. All rights reserved.
            </div>
        </footer>
    )
}
