# Ma. Corp — website (Phase 1)

Public site for Ma. Corp (Media, Arts & Entertainment Group) plus the entry points for the
artist area: UCP sign-in and the Dooze Bot studio booking system.

Stack: Vite + React 18 + TypeScript + React Router, with CSS Modules and design tokens. No UI library.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
```

> Deploying `dist/`: it is a single-page app, so the host must fall back to `index.html`
> for unknown paths (`/artists`, `/login`, …).

## Structure

```
src/
  app/            App.tsx (routes) · navigation.ts (one site map for header, menu and footer)
  styles/         tokens.css (colour, type, spacing, motion) · base.css (surfaces, primitives)
  content/        typed data + selectors (getArtists, getReleases, …) ← swap for an API later
  components/
    layout/       SiteHeader, SiteFooter, Layout, PageIntro
    ui/           Logo, Button, SectionHead
    media/        Halftone (canvas print renderer), CoverArt (generated sleeves), VinylDisc
    blocks/       ArtistIndex, ReleaseGrid, LabelFeature, VentureList, StudioRooms, Company
  sections/home/  Hero, Manifesto (homepage-only)
  features/
    auth/         UCP auth: types, AuthClient contract, AuthProvider/useAuth, RequireAuth
    booking/      Dooze Bot: domain types, BOOKING_FIELDS, DoozeBotPanel
  pages/          one file per route
public/media/     label logos and roster portraits (greyscale, cropped from the forum material)
```

## Design system

- **Two surfaces only.** `.surface-ink` and `.surface-paper` set `--fg`, `--fg-muted`, `--rule` and `--bg`.
  Components read those variables, so any block works on either surface.
- **Type:** Archivo at its condensed width (`wdth 62`) for display, Instrument Serif italic for
  editorial accents, and JetBrains Mono for metadata such as catalogue numbers and labels.
- **Imagery:** the roster photos are small, so they are rendered as halftone prints (`<Halftone>`).
  This gives every portrait the same treatment regardless of the source's quality. Swap in
  high-resolution photos later and the treatment still holds.

## Placeholder content

Taken from the Ma. Corp forum material: company info, leadership, labels, rosters, connected
businesses, departments and contacts.

**Placeholders:** the release catalogue (`content/releases.ts`), the studio room specs
(`content/studios.ts`), the social links other than Facebrowser (`app/navigation.ts`) and the
generated cover art.

## Phase 2 — where things plug in

| Feature | Where | What already exists |
|---|---|---|
| UCP sign-in | `features/auth/ucpClient.ts` | `AuthClient` contract (redirect-based: `beginSignIn` / `completeSignIn`). The Phase 1 client reports "not connected" and never fakes a session. |
| Auth callback | add route `auth/callback` in `app/App.tsx` | Call `client.completeSignIn(searchParams)`, then set the session in `AuthContext`. |
| Character selection | add route `auth/character` | `Character` type, `listCharacters` / `selectCharacter` on `AuthClient`, and step 02 already drawn in the login step rail. |
| Guarded area | `RequireAuth` | `/account` and `/studios/book` are already routed behind it. Extend it to require `session.character`. |
| Dooze Bot form | `features/booking/` | `BookingRequest`, `Booking`, `Producer`, `TimeSlot` types, plus `BOOKING_FIELDS` (the field order used by both the preview and the future form). |
| Live data | `content/index.ts` | Components only call the selectors. Make them async/fetch-backed and keep the same signatures. |
