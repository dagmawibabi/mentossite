<script lang="ts">
	import Icon from './Icon.svelte';
	let { screen, onNavigate }: { screen: string; onNavigate: (screen: string) => void } = $props();
	let balanceVisible = $state(false);
	let marketTab = $state('Shop');
</script>

<div class="mobile-screen">
	<div class="screen-bar">
		<h2>
			{#if screen === 'Feed'}<img src="/logo.jpg" alt="" />{:else if screen === 'Network'}<i
				></i>{/if}{screen === 'Network'
				? 'Online'
				: screen === 'Diagnostics'
					? 'Network diagnostics'
					: screen}
		</h2>
		{#if screen === 'Wallet'}<button
				aria-label={balanceVisible ? 'Hide demo balance' : 'Show demo balance'}
				onclick={() => (balanceVisible = !balanceVisible)}><Icon name="eye" size={17} /></button
			>
		{:else if screen === 'Network'}<button
				aria-label="Open diagnostics preview"
				onclick={() => onNavigate('Diagnostics')}><Icon name="diagnostics" size={18} /></button
			>
		{:else if screen === 'Market' || screen === 'Diagnostics'}<button
				aria-label="Back to main preview"
				onclick={() => onNavigate(screen === 'Market' ? 'Wallet' : 'Network')}
				><Icon name="back" size={18} /></button
			>
		{:else}<span aria-hidden="true"
				><Icon name={screen === 'You' ? 'settings' : 'plus'} size={18} /></span
			>{/if}
	</div>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex (This region scrolls independently and must be keyboard accessible.) -->
	<div class="screen-scroll" tabindex="0" role="region" aria-label={`${screen} preview content`}>
		{#if screen === 'Wallet'}
			<div class="balance-panel">
				<span>Available</span><strong
					>{balanceVisible ? '24.50' : '••••••'} <small>MNT</small></strong
				>
				<div>
					<span>In escrow <b>{balanceVisible ? '5.00' : '••••'}</b></span><span
						>Incoming <b>{balanceVisible ? '2.00' : '••••'}</b></span
					>
				</div>
				<footer>Address <code>{balanceVisible ? 'a7c2f1…b8039e' : '••••••••••••'}</code></footer>
			</div>
			<div class="quick-actions">
				<span><Icon name="arrow-up" />Send</span><span><Icon name="arrow-down" />Receive</span
				><button onclick={() => onNavigate('Market')}><Icon name="market" />Market</button><button
					onclick={() => {
						marketTab = 'Exchange';
						onNavigate('Market');
					}}><Icon name="transfer" />Get MNT</button
				>
			</div>
			<div class="mini-card">
				<Icon name="network" size={19} />
				<div>
					<strong>Explore the Mentos network</strong><small
						>Ledger, treasury and contribution rewards</small
					>
				</div>
			</div>
			<p class="section-label">ACTIVITY <span>Sample transactions</span></p>
			<div class="activity-row">
				<Icon name="arrow-down" size={18} />
				<div><strong>Received from Sam</strong><small>Witnessed · Today</small></div>
				<b>{balanceVisible ? '+ 4.50' : '••••'}</b>
			</div>
			<div class="activity-row">
				<Icon name="wallet" size={18} />
				<div><strong>Task payment held</strong><small>In escrow · Yesterday</small></div>
				<b>{balanceVisible ? '5.00' : '••••'}</b>
			</div>
		{:else if screen === 'Network'}
			<div class="mesh" aria-label="Illustrative peer connections">
				<svg viewBox="0 0 250 142" aria-hidden="true"
					><path d="M125 73 45 30M125 73l85-45M125 73 40 118M125 73l85 50M45 30l165-2" /><circle
						cx="125"
						cy="73"
						r="18"
					/><circle cx="45" cy="30" r="8" /><circle cx="210" cy="28" r="8" /><circle
						cx="40"
						cy="118"
						r="8"
					/><circle cx="210" cy="123" r="8" /><text x="125" y="76">YOU</text></svg
				>
			</div>
			<div class="stats">
				<span><b>3</b>Linked</span><span><b>2</b>Direct</span><span><b>8</b>On network</span>
			</div>
			<p class="section-label">ACTIVE CONNECTIONS <span>3</span></p>
			{#each [{ name: 'Sam', kind: 'Direct', latency: '24 ms' }, { name: 'Hana', kind: 'Direct', latency: '38 ms' }, { name: 'Mika', kind: 'Relay', latency: '92 ms' }] as peer}<div
					class="connection-row"
				>
					<span class="peer-dot"></span>
					<div><strong>{peer.name}</strong><small>{peer.kind} · QUIC</small></div>
					<code>{peer.latency}</code>
				</div>{/each}
			<p class="section-label">RELAYS <span>automatic</span></p>
			<p class="hint">
				Relays introduce phones and carry encrypted traffic when no direct path exists.
			</p>
			<button class="row-link" onclick={() => onNavigate('Diagnostics')}
				>Network diagnostics <Icon name="chevron" size={14} /></button
			>
		{:else if screen === 'Diagnostics'}
			<div class="reachable">
				<Icon name="check" size={18} /><strong>Reachable through iroh</strong>
				<p>A relay is connected. Direct paths are available to some peers.</p>
			</div>
			<div class="diagnostic-grid">
				{#each [['UDP', 'Available'], ['IPv6', 'Available'], ['Home relay', 'Connected'], ['Privacy', 'Standard']] as cell}<div
					>
						<small>{cell[0]}</small><strong>{cell[1]}</strong>
					</div>{/each}
			</div>
			<p class="section-label">RELAYS <span>latency</span></p>
			<div class="measurement"><span>Home relay</span><b>42 ms</b><i style="width:42%"></i></div>
			<div class="measurement">
				<span>Alternative relay</span><b>96 ms</b><i style="width:80%"></i>
			</div>
			<p class="section-label">LIVE CONNECTIONS <span>3</span></p>
			<div class="connection-row">
				<Icon name="device" size={18} />
				<div><strong>Sam</strong><small>Direct connection</small></div>
				<code>mentos/0</code>
			</div>
			<p class="hint">Illustrative measurements, not a live connection.</p>
		{:else if screen === 'Market'}
			<div class="escrow-banner"><Icon name="wallet" size={15} /> Payments held in escrow</div>
			<div class="market-search"><Icon name="search" size={15} />Search the network</div>
			<div class="market-tabs">
				{#each ['Shop', 'Tasks', 'Exchange', 'Resources', 'Ads', 'Plugins'] as tab}<button
						class:selected={marketTab === tab}
						aria-pressed={marketTab === tab}
						onclick={() => (marketTab = tab)}>{tab}</button
					>{/each}
			</div>
			{#if marketTab === 'Shop'}<div class="product-pair">
					<div>
						<div class="product-art"><Icon name="file" size={36} /></div>
						<strong>Field notes pack</strong><small>Digital download</small><b>3.00 MNT</b>
					</div>
					<div>
						<div class="product-art"><Icon name="device" size={36} /></div>
						<strong>Phone stand</strong><small>Handmade</small><b>8.00 MNT</b>
					</div>
				</div>
			{:else if marketTab === 'Tasks'}<div class="listing">
					<span>DESIGN</span>
					<h3>Design a community poster</h3>
					<p>Share a draft and the final print-ready file.</p>
					<b>12.00 MNT reward</b><small>Acceptance criteria · Evidence · Review</small>
				</div>
			{:else if marketTab === 'Resources'}<div class="listing">
					<span>STORAGE</span>
					<h3>Space for your encrypted files</h3>
					<p>Storage leases with periodic possession checks.</p>
					<b>2 GB available</b><small>Device measurements attached to the offer</small>
				</div>
			{:else if marketTab === 'Exchange'}<div class="listing">
					<span>MNT ↔ BIRR</span>
					<h3>Trade directly with a peer</h3>
					<p>Offers specify a rate, limits, payment methods, and a payment window.</p>
					<small>Birr is paid outside the app.</small>
				</div>
			{:else if marketTab === 'Ads'}<div class="listing">
					<span>OPT-IN CAMPAIGNS</span>
					<h3>Promote something you made</h3>
					<p>Set a budget and a daily cap. Viewers choose whether to earn from ads.</p>
				</div>
			{:else}<div class="listing">
					<span>PERSONALIZE MENTOS</span>
					<h3>Stickers, phrases & accents</h3>
					<p>Install declarative packs. Packs contain data and do not execute code.</p>
				</div>{/if}
			<p class="hint">Example listings for this website preview.</p>
		{:else if screen === 'Feed'}
			<div class="story-strip">
				{#each ['Your story', 'Sam', 'Hana', 'Mika'] as person, index}<div>
						<span>{index === 0 ? '+' : person.slice(0, 1)}</span><small>{person}</small>
					</div>{/each}
			</div>
			<div class="feed-post">
				<div class="post-person">
					<span>M</span>
					<div><strong>Mika</strong><small>2m · live</small></div>
				</div>
				<p>Taking the long way home today. Found a new favorite spot.</p>
				<div class="post-landscape"><span>Out of the city.<br />Into the afternoon.</span></div>
				<div class="post-toolbar">
					♡ 6 <Icon name="chat" size={15} /> 2 <Icon name="file" size={15} />
				</div>
			</div>
			<div class="feed-post">
				<div class="post-person">
					<span>H</span>
					<div><strong>Hana</strong><small>14m · kept</small></div>
				</div>
				<p>A few notes from the weekend. Glad we made the time.</p>
			</div>
		{:else}
			<div class="profile">
				<div class="profile-sigil"><Icon name="person" size={32} /></div>
				<h3>Alex</h3>
				<p>Making a little room for good conversations.</p>
				<code>a7c2f1…b8039e</code>
				<div class="stats">
					<span><b>12</b>Posts</span><span><b>8</b>Following</span><span><b>3</b>Keepers</span>
				</div>
			</div>
			<p class="section-label">ON THIS DEVICE</p>
			{#each ['Insights', 'Data explorer', 'Who holds what', 'Bookmarks', 'Settings'] as item}<div
					class="profile-row"
				>
					<Icon name={item === 'Settings' ? 'settings' : 'file'} size={16} />{item}<Icon
						name="chevron"
						size={13}
					/>
				</div>{/each}
		{/if}
	</div>
</div>

<style>
	.mobile-screen {
		display: flex;
		flex-direction: column;
		flex: 1 1 0 !important;
		min-height: 0;
		color: var(--app-ink);
	}
	.screen-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 18px 15px 17px;
		flex-shrink: 0;
		gap: 8px;
	}
	.screen-bar h2 {
		display: flex;
		gap: 8px;
		align-items: center;
		font-size: 21px;
		letter-spacing: -0.65px;
		font-weight: 600;
	}
	.screen-bar h2 img {
		width: 20px;
		height: 20px;
		border-radius: 5px;
	}
	.screen-bar h2 i,
	.peer-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--app-accent);
		flex-shrink: 0;
	}
	.screen-bar button {
		background: none;
		border: 0;
		color: var(--app-ink);
		padding: 3px;
	}
	.screen-scroll {
		overflow-y: auto;
		flex: 1;
		min-height: 0;
		scrollbar-width: thin;
		scrollbar-color: var(--app-line) transparent;
		overscroll-behavior: contain;
		padding-bottom: 12px;
	}
	.screen-scroll:focus-visible {
		outline: 2px solid var(--app-accent);
		outline-offset: -2px;
	}
	.balance-panel {
		margin: 0 14px;
		padding: 17px;
		border-radius: 15px;
		background: linear-gradient(125deg, #263c31, #101b15);
		color: white;
	}
	.balance-panel > span {
		font-size: 9px;
		color: #bac9c0;
	}
	.balance-panel > strong {
		display: block;
		font-size: 30px;
		letter-spacing: 1px;
		margin: 10px 0 17px;
	}
	.balance-panel strong small {
		font: 9px 'Geist Mono';
		letter-spacing: 0;
		color: #a7b9ae;
	}
	.balance-panel > div {
		display: flex;
		gap: 25px;
		font-size: 8px;
		color: #b4c4ba;
	}
	.balance-panel b {
		display: block;
		color: white;
		font: 10px 'Geist Mono';
		margin-top: 5px;
	}
	.balance-panel footer {
		padding: 12px 0 0;
		border-color: #ffffff25;
		font-size: 8px;
		margin-top: 14px;
		color: #afc0b5;
	}
	.balance-panel footer code {
		font-size: 8px;
	}
	.quick-actions {
		display: flex;
		justify-content: space-around;
		margin: 18px 10px;
	}
	.quick-actions > span,
	.quick-actions > button {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 7px;
		font-size: 9px;
		color: var(--app-ink);
		background: none;
		border: 0;
		padding: 0;
	}
	.quick-actions > button:hover {
		color: var(--app-accent);
	}
	.mini-card {
		display: flex;
		gap: 9px;
		align-items: center;
		border: 1px solid var(--app-line);
		background: var(--app-surface);
		margin: 0 14px;
		padding: 13px 10px;
		border-radius: 10px;
	}
	.mini-card strong {
		font-size: 9px;
	}
	.mini-card small {
		display: block;
		font-size: 7px;
		color: var(--app-muted);
		margin-top: 4px;
	}
	.section-label {
		display: flex;
		justify-content: space-between;
		font: 8px 'Geist Mono';
		color: var(--app-muted);
		letter-spacing: 0.5px;
		margin: 18px 14px 10px;
	}
	.section-label > span {
		font-size: 7px;
		letter-spacing: 0;
	}
	.activity-row,
	.connection-row {
		display: flex;
		align-items: center;
		gap: 9px;
		padding: 11px 14px;
		border-bottom: 1px solid var(--app-line);
	}
	.activity-row strong,
	.connection-row strong {
		font-size: 10px;
		font-weight: 500;
	}
	.activity-row small,
	.connection-row small {
		font-size: 8px;
		color: var(--app-muted);
		display: block;
		margin-top: 3px;
	}
	.activity-row > b,
	.connection-row > code {
		margin-left: auto;
		font: 8px 'Geist Mono';
		color: var(--app-accent);
	}
	.mesh {
		margin: 0 12px;
	}
	.mesh svg {
		width: 100%;
		height: 136px;
	}
	.mesh path {
		stroke: var(--app-line);
		fill: none;
		stroke-width: 1.5;
	}
	.mesh circle {
		fill: var(--app-accent-soft);
		stroke: var(--app-accent);
		stroke-width: 1;
	}
	.mesh text {
		fill: var(--app-ink);
		font: 7px 'Geist Mono';
		text-anchor: middle;
	}
	.stats {
		display: flex;
		margin: 10px 14px;
		border: 1px solid var(--app-line);
		border-radius: 13px;
		background: var(--app-surface);
	}
	.stats > span {
		flex: 1;
		text-align: center;
		padding: 13px 0;
		font-size: 8px;
		color: var(--app-muted);
	}
	.stats > span + span {
		border-left: 1px solid var(--app-line);
	}
	.stats b {
		display: block;
		font-size: 17px;
		margin-bottom: 4px;
		color: var(--app-ink);
		font-weight: 500;
	}
	.hint {
		font-size: 8px;
		line-height: 1.8;
		color: var(--app-muted);
		margin: 12px 14px;
	}
	.row-link {
		display: flex;
		justify-content: space-between;
		width: calc(100% - 28px);
		padding: 10px;
		border: 1px solid var(--app-line);
		border-radius: 7px;
		background: var(--app-surface);
		color: var(--app-ink);
		margin: 14px;
		font-size: 9px;
	}
	.reachable {
		background: var(--app-accent-soft);
		margin: 0 14px 15px;
		padding: 12px;
		border-radius: 10px;
		font-size: 10px;
	}
	.reachable > :global(svg) {
		vertical-align: middle;
		margin-right: 5px;
	}
	.reachable strong {
		font-size: 10px;
	}
	.reachable p {
		font-size: 8px;
		line-height: 1.8;
		margin-top: 8px;
		color: var(--app-soft);
	}
	.diagnostic-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin: 0 14px;
		gap: 8px;
	}
	.diagnostic-grid > div {
		border: 1px solid var(--app-line);
		border-radius: 8px;
		padding: 12px;
		background: var(--app-surface);
	}
	.diagnostic-grid small {
		display: block;
		color: var(--app-muted);
		font: 8px 'Geist Mono';
	}
	.diagnostic-grid strong {
		display: block;
		font-size: 10px;
		margin-top: 7px;
		font-weight: 500;
	}
	.measurement {
		display: flex;
		justify-content: space-between;
		margin: 12px 14px;
		position: relative;
		padding-bottom: 10px;
		font: 8px 'Geist Mono';
	}
	.measurement i {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 3px;
		border-radius: 2px;
		background: var(--app-accent);
	}
	.escrow-banner {
		display: flex;
		gap: 7px;
		align-items: center;
		background: var(--app-accent-soft);
		padding: 10px 14px;
		font-size: 9px;
		color: var(--app-accent);
	}
	.market-search {
		display: flex;
		gap: 8px;
		align-items: center;
		background: var(--app-raised);
		border-radius: 9px;
		margin: 12px 14px;
		padding: 10px;
		color: var(--app-muted);
		font-size: 9px;
	}
	.market-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		padding: 0 14px 12px;
	}
	.market-tabs button {
		border: 1px solid var(--app-line);
		border-radius: 20px;
		padding: 6px 9px;
		font-size: 8px;
		background: var(--app-surface);
		color: var(--app-muted);
	}
	.market-tabs button.selected {
		background: var(--app-ink);
		color: var(--app-bg);
		border-color: var(--app-ink);
	}
	.product-pair {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin: 0 14px;
	}
	.product-pair > div {
		border: 1px solid var(--app-line);
		border-radius: 9px;
		overflow: hidden;
		padding-bottom: 12px;
	}
	.product-art {
		height: 90px;
		background: var(--app-raised);
		display: grid;
		place-items: center;
		color: var(--app-muted);
		margin-bottom: 10px;
	}
	.product-pair strong,
	.product-pair small,
	.product-pair b {
		display: block;
		margin: 6px 8px;
		font-size: 9px;
	}
	.product-pair small {
		font-size: 8px;
		color: var(--app-muted);
	}
	.product-pair b {
		font: 10px 'Geist Mono';
		color: var(--app-accent);
	}
	.listing {
		margin: 0 14px;
		border: 1px solid var(--app-line);
		padding: 17px;
		border-radius: 10px;
		background: var(--app-surface);
	}
	.listing > span {
		font: 8px 'Geist Mono';
		color: var(--app-muted);
	}
	.listing h3 {
		font-size: 17px;
		line-height: 1.3;
		margin: 12px 0;
		font-weight: 500;
	}
	.listing p {
		font-size: 10px;
		line-height: 1.8;
		color: var(--app-muted);
	}
	.listing b,
	.listing small {
		display: block;
		margin-top: 15px;
		font-size: 9px;
	}
	.listing b {
		color: var(--app-accent);
	}
	.listing small {
		color: var(--app-muted);
		line-height: 1.7;
	}
	.story-strip {
		display: flex;
		justify-content: space-around;
		padding: 4px 10px 17px;
		border-bottom: 1px solid var(--app-line);
	}
	.story-strip > div {
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 7px;
	}
	.story-strip span {
		display: grid;
		place-items: center;
		height: 33px;
		width: 33px;
		border-radius: 12px;
		background: var(--app-raised);
		outline: 1px solid var(--app-accent);
		outline-offset: 3px;
		font-size: 13px;
	}
	.story-strip small {
		font-size: 8px;
		color: var(--app-muted);
	}
	.feed-post {
		padding: 16px 14px;
		border-bottom: 1px solid var(--app-line);
	}
	.post-person {
		display: flex;
		gap: 8px;
		align-items: center;
	}
	.post-person > span {
		width: 28px;
		height: 28px;
		border-radius: 10px;
		background: var(--app-raised);
		display: grid;
		place-items: center;
		font-size: 10px;
	}
	.post-person strong {
		font-size: 10px;
	}
	.post-person small {
		display: block;
		font-size: 8px;
		color: var(--app-muted);
		margin-top: 3px;
	}
	.feed-post > p {
		font-size: 11px;
		line-height: 1.65;
		margin: 12px 0;
	}
	.post-landscape {
		height: 100px;
		border-radius: 9px;
		background: linear-gradient(155deg, #b9c9bb 35%, #809579 35%, #536d56 68%, #344d39 68%);
		display: flex;
		align-items: flex-end;
		padding: 12px;
		color: #fff;
		font-size: 11px;
	}
	.post-toolbar {
		display: flex;
		gap: 10px;
		align-items: center;
		font-size: 10px;
		color: var(--app-muted);
		margin-top: 12px;
	}
	.profile {
		text-align: center;
		padding: 10px 0;
	}
	.profile-sigil {
		display: grid;
		place-items: center;
		width: 58px;
		height: 58px;
		border-radius: 18px;
		margin: auto;
		background: var(--app-raised);
	}
	.profile h3 {
		font-size: 20px;
		margin: 12px 0 8px;
	}
	.profile p {
		font-size: 9px;
		line-height: 1.8;
		color: var(--app-muted);
		padding: 0 20px;
	}
	.profile code {
		display: block;
		font-size: 8px;
		color: var(--app-muted);
		margin: 8px;
	}
	.profile-row {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 10px;
		margin: 0 14px;
		padding: 12px 0;
		border-bottom: 1px solid var(--app-line);
	}
	.profile-row > :global(svg:last-child) {
		margin-left: auto;
	}
</style>
