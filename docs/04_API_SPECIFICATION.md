# API Specification — Nexus

**Version:** v1.0.0  
**Status:** Draft  
**Last Updated:** 2026-06-28  
**Changelog:**
- v1.0.0 — Initial API contract: 13 operations across 5 feature groups, validation rules, error catalogue

---

## 1. API Principles

1. **Server Actions first.** All mutations use Next.js Server Actions. No REST endpoints, no route handlers, no custom backend.
2. **Type-safe.** Every operation has TypeScript input/output types. No `any`, no runtime surprises.
3. **Validate before mutate.** Input validation runs on the server before any database write. Client-side validation is secondary UX, not a security boundary.
4. **Authenticate before authorize.** Every operation first verifies the session (`auth.uid()`), then checks role/permissions.
5. **Generic resource names.** Operations use `events`, `applications`, `profiles` — not `hackathons`, `registrations`.
6. **Single responsibility.** Each operation does exactly one thing. No bulk operations in MVP.
7. **Idempotent where expected.** Applying twice to the same event returns the existing application — no duplicate.

---

## 2. Feature Groups

Operations are organized by feature domain, not alphabetically.

| Group | Operations | MVP |
|---|---|---|
| **Authentication** | 2 | ✅ |
| **Profiles** | 3 | ✅ |
| **Events** | 3 | ✅ |
| **Applications** | 3 | ✅ |
| **Organizer** | 2 | ✅ |

---

## 3. Operation Specifications

### 3.1 Authentication

#### A-01: Sign In

| Field | Detail |
|---|---|
| **Purpose** | Authenticate user via OAuth provider |
| **Caller** | Unauthenticated user |
| **Preconditions** | None |
| **Input** | OAuth provider (`google` or `github`) |
| **Validation** | Provider must be one of `google`, `github` |
| **Success Output** | User redirected to OAuth consent screen; on return, session cookie set |
| **Failure** | `AUTH_FAILED` — provider unavailable or user denied permissions |
| **Idempotent** | No — each sign-in creates a new session |
| **Related FR** | FR-001 |
| **Related Tables** | `auth.users` |

#### A-02: Sign Out

| Field | Detail |
|---|---|
| **Purpose** | End the current session |
| **Caller** | Authenticated user |
| **Preconditions** | Valid session exists |
| **Input** | None |
| **Success Output** | Session cleared; redirect to landing |
| **Failure** | None (best-effort) |
| **Idempotent** | Yes |
| **Related FR** | FR-001 |
| **Related Tables** | — |

---

### 3.2 Profiles

#### P-01: Get My Profile

| Field | Detail |
|---|---|
| **Purpose** | Fetch the current user's profile |
| **Caller** | Authenticated user |
| **Preconditions** | Profile may or may not exist (first login) |
| **Input** | None (derived from session) |
| **Success Output** | `Profile` object with all fields or `null` if not yet created |
| **Failure** | `AUTH_REQUIRED` — no valid session |
| **Idempotent** | Yes |
| **Related FR** | FR-006 |
| **Related Tables** | `profiles` |

#### P-02: Create Profile

| Field | Detail |
|---|---|
| **Purpose** | Create profile on first login |
| **Caller** | Authenticated user, no existing profile |
| **Preconditions** | User is authenticated; profile does not exist for this `user_id` |
| **Input** | `display_name`, `college?`, `skills?`, `github_url?`, `bio?`, `looking_for_team?` |
| **Validation** | See Section 4 — Validation Rules |
| **Success Output** | Created `Profile` object |
| **Failure** | `VALIDATION_FAILED` — invalid input; `PROFILE_EXISTS` — already has profile |
| **Idempotent** | Yes — second call returns existing profile |
| **Related FR** | FR-006 |
| **Related Tables** | `profiles` |

#### P-03: Update Profile

| Field | Detail |
|---|---|
| **Purpose** | Update the current user's profile fields |
| **Caller** | Authenticated user with existing profile |
| **Preconditions** | Profile exists for this `user_id` |
| **Input** | Partial `Profile` fields (only changed values) |
| **Validation** | See Section 4 — Validation Rules |
| **Success Output** | Updated `Profile` object |
| **Failure** | `VALIDATION_FAILED` — invalid input; `NOT_FOUND` — no profile |
| **Idempotent** | Yes — same update applied twice has same result |
| **Related FR** | FR-006 |
| **Related Tables** | `profiles` |

---

### 3.3 Events

#### E-01: List Events

