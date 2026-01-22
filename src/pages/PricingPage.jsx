import { Link } from 'react-router-dom'

export default function PricingPage() {
    return (
        <div className="container section">
            <div className="text-center" style={{ marginBottom: '5rem' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Simple, Transparent Pricing</h1>
                <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
                    One-time setup. Pay only for what you use. No hidden fees or monthly subscriptions.
                </p>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid-2" style={{ maxWidth: '1000px', margin: '0 auto 6rem' }}>

                {/* AI Receptionist Pricing */}
                <div className="modern-card">
                    <div className="text-center" style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>AI Phone Receptionist</h2>
                        <p className="text-muted">For businesses that need 24/7 call handling</p>
                    </div>

                    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '12px', marginBottom: '2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem' }}>One-Time Setup Fee</div>
                        <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--primary-color)' }}>$299</div>
                    </div>

                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>+ Pay-Per-Call Usage</div>
                        <p className="text-muted">~ $0.20 / min (billed directly by usage)</p>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem' }}>
                        {[
                            "24/7 Call Answering",
                            "Appointment Booking",
                            "Lead Qualification",
                            "SMS Follow-ups",
                            "Custom Knowledge Base",
                            "Call Transcripts"
                        ].map(feature => (
                            <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: '#334155' }}>
                                <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span> {feature}
                            </li>
                        ))}
                    </ul>

                    <button className="btn btn-primary" style={{ width: '100%' }}>Get Started</button>
                    <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8', marginTop: '1rem' }}>Own your system. No monthly platform fee.</p>
                </div>

                {/* Website Pricing */}
                <div className="modern-card">
                    <div className="text-center" style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Conversion Website</h2>
                        <p className="text-muted">Professional sites built to capture leads</p>
                    </div>

                    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '12px', marginBottom: '2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Starting At</div>
                        <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--primary-color)' }}>$499</div>
                    </div>

                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>+ Hosting & Maintenance</div>
                        <p className="text-muted">Optional: $49/mo or self-host for free</p>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem' }}>
                        {[
                            "Custom Modern Design",
                            "Mobile Responsive",
                            "SEO Optimization",
                            "Contact & Booking Forms",
                            "Speed Optimization",
                            "Analytics Dashboard"
                        ].map(feature => (
                            <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: '#334155' }}>
                                <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span> {feature}
                            </li>
                        ))}
                    </ul>

                    <button className="btn btn-secondary" style={{ width: '100%' }}>View Web Packages</button>
                    <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8', marginTop: '1rem' }}>One-time build fee. 100% Ownership.</p>
                </div>
            </div>

            {/* Enterprise / Custom Section */}
            <div className="text-center" style={{ padding: '4rem', background: 'var(--primary-color)', borderRadius: '16px', color: '#fff' }}>
                <h2 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem' }}>Need a Custom Solution?</h2>
                <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                    We build custom enterprise automations, CRM integrations, and advanced AI agents.
                </p>
                <Link to="/contact" className="btn" style={{ background: '#fff', color: 'var(--primary-color)' }}>
                    Contact Sales
                </Link>
            </div>
        </div>
    )
}
