<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { getsubtitles, setsubtitle } from './popcorn';
	let subtitles: any[] = [];
	let interval: any;
	let chosenSubtitle: any;
	onMount(async () => {
		interval = setInterval(async () => {
			getsubtitles((res: any) => {
				console.log(res);
				subtitles = res.result.subtitles;
			});
		}, 3000);
	});
	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<select
	bind:value={chosenSubtitle}
	name="subtitle"
	on:change={() => {
		setsubtitle([chosenSubtitle]);
	}}
>
	{#each subtitles as subtitle}
		<option value={subtitle}>{subtitle}</option>
	{/each}
</select>
