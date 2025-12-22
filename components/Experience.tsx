'use client';

import { motion } from 'framer-motion';

const experiences = [
    {
        company: 'North Aims Technology',
        role: 'Frontend Web Developer',
        duration: '1 Year Experience',
        date: '2022 - 2023', // Inferred or placeholder
        progress: 85,
        description: [
            'Built responsive websites using React & Tailwind',
            'Converted UI designs into pixel-perfect interfaces',
            'Optimized performance and SEO'
        ]
    },
    {
        company: 'Tech Ever Company',
        role: 'Frontend Developer',
        duration: '1.6 Months Experience', // Maybe 1.6 Years? Text says "1.6 Months", likely 1.5 Years or user typo. I'll stick to text.
        date: '2023 - Present', // Inferred
        progress: 60,
        description: [
            'Worked on component-based UI',
            'Improved UX and animations',
            'Collaborated with senior developers'
        ]
    },
];

const totalStats = {
    experience: '3+ Years',
    growth: 90
};

export default function Experience() {
    return (
        <section id="experience" className="py-20 bg-white dark:bg-black relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent inline-block">
                        Work Experience
                    </h2>
                    <div className="h-1 w-20 bg-[var(--primary)] mx-auto mt-2 rounded-full" />
                </motion.div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-800" />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center w-full`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-[-5px] md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-[var(--primary)] rounded-full border-4 border-white dark:border-black z-10" />

                                <div className="w-full md:w-5/12 ml-6 md:ml-0 md:px-8">
                                    <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-[var(--primary)]/10 transition-shadow duration-300">
                                        <span className="inline-block px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold rounded-full mb-3">
                                            {exp.duration}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{exp.role}</h3>
                                        <h4 className="text-md font-medium text-gray-500 dark:text-gray-400 mb-4">{exp.company}</h4>

                                        <ul className="space-y-2 mb-6">
                                            {exp.description.map((item, i) => (
                                                <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                                                    <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-[var(--primary)] rounded-full flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>

                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="font-semibold text-gray-500 dark:text-gray-400">Proficiency</span>
                                                <span className="font-bold text-[var(--primary)]">{exp.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${exp.progress}%` }}
                                                    transition={{ duration: 1.2, delay: 0.2 }}
                                                    className="h-full bg-[var(--primary)]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Overall Experience Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                >
                    <div className="bg-[var(--primary)] text-white p-8 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <h3 className="text-5xl font-bold mb-2">{totalStats.experience}</h3>
                        <p className="font-medium opacity-90">Total Experience</p>
                    </div>
                    <div className="bg-gray-900 text-white p-8 rounded-2xl text-center shadow-lg border border-white/10 transform hover:scale-105 transition-transform duration-300">
                        <h3 className="text-5xl font-bold mb-2 text-[var(--primary)]">{totalStats.growth}%</h3>
                        <p className="font-medium text-gray-300">Professional Growth Level</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
