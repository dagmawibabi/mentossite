<script lang="ts">
	import AppPreview from './AppPreview.svelte';
	import Icon from './Icon.svelte';
	const repo = 'https://github.com/dagmawibabi/mentos';
	const capabilities = [
		{
			icon: 'chat',
			title: 'Messages with a delivery trail',
			body: 'Direct messages use a durable queue for each recipient. Mentos distinguishes sending from delivery: an authenticated acknowledgement confirms arrival, and a separate receipt can confirm that it was read.',
			detail:
				'Pin, mute, archive, and organize conversations into folders. Group invitations are accepted before keys are shared; removing a member rotates the group key.'
		},
		{
			icon: 'call',
			title: 'Calls, streams, and live sharing',
			body: 'Voice and video calls use their own media transport. Mentos also includes live streaming and live location sharing inside conversations.',
			detail:
				'Call media is accepted only from peers registered for that call. Real-time sharing depends on the participating devices being reachable.'
		},
		{
			icon: 'feed',
			title: 'Posts, stories, and communities',
			body: 'Publish posts, share stories, save drafts, and bookmark content. Spaces bring channels and forums together, while broadcasts let people subscribe to an author.',
			detail:
				'Public spaces can be discovered through marketplace directory listings. Posts are available from an online source or a device that has agreed to keep a copy.'
		},
		{
			icon: 'file',
			title: 'Files with explicit custody',
			body: 'Manage transfers and inspect who holds what. Your content, content you agreed to keep, and temporary live content are treated differently.',
			detail:
				'Storage leases encrypt files on the renter’s phone. The provider receives ciphertext without the key, and periodic possession checks control escrow payouts.'
		},
		{
			icon: 'device',
			title: 'Put spare capacity to work',
			body: 'Offer storage or a supported compute task through the marketplace. Device checks measure CPU throughput, memory, free storage, disk speeds, and network conditions.',
			detail:
				'Compute jobs use a fixed menu: compression, photo resizing and compression, and proof-of-work stamps. The renter verifies results before releasing payment; submitted files are not executed as code.'
		},
		{
			icon: 'person',
			title: 'An identity you can take with you',
			body: 'Create an identity without an email address or phone number. Switch between local identities, protect access with a PIN, inspect stored data, and export your information.',
			detail:
				'The 24-word recovery phrase restores the identity key. Recovering the key alone does not recover every locally stored message or file; keep a data backup as well.'
		}
	];
	const protocols = [
		{
			name: 'Direct messages',
			protocol: 'mentos/0',
			what: 'Authenticated messages, receipts, payments, and control traffic over encrypted QUIC streams.',
			note: 'Delivery is tracked per recipient. Broadcasting a message does not count as delivery.'
		},
		{
			name: 'File transfer',
			protocol: 'mentos-blob/0',
			what: 'Content-addressed blob transfer, with SHA-256 checks before accepting a completed file.',
			note: 'The native transport also carries blobs on an existing direct connection; the blob protocol supports peers using a separate file connection.'
		},
		{
			name: 'Shared updates',
			protocol: 'iroh-gossip',
			what: 'Topic-based distribution for feeds, groups, spaces, marketplace listings, and the ledger.',
			note: 'Topic IDs are derived from labels. Signatures and scope checks still decide which updates a device accepts.'
		},
		{
			name: 'Live call media',
			protocol: 'mentos-call/0',
			what: 'A QUIC connection per call peer, using unreliable datagrams for real-time media.',
			note: 'Media is accepted only for peers invited to the registered call, so an open transport is not an open microphone.'
		}
	];
</script>

