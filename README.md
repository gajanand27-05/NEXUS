# Nexus

**The platform where innovation events happen.**

Nexus unifies the hackathon ecosystem into a single end-to-end workflow. Students discover events, apply, build portfolios, and showcase their work — all in one place. Organizers create events, manage applicants, and run hackathons without juggling Google Forms, Discord, Devpost, and spreadsheets.

---

## Current Status

**Phase 1: Planning & Design — Complete** ✅

All product design documents are written and versioned in `/docs`.

| Document | Status |
|---|---|
| [Project Vision](/docs/00_PROJECT_VISION.md) | ✅ Frozen |
| [Product Requirements](/docs/01_PRODUCT_REQUIREMENTS.md) | ✅ v1.0.1 |
| [Database Design](/docs/02_DATABASE_DESIGN.md) | ✅ v1.1.0 |
| [System Architecture](/docs/03_SYSTEM_ARCHITECTURE.md) | ✅ v1.1.0 |
| [API Specification](/docs/04_API_SPECIFICATION.md) | ✅ v1.0.0 |
| [UI/UX Guidelines](/docs/05_UI_UX_GUIDELINES.md) | ✅ v1.0.0 |
| [Wireframes](/docs/06_WIREFRAMES.md) | ✅ v1.0.0 |
| [Development Roadmap](/docs/07_DEVELOPMENT_ROADMAP.md) | ✅ v1.0.0 |
| [Tech Stack](/docs/08_TECH_STACK.md) | ✅ v1.0.0 |
| [Folder Structure](/docs/09_FOLDER_STRUCTURE.md) | ✅ v1.0.0 |
| [Future Roadmap](/docs/10_FUTURE_ROADMAP.md) | ✅ v1.0.0 |

**Next: Phase 2 — Implementation**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 + TypeScript + Tailwind CSS 4 |
| Backend | Supabase (Auth + PostgreSQL + Storage) |
| Mutations | Next.js Server Actions |
| Hosting | Vercel + Supabase Cloud |

No custom backend, no external state library, no REST API — intentionally minimal.

---

## MVP Screens (6)

| Screen | User | Purpose |
|---|---|---|
| Landing / Auth | All | Google/GitHub OAuth |
| Discover Events | Student | Browse and find events |
| Event Details | Student | View info and apply |
| My Events | Student | Track application status |
| Developer Passport | Student | Profile, skills, team toggle |
| Organizer Dashboard | Organizer | Create event, manage applicants |

---

## MVP Scope

- **2 user roles:** Student + Organizer
- **3 database tables:** `profiles`, `events`, `applications`
- **13 Server Actions** across 5 feature groups
- **4-week build:** Auth → Discover → Dashboard → Ship
- **Launch strategy:** One real college hackathon run entirely on Nexus

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/gajanand27-05/NEXUS.git
cd NEXUS

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# Start development
npm run dev
```

---

## License

MIT
