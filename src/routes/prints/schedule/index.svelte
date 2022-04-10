<script lang="ts">
	import { onMount } from 'svelte';
	import Divider from './divider.svelte';
	import Footer from './footer.svelte';
	import Page from './page.svelte';
	import Header from './header.svelte';
	import Timeline from './timeline.svelte';

	// Program
	const programItems = [
		{
			time: new Date(1970, 0, 1, 14),
			title: 'Kirchliche Trauung'
		},
		{
			time: new Date(1970, 0, 1, 15),
			title: 'Sektempfang'
		},
		{
			time: new Date(1970, 0, 1, 16),
			title: 'Karikaturist'
		},
		{
			time: new Date(1970, 0, 1, 17, 30),
			title: 'Buffet'
		},
		{
			time: new Date(1970, 0, 1, 19),
			title: 'Hochzeitstorte'
		},
		{
			time: new Date(1970, 0, 1, 20),
			title: 'Konzert'
		},
		{
			time: new Date(1970, 0, 1, 20, 30),
			title: 'Eröffnungstanz'
		},
		{
			time: new Date(1970, 0, 1, 21),
			title: 'Aftershowparty'
		},
		{
			time: new Date(1970, 0, 1, 23),
			title: 'Mitternachtssnack'
		},
		{
			time: new Date(1970, 0, 1, 0),
			title: 'Ende'
		}
	];

	// Bride and Groom
	const milestones = [
		{
			date: new Date(2016, 2, 29),
			title: 'Begegnung',
			image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 grow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
</svg>`
		},
		{
			date: new Date(2017, 6, 16),
			title: 'Erstes Date',
			image: `<svg class="h-10 w-10 m-1 grow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M279.1 279.6l222.1-222C523.3 36.38 508.3 0 478.3 0H33.72c-30 0-45 36.38-23.75 57.63L128 175.7V176h.3359l103.6 103.6V463L220.8 464H152C138.8 464 128 474.8 128 488S138.8 512 152 512h208c13.25 0 24-10.75 24-24s-10.75-24-24-24h-78.09c-1.701-.2207-3.203-1-4.965-1h3.02V279.6zM443.7 48l-80 80h-215.5l-80-80H443.7zM255.1 235.8L196.2 176h119.5L255.1 235.8z"></path></svg>`
		},
		{
			date: new Date(2017, 7, 15),
			title: 'Verliebt',
			image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 grow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
</svg>`
		},
		{
			date: new Date(2017, 11, 17),
			title: 'Paar',
			image: `<svg class="h-10 w-10 grow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M159.1 96c26.5 0 47.1-21.5 47.1-48S186.5 0 160 0C133.5 0 111.1 21.5 111.1 48S133.5 96 159.1 96zM479.1 96c26.5 0 48-21.5 48-48S506.5 0 479.1 0c-26.5 0-47.1 21.5-47.1 48S453.5 96 479.1 96zM242.4 172.6C231.3 145.5 205.2 128 175.8 128H144.2C114.8 128 88.71 145.5 77.56 172.6L33.81 278.9C28.75 291.1 34.59 305.1 46.87 310.2c2.975 1.242 6.066 1.832 9.113 1.832c9.4 0 18.38-5.604 22.2-14.88l17.81-43.27V488c0 13.25 10.75 24 24 24s23.1-10.75 23.1-24V352h32v136c0 13.25 10.75 24 24 24c13.25 0 23.99-10.75 23.99-24V253.9l17.81 43.27C245.6 306.4 254.6 312 263.1 312c3.062 0 6.156-.5781 9.123-1.812c12.28-5.047 18.12-19.06 13.06-31.33L242.4 172.6zM143.1 304v-128h31.1l.002 128H143.1zM606.2 278.9l-43.75-106.3C551.3 145.5 525.2 128 495.8 128h-31.69c-29.31 0-55.44 17.5-66.59 44.58l-43.75 106.3c-5.062 12.27 .7813 26.28 13.06 31.33c2.877 1.205 5.846 1.771 8.764 1.771c7.957 0 15.57-4.205 20.09-11.14L367.1 384h47.1v104c0 13.25 10.75 24 24 24s23.1-10.75 23.1-24V384h31.1v104c0 13.25 10.75 24 24 24c13.25 0 23.99-10.75 23.99-24V384h48.01l-27.43-82.26C569.1 308.1 576.3 312 583.1 312c3.062 0 6.156-.5781 9.125-1.812C605.4 305.1 611.2 291.1 606.2 278.9zM434.6 336l45.4-136.2L525.4 336H434.6z"></path></svg>`
		},
		{
			date: new Date(2021, 7, 22),
			title: 'Verlobung',
			image: `<svg class="h-10 w-10 grow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 64C109.1 64 0 125.9 0 208v98.13C0 384.5 114.6 448 256 448s256-63.5 256-141.9V208C512 125.9 401.1 64 256 64zM256 112c110.5 0 200 35.88 200 80c0 9.125-4 17.75-11 25.88C398.2 192.2 331 176 256 176S113.8 192.2 67 217.9C60 209.8 56 201.1 56 192C56 147.9 145.5 112 256 112zM397.8 248.5C361.5 263 311.4 272 256 272S150.5 263 114.2 248.5C149.1 234.2 198.4 224 256 224S361.1 234.2 397.8 248.5zM464 306.1C464 344.4 383 400 256 400s-208-55.63-208-93.88V266.4C94.38 298.8 170.1 320 256 320s161.6-21.25 208-53.63V306.1z"></path></svg>`
		},
		{
			date: new Date(2023, 8, 15),
			title: 'Heirat',
			image: `<svg class="h-10 w-10 grow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M371.9 147.7c10.13 18.5 17.75 38.37 22.38 59c41.13 21.25 69.63 63.75 69.63 113.2c0 70.75-57.25 128-128 128s-128-57.25-128-128c0-54.63 34.5-101.1 82.88-119.5c8.5 17.25 13 36.25 13.13 55.5c0 37.37-16.38 70.75-42 94.12c6.25 15.25 17.13 28.12 31 37c44.75-39.75 66.13-99.63 56.75-158.7c-9.375-59.25-48.25-109.5-103.1-133.5l41.38-66.25L232.4-16H119.4l-55.5 44.62l41.25 66.25C29.03 128.4-13.35 210.6 3.777 292.1s88.88 139.8 172.1 139.9c7.625-.125 15.25-.625 22.88-1.875c48.5 60.5 131 82.13 203 53.12c71.88-28.87 116.4-101.6 109.5-178.9S447.8 163.5 371.9 147.7zM127.9 39.37l8.5-7.375h79l8.5 7.375l-25.5 42.25c-14.88-2.125-30.13-2.125-45 0L127.9 39.37zM47.9 255.1c.125-70.62 57.38-127.9 128-128c33 0 62.88 12.88 85.63 33.5c-59.88 28-101.6 88-101.6 158.5c0 21.75 4.125 43.38 12 63.63C103.3 381.5 47.9 325.2 47.9 255.1z"></path></svg>`
		}
	];
	const monthNames = [
		'Januar',
		'Februar',
		'März',
		'April',
		'Mai',
		'Juni',
		'Juli',
		'August',
		'September',
		'Oktober',
		'November',
		'Dezember'
	];

	// Service Providers
	const serviceProviders = [
		{
			category: 'Planung',
			name: 'Jessica Schömer',
			image: '/images/people/jessica-schoemer.png'
		},
		{
			category: 'Location',
			name: 'Aylin Weirowski',
			image: '/images/people/aylin-weirowski.png'
		},
		{
			category: 'Fotograf',
			name: 'Benjamin Halbauer',
			image: '/images/people/benjamin-halbauer.png'
		},
		{
			category: 'Dekoration',
			name: 'Silvana Klingauf',
			image: '/images/people/silvana-klingauf.png'
		},
		{
			category: 'Eheringe',
			name: 'Estelle Kohlstruck',
			image: '/images/people/estelle-kohlstruck.png'
		},
		{
			category: 'Karikaturist',
			name: 'Stefan Theurer',
			image: '/images/people/stefan-theurer.png'
		},
		{
			category: 'Gesang',
			name: 'Mareike Riegert',
			image: '/images/people/mareike-riegert.png'
		},
		{
			category: 'Hochzeitskleid',
			name: 'Katalin Szücs',
			image: '/images/people/katalin-szuecs.png'
		},
		{
			category: 'DJ',
			name: 'Janis Blum',
			image: '/images/people/janis-blum.png'
		},
		{
			category: 'Konditorei',
			name: 'Marika Schäfer',
			image: '/images/people/marika-schaefer.png'
		},
		{
			category: 'Floristik',
			name: '-',
			image: ''
		},
		{
			category: 'Herrenanzug',
			name: '-',
			image: ''
		}
	];

	onMount(() => {
		document.getElementById('print-button').onclick = () => window.print();
	});
