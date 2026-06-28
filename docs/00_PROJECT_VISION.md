# Project Vision — Nexus

**Version:** v1.0.0  
**Status:** Frozen  
**Last Updated:** 2026-06-28  
**Changelog:**
- v0.1.0 — Initial draft after product debate (DeepSeek + ChatGPT critique)
- v1.0.0 — Added Product Philosophy, Why Now, Assumptions, Design Constraints, Guiding Questions; strengthened success metrics; renamed Future State → Long-Term Vision; broadened tagline; added dependency graph

---

## 1. Purpose

Nexus exists to unify the fragmented hackathon ecosystem into a single platform. Students currently juggle 7+ tools (Devpost, Discord, LinkedIn, GitHub, Google Forms, WhatsApp, Instagram) to discover, register for, participate in, and showcase one hackathon. Nexus compresses that into one end-to-end experience.

---

## 2. The Problem

### The Fragmented Student Workflow

```
Instagram → See Poster → Google Form → Email → Discord → WhatsApp → Devpost → LinkedIn
```

Each step lives on a different platform. There is no unified profile, no portfolio that persists across events, and no way to discover opportunities passively. Students rebuild their identity for every hackathon.

### The Organizer Pain

Organizers manage events across Google Forms (applications), Discord (communication), Devpost (submissions), and Google Sheets (tracking). There is no single dashboard to oversee applicants, announcements, schedules, and results.

### The Missing Ecosystem

Colleges, companies, sponsors, mentors, and judges have no dedicated place in the existing workflow. Colleges cannot track student participation. Companies cannot discover talent. Sponsors cannot measure ROI.

---

## 3. Why Now?

The number of hackathons, coding contests, AI competitions, and innovation events has grown rapidly, but the tooling has remained fragmented. Students increasingly build public portfolios through projects rather than traditional resumes. Organizations are using innovation events as recruiting channels. Despite this shift, no platform provides an end-to-end workflow for participants and organizers.

---

## 4. Vision

**The platform where developers discover, participate in, and showcase innovation.**

Nexus becomes the default operating system for innovation events — where students discover, participate, and build portfolios; where organizers manage end-to-end; and where companies, colleges, and sponsors connect with talent.

---

## 5. Mission

Compress the student hackathon workflow from 7 platforms into one seamless loop:

```
Discover → Register → Participate → Submit → Results → Portfolio
```

---

## 6. Product Philosophy

Nexus is a workflow platform before it is a social platform.

Students visit Nexus to accomplish tasks — not to consume content. Every screen should reduce friction in discovering, joining, participating in, and completing an event. Social interactions exist only when they improve that workflow.

---

## 7. Users (6 types, 2 for MVP)

| Role | MVP | Future |
|---|---|---|
| **Student** | ✅ | — |
| **Organizer** | ✅ | — |
| College | ❌ | Phase 2 |
| Company | ❌ | Phase 3 |
| Mentor / Judge | ❌ | Phase 3 |
| Sponsor | ❌ | Phase 4 |

---

## 8. Core Principles

1. **Workflow before social.** Utility is the foundation. Social features amplify, not replace.
2. **Events-first, feed-second.** The default view is a task-oriented event grid, not an infinite scroll.
3. **Generic domain model.** Use `Event`, `Application`, `Participant` — not `Hackathon`, `HackathonApplication` — to support workshops, coding contests, bootcamps, and startup weekends.
4. **Mobile-first.** Students access the platform primarily on phones.
5. **Minimize clicks.** Every flow should achieve its goal in 3 actions or fewer.
6. **Ship small, iterate fast.** A lean MVP validated with real users beats a feature-rich platform nobody uses.
7. **Launch via one real event.** Success means one college hackathon runs entirely on Nexus — not 1000 sign-ups.
8. **Design for accessibility by default.**

---

## 9. Non-Goals (What Nexus Is NOT)

- A social network competing with Instagram or LinkedIn
- A Discord replacement for real-time chat
- A generic job board
- A code execution or judging platform
- A payment processing system

---

## 10. Design Constraints (MVP)

- Two user roles only: Student and Organizer
- Six MVP screens only
- No custom backend services — Supabase as the primary backend
- Mobile-first responsive web (no native app)
- No AI features in MVP
- No real-time messaging

---

## 11. Guiding Questions

Every feature proposal must answer:

1. Does this help a student **discover** an event?
2. Does this help a student **join** an event?
3. Does this help a student **complete** an event?
4. Does this **reduce organizer** workload?
5. **Can this wait** until after the MVP?

If the answer to all five is "no," the feature doesn't belong in the MVP.

---

## 12. Core Assumptions (To Validate After Launch)

- Students are willing to create a profile if it is required for event registration.
- Organizers are willing to replace Google Forms for at least one event.
- Students prefer a centralized event platform over fragmented tools.
- Event discovery is a larger pain point than social networking.

---

## 13. MVP Success Criteria

| Metric | Target |
|---|---|
| Students registered on platform | 80+ |
| Teams formed | 20+ |
| Projects submitted | 40+ |
| Organizers actively using dashboard | 2+ |
| Application-to-completion rate | >50% |
| Event registration completion rate | >90% |
| Event application success rate | >95% |
| Average event discovery time | <30 seconds |
| Application flow | ≤3 clicks from event page |
| Organizer event creation time | <10 minutes |
| Student profile completion | >70% |

These are measured after the first real hackathon runs entirely on Nexus.

---

## 14. Long-Term Vision (3-Year Horizon)

Nexus evolves from an event management platform into a full ecosystem:

- **College Dashboards** — participation analytics, leaderboards, certificate management
- **Company Challenges** — sponsored problem statements with prize pools
- **AI Team Matching** — data-driven teammate recommendations
- **AI Resume Review** — profile strength scoring
- **AI Project Judging** — assistive evaluation
- **Sponsor Marketplace** — brand visibility + recruitment pipeline
- **Hiring & Recruitment** — company-to-student direct outreach
- **Mobile App** — native iOS and Android

---

## 15. Document Dependency Graph

```
00_PROJECT_VISION
        │
        ▼
01_PRODUCT_REQUIREMENTS
        │
        ▼
02_DATABASE_DESIGN
        │
        ├─────────────┐
        ▼             ▼
03_SYSTEM_ARCHITECTURE
04_API_SPECIFICATION
        │
        ▼
05_UI_UX_GUIDELINES
        │
        ▼
06_WIREFRAMES
        │
        ▼
07_DEVELOPMENT_ROADMAP
```
