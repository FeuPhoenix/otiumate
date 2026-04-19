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

export const projects: Project[] = [
  {
    id: 'project-sortak',
    title: 'Sortak',
    category: 'Web',
    status: 'In Progress',
    description: 'Our debut AI-powered product — a photo-taking platform that turns phone selfies into professional studio-quality headshots using the best photo-generation models.',
    tags: ['React', 'TypeScript', 'Node.js'],
    link: 'https://sortak.net',
    image: '/sortak.png',
  },
]
