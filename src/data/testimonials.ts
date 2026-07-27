export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  company: string
  avatar?: string
}

// Add real testimonials here once clients have given permission to be quoted.
// `Testimonials.tsx` currently renders a "Coming Soon" panel and does not read
// this array — wire it up when there is something genuine to show.
export const testimonials: Testimonial[] = []