<section class="inside-section" aria-labelledby="inside-heading">
	<div class="section-heading">
		<div>
			<p class="eyebrow">TAKE A CLOSER LOOK</p>
			<h2 id="inside-heading">The app, from the inside.</h2>
		</div>
		<p>
			Captured directly from the Flutter app.<br />Real widgets, fonts, and navigation. Demonstration data.
		</p>
	</div>
	<div class="screen-gallery">
		<article>
			<div class="gallery-label">
				<span>WALLET</span>
				<p>Balances, escrow, and activity.</p>
			</div>
			<AppPreview screen="Wallet" />
		</article>
		<article>
			<div class="gallery-label">
				<span>NETWORK</span>
				<p>Peers, direct paths, and relays.</p>
			</div>
			<AppPreview screen="Network" />
		</article>
		<article>
			<div class="gallery-label">
				<span>PLUGINS</span>
				<p>Native tools. Made by you.</p>
			</div>
			<AppPreview screen="Plugins" />
		</article>
	</div>
</section>
<section class="capability-section" aria-labelledby="capability-heading">
	<div class="section-heading">
		<div>
			<p class="eyebrow">THE DETAILS MAKE IT YOURS</p>
			<h2 id="capability-heading">More than a place to talk.</h2>
		</div>
		<p>Everyday social features, with controls<br />for the data and devices behind them.</p>
	</div>
	<div class="capability-grid">
		{#each capabilities as item}<article>
				<Icon name={item.icon} size={23} />
				<h3>{item.title}</h3>
				<p>{item.body}</p>
				<details>
					<summary>A little more detail <Icon name="plus" size={15} /></summary>
					<p>{item.detail}</p>
				</details>
			</article>{/each}
	</div>
</section>
<section id="protocols" class="protocol-section" aria-labelledby="protocol-heading">
	<div class="section-heading">
		<div>
			<p class="eyebrow">BUILT ON OPEN PROTOCOLS</p>
			<h2 id="protocol-heading">One identity.<br />Several ways to connect.</h2>
		</div>
		<p>
			A Rust iroh endpoint handles networking.<br />The Dart engine verifies, routes, and stores<br
			/>what the Flutter app presents.
		</p>
	</div>
	<div class="stack-strip">
		<span><b>Flutter</b>Interface</span><Icon name="arrow-right" size={17} /><span
			><b>Dart engine</b>Signatures & delivery</span
		><Icon name="arrow-right" size={17} /><span><b>iroh / QUIC</b>Encrypted connections</span><Icon
			name="arrow-right"
			size={17}
		/><span><b>Your peers</b>Other devices</span>
	</div>
	<div class="protocol-list">
		{#each protocols as row}<article>
				<div>
					<h3>{row.name}</h3>
					<code>{row.protocol}</code>
				</div>
				<div>
					<p>{row.what}</p>
					<small>{row.note}</small>
				</div>
			</article>{/each}
	</div>
	<div class="gossip-note">
		<Icon name="network" size={22} />
		<div>
			<h3>Different conversations, different topics.</h3>
			<p>
				Feeds, spaces, and groups use author- or group-specific topics. Marketplace listings
				propagate on <code>mentos-market-v1</code>; the current coin ledger uses
				<code>mentos-coin-v3</code>. Devices exchange summaries to discover missing records when
				they connect.
			</p>
		</div>
	</div>
	<a class="text-link" href={`${repo}/tree/main/native/src`} target="_blank" rel="noreferrer"
		>Read the native transport source <Icon name="arrow-up" size={15} /></a
	>
</section>
<section class="trust-section" aria-labelledby="trust-heading">
	<div class="section-heading">
		<div>
			<p class="eyebrow">WHAT PROTECTS WHAT</p>
			<h2 id="trust-heading">Privacy in layers.</h2>
		</div>
		<p>Identity, transport, storage, and sharing<br />each have a different job.</p>
	</div>
	<div class="trust-grid">
		<article>
			<span class="micro-label">IDENTITY & AUTHENTICITY</span>
			<h3>Ed25519 signatures</h3>
			<p>
				Your public key is your user ID and iroh endpoint identity. Signed envelopes preserve the
				author’s exact payload; recipients verify signatures and permissions before accepting it.
			</p>
			<code>Ed25519 · BIP39</code>
		</article>
		<article>
			<span class="micro-label">GROUPS & SHARED SPACES</span>
			<h3>Sealed group traffic</h3>
			<p>
				XChaCha20-Poly1305 seals shared group and space payloads. Membership controls who receives a
				key, and keys rotate when members leave.
			</p>
			<code>XChaCha20-Poly1305</code>
		</article>
		<article>
			<span class="micro-label">FILES & LOCAL DATA</span>
			<h3>Encryption on the device</h3>
			<p>
				The local database is encrypted. The file-encryption helper uses chunked AES-256-GCM with a
				fresh key per file; SHA-256 identifies and verifies transferred blobs.
			</p>
			<code>AES-256-GCM · SHA-256</code>
		</article>
	</div>
	<div class="custody">
		<div>
			<h3>Where content lives matters.</h3>
			<p>
				Mentos does not have a central archive. Availability depends on reachable devices and the
				copies people consent to keep.
			</p>
		</div>
		<dl>
			<div>
				<dt>Owned</dt>
				<dd>Created on this device, stored locally, and served to peers.</dd>
			</div>
			<div>
				<dt>Kept</dt>
				<dd>Another person allowed a copy, and this device accepted it.</dd>
			</div>
			<div>
				<dt>Live</dt>
				<dd>Temporary content in memory, dropped when no source is reachable.</dd>
			</div>
		</dl>
	</div>
</section>
<section class="answers-section" aria-labelledby="answers-heading">
	<div>
		<p class="eyebrow">A FEW THINGS TO KNOW</p>
		<h2 id="answers-heading">Open about<br />how it works.</h2>
	</div>
	<div class="answers">
		<details>
			<summary>What happens when someone is offline?<Icon name="plus" size={17} /></summary>
			<p>
				Two devices exchange data while both are reachable. A permitted keeper can provide a copy
				when the author is away. There is no central store-and-forward service; a queued message
				waits for a suitable connection.
			</p>
		</details>
		<details>
			<summary>Does peer-to-peer mean there are no relays?<Icon name="plus" size={17} /></summary>
			<p>
				No. Direct UDP paths are tried where possible. The public n0 relays help establish
				connections and carry encrypted traffic where needed. They do not host your Mentos account
				or archive your content.
			</p>
		</details>
		<details>
			<summary>What does a wallet confirmation mean?<Icon name="plus" size={17} /></summary>
			<p>
				Accepted means this phone counts the entry. Witnessed means another phone has voted for it.
				Final means the app’s witness threshold is met without a competing entry; Conflicted signals
				a competing entry. These are ledger states, not a guarantee of irreversible settlement.
				Disconnected parts of the network can disagree.
			</p>
			<a href={`${repo}/blob/main/docs/COIN.md`} target="_blank" rel="noreferrer"
				>Read the ledger rules ↗</a
			>
		</details>
		<details>
			<summary>Can I hide my IP address from peers?<Icon name="plus" size={17} /></summary>
			<p>
				Standard mode allows direct connections. Relay-only mode avoids exposing a direct device
				address to peers. Tor mode uses relay-only networking with a configured local HTTP CONNECT
				proxy such as Orbot. Each mode has different connection and performance tradeoffs.
			</p>
		</details>
		<details>
			<summary>What does a recovery phrase restore?<Icon name="plus" size={17} /></summary>
			<p>
				The phrase restores the same signing identity. Messages, media, and other local content need
				a separate backup or an available authorized copy. Identity recovery and content recovery
				are different.
			</p>
		</details>
	</div>
</section>

<style>
	.inside-section,
	.capability-section,
	.protocol-section,
	.trust-section {
		padding-top: 96px;
	}
	.screen-gallery {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
	}
	.screen-gallery article {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 0;
		background: var(--mint);
		border: 1px solid var(--line);
		border-radius: 17px;
		padding: 26px 10px 30px;
	}
	.gallery-label {
		width: 100%;
		padding: 0 15px 25px;
	}
	.gallery-label > span {
		font: 9px 'Geist Mono';
		letter-spacing: 1.3px;
		color: var(--green);
	}
	.gallery-label p {
		font-size: 12px;
		line-height: 1.7;
		margin-top: 8px;
		color: var(--muted);
	}
	.screen-gallery :global(.phone) {
		transform: none;
		width: 260px;
		height: 540px;
		max-width: 100%;
		border-width: 5px;
		box-shadow: 0 12px 25px #0002;
	}
	.screen-gallery :global(.phone:hover) {
		transform: none;
	}
	.screen-gallery :global(.camera) {
		left: calc(50% - 32px);
	}
	.capability-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 30px;
	}
	.capability-grid article {
		border-top: 1px solid var(--line);
		padding: 26px 0 10px;
	}
	.capability-grid article > :global(svg) {
		color: var(--green);
		margin-bottom: 20px;
	}
	.capability-grid h3,
	.trust-grid h3 {
		font-size: 21px;
		font-weight: 500;
		letter-spacing: -0.6px;
		margin-bottom: 13px;
		line-height: 1.4;
	}
	.capability-grid p,
	.trust-grid p {
		font-size: 12px;
		line-height: 1.95;
		color: var(--muted);
	}
	details summary {
		cursor: pointer;
		list-style: none;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 18px;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary:focus-visible {
		outline: 2px solid var(--green);
		outline-offset: 4px;
	}
	details[open] summary :global(svg) {
		transform: rotate(45deg);
	}
	.capability-grid details {
		margin-top: 20px;
		font-size: 11px;
	}
	.capability-grid details > p {
		margin-top: 13px;
		font-size: 11px;
	}
	.protocol-section {
		scroll-margin-top: 35px;
	}
	.stack-strip {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 15px;
		background: var(--mint);
		padding: 27px;
		border-radius: 12px;
		margin: 35px 0;
	}
	.stack-strip > span {
		display: flex;
		flex-direction: column;
		gap: 8px;
		font: 9px 'Geist Mono';
		color: var(--muted);
	}
	.stack-strip b {
		font: 500 16px Geist;
		color: var(--ink);
	}
	.stack-strip > :global(svg) {
		color: var(--green);
	}
	.protocol-list article {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 40px;
		padding: 27px 0;
		border-bottom: 1px solid var(--line);
	}
	.protocol-list h3 {
		font-size: 17px;
		font-weight: 500;
		margin-bottom: 10px;
	}
	.protocol-list code,
	.trust-grid code {
		display: inline-block;
		font: 10px 'Geist Mono';
		color: var(--green);
		background: var(--accent-soft);
		padding: 7px 10px;
		border-radius: 5px;
	}
	.protocol-list p {
		font-size: 14px;
		line-height: 1.8;
	}
	.protocol-list small {
		display: block;
		font-size: 11px;
		line-height: 1.85;
		color: var(--muted);
		margin-top: 9px;
	}
	.gossip-note {
		display: flex;
		gap: 18px;
		margin: 30px 0;
	}
	.gossip-note > :global(svg) {
		color: var(--green);
		flex-shrink: 0;
	}
	.gossip-note h3 {
		font-size: 15px;
		font-weight: 500;
		margin-bottom: 10px;
	}
	.gossip-note p {
		font-size: 12px;
		line-height: 1.9;
		color: var(--muted);
	}
	.gossip-note code {
		color: var(--green);
		font-size: 10px;
		overflow-wrap: anywhere;
	}
	.trust-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 22px;
	}
	.trust-grid article {
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 12px;
		padding: 25px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.trust-grid .micro-label {
		display: block;
		margin-bottom: 20px;
	}
	.trust-grid code {
		margin-top: 22px;
		font-size: 9px;
	}
	.trust-grid p {
		flex: 1;
	}
	.custody {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		gap: 55px;
		padding: 35px 0;
		border-bottom: 1px solid var(--line);
		margin-top: 25px;
	}
	.custody h3 {
		font-size: 22px;
		font-weight: 500;
		letter-spacing: -0.5px;
		margin-bottom: 15px;
	}
	.custody p {
		font-size: 12px;
		line-height: 1.9;
		color: var(--muted);
	}
	.custody dl {
		margin: 0;
	}
	.custody dl > div {
		display: grid;
		grid-template-columns: 75px 1fr;
		gap: 20px;
		padding: 12px 0;
		border-bottom: 1px solid var(--line);
	}
	.custody dl > div:last-child {
		border: 0;
	}
	.custody dt {
		font: 12px 'Geist Mono';
		color: var(--green);
	}
	.custody dd {
		margin: 0;
		font-size: 12px;
		line-height: 1.7;
		color: var(--muted);
	}
	.answers-section {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		gap: 55px;
		padding-top: 96px;
	}
	.answers-section h2 {
		margin-top: 20px;
	}
	.answers details {
		padding: 20px 0;
		border-bottom: 1px solid var(--line);
	}
	.answers details:first-child {
		padding-top: 0;
	}
	.answers summary {
		font-size: 14px;
		line-height: 1.7;
	}
	.answers p {
		font-size: 12px;
		line-height: 1.9;
		color: var(--muted);
		margin-top: 15px;
	}
	.answers a {
		display: inline-block;
		margin-top: 15px;
		color: var(--green);
		font-size: 11px;
	}
	@media (max-width: 1100px) {
		.screen-gallery {
			gap: 12px;
		}
		.screen-gallery article {
			padding-left: 8px;
			padding-right: 8px;
		}
		.screen-gallery :global(.phone) {
			width: 245px;
		}
		.capability-grid {
			gap: 22px;
		}
		.trust-grid {
			gap: 15px;
		}
		.trust-grid article {
			padding: 20px;
		}
		.stack-strip {
			padding: 22px;
		}
	}
	@media (max-width: 900px) {
		.screen-gallery {
			display: flex;
			overflow-x: auto;
			scroll-snap-type: x proximity;
			padding: 0 0 20px;
			gap: 18px;
		}
		.screen-gallery article {
			flex: 0 0 300px;
			scroll-snap-align: start;
		}
		.screen-gallery :global(.phone) {
			width: 260px;
		}
		.capability-grid {
			grid-template-columns: 1fr 1fr;
		}
		.trust-grid {
			grid-template-columns: 1fr;
		}
		.trust-grid article {
			padding: 28px;
		}
		.custody,
		.answers-section {
			gap: 30px;
		}
		.stack-strip b {
			font-size: 14px;
		}
	}
	@media (max-width: 600px) {
		.inside-section,
		.capability-section,
		.protocol-section,
		.trust-section,
		.answers-section {
			padding-top: 65px;
		}
		.capability-grid {
			grid-template-columns: 1fr;
			gap: 15px;
		}
		.capability-grid article {
			padding-top: 22px;
		}
		.capability-grid h3 {
			font-size: 23px;
		}
		.stack-strip {
			display: grid;
			grid-template-columns: 1fr auto 1fr;
			gap: 22px;
		}
		.stack-strip > :global(svg:nth-of-type(2)) {
			display: none;
		}
		.stack-strip > span {
			font-size: 8px;
		}
		.protocol-list article {
			grid-template-columns: 1fr;
			gap: 17px;
			padding: 25px 0;
		}
		.protocol-list h3 {
			font-size: 20px;
		}
		.protocol-list p {
			font-size: 12px;
		}
		.custody,
		.answers-section {
			grid-template-columns: 1fr;
			gap: 25px;
		}
		.answers-section h2 br {
			display: none;
		}
		.trust-grid article {
			padding: 25px;
		}
		.gossip-note {
			gap: 12px;
		}
		.screen-gallery article {
			flex-basis: 280px;
		}
		.gallery-label {
			padding-left: 10px;
		}
		.screen-gallery {
			margin-right: -10px;
		}
	}
</style>
