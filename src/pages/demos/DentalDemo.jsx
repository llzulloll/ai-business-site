export default function DentalDemo() {
    return (
        <div style={{ fontFamily: '"Nunito", sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh' }}>
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
        }
      `}</style>

            {/* Nav */}
            <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#20c997' }}>Sparkle Dental</div>
                <button className="dent-btn">Book Online</button>
            </nav>

            {/* Hero */}
            <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', padding: '4rem 2rem', gap: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div>
                    <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.5rem', color: '#2d3436' }}>
                        Smile with <span style={{ color: '#20c997' }}>Confidence</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#636e72', marginBottom: '2rem' }}>
                        Gentle, modern dentistry for the whole family. Experience the difference of state-of-the-art care.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="dent-btn">New Patient Special</button>
                        <button className="dent-btn" style={{ background: '#fff', color: '#20c997', border: '2px solid #20c997', boxShadow: 'none' }}>Learn More</button>
                    </div>
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1588776814546-1ffcf4722e63?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Smiling Patient" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                </div>
            </section>

            {/* Team Section */}
            <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '3rem', color: '#2d3436' }}>Meet Your Care Team</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    {[
                        { name: "Dr. Emily Chen", role: "Lead Dentist", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
                        { name: "Dr. Michael Ross", role: "Orthodontist", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
                        { name: "Sarah Johnson", role: "Hygienist", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
                    ].map((member, i) => (
                        <div key={i} style={{ width: '250px' }}>
                            <img src={member.img} alt={member.name} style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '150px', marginBottom: '1rem', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{member.name}</h3>
                            <div style={{ color: '#20c997', fontWeight: 'bold' }}>{member.role}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Appointment Scheduler */}
            <section style={{ background: '#20c997', padding: '6rem 2rem', textAlign: 'center', color: '#fff' }}>
                <h2 style={{ marginBottom: '1rem' }}>Ready to Sparkle?</h2>
                <p style={{ marginBottom: '3rem', fontSize: '1.2rem' }}>Book your appointment online in less than 2 minutes.</p>

                <div style={{ background: '#fff', padding: '2rem', borderRadius: '20px', maxWidth: '800px', margin: '0 auto', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', color: '#333' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', textAlign: 'left' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Reason</label>
                            <select style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                                <option>Checkup & Cleaning</option>
                                <option>Teeth Whitening</option>
                                <option>Emergency</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Preferred Time</label>
                            <select style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                                <option>Morning</option>
                                <option>Afternoon</option>
                                <option>Evening</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'end' }}>
                            <button className="dent-btn" style={{ width: '100%', borderRadius: '8px' }} onClick={() => alert("Simulating Booking Engine...")}>Find Availability</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Bot */}
            <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: '#fff', padding: '1rem', borderRadius: '15px 15px 0 15px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)', border: '1px solid #eff0f1', display: 'flex', alignItems: 'center', gap: '0.8rem', maxWidth: '300px' }}>
                <div style={{ width: '10px', height: '10px', background: '#2ecc71', borderRadius: '50%' }}></div>
                <div style={{ fontSize: '0.9rem', color: '#555' }}>
                    <strong>Dr. Sparkle Bot:</strong> Hi! Need to schedule a cleaning?
                </div>
            </div>
        </div>
    )
}
