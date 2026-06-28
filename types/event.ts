export type EventMode = 'online' | 'offline' | 'hybrid'
export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed'

export interface Event {
  id: string
  organizer_id: string
  title: string
  tagline: string | null
  description: string
  mode: EventMode
  location: string | null
  start_date: string
  end_date: string
  registration_deadline: string
  prize_pool: string | null
  cover_image_url: string | null
  max_participants: number | null
  status: EventStatus
  created_at: string
  updated_at: string
  application_status?: 'pending' | 'accepted' | 'rejected' | null
}

export interface EventSummary {
  id: string
  title: string
  tagline: string | null
  mode: EventMode
  start_date: string
  prize_pool: string | null
  organizer_name: string
  status: 'published'
}

export type CreateEventInput = {
  title: string
  tagline?: string
  description: string
  mode: EventMode
  location?: string
  start_date: string
  end_date: string
  registration_deadline: string
  prize_pool?: string
  cover_image_url?: string
  max_participants?: number
}
