<script lang="ts">
	import { downloadIds } from '$lib/stores';

	$downloadIds = ['musicwishcard-front', 'musicwishcard-back'];
</script>

<div class="flex h-full flex-col items-center justify-center gap-16">
	<div
		class="flex h-[18rem] max-h-[18rem] w-[25rem] flex-col justify-around bg-white p-2 shadow-2xl"
		id="musicwishcard-front"
	>
		<div class="flex grow items-center gap-2">
			<div class="grid aspect-square h-auto w-1/2 grid-cols-2 grid-rows-2">
				<div
					style="background-image: url('/images/people/midrene-and-josua-large.png')"
					class="col-start-1 row-span-2 row-start-1 bg-cover bg-center bg-no-repeat grayscale"
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
				<div class="text-center font-cheap-pine text-4xl uppercase">Die Party</div>
				<div class="text-center font-cheap-pine-sans text-2xl uppercase">
					von <span class="text-red-600">Midrène</span> & <span class="text-red-600">Josua</span>
				</div>
				<div class="mx-3 flex items-center gap-4 px-3">
					<div class="grow border-t-2 border-black" />
					<div class="flex h-8 items-center gap-1">
						<div class="h-2 grow border-r-4 border-red-600" />
						<div class="h-5 grow border-r-4 border-red-600" />
						<div class="h-8 grow border-r-4 border-red-600" />
						<div class="h-5 grow border-r-4 border-red-600" />
						<div class="h-2 grow border-r-4 border-red-600" />
					</div>
					<div class="grow border-t-2 border-black" />
				</div>
				<div class="bg-black text-center font-cheap-pine-sans text-3xl leading-none text-white">
					Dreht den Beat auf
				</div>
				<div class="text-center font-cheap-pine-sans text-xl uppercase">
					mit <span class="text-red-600">euren</span> Musikwünschen
				</div>
			</div>
		</div>
		<div class="border-t-2 border-black" />
		<div class="pt-2 text-center font-cheap-pine-sans text-xl tracking-widest">
			Gesucht und Gefunden, in Liebe verbunden
		</div>
	</div>

	<div
		class="flex h-[18rem] max-h-[18rem] w-[25rem] flex-col gap-2 divide-y-2 divide-black bg-white p-2 shadow-2xl"
		id="musicwishcard-back"
	>
		<div class="flex items-center py-1">
			<div class="mx-6 grow border-t-2 border-red-600" />
			<span class="font-cheap-pine text-4xl uppercase">Meine Musikwünsche</span>
			<div class="mx-6 grow border-t-2 border-red-600" />
		</div>
		<div class="grid grow grid-cols-1 grid-rows-3 px-4 pb-2">
			<div class="border-b border-black" />
			<div class="border-b border-black" />
			<div class="border-b border-black" />
		</div>
		<div class="flex items-center justify-between pt-2">
			<div class="font-cheap-pine-sans text-3xl">DJ Janis Blum</div>
			<div class="font-cheap-pine-sans text-3xl text-red-600">feat.</div>
			<div
				class="flex items-center justify-evenly bg-black px-1 text-center font-cheap-pine-sans text-2xl uppercase tracking-widest text-white"
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
</div>
