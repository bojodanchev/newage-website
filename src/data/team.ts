import type { TeamMember } from '@/types/content'

export const team: TeamMember[] = [
  {
    name: 'Bozhidar Danchev',
    role: 'Co-Founder & CTO',
    bio: 'The technical force behind New Age. Full-stack architect who designs and builds the software, automations, and infrastructure that power every client engagement. Obsessed with clean systems, scalable architecture, and turning complex business logic into elegant code. If it runs, Bojo built it.',
    avatar: '/team/bojo.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/bojodanchev',
      twitter: 'https://twitter.com/bojodanchev',
      github: 'https://github.com/bojodanchev',
    },
  },
  {
    name: 'Sean Isa',
    role: 'Co-Founder & COO',
    bio: 'The operational backbone of New Age. Sean owns client strategy, project delivery, and business development. He translates business problems into actionable roadmaps and ensures every project ships on time and on budget. Where Bojo builds the systems, Sean makes sure they solve the right problems for the right people.',
    avatar: '/team/sean.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/seanisa',
    },
  },
]

export function getFounder(): TeamMember {
  return team[0]
}

export function getAllTeamMembers(): TeamMember[] {
  return team
}
