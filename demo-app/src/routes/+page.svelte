<script lang="ts">
	import { Button } from "$lib/components/ui/button";
</script>

<div class="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
	<div class="text-center space-y-4">
		<h1 class="text-4xl font-bold">Blockchain Supply Chain Demo</h1>
		<p class="text-muted-foreground text-lg">Explore blockchain technology in supply chain management</p>
	</div>

	<div class="flex flex-col sm:flex-row gap-4">
		<Button href="/blockchain-editor" size="lg" variant="default">
			Blockchain Editor
		</Button>
		<Button href="/zara-demo" size="lg" variant="outline">
			Zara Demo
		</Button>
	</div>
</div>

