export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  company: string
  avatar?: string
}

// TODO: Replace with real testimonials
export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    quote: "Otiumate fundamentally changed how our team approaches deep work. We ship faster, communicate cleaner, and actually feel in control of our time again.",
    name: 'Sarah Chen',
    role: 'Head of Product',
    company: 'Axiom Labs',
    avatar: 'https://picsum.photos/seed/av1/80/80',
  },
  {
    id: 'test-2',
    quote: "The attention to craft here is rare. Every interaction feels considered and intentional — this team truly understands what it means to build for humans.",
    name: 'Marcus Webb',
    role: 'CTO',
    company: 'Foundry Studio',
    avatar: 'https://picsum.photos/seed/av2/80/80',
  },
  {
    id: 'test-3',
    quote: "We evaluated a dozen solutions before finding Otiumate. Nothing else came close to the elegance of the thinking behind the product. It's ambitious and it works.",
    name: 'Layla Okonkwo',
    role: 'Co-Founder',
    company: 'Meridian Capital',
    avatar: 'https://picsum.photos/seed/av3/80/80',
  },
]
