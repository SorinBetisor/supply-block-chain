<script lang="ts">
	import { Button } from "$lib/components/ui/button";
</script>

<div class="min-h-screen flex flex-col items-center justify-center gap-6 sm:gap-8 p-4 sm:p-8">
	<div class="text-center space-y-3 sm:space-y-4 max-w-2xl px-4">
		<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">Blockchain Supply Chain Demo</h1>
		<p class="text-muted-foreground text-base sm:text-lg">Explore blockchain technology in supply chain management</p>
	</div>

	<div class="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4">
		<Button href="/blockchain-editor" size="lg" variant="default" class="w-full sm:w-auto">
			Blockchain Editor
		</Button>
		<Button href="/zara-demo" size="lg" variant="outline" class="w-full sm:w-auto">
			Zara Demo
		</Button>
	</div>
</div>

