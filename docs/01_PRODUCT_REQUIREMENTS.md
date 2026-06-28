# Product Requirements Document — Nexus

**Version:** v1.0.1  
**Status:** Draft  
**Last Updated:** 2026-06-28  
**Changelog:**
- v1.0.0 — Initial PRD covering 7 functional requirements, 6 screens, personas, journeys, metrics
- v1.0.1 — Added acceptance criteria to all FRs; added Requirements Traceability Matrix

---

## 1. Introduction

### 1.1 Purpose
This document defines the product requirements for Nexus MVP — a platform that unifies the hackathon ecosystem into one end-to-end workflow for students and organizers.

### 1.2 Scope
The MVP covers two user roles (Student, Organizer) across six screens. No social features, messaging, AI, teams, or additional roles are included.

### 1.3 Goals
- Compress the student hackathon workflow from 7 platforms into one
- Give organizers a single dashboard to create events and manage applicants
- Validate that students will use a centralized platform for event discovery and registration

### 1.4 Non-Goals (MVP)
- Social feed, likes, comments
- Real-time messaging or chat
- Team formation and management
- AI-powered features (matching, resume review, judging)
- Company, college, sponsor, mentor, or judge dashboards
- Reputation scores or leaderboards
- Payment processing
- Native mobile apps

---

## 2. Personas

### 2.1 Student — Ananya

| Attribute | Detail |
|---|---|
| **Name** | Ananya Sharma |
| **Age** | 20 |
| **College** | KNS Institute of Technology |
| **Year** | 3rd Year CSE |
| **Goals** | Find hackathons, build portfolio, network, win prizes |
| **Pain points** | Misses events because they're advertised on scattered platforms; has to fill Google Forms repeatedly; no unified profile to showcase participation |
| **Device** | Mobile-first (Android) |
| **Technical level** | Comfortable with GitHub, familiar with Devpost |

### 2.2 Organizer — Ravi

| Attribute | Detail |
|---|---|
| **Name** | Ravi Kumar |
| **Role** | Tech Club Coordinator |
| **Goals** | Organize hackathons, manage applications, communicate with participants |
| **Pain points** | Currently using Google Forms + Discord + Sheets; no single view of applicants; manual approval workflow |
| **Device** | Laptop + Mobile |

---

## 3. User Journeys

### 3.1 Student Journey

```
Landing → Google Login → Complete Passport → Discover Events
    → Open Event → Apply → Application Submitted → My Events (track status) → Accepted
```

### 3.2 Organizer Journey

```
Landing → Google Login → Organizer Dashboard → Create Event
    → Publish → Receive Applications → Review Applicants → Approve/Reject → Event Runs
```

---

## 4. Design Principles

1. **Workflow before social.** Every screen serves a task.
2. **Events-first, feed-second.** The default view is an event grid.
3. **Minimize clicks.** Every flow achieves its goal in 3 actions or fewer.
4. **Mobile-first.** All screens are designed for phone-first, then desktop.
5. **Design for accessibility.** Adequate contrast, readable fonts, keyboard navigation.

---

## 5. Functional Requirements

### FR-001: Authentication

| Field | Detail |
|---|---|
| **Description** | Users sign up and sign in using Google or GitHub OAuth |
| **Trigger** | User lands on Nexus and is not authenticated |
| **Precondition** | None |
| **Postcondition** | User is authenticated; Student or Organizer session is created |
| **Success** | User completes auth in <10 seconds |
| **Edge Cases** | OAuth provider down, user denies permissions, duplicate email |
| **Acceptance Criteria** | ✓ Sign in with Google OAuth<br/>✓ Sign in with GitHub OAuth<br/>✓ First login → Passport creation<br/>✓ Returning user → Discover<br/>✓ OAuth failure → error + retry<br/>✓ Loading state during redirect<br/>✓ Works on mobile (touch targets ≥ 44px) |

### FR-002: Discover Events

| Field | Detail |
|---|---|
| **Description** | Authenticated users see a browsable grid/list of upcoming events |
| **Trigger** | User navigates to Discover tab |
| **Precondition** | User is authenticated |
| **Postcondition** | User sees events sorted by date (upcoming first) |
| **Success** | User finds a relevant event in <30 seconds |
| **Edge Cases** | No events exist (empty state with CTA), network error, stale data |
| **Future** | Search, filters (mode, date, prize), bookmarks, recommendations |
| **Acceptance Criteria** | ✓ Events display in grid/list sorted by date<br/>✓ Empty state with CTA when no events<br/>✓ Loading skeleton while fetching<br/>✓ Error state with retry on failure<br/>✓ Works on mobile without horizontal scrolling |

### FR-003: Event Details

