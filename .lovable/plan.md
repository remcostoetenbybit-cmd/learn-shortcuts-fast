

## Package Showcase Template — Boilerplate

A reusable, single-page documentation/showcase template inspired by Cossistant and Facehash's design language. Placeholder content throughout — ready to be filled with any package's details later.

### Design System
- **Dark near-black background** (`#0a0a0a`) with light text (`#fafafa`) — matching the uploaded CSS audit
- **Fonts**: Geist (body), Geist Mono (code blocks), a bold condensed font for display headings (using system `font-stretch: condensed` or Inter tight as F37Stout is commercial)
- **Accent color**: Orange `#fe5101` for highlights, links, badges
- **All-lowercase aesthetic** for headings and labels
- **Generous spacing**, minimal borders, clean grid

### Page Sections (top to bottom)

1. **Navbar** — Package name left, nav links (docs, blog, changelog) center/right, search input placeholder, GitHub link
2. **Hero** — Large condensed display heading with package name, one-liner description underneath, install command with tab switcher (npm/bun/pnpm/yarn) and copy button
3. **Interactive Demo Area** — Placeholder card with "try it" label, input field, and output preview area (empty shell, ready for any package's live demo)
4. **Why Section** — "why [package]?" heading, 2-paragraph placeholder text, followed by a 4-column feature grid (icon + label + description cards, e.g. "0kb", "typed", "a11y", "ssr")
5. **API Reference** — Clean table/card layout showing props/options with name, type, default, and description columns. Placeholder rows
6. **Code Examples** — 2-3 code blocks with syntax-highlighted placeholders, each with a title and copy button. Tabbed interface for different use cases
7. **Footer** — Minimal: "built by [author]" with link, npm badge placeholder

### Components to Build
- `PackageShowcase` — main page layout
- `Navbar` — top navigation
- `HeroSection` — title + install command
- `InstallCommand` — tab switcher (npm/bun/pnpm/yarn) + copy
- `DemoSection` — interactive demo shell
- `FeatureGrid` — 4-up feature cards
- `ApiTable` — props/API reference table
- `CodeBlock` — styled code display with copy + title
- `FooterSection` — minimal footer

All sections accept props/children so the template is reusable for any package.

