<script lang="ts">
	import Border from './Border.svelte';

	export let site: 'left' | 'right';
	export let withoutContent = false;
</script>

<Border {site}>
	{#if !withoutContent}
		<div class="grid grow grid-cols-4 grid-rows-[auto_auto_1fr_1fr] gap-4">
			<div class="col-span-2 border-[3px] border-black p-3 leading-none">
				Name:
				<hr class="mt-12 border-black" />
			</div>
			<div class="col-span-2 row-start-2 p-3 leading-none">
				Ich/Wir kennen das Brautpaar durch/von:
				<hr class="mt-12 border-black" />
			</div>
			<div class="row-span-2 self-end">
				<div class="text-center font-cheap-pine-sans text-4xl">Verwandt:</div>
				<div class="mt-2 mb-2 grid grid-cols-4 items-center justify-center gap-3">
					<div class="test-center col-span-2">Braut:</div>
					<div class="col-span-2 text-center">Bräutigam:</div>
					<div class="uppercase">Ja</div>
					<div class="aspect-square h-6 border-2 border-black" />
					<div class="uppercase">Ja</div>
					<div class="aspect-square h-6 border-2 border-black" />
					<div class="uppercase">Nein</div>
					<div class="aspect-square h-6 border-2 border-black" />
					<div class="uppercase">Nein</div>
					<div class="aspect-square h-6 border-2 border-black" />
				</div>
			</div>
			<div class="row-span-2 self-end">
				<div class="text-center font-cheap-pine text-7xl text-red-600">Schön</div>
				<div class="text-center font-cheap-pine text-[2.1rem]">dass du da bist!</div>
			</div>
			<div class="relative col-span-2 row-span-2 border-2 border-black p-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="absolute -top-6 left-1/2 h-10 w-10 -translate-x-1/2 text-red-600"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
						clip-rule="evenodd"
					/>
					<path
						fill="none"
						stroke="white"
						stroke-width="0.15rem"
						d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
						clip-rule="evenodd"
					/>
				</svg>
				<slot name="heart-box-1" />
			</div>
			<div class="col-span-2 border-2 border-black p-3">
				<slot name="normal-box-1" />
			</div>
			<div class="col-span-2 border-2 border-black p-3">
				<slot name="normal-box-2" />
			</div>
		</div>
		<div class="mt-4 flex gap-4">
			<div
				class="bg-placeholder-photo relative h-[150mm] w-[100mm] min-w-[100mm] bg-center text-gray-300"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="absolute top-1/2 left-1/2 h-96 -translate-x-1/2 -translate-y-1/2 text-white"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
						clip-rule="evenodd"
					/>
					<path
						fill="none"
						stroke="rgb(209, 213, 219)"
						stroke-width="0.03rem"
						d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
						clip-rule="evenodd"
					/>
				</svg>
				<div
					class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-cheap-pine-sans text-2xl"
				>
					Bitte klebt hier euer Foto von euch aus der Fotobox ein.<br />
					<span class="text-3xl">Dankeschön!</span>
				</div>
			</div>
			<div class="grid grow grid-cols-1 grid-rows-3 gap-5">
				<div class="flex flex-col justify-between p-4">
					<span class="text-center font-cheap-pine-sans text-3xl">Platz für kreativen Wünsche:</span
					>
					<hr class="border-black" />
					<hr class="border-black" />
					<hr class="border-black" />
				</div>

				<div class="relative border-2 border-black p-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="absolute -top-6 left-1/2 h-10 w-10 -translate-x-1/2 text-red-600"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							clip-rule="evenodd"
						/>
						<path
							fill="none"
							stroke="white"
							stroke-width="0.15rem"
							d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							clip-rule="evenodd"
						/>
					</svg>
					<slot name="heart-box-2" />
				</div>
				<div class="relative border-2 border-black p-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="absolute -top-6 left-1/2 h-10 w-10 -translate-x-1/2 text-red-600"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							clip-rule="evenodd"
						/>
						<path
							fill="none"
							stroke="white"
							stroke-width="0.15rem"
							d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							clip-rule="evenodd"
						/>
					</svg>
					<slot name="heart-box-3" />
				</div>
			</div>
		</div>
	{/if}
</Border>

<style>
	.bg-placeholder-photo {
		background-image: url('/images/icons/heart.svg');
		background-size: 2rem;
	}
</style>
