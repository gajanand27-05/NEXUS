# UI/UX Guidelines — Nexus

**Version:** v1.0.0  
**Status:** Draft  
**Last Updated:** 2026-06-28  
**Changelog:**
- v1.0.0 — Initial guidelines: color, typography, spacing, components, navigation, accessibility

---

## 1. Design Principles

1. **Workflow before decoration.** Every visual element serves a task. No ornamental UI.
2. **Clarity over cleverness.** Labels are plain language. Icons always paired with text labels in MVP.
3. **Mobile-first.** All designs start at 320px width and scale up.
4. **Consistency.** One button style, one card style, one input style. No variants.
5. **Accessibility by default.** Adequate contrast, readable type, keyboard navigable.

---

## 2. Color Palette

### 2.1 Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#6366F1` (Indigo 500) | Buttons, links, active states |
| `--color-primary-hover` | `#4F46E5` (Indigo 600) | Button hover |
| `--color-primary-light` | `#EEF2FF` (Indigo 50) | Light backgrounds, badges |

### 2.2 Neutral Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-surface` | `#F9FAFB` (Gray 50) | Card backgrounds |
| `--color-border` | `#E5E7EB` (Gray 200) | Borders, dividers |
| `--color-text-primary` | `#111827` (Gray 900) | Headings, primary text |
| `--color-text-secondary` | `#6B7280` (Gray 500) | Body text, labels |
| `--color-text-muted` | `#9CA3AF` (Gray 400) | Placeholder, disabled |

### 2.3 Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#10B981` (Emerald 500) | Accepted, completed, verified |
| `--color-warning` | `#F59E0B` (Amber 500) | Pending, awaiting action |
| `--color-error` | `#EF4444` (Red 500) | Rejected, errors, destructive actions |
| `--color-info` | `#3B82F6` (Blue 500) | Informational notices |

### 2.4 Status Badge Colors

| Status | Background | Text |
|---|---|---|
| Pending | `#FEF3C7` (Amber 100) | `#92400E` (Amber 800) |
| Accepted | `#D1FAE5` (Emerald 100) | `#065F46` (Emerald 800) |
| Rejected | `#FEE2E2` (Red 100) | `#991B1B` (Red 800) |
| Cancelled | `#F3F4F6` (Gray 100) | `#374151` (Gray 700) |
| Draft | `#E0E7FF` (Indigo 100) | `#3730A3` (Indigo 800) |
| Published | `#D1FAE5` (Emerald 100) | `#065F46` (Emerald 800) |

---

## 3. Typography

### 3.1 Font Family

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

Inter for all UI text. Mono font for code blocks in event descriptions only.

### 3.2 Type Scale

| Token | Size | Weight | Usage |
|---|---|---|---|
| `--text-xs` | 0.75rem (12px) | 400 | Caption, metadata |
| `--text-sm` | 0.875rem (14px) | 400 | Body text, card content |
| `--text-base` | 1rem (16px) | 500 | Button labels, input text |
| `--text-lg` | 1.125rem (18px) | 600 | Card titles |
| `--text-xl` | 1.25rem (20px) | 700 | Section headings |
| `--text-2xl` | 1.5rem (24px) | 700 | Page titles |

### 3.3 Line Heights

- Body text: `1.5`
- Headings: `1.25`
- Button text: `1`

---

## 4. Spacing & Layout

### 4.1 Spacing Scale

Uses Tailwind default spacing scale (4px base).

| Token | Rem | Px | Usage |
|---|---|---|---|
| `space-1` | 0.25rem | 4px | Inner padding (tight) |
| `space-2` | 0.5rem | 8px | Element gap, icon spacing |
| `space-3` | 0.75rem | 12px | Card inner padding (compact) |
| `space-4` | 1rem | 16px | Card inner padding (default) |
| `space-6` | 1.5rem | 24px | Section spacing |
| `space-8` | 2rem | 32px | Page margins |
| `space-12` | 3rem | 48px | Between major sections |

### 4.2 Breakpoints

| Name | Min Width | Target |
|---|---|---|
| Mobile | 320px | Primary target |
| Tablet | 768px | Landscape tablets |
| Desktop | 1024px | Laptop and above |

### 4.3 Layout Rules

- Max content width: 1200px, centered with auto margins
- Mobile: single column, bottom tab navigation
- Tablet/Desktop: two-column (sidebar + content), top nav

---

## 5. Component Styles

### 5.1 Buttons

