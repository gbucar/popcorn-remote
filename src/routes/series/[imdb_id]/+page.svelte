<script lang="ts">
	import { goto } from '$app/navigation';
	import { back, enter, getcurrentlist, selectepisode, setselection } from '$lib/popcorn';
	import { onMount } from 'svelte';

	export let data;
	let series: any;
	let openSeason: number | null = null;

	onMount(async () => {
		back();
		back();
		setselection([data.index]);
		enter();
		series = (await getcurrentlist(null, null)).result?.list[data.index];
	});
	// const playMovie = () => {
	// 	enter();
	// 	goto('/');
	// };
</script>

{#if series}
	<div
		class="bg-fit h-screen bg-center  bg-cover blur-md brightness-50 z-0"
		style="background-image: url('{series.images.banner}'); backdrop-filter: blur(16px);"
	/>

	<div class="absolute top-14 flex flex-col h-screen  overflow-y-scroll">
		<button class="m-2" on:click={enter}>
			<img src={series.images.fanart} alt="fanart" class="w-fit" />
		</button>

		<div class="m-2">
			<h3 class="text-white font-bold text-2xl">{series.title1}</h3>
			<div class="px-3 flex flex-row">
				<p class="text-white text-sm">{series.year}</p>
				<div class="w-2 h-2 rounded-full bg-white m-auto" />
				<p class="text-white text-sm">{series?.genres?.slice(0, 2).join('/')}</p>
			</div>
			<p class="text-sm text-white">{series.synopsis}</p>
			<div class="flex flex-row">
				<div class="flex flex-col">
					{#each Array(series.seasonCount).fill(0) as seasons, i}
						<button class="text-white bg-black rounded font-bold m-1 px-1" on:click={() => (openSeason = i + 1)}>Season {i + 1}</button>
					{/each}
				</div>

				<div class="flex flex-col overflow-x-scroll">
					{#if openSeason != null}
						{#each series.episodes.sort((a, b) => a.episode - b.episode) as episode}
							{#if episode.season == openSeason}
								<button
                                    class="text-white bg-gray-900 rounded font-bold m-1 px-1 shadow-3xl"
									on:click={() => {
										selectepisode([episode.season, episode.episode]);
										enter();
										goto('/');
									}}>{episode.title}</button
								>
							{/if}
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
