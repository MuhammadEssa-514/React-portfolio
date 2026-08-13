'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
    {
        name: 'Saifullah Khan',
        role: 'Senior Project Manager @ WAPDA',
        content: 'Muhammad is one of the most dedicated developers I have worked with. His attention to detail in data operations and Excel automation is top-notch.',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Saif',
        rating: 5
    },
    {
        name: 'Sarah Ahmed',
        role: 'CEO @ GB Marketers',
        content: 'Exceptional SEO and Frontend skills. He helped us optimize our platform and the user experience reached a completely new level of professional polish.',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        rating: 5
    },
    {
        name: 'John Doe',
        role: 'Tech Lead @ North Aims Technology',
        content: 'A fast learner with a passion for premium UI. His ability to implement complex interactive components like custom cursors is impressive.',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        rating: 5
    }
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-24 relative overflow-hidden bg-transparent">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        What People <span className="text-primary">Say</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Trusted by industry leaders and managers across diverse technical projects.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white/5 dark:bg-black/40 backdrop-blur-xl border border-[var(--accent)] dark:border-border-[var(--accent)] p-8 rounded-[32px] relative group"
                        >
                            <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Quote className="w-12 h-12 text-primary" />
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 mb-8 italic leading-relaxed">
                                "{item.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-primary/20 shadow-lg">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</h4>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
