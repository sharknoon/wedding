<script lang="ts">
	import DownloadButton from '../download-button.svelte';
	import Site from './site.svelte';

	const heartBox1Texts = [
		'Welche besonderen Erinnerungen habt ihr zusammen mit dem Brautpaar?',
		'Ein lustiger Moment mit dem Brautpaar',
		'Ein schöner Moment mit dem Brautpaar'
	];
	const normalBox1Texts = [
		'Das kann das Brautpaar besonders gut:',
		'Die Trauung war wunderschön, aber das ging mir während der Zeremonie wirklich durch den Kopf:',
		'Ich habe mich sehr auf diesen Tag gefreut, ich bin aber eigentlich hier wegen:'
	];
	const normalBox2Texts = [
		'Das sollte man in einer Ehe einmal im Jahr machen:',
		"Was ist das beste Rezept für eine gute Ehe?<div class='text-sm text-left leading-none mt-1'>&#9634; Das habe ich so gehört<br />&#9634; Aus eigener Erfahrung<br />&#9634; Habe ich aus einem Kochbuch</div>",
		'Mein bester Ratschlag für eine glückliche Ehe:'
	];
	const heartBox2Texts = [
		'Welcher Moment des heutigen Abends wird dir ganz besonders in Erinnerung bleiben?',
		'Beschreibe das Brautpaar in 3 Worten',
		"Der schönste Augenblick heute war?<div class='text-sm leading-none flex gap-1 mt-2'><div>gar nicht<br />zufrieden</div><div>0<br />&#9634;</div><div>1<br />&#9634;</div><div>2<br />&#9634;</div><div>3<br />&#9634;</div><div>4<br />&#9634;</div><div>5<br />&#9634;</div><div>6<br />&#9634;</div><div>7<br />&#9634;</div><div>8<br />&#9634;</div><div>9<br />&#9634;</div><div>10<br />&#9634;</div><div>voll<br />zufrieden</div></div>"
	];
	const heartBox3Texts = [
		'Das Beste am Heiraten ist:',
		'So bleibt eure Liebe frisch:',
		'Das solltet ihr im ersten Ehejahr unbedingt machen:'
	];

	let downloadables: HTMLElement[] = [];
</script>

<div class="flex flex-col items-center gap-16">
	<DownloadButton {downloadables} />
	<div
		class="h-[303mm] w-[216mm] max-w-[216mm] grid-cols-2 bg-white p-[8mm] shadow-2xl"
		id="guestbook-front"
		bind:this={downloadables[0]}
	>
		<div class="relative flex h-full flex-col border-2 border-dashed border-gray-900 p-4">
			<h1 class="absolute top-[16%] left-1/2 mb-8 -translate-x-1/2 font-cheap-pine text-6xl">
				Gästebuch
			</h1>
			<div class="flex grow flex-col items-center justify-center gap-8 px-12">
				<div class="grid h-[17rem] w-[17rem] grid-cols-2 grid-rows-1">
					<div
						style="background-image: url('/images/people/midrene-and-josua-large.avif')"
						class="col-start-1 row-start-1 bg-cover bg-center bg-no-repeat"
					/>
					<div class="col-start-2 row-start-1 flex flex-col">
						<div
							class="flex flex-1 items-end justify-center text-center font-cheap-pine-sans text-4xl uppercase tracking-widest"
						>
							B l a c k
						</div>
						<div
							class="flex-1 bg-black text-center font-cheap-pine-sans text-4xl uppercase tracking-widest text-white"
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
				<div
					class="pb-1 text-center font-cheap-pine-sans text-xl uppercase leading-4 tracking-wider"
				>
					Gesucht und Gefunden, in Liebe verbunden
				</div>
			</div>
		</div>
	</div>

	{#each [1, 2, 3] as i}
		<div id={`guestbook-${i}`} bind:this={downloadables[i]}>
			<Site>
				<div slot="heart-box-1" class="flex h-full flex-col justify-between text-center">
					<span>{heartBox1Texts[i - 1]}</span>
					<hr class="border-black" />
					<hr class="border-black" />
					<hr class="border-black" />
					<hr class="border-black" />
					<hr class="border-black" />
				</div>
				<div slot="normal-box-1" class="flex h-full flex-col justify-between text-center">
					<span class="leading-tight">{normalBox1Texts[i - 1]}</span>
					<hr class="border-black" />
				</div>
				<div slot="normal-box-2" class="flex h-full flex-col justify-between text-center">
					<span class="leading-tight">{@html normalBox2Texts[i - 1]}</span>
					<hr class="border-black" />
				</div>
				<div slot="heart-box-2" class="flex h-full flex-col justify-between text-center">
					<span class="leading-tight">{@html heartBox2Texts[i - 1]}</span>
					<hr class="border-black" />
					<hr class="border-black" />
				</div>
				<div slot="heart-box-3" class="flex h-full flex-col justify-between text-center">
					<span class="leading-tight">{heartBox3Texts[i - 1]}</span>
					<hr class="border-black" />
					<hr class="border-black" />
				</div>
			</Site>
		</div>
	{/each}

	<div
		class="h-[303mm] w-[216mm] max-w-[216mm] grid-cols-2 bg-white p-[8mm] shadow-2xl"
		id="guestbook-back"
		bind:this={downloadables[4]}
	>
		<div class="flex h-full flex-col border-2 border-dashed border-gray-900 p-4">
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
				<div
					class="pb-1 text-center font-cheap-pine-sans text-xl uppercase leading-4 tracking-wider"
				>
					Gesucht und Gefunden, in Liebe verbunden
				</div>
			</div>
		</div>
	</div>

	<div class="text-center">
		216x303mm, Buch DIN A4 hoch, Umschlag: Hardcover 4/0-farbig, Inhalt: 48 farbige Innenseiten
		(4/4-farbig), 135g Papier, <a
			class="hover:underline"
			href="
			https://www.wir-machen-druck.de/buch-din-a4-hoch-umschlag-hardcover-40farbiginhalt-48-farbige-innenseiten-44farbig.html"
			target="_blank"
		>
			WIRmachenDRUCK
		</a>
		<br />
		Datenformat: 302x111mm, Beschnitt: 3mm, Sicherheitsabstand: 3mm
	</div>
</div>
