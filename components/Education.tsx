'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';

const education = [
    {
        degree: 'Bachelor’s Degree (Continuing)',
        institution: 'University of Management & Technology (UMT), Lahore',
        date: '2023 – Present',
        current: true
    },
    {
        degree: 'F.Sc',
        institution: 'Army Public School & College Jutial, Gilgit',
        date: '2019 – 2021',
        current: false
    },
    {
        degree: 'Matriculation',
        institution: 'Army Public School & College Jutial, Gilgit',
        date: '2017 – 2019',
        current: false
    }
];

export default function Education() {
    return (
        <section id="education" className="py-20 bg-gray-50 dark:bg-white/5 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent inline-block">
                        Education
                    </h2>
                    <div className="h-1 w-20 bg-[var(--primary)] mx-auto mt-2 rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`bg-white dark:bg-black p-8 rounded-xl shadow-lg border-2 ${edu.current ? 'border-[var(--primary)]' : 'border-transparent'} hover:border-[var(--primary)] transition-all duration-300 group`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-gray-100 dark:bg-white/10 rounded-lg group-hover:bg-[var(--primary)]/10 transition-colors">
                                    <GraduationCap className={`w-6 h-6 ${edu.current ? 'text-[var(--primary)]' : 'text-gray-500 dark:text-gray-400'} group-hover:text-[var(--primary)] transition-colors`} />
                                </div>
                                {edu.current && (
                                    <span className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase rounded">
                                        Current
                                    </span>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[var(--primary)] transition-colors">
                                {edu.degree}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 font-medium">
                                {edu.institution}
                            </p>

                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                                <Calendar className="w-4 h-4 mr-2" />
                                {edu.date}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
