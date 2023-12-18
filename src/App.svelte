<script>
	import Counter from './lib/Counter.svelte'

	let name = 'Svelte'
</script>

<h1>Hello {name.toLocaleLowerCase()}!</h1>

<Counter />

<style>
	h1 {
		color: red;
	}
</style>
