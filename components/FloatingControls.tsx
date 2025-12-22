'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa'; // Need to import from react-icons/fa

export default function FloatingControls() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {/* WhatsApp Button */}
            <motion.a
                href="https://wa.me/923555915756?text=Hello%20Muhammad%20Essa,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20contact%20you."
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
            >
                <FaWhatsapp className="w-6 h-6" />
            </motion.a>

            {/* Chatbot Toggle */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="bg-[var(--primary)] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center relative"
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
                        className="absolute bottom-20 right-0 w-80 bg-white dark:bg-[#111] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-[var(--primary)] p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">AI</span>
                            </div>
                            <div>
                                <h3 className="text-white font-bold">Assistant</h3>
                                <p className="text-white/80 text-xs flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full" /> Online
                                </p>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-4 h-64 overflow-y-auto bg-gray-50 dark:bg-black/50 space-y-4">
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] text-sm text-gray-700 dark:text-gray-200">
                                    Hi! I'm Muhammad Essa's virtual assistant. How can I help you today?
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] space-y-2">
                                    <button className="block w-full text-left text-xs bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 px-3 py-2 rounded-lg transition-colors">
                                        View Projects
                                    </button>
                                    <button className="block w-full text-left text-xs bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 px-3 py-2 rounded-lg transition-colors">
                                        Contact Info
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111]">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="flex-1 bg-gray-100 dark:bg-black/50 border-none rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-[var(--primary)] outline-none"
                                />
                                <button className="p-2 bg-[var(--primary)] text-white rounded-full hover:bg-[var(--accent)] transition-colors">
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
