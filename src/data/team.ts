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
    name: 'Amr',
    role: 'Co-Founder & Head of Design',
    bio: 'Visionary builder with a passion for turning ambitious ideas into real products. Obsessed with the intersection of design, technology, and human behaviour. Always thinking about what comes next.',
    photo: '/team-amr.webp',
    details: [],
    socials: {
      linkedin: 'https://www.linkedin.com/in/amr-eldeeb-cs/',
      github: 'https://github.com/FeuPhoenix',
    },
  },
  {
    id: 'member-beme',
    name: 'Beme',
    role: 'Co-Founder & CTO',
    bio: 'Full-stack engineer who loves clean architecture and elegant solutions. Believes great code is invisible — it just works. Brings systems thinking to every problem.',
    photo: '/team-beme.webp',
    details: [],
  },
  {
    id: 'member-joe',
    name: 'Joe',
    role: 'Co-Founder',
    bio: 'Designer with a motion-first philosophy. Every screen should feel alive and intentional. Brings a sharp eye for detail and a deep understanding of what makes interfaces feel premium.',
    photo: '/team-joe.webp',
    details: [],
  },
  {
    id: 'member-kesh',
    name: 'Kesh',
    role: 'Co-Founder & Head of Technical',
    bio: 'Product strategist who thrives at the crossroads of user needs and business goals. Turns fuzzy problems into sharp roadmaps. Passionate about building things people actually want to use.',
    photo: '/team-kesh.webp',
    details: [],
    socials: {
      linkedin: 'https://www.linkedin.com/in/ahmed-el-keshawy/',
      github: 'https://github.com/Ahmed-ELKeshawy',
    },
  },
  {
    id: 'member-mokhles',
    name: 'Mokhles',
    role: 'Co-Founder',
    bio: 'Dedicated team member who brings energy and focus to every project. Committed to building products that make a real difference.',
    photo: '/team-mokhles.webp',
    details: [],
  },
  {
    id: 'member-seif',
    name: 'Seif',
    role: 'CEO & Co-Founder',
    bio: 'Mechanical engineering graduate from AUC with a restless love for entrepreneurship, storytelling, and building ideas where technical rigor meets creative vision. I saw how AI was changing everything — and how many young people were excited, confused, and stuck, not knowing how to harness it. So I decided to build the kind of opportunity for others that AI created for me.\n\nWith no big money, no famous last name, and no ready-made blueprint, I started this with a dream and a team of people who think the same way but bring skills I don\'t have.\n\nMy goal is simple: to enable everyone who feels behind, and to help Egypt achieve its goal of becoming an AI and tech hub for the region — by building tools that put real power into people\'s hands.',
    photo: '/team-seif.webp',
    details: [],
    socials: {
      linkedin: 'https://www.linkedin.com/in/seifeldeen-abdelgawad-25257b213/',
    },
  },
]
