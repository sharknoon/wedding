<script lang="ts">
	import DownloadButton from '../download-button.svelte';

	const challenges = [
		'Fotografiere dich mit dem schönsten Gegenstand der Hochzeit',
		'Fotografiere dich zusammen mit dem Gast im schönsten Outfit',
		'Fotografiere dich mit dem Paar welches am längsten verheiratet ist',
		'Fotografiere dich in Gangster-Pose',
		'Mache ein Foto zusammen mit möglichst vielen Gästen, die heute etwas Rotes tragen',
		'Fotografiere dich zusammen mit der Braut - und bewundere dabei ihr Kleid',
		'Fotografiere dich zusammen mit möglichst vielen Gästen, die im gleichen Monat Geburtstag haben wie der Bräutigam',
		'Fotografiere dich zusammen mit einem der Trauzeugen und einem bezaubernden Lächeln',
		'Fotografiere dich zusammen mit der Person, die heute am lautesten und ausgelassensten',
		'Mach ein Foto von dir mit vielen lachenden Personen',
		'Mach ein Foto von dir mit der Person die am längsten mit der Braut befreundet ist',
		'Mach ein Foto von dir mit der Person die am längsten mit dem Bräutigam befreundet ist',
		'Mach ein Foto von dir zusammen mit dem Brautpaar',
		'Mach ein Foto von dir zusammen mit dem Bräutigam während ihr Grimassen schneidet',
		'Mach ein Foto von dir zusammen mit der Braut und ihrem Brautstrauß',
		'Mach ein Foto mit einer gleichaltrigen Person',
		'Fotografiere dich mit einer Person, die mehrmals 10 Jahre verheiratet ist',
		'Fotografiere dich mit jemandem, der ein Musikinstrument spielen kann',
		'Fotografier dich mit jemandem, der vor kurzem geheiratet hat',
		'Fotografiere dich mit jemandem, der mit der Braut verwandt ist',
		'Fotografiere dich mit jemandem, der gleich groß ist wie du',
		'Fotografiere dich mit dem jüngsten Gast',
		'Fotografiere dich mit dem ältesten Gast',
		'Fotografiere dich mit der Person mit der schönsten Frisur',
		'Fotografiere dich mit einer Person, die eine Glatze hat',
		'Mach ein Foto mit jemandem, der Single ist',
		'Mach ein Foto mit jemandem, der mindestens zwei Kinder hat',
		'Mache ein Foto mit allen Personen an deinem Tisch',
		'Mache ein Foto beim Anstoßen',
		'Mache ein Foto beim Huckepack-Tragen',
		'Mach ein Foto mit der Mutter der Braut',
		'Mach ein Foto mit der größten Person',
		'Mach ein Foto mit der kleinsten Person',
		'Mach ein Foto mit jenen Personen, die als nächstes heiraten',
		'Fotografiere dich mit einer schönen Hochzeitsdeko',
		'Fotografiere dich mit dem DJ',
		'Fotografiere dich mit dem Fotografen',
		'Fotografiere dich mit der Hochzeitsplanerin',
		'Fotografiere dich mit den Eltern der Braut',
		'Fotografiere dich mit den Paten des Bräutigams',
		'Fotografiere dich mit deinem Sitznachbarn',
		'Fotografiere dich mit den Brautjungfern',
		'Fotografiere dich mit zwei Freunden des Bräutigams',
		'Fotografiere dich mit zwei Freundinnen der Braut',
		'Fotografiere dich mit der Person mit der längsten Anreise',
		'Fotografiere dich mit den Geschwistern des Bräutigams',
		'Mach ein Foto mit der Person mit dem schönsten Anzug',
		'Mach ein Foto mit deinem linken und rechten Tischnachbarn',
		'Mach ein Foto mit dem Paar das am längsten verheiratet ist',
		'Mach ein Foto mit der Band',
		'Mach ein Foto mit der Cousine der Braut',
		'Mach ein Foto von dir und der Person, die dir am ähnlichsten aussieht',
		'Mach ein Foto von dir mit der Person, mit der du gerade eben gesprochen hast',
		'Mach ein Foto von dir mit einer Person, die du schon vor der Hochzeit kanntest',
		'Mach ein Foto von dir mit einer Person, deren Outfit so ähnlich aussieht, wie deines'
	];

	let downloadables: HTMLElement[] = [];
