'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';

type Message = {
    text: string;
    isBot: boolean;
    time: string;
};

const QUICK_SUGGESTIONS = [
    "What are your skills?",
    "Tell me about yourself",
    "What is your experience?",
    "How can I hire you?",
    "What's your education?",
    "What are your project prices?",
];

function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Simple markdown-like renderer for bold (**text**) and line breaks
function BotMessage({ text }: { text: string }) {
    const lines = text.split('\n');
    return (
        <span>
            {lines.map((line, li) => {
                const parts = line.split(/(\*\*[^*]+\*\*)/g);
                return (
                    <span key={li}>
                        {parts.map((part, pi) =>
                            part.startsWith('**') && part.endsWith('**')
                                ? <strong key={pi}>{part.slice(2, -2)}</strong>
                                : <span key={pi}>{part}</span>
                        )}
                        {li < lines.length - 1 && <br />}
                    </span>
                );
            })}
        </span>
    );
}

export default function FloatingControls() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            text: "👋 Hi! I'm Muhammad Essa's AI Assistant. Ask me anything about his skills, projects, pricing, or experience!",
            isBot: true,
            time: getTime()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        const handleToggle = () => setIsOpen(prev => !prev);
        window.addEventListener('toggle-chatbot', handleToggle);
        return () => window.removeEventListener('toggle-chatbot', handleToggle);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const handleScrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    const sendMessage = async (text: string) => {
        if (!text.trim() || isTyping) return;
        setShowSuggestions(false);

        const userMsg: Message = { text, isBot: false, time: getTime() };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInputValue("");
        setIsTyping(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: updatedMessages })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { text: data.response, isBot: true, time: getTime() }]);
        } catch {
            setMessages(prev => [...prev, {
                text: "Sorry, I couldn't connect right now. Please try again or reach out via WhatsApp!",
                isBot: true,
                time: getTime()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSendMessage = () => sendMessage(inputValue);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">

            {/* WhatsApp Button */}
            <motion.a
                href="https://wa.me/923555915756?text=Hello%20Muhammad%20Essa,%20I%20visited%20your%20portfolio..."
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.12, y: -2 }}
                className="hidden md:flex bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-[#25D366]/40 hover:shadow-xl transition-all items-center justify-center pointer-events-auto"
            >
                <FaWhatsapp className="w-6 h-6" />
            </motion.a>

            {/* Chatbot Toggle */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-primary/40 hover:shadow-xl transition-all items-center justify-center relative pointer-events-auto"
            >
                <AnimatePresence mode="wait">
                    {isOpen
                        ? <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-6 h-6" /></motion.div>
                        : <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><MessageSquare className="w-6 h-6" /></motion.div>
                    }
                </AnimatePresence>
                {!isOpen && (
                    <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                )}
            </motion.button>

            {/* Chatbot Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.93 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.93 }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        className="fixed md:absolute bottom-[100px] md:bottom-24 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 w-[calc(100vw-1.5rem)] md:w-[380px] bg-white dark:bg-[#0f0f0f] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-200 dark:border-white/10 overflow-hidden pointer-events-auto z-[100] flex flex-col"
                        style={{ height: 'min(620px, 75vh)' }}
                    >
                        {/* ===== HEADER ===== */}
                        <div className="bg-gradient-to-r from-primary to-accent p-4 md:p-5 flex items-center justify-between shrink-0 shadow-lg relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/40 shadow-inner">
                                        <Image src="/profile.jpg" alt="Muhammad Essa" width={44} height={44} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm tracking-wide">Muhammad Essa</h3>
                                    <p className="text-white/80 text-[10px] mt-0.5 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                        Typically replies instantly
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => { setMessages([{ text: "👋 Hi! I'm Muhammad Essa's AI Assistant. Ask me anything about his skills, projects, pricing, or experience!", isBot: true, time: getTime() }]); setShowSuggestions(true); }}
                                    className="p-1.5 hover:bg-white/15 rounded-lg text-white/80 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-wider px-2.5 bg-white/5"
                                    title="Clear chat"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-all active:scale-90"
                                    aria-label="Close Chat"
                                >
                                    <X className="w-5 h-5 stroke-[2.5]" />
                                </button>
                            </div>
                        </div>

                        {/* ===== MESSAGES AREA ===== */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-[#111] scroll-smooth">

                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className={`flex items-end gap-2 ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                                >
                                                                    {msg.isBot && (
                                        <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-primary/30 shrink-0 mb-1">
                                            <Image src="/profile.jpg" alt="Muhammad Essa" width={28} height={28} className="w-full h-full object-cover" />
                                        </div>
                                    )}
 
                                    <div className={`flex flex-col gap-0.5 max-w-[78%] ${msg.isBot ? 'items-start' : 'items-end'}`}>
                                        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.isBot
                                            ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-sm'
                                            : 'bg-gradient-to-br from-primary to-accent text-white rounded-tr-sm'
                                            }`}>
                                            {msg.isBot ? <BotMessage text={msg.text} /> : msg.text}
                                        </div>
                                        <span className="text-[10px] text-gray-400 px-1">{msg.time}</span>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Quick Suggestion Chips */}
                            {showSuggestions && messages.length === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-wrap gap-2 mt-2"
                                >
                                    {QUICK_SUGGESTIONS.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => sendMessage(s)}
                                            className="text-xs bg-white dark:bg-gray-800 border border-primary/30 text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-full transition-all duration-200 shadow-sm"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </motion.div>
                            )}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-end gap-2"
                                >
                                    <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-primary/30 shrink-0">
                                        <Image src="/profile.jpg" alt="ME" width={28} height={28} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* ===== FOOTER ===== */}
                        <div className="shrink-0 border-t border-gray-200 dark:border-white/5 bg-white dark:bg-[#0f0f0f] p-3">
                            <div className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full px-1 pl-4 py-1">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask me anything..."
                                    disabled={isTyping}
                                    className="flex-1 bg-transparent border-none text-sm focus:outline-none dark:text-white placeholder-gray-400 disabled:opacity-50"
                                />
                                <motion.button
                                    onClick={handleSendMessage}
                                    disabled={isTyping || !inputValue.trim()}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2.5 bg-gradient-to-br from-primary to-accent text-white rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md hover:shadow-primary/30"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                </motion.button>
                            </div>
                            <p className="text-center text-[9px] text-gray-400 mt-2">Powered by Gemini AI · Muhammad Essa's Portfolio</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
