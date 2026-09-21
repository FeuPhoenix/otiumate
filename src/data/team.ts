export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  photo?: string
  /** Short fact chips shown under the bio on desktop. Leave empty to hide. */
  details: string[]
  socials?: {
    linkedin?: string
    github?: string
    twitter?: string
  }
}

export const team: TeamMember[] = [
  {
    id: 'member-amr',
    name: 'Amr Eldeeb',
    role: 'Co-Founder',
    bio: 'Leads design across every Otiumate product, from first sketch to shipped interface. Shapes how our products look, feel, and behave, making sure complex AI systems stay simple and intuitive for the people using them. Obsessed with the details that turn a working product into one people love.',
    photo: '/team-amr.webp',
    details: [],
    socials: {
      linkedin: 'https://www.linkedin.com/in/amr-eldeeb-cs/',
      github: 'https://github.com/FeuPhoenix',
    },
  },
  {
    id: 'member-beme',
    name: 'Yousef Ahmed',
    role: 'Co-Founder',
    bio: 'Full-stack engineer who loves clean architecture and elegant solutions. Believes great code is invisible — it just works. Brings systems thinking to every problem.',
    photo: '/team-beme.webp',
    details: [],
    socials: {
      linkedin: 'https://www.linkedin.com/in/youssef-el-kady-4dev/',
      github: 'https://github.com/Elkady4Dev',
    },
  },
  {
    id: 'member-joe',
    name: 'Youssef Sadek',
    role: 'Co-Founder',
    bio: 'They thrive at the intersection of creative storytelling and deep data analytics, ensuring every campaign resonates emotionally while hitting hard business metrics.',
    photo: '/team-joe.webp',
    details: [],
    socials: {
      linkedin: 'https://www.linkedin.com/in/youssef-sadek-687aa1419/',
    },
  },
  {
    id: 'member-kesh',
    name: 'Ahmed ELKeshawy',
    role: 'Co-Founder',
    bio: 'AI engineer and researcher specializing in computer vision, generative media and natural language pipelines, and edge systems. As a Co-Founder of Otiumate, he architects the end-to-end vision and image processing engines driving projects like Sortak. Combining production-grade engineering with academic rigor, he also leads applied R&D and instructs computer vision and systems modules at The British University in Egypt.',
    photo: '/team-kesh.webp',
    details: [
      'Wrote an architecture framework exploring artificial "sleep-phase consolidation" for AI brains — making him one of the few engineers whose theoretical systems might actually sleep more than he does',
    ],
    socials: {
      linkedin: 'https://www.linkedin.com/in/ahmed-el-keshawy/',
      github: 'https://github.com/Ahmed-ELKeshawy',
    },
  },
  {
    id: 'member-mokhles',
    name: 'Youssef Mokhles',
    role: 'Co-Founder',
    bio: 'Dedicated team member who brings energy and focus to every project. Committed to building products that make a real difference.',
    photo: '/team-mokhles.webp',
    details: [],
    socials: {
      linkedin: 'https://www.linkedin.com/in/youssef-mokhles-63a834317/',
    },
  },
  {
    id: 'member-seif',
    name: 'Seifeldeen Abdelgawad',
    role: 'Co-Founder',
    bio: 'Mechanical engineering graduate from AUC with a restless love for entrepreneurship, storytelling, and building ideas where technical rigor meets creative vision. I saw how AI was changing everything — and how many young people were excited, confused, and stuck, not knowing how to harness it. So I decided to build the kind of opportunity for others that AI created for me.\n\nMy goal is simple: to enable everyone who feels behind, and to help Egypt become an AI and tech hub for the region — by building tools that put real power into people\'s hands.',
    photo: '/team-seif.webp',
    details: ['He and his two siblings all share the same birthday — and they are not triplets'],
    socials: {
      linkedin: 'https://www.linkedin.com/in/seifeldeen-abdelgawad-25257b213/',
    },
  },
]
