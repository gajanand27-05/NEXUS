# Database Design — Nexus

**Version:** v1.1.0  
**Status:** Draft  
**Last Updated:** 2026-06-28  
**Changelog:**
- v1.0.0 — Initial schema: 3 MVP tables + 7 future tables with relationships, RLS, indexes
- v1.1.0 — Added Domain Dictionary, Entity List, expanded RLS Strategy, dedicated Index Strategy; enriched table specs with Purpose + Future Expansion; restructured for clarity

---

## 1. Design Principles

1. **Normalize where practical.** Avoid premature denormalization; introduce it only when query profiling proves it necessary.
2. **UUID primary keys.** Supabase-native, safer for RLS (non-sequential), prevents ID enumeration attacks.
3. **Generic domain naming.** Use `events`, `applications` — not `hackathons`, `hackathon_applications` — to support workshops, coding contests, bootcamps, and startup weekends without renaming.
4. **Audit timestamps everywhere.** Every table has `created_at` and `updated_at` with `DEFAULT now()`.
5. **Forward-compatible schema.** Nullable foreign key columns for future entities (`college_id`, `company_id`) are reserved now to avoid expensive migrations later.
6. **Self-documenting columns.** Column names are explicit (`registration_deadline` not `reg_end`); CHECK constraints document valid values inline.
7. **Soft deletes where appropriate.** Status fields (`active`, `archived`) preferred over hard `DELETE` for recoverability.

---

## 2. Domain Dictionary

| Term | Definition |
|---|---|
| **User** | Authenticated account from Supabase Auth (`auth.users`). |
| **Profile** | Public-facing identity linked 1:1 to a User. Contains role, skills, college, GitHub. |
| **Student** | User with `role = 'student'`. Discovers events, applies, builds portfolio. |
| **Organizer** | User with `role = 'organizer''. Creates and manages events. |
| **Event** | Any innovation activity: hackathon, workshop, coding contest, tech talk, bootcamp, startup weekend, or open-source sprint. |
| **Application** | A Student's request to join an Event. Carries status (pending/accepted/rejected). |
| **Participant** | A Student whose Application status is `accepted`. |
| **Passport** | The branded name for the Student Profile screen in the UI. |

---

## 3. Entity List

| # | Entity | MVP | Phase 2 | Phase 3 | Phase 4 |
|---|---|---|---|---|---|
| 1 | `profiles` | ✅ | — | — | — |
| 2 | `events` | ✅ | — | — | — |
| 3 | `applications` | ✅ | — | — | — |
| 4 | `colleges` | — | ✅ | — | — |
| 5 | `teams` | — | ✅ | — | — |
| 6 | `team_members` | — | ✅ | — | — |
| 7 | `projects` | — | ✅ | — | — |
| 8 | `posts` | — | ✅ | — | — |
| 9 | `notifications` | — | ✅ | — | — |
| 10 | `companies` | — | — | ✅ | — |
| 11 | `sponsorships` | — | — | — | ✅ |
| 12 | `payments` | — | — | — | ✅ |

---

## 4. Entity Relationship Diagram

```
users (Supabase Auth)
    │
    ├──< profiles (1:1)
    │
    ├──< events (1:N, organizer)
    │
    ├──< applications (1:N, applicant)
    │
    └──< notifications (1:N) [future]

events
    │
    ├──> colleges (N:1, nullable) [future]
    │
    ├──> companies (N:1, nullable) [future]
    │
    ├──< applications (1:N)
    │
    └──< teams (1:N) [future]

applications
    │
    └──> events (N:1)

teams [future]
    │
    ├──> events (N:1)
    │
    └──< team_members (1:N)

projects [future]
    │
    └──> teams (N:1)

posts [future]
    │
    ├──> users (N:1)
    │
    └──> events (N:1, nullable)