| Field | Detail |
|---|---|
| **Purpose** | Fetch published events for Discover screen |
| **Caller** | Authenticated user |
| **Preconditions** | Valid session |
| **Input** | `mode?` (filter: `online`, `offline`, `hybrid`); `sort_by?` (default: `start_date` ascending) |
| **Validation** | `mode` must be one of valid values if provided |
| **Success Output** | Array of `EventSummary` objects (id, title, tagline, mode, start_date, prize_pool, organizer_name) |
| **Failure** | `AUTH_REQUIRED` — no session |
| **Idempotent** | Yes |
| **Related FR** | FR-002 |
| **Related Tables** | `events` |

#### E-02: Get Event Details

| Field | Detail |
|---|---|
| **Purpose** | Fetch full event information for Event Details screen |
| **Caller** | Authenticated user |
| **Preconditions** | Event exists and is published (or user is the organizer) |
| **Input** | `event_id` (uuid) |
| **Validation** | `event_id` must be a valid UUID |
| **Success Output** | Full `Event` object with all fields + `application_status?` (if current user has applied) |
| **Failure** | `NOT_FOUND` — invalid event ID or event not published; `AUTH_REQUIRED` |
| **Idempotent** | Yes |
| **Related FR** | FR-003 |
| **Related Tables** | `events`, `applications` |

#### E-03: Create Event

| Field | Detail |
|---|---|
| **Purpose** | Organizer creates a new event |
| **Caller** | Authenticated user with `role = 'organizer'` |
| **Preconditions** | User is an organizer |
| **Input** | All required event fields: `title`, `description`, `mode`, `start_date`, `end_date`, `registration_deadline`; optional: `tagline`, `location`, `prize_pool`, `cover_image_url`, `max_participants` |
| **Validation** | See Section 4; `end_date` must be after `start_date`; `registration_deadline` must be before `start_date` |
| **Success Output** | Created `Event` object with `status: 'draft'` |
| **Failure** | `ACCESS_DENIED` — not an organizer; `VALIDATION_FAILED` — invalid input |
| **Idempotent** | No — each call creates a new event (but same input twice creates two events) |
| **Related FR** | FR-007 |
| **Related Tables** | `events` |

---

### 3.4 Applications

#### AP-01: Apply to Event

| Field | Detail |
|---|---|
| **Purpose** | Student submits an application to an event |
| **Caller** | Authenticated user with `role = 'student'` |
| **Preconditions** | Event is published; `registration_deadline` has not passed; user has not already applied |
| **Input** | `event_id` (uuid); optional `notes` |
| **Validation** | `event_id` must refer to a published event; deadline must not have passed |
| **Success Output** | Created `Application` object with `status: 'pending'` |
| **Failure** | `ACCESS_DENIED` — not a student; `APPLICATION_EXISTS` — already applied; `EVENT_CLOSED` — deadline passed or event full; `NOT_FOUND` — invalid event |
| **Idempotent** | Yes — second call returns existing application with `APPLICATION_EXISTS` error |
| **Rate Limit** | 3/min per user |
| **Related FR** | FR-004 |
| **Related Tables** | `applications`, `events` |

#### AP-02: Get My Applications

| Field | Detail |
|---|---|
| **Purpose** | Student fetches all their applications grouped by status |
| **Caller** | Authenticated user (student) |
| **Preconditions** | Valid session |
| **Input** | `status?` (filter by: `pending`, `accepted`, `rejected`, `cancelled`) |
| **Validation** | `status` must be a valid application status if provided |
| **Success Output** | Array of `Application` objects with embedded `EventSummary` |
| **Failure** | `AUTH_REQUIRED` |
| **Idempotent** | Yes |
| **Related FR** | FR-005 |
| **Related Tables** | `applications`, `events` |

#### AP-03: Cancel Application

| Field | Detail |
|---|---|
| **Purpose** | Student cancels their own pending application |
| **Caller** | Authenticated user (student) |
| **Preconditions** | Application exists, belongs to this user, and has `status: 'pending'` |
| **Input** | `application_id` (uuid) |
| **Validation** | Application must belong to caller; status must be `pending` |
| **Success Output** | Updated `Application` with `status: 'cancelled'` |
| **Failure** | `NOT_FOUND` — invalid application ID; `ACCESS_DENIED` — not the owner; `INVALID_STATE` — already accepted/rejected |
| **Idempotent** | Yes — cancelling an already cancelled application returns success |
| **Related FR** | FR-005 |
| **Related Tables** | `applications` |

---

### 3.5 Organizer

#### O-01: Update Event Status

