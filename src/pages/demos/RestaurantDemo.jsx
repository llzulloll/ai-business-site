export default function RestaurantDemo() {
    return (
        <div style={{ fontFamily: '"Playfair Display", serif', color: '#fff', backgroundColor: '#121212', minHeight: '100vh' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        .res-btn {
          background: #d4af37;
          color: #000;
          padding: 1rem 2rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }
        .res-btn:hover {
          background: #fff;
        }
      `}</style>

            {/* Navigation */}
            <nav style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '1.5rem', fontStyle: 'italic' }}>The Rustic Spoon</div>
                <div style={{ display: 'flex', gap: '2rem', fontFamily: 'Lato, sans-serif', fontSize: '0.9rem', letterSpacing: '1px' }}>
                    <span>MENU</span>
                    <span>STORY</span>
                    <span>CONTACT</span>
                </div>
            </nav>

            {/* Hero */}
            <header style={{
                height: '90vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}>
                <h1 style={{ fontSize: '6rem', marginBottom: '1rem', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>Savor the Moment</h1>
                <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.2rem', marginBottom: '3rem', letterSpacing: '4px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>FARM TO TABLE DINING</p>
                <button className="res-btn" onClick={() => document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' })}>Book a Table</button>
            </header>

            <section style={{ padding: '8rem 2rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto', background: '#121212' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#d4af37' }}>Our Philosophy</h2>
                <p style={{ fontFamily: 'Lato, sans-serif', lineHeight: '2', color: '#ccc', fontSize: '1.2rem' }}>
                    We believe in honest food, cooked with passion and served with love. Our ingredients are sourced directly from local farmers who share our commitment to sustainability and quality. Every dish tells a story of the season.
                </p>
            </section>

            {/* Highlights Menu */}
            <section id="menu" style={{ padding: '6rem 2rem', background: '#0a0a0a' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '4rem', color: '#fff' }}>Chef's Selections</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        {[
                            { name: "Truffle Risotto", price: "$32", desc: "Arborio rice, black truffle, parmesan crisp." },
                            { name: "Pan-Seared Scallops", price: "$38", desc: "Cauliflower purée, brown butter caper sauce." },
                            { name: "Wagyu Beef Carpaccio", price: "$28", desc: "Truffle oil, arugula, shaved pecorino." },
                            { name: "Dark Chocolate Fondant", price: "$16", desc: "Salted caramel ice cream, gold leaf." }
                        ].map((item, i) => (
                            <div key={i} style={{ borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: 'Lato, sans-serif', fontWeight: 'bold' }}>
                                    <span style={{ fontSize: '1.2rem', color: '#d4af37' }}>{item.name}</span>
                                    <span style={{ fontSize: '1.2rem' }}>{item.price}</span>
                                </div>
                                <div style={{ color: '#888', fontStyle: 'italic' }}>{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reservation Form */}
            <section id="reservations" style={{ padding: '6rem 2rem', background: '#1a1a1a', textAlign: 'center' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Reserve Your Table</h2>
                <p style={{ color: '#aaa', marginBottom: '3rem' }}>Book instantly. Our AI confirms your spot in seconds.</p>

                <form style={{ maxWidth: '600px', margin: '0 auto', display: 'grid', gap: '1rem' }} onSubmit={(e) => { e.preventDefault(); alert("Reservation Simulated! AI would send confirmation SMS now."); }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input type="text" placeholder="Name" required style={{ padding: '1rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', fontSize: '1rem' }} />
                        <input type="tel" placeholder="Phone" required style={{ padding: '1rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', fontSize: '1rem' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input type="date" required style={{ padding: '1rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', fontSize: '1rem' }} />
                        <select style={{ padding: '1rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', fontSize: '1rem' }}>
                            <option>2 Guests</option>
                            <option>3 Guests</option>
                            <option>4 Guests</option>
                            <option>5+ Guests</option>
                        </select>
                    </div>
                    <button type="submit" className="res-btn" style={{ width: '100%', marginTop: '1rem' }}>Confirm Reservation</button>
                </form>
            </section>

            {/* AI Integration Highlight (Meta-Demo) */}
            <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: '#fff', color: '#000', padding: '1rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', fontFamily: 'Lato, sans-serif' }}>
                <div style={{ width: '40px', height: '40px', background: '#d4af37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AI</div>
                <div>
                    <div style={{ fontWeight: 'bold' }}>Reservations?</div>
                    <div style={{ fontSize: '0.8rem' }}>I can help you capture leads!</div>
                </div>
            </div>
        </div>
    )
}