```

---

## 5. MVP Tables (Build Now)

### 5.1 `profiles`

**Purpose:** Stores public-facing identity for every authenticated user. Created on first login.

**Future Expansion:** Link `college` free-text → FK to `colleges(id)`; add public visibility toggle; add `reputation_score`.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK, defaults `gen_random_uuid()` | |
| `user_id` | `uuid` | NOT NULL, UNIQUE, FK → `auth.users(id)` | Links to Supabase Auth |
| `role` | `text` | NOT NULL, CHECK (`student`, `organizer`) | Two roles only in MVP |
| `display_name` | `text` | NOT NULL | |
| `email` | `text` | NOT NULL | Synced from OAuth |
| `avatar_url` | `text` | NULLABLE | From OAuth provider |
| `college` | `text` | NULLABLE | Free-text in MVP; FK to `colleges` in Phase 2 |
| `skills` | `text[]` | DEFAULT `'{}'` | Array of strings |
| `github_url` | `text` | NULLABLE | |
| `bio` | `text` | NULLABLE | |
| `looking_for_team` | `boolean` | DEFAULT `false` | Toggle for team-finding badge |
| `created_at` | `timestamptz` | DEFAULT `now()` | |
| `updated_at` | `timestamptz` | DEFAULT `now()` | |

**Indexes:**
- `idx_profiles_user_id` on `user_id` (unique lookup)
- `idx_profiles_role` on `role` (filter students vs. organizers)
- `idx_profiles_looking_for_team` on `looking_for_team` (future: find teammates)

**Relationships:**
- 1:1 with `auth.users` via `user_id`
- 1:N with `events` via `organizer_id`
- 1:N with `applications` via `user_id`

**RLS:**
| Operation | Rule |
|---|---|
| `SELECT` | Own profile only; future: public profiles |
| `INSERT` | `user_id = auth.uid()` (self-registration) |
| `UPDATE` | `user_id = auth.uid()` (self-edit) |
| `DELETE` | None in MVP (admin only in future) |

---

### 5.2 `events`

**Purpose:** Stores all innovation events created by organizers. Consumed by students via the Discover screen.

**Future Expansion:** Tracks, mentors, sponsors, resources, schedule sessions, live leaderboard, `college_id`/`company_id` FK activation.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK, defaults `gen_random_uuid()` | |
| `organizer_id` | `uuid` | NOT NULL, FK → `profiles(user_id)` | Creator |
| `title` | `text` | NOT NULL | |
| `tagline` | `text` | NULLABLE | Short description (1 line) |
| `description` | `text` | NOT NULL | Full markdown |
| `mode` | `text` | NOT NULL, CHECK (`online`, `offline`, `hybrid`) | |
| `location` | `text` | NULLABLE | Physical address for offline/hybrid |
| `start_date` | `timestamptz` | NOT NULL | |
| `end_date` | `timestamptz` | NOT NULL | |
| `registration_deadline` | `timestamptz` | NOT NULL | After this, applications close |
| `prize_pool` | `text` | NULLABLE | e.g., "₹2,00,000" |
| `cover_image_url` | `text` | NULLABLE | Banner |
| `max_participants` | `integer` | NULLABLE | Null = unlimited |
| `status` | `text` | NOT NULL, DEFAULT `'draft'`, CHECK (`draft`, `published`, `cancelled`, `completed`) | |
| `college_id` | `uuid` | NULLABLE, FK → `colleges(id)` | Reserved for Phase 2 |
| `company_id` | `uuid` | NULLABLE, FK → `companies(id)` | Reserved for Phase 3 |
| `created_at` | `timestamptz` | DEFAULT `now()` | |
| `updated_at` | `timestamptz` | DEFAULT `now()` | |

**Indexes:**
- `idx_events_organizer` on `organizer_id`
- `idx_events_status` on `status`
- `idx_events_start_date` on `start_date` (sort Discover by upcoming)
- `idx_events_mode` on `mode` (filter online/offline/hybrid)

**Relationships:**
- N:1 with `profiles` via `organizer_id`
- 1:N with `applications` via `event_id`
- 1:N with `teams` (future)

**RLS:**
| Operation | Rule |
|---|---|
| `SELECT` | Published → all auth users; Draft → organizer only |
| `INSERT` | `role = 'organizer'` AND `auth.uid() = organizer_id` |
| `UPDATE` | `organizer_id = auth.uid()` |
| `DELETE` | `organizer_id = auth.uid()` |

---

### 5.3 `applications`

**Purpose:** Captures a student's request to join an event. Organizers review and update status.

**Future Expansion:** Custom application questions, team-based applications, auto-accept for public events, submission links.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK, defaults `gen_random_uuid()` | |
| `user_id` | `uuid` | NOT NULL, FK → `profiles(user_id)` | Applicant |
| `event_id` | `uuid` | NOT NULL, FK → `events(id)` | Target event |
| `status` | `text` | NOT NULL, DEFAULT `'pending'`, CHECK (`pending`, `accepted`, `rejected`, `cancelled`) | |
| `notes` | `text` | NULLABLE | Optional message |
| `reviewed_by` | `uuid` | NULLABLE, FK → `profiles(user_id)` | Organizer who reviewed |
| `reviewed_at` | `timestamptz` | NULLABLE | |
| `created_at` | `timestamptz` | DEFAULT `now()` | |
| `updated_at` | `timestamptz` | DEFAULT `now()` | |

**Indexes:**
- `idx_applications_user` on `user_id`
- `idx_applications_event` on `event_id`
- `idx_applications_status` on `status`
- `idx_applications_user_event` UNIQUE on `(user_id, event_id)` — one application per event per user

**Relationships:**
- N:1 with `profiles` via `user_id`
- N:1 with `events` via `event_id`

**RLS:**
| Operation | Student Rule | Organizer Rule |
|---|---|---|
| `SELECT` | Own applications only | Applications to own events |
| `INSERT` | `role = 'student'`, event must be published | Denied |
| `UPDATE` | Cancel own `pending` → `cancelled` | `pending` → `accepted`/`rejected` |
| `DELETE` | None | None |

---

## 6. Row-Level Security Strategy

### 6.1 Per-Role Permissions Matrix

| Action | `profiles` | `events` | `applications` |
|---|---|---|---|
| **SELECT (Student)** | Own only | Published only | Own only |
| **SELECT (Organizer)** | Own only | Own + Published | For own events |
| **INSERT (Student)** | Own profile only | Denied | Self to published events |
| **INSERT (Organizer)** | Own profile only | Own events | Denied |
| **UPDATE (Student)** | Own profile only | Denied | Cancel own `pending` |
| **UPDATE (Organizer)** | Own profile only | Own events | Approve/reject for own events |
| **DELETE** | None | Own events only | None |

### 6.2 Policy Implementation Notes

- All policies reference `auth.uid()` to identify the current user.
- Role is determined by: `auth.uid() IN (SELECT user_id FROM profiles WHERE role = 'organizer')`
- Event visibility uses: `status = 'published' OR organizer_id = auth.uid()`
- Application visibility for organizers uses subquery: `event_id IN (SELECT id FROM events WHERE organizer_id = auth.uid())`

### 6.3 Security Edge Cases

| Scenario | Handling |
|---|---|
| Unauthenticated request | No access — Supabase blocks by default |
| Student tries to create event | RLS `INSERT` policy on `events` rejects (role check) |
| Organizer tries to apply to event | RLS `INSERT` policy on `applications` rejects (role check) |
| User deleted from auth | Cascading FK handles orphaned profile? No — use `ON DELETE SET NULL` for non-critical FKs, `ON DELETE CASCADE` for owned data |
| Application status tampering | Only allowed transitions: Student: `pending → cancelled`; Organizer: `pending → accepted/rejected` |

---

## 7. Index Strategy

### 7.1 Query Patterns & Coverage

| Query | Frequency | Index Used |
|---|---|---|
| Find events by organizer | High | `idx_events_organizer` |
| Sort events by date (Discover) | Very High | `idx_events_start_date` |
| Filter events by mode | Medium (future) | `idx_events_mode` |
| Find events by status | High | `idx_events_status` |
| Lookup profile by user ID | Very High | `idx_profiles_user_id` |
| Filter users by role | Medium | `idx_profiles_role` |
| Find teammates (future) | Low → Medium | `idx_profiles_looking_for_team` |
| Find applications by user | High | `idx_applications_user` |
| Find applications by event | High | `idx_applications_event` |
| Check duplicate application | Very High | `idx_applications_user_event` (unique) |
| Filter applications by status | Medium | `idx_applications_status` |

### 7.2 Index Rules

- No indexes on low-cardinality boolean columns unless specifically queried
- Composite indexes before separate single-column indexes where both columns are used together
- Avoid over-indexing: 3–5 indexes per MVP table maximum
- Monitor pg_stat_user_indexes after launch for unused indexes

---

## 8. Enums

| Enum | Values | Used By |
|---|---|---|
| `user_role` | `student`, `organizer` | `profiles.role` |
| `event_mode` | `online`, `offline`, `hybrid` | `events.mode` |
| `event_status` | `draft`, `published`, `cancelled`, `completed` | `events.status` |
| `application_status` | `pending`, `accepted`, `rejected`, `cancelled` | `applications.status` |

---

## 9. Future Tables (Schema Reserved, Not Built)

These tables are designed but will not be created until their target phase.

### 9.1 `colleges` (Phase 2)

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `name` | `text` | |
| `location` | `text` | |
| `domain` | `text` | e.g., `knsit.ac.in` — for email validation |
| `created_at` | `timestamptz` | |

**Relationship:** `events.college_id` → `colleges.id` (nullable FK, already reserved)

### 9.2 `teams` (Phase 2)

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `event_id` | `uuid` | FK → `events(id)` |
| `name` | `text` | |
| `leader_id` | `uuid` | FK → `profiles(user_id)` |
| `created_at` | `timestamptz` | |

### 9.3 `team_members` (Phase 2)

| Column | Type | Notes |
|---|---|---|
| `team_id` | `uuid` | FK → `teams(id)` |
| `user_id` | `uuid` | FK → `profiles(user_id)` |
| `role` | `text` | `leader`, `member` |
| `joined_at` | `timestamptz` | |

### 9.4 `projects` (Phase 2)

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `team_id` | `uuid` | FK → `teams(id)` |
| `title` | `text` | |
| `description` | `text` | |
| `github_url` | `text` | |
| `demo_url` | `text` | |
| `submitted_at` | `timestamptz` | |

### 9.5 `posts` (Phase 2 — Activity Feed)

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `user_id` | `uuid` | FK → `profiles(user_id)` |
| `event_id` | `uuid` | NULLABLE, FK → `events(id)` |
| `type` | `text` | `event_won`, `team_formed`, `project_demo`, `announcement` |
| `content` | `text` | |
| `created_at` | `timestamptz` | |

### 9.6 `notifications` (Phase 2)

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `user_id` | `uuid` | FK → `profiles(user_id)` |
| `type` | `text` | `application_accepted`, `application_rejected`, `event_reminder` |
| `read` | `boolean` | DEFAULT `false` |
| `payload` | `jsonb` | Flexible data (event_id, etc.) |
| `created_at` | `timestamptz` | |

### 9.7 `companies` (Phase 3)

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `name` | `text` | |
| `website` | `text` | |
| `description` | `text` | |
| `logo_url` | `text` | |
| `created_at` | `timestamptz` | |

**Relationship:** `events.company_id` → `companies.id` (nullable FK, already reserved)

---

## 10. Migration Strategy

| Phase | Changes |
|---|---|
| **Initial** | Create `profiles`, `events`, `applications` + indexes + RLS policies |
| **Phase 2** | Add `colleges`, `teams`, `team_members`, `projects`, `posts`, `notifications`; activate `college_id` FK on `events` and `profiles` |
| **Phase 3** | Add `companies`; activate `company_id` FK on `events`; add post types for company challenges |
| **Phase 4** | Add `sponsorships`, `payments`; add subscription/premium tables |

---

## 11. Key Design Decisions

| Decision | Rationale |
|---|---|
| `uuid` PKs instead of `serial` | Supabase-native, safer for RLS, prevents ID enumeration |
| `text[]` for skills vs. join table | Simpler for MVP; revisit if skills need search/filter at scale |
| Free-text `college` in MVP | Avoids seeding a colleges table before partnerships exist |
| Nullable `college_id`/`company_id` on events | Forward-compatible without breaking migration |
| `applications` as standalone table (not a join table) | Carries metadata (status, notes, review timestamps) that a simple join table cannot |
| CHECK constraints over enums | More portable; Supabase supports both; easier to change |
| `organizer_id` FK to `profiles(user_id)` not `auth.users(id)` | Profiles contain role; single source of truth for authorization |
| No hard deletes in MVP | Status fields (`cancelled`, `archived`) keep data recoverable and RLS predictable |
| `applications` FK to `profiles(user_id)` not `auth.users(id)` | Consistent with all other entity FKs; avoids mixing auth and business layers |
