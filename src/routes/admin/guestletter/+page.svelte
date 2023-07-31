<script lang="ts">
	import { invitations } from '$lib/client/stores';
	import DownloadButton from '../download-button.svelte';
	import Header from './header.svelte';
	import Page from './page.svelte';

	let downloadables: HTMLElement[] = [];
</script>

<div class="flex flex-col items-center gap-16">
    <DownloadButton {downloadables} />
	{#each $invitations
		.filter((i) => i.hidden !== true)
		.flatMap((i) => i.members)
		.filter((m) => m.accepted === 'true') as guest, i}
		<Page id={`guestletter-${i}`} bind:that={downloadables[i]} withFooter={false}>
			<Header title={`Für ${guest.name.split(' ')[0]}`} />
			<div class="font-oswald prose text-center grow text-black">
				<p>
					Herzlich willkommen zu unserer Hochzeit! Dass du heute hier bist bedeutet uns unglaublich
					viel und wir danken Dir für dein Kommen. Wir freuen uns darauf, diesen besonderen Tag mit
					Dir zu teilen und unvergessliche Momente gemeinsam zu erleben.
				</p>
				<p>
					Gerne könnt ihr das Bild vom Karikaturisten, die 3D-Namensschilder sowie die Reagenzgläser
					mit Salz und Pfeffer als Gastgeschenk mit nach Hause nehmen.
				</p>
				<p>
					Wir schätzen Dich sehr und sind dankbar, dass Du an diesem
					wichtigen Tag in unserem Leben teilnimmst. Auf eine unvergessliche Hochzeit mit Dir!
				</p>
				<p>Mit all unserer Liebe und Dankbarkeit,</p>				
			</div>
		</Page>
	{/each}
</div>
