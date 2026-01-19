import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import heroImage from '../assets/hero-ai.png'

export default function LandingPage() {
    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    return (
        <div style={{ overflowX: 'hidden' }}>
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="section text-center"
                style={{
                    minHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 1rem',
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed'
                }}
            >
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                    style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: '1.1', textShadow: '0 0 20px rgba(0, 243, 255, 0.5)' }}
                >
                    Missed Calls Mean <span className="text-gradient">Missed Business</span>.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    style={{ fontSize: '1.5rem', marginBottom: '2.5rem', color: '#e0e0e0', maxWidth: '750px', margin: '0 auto 3rem' }}
                >
                    You’re busy running your business. Let our AI handle the phones and build your online presence, so you can focus on what you really love.
                </motion.p>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, type: 'spring' }}
                    style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}
                >
                    <Link to="/pricing" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>See Our Plans</Link>
                    <Link to="/demos" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Explore Demos</Link>
                </motion.div>
            </motion.section>

            {/* Problem/Solution Section */}
            <section className="section container">
                <div className="grid-2" style={{ alignItems: 'center' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeIn}
                    >
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>We Get It. Running a Business is Hard.</h2>
                        <p style={{ fontSize: '1.1rem', color: '#aaa', marginBottom: '1.5rem' }}>
                            You don't have time to answer every phone call or figure out how to build a website. But in today's world, if you're not online or answering the phone, customers go to your competitors.
                        </p>
                        <p style={{ fontSize: '1.1rem', color: '#aaa' }}>
                            That's where we come in. We provide affordable, high-tech solutions that act like a full-time receptionist and marketing team—for a fraction of the cost.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{ background: 'var(--card-bg)', padding: '2.5rem', borderRadius: '15px', border: '1px solid #333', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}
                    >
                        <h3 className="text-primary" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>What We Do</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {[
                                { icon: '📞', title: 'AI Phone Assistants', desc: 'Never miss a reservation or inquiry again.' },
                                { icon: '🌐', title: 'Professional Websites', desc: 'Stunning designs that bring customers in.' },
                                { icon: '⚡', title: 'Zero Hassle', desc: 'We build, manage, and update everything for you.' }
                            ].map((item, i) => (
                                <li key={i} style={{ marginBottom: '1.5rem', fontSize: '1.1rem', display: 'flex', gap: '1rem' }}>
                                    <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                                    <div>
                                        <strong>{item.title}:</strong> {item.desc}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Demo Portfolio Section */}
            <section id="demos" className="section container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>See What We Can Build For You</h2>
                    <p style={{ color: '#aaa', marginBottom: '4rem', fontSize: '1.2rem' }}>Check out our recent work for businesses just like yours.</p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid-2"
                    style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}
                >
                    {[
                        { title: "The Rustic Spoon", type: "Restaurant", color: "#e67e22", link: "/demos/restaurant" },
                        { title: "Elite Legal", type: "Law Firm", color: "#3498db", link: "/demos/law" },
                        { title: "Sparkle Dental", type: "Clinic", color: "#2ecc71", link: "/demos/dental" }
                    ].map((demo, i) => (
                        <motion.div
                            key={i}
                            variants={fadeIn}
                            className="card"
                            style={{ padding: 0, overflow: 'hidden', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
                            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 243, 255, 0.1)' }}
                        >
                            <div style={{ height: '220px', background: demo.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.8rem', fontWeight: 'bold' }}>
                                {demo.title} Demo
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <h3>{demo.title}</h3>
                                <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>High-converting {demo.type} website with integrated booking AI.</p>
                                <Link to={demo.link} className="btn btn-secondary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>Preview Site</Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="text-center" style={{ marginTop: '3rem' }}>
                    <Link to="/demos" style={{ color: '#fff', textDecoration: 'underline', fontSize: '1.1rem' }}>View All Demos in Showcase &rarr;</Link>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section container">
                <h2 className="text-center" style={{ fontSize: '3rem', marginBottom: '4rem' }}>Trusted by Local Business Owners</h2>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid-2"
                    style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
                >
                    {[
                        { name: "Sarah J.", biz: "Cafe Owner", text: "I used to miss lunch orders when it got busy. Now the AI handles it all. It's paid for itself ten times over!" },
                        { name: "Mike T.", biz: "Plumber", text: "I don't know anything about websites. They built me a beautiful site and now I'm ranking #1 in my town." },
                        { name: "Elena R.", biz: "Salon Manager", text: "The booking assistant is a lifesaver. No more phone tag. My clients love it." }
                    ].map((review, i) => (
                        <motion.div
                            key={i}
                            variants={fadeIn}
                            className="card"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div style={{ color: '#f1c40f', fontSize: '1.5rem', marginBottom: '1rem' }}>★★★★★</div>
                            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem', color: '#e0e0e0' }}>"{review.text}"</p>
                            <div>
                                <strong>{review.name}</strong>
                                <div style={{ color: '#aaa', fontSize: '0.9rem' }}>{review.biz}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Final CTA */}
            <section className="section text-center" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0, 243, 255, 0.1) 100%)', padding: '6rem 1rem' }}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Stop Losing Customers. Start Growing.</h2>
                    <p style={{ marginBottom: '2.5rem', color: '#ccc', fontSize: '1.3rem' }}>Get your professional AI assistant and website today.</p>
                    <Link to="/pricing" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.2rem' }}>View Pricing Plans</Link>
                </motion.div>
            </section>
        </div>
    )
}