</script>

<div class="flex flex-col items-center gap-16">
	<DownloadButton {downloadables} />
	<div
		class="flex h-[80mm] max-h-[80mm] w-[111mm] flex-col justify-around bg-white p-[6mm] shadow-2xl"
		id="fotochallenge-front"
		bind:this={downloadables[0]}
	>
		<div class="flex grow items-center gap-2">
			<div class="grid aspect-square h-auto w-1/2 grid-cols-2 grid-rows-2">
				<div
					style="background-image: url('/images/people/midrene-and-josua-large.avif')"
					class="col-start-1 row-span-2 row-start-1 bg-cover bg-center bg-no-repeat"
				/>
				<div
					class="col-start-2 row-start-1 flex justify-center self-end font-cheap-pine-sans text-2xl uppercase tracking-widest"
				>
					B l a c k
				</div>
				<div
					class="col-start-2 row-start-2 flex justify-center bg-black font-cheap-pine-sans text-2xl uppercase tracking-widest text-white"
				>
					W h i t e
				</div>
			</div>
			<div class="flex grow flex-col gap-2">
				<div class="text-center font-cheap-pine text-4xl uppercase">Die Paparazzi</div>
				<div class="text-center font-cheap-pine-sans text-2xl uppercase">
					für <span class="text-red-600">Midrène</span> & <span class="text-red-600">Josua</span>
				</div>
				<div class="mx-3 flex items-center gap-3 px-3">
					<div class="grow border-t-2 border-black" />
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-10 w-10 text-red-600"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
							clip-rule="evenodd"
						/>
					</svg>
					<div class="grow border-t-2 border-black" />
				</div>
				<div class="bg-black text-center font-cheap-pine-sans text-xl leading-none text-white">
					Macht einen Schnappschuss
				</div>
				<div class="text-center font-cheap-pine-sans text-xl uppercase">
					und meistert die <span class="text-red-600">Challenges</span>
				</div>
			</div>
		</div>
		<div class="border-t-2 border-black" />
		<div class="pt-2 text-center font-cheap-pine-sans text-xl tracking-widest">
			Gesucht und Gefunden, in Liebe verbunden
		</div>
	</div>

	{#each challenges as challenge, i}
		<div
			class="flex h-[80mm] max-h-[80mm] w-[111mm] flex-col gap-2 divide-y-2 divide-black bg-white p-[6mm] shadow-2xl"
			id={`fotochallenge-back-${i}`}
			bind:this={downloadables[i + 1]}
		>
			<div class="flex items-center py-1">
				<div class="mx-6 grow border-t-2 border-red-600" />
				<span class="font-cheap-pine text-4xl uppercase">Die Challenge</span>
				<div class="mx-6 grow border-t-2 border-red-600" />
			</div>
			<div class="flex grow items-center text-center font-oswald text-2xl">
				<div class="w-full">{challenge}</div>
			</div>
			<div class="flex items-center justify-between pt-2">
				<div class="font-cheap-pine-sans text-xl text-red-600">Mission:</div>
				<div class="font-cheap-pine-sans text-xl">Bilder für die Ewigkeit</div>
				<div
					class="flex items-center justify-evenly bg-black px-1 text-center font-cheap-pine-sans text-xl uppercase tracking-wider text-white"
				>
					<span>B l a c k</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8"
						viewBox="0 0 20 20"
						fill="rgb(220,38,38)"
					>
						<path
							fill-rule="evenodd"
							d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							clip-rule="evenodd"
						/>
					</svg>
					<span> W h i t e </span>
				</div>
			</div>
		</div>
	{/each}

	<div class="text-center">
		{challenges.length} Sprüche
		<br />
		105x74mm, Flyer DIN A7 Quer, beidseitig bedruckt, 250g Papier,
		<a
			class="hover:underline"
			href="https://www.wir-machen-druck.de/flyer-din-a7-quer-105-cm-x-74-cm-beidseitig-bedruckt.html"
			target="_blank"
			rel="noreferrer"
		>
			WIRmachenDRUCK
		</a>
		<br />
		Datenformat: 111x80mm, Beschnitt: 3mm, Sicherheitsabstand: 6mm
	</div>
</div>