</script>

<Page>
	<div id="test" class="flex grow flex-col items-center justify-center gap-8 px-12">
		<div class="grid h-[17rem] w-[17rem] grid-cols-2 grid-rows-1">
			<div
				style="background-image: url('/images/people/midrene-and-josua.png')"
				class="col-start-1 row-start-1 bg-cover bg-center bg-no-repeat grayscale"
			/>
			<div class="col-start-2 row-start-1 flex flex-col">
				<div
					class="flex flex-1 items-end justify-center text-center font-heading text-4xl uppercase tracking-widest"
				>
					B l a c k
				</div>
				<div
					class="flex-1 bg-black text-center font-heading text-4xl uppercase tracking-widest text-white"
				>
					W h i t e
				</div>
			</div>
		</div>
		<div class="mx-12 flex items-center gap-4 self-stretch px-4">
			<div class="grow border-t-2 border-black" />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-10 w-10"
				viewBox="0 0 20 20"
				fill="rgb(220,38,38)"
			>
				<path
					fill-rule="evenodd"
					d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
					clip-rule="evenodd"
				/>
			</svg>
			<div class="grow border-t-2 border-black" />
		</div>
		<div class="pb-1 text-center font-heading text-xl uppercase leading-4 tracking-wider">
			Gesucht und Gefunden, in Liebe verbunden
		</div>
	</div>
	<Divider direction="up" />
	<div class="my-2 flex items-center divide-x-2 divide-black">
		<span class="pr-2 font-display text-7xl">23</span>
		<div class="flex flex-col px-2 text-center">
			<span class="bg-black px-1 font-heading text-2xl leading-none tracking-widest text-white"
				>September</span
			>
			<span class="font-heading text-5xl font-bold leading-[0.85] tracking-wide">2 0 2 3</span>
		</div>
		<div class="flex grow flex-col text-center">
			<span class="font-heading text-3xl leading-none tracking-widest">
				Midrène's und Josua's
			</span>
			<div class="flex items-center justify-between px-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-9 w-9 text-red-600"
					viewBox="0 0 20 20"
					fill="currentcolor"
				>
					<path d="M20 7h-7L10 .5 7 7H0l5.46 5.47-1.64 7 6.18-3.7 6.18 3.73-1.63-7z" />
				</svg>
				<span class="font-display text-5xl tracking-widest"> Hochzeit </span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-9 w-9 text-red-600"
					viewBox="0 0 20 20"
					fill="currentcolor"
				>
					<path d="M20 7h-7L10 .5 7 7H0l5.46 5.47-1.64 7 6.18-3.7 6.18 3.73-1.63-7z" />
				</svg>
			</div>
		</div>
	</div>
