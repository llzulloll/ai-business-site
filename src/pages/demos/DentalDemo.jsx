import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatWidget from '../../components/ChatWidget'

export default function DentalDemo() {
    const [bookingStep, setBookingStep] = useState(1)
    const [sliderPosition, setSliderPosition] = useState(50)
    const sliderRef = useRef(null)

    const handleSliderMove = (e) => {
        if (!sliderRef.current) return
        const rect = sliderRef.current.getBoundingClientRect()
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
        setSliderPosition((x / rect.width) * 100)
    }

    return (
        <div style={{ fontFamily: '"Nunito", sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
        .dent-btn {
          background: #20c997;
          color: #fff;
          padding: 0.8rem 2rem;
          border-radius: 50px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(32, 201, 151, 0.4);
          transition: all 0.3s;
        }
        .dent-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(32, 201, 151, 0.5);
        }
        .service-card {
            transition: all 0.3s;
            cursor: pointer;
        }
        .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
      `}</style>

            {/* Nav */}
            <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', zIndex: 100 }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#20c997', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>🦷</span> Sparkle Dental
                </div>
                <div style={{ display: 'none', md: { display: 'flex' }, gap: '2rem', fontWeight: 'bold', color: '#636e72', fontSize: '0.9rem' }}>
                    <a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>SERVICES</a>
                    <a href="#smiles" style={{ color: 'inherit', textDecoration: 'none' }}>SMILES</a>
                    <a href="#team" style={{ color: 'inherit', textDecoration: 'none' }}>TEAM</a>
                </div>
                <button className="dent-btn" onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}>Book Online</button>
            </nav>

            {/* Hero */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'center', padding: '4rem 2rem', gap: '4rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                    <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#e6fcf5', color: '#20c997', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                        ✨ New Patients Welcome
                    </div>
                    <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.5rem', color: '#2d3436' }}>
                        Smile with <span style={{ color: '#20c997' }}>Confidence</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#636e72', marginBottom: '2rem', lineHeight: '1.6' }}>
                        Gentle, modern dentistry for the whole family. Experience pain-free treatments and state-of-the-art care in a relaxing environment.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="dent-btn">New Patient Special</button>
                        <button className="dent-btn" style={{ background: '#fff', color: '#20c997', border: '2px solid #20c997', boxShadow: 'none' }}>Learn More</button>
                    </div>
                    <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', transform: 'scale(0.8)', transformOrigin: 'left' }}>
                            {[1, 2, 3, 4, 5].map(i => <span key={i} style={{ color: '#f1c40f', fontSize: '1.5rem' }}>★</span>)}
                        </div>
                        <span style={{ color: '#b2bec3', fontWeight: 'bold' }}>4.9/5 from 200+ Reviews</span>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                    <img src="https://images.unsplash.com/photo-1588776814546-1ffcf4722e63?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Smiling Patient" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                </motion.div>
            </section>

            {/* Services */}
            <section id="services" style={{ padding: '6rem 2rem', background: '#f8f9fa' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: '#2d3436', fontSize: '2.5rem' }}>Comprehensive Care</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {[
                            { title: 'General Dentistry', icon: '🛡️', desc: "Checkups, cleanings, and preventative care." },
                            { title: 'Cosmetic', icon: '✨', desc: "Whitening, veneers, and smile makeovers." },
                            { title: 'Orthodontics', icon: '😁', desc: "Invisalign and traditional braces for all ages." },
                            { title: 'Pediatric', icon: '🧸', desc: "Gentle care designed specifically for kids." }
                        ].map((s, i) => (
                            <div key={i} className="service-card" style={{ background: '#fff', padding: '2rem', borderRadius: '15px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem', background: '#e6fcf5', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>{s.icon}</div>
                                <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>{s.title}</h3>
                                <p style={{ color: '#636e72', fontSize: '0.9rem' }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Before / After Slider */}
            <section id="smiles" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1rem', color: '#2d3436', fontSize: '2.5rem' }}>Real Results</h2>
                <p style={{ color: '#636e72', marginBottom: '3rem' }}>Drag the slider to see the transformation.</p>

                <div
                    ref={sliderRef}
                    onMouseMove={handleSliderMove}
                    onTouchMove={(e) => handleSliderMove(e.touches[0])}
                    style={{ position: 'relative', width: '100%', maxWidth: '800px', height: '500px', margin: '0 auto', borderRadius: '20px', overflow: 'hidden', cursor: 'ew-resize', select: 'none' }}
                >
                    {/* After Image (Background) */}
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <span style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.8)', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 'bold' }}>AFTER</span>
                    </div>

                    {/* Before Image (Foreground, clipped) */}
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1571772996211-2f02c9727629?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', width: `${sliderPosition}%`, borderRight: '4px solid #fff' }}>
                        <span style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(255,255,255,0.8)', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 'bold' }}>BEFORE</span>
                    </div>

                    {/* Slider Handle */}
                    <div style={{ position: 'absolute', top: '50%', left: `${sliderPosition}%`, transform: 'translate(-50%, -50%)', width: '40px', height: '40px', background: '#fff', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                        ↔
                    </div>
                </div>
            </section>

            {/* Appointment Scheduler Wizard */}
            <section id="booking" style={{ background: '#20c997', padding: '6rem 2rem', textAlign: 'center', color: '#fff' }}>
                <h2 style={{ marginBottom: '1rem' }}>Ready to Sparkle?</h2>
                <p style={{ marginBottom: '3rem', fontSize: '1.2rem' }}>Book your appointment online in less than 2 minutes.</p>

                <div style={{ background: '#fff', padding: '3rem', borderRadius: '20px', maxWidth: '600px', margin: '0 auto', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', color: '#333' }}>

                    {/* Progress Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '0.8rem', fontWeight: 'bold', color: '#b2bec3' }}>
                        <span style={{ color: bookingStep >= 1 ? '#20c997' : 'inherit' }}>1. SERVICE</span>
                        <span style={{ color: bookingStep >= 2 ? '#20c997' : 'inherit' }}>2. DATE</span>
                        <span style={{ color: bookingStep >= 3 ? '#20c997' : 'inherit' }}>3. DETAILS</span>
                    </div>

                    <AnimatePresence mode='wait'>
                        {bookingStep === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h3 style={{ marginBottom: '1.5rem' }}>What do you need today?</h3>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {['Routine Checkup & Cleaning', 'Teeth Whitening', 'Tooth Pain / Emergency', 'Consultation'].map(opt => (
                                        <button key={opt} onClick={() => setBookingStep(2)} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '10px', background: '#fff', fontSize: '1rem', cursor: 'pointer', textAlign: 'left', transition: '0.2s' }} onMouseOver={(e) => e.target.style.borderColor = '#20c997'} onMouseOut={(e) => e.target.style.borderColor = '#ddd'}>
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {bookingStep === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h3 style={{ marginBottom: '1.5rem' }}>When works for you?</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                    {[1, 2, 3, 4].map(i => (
                                        <button key={i} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '10px', background: i === 1 ? '#e6fcf5' : '#fff', color: i === 1 ? '#20c997' : '#333', borderColor: i === 1 ? '#20c997' : '#ddd', cursor: 'pointer' }}>
                                            Does not matter <br /> {9 + i}:00 AM
                                        </button>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button onClick={() => setBookingStep(1)} style={{ flex: 1, padding: '1rem', border: 'none', background: '#f1f2f6', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>Back</button>
                                    <button onClick={() => setBookingStep(3)} className="dent-btn" style={{ flex: 1 }}>Next</button>
                                </div>
                            </motion.div>
                        )}

                        {bookingStep === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h3 style={{ marginBottom: '1.5rem' }}>Finish Booking</h3>
                                <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <input type="text" placeholder="Full Name" style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '10px', width: '100%' }} />
                                    <input type="tel" placeholder="Phone Number" style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '10px', width: '100%' }} />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button onClick={() => setBookingStep(2)} style={{ flex: 1, padding: '1rem', border: 'none', background: '#f1f2f6', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>Back</button>
                                    <button onClick={() => alert("Booking Confirmed!")} className="dent-btn" style={{ flex: 1 }}>Confirm</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* AI Bot */}
            {/* AI Bot */}
            <ChatWidget
                agentName="Receptionist Alex"
                avatar="🦷"
                initialMessage="Hi there! Welcome to Sparkle Dental. I can help you book an appointment or answer questions about our services."
                themeColor="#20c997"
            />
        </div>
    )
}
