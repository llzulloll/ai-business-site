import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function LandingPage() {
    const [wizardStep, setWizardStep] = useState('question') // 'question' or 'result'

    // ... existing state ... 

    const HeroBackground = () => (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, background: 'linear-gradient(to bottom, #f8fafc, #fff)' }}>

            {/* Animated Grid */}
            <motion.div
                animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.4
                }}
            />

            {/* Blob 1 - Cyan (Top Left) */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)', // Cyan
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                }}
            />

            {/* Blob 2 - Purple (Bottom Right) */}
            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    top: '30%',
                    right: '-10%',
                    width: '700px',
                    height: '700px',
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)', // Violet
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                }}
            />

            {/* Blob 3 - Blue (Center Pulse) */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '30%',
                    width: '800px',
                    height: '800px',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)', // Blue
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                }}
            />

            {/* Floating Particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                        y: -1000,
                        opacity: [0, 1, 0],
                        x: Math.sin(i) * 100 // Slight wave
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        delay: i * 2,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        left: `${10 + (i * 12)}%`,
                        bottom: '-10%',
                        width: '6px',
                        height: '6px',
                        background: i % 2 === 0 ? '#3b82f6' : '#06b6d4',
                        borderRadius: '50%',
                        boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                    }}
                />
            ))}
        </div>
    )

    const AnimatedLogo = ({ label, color, icon, delay }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.05 }}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#475569', // Default slate
                cursor: 'default'
            }}
        >
            <span style={{ fontSize: '1.2rem' }}>{icon}</span>
            <span style={{ color: color }}>{label}</span>
        </motion.div>
    )

    const StatItem = ({ number, label, delay }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5, type: "spring" }}
        >
            <h3 style={{
                fontSize: '3.5rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #0f3c64 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
            }}>
                {number}
            </h3>
            <p style={{ color: '#64748b', fontWeight: '600', fontSize: '1.1rem' }}>{label}</p>
        </motion.div>
    )
    const [wizardResult, setWizardResult] = useState(null)

    const handleWizardChoice = (choice) => {
        let result = {}
        if (choice === 'calls') {
            result = {
                title: 'You need an AI Phone Receptionist.',
                desc: 'Stop losing leads to missed calls. Our AI answers 24/7.',
                cta: 'View Receptionist Pricing',
                link: '/pricing'
            }
        } else if (choice === 'website') {
            result = {
                title: 'You need a Conversion-Focused Website.',
                desc: 'Turn visitors into customers with a professional site.',
                cta: 'View Website Packages',
                link: '/pricing'
            }
        } else {
            result = {
                title: 'You need our All-In-One Growth Bundle.',
                desc: 'Get a website that captures leads and an AI that calls them back instantly.',
                cta: 'Contact for Custom Quote',
                link: '/contact'
            }
        }
        setWizardResult(result)
        setWizardStep('result')
    }

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    }

    const PARTNERS = [
        { label: "OpenAI", color: "#000000", icon: "⚡️" },
        { label: "n8n", color: "#ff6b6b", icon: "🔄" },
        { label: "AWS", color: "#ff9900", icon: "☁️" },
        { label: "Zapier", color: "#ff4f00", icon: "🟠" },
        { label: "Vercel", color: "#000000", icon: "▲" },
        { label: "Stripe", color: "#635bff", icon: "💳" }
    ]

    const TESTIMONIALS = [
        {
            text: "Before Fluxaro, we were missing about 30% of calls during lunch rushes. Now the AI handles everything, takes reservations, and even answers questions about the menu. It's paid for itself ten times over.",
            name: "Alex Martinez",
            role: "Owner, Table 42 Bistro",
            initials: "AM",
            color: "#ef4444"
        },
        {
            text: "We needed a professional site fast. The team built a stunning 10-page site in a week, and the integrated AI chat widget is already qualifying leads for our sales team. Highly recommended.",
            name: "Priya Sharma",
            role: "Director of Ops, FinTech Solutions",
            initials: "PS",
            color: "#3b82f6"
        },
        {
            text: "Our dental practice front desk was overwhelmed. The AI receptionist now handles rescheduling and basic queries, freeing our staff to focus on patient care. It sounds incredibly human.",
            name: "Dr. Sarah Jenkins",
            role: "Lead Dentist, Bright Smiles",
            initials: "SJ",
            color: "#10b981"
        },
        {
            text: "I was skeptical about AI, but the website overhaul and automated booking system doubled our consultation rate in the first month. The investment was worth every penny.",
            name: "Marcus Reynolds",
            role: "Real Estate Broker, Prime Estates",
            initials: "MR",
            color: "#f59e0b"
        },
        {
            text: "The legal intake bot is a game changer. It qualifies potential clients before they even speak to a lawyer, saving us hours of non-billable time every single week.",
            name: "Michael Chen",
            role: "Partner, Chen & Associates",
            initials: "MC",
            color: "#8b5cf6"
        },
        {
            text: "Finally, a tech partner that understands small business. The setup was seamless, and having a website that actually brings in customers has been transformative for my boutique.",
            name: "Emily Carter",
            role: "Founder, Carter & Co",
            initials: "EC",
            color: "#ec4899"
        }
    ]

    return (
        <div style={{ overflowX: 'hidden' }}>

            {/* HERO SECTION */}
            <section className="section text-center" style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '6rem', position: 'relative', overflow: 'hidden' }}>
                <HeroBackground />
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="container"
                    style={{ position: 'relative', zIndex: 1 }}
                >
                    <motion.div variants={fadeInUp}>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, color: 'var(--primary-color)' }}>
                            Never Miss Another Call. <br />
                            <span style={{ color: '#0f172a' }}>Never Lose Another Lead.</span>
                        </h1>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '850px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
                            AI Phone Receptionists that answer 24/7, capture leads, and book appointments —
                            plus conversion-focused websites with intelligent chat widgets.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
                        <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                            📞 Get AI Phone Receptionist
                        </Link>
                        <Link to="/services" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                            Explore Solutions
                        </Link>
                    </motion.div>

                    <motion.div variants={fadeInUp} style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                        One-time setup • Pay-per-call pricing • No monthly subscriptions
                    </motion.div>
                </motion.div>
            </section>

            {/* TRUST / POWERED BY SECTION */}
            <section className="container text-center" style={{ paddingBottom: '4rem' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Powered by industry leaders</p>

                <div style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '1rem 0' }}>
                    {/* Gradient Masks */}
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to right, #fff, transparent)', zIndex: 2 }}></div>
                    <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to left, #fff, transparent)', zIndex: 2 }}></div>

                    <motion.div
                        style={{ display: 'flex', gap: '4rem', width: 'fit-content', alignItems: 'center' }}
                        animate={{ x: ["0%", "-33.33%"] }} // Scroll 1/3 since we triple the list
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30
                        }}
                    >
                        {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (
                            <div key={i} style={{ flexShrink: 0 }}>
                                <AnimatedLogo label={p.label} color={p.color} icon={p.icon} delay={0} />
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div style={{ marginTop: '2.5rem' }}>
                    <span style={{ background: '#f8fafc', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.8rem', color: '#64748b', fontWeight: '600', border: '1px solid #e2e8f0' }}>
                        🔒 ISO-aligned practices • GDPR-aware
                    </span>
                </div>
                {/* POWERED BY END */}
            </section>

            {/* IMPACT STATS SECTION */}
            <section style={{ padding: '4rem 0', background: 'linear-gradient(to right, #f8fafc, #edf2f7)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                        <StatItem number="30%" label="More Website Leads" delay={0} />
                        <StatItem number="24/7" label="Instant Response Time" delay={0.1} />
                        <StatItem number="0" label="Missed Business Calls" delay={0.2} />
                        <StatItem number="10x" label=" ROI on Automation" delay={0.3} />
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS MARQUEE */}
            <section className="section" style={{ overflow: 'hidden', background: '#fff', padding: '6rem 0' }}>
                <h2 className="text-center" style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>Trusted by Growing Businesses</h2>

                <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
                    {/* Gradient Masks for smooth fade edges */}
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to right, #fff, transparent)', zIndex: 2 }}></div>
                    <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to left, #fff, transparent)', zIndex: 2 }}></div>

                    <motion.div
                        style={{ display: 'flex', gap: '2rem', width: 'fit-content' }}
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 40 // Adjust speed here
                        }}
                    >
                        {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                            <div
                                key={i}
                                className="modern-card"
                                style={{
                                    width: '400px',
                                    flexShrink: 0,
                                    background: '#f8fafc',
                                    border: '1px solid #e2e8f0'
                                }}
                            >
                                <div style={{ color: '#fbbf24', fontSize: '1.2rem', marginBottom: '1rem' }}>★★★★★</div>
                                <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: '#334155', fontSize: '1.05rem', lineHeight: '1.6' }}>
                                    "{t.text}"
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: t.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                        {t.initials}
                                    </div>
                                    <div>
                                        <strong style={{ color: '#0f172a', display: 'block' }}>{t.name}</strong>
                                        <span className="text-muted" style={{ fontSize: '0.85rem' }}>{t.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* SERVICES SUMMARY */}
            <section className="section container text-center">
                <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Our Solutions</h2>
                <p style={{ maxWidth: '800px', margin: '0 auto 4rem', fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                    We provide the infrastructure for modern business growth.
                </p>

                <div className="grid-2">
                    <motion.div whileHover={{ y: -5 }} className="modern-card">
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📞</div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>AI Receptionists</h3>
                        <p className="text-muted" style={{ marginBottom: '2rem' }}>
                            24/7 call answering, lead capture, and appointment booking.
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                            <Link to="/services" className="btn btn-secondary" style={{ width: '100%' }}>Learn More</Link>
                            <Link to="/demos/ai-receptionist" className="btn" style={{ width: '100%', background: '#dcfce7', color: '#166534', border: 'none' }}>🎙️ Try AI Simulator</Link>
                        </div>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} className="modern-card">
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌐</div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>High-Convert Websites</h3>
                        <p className="text-muted" style={{ marginBottom: '2rem' }}>
                            Professional sites designed to turn visitors into paying customers.
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                            <Link to="/services" className="btn btn-secondary" style={{ width: '100%' }}>Learn More</Link>
                            <Link to="/demos" className="btn" style={{ width: '100%', background: '#dbeafe', color: '#1e40af', border: 'none' }}>🌐 View Examples</Link>
                        </div>
                    </motion.div>
                </div>

                <div style={{ marginTop: '3rem' }}>
                    <Link to="/services" style={{ fontWeight: '600', color: 'var(--primary-color)', fontSize: '1.1rem', textDecoration: 'underline' }}>
                        View Full Service Details &rarr;
                    </Link>
                </div>
            </section>

            {/* INTERACTIVE WIZARD SECTION */}
            <section className="section container text-center" style={{ background: '#f8fafc', borderRadius: '20px', padding: '4rem 2rem', margin: '4rem auto' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Find Your Perfect Solution</h2>
                <p className="text-muted" style={{ marginBottom: '3rem' }}>Answer a quick question to get a recommendation.</p>

                <div style={{ background: '#fff', padding: '3rem', borderRadius: '12px', maxWidth: '800px', margin: '0 auto', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', minHeight: '300px' }}>
                    <AnimatePresence mode="wait">
                        {wizardStep === 'question' ? (
                            <motion.div
                                key="question"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                            >
                                <p style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '2rem', textAlign: 'left' }}>
                                    What's your biggest challenge right now?
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                                    <button onClick={() => handleWizardChoice('calls')} className="modern-card" style={{ padding: '1.5rem', textAlign: 'left', cursor: 'pointer', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
                                        📞 I'm missing phone calls and losing leads
                                    </button>
                                    <button onClick={() => handleWizardChoice('website')} className="modern-card" style={{ padding: '1.5rem', textAlign: 'left', cursor: 'pointer', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
                                        🌐 I need a more professional website
                                    </button>
                                    <button onClick={() => handleWizardChoice('both')} className="modern-card" style={{ padding: '1.5rem', textAlign: 'left', cursor: 'pointer', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
                                        🚀 I need both calls and a website
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💡</div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>{wizardResult.title}</h3>
                                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                                    {wizardResult.desc}
                                </p>
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                    <Link to={wizardResult.link} className="btn btn-primary">{wizardResult.cta}</Link>
                                    <button onClick={() => setWizardStep('question')} className="btn btn-secondary">Start Over</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="section text-center">
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Simple, Transparent Pricing</h2>
                <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                    One-time setup. Pay only for what you use. No hidden fees or monthly subscriptions.
                </p>
                <Link to="/pricing" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>See Pricing Plans</Link>
            </section>

        </div>
    )
}
