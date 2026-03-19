import type { ClientLogo } from '@/types/content'

export const clients: ClientLogo[] = [
  { name: 'TechFlow', logo: '/clients/techflow.svg' },
  { name: 'Velora', logo: '/clients/velora.svg' },
  { name: 'Apex Group', logo: '/clients/apex.svg' },
  { name: 'Northpoint', logo: '/clients/northpoint.svg' },
  { name: 'Prism Digital', logo: '/clients/prism.svg' },
  { name: 'Clarity Health', logo: '/clients/clarity.svg' },
  { name: 'StreamlineHQ', logo: '/clients/streamline.svg' },
  { name: 'Kinetic Labs', logo: '/clients/kinetic.svg' },
]

export function getAllClients(): ClientLogo[] {
  return clients
}
