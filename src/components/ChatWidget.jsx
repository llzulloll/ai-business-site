import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function ChatWidget({ agentName = "AI Assistant", avatar = "🤖", initialMessage = "Hello! How can I help you today?", themeColor = "#2563eb", onMessage = null }) {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { id: 1, text: initialMessage, sender: 'agent' }
    ])
    const [inputText, setInputText] = useState('')
    const messagesEndRef = useRef(null)

    // Safety check for Router context
    let navigate = null
    try {
        navigate = useNavigate()
    } catch (e) {
        // ignore if used outside router (unlikely in this app)
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isOpen])

    // ... props
    const handleSend = async (e) => {
        e.preventDefault()
        if (!inputText.trim()) return

        // User message
        const userMsg = { id: Date.now(), text: inputText, sender: 'user' }
        setMessages(prev => [...prev, userMsg])
        setInputText('')

        // Custom Handler (for Smart Bot)
        if (onMessage) {
            // Show typing indicator or just wait a bit for realism
            setTimeout(() => {
                const responseText = onMessage(inputText)
                const aiMsg = {
                    id: Date.now() + 1,
                    text: responseText,
                    sender: 'agent'
                }
                setMessages(prev => [...prev, aiMsg])
            }, 600)
            return
        }

        // Default Simulated AI response (for Demos)
        setTimeout(() => {
            const aiMsg = {
                id: Date.now() + 1,
                text: "Thanks for your message! This is a demo interaction. In the live version, I'll be able to answer specific questions, check availability, and help you find what you need instantly.",
                sender: 'agent'
            }
            setMessages(prev => [...prev, aiMsg])
        }, 1000)
    }

    // Helper to render basic markdown-ish text
    const renderMessageText = (text) => {
        // Split by lines for paragraphs
        return text.split('\n').map((line, i) => {
            if (line.trim() === '') return <br key={i} />

            // Simple parsing for bold and links
            // Note: This is a very basic parser for the sake of the demo. 
            // In a real app, use react-markdown.
            const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
            return (
                <div key={i} style={{ marginBottom: '4px' }}>
                    {parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={j}>{part.slice(2, -2)}</strong>
                        }
                        if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
                            const [label, url] = part.slice(1, -1).split('](')

                            const handleLinkClick = (e) => {
                                if (url.startsWith('/') && navigate) {
                                    e.preventDefault()
                                    navigate(url)
                                    // setIsOpen(false) // Optional: close chat on navigation? Maybe better to keep open. Let's keep it open.
                                }
                            }

                            return (
                                <a
                                    key={j}
                                    href={url}
                                    onClick={handleLinkClick}
                                    style={{ color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    {label}
                                </a>
                            )
                        }
                        return part
                    })}
                </div>
            )
        })
    }


    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000, fontFamily: '"Inter", sans-serif' }}>
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        style={{
                            position: 'absolute',
                            bottom: '80px',
                            right: '0',
                            width: '350px',
                            height: '500px',
                            background: '#fff',
                            borderRadius: '16px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            border: '1px solid #eee'
                        }}
                    >
                        {/* Header */}
                        <div style={{ background: themeColor, padding: '1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ width: '35px', height: '35px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                {avatar}
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{agentName}</div>
                                <div style={{ fontSize: '0.75rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%' }}></span>
                                    Online
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', opacity: 0.8 }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Messages */}
                        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', background: '#f9fafb', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {messages.map(msg => (
                                <div
                                    key={msg.id}
                                    style={{
                                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '85%'
                                    }}
                                >
                                    <div style={{
                                        background: msg.sender === 'user' ? themeColor : '#fff',
                                        color: msg.sender === 'user' ? '#fff' : '#1f2937',
                                        padding: '0.8rem 1rem',
                                        borderRadius: '12px',
                                        borderBottomRightRadius: msg.sender === 'user' ? '2px' : '12px',
                                        borderBottomLeftRadius: msg.sender === 'agent' ? '2px' : '12px',
                                        boxShadow: msg.sender === 'agent' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none',
                                        lineHeight: 1.5,
                                        fontSize: '0.9rem'
                                    }}>
                                        {renderMessageText(msg.text)}
                                    </div>
                                    <div style={{
                                        fontSize: '0.7rem',
                                        color: '#9ca3af',
                                        marginTop: '4px',
                                        textAlign: msg.sender === 'user' ? 'right' : 'left'
                                    }}>
                                        {msg.sender === 'user' ? 'You' : agentName}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} style={{ padding: '1rem', background: '#fff', borderTop: '1px solid #eee', display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type a message..."
                                style={{ flex: 1, padding: '0.8rem', borderRadius: '25px', border: '1px solid #e5e7eb', outline: 'none', fontSize: '0.9rem' }}
                            />
                            <button
                                type="submit"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: themeColor,
                                    color: '#fff',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                ➤
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: themeColor,
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem'
                }}
            >
                {isOpen ? '✕' : '💬'}
            </motion.button>
        </div>
    )
}