| Variant | Style | Usage |
|---|---|---|
| **Primary** | `bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium` | Main CTA (Apply, Save, Publish) |
| **Secondary** | `bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg` | Secondary actions (Cancel, Save Draft) |
| **Destructive** | `bg-red-600 text-white px-4 py-2 rounded-lg font-medium` | Irreversible actions (Cancel Application) |
| **Ghost** | `text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg` | Tertiary actions (Edit, View) |
| **Disabled** | `opacity-50 cursor-not-allowed` on any variant | Button is unavailable |

All buttons: `h-10` (40px), `rounded-lg`, `transition-colors`, `focus:ring-2 focus:ring-indigo-500`.

### 5.2 Inputs

| Element | Style |
|---|---|
| Text input | `w-full h-10 px-3 border border-gray-300 rounded-lg bg-white text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500` |
| Textarea | Same as input + `min-h-[100px] py-2` |
| Select | Same as input + `appearance-none` with custom chevron |
| Checkbox / Toggle | Custom styled, `h-5 w-5`, accent color `indigo-600` |
| Label | `text-sm font-medium text-gray-700 mb-1` |
| Error text | `text-sm text-red-600 mt-1` |
| Helper text | `text-sm text-gray-500 mt-1` |

### 5.3 Cards

```css
.card {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
```

Cards are the primary content container. Used for EventCards, ApplicationCards, ProfileCards.

### 5.4 Badges

| Size | Style |
|---|---|
| Small | `inline-flex px-2 py-0.5 text-xs font-medium rounded-full` |
| Default | `inline-flex px-2.5 py-0.5 text-sm font-medium rounded-full` |

Color follows the status badge palette (Section 2.4).

### 5.5 Skeleton Loading

```css
.skeleton {
  background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}
```

Used for all loading states. Match skeleton dimensions to the content they replace.

### 5.6 Avatars

- Default: initials on colored background (generated from name)
- Size: `h-10 w-10` for cards, `h-16 w-16` for profile header
- `rounded-full`, `bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-center`

---

## 6. Navigation

### 6.1 Mobile Bottom Tab Bar

```
┌─────────────────────────────────────────────┐
│                                             │
│              (Content Area)                  │
│                                             │
├─────────────────────────────────────────────┤
│  Discover  │  My Events  │  Passport        │
│  (compass) │  (calendar) │  (user)          │
└─────────────────────────────────────────────┘
```

- Fixed to bottom, `h-16`, white background, top border
- Active tab: indigo text + icon fill
- Inactive tab: gray text + icon outline
- Organizer sees additional "Dashboard" tab (replaces Passport)

### 6.2 Desktop Sidebar (1024px+)

```
┌──────────┬──────────────────────────────────┐
│          │                                   │
│  Logo    │         Content Area              │
│          │                                   │
│  Discover│                                   │
│          │                                   │
│  My      │                                   │
│  Events  │                                   │
│          │                                   │
│  Passport│                                   │
│          │                                   │
│  ─────── │                                   │
│          │                                   │
│  Settings│                                   │
│  Sign Out│                                   │
└──────────┴──────────────────────────────────┘
```

- Sidebar: `w-64`, fixed position, white bg, border-right

### 6.3 Top Bar

- Mobile: hamburger menu (future) + page title
- Desktop: page title only (navigation is in sidebar)

---

## 7. Page Layouts

### 7.1 Discover Events

```
┌─────────────────────────────────┐
│  🔍 Search events...     Filter ▼│
├─────────────────────────────────┤
│ ┌───────┐ ┌───────┐ ┌───────┐ │
│ │ Event │ │ Event │ │ Event │ │
│ │ Card  │ │ Card  │ │ Card  │ │
│ └───────┘ └───────┘ └───────┘ │
│ ┌───────┐ ┌───────┐ ┌───────┐ │
│ │ Event │ │ Event │ │ Event │ │
│ │ Card  │ │ Card  │ │ Card  │ │
│ └───────┘ └───────┘ └───────┘ │
└─────────────────────────────────┘
```

- Mobile: single column, full-width cards
- Desktop: 2-3 column grid, 16px gap

### 7.2 Event Details

```
┌─────────────────────────────────┐
│  ← Back                         │
│  ┌─────────────────────────┐    │
│  │    Cover Image          │    │
│  └─────────────────────────┘    │
│  Title                         │
│  Tagline                       │
│  📅 Date Range                 │
│  📍 Location / Online          │
│  🏆 Prize Pool                 │
│                                │
│  [━━━━━━━━━ Apply ━━━━━━━━━]   │
│                                │
│  Description                   │
│  (markdown rendered)           │
│                                │
│  Timeline                      │
│  • Registration: ...           │
│  • Event starts: ...           │
│  • Submission: ...             │
└─────────────────────────────────┘
```

