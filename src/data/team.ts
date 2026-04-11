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

// TODO: Fill in full names, roles, bios, details and social links
export const team: TeamMember[] = [
  {
    id: 'member-amr',
    name: 'Amr',
    role: 'Head of Design',
    bio: 'Visionary builder with a passion for turning ambitious ideas into real products. Obsessed with the intersection of design, technology, and human behaviour. Always thinking about what comes next.',
    photo: '/team-amr.png',
    details: ['TODO: Location', 'TODO: Years of experience', 'TODO: Fun fact'],
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
    photo: '/team-beme.png',
    details: ['TODO: Location', 'TODO: Years of experience', 'TODO: Fun fact'],
    socials: {
      linkedin: '#',
      github: '#',
    },
  },
  {
    id: 'member-joe',
    name: 'Joe',
    role: 'Head of Design',
    bio: 'Designer with a motion-first philosophy. Every screen should feel alive and intentional. Brings a sharp eye for detail and a deep understanding of what makes interfaces feel premium.',
    photo: '/team-joe.png',
    details: ['TODO: Location', 'TODO: Years of experience', 'TODO: Fun fact'],
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 'member-kesh',
    name: 'Kesh',
    role: 'Head of Technical',
    bio: 'Product strategist who thrives at the crossroads of user needs and business goals. Turns fuzzy problems into sharp roadmaps. Passionate about building things people actually want to use.',
    photo: '/team-kesh.png',
    details: ['TODO: Location', 'TODO: Years of experience', 'TODO: Fun fact'],
    socials: {
      linkedin: 'https://www.linkedin.com/in/ahmed-el-keshawy/',
      github: 'https://github.com/Ahmed-ELKeshawy',
    },
  },
  {
    id: 'member-seif',
    name: 'Seif',
    role: 'CEO & Co-Founder',
    bio: 'Growth strategist with a talent for finding what moves the needle. Combines data with storytelling to build audiences and drive traction. Believes the best growth comes from genuinely great products.',
    photo: '/team-seif.png',
    details: ['TODO: Location', 'TODO: Years of experience', 'TODO: Fun fact'],
    socials: {
      linkedin: 'https://www.linkedin.com/in/seifeldeen-abdelgawad-25257b213/',
    },
  },
]