</Page>

<Page>
	<Header title="Programm" />
	<Divider />
	<div class="relative flex grow py-3">
		<div class="absolute left-1/2 top-2 bottom-2 w-[0.125rem] -translate-x-1/2 bg-black" />
		<div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-around">
			{#each programItems as _, id}
				<div class="h-[0.175rem] w-[47.5%] bg-black {id % 2 === 0 ? '' : 'self-end'}" />
			{/each}
		</div>
		<div class="absolute left-1/2 top-0 bottom-0 flex -translate-x-1/2 flex-col justify-around">
			{#each programItems as _}
				<div class="h-3 w-3 rounded-full bg-black" />
			{/each}
		</div>
		<div
			class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-around font-heading text-2xl tracking-widest"
		>
			{#each programItems as programItem, id}
				<span class="w-[47.5%] {id % 2 === 0 ? 'self-end' : 'text-right'}">
					{programItem.time.getHours()}{programItem.time.getMinutes() === 0
						? ''
						: ':' + programItem.time.getMinutes()} Uhr
				</span>
			{/each}
		</div>
		<div class="flex w-full flex-col justify-between text-lg font-bold uppercase text-white">
			{#each programItems as programItem, id}
				<div class="relative mb-2 mr-2 {id % 2 === 0 ? 'self-start' : 'self-end'}">
					<div
						class="absolute top-[6px] left-[6px] h-full w-full border-4 border-red-600 bg-white ring-8 ring-white"
					/>
					<div class="relative border-2 border-white bg-black px-1">
						{programItem.title}
					</div>
				</div>
			{/each}
		</div>
	</div>
	<Divider direction="up" />
	<Footer currentPage="1" totalPages="13" />
</Page>

<Page>
	<Header title="Das Brautpaar" />
	<Divider />
	<div class="relative grow">
		<div class="absolute right-0 left-0 top-1/2 -translate-y-1/2">
			<hr class="border border-black" />
		</div>
		<div class="absolute right-0 left-0 top-1/2 mx-4 flex -translate-y-1/2 justify-around">
			{#each milestones as _}
				<div class="h-3 w-3 rounded-full bg-black" />
			{/each}
		</div>
		<div class="absolute top-0 right-0 bottom-0 left-0 mx-4 flex items-center justify-around">
			{#each milestones as _, id}
				<div class="h-28 w-[0.175rem] bg-black {id % 2 === 0 ? 'mb-36' : 'mt-36'}" />
			{/each}
		</div>
		<div
			class="absolute top-0 right-0 bottom-0 left-0 mx-4 flex items-center justify-around font-heading text-3xl"
		>
			{#each milestones as milestone, id}
				<div
					class="flex flex-col text-center {id % 2 === 0 ? 'mt-[25%]' : 'mb-[25%]'} min-w-[4.5rem]"
				>
					<span class="font-display text-6xl leading-[0.9]">{milestone.date.getDate()}</span>
					<span class="bg-black px-1 font-heading text-lg leading-none tracking-wider text-white">
						{monthNames[milestone.date.getMonth()]}
					</span>
					<div class="flex justify-between font-heading text-3xl font-bold">
						{#each milestone.date.getFullYear().toString().split('') as num}
							<span>{num}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<div class="absolute top-0 right-0 bottom-0 left-0 mr-8 flex items-center justify-start">
			{#each milestones as milestone, id}
				{#if id % 2 == 0}
					<div class="relative mr-3 mb-[85%]">
						<div class="absolute top-2 left-2 h-full w-full border-4 border-red-600 bg-white" />
						<div
							class="relative flex min-h-[6rem] min-w-[5rem] max-w-[5rem] flex-col items-center border-4 border-black bg-white ring-2 ring-white"
						>
							{@html milestone.image}
							<span class="self-stretch bg-black text-center text-sm text-white"
								>{milestone.title}</span
							>
						</div>
					</div>
					<div class="grow" />
				{/if}
			{/each}
		</div>
		<div class="absolute top-0 right-0 bottom-0 left-0 ml-8 flex items-center justify-end">
			{#each milestones as milestone, id}
				{#if id % 2 == 1}
					<div class="grow" />
					<div class="relative mb-3 mr-3 mt-[85%]">
						<div class="absolute top-2 left-2 h-full w-full border-4 border-red-600 bg-white" />
						<div
							class="relative flex min-h-[6rem] min-w-[5rem] max-w-[5rem] flex-col items-center border-4 border-black bg-white ring-2 ring-white"
						>
							{@html milestone.image}
							<span class="self-stretch bg-black text-center text-sm text-white"
								>{milestone.title}</span
							>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
	<Divider direction="up" />
	<Footer currentPage="2" totalPages="13" />
</Page>

<Page>
	<Timeline />
	<Divider />
	<div class="flex grow flex-col items-center justify-center gap-12 text-center">
		<h1 class="font-display text-4xl">Kirchliche Trauung</h1>
		<div>
			<h2 class="font-heading text-3xl">Einzug der Braut</h2>
			<div class="text-lg">Gesang: Mareike Riegert</div>
			<div class="text-lg">Pianist:</div>
		</div>
		<div>
			<h2 class="font-heading text-3xl">Begrüßung</h2>
			<div class="text-lg">Pastorin: Christine Finkbeiner</div>
		</div>
	</div>
	<Divider direction="up" />
	<Footer currentPage="3" totalPages="13" />
</Page>

<Page>
	<Timeline />
	<Divider />
	<div class="flex grow flex-col items-center justify-center gap-4">
		<div class="font-heading text-3xl">Ins Wasser fällt ein Stein</div>
		<img src="/images/sheetmusic/Ins_Wasser_faellt_ein_Stein.svg" alt="sheet notes" />
	</div>
	<Divider direction="up" />
	<Footer currentPage="4" totalPages="13" />
</Page>

<Page>
	<Timeline />
	<Divider />
	<div class="flex grow flex-col items-center justify-center gap-12 text-center">
		<div>
			<h2 class="font-heading text-3xl">Gebet</h2>
			<div class="text-lg">Pastorin: Christine Finkbeiner</div>
		</div>
		<div>
			<h2 class="font-heading text-3xl">Biblische Lesung</h2>
			<div class="text-lg italic">1. Korintherbrief, 13. Kapitel</div>
			<div class="text-lg">Trauzeugin: Eleonora Buss</div>
		</div>
	</div>
	<Divider direction="up" />
	<Footer currentPage="5" totalPages="13" />
</Page>

<Page>
	<Timeline />
	<Divider />
	<div class="flex grow flex-col items-center justify-center gap-4">
		<div class="font-heading text-3xl">Liebe ist nicht nur ein Wort</div>
		<img src="/images/sheetmusic/Liebe_ist_nicht_nur_ein_Wort.svg" alt="sheet notes" />
	</div>
	<Divider direction="up" />
	<Footer currentPage="6" totalPages="13" />
</Page>

<Page>
	<Timeline />
	<Divider />
	<div class="flex grow flex-col items-center justify-center text-center">
		<div class="mb-3">
			<h2 class="font-heading text-3xl">Predigt</h2>
			<div class="text-lg">Pastorin: Christine Finkbeiner</div>
		</div>
		<div class="mb-3">
			<h2 class="font-heading text-3xl">Trauvers</h2>
			<p class="mx-auto mb-2 w-2/3 text-lg italic">
				"Du führst mich den Weg zum Leben. In deiner Nähe finde ich ungetrübte Freude; aus deiner
				Hand kommt mir ewiges Glück" - <span class="not-italic">Psalm 16,11</span>
			</p>
		</div>
		<h2 class="font-heading text-4xl">Da berühren sich Himmel und Erde</h2>
		<img src="/images/sheetmusic/Da_beruehren_sich_Himmel_und_Erde.svg" alt="sheet notes" />
	</div>
	<Divider direction="up" />
	<Footer currentPage="7" totalPages="13" />
</Page>

<Page>
	<Timeline />
	<Divider />
	<div class="flex grow flex-col items-center justify-center gap-12 text-center">
		<div>
			<h2 class="font-heading text-3xl">Trauung</h2>
			<div class="text-lg">Pastorin: Christine Finkbeiner</div>
		</div>
		<div>
			<h2 class="font-heading text-3xl">Sandzeremonie</h2>
			<div class="text-lg">Trauzeugen: Eleonora Buss & Dennis Koch</div>
		</div>
		<div>
			<h2 class="font-heading text-3xl">Trauungslied</h2>
			<div class="text-lg">Gesang: Mareike Riegert</div>
			<div class="text-lg">Pianist:</div>
		</div>
		<div>
			<h2 class="font-heading text-3xl">Fürbitten</h2>
			<div class="text-lg italic">mit Vater unser</div>
		</div>
	</div>
	<Divider direction="up" />
	<Footer currentPage="8" totalPages="13" />
</Page>

<Page>
	<Timeline />
	<div class="flex grow flex-col items-center justify-center">
		<h2 class="font-heading text-3xl">Der Herr segne dich</h2>
		<img src="/images/sheetmusic/Der_Herr_segne_dich.svg" alt="sheet notes" class="w-5/6" />
	</div>
	<Footer currentPage="9" totalPages="13" />
</Page>

<Page>
	<Timeline />
	<Divider />
	<div class="flex grow flex-col items-center justify-center gap-12 text-center">
		<div>
			<h2 class="font-heading text-3xl">Segen</h2>
			<div class="text-lg">Pastorin: Christine Finkbeiner</div>
		</div>
		<div>
			<h2 class="font-heading text-3xl">Auszug des Brautpaares</h2>
			<div class="text-lg">Gesang: Mareike Riegert</div>
			<div class="text-lg">Pianist:</div>
		</div>
		<div>
			<h2 class="font-heading text-3xl">Sektempfang</h2>
		</div>
	</div>
	<Divider direction="up" />
	<Footer currentPage="10" totalPages="13" />
</Page>

<Page>
	<Divider />
	<div class="flex grow flex-col items-center justify-center gap-4 px-24 text-center">
		<div class="font-display text-5xl"><span class="text-red-600">Schön</span>,</div>
		<div class="font-heading text-3xl">dass Ihr da seid</div>
		<p class="mb-8">
			Wir wünschen Euch eine wunderschöne Feier, einen guten Appetit, anregende Gespräche und eine
			fantastische Zeit mit all unseren Lieblingsmenschen
		</p>
		<div class="font-display text-5xl"><span class="text-red-600">Danke</span>,</div>
		<div class="font-heading text-3xl">dass Ihr diesen besonderen Tag mit uns teilt!</div>
	</div>
	<Divider direction="up" />
	<Footer currentPage="11" totalPages="13" />
</Page>

<Page>
	<Divider />
	<div class="flex grow flex-col items-center justify-center gap-2 text-center">
		<div class="font-display text-4xl">Danke an unsere Dienstleister</div>
		<div class="grid grid-cols-4 grid-rows-3 gap-4">
			{#each serviceProviders as serviceProvider}
				<div class="relative mb-2 mr-2">
					<div class="absolute top-2 left-2 h-full w-full border-4 border-red-600 bg-white" />
					<div
						class="relative flex h-full flex-col border-4 border-black bg-white ring-2 ring-white"
					>
						<div
							class="h-[7rem] w-full bg-cover bg-center bg-no-repeat"
							style="background-image: url({serviceProvider.image});"
						/>
						<div class="flex w-full grow flex-col justify-center bg-black text-sm text-white">
							<span class="self-stretch">{serviceProvider.name}</span>
							<span class="self-stretch italic">{serviceProvider.category}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<Divider direction="up" />
	<Footer currentPage="12" totalPages="13" />
</Page>

<Page>
	<Divider />
	<div class="flex grow flex-col items-center justify-center gap-8">
		<div class="mx-12 flex items-center gap-4 self-stretch px-4">
			<div class="grow border-t-2 border-black" />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-10 w-10"
				viewBox="0 0 20 20"
				fill="rgb(220,38,38)"
			>
				<path
					fill-rule="evenodd"
					d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
					clip-rule="evenodd"
				/>
			</svg>
			<div class="grow border-t-2 border-black" />
		</div>
		<div class="pb-1 text-center font-heading text-xl uppercase leading-4 tracking-wider">
			Gesucht und Gefunden, in Liebe verbunden
		</div>
	</div>
	<Divider direction="up" />
	<Footer currentPage="13" totalPages="13" />
</Page>
