<script>
  import "../app.postcss"
	import Header from '../components/header.svelte';
	import Sidebar from '../components/sidebar.svelte';
	import Footer from '../components/footer.svelte';
</script>

<div class="container mx-auto flex flex-col min-h-full">
	<Header />

	<main class="flex-grow pb-6">
		<div class="font-normal text-gray-900 text-base sm:text-base p-6 flex lg:p-8">
			<Sidebar />
			<div class="w-full sm:w-4/5 font-light">
				<slot></slot>
			</div>
		</div>
	</main>

	<Footer />
</div>