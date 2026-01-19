export default function LawDemo() {
    return (
        <div style={{ fontFamily: '"Merriweather", serif', color: '#1a1a1a', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&family=Open+Sans:wght@400;600&display=swap');
        .law-btn {
          background: #003366;
          color: #fff;
          padding: 1rem 2.5rem;
          font-weight: bold;
          border: none;
          cursor: pointer;
          font-family: 'Open Sans', sans-serif;
        }
      `}</style>

            {/* Header */}
            <header style={{ background: '#003366', color: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '1px' }}>ELITE LEGAL</div>
                <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '0.9rem' }}>
                    <span style={{ marginRight: '2rem' }}>PRACTICE AREAS</span>
                    <span style={{ marginRight: '2rem' }}>ATTORNEYS</span>
                    <span>CONTACT</span>
                </div>
            </header>

            {/* Hero */}
            <section style={{
                background: 'linear-gradient(rgba(0,51,102,0.8), rgba(0,51,102,0.8)), url(https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
                backgroundSize: 'cover',
                color: '#fff',
                padding: '8rem 2rem',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>Justice You Can Trust</h1>
                <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                    Decades of experience fighting for your rights. We provide comprehensive legal solutions for individuals and businesses.
                </p>
                <button className="law-btn" style={{ background: '#d4af37' }}>Free Consultation</button>
            </section>

            {/* Practice Areas */}
            <section style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: '#003366' }}>Our Practice Areas</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {['Corporate Litigation', 'Intellectual Property', 'Family Law', 'Real Estate', 'Personal Injury', 'Estate Planning'].map((area, i) => (
                        <div key={i} style={{ padding: '2rem', border: '1px solid #ddd', borderRadius: '4px', background: '#fff' }}>
                            <h3 style={{ color: '#003366', marginBottom: '1rem', fontFamily: 'Merriweather, serif' }}>{area}</h3>
                            <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
                                Comprehensive representation with a track record of success in complex {area.toLowerCase()} matters.
                            </p>
                            <button style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#d4af37', fontWeight: 'bold', cursor: 'pointer' }}>Read More →</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Statistics */}
            <section style={{ padding: '6rem 2rem', background: '#003366', color: '#fff', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '4rem', fontSize: '2.5rem' }}>Proven Results</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                    <div>
                        <div style={{ fontSize: '3rem', fontWeight: '900', color: '#d4af37' }}>25+</div>
                        <div style={{ fontFamily: 'Open Sans, sans-serif', marginTop: '0.5rem' }}>Years Experience</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '3rem', fontWeight: '900', color: '#d4af37' }}>$500M</div>
                        <div style={{ fontFamily: 'Open Sans, sans-serif', marginTop: '0.5rem' }}>Recovered for Clients</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '3rem', fontWeight: '900', color: '#d4af37' }}>5k+</div>
                        <div style={{ fontFamily: 'Open Sans, sans-serif', marginTop: '0.5rem' }}>Cases Won</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '3rem', fontWeight: '900', color: '#d4af37' }}>100%</div>
                        <div style={{ fontFamily: 'Open Sans, sans-serif', marginTop: '0.5rem' }}>Client Dedication</div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section id="contact" style={{ padding: '6rem 2rem', background: '#f5f5f5' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '3rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', borderTop: '5px solid #d4af37' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#003366' }}>Request a Free Consultation</h2>
                    <form style={{ display: 'grid', gap: '1.5rem' }} onSubmit={(e) => { e.preventDefault(); alert("Lead Captured! Sent to CRM."); }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <input type="text" placeholder="Full Name" style={{ padding: '1rem', border: '1px solid #ddd', fontFamily: 'Open Sans, sans-serif' }} />
                            <input type="tel" placeholder="Phone Number" style={{ padding: '1rem', border: '1px solid #ddd', fontFamily: 'Open Sans, sans-serif' }} />
                        </div>
                        <input type="email" placeholder="Email Address" style={{ padding: '1rem', border: '1px solid #ddd', fontFamily: 'Open Sans, sans-serif' }} />
                        <textarea rows="4" placeholder="Briefly describe your legal matter..." style={{ padding: '1rem', border: '1px solid #ddd', fontFamily: 'Open Sans, sans-serif' }}></textarea>
                        <button className="law-btn" style={{ width: '100%', fontSize: '1.1rem' }}>Submit Request</button>
                    </form>
                </div>
            </section>

            {/* AI Bot */}
            <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: '#003366', color: '#fff', padding: '1rem 1.5rem', borderRadius: '4px', boxShadow: '0 5px 20px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>⚖️</div>
                <div>
                    <div style={{ fontWeight: 'bold', fontFamily: 'Open Sans, sans-serif' }}>Legal Assistant</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>How can we help?</div>
                </div>
            </div>
        </div>
    )
}
