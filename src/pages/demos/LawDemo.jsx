
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatWidget from '../../components/ChatWidget'

export default function LawDemo() {
    const [modalOpen, setModalOpen] = useState(false)
    const [activeAccordion, setActiveAccordion] = useState(null)

    const faqs = [
        { q: "How much does a consultation cost?", a: "Our initial consultation is completely free. We review your case and discuss your options with no financial obligation." },
        { q: "Do I pay if we don't win?", a: "No. We operate on a contingency fee basis. You only pay legal fees if we secure a settlement or verdict in your favor." },
        { q: "How long will my case take?", a: "Every case is unique. Simple settlements may take months, while complex litigation can take years. We strive for efficiency without compromising results." }
    ]

    return (
        <div style={{ fontFamily: '"Merriweather", serif', color: '#1a1a1a', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <style>{`
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&family=Open+Sans:wght@400;600&display=swap');
        .law - btn {
    background: #003366;
    color: #fff;
    padding: 1rem 2.5rem;
    font - weight: bold;
    border: none;
    cursor: pointer;
    font - family: 'Open Sans', sans - serif;
    transition: all 0.3s;
    text - transform: uppercase;
    letter - spacing: 1px;
}
        .law - btn:hover {
    background: #d4af37;
    transform: translateY(-2px);
    box - shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
        .practice - card {
    transition: all 0.3s;
    cursor: pointer;
}
        .practice - card:hover {
    transform: translateY(-5px);
    box - shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border - color: #d4af37!important;
}
`}</style>

            {/* Header */}
            <header style={{ background: '#003366', color: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#d4af37' }}>⚖️</span> ELITE LEGAL
                </div>
                <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '0.9rem', display: 'none', md: { display: 'block' } }}>
                    <span style={{ marginRight: '2rem', cursor: 'pointer' }} onClick={() => document.getElementById('areas').scrollIntoView({ behavior: 'smooth' })}>PRACTICE AREAS</span>
                    <span style={{ marginRight: '2rem', cursor: 'pointer' }} onClick={() => document.getElementById('results').scrollIntoView({ behavior: 'smooth' })}>RESULTS</span>
                    <span style={{ marginRight: '2rem', cursor: 'pointer' }} onClick={() => document.getElementById('faq').scrollIntoView({ behavior: 'smooth' })}>FAQ</span>
                    <span style={{ cursor: 'pointer', fontWeight: 'bold', color: '#d4af37' }} onClick={() => setModalOpen(true)}>CONTACT</span>
                </div>
                <button className="law-btn" style={{ padding: '0.5rem 1.5rem', fontSize: '0.8rem' }} onClick={() => setModalOpen(true)}>Free Consult</button>
            </header>

            {/* Hero */}
            <section style={{
                background: 'linear-gradient(rgba(0,51,102,0.85), rgba(0,51,102,0.7)), url(https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#fff',
                padding: '10rem 2rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>Justice You Can Trust</h1>
                    <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '1.3rem', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
                        Decades of experience fighting for your rights. We provide comprehensive legal solutions with a track record of uncompromising dedication.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button className="law-btn" style={{ background: '#d4af37' }} onClick={() => setModalOpen(true)}>Free Case Evaluation</button>
                        <button className="law-btn" style={{ background: 'transparent', border: '2px solid #fff' }} onClick={() => document.getElementById('results').scrollIntoView({ behavior: 'smooth' })}>View Results</button>
                    </div>
                </motion.div>
            </section>

            {/* Statistics / Results */}
            <section id="results" style={{ padding: '6rem 2rem', background: '#fff', textAlign: 'center' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ marginBottom: '4rem', fontSize: '2.5rem', color: '#003366' }}>Proven Results</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                            <div style={{ fontSize: '3.5rem', fontWeight: '900', color: '#d4af37' }}>25+</div>
                            <div style={{ fontFamily: 'Open Sans, sans-serif', marginTop: '0.5rem', fontWeight: 'bold', color: '#333' }}>Years Experience</div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            <div style={{ fontSize: '3.5rem', fontWeight: '900', color: '#d4af37' }}>$500M</div>
                            <div style={{ fontFamily: 'Open Sans, sans-serif', marginTop: '0.5rem', fontWeight: 'bold', color: '#333' }}>Recovered for Clients</div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <div style={{ fontSize: '3.5rem', fontWeight: '900', color: '#d4af37' }}>5k+</div>
                            <div style={{ fontFamily: 'Open Sans, sans-serif', marginTop: '0.5rem', fontWeight: 'bold', color: '#333' }}>Cases Won</div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                            <div style={{ fontSize: '3.5rem', fontWeight: '900', color: '#d4af37' }}>98%</div>
                            <div style={{ fontFamily: 'Open Sans, sans-serif', marginTop: '0.5rem', fontWeight: 'bold', color: '#333' }}>Success Rate</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Practice Areas */}
            <section id="areas" style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem', color: '#003366' }}>Our Practice Areas</h2>
                <div style={{ width: '100px', height: '4px', background: '#d4af37', margin: '0 auto 4rem' }}></div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {['Corporate Litigation', 'Intellectual Property', 'Family Law', 'Real Estate', 'Personal Injury', 'Estate Planning'].map((area, i) => (
                        <div key={i} className="practice-card" style={{ padding: '2.5rem', border: '1px solid #e1e1e1', borderRadius: '4px', background: '#fff', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#003366' }}>
                                {['🏢', '💡', '👨‍👩‍👧', '🏠', '🤕', '📜'][i]}
                            </div>
                            <h3 style={{ color: '#003366', marginBottom: '1rem', fontFamily: 'Merriweather, serif' }}>{area}</h3>
                            <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '0.95rem', color: '#666', lineHeight: '1.6' }}>
                                Comprehensive representation with a track record of success in complex {area.toLowerCase()} matters.
                            </p>
                            <div style={{ marginTop: '1.5rem', height: '2px', width: '30px', background: '#d4af37' }}></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Accordion */}
            <section id="faq" style={{ padding: '6rem 2rem', background: '#003366', color: '#fff' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Frequently Asked Questions</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {faqs.map((faq, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                <button
                                    onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                                    style={{ width: '100%', padding: '1.5rem', textAlign: 'left', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontFamily: 'Merriweather' }}
                                >
                                    {faq.q}
                                    <span>{activeAccordion === i ? '−' : '+'}</span>
                                </button>
                                <AnimatePresence>
                                    {activeAccordion === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <div style={{ padding: '0 1.5rem 1.5rem', color: '#ccc', lineHeight: '1.6', fontFamily: 'Open Sans' }}>
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section style={{ padding: '6rem 2rem', background: '#f5f5f5' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', background: '#fff', padding: '4rem', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', borderTop: '5px solid #d4af37', borderRadius: '4px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#003366' }}>Request a Free Consultation</h2>
                    <p style={{ textAlign: 'center', marginBottom: '3rem', color: '#666', fontFamily: 'Open Sans' }}>Fill out the form below and our team will get back to you within 24 hours.</p>

                    <form style={{ display: 'grid', gap: '1.5rem' }} onSubmit={(e) => { e.preventDefault(); alert("Lead Captured! Sent to CRM."); setModalOpen(false); }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'Open Sans', fontWeight: '600', fontSize: '0.9rem' }}>Full Name</label>
                                <input type="text" required style={{ width: '100%', padding: '1rem', border: '1px solid #ddd', fontFamily: 'Open Sans, sans-serif', borderRadius: '4px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'Open Sans', fontWeight: '600', fontSize: '0.9rem' }}>Phone Number</label>
                                <input type="tel" required style={{ width: '100%', padding: '1rem', border: '1px solid #ddd', fontFamily: 'Open Sans, sans-serif', borderRadius: '4px' }} />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'Open Sans', fontWeight: '600', fontSize: '0.9rem' }}>Email Address</label>
                            <input type="email" required style={{ width: '100%', padding: '1rem', border: '1px solid #ddd', fontFamily: 'Open Sans, sans-serif', borderRadius: '4px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'Open Sans', fontWeight: '600', fontSize: '0.9rem' }}>Case Details</label>
                            <textarea rows="4" required style={{ width: '100%', padding: '1rem', border: '1px solid #ddd', fontFamily: 'Open Sans, sans-serif', borderRadius: '4px' }}></textarea>
                        </div>
                        <button className="law-btn" style={{ width: '100%', fontSize: '1.1rem', marginTop: '1rem' }}>Submit Request</button>
                    </form>
                </div>
            </section>

            {/* Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,30,60,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
                        onClick={() => setModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={{ background: '#fff', padding: '3rem', maxWidth: '500px', width: '100%', borderRadius: '4px', position: 'relative' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#003366', fontFamily: 'Merriweather' }}>Get Legal Help</h3>
                            <p style={{ fontFamily: 'Open Sans', marginBottom: '2rem', color: '#666' }}>Call us immediately or leave your details.</p>

                            <a href="tel:5551234567" style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#f5f5f5', padding: '1rem', borderRadius: '4px', textDecoration: 'none', color: '#333', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '1.5rem' }}>📞</span>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>Call Now</div>
                                    <div>(555) 123-4567</div>
                                </div>
                            </a>

                            <div style={{ textAlign: 'center', margin: '2rem 0', color: '#ccc' }}>— OR —</div>

                            <button className="law-btn" style={{ width: '100%' }} onClick={() => { setModalOpen(false); document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' }); }}>Fill Contact Form</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AI Bot */}
            {/* AI Bot */}
            <ChatWidget
                agentName="Legal Assistant Sarah"
                avatar="⚖️"
                initialMessage="Hello. I am the AI intake assistant for Elite Legal. I can help qualify your case or schedule a consultation with an attorney."
                themeColor="#2c3e50"
            />
        </div>
    )
}
