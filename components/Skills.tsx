'use client';

import { motion } from 'framer-motion';

const codingSkills = [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 80 },
    { name: 'JavaScript', level: 70 },
    { name: 'React', level: 75 },
];

const professionalSkills = [
    { name: 'Excel', level: 95 },
    { name: 'UI-UX Designing (Figma)', level: 72 },
    { name: 'Github', level: 88 },
    { name: 'Editing', level: 83 },
];

export default function Skills() {
    return (
        <section id="skills" className="py-20 relative z-10 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        My <span className="text-[var(--primary)]">Skills</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 md:gap-20">
                    {/* Coding Skills Column */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-8">Coding Skills</h3>
                        <div className="space-y-8">
                            {codingSkills.map((skill, index) => (
                                <SkillItem key={skill.name} skill={skill} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Professional Skills Column */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-8">Professional</h3>
                        <div className="space-y-8">
                            {professionalSkills.map((skill, index) => (
                                <SkillItem key={skill.name} skill={skill} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SkillItem({ skill, index }: { skill: { name: string, level: number }, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
        >
            <div className="flex justify-between mb-2 text-white">
                <span className="font-bold text-lg">{skill.name}</span>
                <span className="font-bold text-white">{skill.level}%</span>
            </div>
            <div className="h-2 border border-[var(--primary)] rounded-full p-[1px]">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full rounded-full bg-[var(--primary)]"
                />
            </div>
        </motion.div>
    );
}
