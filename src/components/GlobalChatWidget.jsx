import { useLocation } from 'react-router-dom'
import ChatWidget from './ChatWidget'
import { useChatbotLogic } from '../hooks/useChatbotLogic'

export default function GlobalChatWidget() {
    const location = useLocation()
    const { processMessage } = useChatbotLogic()

    // We want the main Fluxaro chat to appear on all main pages:
    // Home, Services, Pricing, Contact, and the Demos listing page.
    // We DO NOT want it to appear on individual demo pages that might have their own bots 
    // or need a clean "immersive" screen (like the revamp demo).

    const isDemoPage = location.pathname.startsWith('/demos/') && location.pathname !== '/demos'

    if (isDemoPage) {
        return null
    }

    return (
        <ChatWidget
            agentName="Fluxaro Team"
            avatar="⚡️"
            initialMessage="Hi! Welcome to Fluxaro. We build high-performance websites and AI voice agents. How can we help you today?"
            themeColor="#2563eb"
            onMessage={processMessage}
        />
    )
}
