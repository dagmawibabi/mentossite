<script lang="ts">
	import Icon from '#lib/Icon.svelte';
	import AppPreview from '#lib/AppPreview.svelte';
	import ThemeToggle from '#lib/ThemeToggle.svelte';
	import DeepDive from '#lib/DeepDive.svelte';
	import PluginSection from '#lib/PluginSection.svelte';
	const repo = 'https://github.com/dagmawibabi/mentos';
	const download = `${repo}/releases/latest`;
	const features = [
		{
			icon: 'chat',
			title: 'Peer-to-peer conversations.',
			text: 'Connect by QR code or contact link. Send direct messages, start groups, share files, and make voice or video calls. Delivery and read receipts tell you when a message arrives.',
			tag: 'P2P CHATS & CALLS'
		},
		{
			icon: 'spark',
			title: 'The everyday, worth sharing.',
			text: 'Post a thought. Share a story. Keep up with the people you follow, from one device to another.',
			tag: 'FEED & STORIES'
		},
		{
			icon: 'spaces',
			title: 'Find your corner of the world.',
			text: 'Bring people together in spaces, channels, and forums built around the things you care about.',
			tag: 'SPACES & CHANNELS'
		},
		{
			icon: 'file',
			title: 'Good things travel together.',
			text: 'Send files to your people and manage your transfers. Let others keep a copy when you choose.',
			tag: 'FILES & SHARING'
		}
	];
</script>

