# Requirements: Journey Section

## Introduction

This document defines the functional requirements for redesigning the existing Gallery section into a premium "Journey" section. The route `/gallery` is retained. The entire UI is replaced with an interactive chronological timeline of 7 events, each displayed as a story card that opens a rich full-screen modal.

---

## Requirements

### 1. Section Rename and Header Copy

**User Story**: As a portfolio visitor, I want to see the section branded as "Journey" with a compelling subtitle, so I understand it is a personal narrative rather than a photo dump.

**Acceptance Criteria**:

- 1.1 The page `<h1>` or section heading displays the text "Journey".
- 1.2 A subtitle reads: "The experiences, people, projects, and milestones that have shaped my journey as an engineer, leader, and lifelong learner."
- 1.3 The DOM section formerly labelled "Gallery" is replaced; no "Gallery" heading remains visible.

**Correctness Properties**:
- **Example**: Rendering the JourneyPage produces a heading element with text "Journey" and a subtitle element matching the specified copy.

---

### 2. Story Cards

**User Story**: As a visitor, I want each event shown as a rich interactive card so I can quickly scan all milestones at a glance.

**Acceptance Criteria**:

- 2.1 Each card displays: cover image (if photos exist), year, month (if provided), event title, location, role, short description (`summary`), tags, and a "View Story" button.
- 2.2 If no cover photo is available, a styled placeholder gradient is shown instead of a broken image.
- 2.3 Tags are displayed as styled pill badges.
- 2.4 The "View Story" button is a distinct, accessible interactive element (`<button>` or `<a role="button">`).
- 2.5 Cards animate in (fade + slide-up) when they scroll into the viewport via IntersectionObserver.
- 2.6 Hovering a card applies an elevation effect (translateY upward + box-shadow increase).
- 2.7 The cover image zooms slightly on card hover (CSS `scale` transform on the `<img>`).

**Correctness Properties**:
- **Example**: Given an `EventEntry` with all fields populated, `StoryCard` renders all 8 required fields in the DOM.
- **Example**: Given an `EventEntry` with no `photoFolder`, the card renders without a `<img>` cover and shows a placeholder element instead.
- **Example**: The "View Story" `<button>` has an accessible `aria-label` or visible text label.

---

### 3. Timeline Layout

**User Story**: As a visitor, I want to see events arranged chronologically by year with clear year headings and connectors, so I can follow the narrative arc.

**Acceptance Criteria**:

- 3.1 Events are grouped by `year` and displayed in ascending order: 2023 → 2024 → 2025 → 2026.
- 3.2 Each year group has a visible year heading styled with the lime-green accent colour (`#D2FF00`).
- 3.3 A vertical timeline connector line runs between year groups.
- 3.4 Within a year group, cards are displayed in the order they appear in the `EVENTS` array.
- 3.5 Year headings reveal via IntersectionObserver scroll animation.

**Correctness Properties**:
- **Property**: For any `EventEntry[]` input, `groupEventsByYear(events)` returns `YearGroup[]` where:
  - Every input event appears in exactly one group (no duplication, no loss).
  - Groups are sorted in ascending order by `year`.
  - Each group's `events` array contains only events matching that `year`.
- **Example**: Rendering `JourneyTimeline` with the 7 canonical events produces exactly 4 year-group headings: "2023", "2024", "2025", "2026".
- **Example**: The connector element (`.timeline-connector` or equivalent) is present in the rendered DOM between year groups.

---

### 4. Story Modal

**User Story**: As a visitor, I want to open a full-screen story for any event to read the full narrative, see photos, and navigate to adjacent events.

**Acceptance Criteria**:

- 4.1 Clicking "View Story" on any card opens the `StoryModal` for that event.
- 4.2 The modal contains:
  - a. Large hero image (first photo or placeholder)
  - b. Event overview (title + date + location + role)
  - c. Full story (`description` field)
  - d. Key highlights list (`highlights[]`)
  - e. Lessons learned list (`lessonsLearned[]`), if the field is non-empty
  - f. Photo gallery (multi-photo lightbox with prev/next controls and thumbnail strip)
  - g. Related technologies (`technologies[]` or `tags[]`), if non-empty
  - h. Pull quote (`quote` field), if present
  - i. Estimated impact (`estimatedImpact` field), if present
  - j. Prev / Next event navigation buttons
