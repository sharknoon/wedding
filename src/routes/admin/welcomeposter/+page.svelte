<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const date = new Date(data.details.date);
	const location = data.details.locationName;
</script>

<div class="flex flex-col items-center gap-16">
	<div class="h-[303mm] w-[426mm] max-w-[426mm] bg-white p-[9mm] shadow-2xl" id="welcomeposter">
		<div
			class="grid h-full grid-cols-[4fr_3fr] items-center border-[3px] border-dashed border-black "
		>
			<div class="mx-auto flex flex-col justify-center gap-4">
				<h1 class="mb-16 font-cheap-pine text-8xl">Herzlich Willkommen</h1>
				<div class="text-center font-cheap-pine text-7xl uppercase">zur Hochzeit</div>
				<div class="pt-4 text-center font-cheap-pine-sans text-6xl uppercase">
					von <span class="text-red-600">Midrène</span> & <span class="text-red-600">Josua</span>
				</div>
				<div
					class="pt-1 pb-2 text-center font-cheap-pine-sans text-3xl uppercase leading-4 tracking-wider"
				>
					Gesucht und Gefunden, in Liebe verbunden
				</div>
				<div class="mx-16 flex items-center gap-5 px-5">
					<div class="grow border-t-[3px] border-black" />
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-16 w-16"
						viewBox="0 0 20 20"
						fill="rgb(220,38,38)"
					>
						<path
							fill-rule="evenodd"
							d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							clip-rule="evenodd"
						/>
					</svg>
					<div class="grow border-t-[3px] border-black" />
				</div>
				<div class="text-center font-cheap-pine-sans text-6xl leading-none">{location}</div>
				<div class="text-center font-cheap-pine-sans text-5xl leading-none text-red-600">
					{date.toLocaleDateString('DE-DE', {
						day: '2-digit',
						month: 'long',
						year: 'numeric'
					})}
				</div>
			</div>

			<div class="mx-auto grid aspect-square h-[35rem] grid-cols-2">
				<div
					style="background-image: url('/images/people/midrene-and-josua.JPG')"
					class="col-start-1 row-start-1 bg-cover bg-center bg-no-repeat"
				/>
				<div class="col-start-2 row-start-1 flex flex-col">
					<div
						class="flex flex-1 items-end justify-center text-center font-cheap-pine-sans text-6xl uppercase tracking-wider"
					>
						B l a c k
					</div>
					<div
						class="flex-1 bg-black text-center font-cheap-pine-sans text-6xl uppercase tracking-wider text-white"
					>
						W h i t e
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="text-center">
		420x297mm, Plakat DIN A3 quer einseitig 4/0-farbig bedruckt <a
			class="hover:underline"
			href="https://www.wir-machen-druck.de/plakat-din-a3-quer-420-x-297-mm-einseitig-40farbig-bedruckt-topseller.html"
			target="_blank"
		>
			WIRmachenDRUCK
		</a>
		<br />
		Datenformat: 426x303mm, Beschnitt: 3mm, Sicherheitsabstand: 6mm
	</div>
</div>
