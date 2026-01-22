import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '4rem 1rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="container"
                style={{ maxWidth: '900px', margin: '0 auto' }}
            >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: '800',
                        background: 'linear-gradient(135deg, #0f3c64 0%, #3b82f6 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1rem'
                    }}>Privacy Policy</h1>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.4rem 1rem',
                        background: '#e0f2fe',
                        color: '#0369a1',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                    }}>
                        Effective Date: {new Date().toLocaleDateString()}
                    </div>
                </div>

                {/* Document Card */}
                <div style={{
                    background: '#fff',
                    padding: '4rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    color: '#334155',
                    lineHeight: '1.8'
                }}>
                    <div style={{ marginBottom: '3rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '2rem' }}>
                        <p style={{ fontSize: '1.1rem', color: '#64748b' }}>
                            Fluxaro ("we", "us", or "our") operates the website and provides AI automation services. This policy outlines how we handle your data.
                        </p>
                    </div>

                    <div className="legal-content">
                        <Section number="1" title="Information Collection">
                            <p style={{ marginBottom: '1rem' }}>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
                            <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }}>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Personal Data:</strong> Personally identifiable information including Email address, First/Last name, Phone number, and Business details.</li>
                                <li><strong>Usage Data:</strong> Information on how the Service is accessed (IP address, browser type, pages visited).</li>
                            </ul>
                        </Section>

                        <Section number="2" title="Use of Data">
                            <p style={{ marginBottom: '1rem' }}>Fluxaro uses the collected data for various purposes:</p>
                            <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }}>
                                <li style={{ marginBottom: '0.5rem' }}>To provide and maintain the Service</li>
                                <li style={{ marginBottom: '0.5rem' }}>To notify you about changes to our Service</li>
                                <li style={{ marginBottom: '0.5rem' }}>To allow active participation (e.g. AI chatbots)</li>
                                <li>To provide customer support and analysis</li>
                            </ul>
                        </Section>

                        <Section number="3" title="Data Transfer & Partners">
                            <p style={{ marginBottom: '1rem' }}>
                                We may employ third party companies to facilitate our Service. Currently, we utilize:
                            </p>
                            <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }}>
                                <li style={{ marginBottom: '0.5rem' }}><strong>OpenAI:</strong> NLP and AI generation.</li>
                                <li style={{ marginBottom: '0.5rem' }}><strong>AWS:</strong> Cloud infrastructure.</li>
                                <li><strong>Stripe:</strong> Payment processing.</li>
                            </ul>
                            <p style={{ marginTop: '1rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                These providers only access data necessary to perform their tasks and are obligated not to disclose it.
                            </p>
                        </Section>

                        <Section number="4" title="Security">
                            The security of your data is important to us. We use commercially acceptable means to protect your Personal Data, but remember that no method of transmission over the Internet is 100% secure.
                        </Section>

                        <Section number="5" title="Contact Us">
                            If you have any questions about this Privacy Policy, please contact us via our website or at privacy@fluxaro.tech.
                        </Section>
                    </div>

                    <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to="/" style={{ fontWeight: '600', color: '#0f3c64', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            ← Return to Home
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

const Section = ({ number, title, children }) => (
    <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{
            fontSize: '1.4rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem'
        }}>
            <span style={{
                background: '#f1f5f9',
                color: '#64748b',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem'
            }}>{number}</span>
            {title}
        </h2>
        <div style={{ color: '#475569', paddingLeft: '3.2rem' }}>
            {children}
        </div>
    </div>
)
