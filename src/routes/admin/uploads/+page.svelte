<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	function deleteUpload(id: string) {
		fetch(`/admin/uploads/${id}`, {
			method: 'DELETE'
		}).then(() => {
			invalidateAll();
		});
	}
</script>

<div class="container mx-auto font-oswald">
	<table class="w-full table-auto break-words border-2 border-black text-lg">
		<thead>
			<tr class="h-full bg-black font-cheap-pine-sans text-xl text-white">
				<th class="px-1 py-2 sm:px-6 sm:py-4 sm:text-3xl"></th>
				<th class="px-1 py-2 sm:px-6 sm:py-4 sm:text-3xl">Name</th>
				<th class="px-1 py-2 sm:px-6 sm:py-4 sm:text-3xl">Uploaddatum</th>
				<th class="px-1 py-2 sm:px-6 sm:py-4 sm:text-3xl">Aktionen</th>
			</tr>
		</thead>
		<tbody>
			{#each data.uploads as upload, i}
				<tr class:bg-gray-100={i % 2 === 1} class="border-t-2 border-black text-center">
					<td class="p-2 sm:p-3">
						<img src={upload.thumbnailUrl} alt={upload.originalFilename} class="max-h-24" />
					</td>
					<td class="p-2 sm:p-3">
						{upload.originalFilename}
					</td>
					<td class="p-2 sm:p-3">
						{new Date(upload.createdAt).toLocaleString()}
					</td>
					<td class="p-2 sm:p-3">
						<div class="flex h-full flex-wrap items-center justify-center gap-4 md:flex-nowrap">
							<a
								href={upload.originalUrl}
								class="border-0 bg-black p-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-black/75 focus:ring-2"
								download
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-6 w-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
									/>
								</svg>
							</a>
							<button
								on:click={() => deleteUpload(upload._id.toString())}
								class="border-0 bg-black p-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-red-600 focus:ring-2"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</button>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
