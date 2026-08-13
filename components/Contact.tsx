'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Upload, X, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '', mobileNumber: '', whatsappNumber: '' });
    const [files, setFiles] = useState<File[]>([]);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

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
            value: 'Gilgit, Pakistan',
            href: '#',
            color: 'bg-blue-500'
        }
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('message', formData.message);
            data.append('mobileNumber', formData.mobileNumber);
            data.append('whatsappNumber', formData.whatsappNumber);
            files.forEach(file => data.append('files', file));

            const response = await fetch('/api/contact', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '', mobileNumber: '', whatsappNumber: '' });
                setFiles([]);
            } else {
                throw new Error(result.error || 'Something went wrong');
            }
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message);
        }
    };

    return (
        <section id="contact" className="py-10 md:py-12 relative z-10 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -z-10 opacity-10 blur-3xl">
                <div className="w-96 h-96 bg-[var(--primary)] rounded-full -mr-48 -mt-48" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
                        Let's <span className="text-[var(--primary)]">Connect</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-xs md:text-sm">
                        Have a project in mind or just want to chat? Send me a message and I'll get back to you within 24 hours.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-4 md:gap-6 items-start">
                    {/* Contact Details Card */}
                    <div className="lg:col-span-2 space-y-3">
                        {contactInfo.map((item, index) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.08 }}
                                className="group flex items-center p-3 bg-black dark:bg-gradient-to-tl from-primary to-[var(--accent)]/30 rounded-xl border border-gray-100 dark:border-white/[0.06] hover:border-primary dark:hover:border-primary transition-all shadow-sm"
                            >
                                <div className={`w-9 h-9 rounded-lg ${item.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0`}>
                                    {item.icon}
                                </div>
                                <div className="ml-3 min-w-0 flex-1">
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                                    <p className="text-xs md:text-sm font-bold text-gray-900 dark:text-white mt-0.5 truncate break-all">{item.value}</p>
                                </div>
                            </motion.a>
                        ))}

                        <div className="p-4 bg-gradient-to-br from-primary to-[var(--accent)]/30 rounded-xl text-white shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-28 h-28 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                            <h3 className="text-sm font-bold mb-1">Available for Hire</h3>
                            <p className="text-[11px] leading-relaxed text-white/80 mb-3">
                                I specialize in crafting high-end, high-performance web applications with a focus on UI/UX excellence.
                            </p>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/20 rounded-full w-fit">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-[9px] font-bold">Open for new projects</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Card */}
                    <div className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-white/[0.03] p-4 md:p-5 rounded-2xl border border-[var(--accent)] dark:border-primary shadow-xl relative"
                        >
                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-6"
                                    >
                                        <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold mb-1">Message Sent!</h3>
                                        <p className="text-xs text-gray-500 mb-4">Thank you for reaching out. I'll get back to you shortly.</p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="px-5 py-2 bg-gray-100 dark:bg-white/10 rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-all"
                                        >
                                            Send Another Message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form key="form" onSubmit={handleSubmit} className="space-y-3">
                                        <div className="grid md:grid-cols-2 gap-3">
                                            <div className="space-y-0.5">
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                    placeholder="Your Name *"
                                                    className="w-full px-3 py-2.5 rounded-lg bg-black dark:bg-gradient-to-br from-primary to-[var(--accent)]/30 border border dark:border-[var(--accent)]/30 hover:border-[var(--accent)]/100 dark:focus:border-primary focus:ring-1 focus:ring-[var(--accent)]/70 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all text-xs"
                                                />
                                            </div>
                                            <div className="space-y-0.5">
                                                <input
                                                    required
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                    placeholder="Your Email *"
                                                    className="w-full px-3 py-2.5 rounded-lg bg-black dark:bg-gradient-to-br from-primary to-[var(--accent)]/30 border border dark:border-[var(--accent)]/30 hover:border-[var(--accent)]/100 dark:focus:border-primary focus:ring-1 focus:ring-[var(--accent)]/70 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all text-xs"
                                                />
                                            </div>
                                            <div className="space-y-0.5">
                                                <input
                                                    required
                                                    type="number"
                                                    value={formData.mobileNumber}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, mobileNumber: e.target.value }))}
                                                    placeholder="Your Mobile Number *"
                                                    className="w-full px-3 py-2.5 rounded-lg bg-black dark:bg-gradient-to-br from-primary to-[var(--accent)]/30 border border dark:border-[var(--accent)]/30 hover:border-[var(--accent)]/100 dark:focus:border-primary focus:ring-1 focus:ring-[var(--accent)]/70 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all text-xs"
                                                />
                                            </div>
                                            <div className="space-y-0.5">
                                                <input
                                                    required
                                                    type="number"
                                                    value={formData.whatsappNumber}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                                                    placeholder="WhatsApp Number *"
                                                    className="w-full px-3 py-2.5 rounded-lg bg-black dark:bg-gradient-to-br from-primary to-[var(--accent)]/30 border border dark:border-[var(--accent)]/30 hover:border-[var(--accent)]/100 dark:focus:border-primary focus:ring-1 focus:ring-[var(--accent)]/70 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all text-xs"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-0.5">
                                            <textarea
                                                required
                                                rows={3}
                                                value={formData.message}
                                                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                                placeholder="Your Message * (Tell me about your project...)"
                                                className="w-full px-3 py-2.5 rounded-lg bg-black dark:bg-gradient-to-br from-primary to-[var(--accent)]/30 border border dark:border-[var(--accent)]/30 hover:border-[var(--accent)]/100 dark:focus:border-primary focus:ring-1 focus:ring-[var(--accent)]/70 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all text-xs"
                                            />
                                        </div>

                                        {/* File Upload Section */}
                                        <div className="space-y-1">
                                            <div
                                                onClick={() => fileInputRef.current?.click()}
                                                className="group cursor-pointer border border-dashed border-gray-200 dark:border-white/10 rounded-lg py-2 px-3 text-center hover:border-primary dark:hover:border-primary transition-all text-white bg-black dark:bg-gradient-to-tl from-primary to-[var(--accent)]/20 flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-gradient-to-br from-primary to-[var(--accent)]/100"
                                            >
                                                <input
                                                    type="file"
                                                    multiple
                                                    ref={fileInputRef}
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                    accept="image/*,audio/*,.pdf,.doc,.docx"
                                                />
                                                <Upload className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:scale-105 transition-all" />
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Attach files <span className="text-[10px] text-gray-400 dark:text-gray-500">(Optional - Max 10MB)</span>
                                                </p>
                                            </div>

                                            {/* Selected Files List */}
                                            {files.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    {files.map((file, i) => (
                                                        <motion.div
                                                            initial={{ scale: 0.8, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            key={i}
                                                            className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold border border-primary/20"
                                                        >
                                                            <FileText className="w-2.5 h-2.5" />
                                                            <span className="max-w-[100px] truncate">{file.name}</span>
                                                            <button type="button" onClick={() => removeFile(i)} className="hover:text-red-500 transition-colors">
                                                                <X className="w-2.5 h-2.5" />
                                                            </button>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {status === 'error' && (
                                            <div className="flex items-center gap-2.5 p-2 bg-red-500/10 text-red-500 rounded-lg text-[11px] border border-red-500/20">
                                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                                <p>{errorMessage}</p>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full py-2.5 bg-black dark:bg-gradient-to-tl from-primary to-[var(--accent)]/20 hover:bg-black dark:hover:bg-gradient-to-br from-primary to-[var(--accent)]/100 text-white font-bold text-xs md:text-sm rounded-lg shadow-md hover:shadow-primary/20 hover:scale-[1.005] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                                        >
                                            {status === 'loading' ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                    Send Message Now
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
