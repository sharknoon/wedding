<script lang="ts">
	const faqs = [
		{
			question: 'A Querstion you might have',
			answer:
				'A quick answer, that maybe is a little bit longer, so I have to write useless text here in order to represent a longer anser :)'
		},
		{
			question: 'A Querstion you might have',
			answer:
				'A quick answer, that maybe is a little bit longer, so I have to write useless text here in order to represent a longer anser :)'
		},
		{
			question: 'A Querstion you might have',
			answer:
				'A quick answer, that maybe is a little bit longer, so I have to write useless text here in order to represent a longer anser :)'
		},
		{
			question: 'A Querstion you might have',
			answer:
				'A quick answer, that maybe is a little bit longer, so I have to write useless text here in order to represent a longer anser :)'
		},
		{
			question: 'A Querstion you might have',
			answer:
				'A quick answer, that maybe is a little bit longer, so I have to write useless text here in order to represent a longer anser :)'
		},
		{
			question: 'A Querstion you might have',
			answer:
				'A quick answer, that maybe is a little bit longer, so I have to write useless text here in order to represent a longer anser :)'
		},
		{
			question: 'A Querstion you might have',
			answer:
				'A quick answer, that maybe is a little bit longer, so I have to write useless text here in order to represent a longer anser :)'
		},
		{
			question: 'A Querstion you might have',
			answer:
				'A quick answer, that maybe is a little bit longer, so I have to write useless text here in order to represent a longer anser :)'
		},
		{
			question: 'A Querstion you might have',
			answer:
				'A quick answer, that maybe is a little bit longer, so I have to write useless text here in order to represent a longer anser :)'
		}
	];
</script>

<div class="min-h-screen">
	{#each faqs as faq}
		<h3>{faq.question}</h3>
		<p>{faq.answer}</p>
	{/each}
</div>
