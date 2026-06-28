# Future Roadmap — Nexus

**Version:** v1.0.0  
**Status:** Draft  
**Last Updated:** 2026-06-28  
**Changelog:**
- v1.0.0 — Initial future roadmap: phases 2-4 with features, dependencies, success gates

---

## 1. Post-MVP Philosophy

After the MVP ships and validates with a real college hackathon, every future feature must answer:

1. Did users ask for this?
2. Does it improve the core workflow (discover → join → complete → showcase)?
3. Does it increase retention or engagement?

If the answer to all three is unclear, the feature waits.

---

## 2. Phase 2 — The Social Layer (4-6 weeks after MVP)

**Goal:** Keep users on the platform after registration. Turn one-time participants into returning users.

### 2.1 Features

| Feature | Priority | Why Now |
|---|---|---|
| Activity feed (system-generated) | High | Gives users a reason to open the app after applying |
| Project showcase | High | Turns event participation into a permanent portfolio |
| Team formation | Medium | Enables collaboration — stickiest feature in hackathons |
| Notifications | High | Keeps users informed without email/WhatsApp |
| Comments on posts | Medium | Lightweight engagement without building chat |
| College dashboard (basic) | Medium | First B2B offering; validates college willingness to pay |
| Public profile pages | Low | Enables sharing on LinkedIn, Twitter |

### 2.2 Data Model Additions

| Table | Migration |
|---|---|
| `teams` | New table |
| `team_members` | New table |
| `projects` | New table |
| `posts` | New table (activity feed) |
| `notifications` | New table |
| `colleges` | New table; migrate `profiles.college` from free-text to FK |
| `comments` | New table |

### 2.3 Success Gates

| Metric | Target |
|---|---|
| Users returning after event registration | >40% |
| Projects submitted per event | >50% of participants |
| Teams formed per event | >30% of participants |
| At least 1 college actively using dashboard | Yes |
| Activity feed posts per week | >20 |

### 2.4 Risks

| Risk | Mitigation |
|---|---|
| Teams feature adds complexity too early | Ship team formation as opt-in per event; not mandatory |
| Activity feed appears empty | Seed with system-generated posts (user applied, event starting soon) |
| College dashboard is unused | Co-build with one college coordinator before general release |

---

## 3. Phase 3 — Engagement & Communication (6-8 weeks after Phase 2)

**Goal:** Replace the tools (Discord, WhatsApp) that students currently use for event communication.

### 3.1 Features

| Feature | Priority | Why Now |
|---|---|---|
| Real-time notifications | High | Eliminates reliance on WhatsApp groups |
| Direct messaging (1:1) | High | Enables team coordination without leaving the platform |
| Event chat channels | Medium | Organizer announcements + participant discussion |
| Company dashboard | Medium | Starts B2B revenue stream |
| Company challenges | High | Differentiator — companies post problems, students solve |
| Hack Score / reputation | Medium | Gamification; hiring signal |

### 3.2 Infrastructure Additions

| Technology | Purpose |
|---|---|
| Supabase Realtime | Live notifications, messaging, chat |
| `companies` table | Company profiles, challenge posts |

### 3.3 Success Gates

| Metric | Target |
|---|---|
| Messages sent per active user per week | >5 |
| Company challenges posted | >3 |
| Users with Hack Score | >60% of active users |
| Event chat used for communication | >70% of events |

### 3.4 Risks

| Risk | Mitigation |
|---|---|
| Messaging becomes the primary use case (distraction from events) | Keep messaging scoped to event participants only; no global chat |
| Company challenges require moderation | Manual review before publishing; scale with automated checks later |
| Hack Score gamed by users | Simple formula based on verifiable actions (participation, wins, reviews) |

---

## 4. Phase 4 — Scale & Monetization (8-12 weeks after Phase 3)

**Goal:** Become a revenue-generating platform with AI-powered features.

### 4.1 Features

| Feature | Priority | Why Now |
|---|---|---|
| AI team matching | High | Core differentiator; uses Phase 2 team + profile data |
| AI resume review | Medium | Value-add for students; hiring pipeline for companies |
| AI project judging | Medium | Reduces organizer workload; consistent evaluation |
| Sponsor marketplace | High | Revenue — sponsors pay for visibility |
| Premium subscriptions | Medium | Revenue — students pay for AI features, themes, analytics |
| Mobile app (native) | Low | Validate web product first |

### 4.2 Infrastructure Additions

| Technology | Purpose |
|---|---|
| FastAPI (Python) | AI microservice |
| Stripe | Payment processing |
| React Native or Flutter | Native mobile apps |

### 4.3 Success Gates

| Metric | Target |
|---|---|
| Monthly recurring revenue | >₹50,000 |
| AI team matches accepted | >100 |
| Sponsor campaigns run | >5 |
| Mobile app downloads | >1000 in first month |

### 4.4 Risks

| Risk | Mitigation |
|---|---|
| AI features don't work well with small data | Collect structured profile data from MVP onward; delay AI until sufficient data exists |
| Premium model reduces student adoption | Keep core free; premium is purely additive (AI features, advanced analytics) |
| Sponsor marketplace is empty | First 5 sponsors onboarded manually (free) before building self-serve |

---

## 5. Long-Term Bets (Year 2+)

| Bet | Rationale | Investment |
|---|---|---|
| **College partnerships as distribution** | Colleges pay for dashboards + analytics; students come for free | Dedicated B2B sales role |
| **Hiring pipeline as monetization** | Companies pay to message/hire top participants | Recruitment features, skill verification |
| **API platform** | Other platforms embed Nexus events | Public API + docs |
| **Offline hackathon Kits** | Sponsor-branded swag + platform access | Logistics + partnerships |

---

## 6. Feature/Phase Migration Matrix

| Feature | Phase 2 | Phase 3 | Phase 4 | Year 2+ |
|---|---|---|---|---|
| Activity feed | ✅ | — | — | — |
| Project showcase | ✅ | — | — | — |
| Team formation | ✅ | — | — | — |
| Notifications | ✅ | — | — | — |
| Comments | ✅ | — | — | — |
| College dashboard | ✅ | — | — | — |
| Public profiles | ✅ | — | — | — |
| Real-time notifications | — | ✅ | — | — |
| Direct messaging | — | ✅ | — | — |
| Event chat | — | ✅ | — | — |
| Company dashboard | — | ✅ | — | — |
| Company challenges | — | ✅ | — | — |
| Hack Score | — | ✅ | — | — |
| AI team matching | — | — | ✅ | — |
| AI resume review | — | — | ✅ | — |
| AI project judging | — | — | ✅ | — |
| Sponsor marketplace | — | — | ✅ | — |
| Premium subscriptions | — | — | ✅ | — |
| Mobile app | — | — | ✅ | — |
| College B2B sales | — | — | — | ✅ |
| Hiring pipeline | — | — | — | ✅ |
| API platform | — | — | — | ✅ |
