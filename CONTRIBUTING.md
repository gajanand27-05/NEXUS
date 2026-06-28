# Contributing — Nexus

## Branch Naming

```
feat/<description>     # New feature
fix/<description>      # Bug fix
docs/<description>     # Documentation
refactor/<description> # Code refactoring
style/<description>    # Styling, formatting
```

Examples: `feat/oauth-google`, `fix/apply-duplicate`, `docs/api-spec`

## Commit Messages

Use conventional commits:

```
<type>: <short description>

<optional body>
```

Types: `feat`, `fix`, `docs`, `refactor`, `style`, `chore`

Examples:
- `feat: add Google OAuth sign-in`
- `fix: prevent duplicate applications to same event`
- `docs: add acceptance criteria to FR-004`

## Development Workflow

1. Pick a task from the GitHub Project board (Ready → In Progress)
2. Create a branch from `main`
3. Implement the feature against the specification in `/docs`
4. Verify against acceptance criteria in the PRD
5. Run `npm run lint` and `tsc --noEmit` — no warnings
6. Create a pull request to `main`
7. Self-review: check loading, empty, error, and edge states
8. Merge after passing review

## Code Style

- **Components:** PascalCase, one component per file
- **Functions:** camelCase
- **Server Actions:** grouped in `actions.ts` co-located with feature
- **Imports:** Use `@/` alias for all imports (not relative paths)
- **CSS:** Tailwind utility classes only; no custom CSS files except `globals.css`
- **Types:** Define all shared types in `types/`; local types stay in feature file

## Review Checklist

Before submitting a PR, verify:

- [ ] Feature matches the PRD specification
- [ ] All 4 states handled: loading, empty, error, success
- [ ] Mobile responsive (320px, 768px, 1024px)
- [ ] RLS policies tested (student + organizer roles)
- [ ] Server Action returns correct error codes from the catalogue
- [ ] `npm run lint` passes with zero warnings
- [ ] `tsc --noEmit` passes with zero errors
- [ ] Acceptance criteria from the PRD are met

## Documentation

- If implementation reveals an ambiguity or flaw in the specs, update the relevant doc and bump its version in the changelog
- Do not add features that are not documented in the PRD
- All ADR changes must go through the ADR process

## Getting Help

- Read the relevant doc in `/docs` first
- Check existing ADRs for architectural decisions
- Open an issue on GitHub for open questions
