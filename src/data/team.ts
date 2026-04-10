export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  photo?: string
  details: string[]
  socials?: {
    linkedin?: string
    github?: string
    twitter?: string
  }
}

// TODO: Replace placeholder data with real team members
export const team: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Alex Carter',
    role: 'Co-Founder & CEO',
    bio: 'Visionary builder with a background in product design and growth strategy. Alex has spent the last 6 years obsessing over how technology can remove friction from everyday life. When not whiteboarding ideas, you\'ll find them running trails or reading dense philosophy.',
    photo: 'https://picsum.photos/seed/team1/800/1000',
    details: ['Based in London, UK', '6+ years in product', 'Philosophy enthusiast'],
    socials: {
      linkedin: '#',
      github: '#',
      twitter: '#',
    },
  },
  {
    id: 'member-2',
    name: 'Jordan Lee',
    role: 'Co-Founder & CTO',
    bio: 'Full-stack engineer with a deep love for systems thinking and elegant architecture. Jordan previously led engineering at two early-stage startups and believes the best code is the kind you never have to explain. Avid contributor to open-source tooling.',
    photo: 'https://picsum.photos/seed/team2/800/1000',
    details: ['Based in Berlin, Germany', 'Full-stack architect', 'Open-source contributor'],
    socials: {
      linkedin: '#',
      github: '#',
    },
  },
  {
    id: 'member-3',
    name: 'Sam Rivera',
    role: 'Head of Design',
    bio: 'Designer who thinks in systems, not screens. Sam brings a motion-first approach to interface design, ensuring every interaction feels alive and intentional. Former design lead at a Series B fintech. Perpetual sketchbook carrier.',
    photo: 'https://picsum.photos/seed/team3/800/1000',
    details: ['Based in Barcelona, Spain', 'Motion-first design', 'Ex-fintech design lead'],
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 'member-4',
    name: 'Morgan Kim',
    role: 'Head of Growth',
    bio: 'Data-driven strategist with a talent for finding product-market fit signals before everyone else does. Morgan has scaled two B2B products from zero to meaningful ARR and believes growth is just good storytelling backed by numbers.',
    photo: 'https://picsum.photos/seed/team4/800/1000',
    details: ['Based in Toronto, Canada', 'B2B growth specialist', 'Storyteller + analyst'],
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
]
