<script lang="ts">
	import { back, filtersearch, getcurrentlist, getcurrenttab, toggletab } from '$lib/popcorn';
	import { onMount } from 'svelte';
	let items: any[] | undefined = [];
	onMount(async () => {
		await back();
		await back();
		while ((await getcurrenttab(null)).result.tab != 'movies') {
			toggletab();
		}
		items = (await getcurrentlist(null, null))?.result?.list;
	});
	let searchQuery = '';
	const search = async (q: string) => {
		filtersearch([q]);
		while ((await getcurrenttab(null)).result.tab != 'movies') {
			toggletab();
		}

		items = [];

		let localItems: any[] | undefined = undefined;
		let i = 0;
		do {
			localItems = (await getcurrentlist(null, null))?.result?.list;
			i++;
		} while (!localItems && i < 100);

		items = localItems;
	};
</script>

<form on:submit={() => search(searchQuery)} class="flex justify-center p-4">
	<input bind:value={searchQuery} type="text" class="rounded-lg shadow-lg p-1 h-10" />
</form>

<div
	class="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 w-screaround gap-2"
>
	{#if items != undefined}
		{#each items as item, i}
			<div>
				<a href="/movies/{item.imdb_id}?index={i}">
					<img class="rounded shadow hover:shadow-xl" src={item.images.poster} alt="backdrop" />
				</a>
				<h3>{item.title}</h3>
				<small>{item.year}</small>
			</div>
		{/each}
	{:else}
		<p>No results</p>
	{/if}
</div>
