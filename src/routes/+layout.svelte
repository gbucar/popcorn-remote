<script lang="ts">
	import { createLsStore } from '$lib/stores';
	import { slide } from 'svelte/transition';
	import '../app.css';
	import { onDestroy, onMount } from 'svelte';
	import { ping } from '$lib/popcorn';
	import Qr from '$lib/qr.svelte';
	let ip: any;
	let port: any;
	let username: any;
	let password: any;
	let edit = false;
	let interval: any;

	onMount(() => {
		ip = createLsStore('ip', '127.0.0.1');
		port = createLsStore('port', '8008');
		username = createLsStore('username', 'popcorn');
		password = createLsStore('password', 'popcorn');
		interval = setInterval(async () => {
			connected = await ping(false);
		}, 1000);
	});
	onDestroy(() => {
		clearInterval(interval);
	});
	let connected = false;
</script>

<nav class="flex flex-row justify-between p-3 shadow-lg z-50 items-center">
	<div>
		<a href="/movies">movies</a>
		<a href="/series">series</a>
		<a href="/anime">anime</a>
		<a href="/">controls</a>
	</div>
	<div class="flex flex-row items-center">
		<div class="rounded-full w-2 h-2 m-3" style="background-color: {connected ? 'green' : 'red'}" />
		<button on:click={() => (edit = !edit)}>edit</button>
		<Qr
			onScanSuccess={(text) => {
				let creds = JSON.parse(text);
				if (!creds.ip) {
					alert('connect to a different network');
					return false;
				}
				$ip = creds.ip;
				$port = creds.port;
				$username = creds.user;
				$password = creds.pass;
				return $ip && $port && $username && $password;
			}}
		/>
	</div>
</nav>

{#if edit}
	<form
		class="absolute top-20 right-2 rounded-xl shadow-xl flex flex-col p-3 bg-white z-20"
		transition:slide
	>
		<input title="ip" class="rounded bg-gray-200 mt-3 p-1" bind:value={$ip} type="text" />
		<input title="port" class="rounded bg-gray-200 mt-3 p-1" bind:value={$port} type="text" />
		<input
			title="username"
			class="rounded bg-gray-200 mt-3 p-1"
			bind:value={$username}
			type="text"
		/>
		<input
			title="password"
			class="rounded bg-gray-200 mt-3 p-1"
			bind:value={$password}
			type="text"
		/>
	</form>
{/if}

{#if !connected}
	<div class="absolute z-10 w-screen h-screen bg-gray">Povezava ni vzpostavljena</div>
{/if}

<slot />
