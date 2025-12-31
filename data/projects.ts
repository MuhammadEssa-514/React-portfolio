export type Project = {
    id: number;
    title: string;
    description: string;
    fullDescription?: string;
    category: 'DASHBOARD' | 'PAGES' | 'FORMS' | 'APP' | 'OTHER';
    images: string[]; // Array of images for the gallery
    techStack: string[];
    demoLink: string;
    repoLink: string;
    featured?: boolean;
};

export const projects: Project[] = [
    {
        id: 1,
        category: 'DASHBOARD',
        title: 'Selvia Admin Dashboard',
        description: 'A comprehensive, responsive admin dashboard with dark mode, analytics charts, and user management.',
        fullDescription: 'Selvia Admin is a high-performance React dashboard template. It features a fully responsive layout, dark/light theme toggle, Recharts for data visualization, and a modular component architecture. Perfect for SaaS back-ends.',
        images: [
            'https://placehold.co/800x600/1f2937/fb923c?text=Selvia+Dashboard+Main',
            'https://placehold.co/800x600/1f2937/60a5fa?text=Analytics+View',
            'https://placehold.co/800x600/1f2937/4ade80?text=User+Management'
        ],
        techStack: ['React', 'Next.js', 'Tailwind CSS', 'Recharts', 'Framer Motion'],
        demoLink: '#',
        repoLink: '#'
    },
    {
        id: 2,
        category: 'PAGES',
        title: 'Luxe E-Commerce',
        description: 'A premium fashion e-commerce landing page with parallax effects and smooth scrolling.',
        fullDescription: 'Built for high-end fashion brands, this landing page features parallax scrolling, GSAP animations for product reveals, and a custom cart interaction. Optimized for mobile conversions.',
        images: [
            'https://placehold.co/800x600/000000/ffffff?text=Luxe+Home',
            'https://placehold.co/800x600/222222/ffffff?text=Product+Grid',
            'https://placehold.co/800x600/333333/ffffff?text=Cart+Drawer'
        ],
        techStack: ['React', 'TypeScript', 'Tailwind', 'GSAP'],
        demoLink: '#',
        repoLink: '#'
    },
    {
        id: 3,
        category: 'FORMS',
        title: 'Secure Auth System',
        description: 'A robust authentication system with animated login/signup forms and JWT handling.',
        images: [
            'https://placehold.co/800x600/4f46e5/ffffff?text=Login+Form',
            'https://placehold.co/800x600/4338ca/ffffff?text=Signup+Flow',
            'https://placehold.co/800x600/3730a3/ffffff?text=Forgot+Password'
        ],
        techStack: ['React', 'Firebase', 'React Hook Form', 'Zod'],
        demoLink: '#',
        repoLink: '#'
    },
    {
        id: 4,
        category: 'DASHBOARD',
        title: 'Finance Analytics',
        description: 'Real-time financial data visualization tool for crypto and stock tracking.',
        images: [
            'https://placehold.co/800x600/0f172a/38bdf8?text=Finance+Overview',
            'https://placehold.co/800x600/1e293b/38bdf8?text=Stock+Charts'
        ],
        techStack: ['Next.js', 'Chart.js', 'Tailwind', 'API Integration'],
        demoLink: '#',
        repoLink: '#'
    }
];
