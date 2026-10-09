<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project rules

- All portal data flows through `src/services/portal.ts` adapters over mock data — so real Vivo APIs can replace them without UI changes.
- The active demo persona lives in `src/lib/persona.tsx` context; every page personalizes from that profile — one component system for all lifecycle stages.
- Visual style mirrors the existing Revive Style Studio quiz via tokens and `caps`/`arch` utilities in `src/styles.css` — keeps the brand consistent.
- Consultation requests use an in-memory service adapter exposed through persona context; this keeps demo data private to the session and leaves the Vivo integration replaceable.
- Style-to-image selection lives in the portal adapter so homepage presentation follows the profile without embedding data-selection logic.
- Supplied Revive editorial content and original screenshot crops are served through the portal adapter, keeping copy and assets separate from the page layout.
