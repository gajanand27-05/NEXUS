# Wireframes — Nexus

**Version:** v1.0.0  
**Status:** Draft  
**Last Updated:** 2026-06-28  
**Changelog:**
- v1.0.0 — Initial wireframes for all 6 MVP screens + sub-screens; navigation flow diagram

---

## 1. Navigation Flow

```
                        ┌─────────────┐
                        │   Landing   │
                        │    (/)      │
                        └──────┬──────┘
                               │ Google/GitHub OAuth
                               ▼
                        ┌─────────────┐
                   ┌─── │  /auth/cb   │ ───┐
                   │    └─────────────┘    │
          First login?                    Returning?
                   │                       │
                   ▼                       ▼
            ┌─────────────┐         ┌─────────────┐
            │  /passport  │         │  /events    │
            │  (create    │         │  (Discover) │
            │   profile)  │         └──────┬──────┘
            └──────┬──────┘                │
                   │                        │
                   ▼                        ▼
            ┌─────────────┐         ┌─────────────┐
            │  /events    │         │  /events/[id]│
            │  (Discover) │         │  Detail      │
            └─────────────┘         └──────┬──────┘
                                           │ Apply
                                           ▼
                                    ┌─────────────┐
                                    │  /me/events │
                                    │  My Events  │
                                    └─────────────┘

  Organizer flow:
  /events → /organizer → /organizer/events/new → /organizer/events/[id]/applicants
```

---

## 2. Screen W1 — Landing / Auth

