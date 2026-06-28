import type { EventSummary } from './event'

export type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled'

export interface Application {
  id: string
  user_id: string
  event_id: string
  status: ApplicationStatus
  notes: string | null
  reviewed_by: string | null
  reviewed_at: string | null
  created_at: string
  updated_at: string
  event?: EventSummary
}

export type ApplyInput = {
  event_id: string
  notes?: string
}
