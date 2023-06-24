<script lang="ts">
	import { goto } from '$app/navigation';
	import { back, enter, getcurrentlist, setselection } from '$lib/popcorn';
	import { onMount } from 'svelte';

	export let data;
	let movie: any;

	onMount(async () => {
		back();
		back();
		setselection([data.index]);
		enter();
		movie = (await getcurrentlist(null, null)).result?.list[data.index];
	});
	const playMovie = () => {
		enter();
		goto('/');
	};
</script>

{#if movie}
	<div
		class="bg-fit h-screen bg-center bg-no-repeat bg-cover blur-md brightness-50 z-0"
		style="background-image: url('{movie.backdrop}'); backdrop-filter: blur(16px);"
	/>

	<div class="absolute top-14 flex flex-col">
		<button class="m-2" on:click={enter}>
			<img src={movie.images.fanart} alt="fanart" class="w-fit" />
		</button>
		<div class="m-2">
			<h3 class="text-white font-bold text-2xl">{movie.title1}</h3>
			<div class="px-3 flex flex-row">
				<p class="text-white text-sm">{movie.rating}</p>
				<div class="w-2 h-2 rounded-full bg-white m-auto" />
				<p class="text-white text-sm">{movie.year}</p>
				<div class="w-2 h-2 rounded-full bg-white m-auto" />
				<p class="text-white text-sm">{movie.genre.slice(0, 2).join('/')}</p>
				<div class="w-2 h-2 rounded-full bg-white m-auto" />
				<p class="text-white text-sm">{movie.runtime} min</p>
			</div>
			<p class="text-sm text-white">{movie.synopsis}</p>
			<button on:click={playMovie}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="icon icon-tabler icon-tabler-player-play-filled fill-white w-1/3"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="#ffffff"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path
						d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
						stroke-width="0"
					/>
				</svg>
			</button>
		</div>
	</div>
{/if}
