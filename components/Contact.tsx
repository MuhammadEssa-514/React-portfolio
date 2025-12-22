'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
    const contactInfo = [
        {
            icon: <Phone className="w-6 h-6" />,
            label: 'WhatsApp',
            value: '+92 355 5915756',
            href: 'https://wa.me/923555915756',
            color: 'bg-green-500'
        },
        {
            icon: <Mail className="w-6 h-6" />,
            label: 'Email',
            value: 'muhammadessa1514@gmail.com',
            href: 'mailto:muhammadessa1514@gmail.com',
            color: 'bg-red-500'
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            label: 'Location',
            value: 'New Nagaral, Gilgit Airport Road, Gilgit',
            href: '#',
            color: 'bg-blue-500'
        }
    ];

    return (
        <section id="contact" className="py-20 bg-white dark:bg-black relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent inline-block">
                        Get In Touch
                    </h2>
                    <div className="h-1 w-20 bg-[var(--primary)] mx-auto mt-2 rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                                Feel free to reach out for collaborations, freelance work, or just a friendly chat. I'm always open to discussing new projects and creative ideas.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {contactInfo.map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center p-4 bg-gray-50 dark:bg-white/5 rounded-xl hover:bg-white dark:hover:bg-white/10 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-white/5"
                                >
                                    <div className={`p-3 rounded-full text-white ${item.color} mr-4`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.label}</h4>
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{item.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send a Message</h3>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="How can I help you?"
                                />
                            </div>
                            <button className="w-full py-3 bg-[var(--primary)] hover:bg-[var(--accent)] text-white font-bold rounded-lg shadow-lg hover:shadow-[var(--primary)]/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                                <Send className="w-5 h-5" />
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