<svelte:head>
	<title>Mentos — Your people. Your space.</title>
	<meta
		name="description"
		content="Your social life, held in your hand. Meet Mentos: peer-to-peer chats, stories, calls, and communities. Get the Android app on GitHub."
	/>
	<meta name="color-scheme" content="light dark" />
	<meta property="og:title" content="Mentos — Your people. Your space." />
	<meta
		property="og:description"
		content="Chats, stories, and communities that live on your device. Discover a more personal way to connect."
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<a class="skip-link" href="#main">Skip to content</a>
<div class="site-shell" id="top">
	<header>
		<a class="brand" href="#top" aria-label="Mentos home"
			><img src="/logo.jpg" alt="" />mentos<span class="brand-dot">.</span></a
		>
		<nav aria-label="Main navigation">
			<a href="/plugins">Plugins</a><a href="#features">Features</a><a href="#protocols">Protocols</a><a href="#your-data"
				>Your data</a
			><a href={repo} target="_blank" rel="noreferrer">GitHub <Icon name="arrow-up" size={13} /></a>
		</nav>
		<div class="header-actions">
			<ThemeToggle /><a class="nav-download" href={download}
				>Get Mentos <Icon name="download" size={16} /></a
			>
		</div>
	</header>
	<main id="main">
		<section class="hero" aria-labelledby="hero-title">
			<div class="hero-copy">
				<div class="eyebrow"><span class="live-dot"></span> A MORE PERSONAL SOCIAL NETWORK</div>
				<h1 id="hero-title">Your people.<br />Your space.<br /><span>Actually yours.</span></h1>
				<p class="hero-description">
					All the ways you connect. In your hands.<br class="desktop-break" /> Chats, stories, and communities
					that live on your device, with no central server in between.
				</p>
				<div class="hero-actions">
					<a class="button primary" href={download}
						><Icon name="download" size={20} /> Download Mentos <Icon
							name="arrow-up"
							size={17}
						/></a
					><a class="text-link" href="#features"
						>Take a look around <Icon name="arrow-down" size={16} /></a
					>
				</div>
				<div class="download-note">
					<Icon name="android" size={15} /> Android arm64 <span>·</span> Available on GitHub
				</div>
			</div>
			<div class="hero-visual">
				<div class="orbit orbit-one"></div>
				<div class="orbit orbit-two"></div>
				<div class="orbit orbit-three"></div>
				<span class="orbit-node node-one"></span><span class="orbit-node node-two"></span><span
					class="orbit-node node-three"
				></span>
				<div class="floating-note note-top">
					<span class="note-icon"><Icon name="key" size={19} /></span>
					<div>Your identity.<br /><strong>No email needed.</strong></div>
				</div>
				<AppPreview />
				<div class="floating-note note-bottom">
					<span class="note-icon"><Icon name="device" size={20} /></span>
					<div>Lives on your device.<br /><strong>Stays in your control.</strong></div>
					<span class="live-dot"></span>
				</div>
				<div class="preview-caption">
					ILLUSTRATIVE PREVIEW <span>·</span> SAMPLE DATA · TRY ALL FIVE TABS ↑
				</div>
			</div>
		</section>
		<div class="principles" aria-label="Mentos principles">
			<span><Icon name="network" />Peer-to-peer by design</span><span
				><Icon name="key" />No email. No phone number.</span
			><span><Icon name="device" />Your data lives with you</span><span
				><Icon name="code" />Built in the open</span
			>
		</div>
		<section id="features" class="features section-space">
			<div class="section-heading">
				<div>
					<p class="eyebrow">FAMILIAR FEELING. DIFFERENT FOUNDATION.</p>
					<h2>A whole social life.<br />A little closer to you.</h2>
				</div>
				<p>
					The everyday things you love, brought together.<br />Built around people and the
					connections<br class="desktop-break" /> between them.
				</p>
			</div>
			<div class="feature-grid">
				{#each features as feature}<article class="feature">
						<span class="feature-icon"><Icon name={feature.icon} size={24} /></span>
						<p class="micro-label">{feature.tag}</p>
						<h3>{feature.title}</h3>
						<p>{feature.text}</p>
					</article>{/each}
			</div>
		</section>
		<section id="your-data" class="ownership">
			<div class="ownership-visual" aria-hidden="true">
				<div class="connection-line"></div>
				<div class="device-node"><Icon name="device" size={34} /><span>YOUR DEVICE</span></div>
				<div class="connection-middle">
					<span class="live-dot"></span><span>PEER TO PEER</span><Icon
						name="arrow-right"
						size={26}
					/>
				</div>
				<div class="device-node friend">
					<Icon name="device" size={34} /><span>YOUR PEOPLE</span>
				</div>
				<div class="ownership-caption">Good connections don't need a middleman.</div>
			</div>
			<div class="ownership-copy">
				<p class="eyebrow">A DIFFERENT KIND OF CONNECTION</p>
				<h2>Your social life,<br />held in your hand.</h2>
				<p>
					Your identity is a key on your device. Your posts and messages start there, too. Mentos
					connects you directly when it can; relays help when it can’t.
				</p>
				<div class="ownership-detail">
					<Icon name="check" size={17} />
					<p>
						<strong>You decide what stays.</strong> Someone else can keep a copy only when you allow it
						and they accept.
					</p>
				</div>
				<div class="ownership-detail">
					<Icon name="check" size={17} />
					<p>
						<strong>Know how sharing works.</strong> A source needs to be online for content to travel,
						unless someone has been allowed to keep a copy.
					</p>
				</div>
				<a class="text-link" href={`${repo}#readme`} target="_blank" rel="noreferrer"
					>Get to know the project <Icon name="arrow-up" size={16} /></a
				>
			</div>
		</section>
		<section class="network-section section-space" aria-labelledby="iroh-title">
			<div class="network-intro">
				<p class="eyebrow">THE CONNECTION UNDERNEATH</p>
				<h2 id="iroh-title">
					Phone to phone.<br />Powered by
					<a href="https://iroh.computer" target="_blank" rel="noreferrer"
						>iroh<Icon name="arrow-up" size={25} /></a
					>.
				</h2>
				<p>
					Mentos uses iroh to connect devices over encrypted QUIC connections. It tries a direct
					path first, with public n0 relays helping when the devices can’t connect directly.
				</p>
				<a class="text-link" href="https://iroh.computer" target="_blank" rel="noreferrer"
					>Explore iroh.computer <Icon name="arrow-up" size={16} /></a
				>
			</div>
			<div class="network-facts">
				<div>
					<span class="feature-icon"><Icon name="network" /></span>
					<div>
						<h3>Direct when possible.</h3>
						<p>
							Hole punching helps devices find each other across networks. A relay provides a
							fallback path.
						</p>
					</div>
				</div>
				<div>
					<span class="feature-icon"><Icon name="key" /></span>
					<div>
						<h3>Relays carry encrypted traffic.</h3>
						<p>They don’t keep your Mentos account or store your posts and messages.</p>
					</div>
				</div>
				<div>
					<span class="feature-icon"><Icon name="device" /></span>
					<div>
						<h3>Choose your connection mode.</h3>
						<p>
							Use direct connections, relay-only mode, or Tor through a locally configured Orbot
							proxy.
						</p>
					</div>
				</div>
			</div>
		</section>
		<section class="tools-section" aria-labelledby="tools-title">
			<div class="section-heading">
				<div>
					<p class="eyebrow">MORE OF WHAT MENTOS CAN DO</p>
					<h2 id="tools-title">A network you can use.<br />And understand.</h2>
				</div>
				<p>Trade with peers, manage your MNT,<br />and see how your device connects.</p>
			</div>
			<div class="tools-grid">
				<article class="tool-card">
					<div class="tool-heading">
						<Icon name="wallet" size={25} /><span class="micro-label">CRYPTO & THE MNT WALLET</span>
					</div>
					<h3>Your keys. Your transactions.</h3>
					<p>
						Send and receive Mentos (MNT), view transaction history, and track funds held in escrow.
						Signed account chains are shared between phones on the network.
					</p>
					<div class="wallet-illustration" aria-label="Wallet features">
						<span>MENTOS WALLET</span><strong>•••••• <small>MNT</small></strong>
						<div>
							<span><Icon name="arrow-up" size={16} />Send</span><span
								><Icon name="arrow-down" size={16} />Receive</span
							><span><Icon name="wallet" size={16} />Escrow</span>
						</div>
					</div>
					<p class="tool-note">
						MNT is the app’s own ledger asset, not a Bitcoin or Ethereum wallet. Network partitions
						can disagree; confirmations are not irreversible guarantees.
					</p>
					<a
						class="text-link"
						href={`${repo}/blob/main/docs/COIN.md`}
						target="_blank"
						rel="noreferrer">How the ledger works <Icon name="arrow-up" size={14} /></a
					>
				</article>
				<article class="tool-card">
					<div class="tool-heading">
						<Icon name="market" size={25} /><span class="micro-label"
							>THE PEER-TO-PEER MARKETPLACE</span
						>
					</div>
					<h3>A market between people.</h3>
					<p>
						Buy and sell goods, post paid tasks, trade MNT, or offer spare storage and compute.
						Signed listings travel across the network.
					</p>
					<div class="market-illustration">
						<span><Icon name="market" size={17} />Shop</span><span
							><Icon name="check" size={17} />Tasks</span
						><span><Icon name="transfer" size={17} />Exchange</span><span
							><Icon name="device" size={17} />Resources</span
						><span><Icon name="broadcast" size={17} />Ads</span><span
							><Icon name="spaces" size={17} />Plugins</span
						>
					</div>
					<p class="tool-note">
						Order and task payments use escrow, with acceptance, release, refund, and dispute flows.
						Reviews are tied to completed trades.
					</p>
					<a
						class="text-link"
						href={`${repo}/blob/main/docs/MARKETPLACE.md`}
						target="_blank"
						rel="noreferrer">Explore the marketplace <Icon name="arrow-up" size={14} /></a
					>
				</article>
				<article class="tool-card">
					<div class="tool-heading">
						<Icon name="diagnostics" size={25} /><span class="micro-label">NETWORK DIAGNOSTICS</span
						>
					</div>
					<h3>See the connection clearly.</h3>
					<p>
						Inspect reachability, relay latency, and live QUIC connections. Find out whether traffic
						goes directly to a peer or through a relay.
					</p>
					<div class="diagnostics-illustration">
						<span><Icon name="diagnostics" size={15} />Network diagnostics</span>
						<div><span>Reachability</span><strong>Connection status</strong></div>
						<div><span>Relays</span><strong>Latency measurements</strong></div>
						<div><span>Live connections</span><strong>Peer & transport details</strong></div>
					</div>
					<p class="tool-note">
						Device checks also measure CPU, memory, free storage, and disk performance when you
						offer resources in the marketplace.
					</p>
					<a class="text-link" href={`${repo}#architecture`} target="_blank" rel="noreferrer"
						>Under the hood <Icon name="arrow-up" size={14} /></a
					>
				</article>
			</div>
			<div class="crypto-strip">
				<Icon name="key" size={24} />
				<div>
					<h3>Cryptography starts with your identity.</h3>
					<p>
						An Ed25519 key identifies you and signs what you create. A 24-word recovery phrase
						restores that identity. The app encrypts its local database, and groups and spaces use
						shared encryption keys.
					</p>
				</div>
			</div>
		</section>
		<PluginSection />
		<DeepDive />
		<section id="download" class="download-section">
			<div class="eyebrow"><span class="live-dot"></span> LESS BETWEEN YOU AND YOUR PEOPLE</div>
			<h2>Make yourself at home.</h2>
			<p>Your next conversation starts here.</p>
			<a class="button primary" href={download}
				><Icon name="download" size={20} /> Download on GitHub <Icon name="arrow-up" size={17} /></a
			><span class="download-note">For Android arm64 · Choose the APK from the latest release.</span
			>
		</section>
	</main>
	<footer>
		<a class="brand" href="#top"
			><img src="/logo.jpg" alt="" />mentos<span class="brand-dot">.</span></a
		>
		<p>A little more human. A lot more yours.</p>
		<a href={repo} target="_blank" rel="noreferrer"
			>Made in the open <Icon name="github" size={18} /><Icon name="arrow-up" size={13} /></a
		>
	</footer>
</div>
