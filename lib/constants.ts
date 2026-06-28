export const SITE_NAME = 'Nexus'
export const SITE_TAGLINE = 'The platform where innovation events happen.'

export const ROLES = {
  STUDENT: 'student',
  ORGANIZER: 'organizer',
} as const

export const EVENT_MODES = ['online', 'offline', 'hybrid'] as const
export const EVENT_STATUSES = ['draft', 'published', 'cancelled', 'completed'] as const
export const APPLICATION_STATUSES = ['pending', 'accepted', 'rejected', 'cancelled'] as const

export const NAV_ITEMS = {
  STUDENT: [
    { label: 'Discover', href: '/events', icon: 'Search' },
    { label: 'My Events', href: '/me/events', icon: 'Calendar' },
    { label: 'Passport', href: '/passport', icon: 'User' },
  ],
  ORGANIZER: [
    { label: 'Discover', href: '/events', icon: 'Search' },
    { label: 'My Events', href: '/me/events', icon: 'Calendar' },
    { label: 'Dashboard', href: '/organizer', icon: 'LayoutDashboard' },
  ],
} as const
