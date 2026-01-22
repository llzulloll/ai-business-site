import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import ChatWidget from '../../components/ChatWidget'

export default function RestaurantDemo() {
    const [activeCategory, setActiveCategory] = useState('mains')
    const [reservationOpen, setReservationOpen] = useState(false)

    const menuItems = {
        starters: [
            { name: "Wagyu Beef Carpaccio", price: "$28", desc: "Truffle oil, arugula, shaved pecorino." },
            { name: "Pan-Seared Scallops", price: "$24", desc: "Cauliflower purée, brown butter caper sauce." },
            { name: "Burrata & Heirloom Tomato", price: "$22", desc: "Basil pesto, balsamic glaze, toasted pine nuts." }
        ],
        mains: [
            { name: "Truffle Risotto", price: "$32", desc: "Arborio rice, black truffle, parmesan crisp." },
            { name: "Herb_Crusted Lamb Rack", price: "$45", desc: "Fondant potatoes, red wine reduction." },
            { name: "Wild Caught Sea Bass", price: "$38", desc: "Saffron broth, clams, roasted fennel." },
            { name: "Duck Confit", price: "$36", desc: "Beluga lentils, orange glaze, crispy skin." }
        ],
        desserts: [
            { name: "Dark Chocolate Fondant", price: "$16", desc: "Salted caramel ice cream, gold leaf." },
            { name: "Lemon Basil Tart", price: "$14", desc: "Italian meringue, raspberry coulis." },
            { name: "Artisan Cheese Board", price: "$24", desc: "Selection of local cheeses, honeycomb, crackers." }
        ]
    }

    return (
        <div style={{ fontFamily: '"Playfair Display", serif', color: '#fff', backgroundColor: '#121212', minHeight: '100vh', overflowX: 'hidden' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        .res-btn {
          background: #d4af37;
          color: #000;
          padding: 1rem 3rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .res-btn:hover {
          background: #fff;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2);
        }
        .menu-tab {
            background: transparent;
            border: none;
            color: #888;
            font-family: 'Lato', sans-serif;
            text-transform: uppercase;
            letter-spacing: 2px;
            padding: 1rem 2rem;
            cursor: pointer;
            transition: all 0.3s;
            border-bottom: 2px solid transparent;
        }
        .menu-tab.active {
            color: #d4af37;
            border-bottom: 2px solid #d4af37;
        }
        .parallax-bg {
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
      `}</style>

            {/* Navigation */}
            <nav style={{
                padding: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                position: 'fixed',
                width: '100%',
                zIndex: 100,
                background: 'rgba(18,18,18,0.9)',
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ fontSize: '1.8rem', fontStyle: 'italic', color: '#d4af37' }}>The Rustic Spoon</div>
                <div style={{ display: 'flex', gap: '2rem', fontFamily: 'Lato, sans-serif', fontSize: '0.85rem', letterSpacing: '2px' }}>
                    <a href="#menu" style={{ color: '#fff', textDecoration: 'none' }}>MENU</a>
                    <a href="#story" style={{ color: '#fff', textDecoration: 'none' }}>STORY</a>
                    <a href="#gallery" style={{ color: '#fff', textDecoration: 'none' }}>GALLERY</a>
                    <button onClick={() => setReservationOpen(true)} style={{ background: 'none', border: '1px solid #d4af37', color: '#d4af37', padding: '0.5rem 1.5rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Reserve
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <header className="parallax-bg" style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.2rem', marginBottom: '1.5rem', letterSpacing: '6px', color: '#d4af37' }}>EST. 2018</p>
                    <h1 style={{ fontSize: '7rem', marginBottom: '2rem', textShadow: '0 4px 20px rgba(0,0,0,0.5)', lineHeight: 0.9 }}>
                        Savor the <br /><span style={{ fontStyle: 'italic' }}>Moment</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <button className="res-btn" onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}>
                        View Menu
                    </button>
                </motion.div>
            </header>

            {/* Introduction / Story */}
            <section id="story" style={{ padding: '8rem 2rem', textAlign: 'center', background: '#121212', position: 'relative' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', color: '#d4af37' }}>Our Philosophy</h2>
                        <div style={{ w: '2px', h: '50px', background: '#d4af37', margin: '0 auto 2rem' }}></div>
                        <p style={{ fontFamily: 'Lato, sans-serif', lineHeight: '2', color: '#ccc', fontSize: '1.3rem' }}>
                            We believe in honest food, cooked with passion and served with love. Our ingredients are sourced directly from local farmers who share our commitment to sustainability. Every dish is a chapter in our culinary story, written with flavors that linger long after the last bite.
                        </p>
                        <div style={{ marginTop: '4rem', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                            <div>
                                <h3 style={{ fontSize: '2rem', color: '#fff' }}>Local</h3>
                                <p style={{ color: '#888', fontFamily: 'Lato' }}>Sourced within 50 miles</p>
                            </div>
                            <div style={{ width: '1px', background: '#333' }}></div>
                            <div>
                                <h3 style={{ fontSize: '2rem', color: '#fff' }}>Organic</h3>
                                <p style={{ color: '#888', fontFamily: 'Lato' }}>100% Pesticide Free</p>
                            </div>
                            <div style={{ width: '1px', background: '#333' }}></div>
                            <div>
                                <h3 style={{ fontSize: '2rem', color: '#fff' }}>Fresh</h3>
                                <p style={{ color: '#888', fontFamily: 'Lato' }}>Delivered Daily</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tabbed Menu */}
            <section id="menu" style={{ padding: '6rem 2rem', background: '#0a0a0a' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#fff' }}>The Menu</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', borderBottom: '1px solid #333' }}>
                            {Object.keys(menuItems).map((cat) => (
                                <button
                                    key={cat}
                                    className={`menu-tab ${activeCategory === cat ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ minHeight: '400px' }}>
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}
                            >
                                {menuItems[activeCategory].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #222', paddingBottom: '1.5rem' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <h3 style={{ fontSize: '1.5rem', color: '#fff' }}>{item.name}</h3>
                                                <span style={{ fontSize: '1.5rem', color: '#d4af37', fontFamily: 'Lato' }}>{item.price}</span>
                                            </div>
                                            <p style={{ color: '#888', fontStyle: 'italic', fontFamily: 'Lato' }}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section id="gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', height: '400px' }}>
                <div className="parallax-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)' }}></div>
                <div className="parallax-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)' }}></div>
                <div className="parallax-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)' }}></div>
                <div className="parallax-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)' }}></div>
            </section>

            {/* Testimonials */}
            <section style={{ padding: '6rem 2rem', background: '#121212', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', color: '#d4af37', marginBottom: '2rem' }}>"Unforgettable"</div>
                <p style={{ fontFamily: 'Lato', fontSize: '1.2rem', color: '#ccc', maxWidth: '600px', margin: '0 auto' }}>
                    The best dining experience I have had in years. The atmosphere, the service, and above all, the flavours were absolutely impeccable.
                </p>
                <div style={{ marginTop: '2rem', color: '#fff', fontStyle: 'italic' }}>— James Rotherhold, NYC Food Critic</div>
            </section>

            {/* Footer / Location */}
            <footer style={{ background: '#0a0a0a', padding: '4rem 2rem', borderTop: '1px solid #222', textAlign: 'center', fontFamily: 'Lato' }}>
                <div style={{ marginBottom: '2rem', color: '#d4af37', fontSize: '2rem', fontFamily: 'Playfair Display', fontStyle: 'italic' }}>The Rustic Spoon</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', color: '#888', flexWrap: 'wrap' }}>
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Hours</h4>
                        <p>Tue - Thu: 5pm - 10pm</p>
                        <p>Fri - Sat: 5pm - 11pm</p>
                        <p>Sun: 4pm - 9pm</p>
                    </div>
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Location</h4>
                        <p>123 Culinary Ave</p>
                        <p>SoHo, New York, NY 10012</p>
                        <p>(212) 555-0199</p>
                    </div>
                </div>
            </footer>

            {/* Reservation Modal - Simulated */}
            <AnimatePresence>
                {reservationOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
                        onClick={() => setReservationOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={{ background: '#1a1a1a', padding: '3rem', maxWidth: '500px', width: '100%', border: '1px solid #333' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center', color: '#d4af37' }}>Reserve a Table</h2>
                            <p style={{ textAlign: 'center', color: '#888', marginBottom: '2rem', fontFamily: 'Lato' }}>AI-Powered Instant Confirmation</p>

                            <form style={{ display: 'grid', gap: '1rem' }} onSubmit={(e) => { e.preventDefault(); alert("AI Reservation System: Confirmation sent!"); setReservationOpen(false); }}>
                                <input type="text" placeholder="Full Name" required style={{ padding: '1rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff' }} />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <input type="date" required style={{ padding: '1rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff' }} />
                                    <select style={{ padding: '1rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff' }}>
                                        <option>2 Guests</option>
                                        <option>4 Guests</option>
                                        <option>6 Guests</option>
                                    </select>
                                </div>
                                <button type="submit" className="res-btn" style={{ width: '100%', marginTop: '1rem' }}>Confirm Booking</button>
                            </form>
                            <button onClick={() => setReservationOpen(false)} style={{ background: 'none', border: 'none', color: '#666', width: '100%', marginTop: '1rem', cursor: 'pointer', fontFamily: 'Lato' }}>Cancel</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AI Integration Bubble */}
            {/* AI Integration Bubble */}
            <ChatWidget
                agentName="Bella"
                avatar="👩‍🍳"
                initialMessage="Buona sera! I'm Bella, the AI host for The Rustic Spoon. I can help you book a table or recommend our daily specials."
                themeColor="#d4af37"
            />
        </div>
    )
}
