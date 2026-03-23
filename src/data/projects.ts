import type { Project } from '@/src/types';

export const projects: Project[] = [
  {
    id: 'react-travel',
    title: 'React Travel App',
    description:
      'A travel discovery app built with React.js that integrates Google Places API to explore destinations, view place details, and find nearby attractions.',
    techStack: ['React.js', 'Google Places API', 'JavaScript', 'CSS'],
    githubUrl: 'https://github.com/jgarrone82/React-Project-Travel',
    liveUrl: undefined,
    status: 'live',
    imageUrl: '/images/projects/react-travel.png',
  },
  {
    id: 'tienda-online',
    title: 'Online Store',
    description:
      'A full-stack e-commerce application built with Angular and React for the frontend, backed by a MongoDB database. Features product catalog, cart management, and order processing.',
    techStack: ['Angular', 'React.js', 'MongoDB', 'JavaScript'],
    githubUrl: 'https://github.com/jgarrone82/Tienda-Online',
    liveUrl: undefined,
    status: 'live',
    imageUrl: '/images/projects/tienda-online.png',
  },
  {
    id: 'nodejs-blog',
    title: 'Node.js Travel Blog',
    description:
      'A full-stack travel blog application with a Node.js backend, MySQL database for content persistence, and server-side rendered views for fast page loads.',
    techStack: ['Node.js', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/jgarrone82/NodeJs-Blog',
    liveUrl: undefined,
    status: 'live',
    imageUrl: '/images/projects/nodejs-blog.png',
  },
  {
    id: 'coming-soon-1',
    title: 'Coming Soon',
    description: 'A new project is in the works. Stay tuned for updates.',
    techStack: [],
    githubUrl: '',
    status: 'coming-soon',
  },
  {
    id: 'coming-soon-2',
    title: 'Coming Soon',
    description: 'A new project is in the works. Stay tuned for updates.',
    techStack: [],
    githubUrl: '',
    status: 'coming-soon',
  },
  {
    id: 'coming-soon-3',
    title: 'Coming Soon',
    description: 'A new project is in the works. Stay tuned for updates.',
    techStack: [],
    githubUrl: '',
    status: 'coming-soon',
  },
];
