# Folder Structure — Nexus

**Version:** v1.0.0  
**Status:** Draft  
**Last Updated:** 2026-06-28  
**Changelog:**
- v1.0.0 — Initial folder structure: complete directory tree with annotations for every directory

---

## 1. Structure Principles

1. **Feature grouping over file-type grouping.** A feature's components, actions, and types live together — not scattered across `components/`, `actions/`, `types/` directories.
2. **Co-location.** Server Actions live next to the pages that use them. Types live next to the features they describe.
3. **Flat over nested.** Maximum 2-3 levels deep. Avoid `components/ui/buttons/primary/`.
4. **Shared code has a home.** Anything used by 2+ features goes in `lib/` or `components/shared/`.

---

## 2. Directory Tree

```
nexus/
├── .env.local                          # Local env vars (gitignored)
├── .env.example                        # Template for env vars
├── .gitignore
├── .prettierrc
├── .eslintrc.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
│
├── public/                             # Static assets
│   ├── logo.svg
│   └── og-image.png                    # Social preview
│
├── supabase/                           # Database configuration
│   ├── client.ts                       # Supabase browser client
│   ├── server.ts                       # Supabase server client
│   ├── middleware.ts                    # Supabase middleware helper
│   └── migrations/                     # SQL migration files
│       └── 001_initial.sql
│
├── styles/                             # Global styles
│   └── globals.css                     # Tailwind directives, CSS vars
│
├── lib/                                # Shared utilities
│   ├── utils.ts                        # cn() helper (clsx + tailwind-merge)
│   ├── constants.ts                    # App-wide constants
│   └── validators.ts                   # Shared validation functions
│
├── types/                              # Shared TypeScript types
│   ├── profile.ts
│   ├── event.ts
│   └── application.ts
│
├── components/                         # Shared components (2+ features)
│   └── shared/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── Avatar.tsx
│       ├── Skeleton.tsx
│       ├── EmptyState.tsx
│       ├── ErrorState.tsx
│       ├── Toast.tsx
│       ├── Modal.tsx
│       └── TabBar.tsx
│
├── app/                                # Next.js App Router
│   ├── layout.tsx                      # Root layout (fonts, metadata)
│   ├── page.tsx                        # Landing page (public)
│   │
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts                # OAuth redirect handler
│   │
│   ├── (main)/                         # Authenticated route group
│   │   ├── layout.tsx                  # Auth check + bottom nav + sidebar
│   │   │
│   │   ├── events/
│   │   │   ├── page.tsx                # Discover Events
│   │   │   ├── actions.ts              # Server Actions: listEvents, searchEvents
│   │   │   │
│   │   │   └── [id]/
│   │   │       ├── page.tsx            # Event Details
│   │   │       ├── actions.ts          # Server Actions: getEvent, applyToEvent
│   │   │       └── components/
│   │   │           ├── EventHeader.tsx
│   │   │           ├── EventInfo.tsx
│   │   │           ├── EventTimeline.tsx
│   │   │           ├── ApplyButton.tsx
│   │   │           └── EventCard.tsx   # Also used by Discover
│   │   │
│   │   ├── me/
│   │   │   └── events/
│   │   │       ├── page.tsx            # My Events
│   │   │       ├── actions.ts          # Server Actions: getMyApplications, cancelApplication
│   │   │       └── components/
│   │   │           ├── ApplicationCard.tsx
│   │   │           └── StatusTabs.tsx
│   │   │
│   │   ├── passport/
│   │   │   ├── page.tsx                # Developer Passport (create + edit)
│   │   │   ├── actions.ts              # Server Actions: getProfile, createProfile, updateProfile
│   │   │   └── components/
│   │   │       ├── ProfileForm.tsx
│   │   │       ├── SkillsInput.tsx
│   │   │       └── LookingForTeamToggle.tsx
│   │   │
│   │   └── organizer/
│   │       ├── page.tsx                # Dashboard (event list)
│   │       ├── actions.ts              # Server Actions: createEvent, updateEventStatus
│   │       ├── components/
│   │       │   ├── EventManagementCard.tsx
│   │       │   └── ApplicantCard.tsx
│   │       │
│   │       ├── events/
│   │       │   └── new/
│   │       │       ├── page.tsx        # Create Event form
│   │       │       └── components/
│   │       │           └── EventForm.tsx
│   │       │
│   │       └── events/[id]/
│   │           └── applicants/
│   │               ├── page.tsx        # View applicants per event
│   │               └── actions.ts      # Server Actions: reviewApplication
│   │
│   ├── error.tsx                       # Global error boundary
│   ├── not-found.tsx                   # 404 page
│   └── loading.tsx                     # Global loading state
│
├── hooks/                              # Custom React hooks
│   ├── use-toast.ts                    # Toast state management
│   └── use-debounce.ts                 # Search input debounce
│
└── docs/                               # Project documentation (not shipped)
    ├── 00_PROJECT_VISION.md
    ├── 01_PRODUCT_REQUIREMENTS.md
    ├── 02_DATABASE_DESIGN.md
    ├── 03_SYSTEM_ARCHITECTURE.md
    ├── 04_API_SPECIFICATION.md
    ├── 05_UI_UX_GUIDELINES.md
    ├── 06_WIREFRAMES.md
    ├── 07_DEVELOPMENT_ROADMAP.md
    ├── 08_TECH_STACK.md
    └── 09_FOLDER_STRUCTURE.md
```

