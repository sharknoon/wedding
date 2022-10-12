<script lang="ts">
	import Site from './site.svelte';
	import { downloadIds } from '$lib/client/stores';

	$downloadIds = [];

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
		"Was ist das beste Rezept für eine gute Ehe?<div class='text-sm text-left leading-none'>&#9634; Das habe ich so gehört<br />&#9634; Aus eigener Erfahrung<br />&#9634; Habe ich auch einem Kochbuch</div>",
		'Mein bester Ratschlag für eine glückliche Ehe:'
	];
	const heartBox2Texts = [
		'Welcher Moment des heutigen Abends wird dir ganz besonders in Erinnerung bleiben?',
		'Beschreibe das Brautpaar in 3 Worten',
		"Der schönste Augenblick heute war?<div class='text-sm leading-none flex gap-1'><div>gar nicht<br />zufrieden</div><div>0<br />&#9634;</div><div>1<br />&#9634;</div><div>2<br />&#9634;</div><div>3<br />&#9634;</div><div>4<br />&#9634;</div><div>5<br />&#9634;</div><div>6<br />&#9634;</div><div>7<br />&#9634;</div><div>8<br />&#9634;</div><div>9<br />&#9634;</div><div>10<br />&#9634;</div><div>voll<br />zufrieden</div></div>"
	];
	const heartBox3Texts = [
		'Das Beste am Heiraten ist:',
		'So bleibt eure Liebe frisch:',
		'Das solltet ihr im ersten Ehejahr unbedingt machen:'
	];
</script>

<div class="flex flex-col items-center gap-16">
	{#each [1, 2, 3] as i}
		<Site id={`guestbook-${i}`}>
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
	{/each}

	<div class="text-center">
		216x303mm, Buch DIN A4 hoch, Umschlag: Hardcover 4/0-farbig, Inhalt: 48 farbige Innenseiten
		(4/4-farbig), <a
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
