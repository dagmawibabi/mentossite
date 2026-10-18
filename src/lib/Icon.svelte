<script lang="ts">
	let { name, size = 20 }: { name: string; size?: number } = $props();
	const paths: Record<string, string> = {
		eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm13 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z',
		back: 'M20 12H4m7-7-7 7 7 7',
		settings:
			'M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1Zm6 9a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z',
		call: 'M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4c0 2-2 3-4 2C9 19 5 15 3 7c-1-2 0-4 2-4Z',
		transfer: 'M3 7h18m-4-4 4 4-4 4M21 17H3m4-4-4 4 4 4',
		wallet: 'M3 5h17v15H3V5Zm0 0 14-3v3M15 11h7v5h-7ZM18 13.5h.01',
		market:
			'M3 9v12h18V9M2 9l2-6h16l2 6M2 9c0 4 5 4 5 0 0 4 5 4 5 0 0 4 5 4 5 0 0 4 5 4 5 0M9 21v-7h6v7',
		diagnostics: 'M2 12h4l3-8 6 16 3-8h4',
		person: 'M16 6a4 4 0 1 0-8 0 4 4 0 0 0 8 0ZM4 22v-3a8 8 0 0 1 16 0v3',
		feed: 'M3 3h18v7H3ZM3 14h18v7H3Z',
		broadcast: 'M3 10v4h4l12 5V5L7 10ZM7 14l2 7h4l-2-5M22 9v6',
		'arrow-up': 'M6 18 18 6M6 6h12v12',
		'arrow-down': 'M12 4v16m-6-6 6 6 6-6',
		'arrow-right': 'M4 12h16m-6-6 6 6-6 6',
		download: 'M12 3v12m-5-5 5 5 5-5M5 15v5h14v-5',
		key: 'M14 10a5 5 0 1 0-4 4l-7 7H0v-3l7-7M15 7h.01',
		device: 'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM10 18h4M10 5h4',
		chat: 'M21 11a9 9 0 0 1-9 9H4l-3 2 2-6a9 9 0 1 1 18-5ZM7 11h.01M12 11h.01M17 11h.01',
		spaces: 'M3 3h7v7H3ZM14 3h7v7h-7ZM3 14h7v7H3ZM17.5 14v7M14 17.5h7',
		grid: 'M3 3h7v7H3ZM14 3h7v7h-7ZM3 14h7v7H3ZM14 14h7v7h-7Z',
		file: 'M14 2H5v20h14V7Zm0 0v6h5M8 13h8M8 17h5',
		spark: 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z',
		network:
			'M9 4a3 3 0 1 0 6 0 3 3 0 0 0-6 0ZM1 20a3 3 0 1 0 6 0 3 3 0 0 0-6 0ZM17 20a3 3 0 1 0 6 0 3 3 0 0 0-6 0ZM10 7l-5 10M14 7l5 10M7 20h10',
		code: 'm8 5-7 7 7 7M16 5l7 7-7 7M14 3l-4 18',
		check: 'm5 12 4 4L19 6',
		compose: 'M12 4H4v16h16v-8M14 4l3-3 6 6-12 12H5v-6L17 1',
		search: 'M17 10a7 7 0 1 0-14 0 7 7 0 0 0 14 0Zm-2 5 6 6',
		plus: 'M12 4v16M4 12h16',
		battery: 'M2 6h17v12H2ZM22 10v4M5 9h11v6H5Z',
		chevron: 'm9 5 7 7-7 7',
		android:
			'M5 9h14v10H5ZM7 5 5 2M17 5l2-3M5 9a7 7 0 0 1 14 0M9 6h.01M15 6h.01M2 10v7M22 10v7M8 19v3M16 19v3',
		github:
			'M9 19c-4 1-4-2-6-2m12 5v-4c0-1-.4-2-1-2 4-.5 7-2 7-6 0-2-.5-3-2-4 0-1 0-3-.5-4-2 0-3 1-4 2a13 13 0 0 0-5 0C8 3 7 2 5 2c-.5 1-.5 3-.5 4C3 7 3 8 3 10c0 4 3 5.5 7 6-.6 0-1 1-1 2v4'
	};
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.65"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"><path d={paths[name] || paths.spark} /></svg
>
