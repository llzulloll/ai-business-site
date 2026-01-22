import { useState, useCallback } from 'react'

/**
 * Knowledge Base & Patterns
 */
const TOPICS = {
    RECEPTIONIST: 'receptionist',
    WEBSITE: 'website',
    GENERAL: 'general'
}

const KNOWLEDGE_BASE = {
    greetings: {
        keywords: ['hi', 'hello', 'hey', 'start', 'good morning', 'yo'],
        response: "Hello! Welcome to Fluxaro. I'm here to help you solve your business challenges. Are you looking to improve your **Website** or automate your **Phone Calls**?"
    },
    // Context-Specific Responses
    pricing: {
        keywords: ['price', 'cost', 'how much', 'fee', 'rate', 'expensive'],
        responses: {
            [TOPICS.RECEPTIONIST]: "Our AI Phone Receptionist is **$299** (one-time setup) + ~$0.20/min for usage. No monthly subscription.",
            [TOPICS.WEBSITE]: "Our High-Conversion Websites start at **$499** for a one-time build. Hosting is optional at $49/mo.",
            [TOPICS.GENERAL]: "It depends on the service. \n\n• **AI Receptionist**: $299 setup.\n• **Websites**: Start at $499.\n\nWhich one are you interested in?"
        }
    },
    services: {
        keywords: ['what can you do', 'how does it work', 'features', 'tell me about'],
        responses: {
            [TOPICS.RECEPTIONIST]: "It answers calls 24/7, captures leads, and books appointments directly into your calendar. It sounds completely human!",
            [TOPICS.WEBSITE]: "We design modern, fast websites focused on converting visitors into paying customers. It includes SEO and lead capture forms.",
            [TOPICS.GENERAL]: "We offer two main solutions:\n1. **AI Phone Agents** that answer calls 24/7.\n2. **Modern Websites** that convert traffic.\n\nWhich topic would you like to explore?"
        }
    },
    // Topic Switchers (These set the context)
    topic_receptionist: {
        keywords: ['receptionist', 'call', 'phone', 'answering', 'agent', 'voice'],
        topic: TOPICS.RECEPTIONIST,
        response: "Great! Our **AI Phone Receptionist** is perfect for businesses missing calls. It works 24/7. What would you like to know about it?"
    },
    topic_website: {
        keywords: ['web', 'site', 'design', 'online', 'landing', 'page'],
        topic: TOPICS.WEBSITE,
        response: "Excellent choice. A **High-Conversion Website** is the foundation of your digital presence. We build them to look premium and load fast. Do you have questions about pricing or features?"
    },
    // Universal Intents
    booking: {
        keywords: ['book', 'schedule', 'contact', 'call me', 'talk', 'human', 'appointment', 'availability'],
        response: "I'd love to connect you with our team! You can [Book a Call here](/contact) to get started."
    },
    tech: {
        keywords: ['tech', 'stack', 'react', 'ai', 'gpt'],
        response: "We use the latest tech: **React** for websites and **OpenAI** for our intelligence models."
    },
    // Conversational Intents
    acknowledgement: {
        keywords: ['ok', 'okay', 'cool', 'nice', 'sounds good', 'great', 'awesome', 'got it'],
        response: "Glad to hear that! Would you like to see a demo or get pricing details?"
    },
    affirmation: {
        keywords: ['yes', 'yeah', 'yep', 'sure', 'please'],
        response: "Great! You can [Book a Call here](/contact) to get started, or check out our [Demos](/demos)."
    },
    negation: {
        keywords: ['no', 'nope', 'nah', 'nothing'],
        response: "No problem! I'm here if you change your mind. Feel free to browse our [Services](/services)."
    },
    gratitude: {
        keywords: ['thanks', 'thank you', 'thx'],
        response: "You're welcome! Let me know if you need anything else."
    },
    industry: {
        keywords: ['restaurant', 'dental', 'law', 'legal', 'clinic', 'food'],
        response: "We have specialized demos for that industry! Check out our [Restaurant Demo](/demos/restaurant) or [Dental Demo](/demos/dental)."
    }
}

export function useChatbotLogic() {
    const [context, setContext] = useState({
        topic: TOPICS.GENERAL
    })

    const processMessage = useCallback((message) => {
        const lowerMsg = message.toLowerCase()

        // 1. Check for Topic Switches FIRST
        if (matches(lowerMsg, KNOWLEDGE_BASE.topic_receptionist.keywords)) {
            setContext({ topic: TOPICS.RECEPTIONIST })
            return KNOWLEDGE_BASE.topic_receptionist.response
        }
        if (matches(lowerMsg, KNOWLEDGE_BASE.topic_website.keywords)) {
            setContext({ topic: TOPICS.WEBSITE })
            return KNOWLEDGE_BASE.topic_website.response
        }

        // 2. Check for Universal Intents (Booking, Greetings)
        if (matches(lowerMsg, KNOWLEDGE_BASE.booking.keywords)) return KNOWLEDGE_BASE.booking.response
        if (matches(lowerMsg, KNOWLEDGE_BASE.greetings.keywords)) return KNOWLEDGE_BASE.greetings.response
        if (matches(lowerMsg, KNOWLEDGE_BASE.tech.keywords)) return KNOWLEDGE_BASE.tech.response

        // 2.5 Industry Checks
        if (matches(lowerMsg, KNOWLEDGE_BASE.industry.keywords)) return KNOWLEDGE_BASE.industry.response

        // 3. Check for Context-Dependent Intents (Pricing, Features)
        if (matches(lowerMsg, KNOWLEDGE_BASE.pricing.keywords)) {
            return KNOWLEDGE_BASE.pricing.responses[context.topic] || KNOWLEDGE_BASE.pricing.responses[TOPICS.GENERAL]
        }
        if (matches(lowerMsg, KNOWLEDGE_BASE.services.keywords)) {
            return KNOWLEDGE_BASE.services.responses[context.topic] || KNOWLEDGE_BASE.services.responses[TOPICS.GENERAL]
        }

        // 4. Conversational Glue (Yes, No, Thanks)
        if (matches(lowerMsg, KNOWLEDGE_BASE.gratitude.keywords)) return KNOWLEDGE_BASE.gratitude.response
        if (matches(lowerMsg, KNOWLEDGE_BASE.acknowledgement.keywords)) return KNOWLEDGE_BASE.acknowledgement.response
        if (matches(lowerMsg, KNOWLEDGE_BASE.affirmation.keywords)) return KNOWLEDGE_BASE.affirmation.response
        if (matches(lowerMsg, KNOWLEDGE_BASE.negation.keywords)) return KNOWLEDGE_BASE.negation.response

        // 5. Handle "Tell me more" or generic follow-ups based on context
        if (matches(lowerMsg, ['more', 'details', 'tell me', 'continue'])) {
            if (context.topic === TOPICS.RECEPTIONIST) return "It handles multiple calls at once, sends SMS follow-ups, and integrates with your CRM. It's a game changer for efficiency."
            if (context.topic === TOPICS.WEBSITE) return "All our sites include basic SEO, mobile optimization, and fast hosting. We can also add this chat widget to your site!"
        }

        // 6. Fallback
        return "I'm listening. I can help with **Websites** and **AI Receptionists**. Which are you interested in?"
    }, [context])

    return { processMessage, currentTopic: context.topic }
}

function matches(text, keywords) {
    return keywords.some(k => text.includes(k))
}
