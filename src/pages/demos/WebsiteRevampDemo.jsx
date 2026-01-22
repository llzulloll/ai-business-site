import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'

export default function WebsiteRevampDemo() {
    const [sliderPosition, setSliderPosition] = useState(50)
    const [isResizing, setIsResizing] = useState(false)
    const containerRef = useRef(null)

    const handleMouseMove = (e) => {
        if (!isResizing || !containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
        setSliderPosition((x / rect.width) * 100)
    }

    const handleTouchMove = (e) => {
        if (!isResizing || !containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width))
        setSliderPosition((x / rect.width) * 100)
    }

    const stopResizing = () => setIsResizing(false)

    useEffect(() => {
        window.addEventListener('mouseup', stopResizing)
        window.addEventListener('touchend', stopResizing)
        return () => {
            window.removeEventListener('mouseup', stopResizing)
            window.removeEventListener('touchend', stopResizing)
        }
    }, [])

    return (
        <div style={{ minHeight: '100vh', background: '#000', overflow: 'hidden' }}>
            <Navbar />

            {/* Control Bar */}
            <div style={{ position: 'fixed', bottom: '30px', left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
                <div style={{ background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '0.5rem 1.5rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', gap: '2rem', alignItems: 'center', backdropFilter: 'blur(10px)' }}>
                    <span style={{ color: '#ff4757', fontWeight: 'bold' }}>✖ OLD SITE</span>
                    <span style={{ color: '#aaa', fontSize: '0.8rem' }}>DRAG SLIDER</span>
                    <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>NEW SITE ✔</span>
                </div>
            </div>

            <div
                ref={containerRef}
                style={{ position: 'relative', height: '100vh', width: '100%', cursor: 'ew-resize', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }}
                onMouseDown={() => setIsResizing(true)}
                onTouchStart={() => setIsResizing(true)}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
            >
                {/* MODERN SITE (Bottom Layer) */}
                <div style={{ position: 'absolute', inset: 0, background: '#fff', overflowY: 'auto' }}>
                    <ModernSite />
                </div>

                {/* LEGACY SITE (Top Layer - Clipped) */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#fff',
                    overflow: 'hidden',
                    zIndex: 20,
                    clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                }}>
                    <LegacySite />
                </div>

                {/* Slider Handle */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${sliderPosition}%`,
                    width: '4px',
                    background: '#fff',
                    zIndex: 40,
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50px',
                        height: '50px',
                        background: '#fff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                        color: '#333',
                        fontSize: '1.5rem'
                    }}>
                        ↔
                    </div>
                </div>
            </div>
        </div>
    )
}

function LegacySite() {
    return (
        <div style={{ fontFamily: '"Times New Roman", Times, serif', color: '#000', background: 'url(https://www.transparenttextures.com/patterns/fabric-of-squares.png) #e0e0e0', minHeight: '100vh', width: '100vw' }}>
            <div style={{ background: 'navy', color: 'yellow', textAlign: 'center', padding: '1rem' }}>
                <h1 style={{ margin: 0 }}>APEX CONSTRUCTION INC.</h1>
                <marquee scrollamount="5">Welcome to our website!!! Best construction since 1995!!! Call 555-0199!!!</marquee>
            </div>

            <div style={{ display: 'flex' }}>
                <div style={{ width: '200px', background: '#ccc', padding: '1rem', borderRight: '2px solid black' }}>
                    <ul style={{ listStyle: 'square', paddingLeft: '1.5rem' }}>
                        <li><a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>Home Page</a></li>
                        <li><a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>About Us</a></li>
                        <li><a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>Services</a></li>
                        <li><a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>Photos</a></li>
                        <li><a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>Email Us</a></li>
                    </ul>
                    <br />
                    <div style={{ border: '1px solid black', padding: '5px', textAlign: 'center', background: 'yellow' }}>
                        NEW!! We now do patios!
                    </div>
                </div>

                <div style={{ padding: '2rem', flex: 1 }}>
                    <center>
                        <h2 style={{ color: 'red', textDecoration: 'underline' }}>Welcome to Apex Construction</h2>
                        <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" style={{ border: '5px ridge grey' }} />
                        <br /><br />
                        <p>We are the best builders in the city. We do good work for cheap price.</p>
                        <p>Call us today for a free quote on your house.</p>
                        <br />
                        <table border="1" cellPadding="10">
                            <tbody>
                                <tr>
                                    <td><b>Service</b></td>
                                    <td><b>Price</b></td>
                                </tr>
                                <tr>
                                    <td>Roofing</td>
                                    <td>Call for price</td>
                                </tr>
                                <tr>
                                    <td>Siding</td>
                                    <td>Call for price</td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <img src="https://media.giphy.com/media/11FuEnXyGsXTEk/giphy.gif" alt="Construction GIF" width="50" />
                        <p>Page last updated: March 12, 2004</p>
                    </center>
                </div>
            </div>
        </div>
    )
}

function ModernSite() {
    return (
        <div style={{ fontFamily: '"Inter", sans-serif', color: '#1a1a1a', background: '#fff', minHeight: '100vh', width: '100vw' }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');`}</style>

            {/* Announcement Bar */}
            <div style={{ background: '#1a1a1a', color: '#fff', textAlign: 'center', padding: '0.5rem', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.5px' }}>
                <span style={{ color: '#f39c12', marginRight: '0.5rem' }}>★ NEW SERVICE:</span>
                We now specialize in Custom Patios & Outdoor Living Spaces. <span style={{ textDecoration: 'underline', cursor: 'pointer', marginLeft: '0.5rem' }}>Learn more</span>
            </div>

            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '24px', height: '24px', background: '#f39c12', clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
                    APEX<span style={{ color: '#f39c12' }}>.</span>
                </div>
                <div style={{ display: 'flex', gap: '2.5rem', fontWeight: '600', fontSize: '0.9rem' }}>
                    <a href="#" style={{ color: '#1a1a1a', textDecoration: 'none', transition: 'color 0.2s' }}>Projects</a>
                    <a href="#" style={{ color: '#1a1a1a', textDecoration: 'none', transition: 'color 0.2s' }}>Services</a>
                    <a href="#" style={{ color: '#1a1a1a', textDecoration: 'none', transition: 'color 0.2s' }}>About</a>
                    <button style={{ background: '#1a1a1a', color: '#fff', padding: '0.8rem 1.8rem', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px', transition: 'transform 0.2s' }}>Get a Quote</button>
                </div>
            </nav>

            <header style={{
                height: '90vh',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                padding: '0 4rem',
                color: '#fff',
                backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,20,0.5) 100%), url(https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'no-repeat',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ maxWidth: '700px', zIndex: 10 }}
                >
                    <div style={{ display: 'inline-flex', alignItems: 'center', padding: '0.4rem 1rem', background: 'rgba(243, 156, 18, 0.2)', backdropFilter: 'blur(5px)', borderRadius: '50px', border: '1px solid rgba(243, 156, 18, 0.5)', marginBottom: '1.5rem' }}>
                        <span style={{ color: '#f39c12', fontWeight: 'bold', marginRight: '0.5rem', fontSize: '0.8rem' }}>●</span>
                        <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '1px' }}>LICENSED & INSURED SINCE 1995</span>
                    </div>

                    <h1 style={{ fontSize: '5rem', fontWeight: '800', lineHeight: 1.05, marginBottom: '1.5rem', letterSpacing: '-2px', color: '#fff' }}>
                        Constructing <br />
                        <span style={{ color: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(to right, #fff, #aaa)' }}>Excellence.</span>
                    </h1>

                    <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2.5rem', lineHeight: 1.6, maxWidth: '600px', fontWeight: '300', margin: '0 auto 2.5rem auto' }}>
                        From custom residential builds to large-scale industrial complexes, we bring visionary architecture to life with precision engineering.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button style={{ background: '#f39c12', color: '#fff', padding: '1.1rem 2.8rem', border: 'none', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', borderRadius: '4px', boxShadow: '0 10px 25px rgba(243, 156, 18, 0.3)' }}>View Our Portfolio</button>
                        <button style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: '#fff', padding: '1.1rem 2.8rem', border: '1px solid rgba(255,255,255,0.3)', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', borderRadius: '4px' }}>Our Services</button>
                    </div>
                </motion.div>
            </header>

            <section style={{ padding: '6rem 4rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', background: '#f9f9f9' }}>
                {[
                    { title: "Residential", desc: "Custom homes, renovations, and luxury outdoor patio spaces tailored to your lifestyle.", icon: "🏠" },
                    { title: "Commercial", desc: "Scalable solutions for modern offices, retail centers, and mixed-use environments.", icon: "🏢" },
                    { title: "Industrial", desc: "Heavy-duty construction and sustainable infrastructure for warehouses.", icon: "🏭" }
                ].map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        style={{ background: '#fff', padding: '3rem', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', borderBottom: `4px solid ${i === 0 ? '#f39c12' : '#ddd'}` }}
                    >
                        <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{s.icon}</div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem', color: '#111' }}>{s.title}</h3>
                        <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>{s.desc}</p>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            Learn More <span style={{ transition: 'transform 0.2s', display: 'inline-block' }}>→</span>
                        </div>
                    </motion.div>
                ))}
            </section>
        </div>
    )
}
