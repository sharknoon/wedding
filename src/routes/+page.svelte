<script lang="ts">
	import { page } from '$app/stores';

	let code = '';
	$: href = code.trim().toLowerCase();
	$: message = $page.url.searchParams.get('message') || '';
</script>

<div
	class="container flex min-h-screen flex-col justify-center gap-6 p-12 align-middle md:mx-auto md:gap-8"
>
	<span class="text-center font-cheap-pine text-4xl md:text-6xl">Herzlich willkommen!</span>
	<span class="text-center font-oswald text-2xl md:text-4xl">
		Bitte scanne den <span class="text-red-600">QR-Code</span> deiner Einladungskarte oder gebe den
		<span class="text-red-600">Einladungscode</span> hier ein:
	</span>
	<div class="mx-auto flex items-center">
		<input
			type="text"
			name="code"
			on:keyup={(e) => (e.key === 'Enter' ? (window.location.href = href) : '')}
			bind:value={code}
			placeholder="Einladungscode"
			class="h-10 border-transparent bg-gray-300 text-black transition focus:border-transparent focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-100"
		/>
		<button
			on:click={() => (window.location.href = href)}
			class="flex items-center bg-black px-3 py-2 text-white"
			aria-label="Next"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
			</svg>
		</button>
	</div>
	<span class="text-center text-lg font-bold text-red-600">{message}</span>
</div>
