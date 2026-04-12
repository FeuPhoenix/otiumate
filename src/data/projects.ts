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
    description: 'A smarter way to sort, discover, and act — cutting through the noise so you can focus on what matters.',
    tags: ['React', 'TypeScript', 'Node.js'],
    link: 'https://sortak.net',
    image: '/sortak.png',
  },
]