| Field | Detail |
|---|---|
| **Purpose** | Organizer publishes, cancels, or completes an event |
| **Caller** | Authenticated user with `role = 'organizer'`, must be event owner |
| **Preconditions** | Event exists and belongs to this organizer |
| **Input** | `event_id` (uuid); `status` (`published`, `cancelled`, `completed`) |
| **Validation** | Only valid transitions: `draft → published`, `published → cancelled`, `published → completed` |
| **Success Output** | Updated `Event` with new status |
| **Failure** | `NOT_FOUND` — invalid event; `ACCESS_DENIED` — not the organizer; `INVALID_TRANSITION` — invalid status change |
| **Idempotent** | Yes — publishing an already published event is a no-op |
| **Related FR** | FR-007 |
| **Related Tables** | `events` |

#### O-02: Review Application

| Field | Detail |
|---|---|
| **Purpose** | Organizer approves or rejects an application |
| **Caller** | Authenticated user with `role = 'organizer'`, must own the event |
| **Preconditions** | Application exists, event belongs to this organizer, application status is `pending` |
| **Input** | `application_id` (uuid); `decision` (`accepted` or `rejected`) |
| **Validation** | Application must belong to an event owned by this organizer; status must be `pending` |
| **Success Output** | Updated `Application` with new status + `reviewed_by` + `reviewed_at` |
| **Failure** | `NOT_FOUND` — invalid application; `ACCESS_DENIED` — not the event owner; `INVALID_STATE` — already reviewed |
| **Idempotent** | Yes — same decision applied twice returns same result |
| **Rate Limit** | 30/min per organizer |
| **Related FR** | FR-007 |
| **Related Tables** | `applications`, `events` |

---

## 4. Validation Rules

### 4.1 Profile Fields

