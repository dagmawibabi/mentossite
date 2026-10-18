# Mentos site

SvelteKit landing page for the Mentos Android app. Includes a responsive hero, an interactive illustrative app preview, feature descriptions, and GitHub release links.

## Development

```sh
pnpm install
pnpm dev
```

## Validation and build

```sh
pnpm check
pnpm build
```

The existing Vercel adapter is retained. Nothing has been deployed.

Content is in `src/routes/+page.svelte`, global styles in `src/routes/layout.css`, and icons in `src/lib/Icon.svelte`. Fonts and the logo are local assets from the mobile app. Preview conversations are fictional illustrations, not real user data. Download buttons lead to the latest GitHub release so the link stays current.
