'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingControls() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
        { text: "Hi! I'm Muhammad Essa's virtual assistant. How can I help you today?", isBot: true }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const handleToggle = () => setIsOpen(prev => !prev);
        window.addEventListener('toggle-chatbot', handleToggle);
        return () => window.removeEventListener('toggle-chatbot', handleToggle);
    }, []);

    const handleScrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        setMessages(prev => [...prev, { text: inputValue, isBot: false }]);
        const userText = inputValue;
        setInputValue("");

        setTimeout(() => {
            let response = "Thanks for your message! I'm just a demo bot, but you can contact Muhammad directly via WhatsApp or Email.";
            if (userText.toLowerCase().includes("project")) {
                response = "You can view the latest projects in the Experience section.";
                handleScrollTo('experience');
            } else if (userText.toLowerCase().includes("contact") || userText.toLowerCase().includes("email")) {
                response = "You can find contact details at the bottom of the page.";
                handleScrollTo('contact');
            }
            setMessages(prev => [...prev, { text: response, isBot: true }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
            {/* WhatsApp Button - Only visible on Desktop */}
            <motion.a
                href="https://wa.me/923555915756?text=Hello%20Muhammad%20Essa,%20I%20visited%20your%20portfolio..."
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="hidden md:flex bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all items-center justify-center pointer-events-auto"
            >
                <FaWhatsapp className="w-6 h-6" />
            </motion.a>

            {/* Chatbot Toggle - Only visible on Desktop */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="hidden md:flex bg-[var(--primary)] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all items-center justify-center relative pointer-events-auto"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                )}
            </motion.button>

            {/* Chatbot Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed md:absolute bottom-[90px] md:bottom-20 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 w-[calc(100vw-2rem)] md:w-80 bg-white dark:bg-[#111] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden pointer-events-auto z-[60]"
                    >
                        {/* Header */}
                        <div className="bg-[var(--primary)] p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold">AI</span>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">Assistant</h3>
                                    <p className="text-white/80 text-[10px] flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full" /> Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
                                aria-label="Close Chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-4 h-64 overflow-y-auto bg-gray-50 dark:bg-black/50 space-y-4">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`p-3 rounded-2xl shadow-sm max-w-[80%] text-sm ${msg.isBot ? 'bg-white dark:bg-gray-800 rounded-tl-none text-gray-700 dark:text-gray-200' : 'bg-[var(--primary)] text-white rounded-tr-none'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {messages.length === 1 && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] space-y-2">
                                        <button onClick={() => handleScrollTo('experience')} className="block w-full text-left text-xs bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 px-3 py-2 rounded-lg transition-colors">
                                            View Projects
                                        </button>
                                        <button onClick={() => handleScrollTo('contact')} className="block w-full text-left text-xs bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 px-3 py-2 rounded-lg transition-colors">
                                            Contact Info
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111]">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-gray-100 dark:bg-black/50 border-none rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-[var(--primary)] outline-none dark:text-white"
                                />
                                <button onClick={handleSendMessage} className="p-2 bg-[var(--primary)] text-white rounded-full hover:bg-[var(--accent)] transition-colors">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
