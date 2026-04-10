export type TechCategory = 'Frontend' | 'Backend' | 'Tooling' | 'Design'

export interface TechItem {
  name: string
  category: TechCategory
  color: string
}

// TODO: Update with your actual tech stack
export const stack: TechItem[] = [
  // Frontend
  { name: 'React',       category: 'Frontend', color: '#61DAFB' },
  { name: 'TypeScript',  category: 'Frontend', color: '#3178C6' },
  { name: 'Vite',        category: 'Frontend', color: '#646CFF' },
  { name: 'Tailwind',    category: 'Frontend', color: '#06B6D4' },
  { name: 'Framer',      category: 'Frontend', color: '#0055FF' },
  { name: 'React Native',category: 'Frontend', color: '#61DAFB' },
  // Backend
  { name: 'Python',      category: 'Backend',  color: '#3776AB' },
  { name: 'FastAPI',     category: 'Backend',  color: '#009688' },
  { name: 'Node.js',     category: 'Backend',  color: '#339933' },
  { name: 'PostgreSQL',  category: 'Backend',  color: '#4169E1' },
  { name: 'Redis',       category: 'Backend',  color: '#DC382D' },
  { name: 'Docker',      category: 'Backend',  color: '#2496ED' },
  // Tooling
  { name: 'AWS',         category: 'Tooling',  color: '#FF9900' },
  { name: 'Vercel',      category: 'Tooling',  color: '#FFFFFF' },
  { name: 'GitHub',      category: 'Tooling',  color: '#FFFFFF' },
  { name: 'Figma',       category: 'Design',   color: '#F24E1E' },
  { name: 'OpenAI',      category: 'Tooling',  color: '#10A37F' },
  { name: 'Supabase',    category: 'Backend',  color: '#3ECF8E' },
]
