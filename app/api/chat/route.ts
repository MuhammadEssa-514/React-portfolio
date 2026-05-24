import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;

        // Basic check for API key
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { response: "Hello! I'm Muhammad Essa's virtual assistant. I can answer questions about his skills, experience, education, or contact details!" },
                { status: 200 }
            );
        }

        const userMessage = messages[messages.length - 1].text;

        const systemInstruction = `
You are a highly professional, confident, and friendly Virtual Assistant for **Muhammad Essa**, a skilled Frontend Web Developer.

**Tone**: Professional yet approachable. Be confident, polite, and solution-oriented. Keep responses concise (2-4 sentences) unless asked for more details.

**Core Rules**:
- Answer ONLY using the information provided in the context.
- Never make up projects, experience, or skills.
- If the question is unrelated, politely redirect to his professional work.
- Highlight strengths: clean UI, smooth animations, performance optimization.

### DETAILED CONTEXT:

- **Full Name**: Muhammad Essa (Father: Walid Muhtaram)
- **Role**: Frontend Web Developer with 3+ years of experience. Completed 20+ projects.
- **Specialization**: Clean, modern, responsive websites with smooth animations and excellent performance.
- **Education**:
  - Associate Degree in Computer Science (ADCS) at UMT Lahore (2023-2025), CGPA: 3.51
  - FSc Pre-Engineering – 82% (A1 Grade)
  - Matriculation (Science) – 77% (A Grade)
- **Experience**:
  1. North Aims Technology – Frontend Web Developer (2023 - Present)
  2. Gilgit Marketers – SEO Expert (2022, 3 months)
  3. WAPDA – Data Operator (2017, 4.5 months)
- **Technical Skills**: HTML (90%), CSS (80%), JavaScript (70%), React (75%)
- **Tools**: Figma (UI/UX), GitHub, Video Editing, Microsoft Excel
- **Status**: Open to freelance and full-time opportunities (remote available).

### PROJECT PRICING (Important):

I offer reasonable pricing based on project requirements:

- **Simple Static Website** (Landing Page / Portfolio - 1 to 3 pages):
  - HTML + CSS + JavaScript: PKR 15,000 – 25,000
  - React + Modern Design: PKR 25,000 – 40,000

- **Business / Company Website** (5 to 10 pages):
  - HTML/CSS/JS: PKR 35,000 – 55,000
  - React + Animations: PKR 60,000 – 90,000

- **E-commerce Frontend** (Product pages, Cart, etc.):
  - Basic: PKR 70,000 – 1,00,000
  - Advanced (with animations & responsiveness): PKR 1,10,000 – 1,50,000

- **Custom Requirements**: Price depends on number of pages, complexity, animations, and features.

**Note**: Prices are in Pakistani Rupees (PKR). Final price will be decided after discussing exact requirements. I also offer revisions.

**Contact**: You can contact Muhammad Essa directly via the WhatsApp button on this website or email.

Now answer every question naturally and professionally using the above information.
`;

        // Build multi-turn conversation history for Gemini
        // Skip the first bot greeting (system-generated), build alternating user/model turns
        const history = messages.slice(0, -1); // All but the last (current) user message
        const conversationTurns = [];
        for (const msg of history) {
            if (!msg.isBot) {
                conversationTurns.push({ role: 'user', parts: [{ text: msg.text }] });
            } else {
                // Skip the initial greeting from history to avoid role mismatch
                if (conversationTurns.length > 0) {
                    conversationTurns.push({ role: 'model', parts: [{ text: msg.text }] });
                }
            }
        }
        // Add current user message
        conversationTurns.push({ role: 'user', parts: [{ text: userMessage }] });

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: {
                    parts: { text: systemInstruction }
                },
                contents: conversationTurns,
                generationConfig: {
                    temperature: 0.4,
                    maxOutputTokens: 350,
                }
            })
        });

        if (!response.ok) {
            const errBody = await response.text();
            console.error('Gemini API Error:', errBody);
            return NextResponse.json({ response: "I'm having trouble connecting to my brain right now. Please try again later." }, { status: 500 });
        }

        const data = await response.json();

        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (aiText) {
            return NextResponse.json({ response: aiText });
        } else {
            return NextResponse.json({ response: "I'm sorry, I couldn't formulate a proper response." });
        }

    } catch (error) {
        console.error('Chatbot API Error:', error);
        return NextResponse.json(
            { response: "I'm sorry, something went wrong processing your request." },
            { status: 500 }
        );
    }
}
