import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ServicesPage() {
    return (
        <div style={{ paddingBottom: '4rem' }}>
            {/* HER0 */}
            <section className="section text-center" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container"
                >
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
                        Comprehensive AI & Web Solutions
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                        From 24/7 AI receptionists to high-conversion websites, we provide the infrastructure for modern business growth.
                    </p>
                </motion.div>
            </section>

            {/* SERVICES OVERVIEW: AI RECEPTIONIST */}
            <section className="section container text-center">
                <div style={{ background: '#f1f5f9', display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '20px', marginBottom: '1rem', fontWeight: '600', color: '#475569' }}>
                    Primary Service
                </div>
                <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>AI Phone Receptionists</h2>
                <p style={{ maxWidth: '800px', margin: '0 auto 4rem', fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                    Your business never sleeps. Our AI answers every call, captures every lead, and books appointments around the clock — so you never miss an opportunity.
                </p>

                {/* 3 Pillars of Business Model */}
                <div className="grid-3 text-center">
                    <motion.div whileHover={{ scale: 1.02 }} className="modern-card" style={{ border: 'none', boxShadow: 'none', background: 'transparent' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛠️</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>One-Time Setup</h3>
                        <p className="text-muted">No recurring platform fees. Pay once for setup and configuration.</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="modern-card" style={{ border: 'none', boxShadow: 'none', background: 'transparent' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📞</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Pay-Per-Call</h3>
                        <p className="text-muted">Only pay for calls answered. No monthly minimums or hidden fees.</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="modern-card" style={{ border: 'none', boxShadow: 'none', background: 'transparent' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔓</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Subscriptions</h3>
                        <p className="text-muted">Unlike SaaS competitors, you own your system outright.</p>
                    </motion.div>
                </div>

                <div style={{ marginTop: '4rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>Get Your AI Receptionist</Link>
                    <Link to="/demos/ai-receptionist" className="btn" style={{ padding: '1rem 3rem', background: '#dcfce7', color: '#166534' }}>🎙️ Try Live Demo</Link>
                </div>
            </section>

            {/* WEBSITE SERVICES */}
            <section className="section container">
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <div style={{ background: '#f1f5f9', display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '20px', marginBottom: '1rem', fontWeight: '600', color: '#475569' }}>
                        Secondary Service
                    </div>
                    <h2 style={{ fontSize: '3rem' }}>Conversion-Focused Websites</h2>
                    <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                        Professional websites designed to convert visitors into customers — with optional AI chat widgets that qualify leads and answer questions 24/7.
                    </p>
                </div>

                <div className="grid-2">
                    <motion.div whileHover={{ y: -5 }} className="modern-card">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '2rem' }}>
                            🌐 Starter Website
                        </h3>
                        <p className="text-muted" style={{ marginBottom: '2rem' }}>
                            Basic online presence for businesses just getting started.
                        </p>
                        <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                            {["Up to 5 pages", "Mobile responsive", "Contact form", "Basic SEO setup"].map(item => (
                                <li key={item} style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.5rem', color: '#334155' }}>
                                    <span style={{ color: '#22c55e' }}>✓</span> {item}
                                </li>
                            ))}
                            <li style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.5rem', color: '#ef4444' }}>
                                <span>✕</span> No AI chat widget included
                            </li>
                        </ul>
                        <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                            <Link to="/pricing" className="btn btn-secondary" style={{ width: '100%' }}>View Pricing</Link>
                            <Link to="/demos" className="btn" style={{ width: '100%', background: '#f1f5f9', color: '#475569', border: 'none' }}>🌐 View Portfolio</Link>
                        </div>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} className="modern-card" style={{ border: '2px solid var(--primary-color)', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '-15px', right: '2rem', background: 'var(--primary-color)', color: '#fff', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                            Popular
                        </div>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '2rem' }}>
                            ✨ Growth Website
                        </h3>
                        <p className="text-muted" style={{ marginBottom: '2rem' }}>
                            Conversion-focused website with basic AI chat.
                        </p>
                        <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                            {["Up to 10 pages", "Conversion-optimized design", "Lead capture forms", "Analytics integration"].map(item => (
                                <li key={item} style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.5rem', color: '#334155' }}>
                                    <span style={{ color: '#22c55e' }}>✓</span> {item}
                                </li>
                            ))}
                            <li style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.5rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                                <span>💬</span> Basic AI Chat Widget
                            </li>
                            <li style={{ fontSize: '0.9rem', color: 'var(--text-muted)', paddingLeft: '2rem' }}>FAQs & lead capture</li>
                        </ul>
                        <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                            <Link to="/pricing" className="btn btn-secondary" style={{ width: '100%' }}>View Pricing</Link>
                            <Link to="/demos" className="btn" style={{ width: '100%', background: '#dbeafe', color: '#1e40af', border: 'none' }}>🌐 View Portfolio</Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
