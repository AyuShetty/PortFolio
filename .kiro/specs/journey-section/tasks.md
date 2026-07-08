# Tasks: Journey Section

## Implementation Plan

### Phase 1 — Data Layer

- [x] 1.1 Extend `EventEntry` type in `experience-data.ts` with optional fields: `month`, `lessonsLearned`, `technologies`, `quote`, `estimatedImpact`
- [x] 1.2 Replace the `EVENTS` array with the 7 canonical entries (incridea-2023, incridea-2024, ethglobal-delhi, incridea-2025, pizza-connections, blockchain-club-inauguration, ethmumbai-2026), each with full data and `photoFolder: "events/{id}"`
- [x] 1.3 Update `PrimaryNav` NAV_ITEMS: change label from "Gallery" to "Journey" for the `/gallery` href

### Phase 2 — Utility Functions

- [x] 2.1 Create `groupEventsByYear(events: EventEntry[]): YearGroup[]` — sorts events ascending by year, groups by year string
- [x] 2.2 Create `getAdjacentEvents(events: EventEntry[], activeId: string): { prevId: string | null; nextId: string | null }` — returns IDs of prev/next events in sorted order

### Phase 3 — Components

- [x] 3.1 Build `StoryCard` component: cover image (lazy fetch), year/month badge, title, location, role, summary, floating tags, "View Story" button; IntersectionObserver scroll-reveal
- [x] 3.2 Build `PhotoLightbox` sub-component: full-size image, prev/next controls, thumbnail strip, active thumbnail highlight
- [x] 3.3 Build `StoryModal` component: hero image with parallax, all story content sections (overview, role, description, highlights, lessonsLearned, photo gallery via PhotoLightbox, technologies, quote, estimatedImpact), prev/next event navigation, keyboard handlers, body scroll lock, React portal, open/close CSS transitions
- [x] 3.4 Build `JourneyTimeline` component: groups events by year via `groupEventsByYear`, renders `YearGroup` headings + `StoryCard` grid + vertical connector lines; IntersectionObserver for year heading reveal
- [x] 3.5 Rewrite `JourneyPage` (`src/app/gallery/page.tsx`): render DomeGallery section (unchanged) + JourneyTimeline; manage `activeEventId` state for modal; updated section heading to "Journey" with subtitle

### Phase 4 — Styles

- [x] 4.1 Rewrite `gallery.css` with all new styles: journey page layout, timeline structure, year group headings, connector lines, story card (cover, badge, content, tags, button), story modal (backdrop, panel, hero, sections, photo lightbox, nav), all animations (scroll-reveal, hover elevation, image zoom, modal open/close, tag float, hero parallax), responsive breakpoints (mobile-first, ≤768px, ≤480px)

### Phase 5 — Verification

- [x] 5.1 Check TypeScript diagnostics on modified/new files (no type errors)
- [x] 5.2 Verify all 7 events render as cards in the correct year groups (2023×1, 2024×1, 2025×2, 2026×3)
- [x] 5.3 Verify StoryModal opens, displays content, and closes correctly for at least two events
- [x] 5.4 Verify photo fetch works for `pizza-connections` and `blockchain-club-inauguration` (folders with real images)
- [x] 5.5 Verify keyboard navigation: Escape closes modal, ArrowLeft/ArrowRight navigates events
- [x] 5.6 Verify PrimaryNav shows "Journey" label
