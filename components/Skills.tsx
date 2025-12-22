'use client';

import { motion } from 'framer-motion';

const skills = [
    { name: 'HTML5', level: 95 },
    { name: 'CSS3', level: 90 },
    { name: 'JavaScript (ES6+)', level: 88 },
    { name: 'Tailwind CSS', level: 92 },
    { name: 'React.js', level: 85 },
    { name: 'Next.js', level: 82 },
    { name: 'WordPress', level: 80 },
    { name: 'Git & GitHub', level: 75 },
    { name: 'Responsive Design', level: 90 },
];

export default function Skills() {
    return (
        <section id="skills" className="py-20 bg-gray-50 dark:bg-white/5 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent inline-block">
                        Professional Skills
                    </h2>
                    <div className="h-1 w-20 bg-[var(--primary)] mx-auto mt-2 rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold text-gray-700 dark:text-gray-300">{skill.name}</span>
                                <span className="font-bold text-[var(--primary)]">{skill.level}%</span>
                            </div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-white dark:to-gray-300"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
