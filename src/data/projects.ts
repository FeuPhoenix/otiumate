export type ProjectCategory = 'Web' | 'Mobile' | 'Research'
export type ProjectStatus = 'Live' | 'In Progress' | 'Concept'

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  status: ProjectStatus
  description: string
  tags: string[]
  image?: string
  link?: string
}

// TODO: Replace placeholder data with real projects
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Otiumate Core',
    category: 'Web',
    status: 'In Progress',
    description: 'The flagship product — a smart productivity platform that learns how you work and removes the rest.',
    tags: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'],
    image: 'https://picsum.photos/seed/proj1/800/500',
    link: '#',
  },
  {
    id: 'project-2',
    title: 'FlowState Mobile',
    category: 'Mobile',
    status: 'In Progress',
    description: 'Companion app for deep focus sessions with ambient soundscapes and session analytics.',
    tags: ['React Native', 'Expo', 'TypeScript'],
    image: 'https://picsum.photos/seed/proj2/800/500',
    link: '#',
  },
  {
    id: 'project-3',
    title: 'Insight Engine',
    category: 'Research',
    status: 'Concept',
    description: 'AI-powered research layer that surfaces patterns and connections across your knowledge base.',
    tags: ['Python', 'OpenAI', 'Vector DB', 'FastAPI'],
    image: 'https://picsum.photos/seed/proj3/800/500',
    link: '#',
  },
  {
    id: 'project-4',
    title: 'Pulse Dashboard',
    category: 'Web',
    status: 'Live',
    description: 'Real-time team health and momentum tracker for distributed teams.',
    tags: ['React', 'D3.js', 'Node.js', 'WebSockets'],
    image: 'https://picsum.photos/seed/proj4/800/500',
    link: '#',
  },
  {
    id: 'project-5',
    title: 'Clarity AI',
    category: 'Research',
    status: 'Concept',
    description: 'Language model fine-tuned on productivity literature to coach users through decision fatigue.',
    tags: ['Python', 'Transformers', 'RLHF', 'FastAPI'],
    image: 'https://picsum.photos/seed/proj5/800/500',
    link: '#',
  },
  {
    id: 'project-6',
    title: 'Onboard Flow',
    category: 'Mobile',
    status: 'Live',
    description: 'White-label onboarding SDK for mobile apps — zero-friction first-run experiences.',
    tags: ['React Native', 'TypeScript', 'Storybook'],
    image: 'https://picsum.photos/seed/proj6/800/500',
    link: '#',
  },
]
