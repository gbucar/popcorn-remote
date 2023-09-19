<script lang="ts">
	import { browser } from '$app/environment';
	import SubtitlesInput from '$lib/SubtitlesInput.svelte';
	import Select from '$lib/svg/select.svelte';
	import {
		back,
		down,
		getplaying,
		getsubtitles,
		getviewstack,
		left,
		right,
		seek,
		togglefullscreen,
		toggleplaying,
		up,
		volume,
		watchtrailer,
        togglequality,

		previousseason,

		nextseason


	} from '$lib/popcorn';
	import Left from '$lib/svg/left.svelte';
	import Up from '$lib/svg/up.svelte';
	import { onDestroy, onMount } from 'svelte';
	import Pause from '$lib/svg/pause.svelte';
	import Play from '$lib/svg/play.svelte';
	import Down from '$lib/svg/down.svelte';
	import Right from '$lib/svg/right.svelte';
	import Back from '$lib/svg/back.svelte';
	import Min from '$lib/svg/min.svelte';
	import Max from '$lib/svg/max.svelte';
	import Speaker from '$lib/svg/speaker.svelte';
	let playing: boolean;
	let currentTime: number; //= 158.135045;
	let duration: number; //= 11348.512;
	let downloadSpeed: string; //= '2.18 MiB/s';
	let imdb_id: string; //= 'tt10640346';
	let isFullscreen: boolean; //= false;
	let movie: string; //= 'movie';
	let quality: string; //= '1080p';
	let selectedSubtitle: string; //= '';
	let streamUrl: string; //= 'http://127.0.0.1:32331/0';
	let title: string; //= 'Babylon';
	let uploadSpeed: string; //= '2.73 KiB/s';
	let vol: number; //= 1;

	let playerOpen: boolean;

	let interval: any;

	onMount(() => {
		setInterval(() => {
			getplaying((res: any) => {
				({
					playing,
					currentTime,
					duration,
					downloadSpeed,
					imdb_id,
					isFullscreen,
					movie,
					quality,
					selectedSubtitle,
					title,
					uploadSpeed,
					volume: vol
				} = res.result);
				playerOpen = currentTime != undefined;
			});
		}, 1000);
	});

	let setCurrentTime = async (event: any) => {
		await seek([parseInt(event?.target?.value || 0) - currentTime]);
	};

	onDestroy(async () => {
		clearInterval(interval);
	});
</script>

<div class="grid grid-rows-3 grid-cols-3 aspect-square place-items-center">
	<button class="row-start-2 col-start-1" on:click={() => {left();previousseason();}}><Left /></button>
	<button class="row-start-1 col-start-2" on:click={up}><Up /></button>
	<button
		class="row-start-2 col-start-2"
		on:click={() => {
			toggleplaying();
			getplaying((res) => {
				({
					playing,
					currentTime,
					duration,
					downloadSpeed,
					imdb_id,
					isFullscreen,
					movie,
					quality,
					selectedSubtitle,
					title,
					uploadSpeed,
					volume: vol
				} = res.result);
				playerOpen = currentTime != undefined;
			});
		}}
	>
		{#if playerOpen}
			{#if playing}
				<Pause />
			{:else}
				<Play />
			{/if}
		{:else}
			<Select />
		{/if}
	</button>
	<button class="row-start-3 col-start-2" on:click={down}><Down /></button>
	<button class="row-start-2 col-start-3" on:click={() => {right();nextseason();}}><Right /></button>
	<button class="row-start-3 col-start-3" on:click={back}><Back /></button>
	{#if playerOpen}
		<button class="row-start-3 col-start-1" on:click={togglefullscreen}
			>{#if isFullscreen}<Min />
			{:else}<Max />
			{/if}</button
		>
	{/if}
</div>


<!-- playing controls -->
	<div class="flex flex-col place-items-center">
        {#if playerOpen}
            <input
                name="time"
                class="w-11/12"
                value={currentTime}
                type="range"
                min={0}
                max={duration}
                step="1"
                on:change={setCurrentTime}
            />
            <label for="volume" class="flex place-items-center gap-1"
                ><Speaker {vol} />
                {Math.round(vol * 100)} %

                <input
                    name="volume"
                    bind:value={vol}
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    on:change={() => volume([vol])}
                />
            </label>
            <SubtitlesInput />
        {/if}
	</div>