- 4.3 The hero image has a parallax scroll effect within the modal.
- 4.4 The modal opens with a smooth CSS transition (opacity + scale).
- 4.5 The modal closes with a smooth CSS transition when the close button or backdrop is clicked.
- 4.6 While the modal is open, `document.body` has `overflow: hidden` to prevent background scrolling.
- 4.7 The modal is rendered in a React portal on `document.body` to avoid stacking context issues.
- 4.8 Modal sections for optional fields (`lessonsLearned`, `quote`, `estimatedImpact`) are omitted from the DOM entirely when those fields are absent or empty.

**Correctness Properties**:
- **Example**: Rendering `StoryModal` with a fully-populated `EventEntry` produces DOM elements for all 10 required content areas listed in 4.2.
- **Example**: `document.body.style.overflow` is `"hidden"` while the modal is open and restored to `""` after close.
- **Example**: Rendering `StoryModal` with an `EventEntry` that has no `quote` field produces no quote DOM element.
- **Edge case**: Opening then immediately closing the modal removes the `overflow: hidden` from `document.body`.

---

### 5. Modal Photo Lightbox

**User Story**: As a visitor, I want to browse through all photos of an event inside the story modal.

**Acceptance Criteria**:

- 5.1 All photos for the event are fetched from `/api/event-photos?folder=events/{event.id}` when the modal opens.
- 5.2 Photos are displayed in a scrollable lightbox with a full-size active image and a thumbnail strip.
- 5.3 Prev / next controls navigate between photos.
- 5.4 Clicking a thumbnail jumps to that photo.
- 5.5 If zero photos are returned, the photo gallery section is hidden.
- 5.6 The active thumbnail is visually distinguished (lime-green border).

**Correctness Properties**:
- **Example**: Given `photos = [p1, p2, p3]` and `activeIndex = 0`, clicking "next" sets `activeIndex` to 1.
- **Example**: Given `photos = [p1, p2, p3]` and `activeIndex = 2`, clicking "next" wraps to `activeIndex = 0`.
- **Example**: When `photos = []`, the photo gallery container is not rendered.

---

### 6. Prev/Next Event Navigation

**User Story**: As a visitor reading a story, I want to navigate to the previous or next event without closing the modal.

**Acceptance Criteria**:

- 6.1 The modal displays a "Previous" button (disabled or hidden at the first event) and a "Next" button (disabled or hidden at the last event).
- 6.2 Clicking "Previous" loads the preceding event's data and photos.
- 6.3 Clicking "Next" loads the following event's data and photos.
- 6.4 Event order for prev/next follows the chronological sort order of the `EVENTS` array.

**Correctness Properties**:
- **Property**: For any sorted `EventEntry[]` and any `activeId`, `getAdjacentEvents(events, activeId)` satisfies:
  - `prevId` is `null` when `activeId` is the first element.
  - `nextId` is `null` when `activeId` is the last element.
  - `prevId` and `nextId` are the immediately adjacent IDs otherwise.
- **Example**: For `activeId = "incridea-2023"` (first event), `prevId === null`.
- **Example**: For `activeId = "ethmumbai-2026"` (last event), `nextId === null`.

---

### 7. Keyboard Navigation

**User Story**: As a keyboard user, I want to control the modal with keyboard shortcuts.

**Acceptance Criteria**:

- 7.1 Pressing `Escape` closes the modal.
- 7.2 Pressing `ArrowLeft` navigates to the previous event (same as clicking the Prev button).
- 7.3 Pressing `ArrowRight` navigates to the next event (same as clicking the Next button).
- 7.4 The event listener is removed when the modal closes (no memory leaks).

**Correctness Properties**:
- **Example**: Firing a `keydown` event with `key: "Escape"` while the modal is open calls `onClose`.
- **Example**: Firing `ArrowRight` navigates to the next event; firing `ArrowLeft` navigates to the previous event.

---

### 8. Event Data

**User Story**: As a developer, I need the `EVENTS` array to contain the 7 canonical events with all required fields so the Journey section renders correctly.

**Acceptance Criteria**:

