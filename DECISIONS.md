# Product Decisions — Nexus

A log of significant product decisions, the reasoning behind them, and their status. Lighter weight than ADRs — captures product (not architecture) choices.

---

## 2026-06-28

### Events-first, not social-first

**Decision:** The default view is an event grid (Discover), not an activity feed. The feed is deferred to Phase 2.

**Reason:** Students come to accomplish tasks (find event → apply), not to browse content. An event grid trains users to take action; a feed trains them to consume. The workflow should be utility-first, engagement-second.

**Alternatives considered:** Feed-first (Instagram-style), Feed + Events hybrid

**Status:** Accepted

---

### Workflow platform, not social network

**Decision:** Position Nexus as a workflow platform for innovation events, not a social network for developers.

**Reason:** "Social network for hackathons" creates expectations of infinite scroll, likes, comments, and DMs. "Workflow platform" communicates utility. The social layer is an accelerator, not the foundation.

**Alternatives considered:** Social network positioning, "Devpost + Discord + LinkedIn"

**Status:** Accepted

---

### Generic domain model (Event, not Hackathon)

**Decision:** Use generic terms (Event, Application, Participant) to support future event types.

**Reason:** Workshops, coding contests, tech talks, startup weekends, bootcamps, and open-source sprints should all be representable without schema changes or renaming.

**Alternatives considered:** Hackathon-specific naming, hybrid approach

**Status:** Accepted

---

### MVP: 2 user types only

**Decision:** Ship with Student and Organizer only. Defer College, Company, Mentor, Judge, Sponsor to later phases.

**Reason:** Each additional role adds RLS complexity, UI surface area, and onboarding friction. Validate the core workflow with two roles first.

**Alternatives considered:** 6 roles (full vision), 3 roles (Student + Organizer + College)

**Status:** Accepted

---

### Launch via one college hackathon

**Decision:** Do not launch to the open internet. Instead, partner with one college tech club to run one real hackathon on Nexus.

**Reason:** 80 real participants > 1,000 vanity sign-ups. Running a single event end-to-end validates the workflow, surfaces bugs, and generates testimonials.

**Alternatives considered:** Public launch, beta waitlist

**Status:** Accepted

---

### No AI in MVP

**Decision:** All AI features (team matching, resume review, project judging, recommendations) are deferred to Phase 4 at earliest.

**Reason:** AI requires data (profiles, teams, outcomes) that doesn't exist yet. Building AI without users is building in a vacuum. Store structured data now; add AI when there's enough of it.

**Alternatives considered:** Basic rule-based matching in Phase 2, AI resume review in Phase 3

**Status:** Accepted

---

### "Looking for Team" toggle in MVP

**Decision:** Add a simple boolean toggle on the profile to indicate team-seeking status, visible to organizers and on the Passport screen.

**Reason:** Even without AI matching, an organizer viewing applicants can immediately see who needs a team. It's a small UI element with real workflow value.

**Alternatives considered:** Skip entirely, build full team formation

**Status:** Accepted

---

### No messaging in MVP

**Decision:** Defer all messaging (DM, group chat, announcements) to Phase 3.

**Reason:** Messaging is a full product in itself. It introduces real-time infrastructure, moderation, and notification complexity. Students already have WhatsApp and Discord — don't compete with them until the core workflow is proven.

**Alternatives considered:** Event-only chat, 1:1 DMs only

**Status:** Accepted

---

### Server Actions over REST API

**Decision:** Use Next.js Server Actions for all mutations instead of building a REST API.

**Reason:** Server Actions eliminate boilerplate (route handlers, serialization, client-server type sync). They are type-safe by default and co-located with the feature that uses them. A separate API layer adds complexity without benefit until there's an external consumer (mobile app, third-party API).

**Alternatives considered:** Route handlers (REST), tRPC, GraphQL

**Status:** Accepted

---

### Supabase over Firebase

**Decision:** Choose Supabase (PostgreSQL) over Firebase (NoSQL).

**Reason:** The data model is inherently relational (users → events → applications). NoSQL would require denormalization, complex joins in application code, and eventual consistency handling. PostgreSQL gives relational integrity, RLS, and a migration system.

**Alternatives considered:** Firebase, Appwrite, custom Node.js + PostgreSQL

**Status:** Accepted
