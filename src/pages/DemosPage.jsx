
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function DemosPage() {
    const siteUpgrades = [
        {
            id: "revamp",
            title: "Website Transformation",
            description: "See the power of a modern redesign. Drag the slider to compare 1990s web design with 2026 standards.",
            path: "/demos/revamp",
            color: "linear-gradient(135deg, #2c3e50 0%, #000000 100%)",
            features: ["Interactive Comparison", "Before/After Slider", "Instant Modernization"]
        }
    ]
    const aiDemos = [
        {
            id: "restaurant",
            title: "Restaurant Host",
            role: "Hostess Bella",
            description: "Takes reservations, answers menu questions, and handles peak-hour traffic.",
            color: "#e67e22",
            path: "/demos/ai-receptionist?type=restaurant"
        },
        {
            id: "dental",
            title: "Dental Scheduler",
            role: "Receptionist Alex",
            description: "Books cleanings, triages emergencies, and manages patient intake.",
            color: "#0ea5e9",
            path: "/demos/ai-receptionist?type=dental"
        },
        {
            id: "law",
            title: "Legal Intake",
            role: "Assistant Sarah",
            description: "Screens potential clients, qualifies leads, and schedules consultations.",
            color: "#0f3c64",
            path: "/demos/ai-receptionist?type=law"
        }
    ]

    const webDemos = [
        {
            id: "restaurant",
            title: "The Rustic Spoon",
            type: "Hospitality",
            description: "A sensory experience. Features parallax scrolling, reservation AI, and dynamic menu showcases.",
            image: "/images/demos/restaurant_demo_thumb.png",
            path: "/demos/restaurant",
            features: ["Reservation System", "Dynamic Menu", "Reviews Integration"]
        },
        {
            id: "law",
            title: "Elite Legal",
            type: "Professional Services",
            description: "Authoritative and trustworthy. Designed to convert visitors into clients with trust markers.",
            image: "/images/demos/law_demo_thumb.png",
            path: "/demos/law",
            features: ["Lead Capture Form", "Case Results", "Practice Areas"]
        },
        {
            id: "dental",
            title: "Sparkle Dental",
            type: "Healthcare",
            description: "Clean, calming, and efficient. Integrated appointment scheduling and patient-first design.",
            image: "/images/demos/dental_demo_thumb.png",
            path: "/demos/dental",
            features: ["Appointment Picker", "Team Carousel", "Service Icons"]
        }
    ]

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    }

    return (
        <div style={{ padding: '6rem 1rem' }} className="container">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
                style={{ marginBottom: '5rem' }}
            >
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                    Live <span className="text-gradient">Demonstrations</span>
                </h1>
                <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                    Experience the future of business automation. Test our AI voice agents and explore our high-conversion websites.
                </p>
            </motion.div>

            {/* SECTION: WEBSITE TRANSFORMATIONS */}
            <div style={{ marginBottom: '6rem' }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    marginBottom: '3rem',
                    textAlign: 'center',
                    background: 'linear-gradient(to right, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: '800'
                }}>Website Transformations</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    {siteUpgrades.map(demo => (
                        <Link to={demo.path} key={demo.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <motion.div
                                whileHover={{ y: -10 }}
                                style={{
                                    background: '#fff',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <div style={{
                                    height: '200px',
                                    background: demo.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}>
                                    <div style={{ fontSize: '4rem' }}>✨</div>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '1rem',
                                        background: 'rgba(255,255,255,0.2)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '50px',
                                        color: '#fff',
                                        fontSize: '0.9rem',
                                        backdropFilter: 'blur(5px)'
                                    }}>Click to Try Demo</div>
                                </div>

                                <div style={{ padding: '2.5rem' }}>
                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#1a1a1a' }}>{demo.title}</h3>
                                    <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1.5rem' }}>{demo.description}</p>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {demo.features.map((feature, i) => (
                                            <span key={i} style={{
                                                background: '#f3f4f6',
                                                color: '#4b5563',
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '6px',
                                                fontSize: '0.85rem',
                                                fontWeight: '600'
                                            }}>
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* SECTION 2: WEBSITES */}
            <div>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span style={{ background: '#f0fdf4', padding: '0.5rem', borderRadius: '8px', fontSize: '1.5rem' }}>�</span>
                    High-Performance Websites
                </h2>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid-2"
                    style={{ gap: '3rem' }}
                >
                    {webDemos.map((demo) => (
                        <motion.div
                            key={demo.id}
                            variants={item}
                            className="modern-card"
                            style={{
                                padding: 0,
                                overflow: 'hidden',
                                border: '1px solid #e2e8f0'
                            }}
                            whileHover={{ y: -5 }}
                        >
                            <div style={{
                                height: '200px',
                                background: `url(${demo.image}) center / cover no-repeat`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'rgba(0,0,0,0.4)',
                                    zIndex: 1
                                }}></div>
                                <h2 style={{
                                    fontSize: '2.5rem',
                                    color: '#fff',
                                    textShadow: '0 4px 12px rgba(0,0,0,0.4)',
                                    fontWeight: '800',
                                    zIndex: 2,
                                    position: 'relative'
                                }}>{demo.title}</h2>
                            </div>

                            <div style={{ padding: '2.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <span style={{ color: 'var(--primary-color)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>{demo.type}</span>
                                </div>

                                <p className="text-muted" style={{ lineHeight: '1.6', marginBottom: '2rem' }}>
                                    {demo.description}
                                </p>

                                <div style={{ marginBottom: '2.5rem' }}>
                                    {demo.features.map(f => (
                                        <span key={f} style={{
                                            display: 'inline-block',
                                            background: '#f1f5f9',
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            color: '#475569',
                                            marginRight: '0.5rem',
                                            marginBottom: '0.5rem',
                                            fontWeight: '500'
                                        }}>
                                            {f}
                                        </span>
                                    ))}
                                </div>

                                <Link
                                    to={demo.path}
                                    className="btn btn-secondary"
                                    style={{ width: '100%', textAlign: 'center', border: '1px solid #e2e8f0' }}
                                >
                                    View Live Website
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* SECTION 1: AI VOICE AGENTS */}
            <div style={{ marginBottom: '6rem', marginTop: '6rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span style={{ background: '#f0f9ff', padding: '0.5rem', borderRadius: '8px', fontSize: '1.5rem' }}>🎙️</span>
                    AI Voice Agents
                </h2>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid-3"
                    style={{ gap: '2rem' }}
                >
                    {aiDemos.map((demo) => (
                        <motion.div
                            key={demo.id}
                            variants={item}
                            className="modern-card"
                            style={{ padding: '2rem', textAlign: 'center' }}
                            whileHover={{ y: -5 }}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: demo.color,
                                borderRadius: '50%',
                                margin: '0 auto 1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontSize: '2rem'
                            }}>
                                📞
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{demo.title}</h3>
                            <div style={{ fontSize: '0.9rem', color: demo.color, fontWeight: 'bold', marginBottom: '1rem' }}>{demo.role}</div>
                            <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
                                {demo.description}
                            </p>
                            <Link to={demo.path} className="btn" style={{ background: demo.color, color: '#fff', width: '100%', display: 'block' }}>
                                Start Call Simulator
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
