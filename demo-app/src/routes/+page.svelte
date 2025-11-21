<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { ArrowRight, Database, ShoppingBag, Github, Layers, ShieldCheck } from "@lucide/svelte";
</script>

<div class="min-h-screen flex flex-col bg-background">
	<!-- Hero Section -->
	<section class="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
		<div class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
		<div class="absolute inset-0 -z-10 bg-linear-to-b from-primary/5 via-transparent to-transparent opacity-40"></div>
		
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-4xl text-center">
				<div class="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
					<span class="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
					Next-Gen Supply Chain
				</div>
				
				<h1 class="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
					Transparent Tracking with <span class="bg-clip-text text-transparent bg-linear-to-r from-primary to-purple-600">Blockchain</span>
				</h1>
				
				<p class="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
					Experience the future of logistics. Secure, immutable, and transparent product tracking from manufacturing to delivery.
				</p>
				
				<div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
					<Button href="/blockchain-editor" size="lg" class="w-full sm:w-auto gap-2 text-base h-12 px-8 shadow-lg shadow-primary/20">
						<Database class="h-5 w-5" />
						Open Editor
						<ArrowRight class="h-4 w-4 ml-1" />
					</Button>
					<Button href="/zara-demo" variant="outline" size="lg" class="w-full sm:w-auto gap-2 text-base h-12 px-8 backdrop-blur-sm bg-background/50">
						<ShoppingBag class="h-5 w-5" />
						View Demo
					</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-16 sm:py-24 bg-muted/30">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-2xl text-center mb-16">
				<h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Interactive Demos</h2>
				<p class="mt-4 text-lg text-muted-foreground">Explore our two main modules designed to showcase blockchain capabilities.</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
				<!-- Editor Card -->
				<div class="group relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/50">
					<div class="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20"></div>
					
					<div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
						<Layers class="h-6 w-6" />
					</div>
					
					<h3 class="text-2xl font-bold text-foreground mb-3">Blockchain Editor</h3>
					<p class="text-muted-foreground mb-8 leading-relaxed">
						A powerful visual editor to create, modify, and inspect blockchain blocks. Understand the underlying data structure and cryptographic links.
					</p>
					
					<Button href="/blockchain-editor" variant="ghost" class="group-hover:text-primary group-hover:bg-primary/5 -ml-4">
						Launch Editor <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Button>
				</div>

				<!-- Zara Demo Card -->
				<div class="group relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-purple-500/50">
					<div class="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl transition-all group-hover:bg-purple-500/20"></div>
					
					<div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
						<ShieldCheck class="h-6 w-6" />
					</div>
					
					<h3 class="text-2xl font-bold text-foreground mb-3">Zara Supply Chain</h3>
					<p class="text-muted-foreground mb-8 leading-relaxed">
						A real-world simulation of a clothing supply chain. Track a garment from raw materials to the retail store with complete transparency.
					</p>
					
					<Button href="/zara-demo" variant="ghost" class="group-hover:text-purple-600 group-hover:bg-purple-500/5 -ml-4">
						Start Simulation <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="mt-auto py-12 border-t bg-background">
		<div class="container mx-auto px-4 text-center text-muted-foreground">
			<div class="flex justify-center gap-6 mb-8">
				<a href="https://github.com/SorinBetisor/supply-block-chain" target="_blank" rel="noreferrer" class="hover:text-foreground transition-colors">
					<Github class="h-6 w-6" />
					<span class="sr-only">GitHub</span>
				</a>
			</div>
			<p class="text-sm">
				&copy; {new Date().getFullYear()} Blockchain Supply Chain Demo. Built with SvelteKit & Tailwind.
			</p>
		</div>
	</footer>
</div>

