import { Link } from 'react-router-dom'

export default function PricingPage() {
    const assistantPlans = [
        {
            name: 'Basic Receptionist',
            price: '$99',
            unit: '/mo',
            features: ['Answers FAQs', 'Takes Messages', 'Forwarding to Mobile', 'Standard Voice'],
            cta: 'Choose Basic'
        },
        {
            name: 'Smart Booking Agent',
            price: '$199',
            unit: '/mo',
            features: ['Table/Appt Booking', 'Calendar Integration', 'Custom Knowledge Base', 'Premium Voices'],
            cta: 'Choose Smart',
            highlight: true
        }
    ]

    const websitePlans = [
        {
            name: 'One-Page Starter',
            setup: '$499',
            maintenance: '$49/mo',
            features: ['Custom One-Page Design', 'Mobile Responsive', 'SEO Basic Setup', 'Hosting Included', '1 Hr Monthly Updates'],
            cta: 'Get Started'
        },
        {
            name: 'Full Business Site',
            setup: '$999',
            maintenance: '$99/mo',
            features: ['5-Page Custom Site', 'Blog/News Section', 'Advanced SEO', 'Analytics Dashboard', 'Priority Support'],
            cta: 'Go Premium',
            highlight: true
        }
    ]

    return (
        <div className="container section">
            <div className="text-center" style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem' }}>Simple, Clear Pricing</h1>
                <p style={{ color: '#aaa', fontSize: '1.2rem' }}>Separate plans for AI Assistants and Website Development. Mix and match what you need.</p>
            </div>

            {/* AI Assistants Section */}
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>🤖 AI Phone Assistants</h2>
            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
                {assistantPlans.map((plan, index) => (
                    <div key={index} className="card" style={{
                        textAlign: 'center',
                        border: plan.highlight ? '2px solid var(--primary-color)' : '1px solid #333',
                    }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{plan.name}</h3>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>
                            {plan.price}<span style={{ fontSize: '1rem', color: '#aaa', fontWeight: 'normal' }}>{plan.unit}</span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', textAlign: 'left', display: 'inline-block' }}>
                            {plan.features.map((feature, i) => (
                                <li key={i} style={{ marginBottom: '0.5rem', color: '#ccc' }}>
                                    <span style={{ color: 'var(--primary-color)', marginRight: '0.5rem' }}>✓</span> {feature}
                                </li>
                            ))}
                        </ul>
                        <div><button className="btn btn-primary" style={{ width: '100%' }}>{plan.cta}</button></div>
                    </div>
                ))}
            </div>

            {/* Websites Section */}
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>🌐 Website Development</h2>
            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {websitePlans.map((plan, index) => (
                    <div key={index} className="card" style={{
                        textAlign: 'center',
                        border: plan.highlight ? '2px solid var(--secondary-color)' : '1px solid #333',
                    }}>
                        {plan.highlight && (
                            <div style={{ background: 'var(--secondary-color)', color: '#fff', padding: '0.2rem', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem', borderRadius: '4px' }}>
                                BEST VALUE
                            </div>
                        )}
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{plan.name}</h3>
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff' }}>
                                {plan.setup} <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#aaa' }}>Setup Fee</span>
                            </div>
                            <div style={{ fontSize: '1.2rem', color: '#ccc' }}>
                                + {plan.maintenance} maintenance
                            </div>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', textAlign: 'left', display: 'inline-block' }}>
                            {plan.features.map((feature, i) => (
                                <li key={i} style={{ marginBottom: '0.5rem', color: '#ccc' }}>
                                    <span style={{ color: 'var(--secondary-color)', marginRight: '0.5rem' }}>✓</span> {feature}
                                </li>
                            ))}
                        </ul>
                        <div><button className="btn btn-secondary" style={{ width: '100%', borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)' }}>{plan.cta}</button></div>
                    </div>
                ))}
            </div>

            <div className="text-center" style={{ marginTop: '4rem' }}>
                <h3>Need a custom enterprise solution?</h3>
                <p style={{ color: '#aaa', marginBottom: '1rem' }}>We can build anything you need. Let's talk.</p>
                <Link to="/contact" className="btn btn-secondary" style={{ color: '#fff', borderColor: '#fff' }}>Contact Sales</Link>
            </div>

        </div>
    )
}
