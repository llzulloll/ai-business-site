import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams, Link } from 'react-router-dom'

export default function AIReceptionistDemo() {
    const [searchParams] = useSearchParams()
    const personaType = searchParams.get('type') || 'restaurant'

    const [isPlaying, setIsPlaying] = useState(false)
    const [transcript, setTranscript] = useState([])
    const [currentLineIndex, setCurrentLineIndex] = useState(0)
    const [callStatus, setCallStatus] = useState('Ready to Call') // Ready, Connecting, Connected, Ended
    const [activeSpeaker, setActiveSpeaker] = useState(null) // 'ai', 'user', or null

    const personas = {
        restaurant: {
            title: "Restaurant Host",
            name: "Bella",
            color: "#e67e22",
            intro: "Hi! I'm Bella, the AI host for The Rustic Spoon. I can book tables, answer menu questions, and manage reservations.",
            script: [
                { speaker: 'ai', text: "Thank you for calling The Rustic Spoon. This is Bella. How can I help you today?" },
                { speaker: 'user', text: "Hi, I'd like to book a table for this Friday evening." },
                { speaker: 'ai', text: "I can help with that. For how many people?" },
                { speaker: 'user', text: "Just two of us." },
                { speaker: 'ai', text: "Great. I have openings at 6:00 PM and 8:30 PM this Friday. Which works better?" },
                { speaker: 'user', text: "Let's do 6:00 PM." },
                { speaker: 'ai', text: "Perfect. I have you down for 2 guests this Friday at 6:00 PM. I'll send a confirmation text now. Anything else?" },
                { speaker: 'user', text: "No, that's it. Thanks!" },
                { speaker: 'ai', text: "You're welcome! We look forward to seeing you. Have a great night." }
            ]
        },
        dental: {
            title: "Dental Scheduler",
            name: "Alex",
            color: "#0ea5e9",
            intro: "Hi! I'm Alex. I handle appointment scheduling, emergency triage, and patient reminders for Sparkle Dental.",
            script: [
                { speaker: 'ai', text: "Sparkle Dental, this is Alex. Are you calling to schedule an appointment or do you have an emergency?" },
                { speaker: 'user', text: "Hi, I need to schedule a cleaning. I'm a new patient." },
                { speaker: 'ai', text: "Welcome! We'd love to have you. Do you have any specific concerns, or just a routine cleaning?" },
                { speaker: 'user', text: "Just a routine cleaning." },
                { speaker: 'ai', text: "Understood. We have an opening with Dr. Chen next Tuesday at 10 AM. Does that work?" },
                { speaker: 'user', text: "Do you have anything in the afternoon?" },
                { speaker: 'ai', text: "Yes, I can fit you in at 3:30 PM on Wednesday." },
                { speaker: 'user', text: "That works perfectly." },
                { speaker: 'ai', text: "Great. I've booked you for Wednesday at 3:30 PM. Please bring your insurance card. See you then!" }
            ]
        },
        law: {
            title: "Legal Intake",
            name: "Sarah",
            color: "#0f3c64",
            intro: "Hi! I'm Sarah. I screen incoming calls for Elite Legal, qualify leads, and schedule consultations for our attorneys.",
            script: [
                { speaker: 'ai', text: "Elite Legal Services. This is an automated intake line. How can we assist you today?" },
                { speaker: 'user', text: "I was involved in a car accident and need a lawyer." },
                { speaker: 'ai', text: "I'm sorry to hear that. To better assist you, were you injured in the accident?" },
                { speaker: 'user', text: "Yes, I hurt my back." },
                { speaker: 'ai', text: "I understand. And did the accident happen in the last two years?" },
                { speaker: 'user', text: "Yes, last month." },
                { speaker: 'ai', text: "Okay. Based on that information, I'd like to schedule a free consultation with our senior injury attorney. Is tomorrow at 2 PM convenient?" },
                { speaker: 'user', text: "Yes, that works." },
                { speaker: 'ai', text: "Excellent. I've scheduled your consultation. An attorney will call you at this number tomorrow at 2 PM." }
            ]
        }
    }

    const currentPersona = personas[personaType]

    useEffect(() => {
        let timeout;
        if (isPlaying && currentLineIndex < currentPersona.script.length) {
            setCallStatus('Connected (00:' + (currentLineIndex * 4).toString().padStart(2, '0') + ')')
            const line = currentPersona.script[currentLineIndex]
            setActiveSpeaker(line.speaker)

            // Simulate "speaking" time based on text length
            const duration = Math.max(1500, line.text.length * 50)

            timeout = setTimeout(() => {
                setTranscript(prev => [...prev, line])
                setCurrentLineIndex(prev => prev + 1)
                setActiveSpeaker(null)
            }, duration)
        } else if (currentLineIndex >= currentPersona.script.length) {
            setCallStatus('Call Ended')
            setIsPlaying(false)
            setActiveSpeaker(null)
        }

        return () => clearTimeout(timeout)
    }, [isPlaying, currentLineIndex, currentPersona])

    const startDemo = () => {
        setTranscript([])
        setCurrentLineIndex(0)
        setIsPlaying(true)
        setCallStatus('Connecting...')
        setTimeout(() => setCallStatus('Connected'), 1000)
    }

    const resetDemo = () => {
        setIsPlaying(false)
        setTranscript([])
        setCurrentLineIndex(0)
        setCallStatus('Ready to Call')
        setActiveSpeaker(null)
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '6rem 1rem' }} className="container">

            {/* Back Link */}
            <div style={{ marginBottom: '2rem' }}>
                <Link to="/demos" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                    ← Back to Demos
                </Link>
            </div>

            <div className="grid-2" style={{ alignItems: 'start' }}>

                {/* Visualizer / Phone UI */}
                <div className="modern-card" style={{ padding: '3rem', textAlign: 'center', background: '#fff' }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        background: currentPersona.color,
                        borderRadius: '50%',
                        margin: '0 auto 2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 10px 30px ${currentPersona.color}40`,
                        position: 'relative'
                    }}>
                        <div style={{ fontSize: '3rem' }}>🎙️</div>
                        {/* Ripple Effect when speaking */}
                        {activeSpeaker === 'ai' && (
                            <>
                                <motion.div
                                    initial={{ scale: 1, opacity: 0.8 }}
                                    animate={{ scale: 1.5, opacity: 0 }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: currentPersona.color, zIndex: -1 }}
                                />
                                <motion.div
                                    initial={{ scale: 1, opacity: 0.8 }}
                                    animate={{ scale: 1.8, opacity: 0 }}
                                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                                    style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: currentPersona.color, zIndex: -2 }}
                                />
                            </>
                        )}
                    </div>

                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{currentPersona.name}</h2>
                    <p className="text-muted" style={{ marginBottom: '0.5rem' }}>{currentPersona.title}</p>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.3rem 1rem',
                        background: callStatus === 'Connected' || callStatus.includes('Connected') ? '#dcfce7' : '#f1f5f9',
                        color: callStatus === 'Connected' || callStatus.includes('Connected') ? '#166534' : '#64748b',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        marginBottom: '2rem'
                    }}>
                        {callStatus}
                    </div>

                    {!isPlaying ? (
                        <button onClick={startDemo} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                            {callStatus === 'Call Ended' ? 'Replay Call' : 'Start Call Simulation'}
                        </button>
                    ) : (
                        <button onClick={resetDemo} className="btn btn-secondary" style={{ width: '100%', padding: '1rem', background: '#fee2e2', color: '#ef4444', border: 'none' }}>
                            End Call
                        </button>
                    )}

                    <div style={{ marginTop: '2rem', textAlign: 'left', fontSize: '0.9rem', color: 'var(--text-muted)', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <strong>Scenario:</strong> {currentPersona.intro}
                    </div>
                </div>

                {/* Transcript Area */}
                <div className="modern-card" style={{ height: '600px', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.2rem' }}>Live Transcript</h3>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem' }}>
                        <AnimatePresence>
                            {transcript.map((line, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        alignSelf: line.speaker === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '80%',
                                        background: line.speaker === 'user' ? '#f1f5f9' : currentPersona.color + '15', // 10% opacity
                                        padding: '1rem',
                                        borderRadius: line.speaker === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                                        border: line.speaker === 'ai' ? `1px solid ${currentPersona.color}40` : 'none'
                                    }}
                                >
                                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.3rem', color: '#64748b' }}>
                                        {line.speaker === 'user' ? 'You' : currentPersona.name}
                                    </div>
                                    <div style={{ color: '#334155', lineHeight: '1.5' }}>
                                        {line.text}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Typing Indicator */}
                        {activeSpeaker && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ alignSelf: activeSpeaker === 'user' ? 'flex-end' : 'flex-start', color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic', margin: '0.5rem' }}
                            >
                                {activeSpeaker === 'user' ? 'User is speaking...' : `${currentPersona.name} is thinking...`}
                            </motion.div>
                        )}

                        <div id="transcript-end"></div>
                    </div>
                </div>
            </div>

            {/* Persona Switcher */}
            <div style={{ marginTop: '3rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Try Other Personas</h3>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {Object.entries(personas).map(([key, p]) => (
                        <Link
                            key={key}
                            to={`/demos/ai-receptionist?type=${key}`}
                            onClick={() => {
                                // Force reset when switching
                                setTimeout(() => window.location.reload(), 10)
                            }}
                            className="modern-card"
                            style={{
                                padding: '1rem 2rem',
                                cursor: 'pointer',
                                border: key === personaType ? `2px solid ${p.color}` : '1px solid #e2e8f0',
                                minWidth: '200px',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{ fontWeight: 'bold', color: key === personaType ? p.color : '#64748b' }}>{p.title}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
