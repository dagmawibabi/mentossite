<script lang="ts">
	import Icon from './Icon.svelte';
	let pane = $state('Chats');
	const chats = [
		{ name: 'Sam', message: 'Sent you the photos', time: '12m', unread: '2', online: true },
		{ name: 'Hana', message: 'You: See you there.', time: '34m', unread: '', online: true },
		{ name: 'Mika', message: 'typing…', time: 'now', unread: '1', online: true },
		{ name: 'Dawit', message: 'The file came through!', time: '1h', unread: '', online: false },
		{ name: 'Liya', message: 'You: Thanks for sharing.', time: '2h', unread: '', online: false }
	];
	const groups = [
		{
			name: 'The weekend people',
			message: 'Mika: Same spot tomorrow?',
			time: 'now',
			unread: '3',
			online: false
		},
		{
			name: 'Design after hours',
			message: 'You: This is the one.',
			time: '34m',
			unread: '',
			online: false
		},
		{ name: 'Friends', message: 'Hana: Sent a photo', time: '1h', unread: '', online: false }
	];
</script>

<div class="phone actual-phone" aria-label="Illustrative Mentos Spaces screen">
	<div class="phone-status">
		<span>9:41</span>
		<div class="camera"></div>
		<span class="status-icons">▮▮▮ <Icon name="battery" size={17} /></span>
	</div>
	<div class="real-app-bar">
		<h2>Spaces</h2>
		<div aria-hidden="true">
			<Icon name={pane === 'Chats' ? 'call' : 'spaces'} size={18} />{#if pane === 'Chats'}<Icon
					name="transfer"
					size={19}
				/>{/if}<Icon name={pane === 'Chats' ? 'compose' : 'plus'} size={18} />
		</div>
	</div>
	<div class="inbox-segments" aria-label="Preview inbox categories">
		{#each ['Chats', 'Groups', 'Channels'] as item}<button
				class:chosen={pane === item}
				aria-pressed={pane === item}
				onclick={() => (pane = item)}>{item}</button
			>{/each}
	</div>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex (Keyboard users need to focus this scrollable region.) -->
	<div class="screen-content" tabindex="0" role="region" aria-label="Preview conversations">
		{#if pane !== 'Channels'}
			<div class="real-search"><Icon name="search" size={17} /><span>Search</span></div>
			<div class="real-folders"><span>All</span><span>Friends</span><span>Work</span></div>
			<div class="real-conversations">
				{#each pane === 'Chats' ? chats : groups as chat, index}<div class="real-chat-row">
						<div class="sigil" class:online={chat.online} aria-hidden="true">
							{#if pane === 'Groups'}<Icon name="spaces" size={22} />{:else}<svg viewBox="0 0 50 50"
									>{#each Array(25) as _, cell}{#if (Math.min(cell % 5, 4 - (cell % 5)) * 7 + Math.floor(cell / 5) * 3 + index * 5) % 11 < 6}<rect
												x={10 + (cell % 5) * 6}
												y={10 + Math.floor(cell / 5) * 6}
												width="5"
												height="5"
												rx="1"
											/>{/if}{/each}</svg
								>{/if}
						</div>
						<div class="real-chat-text">
							<div><strong>{chat.name}</strong><time>{chat.time}</time></div>
							<div>
								<p class:typing={chat.message === 'typing…'}>{chat.message}</p>
								{#if chat.unread}<span class="real-unread">{chat.unread}</span>{/if}
							</div>
						</div>
					</div>{/each}
			</div>
		{:else}
			<div class="real-channel">
				<span class="sigil"><Icon name="broadcast" size={23} /></span>
				<div><strong>Field notes</strong><small>Small discoveries, shared.</small></div>
				<span class="subscribed">Subscribed</span>
			</div>
			<div class="real-channel">
				<span class="sigil"><Icon name="broadcast" size={23} /></span>
				<div><strong>Mentos updates</strong><small>Building in the open.</small></div>
				<span class="subscribed">Subscribed</span>
			</div>
			<p class="channel-explanation">
				Channels live on their owner's phone. Posts reach subscribers over the owner's gossip topic,
				and each subscription is a signed message the owner can count.
			</p>
		{/if}
	</div>
	<div class="real-bottom-nav" aria-label="App navigation illustration">
		{#each [{ label: 'Feed', icon: 'feed' }, { label: 'Wallet', icon: 'wallet' }, { label: 'Spaces', icon: 'chat' }, { label: 'Network', icon: 'network' }, { label: 'You', icon: 'person' }] as item}<span
				class:current={item.label === 'Spaces'}
				><span class="nav-icon"
					><Icon name={item.icon} size={19} />{#if item.label === 'Spaces'}<b>3</b
						>{:else if item.label === 'Network'}<i></i>{/if}</span
				><small>{item.label}</small></span
			>{/each}
	</div>
	<div class="home-indicator"></div>
</div>

<style>
	.actual-phone > div {
		flex-shrink: 0;
	}
	.actual-phone > .screen-content {
		flex: 1 1 0;
		min-height: 0;
		overflow-y: auto;
		overscroll-behavior: contain;
		scrollbar-width: thin;
		scrollbar-color: #cbd3ce transparent;
	}
	.actual-phone {
		background: #f5f6f5;
		color: #0d1110;
		border-color: #161b18;
		transform: rotate(-3deg);
	}
	.real-app-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 18px 15px 17px;
	}
	.real-app-bar h2 {
		font-size: 22px;
		letter-spacing: -0.7px;
		font-weight: 600;
	}
	.real-app-bar > div {
		display: flex;
		gap: 16px;
	}
	.inbox-segments {
		display: flex;
		background: #edefee;
		border: 1px solid #e1e4e2;
		border-radius: 9px;
		padding: 3px;
		margin: 0 14px 12px;
	}
	.inbox-segments button {
		flex: 1;
		border: 0;
		border-radius: 6px;
		background: transparent;
		padding: 8px 2px;
		font-size: 10px;
		color: #68716d;
	}
	.inbox-segments button.chosen {
		background: #fff;
		color: #0d1110;
		box-shadow: 0 1px 3px #0000000d;
		font-weight: 600;
	}
	.real-search {
		display: flex;
		gap: 10px;
		align-items: center;
		background: #edefee;
		margin: 0 14px;
		border: 1px solid #e1e4e2;
		border-radius: 8px;
		padding: 10px;
		color: #a3aaa6;
		font-size: 11px;
	}
	.real-folders {
		display: flex;
		gap: 7px;
		margin: 10px 14px 5px;
		font-size: 9px;
		color: #68716d;
	}
	.real-folders span {
		border: 1px solid #e1e4e2;
		border-radius: 15px;
		padding: 5px 10px;
	}
	.real-folders span:first-child {
		background: #e0f3ea;
		border-color: #e0f3ea;
		color: #0d1110;
	}
	.real-chat-row {
		display: flex;
		gap: 10px;
		align-items: center;
		padding: 12px 14px;
	}
	.sigil {
		height: 37px;
		width: 37px;
		border-radius: 12px;
		background: #edefee;
		position: relative;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		color: #2c3330;
	}
	.sigil svg {
		width: 100%;
		height: 100%;
		fill: #434c47;
	}
	.sigil:has(> :global(svg[stroke])) {
		padding: 9px;
	}
	.sigil :global(svg[stroke]) {
		fill: none;
	}
	.sigil.online:after {
		content: '';
		position: absolute;
		bottom: -1px;
		right: -1px;
		width: 8px;
		height: 8px;
		background: #0e9f6e;
		border: 2px solid #f5f6f5;
		border-radius: 50%;
	}
	.real-chat-text {
		flex: 1;
		min-width: 0;
	}
	.real-chat-text > div {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 5px;
	}
	.real-chat-text strong {
		font-size: 11px;
		font-weight: 600;
	}
	.real-chat-text time {
		font:
			8px 'Geist Mono',
			monospace;
		color: #68716d;
	}
	.real-chat-text p {
		font-size: 9px;
		color: #68716d;
		margin-top: 5px;
	}
	.real-chat-text p.typing {
		color: #0e9f6e;
	}
	.real-unread {
		background: #0e9f6e;
		color: white;
		font:
			8px 'Geist Mono',
			monospace;
		min-width: 14px;
		height: 14px;
		border-radius: 8px;
		text-align: center;
		line-height: 14px;
	}
	.real-bottom-nav {
		margin-top: auto;
		padding: 13px 6px 10px;
		display: flex;
		border-top: 1px solid #e1e4e2;
	}
	.real-bottom-nav > span {
		display: flex;
		flex: 1;
		align-items: center;
		flex-direction: column;
		gap: 5px;
		color: #a3aaa6;
	}
	.real-bottom-nav > span.current {
		color: #0d1110;
	}
	.real-bottom-nav small {
		font:
			7px 'Geist Mono',
			monospace;
	}
	.nav-icon {
		position: relative;
	}
	.nav-icon b {
		position: absolute;
		top: -5px;
		right: -8px;
		background: #0e9f6e;
		color: #fff;
		border: 1px solid #f5f6f5;
		border-radius: 7px;
		font-size: 7px;
		padding: 1px 4px;
	}
	.nav-icon i {
		position: absolute;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #0e9f6e;
		right: -5px;
		top: 0;
	}
	.real-channel {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 16px 13px;
	}
	.real-channel strong {
		font-size: 10px;
	}
	.real-channel small {
		display: block;
		font-size: 8px;
		color: #68716d;
		margin-top: 4px;
	}
	.subscribed {
		font-size: 7px;
		color: #68716d;
		margin-left: auto;
	}
	.channel-explanation {
		padding: 16px;
		font:
			9px/1.8 'Geist Mono',
			monospace;
		color: #68716d;
	}
</style>