---

## 3. Route-to-File Mapping

| URL Path | File |
|---|---|
| `/` | `app/page.tsx` |
| `/auth/callback` | `app/auth/callback/route.ts` |
| `/events` | `app/(main)/events/page.tsx` |
| `/events/[id]` | `app/(main)/events/[id]/page.tsx` |
| `/me/events` | `app/(main)/me/events/page.tsx` |
| `/passport` | `app/(main)/passport/page.tsx` |
| `/organizer` | `app/(main)/organizer/page.tsx` |
| `/organizer/events/new` | `app/(main)/organizer/events/new/page.tsx` |
| `/organizer/events/[id]/applicants` | `app/(main)/organizer/events/[id]/applicants/page.tsx` |

---

## 4. Import Conventions

```typescript
// Absolute imports (preferred)
import { Button } from '@/components/shared/Button'
import { createEvent } from '@/app/(main)/organizer/actions'
import { Event } from '@/types/event'

// Relative imports (only within the same feature)
import { EventCard } from './components/EventCard'
```

The `@/` alias maps to `./` (root). Configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 5. File Naming Conventions

| File Type | Convention | Example |
|---|---|---|
| Pages | `page.tsx` | `events/page.tsx` |
| Layouts | `layout.tsx` | `(main)/layout.tsx` |
| Server Actions | `actions.ts` | `events/actions.ts` |
| Components | PascalCase | `EventCard.tsx` |
| Types | camelCase | `profile.ts` |
| Hooks | `use-*.ts` | `use-toast.ts` |
| Utilities | camelCase | `utils.ts`, `constants.ts` |

---

## 6. What Goes Where

| File Type | Location | Note |
|---|---|---|
| Page component | `app/**/page.tsx` | One per route |
| Shared UI component | `components/shared/` | Used by 2+ features |
| Feature-specific component | `app/**/components/` | Used by one feature |
| Server Action | `app/**/actions.ts` | Co-located with feature |
| TypeScript interface | `types/` | Shared across features |
| Utility function | `lib/` | Pure functions, no React |
| Custom hook | `hooks/` | Stateful React logic |
| Migration SQL | `supabase/migrations/` | Numbered sequentially |
| CSS | `styles/globals.css` | Tailwind directives only |

---

## 7. Growth Rules

As the codebase grows, follow these rules:

1. **If a component is used by 3+ features,** move it to `components/shared/`.
2. **If a type is used in 2+ files,** move it to `types/`.
3. **If a Server Action exceeds 50 lines,** extract helpers into `lib/`.
4. **If a feature page exceeds 200 lines,** extract logic into feature-specific components.
5. **If a file path exceeds 4 segments,** reconsider the nesting.
