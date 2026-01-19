export default function TermsOfService() {
    return (
        <div className="container section">
            <h1>Terms of Service</h1>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>

            <div style={{ color: '#ccc', lineHeight: '1.8' }}>
                <h2 style={{ color: '#fff', marginTop: '2rem' }}>1. Acceptance of Terms</h2>
                <p>By accessing and using Fluxaro's AI services and website solutions, you accept and agree to be bound by the terms and provision of this agreement.</p>

                <h2 style={{ color: '#fff', marginTop: '2rem' }}>2. Provision of Services</h2>
                <p>We provide AI chatbot integrations and web development services. We reserve the right to modify, suspend, or discontinue any part of the service at any time.</p>

                <h2 style={{ color: '#fff', marginTop: '2rem' }}>3. User Responsibilities</h2>
                <p>You agree to use our services only for lawful purposes. You are responsible for all content sent through our AI assistants.</p>

                <h2 style={{ color: '#fff', marginTop: '2rem' }}>4. Intellectual Property</h2>
                <p>All code, designs, and AI models provided remain the intellectual property of our company unless otherwise stated in a custom enterprise agreement.</p>

                <h2 style={{ color: '#fff', marginTop: '2rem' }}>5. Limitation of Liability</h2>
                <p>We are not liable for any damages that may occur to you as a result of your misuse of our website or products.</p>

                <p style={{ marginTop: '3rem', fontStyle: 'italic' }}>
                    For any questions regarding these terms, please contact us.
                </p>
            </div>
        </div>
    )
}