```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│                                         │
│              ┌───────┐                  │
│              │ LOGO  │                  │
│              └───────┘                  │
│                                         │
│        The platform where               │
│     innovation events happen.           │
│                                         │
│         ┌─────────────────────┐         │
│         │  Continue with      │         │
│         │  Google             │         │
│         └─────────────────────┘         │
│                                         │
│         ┌─────────────────────┐         │
│         │  Continue with      │         │
│         │  GitHub             │         │
│         └─────────────────────┘         │
│                                         │
│         By continuing, you agree to     │
│         Terms of Service & Privacy      │
│                                         │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

**States:**
- **Loading:** Centered spinner while OAuth redirects
- **Error:** Error banner below OAuth buttons with retry
- **Already logged in:** Redirect to /events or /passport

---

## 3. Screen W2 — Discover Events

```
┌─────────────────────────────────────────┐
│  Nexus                          [User]  │
├─────────────────────────────────────────┤
│  🔍 Search events...                    │
│  [All Modes ▼]                          │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────┐     │
│ │ 🏆 AI Hack Bengaluru            │     │
│ │ 📅 Mar 15-17, 2026              │     │
│ │ 🌐 Online                       │     │
│ │ 💰 ₹2,00,000                    │     │
│ └─────────────────────────────────┘     │
│ ┌─────────────────────────────────┐     │
│ │ 🏆 Flutter Workshop             │     │
│ │ 📅 Apr 5, 2026                  │     │
│ │ 📍 KNSIT, Bengaluru             │     │
│ │ 💰 Free                         │     │
│ └─────────────────────────────────┘     │
│ ┌─────────────────────────────────┐     │
│ │ 🏆 Microsoft AI Challenge       │     │
│ │ 📅 May 1-30, 2026               │     │
│ │ 🌐 Online                       │     │
│ │ 💰 ₹5,00,000                    │     │
│ └─────────────────────────────────┘     │
│                                         │
├─────────────────────────────────────────┤
│  [Discover]   [My Events]   [Passport]  │
└─────────────────────────────────────────┘
```

**States:**
- **Loading:** 3 skeleton cards (gray shimmer blocks matching card dimensions)
- **Empty:** "No events yet" — large calendar icon, "Be the first organizer" CTA
- **Error:** "Could not load events" — retry button
- **Edge:** Network offline — inline banner "You're offline. Showing cached data."

---

## 4. Screen W3 — Event Details

```
┌─────────────────────────────────────────┐
│  ← Back                                 │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────┐     │
│ │       Cover Image (16:9)        │     │
│ └─────────────────────────────────┘     │
│                                         │
│ AI Hack Bengaluru                        │
│ A 48-hour AI innovation challenge        │
│                                         │
│ 🌐 Online                               │
│ 📅 Mar 15, 9:00 AM — Mar 17, 6:00 PM   │
│ 💰 ₹2,00,000 in prizes                  │
│ 👤 Organized by Tech Club KNSIT          │
│                                         │
│ ┌─────────────────────────────────┐     │
│ │        Apply Now                │     │
│ │     Deadline: Mar 10, 2026      │     │
│ └─────────────────────────────────┘     │
│                                         │
│ About                                    │
│ ─────────────────────────────────        │
│ Build AI solutions for real-world        │
│ problems...                              │
│                                         │
│ Timeline                                 │
│ ─────────────────────────────────        │
│ • Registration closes: Mar 10           │
│ • Kickoff: Mar 15, 9:00 AM              │
│ • Submission: Mar 17, 4:00 PM           │
│ • Results: Mar 20                        │
│                                         │
│ Tracks                                   │
│ ─────────────────────────────────        │
│ [Future: ML, NLP, Computer Vision]       │
│                                         │
│ Sponsored by                             │
│ ─────────────────────────────────        │
│ [Future: sponsor logos]                  │
└─────────────────────────────────────────┘
```

**States:**
- **Loading:** Skeleton matching layout (cover image block, text lines, button block)
- **Applied:** Button changes to "✅ Applied" (pending status badge)
- **Closed:** Button shows "🔒 Registration Closed" (gray, disabled)
- **Error:** "Event not found" — full-screen error with Back to Discover link

---

## 5. Screen W4 — My Events

```
┌─────────────────────────────────────────┐
│  My Events                              │
├─────────────────────────────────────────┤
│  [Pending] [Accepted] [Rejected] [Done] │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────┐     │
│ │ AI Hack Bengaluru        ● Pending │  │
│ │ 🗓 Applied 2 days ago             │  │
│ │ 📅 Mar 15-17, 2026               │  │
│ │ ✕ Cancel Application            │  │
│ └─────────────────────────────────┘     │
│ ┌─────────────────────────────────┐     │
│ │ Flutter Workshop          ● Pending │  │
│ │ 🗓 Applied 5 days ago             │  │
│ │ 📅 Apr 5, 2026                    │  │
│ │ ✕ Cancel Application            │  │
│ └─────────────────────────────────┘     │
│                                         │
├─────────────────────────────────────────┤
│  [Discover]   [My Events]   [Passport]  │
└─────────────────────────────────────────┘
```

**States:**
- **Loading:** Skeleton list (3-4 list item blocks)
- **Empty:** "No applications yet" — document icon, "Discover events to apply" link
- **Empty per tab:** Tab-specific message (e.g., "No accepted applications yet")
- **Accepted tab:** Shows "🎉 You're in!" badge; event details link
- **Rejected tab:** Shows muted card; no cancel option

---

## 6. Screen W5 — Developer Passport

```
┌─────────────────────────────────────────┐
│  Developer Passport                     │
├─────────────────────────────────────────┤
│                                         │
│          ┌───────┐                      │
│          │  AS   │  Avatar              │
│          └───────┘                      │
│         Ananya Sharma                    │
│         ananya@knsit.ac.in              │
│                                         │
│  College                                │
│  ┌─────────────────────────────────┐    │
│  │ KNS Institute of Technology    │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Skills                                 │
│  ┌─────────────────────────────────┐    │
│  │ [React] [TypeScript] [AI] +Add │    │
│  └─────────────────────────────────┘    │
│                                         │
│  GitHub                                 │
│  ┌─────────────────────────────────┐    │
│  │ https://github.com/ananya      │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Bio                                    │
│  ┌─────────────────────────────────┐    │
│  │ Full-stack developer. Building │    │
│  │ AI-powered tools.              │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Looking for Team     [⚫────────] ON   │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │           Save Changes          │    │
│  └─────────────────────────────────┘    │
│                                         │
├─────────────────────────────────────────┤
│  [Discover]   [My Events]   [Passport]  │
└─────────────────────────────────────────┘
```

**States:**
- **Loading:** Skeleton profile (avatar circle, text lines, form field blocks)
- **First login:** Empty fields with placeholder text, save required
- **Save success:** Green toast "Profile saved" (auto-dismiss 3s)
- **Save error:** Red inline error on the field that failed + "Check your connection"

---

## 7. Screen W6 — Organizer Dashboard

### 7.1 Dashboard Home

```
┌─────────────────────────────────────────┐
│  Dashboard                              │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐    │
│  │    + Create New Event          │    │
│  └─────────────────────────────────┘    │
│                                         │
│  My Events                              │
│  ───────────────────────────────        │
│ ┌─────────────────────────────────┐     │
│ │ AI Hack Bengaluru     ● Published│  │
│ │ 📅 Mar 15-17, 2026             │     │
│ │ 👥 24 applicants               │     │
│ │ 📋 View Applicants  →          │     │
│ └─────────────────────────────────┘     │
│ ┌─────────────────────────────────┐     │
│ │ Flutter Workshop      ● Draft  │     │
│ │ 📅 Apr 5, 2026                  │     │
│ │ 👥 0 applicants                 │     │
│ │ ✏️ Edit Event  →                │     │
│ └─────────────────────────────────┘     │
│                                         │
├─────────────────────────────────────────┤
│  [Discover][My Events][Dashboard]       │
└─────────────────────────────────────────┘
```

**States:**
- **Loading:** Skeleton list + skeleton button
- **Empty:** "No events yet" — large + icon, "Create your first event" CTA
- **Error:** "Could not load dashboard" — retry button

### 7.2 Create Event Form

```
┌─────────────────────────────────────────┐
│  ← Dashboard         Create Event      │
├─────────────────────────────────────────┤
│  Event Title *                           │
│  ┌─────────────────────────────────┐    │
│  │ e.g., AI Hackathon 2026       │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Tagline                                │
│  ┌─────────────────────────────────┐    │
│  │ e.g., 48-hour AI challenge     │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Mode *                                 │
│  ┌─────────────────────────────────┐    │
│  │ [Online] [Offline] [Hybrid]    │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Location (required for offline/hybrid) │
│  ┌─────────────────────────────────┐    │
│  │ KNSIT, Bengaluru               │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Start Date *     End Date *            │
│  ┌──────────┐    ┌──────────┐          │
│  │ Mar 15   │    │ Mar 17   │          │
│  └──────────┘    └──────────┘          │
│                                         │
│  Registration Deadline *                │
│  ┌─────────────────────────────────┐    │
│  │ Mar 10, 2026                   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Description *                          │
│  ┌─────────────────────────────────┐    │
│  │ Build AI solutions for...      │    │
│  │ (markdown supported)           │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Prize Pool                             │
│  ┌─────────────────────────────────┐    │
│  │ ₹2,00,000                      │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Max Participants                       │
│  ┌─────────────────────────────────┐    │
│  │ 100                            │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌──────────────┐   ┌──────────────┐   │
│  │ Save as Draft│   │   Publish    │   │
│  └──────────────┘   └──────────────┘   │
└─────────────────────────────────────────┘
```

### 7.3 View Applicants

```
┌─────────────────────────────────────────┐
│  ← Dashboard    AI Hack Bengaluru      │
│  Applicants: 24                         │
├─────────────────────────────────────────┤
│  [Pending (12)] [Accepted (8)] [Rej (4)]│
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────┐     │
│ │ AS  Ananya Sharma               │     │
│ │     KNSIT, 3rd Year CSE         │     │
│ │     Skills: React, TypeScript   │     │
│ │     GitHub: github.com/ananya   │     │
│ │     🔍 Looking for Team        │     │
│ │                          [✅] [❌] │     │
│ └─────────────────────────────────┘     │
│ ┌─────────────────────────────────┐     │
│ │ RK  Rahul Kumar                 │     │
│ │     KNSIT, 3rd Year AIML        │     │
│ │     Skills: Python, TensorFlow  │     │
│ │     GitHub: github.com/rahul    │     │
│ │                          [✅] [❌] │     │
│ └─────────────────────────────────┘     │
│                                         │
├─────────────────────────────────────────┤
│  [Discover][My Events][Dashboard]       │
└─────────────────────────────────────────┘
```

**States:**
- **Loading:** Skeleton applicant cards
- **Empty:** "No applicants yet" — share event link CTA
- **Empty tab:** "No approved applicants yet"
- **Decision made:** Button pair replaced with status badge (Accepted/Rejected)

---

## 8. Mobile Navigation (All Screens)

```
┌─────────────────────────────────────────┐
│                                         │
│           Content Area                  │
│                                         │
│                                         │
├─────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐│
│  │Compas│  │📅    │  │👤    │  │⚙️   ││
│  │Discover│  │Events│  │Profile│  │  │  │
│  └──────┘  └──────┘  └──────┘  └──────┘│
└─────────────────────────────────────────┘
```

Tab bar items change based on role:
- **Student:** Discover | My Events | Passport
- **Organizer:** Discover | My Events | Dashboard

---

## 9. Desktop Layout (1024px+)

```
┌──────────┬──────────────────────────────────┐
│          │  Search...              [Avatar]  │
│  Logo    ├──────────────────────────────────┤
│          │                                  │
│  🔍     │  ┌──────┐ ┌──────┐ ┌──────┐    │
│  Discover│  │Event │ │Event │ │Event │    │
│          │  │Card  │ │Card  │ │Card  │    │
│  📅     │  └──────┘ └──────┘ └──────┘    │
│  My      │  ┌──────┐ ┌──────┐ ┌──────┐    │
│  Events  │  │Event │ │Event │ │Event │    │
│          │  │Card  │ │Card  │ │Card  │    │
│  👤     │  └──────┘ └──────┘ └──────┘    │
│  Passport│                                  │
│          │                                  │
│  ────────│                                  │
│          │                                  │
│  ⚙️     │                                  │
│  Settings│                                  │
│          │                                  │
│  🚪     │                                  │
│  Sign Out│                                  │
└──────────┴──────────────────────────────────┘
```
