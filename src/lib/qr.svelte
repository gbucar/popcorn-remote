<script lang="ts">
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';
	import Qr from './svg/qr.svelte';

	export let scan = false;
	export let onScanSuccess: any = false;

	function scanSuccess(decodedText: any, decodedResult: any) {
		if (onScanSuccess) {
			if (onScanSuccess(decodedText)) {
				stop();
			}
		} else {
			alert(`Code matched = ${decodedText}`);
		}
	}

	function onScanFailure(error: any) {
		console.warn(`Code scan error = ${error}`);
	}

	let html5Qrcode: any;

	onMount(init);

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
	}

	export function start() {
		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 250, height: 250 }
			},
			scanSuccess,
			onScanFailure
		);
		scan = true;
	}

	export async function stop() {
		await html5Qrcode.stop();
		scan = false;
	}
</script>

<button on:click={start}><Qr className="stroke-black w-9" /></button>

<main
	class="absolute top-20 sm:w-96 sm:h-96 sm:right-2 sm:left-none flex z-50 flex-col bg-white rounded shadow w-screen left-0 p-2"
	style="visibility: {scan ? '' : 'hidden'};"
>
	<button on:click={stop} class="text-end font-bold">X</button>

	<reader class="m-auto w-full h-full" id="reader" />
</main>
