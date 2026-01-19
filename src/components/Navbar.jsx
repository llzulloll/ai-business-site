import { Link } from 'react-router-dom'

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 2rem',
        backgroundColor: 'var(--nav-bg)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid #333'
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'var(--primary-color)',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    links: {
        display: 'flex',
        gap: '2rem'
    },
    link: {
        color: '#fff',
        fontWeight: '500'
    },
    cta: {
        backgroundColor: 'var(--primary-color)',
        color: '#000',
        padding: '0.5rem 1.5rem',
        borderRadius: '4px',
        fontWeight: 'bold',
        transition: 'transform 0.2s ease',
    }
}

export default function Navbar() {
    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.logo}>Fluxaro</Link>
            <div style={styles.links}>
                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/pricing" style={styles.link}>Pricing</Link>
                <Link to="/terms" style={styles.link}>Terms</Link>
            </div>
        </nav>
    )
}
