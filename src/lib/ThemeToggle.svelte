<script lang="ts">
	import { onMount } from 'svelte';
	let dark = $state(false);
	let explicit = false;
	function apply(value: boolean) {
		dark = value;
		document.documentElement.dataset.theme = value ? 'dark' : 'light';
		document.documentElement.style.colorScheme = value ? 'dark' : 'light';
	}
	onMount(() => {
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		let stored: string | null = null;
		try {
			stored = localStorage.getItem('mentos-theme');
		} catch {
			/* Storage can be unavailable. */
		}
		explicit = stored === 'dark' || stored === 'light';
		apply(explicit ? stored === 'dark' : media.matches);
		const followSystem = () => {
			if (!explicit) apply(media.matches);
		};
		const followStorage = (event: StorageEvent) => {
			if (event.key !== 'mentos-theme' && event.key !== null) return;
			explicit = event.newValue === 'dark' || event.newValue === 'light';
			apply(explicit ? event.newValue === 'dark' : media.matches);
		};
		media.addEventListener('change', followSystem);
		window.addEventListener('storage', followStorage);
		return () => {
			media.removeEventListener('change', followSystem);
			window.removeEventListener('storage', followStorage);
		};
	});
	function toggle() {
		explicit = true;
		apply(!dark);
		try {
			localStorage.setItem('mentos-theme', dark ? 'dark' : 'light');
		} catch {
			/* Keep the in-session preference. */
		}
	}
</script>

<button
	class="theme-toggle"
	onclick={toggle}
	aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
	title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
>
	<svg
		width="19"
		height="19"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.6"
		aria-hidden="true"
		>{#if dark}<circle cx="12" cy="12" r="4" /><path
				d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"
			/>{:else}<path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z" />{/if}</svg
	>
</button>

<style>
	.theme-toggle {
		display: grid;
		place-items: center;
		width: 43px;
		height: 43px;
		border: 1px solid var(--line);
		border-radius: 8px;
		background: var(--surface);
		color: var(--ink);
		flex-shrink: 0;
	}
	.theme-toggle:hover {
		background: var(--mint);
	}
</style>
