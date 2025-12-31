export type Certificate = {
    id: number;
    title: string;
    issuer: string;
    date: string;
    image: string;
    file?: string;
    type: 'image' | 'pdf';
    verifyLink: string;
    category: 'Frontend' | 'CMS' | 'Platform' | 'Other';
};

export const certificates: Certificate[] = [
    {
        id: 1,
        title: 'Meta Frontend Developer',
        issuer: 'Coursera',
        date: '2023',
        image: '/certificates/images/meta_frontend.jpeg',
        file: '/certificates/Main Meta Front-End Developer.pdf',
        type: 'pdf',
        verifyLink: 'https://coursera.org/verify/professional-cert/SA8CPH4CWFNF',
        category: 'Frontend'
    },
    {
        id: 2,
        title: 'Intro to Front-End Dev',
        issuer: 'Coursera',
        date: '2023',
        image: '/certificates/images/intro_to_frontend.jpeg',
        type: 'pdf',
        file: '/certificates/Introduction to Front-End Development.pdf',
        verifyLink: 'https://coursera.org/verify/BA8DEAGHCU4A',
        category: 'Frontend'
    },
    {
        id: 3,
        title: 'HTML5 & CSS3 in Depth',
        issuer: 'Coursera',
        date: '2023',
        image: '/certificates/images/html.jpeg',
        type: 'pdf',
        file: '/certificates/HTML_and_CSS.pdf',
        verifyLink: 'https://coursera.org/verify/PEWCTZ6S5JW9',
        category: 'Frontend'
    },
    {
        id: 4,
        title: 'Principles of UX/UI Design',
        issuer: 'Coursera',
        date: '2022',
        image: '/certificates/images/UI_UX.jpeg',
        type: 'pdf',
        file: '/certificates/Principles of UXUI Design.pdf',
        verifyLink: 'https://coursera.org/verify/2PT8R3U9VR27',
        category: 'Frontend'
    },
    {
        id: 5,
        title: 'Programming with JavaScript',
        issuer: 'Upwork',
        date: '2023',
        image: '/certificates/images/javascript.png',
        type: 'pdf',
        file: '/certificates/Programming with JavaScript.pdf',
        verifyLink: 'https://www.coursera.org/account/accomplishments/verify/94XRGR5TK3AJ',
        category: 'Frontend'
    },
    {
        id: 6,
        title: 'React Basics',
        issuer: 'Coursera',
        date: '2023',
        image: '/certificates/images/react_basics.jpeg',
        type: 'pdf',
        file: '/certificates/React Basics.pdf',
        verifyLink: 'https://www.coursera.org/account/accomplishments/verify/JUKT2ZZZY8CB',
        category: 'Frontend'
    },
    {
        id: 7,
        title: 'Advanced React',
        issuer: 'Coursera',
        date: '2023',
        image: '/certificates/images/react_advanced.jpeg',
        type: 'pdf',
        file: '/certificates/Advanced React.pdf',
        verifyLink: 'https://coursera.org/verify/LL5963ANAPZX',
        category: 'Frontend'
    },
    {
        id: 8,
        title: 'Version Control',
        issuer: 'Coursera',
        date: '2023',
        image: '/certificates/images/version_control.png',
        type: 'pdf',
        file: '/certificates/Version Control.pdf',
        verifyLink: 'https://coursera.org/verify/ZDQBEGNYFQSB',
        category: 'Frontend'
    },
    {
        id: 9,
        title: 'Front-End Dev Capstone',
        issuer: 'Coursera',
        date: '2023',
        image: '/certificates/images/capston.jpeg',
        type: 'pdf',
        file: '/certificates/Front-End Developer Capstone.pdf',
        verifyLink: 'https://coursera.org/verif y/V6YC7NLMJJSB',
        category: 'Frontend'
    },
    {
        id: 10,
        title: 'Coding Interview',
        issuer: 'Coursera',
        date: '2023',
        image: '/certificates/images/codding interview.jpeg',
        type: 'pdf',
        file: '/certificates/Coding Interview Preparation.pdf',
        verifyLink: 'https://www.coursera.org/account/accomplishments/verify/32LMWP6HXNVT',
        category: 'Frontend'
    },
    {
        id: 11,
        title: 'upwork',
        issuer: 'upwork',
        date: '2023',
        image: 'https://placehold.co/600x400/1e293b/f7df1e?text=upwork',
        type: 'pdf',
        file: '/certificates/upwork.pdf',
        verifyLink: 'https://coursera.org/verify/LL5963ANAPZX',
        category: 'Frontend'
    },
];