| Field | Detail |
|---|---|
| **Description** | Users view full details of an event: description, timeline, prizes, mode, organizer |
| **Trigger** | User taps/clicks an event card from Discover |
| **Precondition** | Event exists and is published |
| **Postcondition** | User sees all event information and an Apply button (if open) |
| **Success** | Event page loads in <2 seconds |
| **Edge Cases** | Event is full, event registration closed, event cancelled |
| **Future** | Tracks, mentors, sponsors, resources, announcements, live chat, leaderboard |
| **Acceptance Criteria** | ✓ All event fields display correctly<br/>✓ "Apply" visible only if accepting applications<br/>✓ "Applied" shown if user has applied<br/>✓ "Closed" shown if registration ended<br/>✓ Event not found → error handled gracefully<br/>✓ Page loads in <2 seconds |

### FR-004: Apply to Event

| Field | Detail |
|---|---|
| **Description** | Authenticated students submit an application to an event |
| **Trigger** | User clicks "Apply" on Event Details page |
| **Precondition** | User is authenticated, event is accepting applications, user has not already applied |
| **Postcondition** | Application is created with status `pending`; user sees confirmation |
| **Success** | Application submitted in ≤3 clicks from event page |
| **Edge Cases** | User already applied (show status), event registration closed, user profile incomplete |
| **Future** | Custom application questions, team applications |
| **Acceptance Criteria** | ✓ Application submits in ≤3 clicks from event page<br/>✓ Confirmation shown after submission<br/>✓ Duplicate application prevented (show existing status)<br/>✓ Profile incomplete → prompt before apply<br/>✓ Loading state during submission<br/>✓ Error state with retry on failure |

### FR-005: My Events

| Field | Detail |
|---|---|
| **Description** | Students see all their events grouped by status: pending, accepted, rejected, completed |
| **Trigger** | User navigates to My Events tab |
| **Precondition** | User is authenticated and has applied to at least one event |
| **Postcondition** | User sees their application statuses at a glance |
| **Success** | User determines application status in <5 seconds |
| **Edge Cases** | No applications yet (empty state), event deleted by organizer |
| **Future** | Certificates, submission links, announcements feed |
| **Acceptance Criteria** | ✓ Events grouped by status tabs (Pending/Accepted/Rejected/Completed)<br/>✓ Each card shows status badge<br/>✓ Empty state per tab when no events<br/>✓ Loading skeleton while fetching<br/>✓ Error state with retry<br/>✓ Status updates reflected on refresh |

### FR-006: Developer Passport

| Field | Detail |
|---|---|
| **Description** | Student profile displaying name, college, skills, GitHub, bio, and "Looking for Team" toggle |
| **Trigger** | User navigates to Passport tab or creates it on first login |
| **Precondition** | User is authenticated |
| **Postcondition** | Profile is saved and visible to the student (and later, publicly) |
| **Success** | Profile completion rate >70% among registered users |
| **Edge Cases** | No GitHub linked, no skills added (still valid, partial profile) |
| **Future** | Past hackathons, certificates, win history, reputation score, portfolio projects, public visibility |
| **Acceptance Criteria** | ✓ All fields editable and savable<br/>✓ Skills input as tags (add/remove)<br/>✓ "Looking for Team" toggle saves immediately<br/>✓ Partial saves allowed (not all required)<br/>✓ GitHub link validated as URL<br/>✓ First login redirects here before Discover<br/>✓ Error state with retry on save failure |

### FR-007: Organizer Dashboard

| Field | Detail |
|---|---|
| **Description** | Organizers create events, view applicants, and approve/reject applications |
| **Trigger** | User with organizer role logs in and accesses dashboard |
| **Precondition** | User has organizer role |
| **Postcondition** | Organizer can manage events and applicants from one place |
| **Success** | Organizer reviews and updates an application in <1 minute; creates event in <10 minutes |
| **Edge Cases** | No events created yet (empty state with CTA), no applicants yet, editing a published event |
| **Future** | Announcements, schedule management, certificates, judge/mentor assignment, live leaderboard |
| **Acceptance Criteria** | ✓ Create event with all required fields<br/>✓ Created event appears in organizer's list<br/>✓ Published events visible in Discover<br/>✓ Draft events visible only to organizer<br/>✓ View applicants per event<br/>✓ Approve/reject applications<br/>✓ Empty state when no events or no applicants<br/>✓ Works on mobile and desktop |

---

## 6. Screen Specifications

### S-01: Landing / Auth

| Field | Detail |
|---|---|
| **Purpose** | Authenticate users and route them by role |
| **Elements** | Logo, tagline, Google Sign-In button, GitHub Sign-In button |
| **Loading** | Centered spinner while OAuth redirects |
| **Empty** | N/A |
| **Error** | Error message if OAuth fails; retry option |
| **Edge** | Returning user skips to dashboard; first-time user prompted to complete Passport |

### S-02: Discover Events

| Field | Detail |
|---|---|
| **Purpose** | Browse and find upcoming events |
| **Elements** | Event cards (title, date, mode, prize, organizer name), scrollable grid |
| **Loading** | Skeleton cards (3-4 placeholders) |
| **Empty** | "No events yet" illustration + "Be the first organizer" CTA |
| **Error** | "Could not load events. Pull to refresh." |
| **Edge** | User has no internet — show cached/offline state if available |

### S-03: Event Details

