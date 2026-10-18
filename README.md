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

## Theme and interactive previews

The header theme control follows the system preference until the visitor chooses light or dark. The choice is saved as `mentos-theme` in localStorage; the initial theme is applied before rendering to avoid a flash. Storage restrictions fall back to an in-session choice.

`AppPreview.svelte` contains the Spaces screen and five-destination navigation. `MobileScreens.svelte` provides Feed, Wallet, Network, You, Market, and Diagnostics. All balances, identities, listings, and network measurements are illustrative. These are browser recreations of the Flutter screens, not live connections or real transactions.

`DeepDive.svelte` contains the screen gallery, extended features, protocol guide, cryptography, custody model, and FAQ. Source references include the Flutter feature screens, native ALPN registrations, `lib/core/crypto/crypto.dart`, and `docs/COIN.md` / `docs/MARKETPLACE.md` in the mobile app. Update protocol details alongside the app as they change.
