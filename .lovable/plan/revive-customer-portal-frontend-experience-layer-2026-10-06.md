# Revive Customer Portal — Frontend Experience Layer

Build the customer-facing Revive portal as a premium, editorial, personalized experience that adapts to each homeowner's journey stage. No new CRM or backend — a clean service-adapter layer with realistic mock data, ready to wire to the existing Vivo backend later.

## Visual direction

Matches the existing Revive Style Studio quiz (revivequiz.lovable.app) so the whole experience feels like one product:

- **Colors**: warm off-white background (~#F6F5F1), deep charcoal text (~#1F2328), Revive blue accent (~#0B6FB3) for buttons, links, italic highlights and thin rules; soft gray dividers. Optional thin blue announcement bar at the top ("Your complete interior remodeling solution").
- **Typography**: Playfair Display for headlines, with key words in blue italic (e.g. "Welcome back, *Sarah*"); Cinzel in wide-tracked small caps for eyebrows, nav labels and buttons ("THE REVIVE STYLE STUDIO", "BEGIN"); Inter light/regular for body.
- **Shapes and details**: square-cornered solid blue buttons with a soft blue glow shadow; short blue hairline under eyebrows; arched photo frames with thin blue outline, overlapping circular and framed inset photos; minimal borders, no heavy rounded cards.
- **Brand elements**: REVIVE wordmark, "Winner of 23 NARI CotY Awards" laurel badge, "Tampa ◆ Orlando" footer line.
- **Layout**: generous whitespace, editorial split layouts. Persistent left sidebar on desktop in the same style, collapsing on tablet, drawer nav on mobile. Warm, light-oak interior photography consistent with the quiz imagery.

## Architecture

**Service adapter layer** (`src/services/`): `customer.ts`, `designStudio.ts`, `materials.ts`, `projects.ts`, `content.ts`, `portal.ts` — exposing normalized functions like `getCustomerPortalProfile()`, `getCustomerNextStep()`, `getDesignProfile()`, `getSavedMaterials()`, `getRecommendedMaterials/Projects/Articles()`, `getProjectSummary()`. Mock implementations now; real APIs drop in later without UI changes.

**Central customer profile object** matching the brief (lifecycleStage, designQuiz, materials, engagement, project) drives all personalization.

**Reusable components**: PortalShell, PortalSidebar, PortalHeader, CustomerHero, NextStepCard, StyleProfileCard, DesignQuizCard, SavedMaterialsGrid, MaterialRecommendationCard, RecommendedProjects, RecommendedArticles, ConsultationCard, ProjectStatusCard, ProjectTimeline, TeamCard, AskReviveDrawer, WhyRevive, EmptyState, LoadingState.

## Pages

- **Home** — adaptive dashboard assembled from the profile: personalized hero, one prominent NextStepCard, then stage-appropriate sections (Style Profile, Saved Materials, Recommended Materials/Projects/Articles, Consultation, Project Status, Why Revive, Talk to Our Team)
- **Design Studio** — quiz-incomplete state ("Discover Your Style" CTA) vs. completed Style Profile (style imagery, colors, materials, complementary styles, recommended projects)
- **Material Sheet** — browsable catalog by category (cabinetry, countertops, backsplash, flooring, hardware, paint, fixtures) with save/favorite; no internal pricing
- **Our Work** — photography-heavy project gallery, ordered by customer style/project type
- **Articles** — editorial reading section, data-driven recommendations
- **About Revive** — Why Revive content, team, Tampa roots
- **Active-customer sections** (Persona 5 only): Project Overview, Schedule, Documents, Payments, Messages, Team — UI shells fed by mock adapters
- **Ask Us Anything** — polished chat drawer UI, independent of final backend

## Personalization

One component system, five demo personas (Sarah – new prospect; Michael – quiz complete; Jennifer – engaged, 5 saved materials; Persona 4 – booked, proposal pending; Persona 5 – active renovation). Navigation, hero, next step, and homepage sections all change from profile data. Elegant empty states everywhere (no empty cards). A developer-only persona switcher lets you preview all five states instantly.

## Technical notes

- TanStack Start routes per page, each with unique head() metadata
- Design tokens in `src/styles.css` (oklch), serif display + sans body fonts loaded via `<link>` in `__root.tsx`
- AI-generated imagery saved to `src/assets/` (hero kitchen, style thumbnails, material swatches, project photos, article covers)
- WCAG 2.2 AA: keyboard nav, focus states, contrast, labeled controls, accessible drawer
- No backend, auth, or database in this pass — everything runs on the mock adapter layer
