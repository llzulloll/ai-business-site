import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        business: '',
        interest: 'ai-receptionist',
        message: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true)
            window.scrollTo(0, 0)
        }, 800)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    if (submitted) {
        return (
            <div className="container section text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="modern-card"
                    style={{ maxWidth: '600px', padding: '4rem' }}
                >
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Message Received!</h1>
                    <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                        Thanks for reaching out, <strong>{formData.name}</strong>. <br />
                        Our team will contact you at {formData.email} regarding your interest in {formData.interest === 'ai-receptionist' ? 'AI Receptionists' : 'Website Development'} shortly.
                    </p>
                    <Link to="/" className="btn btn-primary">Back to Home</Link>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="container section">
            <div className="text-center" style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Start Your Transformation</h1>
                <p className="text-muted" style={{ fontSize: '1.2rem' }}>
                    Ready to automate your business? Fill out the form below or book a call directly.
                </p>
            </div>

            <div className="grid-2" style={{ maxWidth: '1000px', margin: '0 auto', gap: '4rem' }}>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="modern-card"
                >
                    <h2 style={{ marginBottom: '2rem' }}>Send us a message</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>Full Name</label>
                            <input
                                required
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>Email Address</label>
                            <input
                                required
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@company.com"
                                style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>Business Name</label>
                            <input
                                name="business"
                                type="text"
                                value={formData.business}
                                onChange={handleChange}
                                placeholder="Acme Corp"
                                style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>I'm interested in...</label>
                            <select
                                name="interest"
                                value={formData.interest}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem', background: '#fff' }}
                            >
                                <option value="ai-receptionist">AI Phone Receptionist</option>
                                <option value="website">Conversion-Focused Website</option>
                                <option value="both">Both / Custom Solution</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>Anything else?</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Tell us about your specific needs, current website, etc..."
                                style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem', fontFamily: 'inherit' }}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ padding: '1.2rem', fontSize: '1.1rem' }}>Submit Request</button>
                    </form>
                </motion.div>

                {/* Direct Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ paddingTop: '2rem' }}
                >
                    <div style={{ marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Direct Contact</h3>
                        <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                            Prefer to speak with a human immediately? Give us a call or send a direct email.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem' }}>
                                <span style={{ background: '#eff6ff', padding: '1rem', borderRadius: '50%', color: 'var(--primary-color)' }}>📞</span>
                                <strong>(475) 266-1552</strong>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem' }}>
                                <span style={{ background: '#eff6ff', padding: '1rem', borderRadius: '50%', color: 'var(--primary-color)' }}>✉️</span>
                                <strong>hello@fluxaro.tech</strong>
                            </li>
                        </ul>
                    </div>

                    <div className="modern-card" style={{ background: 'var(--primary-color)', color: '#fff' }}>
                        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>FAQ</h3>
                        <p style={{ opacity: 0.9, marginBottom: '1.5rem' }}>
                            Wondering about setup times? We typically get AI Receptionists live within 48 hours of onboarding.
                        </p>
                        <Link to="/pricing" style={{ color: '#fff', textDecoration: 'underline' }}>See Pricing Details &rarr;</Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
