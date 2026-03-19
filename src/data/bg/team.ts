import type { TeamMember } from '@/types/content'

export const team: TeamMember[] = [
  {
    name: 'Bojidar Danchev',
    role: 'Съосновател и CTO',
    bio: 'Техническата сила зад New Age. Full-stack архитект, който проектира и изгражда софтуера, автоматизациите и инфраструктурата, захранващи всеки клиентски проект. Обсебен от чисти системи, мащабируема архитектура и превръщането на сложна бизнес логика в елегантен код. Ако работи — Божо го е построил.',
    avatar: '/team/bojo.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/bojodanchev',
      twitter: 'https://twitter.com/bojodanchev',
      github: 'https://github.com/bojodanchev',
    },
  },
  {
    name: 'Sean Isa',
    role: 'Съосновател и COO',
    bio: 'Оперативният гръбнак на New Age. Sean управлява клиентската стратегия, доставката на проекти и бизнес развитието. Той превръща бизнес проблемите в изпълними пътни карти и гарантира, че всеки проект се доставя навреме и в рамките на бюджета. Където Божо изгражда системите, Sean гарантира, че те решават правилните проблеми за правилните хора.',
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
