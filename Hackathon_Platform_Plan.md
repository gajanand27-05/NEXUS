# Hackathon Social Platform: Master Project Plan

## 1. Project Vision
An "all-in-one" social media platform tailored specifically for hackathons, tech events, and workshops. It acts as a middleman connecting companies and colleges (who have problems to solve and budget) with students and developers (who want to participate, solve them, and network).

---

## 2. The Problems & Our Solutions

### Problem 1: The Fragmented Student Experience
*   **The Issue:** Students currently juggle multiple platforms. They search for events on Devpost, communicate on Discord, and share wins on LinkedIn. This makes it hard to discover events passively, build a unified "hacker" portfolio, and find teammates easily.
*   **The Solution:** A unified platform where the feed is entirely focused on tech events. The user profile becomes their ultimate "Developer Passport" showing their skills and past hackathons. Finding a team is as easy as sending a DM on an app they already check daily.

### Problem 2: Company / Host Friction
*   **The Issue:** Companies and colleges have real-world problems and budgets for hackathons, but finding and engaging the right student demographic is very difficult. Marketing events relies on expensive ads or disjointed university email chains.
*   **The Solution:** The platform acts as a direct pipeline to students. Companies simply create an account and post their challenge into a feed where students are already actively looking. We solve their marketing problem.

### Problem 3: The Disjointed Ecosystem
*   **The Issue:** Lablab/Devpost are not social. Discord is not for discovery. LinkedIn is too corporate. Instagram is not for professional coding.
*   **The Solution:** A two-sided marketplace. We combine the passive discovery of an Instagram feed, the reputation building of LinkedIn, and the event hosting of Lablab into one addictive loop.

---

## 3. Step-by-Step Execution Plan

To avoid failing by trying to build too much at once, we must follow a strict, phased approach.

### Phase 1: Planning & Design (Current Phase)
*   **Action:** Finalize the core features of the MVP (Minimum Viable Product).
*   **Action:** Create wireframes and Figma mockups for the UI (Feed, User Profile, Event Post).
*   **Goal:** Have a clear visual blueprint before writing any code.

### Phase 2: Building the MVP (The Core App)
*   **Rule:** Do NOT build the chat system or complex features yet.
*   **Action 1:** Implement Authentication (Google/GitHub login).
*   **Action 2:** Build the Database (Users, Hackathons, Applications).
*   **Action 3:** Build the Home Feed (scrollable list of events).
*   **Action 4:** Build basic Student Profiles.
*   **Action 5:** Build a simple form for Companies to post events.

### Phase 3: The "Alpha" Launch (The College Strategy)
*   **Action:** Do not launch to the whole internet. Launch locally.
*   **Action:** Partner with your college's tech clubs to host an internal hackathon exclusively on this platform.
*   **Goal:** Get the first 100-200 real student users from your college to test the app and give feedback.

### Phase 4: Expansion & Monetization
*   **Action:** Add the Discord-style team chat and messaging.
*   **Action:** Approach local tech companies to host sponsored challenges.
*   **Action:** Implement automated team-matching based on user skills.

---

## 4. Technical Architecture (The Tech Stack)

To build a modern, fast, and scalable application, we will use the following stack:

*   **Frontend (The UI):** 
    *   **Next.js** (React framework for fast web apps).
    *   **TailwindCSS** or Vanilla CSS (for modern, glassmorphism design).
*   **Backend & Database (The Logic):** 
    *   **Supabase** (Provides instant PostgreSQL database and Authentication. Extremely fast to set up).
*   **Hosting:**
    *   **Vercel** (Deploy the Next.js app easily).