| Field | Detail |
|---|---|
| **Purpose** | View full event information and apply |
| **Elements** | Title, description, timeline, mode (online/offline/hybrid), location, prize pool, organizer info, Apply/Applied button |
| **Loading** | Skeleton layout matching card structure |
| **Empty** | N/A (event must exist to reach this screen) |
| **Error** | "Event not found" if deleted or invalid ID |
| **Edge** | Registration closed → button shows "Closed" not "Apply"; already applied → shows "Applied" with status |

### S-04: My Events

| Field | Detail |
|---|---|
| **Purpose** | Track applications and participation |
| **Elements** | Tabbed view (Pending, Accepted, Rejected, Completed), each tab shows event cards with status badge |
| **Loading** | Skeleton list |
| **Empty** | "No applications yet. Discover events to apply." + link to Discover |
| **Error** | "Could not load your events. Try again." |
| **Edge** | Application status changes (polling or refresh-to-update) |

### S-05: Developer Passport

| Field | Detail |
|---|---|
| **Purpose** | Create and edit personal profile |
| **Elements** | Avatar (initials), name, email (read-only), college, skills (tags), GitHub link, bio, "Looking for Team" toggle, Save button |
| **Loading** | Skeleton profile card |
| **Empty** | Fresh account — empty fields with placeholder text |
| **Error** | "Could not save profile. Check your connection." |
| **Edge** | First login redirects here before Discover; partial saves allowed |

### S-06: Organizer Dashboard

| Field | Detail |
|---|---|
| **Purpose** | Create and manage events and applicants |
| **Elements** | "Create Event" button, My Events list (published + draft), each event shows applicant count, status |
| **Loading** | Skeleton list |
| **Empty** | "No events yet. Create your first event." + CTA |
| **Error** | "Could not load dashboard. Try again." |
| **Edge** | Draft events visible only to organizer; published events visible in Discover |

---

## 7. Non-Functional Requirements

### 7.1 Performance
- Event Discovery page loads initial data in <2 seconds
- Event Details page renders in <2 seconds
- Application submission completes in <3 seconds
- All API responses under 500ms (p95)

### 7.2 Security
- All routes behind Supabase RLS policies
- Authentication via Google/GitHub OAuth only
- No client-side secrets
- Organizer-only endpoints protected by role check

### 7.3 Accessibility
- All interactive elements keyboard-navigable
- Color contrast ratio ≥ 4.5:1 for text
- Screen reader labels on all form inputs
- Focus indicators visible on all interactive elements

### 7.4 Mobile Responsiveness
- All screens functional at 320px width and above
- Touch targets ≥ 44px
- No horizontal scrolling on mobile
- Bottom tab navigation for mobile (Discover, My Events, Passport)

### 7.5 Reliability
- Graceful degradation when Supabase is unreachable
- Form state preserved on navigation (no accidental data loss)
- Optimistic UI for application submission with rollback on failure

---

## 8. Success Metrics

| Feature | Metric | Target |
|---|---|---|
| FR-001: Authentication | Auth completion rate | >90% |
| FR-002: Discover Events | Time to find relevant event | <30 seconds |
| FR-003: Event Details | Page load time | <2 seconds |
| FR-004: Apply to Event | Clicks from event page to submission | ≤3 clicks |
| FR-005: My Events | Time to determine application status | <5 seconds |
| FR-006: Developer Passport | Profile completion rate | >70% |
| FR-007: Organizer Dashboard | Event creation time | <10 minutes |
| FR-007: Organizer Dashboard | Application review time | <1 minute per applicant |

---

## 9. Requirements Traceability Matrix

| Requirement | Screen | Database Table | API Endpoint | Status |
|---|---|---|---|---|
| FR-001: Authentication | S-01 Landing/Auth | `users` | Supabase Auth | Planned |
| FR-002: Discover Events | S-02 Discover | `events` | `GET /events` | Planned |
| FR-003: Event Details | S-03 Event Details | `events` | `GET /events/:id` | Planned |
| FR-004: Apply to Event | S-03 Event Details | `applications` | `POST /applications` | Planned |
| FR-005: My Events | S-04 My Events | `applications` | `GET /me/events` | Planned |
| FR-006: Developer Passport | S-05 Passport | `profiles` | `PATCH /profile` | Planned |
| FR-007: Organizer Dashboard | S-06 Org Dashboard | `events`, `applications` | CRUD operations | Planned |

---

## 10. Future Considerations

These features are explicitly deferred and will be addressed in subsequent phases:

| Feature | Target Phase | Dependency |
|---|---|---|
| Social feed (activity-based) | Phase 2 | Sufficient event activity |
| Comments & likes | Phase 2 | Social feed |
| Team formation | Phase 2 | User base |
| Project showcase | Phase 2 | Completed events |
| College dashboard | Phase 2 | College partnerships |
| Real-time messaging | Phase 3 | Team formation |
| AI team matching | Phase 3 | Profile data + user base |
| Company challenges | Phase 3 | Company partnerships |
| AI resume review | Phase 4 | Training data |
| Sponsor marketplace | Phase 4 | Active user base |
| Mobile app (native) | Phase 4 | Validated web product |