| Field | Rules |
|---|---|
| `display_name` | Required, 1–100 chars, trimmed |
| `college` | Optional, max 200 chars |
| `skills` | Array of strings, max 20 items, each 2–50 chars |
| `github_url` | Optional, must be valid URL (https://github.com/...) |
| `bio` | Optional, max 500 chars |
| `looking_for_team` | Boolean, default `false` |

### 4.2 Event Fields

| Field | Rules |
|---|---|
| `title` | Required, 3–200 chars |
| `tagline` | Optional, max 300 chars |
| `description` | Required, 10–5000 chars (markdown) |
| `mode` | Required, one of: `online`, `offline`, `hybrid` |
| `location` | Required if mode is `offline` or `hybrid`; max 500 chars |
| `start_date` | Required, must be in the future |
| `end_date` | Required, must be after `start_date` |
| `registration_deadline` | Required, must be before `start_date` |
| `prize_pool` | Optional, max 200 chars |
| `max_participants` | Optional, integer ≥ 1 |
| `cover_image_url` | Optional, valid URL |

### 4.3 Application Fields

| Field | Rules |
|---|---|
| `notes` | Optional, max 1000 chars |

### 4.4 General Rules

- All string inputs are trimmed before validation
- UUID parameters must be valid v4 UUIDs
- Unknown fields in input are silently ignored (not rejected)
- Null vs. undefined: both treated as "not provided" for optional fields

---

## 5. Error Catalogue

### 5.1 Error Codes

| Code | HTTP Analog | Meaning | When |
|---|---|---|---|
| `AUTH_REQUIRED` | 401 | No valid session | Operation requires authentication |
| `ACCESS_DENIED` | 403 | Wrong role or not the owner | Student tries organizer operation |
| `NOT_FOUND` | 404 | Resource does not exist | Invalid event/application ID |
| `VALIDATION_FAILED` | 422 | Input does not meet rules | Missing required field, bad format |
| `APPLICATION_EXISTS` | 409 | Duplicate application | User already applied to event |
| `EVENT_CLOSED` | 410 | Event no longer accepting | Deadline passed or event full |
| `INVALID_STATE` | 409 | Invalid status transition | Cancelling a non-pending application |
| `INVALID_TRANSITION` | 409 | Status change not allowed | Publishing an already published event |
| `PROFILE_EXISTS` | 409 | Profile already exists | Creating a profile when one exists |
| `RATE_LIMITED` | 429 | Too many requests | Exceeded rate limit |

### 5.2 Error Response Shape

Every error returns a consistent object:

```typescript
{
  code: string;       // Error code from catalogue
  message: string;    // Human-readable description
  details?: object;   // Validation errors per field (for VALIDATION_FAILED)
}
```

Example (validation failure):

```json
{
  "code": "VALIDATION_FAILED",
  "message": "Input validation failed",
  "details": {
    "title": "Title must be between 3 and 200 characters",
    "start_date": "Start date must be in the future"
  }
}
```

---

## 6. Rate Limits

| Operation | Limit | Scope | Enforcement |
|---|---|---|---|
| Apply to Event | 3 per minute | Per user | Server Action |
| Review Application | 30 per minute | Per organizer | Server Action |
| Create Event | 10 per hour | Per organizer | Server Action |
| Update Profile | 30 per hour | Per user | Server Action |
| All other reads | 60 per minute | Per user | Supabase (default) |

Rate limits are enforced server-side. Exceeded limits return `RATE_LIMITED`.

---

## 7. Type Definitions

### 7.1 Core Types

```typescript
interface Profile {
  id: string;
  user_id: string;
  role: 'student' | 'organizer';
  display_name: string;
  email: string;
  avatar_url: string | null;
  college: string | null;
  skills: string[];
  github_url: string | null;
  bio: string | null;
  looking_for_team: boolean;
  created_at: string;
  updated_at: string;
}

interface EventSummary {
  id: string;
  title: string;
  tagline: string | null;
  mode: 'online' | 'offline' | 'hybrid';
  start_date: string;
  prize_pool: string | null;
  organizer_name: string;
  status: 'published';
}

interface Event {
  id: string;
  organizer_id: string;
  title: string;
  tagline: string | null;
  description: string;
  mode: 'online' | 'offline' | 'hybrid';
  location: string | null;
  start_date: string;
  end_date: string;
  registration_deadline: string;
  prize_pool: string | null;
  cover_image_url: string | null;
  max_participants: number | null;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
  // Computed:
  application_status?: 'pending' | 'accepted' | 'rejected' | null;
}

interface Application {
  id: string;
  user_id: string;
  event_id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
  // Embedded:
  event?: EventSummary;
}
```

### 7.2 Input Types

```typescript
interface CreateProfileInput {
  display_name: string;
  college?: string;
  skills?: string[];
  github_url?: string;
  bio?: string;
  looking_for_team?: boolean;
}

interface UpdateProfileInput {
  display_name?: string;
  college?: string;
  skills?: string[];
  github_url?: string;
  bio?: string;
  looking_for_team?: boolean;
}

interface CreateEventInput {
  title: string;
  tagline?: string;
  description: string;
  mode: 'online' | 'offline' | 'hybrid';
  location?: string;
  start_date: string;
  end_date: string;
  registration_deadline: string;
  prize_pool?: string;
  cover_image_url?: string;
  max_participants?: number;
}

interface ApplyInput {
  event_id: string;
  notes?: string;
}

interface ReviewApplicationInput {
  application_id: string;
  decision: 'accepted' | 'rejected';
}

interface UpdateEventStatusInput {
  event_id: string;
  status: 'published' | 'cancelled' | 'completed';
}

interface ListEventsInput {
  mode?: 'online' | 'offline' | 'hybrid';
  sort_by?: 'start_date' | 'prize_pool';
}
```

---

## 8. Traceability

| Operation | FR | Screen | Table | Rate Limited |
|---|---|---|---|---|
| A-01 Sign In | FR-001 | S-01 | `auth.users` | No |
| A-02 Sign Out | FR-001 | S-01 | — | No |
| P-01 Get My Profile | FR-006 | S-05 | `profiles` | No |
| P-02 Create Profile | FR-006 | S-05 | `profiles` | No |
| P-03 Update Profile | FR-006 | S-05 | `profiles` | 30/h |
| E-01 List Events | FR-002 | S-02 | `events` | No |
| E-02 Get Event Details | FR-003 | S-03 | `events`, `applications` | No |
| E-03 Create Event | FR-007 | S-06 | `events` | 10/h |
| AP-01 Apply to Event | FR-004 | S-03 | `applications` | 3/min |
| AP-02 Get My Applications | FR-005 | S-04 | `applications` | No |
| AP-03 Cancel Application | FR-005 | S-04 | `applications` | No |
| O-01 Update Event Status | FR-007 | S-06 | `events` | No |
| O-02 Review Application | FR-007 | S-06 | `applications` | 30/min |

---

## 9. Future Operations (Reserved)

| Operation | Feature | Phase |
|---|---|---|
| List Teams | Team management | Phase 2 |
| Create Team | Team formation | Phase 2 |
| Join Team | Team membership | Phase 2 |
| Submit Project | Project showcase | Phase 2 |
| List Posts | Activity feed | Phase 2 |
| Create Post | Social feed | Phase 2 |
| Like Post | Engagement | Phase 2 |
| Comment on Post | Engagement | Phase 2 |
| Get Notifications | Notification center | Phase 2 |
| Send Message | Direct messaging | Phase 3 |
| List College Events | College dashboard | Phase 2 |
| List Company Challenges | Company dashboard | Phase 3 |
| AI Team Match | AI recommendations | Phase 4 |