- 8.1 `EVENTS` contains exactly 7 entries.
- 8.2 The 7 entries have these IDs in this order: `incridea-2023`, `incridea-2024`, `ethglobal-delhi`, `incridea-2025`, `pizza-connections`, `blockchain-club-inauguration`, `ethmumbai-2026`.
- 8.3 Each entry has non-empty `id`, `title`, `year`, `date`, `location`, `role`, `summary`, `description`, `highlights` (at least 1 item), and `tags` (at least 1 item).
- 8.4 Each entry has `photoFolder` set to `"events/{id}"`.
- 8.5 The `EventEntry` type is extended with optional fields: `lessonsLearned`, `technologies`, `quote`, `estimatedImpact`, `month`.

**Correctness Properties**:
- **Example**: `EVENTS.length === 7`.
- **Example**: Every `EventEntry` in `EVENTS` passes a validation check: `id`, `title`, `year`, `location`, `summary`, `highlights.length > 0`, `tags.length > 0` are all truthy/non-empty.
- **Example**: `EVENTS.every(e => e.photoFolder === \`events/${e.id}\`)`.

---

### 9. Photo API Integration

**User Story**: As a developer, I need photos to be fetched from the correct API endpoint for each event.

**Acceptance Criteria**:

- 9.1 `StoryCard` fetches its cover photo from `/api/event-photos?folder=events/{event.id}` on mount, but only if `event.photoFolder` is set.
- 9.2 `StoryModal` fetches all photos for the active event from the same endpoint when the modal opens.
- 9.3 Fetch errors are caught silently; the UI degrades to a photo-less state.
- 9.4 A fetch is not re-triggered if the same event is re-opened (caching via `useRef` flag or similar).

**Correctness Properties**:
- **Example**: `StoryCard` with `event.photoFolder = "events/pizza-connections"` calls `fetch` with URL containing `folder=events%2Fpizza-connections`.
- **Example**: `StoryCard` with no `photoFolder` does not call `fetch`.
- **Edge case**: When the API returns `{ images: [] }`, no cover image is rendered and no JS error is thrown.

---

### 10. Design and Accessibility

**User Story**: As a visitor, I want the Journey section to match the portfolio's existing dark premium aesthetic and be fully accessible.

**Acceptance Criteria**:

- 10.1 Background colour uses `var(--color-bg)` (resolves to `#111112` in dark mode).
- 10.2 Accent colour uses `#D2FF00` (lime-green) for year labels, tag borders, and interactive highlights — consistent with existing usage.
- 10.3 Card backgrounds use `var(--card-bg)` and `var(--card-border)` CSS variables.
- 10.4 Headings use `var(--font-header)`.
- 10.5 The layout is mobile-first and responsive, with appropriate single-column stacking on screens < 768px.
- 10.6 All interactive elements (cards, buttons, modal close, nav arrows) have visible focus styles and `aria-label` attributes where text is absent.
- 10.7 The modal has `role="dialog"` and `aria-modal="true"`.
- 10.8 The modal traps focus while open (focus returns to the trigger element on close).

**Correctness Properties**:
- **Example**: The `StoryModal` element has attributes `role="dialog"` and `aria-modal="true"`.
- **Example**: The modal close button has a non-empty `aria-label`.
- **Example**: All tag pill `<span>` elements are non-interactive (not focusable) — they are decorative.

---

### 11. DomeGallery Retention

**User Story**: As a visitor, I want to see the interactive 3D sphere gallery at the top of the Journey page as an engaging visual intro.

**Acceptance Criteria**:

- 11.1 The DomeGallery component is retained at the top of the page in a full-viewport-height section.
- 11.2 The dome section has the page `<h1>` "Journey" overlaid in the header.
- 11.3 The dome fetches images from `/api/gallery` (unchanged behaviour).
- 11.4 The dome section has a bottom border (`1px solid rgba(210, 255, 0, 0.2)`) separating it from the timeline.

**Correctness Properties**:
- **Example**: The DomeGallery component is rendered within the page and receives an `images` prop.
- **Example**: On fetch failure, the dome renders with its built-in `DEFAULT_IMAGES` fallback.

---

### 12. Navigation Label

**User Story**: As a visitor using the primary navigation, I want the nav link to reflect the section's identity.

**Acceptance Criteria**:

- 12.1 The `PrimaryNav` component's link to `/gallery` has its label updated from "Gallery" to "Journey".

**Correctness Properties**:
- **Example**: `NAV_ITEMS` contains an entry with `{ label: "Journey", href: "/gallery" }`.
