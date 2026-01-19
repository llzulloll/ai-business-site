import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function DemosPage() {
    const demos = [
        {
            id: "restaurant",
            title: "The Rustic Spoon",
            type: "Hospitality",
            description: "A sensory experience. Features parallax scrolling, reservation AI, and dynamic menu showcases. Perfect for high-end dining.",
            color: "linear-gradient(135deg, #e67e22 0%, #d35400 100%)",
            path: "/demos/restaurant",
            features: ["Reservation System", "Dynamic Menu", "Reviews Integration"]
        },
        {
            id: "law",
            title: "Elite Legal",
            type: "Professional Services",
            description: "Authoritative and trustworthy. Designed to convert visitors into clients with trust markers and easy consultation flows.",
            color: "linear-gradient(135deg, #2980b9 0%, #2c3e50 100%)",
            path: "/demos/law",
            features: ["Lead Capture Form", "Case Results", "Practice Areas"]
        },
        {
            id: "dental",
            title: "Sparkle Dental",
            type: "Healthcare",
            description: "Clean, calming, and efficient. Integrated appointment scheduling and patient-first design hierarchy.",
            color: "linear-gradient(135deg, #2ecc71 0%, #16a085 100%)",
            path: "/demos/dental",
            features: ["Appointment Picker", "Team Carousel", "Service Icons"]
        }
    ]

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    }

    return (
        <div style={{ padding: '4rem 1rem' }} className="container">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
                style={{ marginBottom: '4rem' }}
            >
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Our <span className="text-gradient">Masterpieces</span></h1>
                <p style={{ fontSize: '1.2rem', color: '#ccc', maxWidth: '700px', margin: '0 auto' }}>
                    Explore our portfolio of high-performance websites. Each one is a fully functional example of how we can transform your business online.
                </p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid-2"
                style={{ gap: '3rem' }}
            >
                {demos.map((demo) => (
                    <motion.div
                        key={demo.id}
                        variants={item}
                        className="card"
                        style={{
                            padding: 0,
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: '#1a1a1a'
                        }}
                        whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,243,255,0.1)' }}
                    >
                        <div style={{
                            height: '220px',
                            background: demo.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            <h2 style={{ fontSize: '2rem', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>{demo.title}</h2>
                            <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem', color: '#fff' }}>
                                LIVE PREVIEW
                            </div>
                        </div>

                        <div style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--primary-color)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{demo.type}</span>
                            </div>

                            <p style={{ color: '#aaa', lineHeight: '1.6', marginBottom: '2rem' }}>
                                {demo.description}
                            </p>

                            <div style={{ marginBottom: '2rem' }}>
                                {demo.features.map(f => (
                                    <span key={f} style={{
                                        display: 'inline-block',
                                        background: 'rgba(255,255,255,0.05)',
                                        padding: '5px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        color: '#ccc',
                                        marginRight: '0.5rem',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {f}
                                    </span>
                                ))}
                            </div>

                            <Link
                                to={demo.path}
                                className="btn btn-primary"
                                style={{ width: '100%', textAlign: 'center' }}
                            >
                                Launch Demo Site
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
