/**
 * Fluxaro Chatbot Logic
 * A simple rule-based intent matcher to provide smart responses.
 */

const KNOWLEDGE_BASE = {
    greetings: {
        keywords: ['hi', 'hello', 'hey', 'start', 'good morning', 'good evening', 'yo'],
        response: "Hello! Welcome to Fluxaro. I'm here to help you solve your business challenges. Are you looking to improved your **Website** or automate your **Phone Calls**?"
    },
    pricing_receptionist: {
        keywords: ['price', 'cost', 'how much', 'pricing', 'fee', 'expensive', 'rate'],
        required_context: ['call', 'receptionist', 'agent', 'phone', 'ai'],
        response: "Our AI Phone Receptionist has a specialized pricing model:\n\n• **$299** One-time Setup Fee\n• **~$0.20/min** Pay-As-You-Go for calls\n• **$0/mo** Subscription (You own it!)\n\nWould you like to try a demo or book a setup call?"
    },
    pricing_website: {
        keywords: ['price', 'cost', 'how much', 'pricing', 'fee', 'expensive', 'rate'],
        required_context: ['web', 'site', 'design', 'page', 'build'],
        response: "Our High-Conversion Websites start at **$499** for a one-time build. This includes:\n\n• Mobile Responsive Design\n• SEO Optimization\n• Contact Forms\n\nThere is NO monthly fee unless you want us to host it for $49/mo."
    },
    pricing_general: {
        keywords: ['price', 'cost', 'how much', 'pricing', 'fee'],
        response: "We believe in transparent, one-time pricing. \n\n• **AI Receptionists**: $299 setup + usage.\n• **Websites**: Struct at $499.\n\nWhich service are you interested in?"
    },
    services_receptionist: {
        keywords: ['call', 'phone', 'receptionist', 'answer', 'appointment', 'booking', 'missed'],
        response: "Our AI Receptionist answers calls 24/7, captures leads, and books appointments directly into your calendar. It sounds human and never sleeps! You can try a live voice demo on our Demos page."
    },
    services_website: {
        keywords: ['web', 'site', 'design', 'online', 'revamp', 'conversion'],
        response: "We build modern, high-performance websites designed to convert visitors into customers. We can revamp your existing slow site or build a brand new one from scratch."
    },
    booking: {
        keywords: ['book', 'schedule', 'contact', 'call me', 'talk', 'human', 'appointment', 'demo', 'availability'],
        response: "I'd love to connect you with our team! You can book a strategy call directly here: [Book a Call](/contact) or check out our [Pricing](/pricing) first."
    },
    tech_stack: {
        keywords: ['tech', 'stack', 'how', 'technology', 'react', 'ai', 'gpt', 'model'],
        response: "We use cutting-edge tech: **OpenAI** for intelligence, **React** for web performance, and **AWS/n8n** for robust automation infrastructure."
    },
    identity: {
        keywords: ['who are you', 'what are you', 'your name', 'bot', 'human'],
        response: "I'm the Fluxaro Assistant ⚡️. I'm a fully automated AI agent here to help you navigate our services. (And yes, we can build one of these for your site too!)"
    }
}

export function getSmartResponse(message) {
    const lowerMsg = message.toLowerCase()

    // check specific compound intents first
    if (matchesIntent(lowerMsg, KNOWLEDGE_BASE.pricing_receptionist)) return KNOWLEDGE_BASE.pricing_receptionist.response
    if (matchesIntent(lowerMsg, KNOWLEDGE_BASE.pricing_website)) return KNOWLEDGE_BASE.pricing_website.response

    // Priorities
    if (matchesIntent(lowerMsg, KNOWLEDGE_BASE.booking)) return KNOWLEDGE_BASE.booking.response

    // check broad intents
    if (matchesIntent(lowerMsg, KNOWLEDGE_BASE.services_receptionist)) return KNOWLEDGE_BASE.services_receptionist.response
    if (matchesIntent(lowerMsg, KNOWLEDGE_BASE.services_website)) return KNOWLEDGE_BASE.services_website.response
    if (matchesIntent(lowerMsg, KNOWLEDGE_BASE.pricing_general)) return KNOWLEDGE_BASE.pricing_general.response
    if (matchesIntent(lowerMsg, KNOWLEDGE_BASE.tech_stack)) return KNOWLEDGE_BASE.tech_stack.response
    if (matchesIntent(lowerMsg, KNOWLEDGE_BASE.identity)) return KNOWLEDGE_BASE.identity.response
    if (matchesIntent(lowerMsg, KNOWLEDGE_BASE.greetings)) return KNOWLEDGE_BASE.greetings.response

    // Default fallback
    return "That's a great question. While I'm focused on our core AI & Web services, our human team can definitely answer that in detail. \n\nWould you like to [Book a Call](/contact) to discuss?"
}

function matchesIntent(msg, intent) {
    // Check if any keyword matches
    const hasKeyword = intent.keywords.some(k => msg.includes(k))

    // If context is required, check that too
    if (intent.required_context) {
        const hasContext = intent.required_context.some(c => msg.includes(c))
        return hasKeyword && hasContext
    }

    return hasKeyword
}
