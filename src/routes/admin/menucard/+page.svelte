<script lang="ts">
	import { downloadIds } from '$lib/stores';

	$downloadIds = ['menucard'];
</script>

<div class="flex flex-col items-center gap-16">
	<div
		class="grid h-[216mm] max-h-[216mm] w-[154mm] grid-cols-3 gap-[6mm] bg-white p-[6mm] shadow-2xl"
		id="menucard"
	/>
	<div class="text-center">
		148x210mm, Speisekarte DIN A5, beidseitig bedruckt, <a
			class="hover:underline"
			href="https://www.wir-machen-druck.de/speisekarte-din-a5-148-cm-x-210-cm-beidseitig-bedruckt.html"
			target="_blank"
		>
			WIRmachenDRUCK
		</a>
		<br />
		Datenformat: 154x216mm, Beschnitt: 3mm, Sicherheitsabstand: 6mm
	</div>
</div>
