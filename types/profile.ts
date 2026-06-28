export type UserRole = 'student' | 'organizer'

export interface Profile {
  id: string
  user_id: string
  role: UserRole
  display_name: string
  email: string
  avatar_url: string | null
  college: string | null
  skills: string[]
  github_url: string | null
  bio: string | null
  looking_for_team: boolean
  created_at: string
  updated_at: string
}

export type CreateProfileInput = Pick<Profile, 'display_name'> & {
  college?: string
  skills?: string[]
  github_url?: string
  bio?: string
  looking_for_team?: boolean
}

export type UpdateProfileInput = Partial<CreateProfileInput>