### 7.3 My Events

```
┌─────────────────────────────────┐
│  My Events                      │
│  [Pending] [Accepted] [Rejected]│
├─────────────────────────────────┤
│ ┌─────────────────────────┐    │
│ │ Event Name         ● Pending│
│ │ Applied 2 days ago        │
│ └─────────────────────────┘    │
│ ┌─────────────────────────┐    │
│ │ Event Name         ● Pending│
│ │ Applied 5 days ago        │
│ └─────────────────────────┘    │
└─────────────────────────────────┘
```

### 7.4 Developer Passport

```
┌─────────────────────────────────┐
│  Developer Passport             │
│                                │
│      [Avatar]                   │
│      Display Name               │
│      email@college.edu          │
│                                │
│  College                        │
│  ┌─────────────────────────┐   │
│  │ KNS Institute of Tech   │   │
│  └─────────────────────────┘   │
│                                │
│  Skills                        │
│  [React] [TypeScript] [AI] +   │
│                                │
│  GitHub                        │
│  ┌─────────────────────────┐   │
│  │ https://github.com/...  │   │
│  └─────────────────────────┘   │
│                                │
│  Bio                           │
│  ┌─────────────────────────┐   │
│  │ Full-stack developer... │   │
│  └─────────────────────────┘   │
│                                │
│  Looking for Team  [toggle]    │
│                                │
│  [━━━━━━━━ Save ━━━━━━━━]      │
└─────────────────────────────────┘
```

### 7.5 Organizer Dashboard

```
┌─────────────────────────────────┐
│  Dashboard          [+New Event]│
├─────────────────────────────────┤
│ ┌─────────────────────────┐    │
│ │ AI Hack Bengaluru  ●Pub │3 apps│
│ │ Mar 15-17, 2026         │    │
│ │ 📋 View Applicants  >   │    │
│ └─────────────────────────┘    │
│ ┌─────────────────────────┐    │
│ │ Flutter Workshop   ●Draft│    │
│ │ Not yet published       │    │
│ │ 📝 Edit Event      >    │    │
│ └─────────────────────────┘    │
└─────────────────────────────────┘
```

---

## 8. Empty States

| Screen | Illustration | Message | CTA |
|---|---|---|---|
| Discover | Calendar icon (large) | "No events yet" | "Be the first organizer" (link) |
| My Events | Document icon | "No applications yet" | "Discover events to apply" |
| Passport | User icon | "Complete your profile" | (form fields visible) |
| Organizer Dashboard | Plus icon | "No events yet" | "Create your first event" |

All empty states use: centered layout, `text-gray-500 text-lg`, icon `h-16 w-16`, CTA button below.

---

## 9. Accessibility

| Requirement | Standard |
|---|---|
| Color contrast | All text: ≥ 4.5:1 ratio against background |
| Touch targets | All interactive elements ≥ 44×44px |
| Focus indicators | Visible `ring-2 ring-indigo-500` on keyboard focus |
| Form labels | Every input has associated `<label>` |
| Alt text | All images have descriptive `alt` attributes |
| Screen reader | Status badges include `aria-label` (e.g., "Status: Accepted") |
| Reduced motion | `@media (prefers-reduced-motion)` disables animations |

---

## 10. Iconography

- **Icon set:** Lucide Icons (open-source, consistent, tree-shakeable)
- **Style:** Outline, 1.5px stroke, 24×24 default size
- **Usage:** Icons are always decorative or paired with text labels in MVP
- **Common icons:** `Search`, `Calendar`, `MapPin`, `Trophy`, `Users`, `User`, `ArrowLeft`, `X`, `Check`, `Plus`, `Settings`, `LogOut`

---

## 11. Shadows

| Level | Value | Usage |
|---|---|---|
| Small | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Cards (default) |
| Medium | `0 4px 6px -1px rgb(0 0 0 / 0.1)` | Dropdowns, modals |
| Large | `0 10px 15px -3px rgb(0 0 0 / 0.1)` | Modals, overlays |

---

## 12. Animations

| Element | Animation | Duration |
|---|---|---|
| Page transitions | Fade in | 200ms |
| Button hover | Background color | 150ms |
| Modal overlay | Fade in | 200ms |
| Skeleton loading | Shimmer | 1.5s infinite |
| Status badge change | Scale pulse | 300ms |

All animations respect `prefers-reduced-motion`.
