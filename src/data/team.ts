import type { TeamMember } from '@/types/content'

export const team: TeamMember[] = [
  {
    name: 'Bojo Danchev',
    role: 'Founder & CEO',
    bio: 'Systems thinker obsessed with the intersection of software, automation, and business strategy. Built and scaled multiple digital businesses before founding New Age to help other founders skip the trial-and-error phase. Believes every business deserves infrastructure that works as hard as its people.',
    avatar: '/team/bojo.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/bojodanchev',
      twitter: 'https://twitter.com/bojodanchev',
      github: 'https://github.com/bojodanchev',
    },
  },
  {
    name: 'Elena Vasquez',
    role: 'CTO',
    bio: 'Full-stack architect with a decade of experience shipping production systems at scale. Former engineering lead at two YC-backed startups. Specializes in designing databases that do not break and APIs that other developers actually enjoy using.',
    avatar: '/team/elena.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/elenavasquez',
      github: 'https://github.com/elenavasquez',
    },
  },
  {
    name: 'James Okoro',
    role: 'Head of Automation',
    bio: 'Built automation systems for Fortune 500 companies before deciding small-to-mid businesses deserved the same firepower. Has deployed over 500 business process automations across 40+ industries. If it can be automated, James has already mapped the workflow.',
    avatar: '/team/james.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/jamesokoro',
    },
  },
  {
    name: 'Mia Andersson',
    role: 'Head of Growth',
    bio: 'Growth strategist who has managed over $15M in ad spend and built marketing engines for SaaS, e-commerce, and service businesses. Thinks in funnels, measures in revenue, and refuses to optimize for vanity metrics.',
    avatar: '/team/mia.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/miaandersson',
      twitter: 'https://twitter.com/miaandersson',
    },
  },
]

export function getFounder(): TeamMember {
  return team[0]
}

export function getAllTeamMembers(): TeamMember[] {
  return team
}
