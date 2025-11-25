<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { ArrowRight, Database, ShoppingBag, Github, Shield, TrendingUp, FileCheck, Building2, Store, Utensils, Leaf, CheckCircle2, BarChart3, Globe, Network, Lock, GitBranch, Boxes, Workflow } from "@lucide/svelte";
	import BlockchainAnimation from "$lib/components/BlockchainAnimation.svelte";

	function scrollToSection(id: string) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
</script>

<div class="min-h-screen flex flex-col bg-background">
	<!-- Navigation Bar -->
	<nav class="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<!-- Logo/Brand -->
				<button onclick={() => scrollToSection('hero')} class="flex items-center gap-2.5 group">
					<span class="text-xl font-medium text-foreground tracking-tight">
						VerifyChain
					</span>
				</button>

				<!-- Navigation Links -->
				<div class="hidden md:flex items-center gap-6">
					<button onclick={() => scrollToSection('problem')} class="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
						Problem
					</button>
					<button onclick={() => scrollToSection('benefits')} class="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
						Use Cases
					</button>
					<button onclick={() => scrollToSection('comparison')} class="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
						Technology
					</button>
					<Button href="/zara-demo" size="sm" class="font-medium h-9 px-5">
						View Demo
						<ArrowRight class="h-3.5 w-3.5 ml-1.5" />
					</Button>
				</div>

				<!-- Mobile Menu Button -->
				<div class="md:hidden">
					<Button href="/zara-demo" size="sm" class="font-medium h-9 px-4">
						Demo
					</Button>
				</div>
			</div>
		</div>
	</nav>

	<!-- Hero Section -->
	<section id="hero" class="relative overflow-hidden pt-12 pb-24 sm:pt-16 sm:pb-32 bg-gradient-to-br from-primary/[0.02] via-background to-primary/[0.04]">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
				<!-- Left Column: Content -->
				<div class="max-w-2xl">
					<!-- Badge -->
					<div class="mb-5">
						<div class="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-primary/20 bg-primary/5">
							<span class="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
							<span class="text-[10px] font-bold uppercase text-primary tracking-widest">Enterprise Blockchain</span>
						</div>
					</div>

					<!-- Main Heading -->
					<h1 class="mb-6">
						<span class="block text-[3.25rem] sm:text-[4rem] lg:text-[5rem] font-black tracking-[-0.04em] text-foreground leading-[0.95] antialiased">
							Stop Faking
						</span>
						<span class="block text-[3.25rem] sm:text-[4rem] lg:text-[5rem] font-black tracking-[-0.04em] leading-[0.95] antialiased mt-1" style="background: linear-gradient(135deg, oklch(0.38 0.1 155) 0%, oklch(0.45 0.12 165) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
							Sustainability
						</span>
					</h1>

					<!-- Subheading -->
					<p class="text-[1.25rem] sm:text-[1.4rem] text-foreground leading-[1.5] mb-3 max-w-xl font-semibold tracking-tight">
						Blockchain verification businesses can't manipulate
					</p>

					<p class="text-base sm:text-lg text-muted-foreground/80 leading-[1.65] mb-9 max-w-lg">
						Immutable, third-party verified records for supply chain transparency. Trusted by enterprises worldwide.
					</p>

					<!-- CTA Buttons -->
					<div class="flex flex-col sm:flex-row gap-3">
						<Button href="/zara-demo" size="lg" class="w-full sm:w-auto gap-2 h-12 px-8 font-semibold">
							<ShoppingBag class="h-4 w-4" />
							See Live Demo
							<ArrowRight class="h-4 w-4" />
						</Button>
						<Button href="/blockchain-editor" variant="outline" size="lg" class="w-full sm:w-auto gap-2 h-12 px-8 font-semibold">
							<Database class="h-4 w-4" />
							Try the Editor
						</Button>
					</div>
				</div>

				<!-- Right Column: Animation -->
				<div class="hidden lg:block">
					<div class="relative h-[500px]">
						<BlockchainAnimation />
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- The Challenge Section -->
	<section id="problem" class="py-24 sm:py-32 bg-gradient-to-b from-slate-50 to-white">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="max-w-6xl mx-auto">
				<!-- Section Header -->
				<div class="mb-20">
					<p class="text-sm font-bold text-primary uppercase tracking-wider mb-4">The Challenge</p>
					<h2 class="text-[2.75rem] sm:text-[4rem] font-bold tracking-[-0.02em] text-foreground mb-6 leading-[1.1] max-w-3xl">
						Trust breaks down when verification lives in silos
					</h2>
					<p class="text-lg text-muted-foreground leading-relaxed max-w-2xl">
						Every stakeholder maintains their own version of truth. Auditors verify documents they can't authenticate. Regulators chase paper trails that vanish at borders.
					</p>
				</div>

				<!-- Network Visualization -->
				<div class="relative">
					<!-- Central Node -->
					<div class="flex justify-center mb-16">
						<div class="relative">
							<div class="absolute inset-0 bg-primary/10 blur-3xl rounded-full"></div>
							<div class="relative bg-white border-2 border-primary/30 rounded-2xl p-8 shadow-lg">
								<div class="flex items-center gap-4">
									<div class="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
										<Workflow class="h-6 w-6 text-primary" />
									</div>
									<div>
										<p class="text-sm font-bold text-primary uppercase tracking-wider">Product Journey</p>
										<p class="text-xs text-muted-foreground mt-0.5">Multiple verification points</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Branch Network -->
					<div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
						<!-- Connecting Lines (visual only) -->
						<div class="hidden md:block absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-8"></div>

						<!-- Node 1: Origin -->
						<div class="space-y-6">
							<div class="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
								<div class="flex items-start gap-3 mb-4">
									<div class="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
										<GitBranch class="h-5 w-5 text-emerald-700" />
									</div>
									<div>
										<h3 class="font-bold text-foreground text-sm mb-1">Origin Claims</h3>
										<p class="text-xs text-emerald-700 font-medium">Supplier declarations</p>
									</div>
								</div>
								<p class="text-sm text-muted-foreground leading-relaxed">
									Farms and manufacturers self-certify origin. No external validation layer.
								</p>
							</div>

							<div class="bg-sky-50 border border-sky-200 rounded-xl p-6">
								<div class="flex items-start gap-3 mb-4">
									<div class="h-10 w-10 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
										<Network class="h-5 w-5 text-sky-700" />
									</div>
									<div>
										<h3 class="font-bold text-foreground text-sm mb-1">Transport Records</h3>
										<p class="text-xs text-sky-700 font-medium">Logistics providers</p>
									</div>
								</div>
								<p class="text-sm text-muted-foreground leading-relaxed">
									Timestamps exist but can't be cross-referenced against immutable ledgers.
								</p>
							</div>
						</div>

						<!-- Node 2: Verification -->
						<div class="space-y-6">
							<div class="bg-amber-50 border border-amber-200 rounded-xl p-6">
								<div class="flex items-start gap-3 mb-4">
									<div class="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
										<FileCheck class="h-5 w-5 text-amber-700" />
									</div>
									<div>
										<h3 class="font-bold text-foreground text-sm mb-1">Audit Trail</h3>
										<p class="text-xs text-amber-700 font-medium">Third-party auditors</p>
									</div>
								</div>
								<p class="text-sm text-muted-foreground leading-relaxed">
									Auditors verify copies of documents, not source data. Chain of custody unclear.
								</p>
							</div>

							<div class="bg-purple-50 border border-purple-200 rounded-xl p-6">
								<div class="flex items-start gap-3 mb-4">
									<div class="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
										<BarChart3 class="h-5 w-5 text-purple-700" />
									</div>
									<div>
										<h3 class="font-bold text-foreground text-sm mb-1">Carbon Metrics</h3>
										<p class="text-xs text-purple-700 font-medium">Emissions reporting</p>
									</div>
								</div>
								<p class="text-sm text-muted-foreground leading-relaxed">
									CO₂ calculations rely on self-reported energy use with no verification mechanism.
								</p>
							</div>
						</div>

						<!-- Node 3: Compliance -->
						<div class="space-y-6">
							<div class="bg-rose-50 border border-rose-200 rounded-xl p-6">
								<div class="flex items-start gap-3 mb-4">
									<div class="h-10 w-10 rounded-lg bg-rose-100 flex items-center justify-center flex-shrink-0">
										<Shield class="h-5 w-5 text-rose-700" />
									</div>
									<div>
										<h3 class="font-bold text-foreground text-sm mb-1">Regulatory Gaps</h3>
										<p class="text-xs text-rose-700 font-medium">Government oversight</p>
									</div>
								</div>
								<p class="text-sm text-muted-foreground leading-relaxed">
									Agencies lack real-time access to supply chain events as they happen.
								</p>
							</div>

							<div class="bg-slate-50 border border-slate-200 rounded-xl p-6">
								<div class="flex items-start gap-3 mb-4">
									<div class="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
										<Lock class="h-5 w-5 text-slate-700" />
									</div>
									<div>
										<h3 class="font-bold text-foreground text-sm mb-1">Data Integrity</h3>
										<p class="text-xs text-slate-700 font-medium">Trust architecture</p>
									</div>
								</div>
								<p class="text-sm text-muted-foreground leading-relaxed">
									No cryptographic guarantees. Records can be altered retroactively without detection.
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Bottom Insight -->
				<div class="mt-16 bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-primary p-6 rounded-r-xl">
					<p class="text-sm font-semibold text-foreground">
						The gap isn't in data collection—it's in creating a shared, immutable source of truth that all parties can verify independently.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Use Cases Section -->
	<section id="benefits" class="py-20 sm:py-28 bg-gradient-to-br from-lime-50/50 via-emerald-50/40 to-teal-50/50">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="max-w-6xl">
				<!-- Section Header -->
				<div class="mb-16">
					<h2 class="text-[2.75rem] sm:text-[3.75rem] font-bold tracking-[-0.02em] text-emerald-950 mb-4 leading-[1.12] max-w-3xl">
						Building <span class="font-extrabold text-green-700">Sustainable</span> Supply Chains
					</h2>
					<p class="text-base sm:text-lg text-emerald-900/75 leading-relaxed max-w-2xl font-medium">
						Industries transforming transparency into competitive advantage
					</p>
				</div>

				<!-- Magazine-style Grid Layout -->
				<div class="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 mb-8">
					<!-- Large Featured - Fashion Retail -->
					<div class="md:col-span-7 bg-gradient-to-br from-teal-100 to-emerald-50 border-l-4 border-teal-700 p-8 lg:p-10 shadow-sm">
						<div class="flex items-start gap-4 mb-5">
							<div class="h-12 w-12 rounded-2xl bg-teal-600/20 flex items-center justify-center flex-shrink-0">
								<Store class="h-6 w-6 text-teal-800" />
							</div>
							<div>
								<h3 class="text-xl sm:text-2xl font-bold text-teal-950 mb-1">Fashion Retail</h3>
								<p class="text-xs font-bold text-teal-700 tracking-wide uppercase">H&M · Zara · Uniqlo</p>
							</div>
						</div>
						<p class="text-base text-teal-900/75 leading-relaxed font-medium">
							Combat fast fashion criticism with verifiable sustainability reports and ethical sourcing proof.
						</p>
					</div>

					<!-- Restaurants -->
					<div class="md:col-span-5 bg-gradient-to-br from-amber-100 to-yellow-50 border-l-4 border-amber-700 p-8 shadow-sm">
						<div class="h-12 w-12 rounded-2xl bg-amber-600/20 flex items-center justify-center mb-4">
							<Utensils class="h-6 w-6 text-amber-800" />
						</div>
						<h3 class="text-xl font-bold text-amber-950 mb-1">High-End Restaurants</h3>
						<p class="text-xs font-bold text-amber-700 tracking-wide uppercase mb-3">Michelin-starred</p>
						<p class="text-sm text-amber-900/75 leading-relaxed font-medium">
							Verify premium ingredient origins with cryptographic certainty
						</p>
					</div>
				</div>

				<!-- Second Row -->
				<div class="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 mb-8">
					<!-- Grocery -->
					<div class="md:col-span-4 bg-gradient-to-br from-green-100 to-lime-50 border-l-4 border-green-700 p-8 shadow-sm">
						<div class="h-12 w-12 rounded-2xl bg-green-600/20 flex items-center justify-center mb-4">
							<ShoppingBag class="h-6 w-6 text-green-800" />
						</div>
						<h3 class="text-xl font-bold text-green-950 mb-1">Grocery Chains</h3>
						<p class="text-xs font-bold text-green-700 tracking-wide uppercase mb-3">Whole Foods · Trader Joe's</p>
						<p class="text-sm text-green-900/75 leading-relaxed font-medium">
							Track cold-chain compliance and quality certifications
						</p>
					</div>

					<!-- Government - Featured -->
					<div class="md:col-span-8 bg-gradient-to-br from-slate-100 to-zinc-50 border-l-4 border-slate-700 p-8 lg:p-10 shadow-sm">
						<div class="flex items-start gap-4 mb-5">
							<div class="h-12 w-12 rounded-2xl bg-slate-600/20 flex items-center justify-center flex-shrink-0">
								<Building2 class="h-6 w-6 text-slate-800" />
							</div>
							<div>
								<h3 class="text-xl sm:text-2xl font-bold text-slate-950 mb-1">Government Agencies</h3>
								<p class="text-xs font-bold text-slate-700 tracking-wide uppercase">Regulatory & Compliance</p>
							</div>
						</div>
						<p class="text-base text-slate-900/75 leading-relaxed font-medium">
							Verify corporate sustainability claims and track complex supply chains for regulatory compliance.
						</p>
					</div>
				</div>

				<!-- Third Row -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
					<!-- Suppliers -->
					<div class="bg-gradient-to-br from-emerald-100 to-green-50 border-l-4 border-emerald-700 p-8 shadow-sm">
						<div class="h-12 w-12 rounded-2xl bg-emerald-600/20 flex items-center justify-center mb-4">
							<Leaf class="h-6 w-6 text-emerald-800" />
						</div>
						<h3 class="text-xl font-bold text-emerald-950 mb-1">Premium Suppliers</h3>
						<p class="text-xs font-bold text-emerald-700 tracking-wide uppercase mb-3">Farms · Manufacturers</p>
						<p class="text-sm text-emerald-900/75 leading-relaxed font-medium">
							Command premium pricing with verified quality certifications
						</p>
					</div>

					<!-- Legal Documentation -->
					<div class="bg-gradient-to-br from-orange-100 to-amber-50 border-l-4 border-orange-700 p-8 shadow-sm">
						<div class="h-12 w-12 rounded-2xl bg-orange-600/20 flex items-center justify-center mb-4">
							<FileCheck class="h-6 w-6 text-orange-800" />
						</div>
						<h3 class="text-xl font-bold text-orange-950 mb-1">Legal Documentation</h3>
						<p class="text-xs font-bold text-orange-700 tracking-wide uppercase mb-3">Invoices · Certifications</p>
						<p class="text-sm text-orange-900/75 leading-relaxed font-medium">
							Immutable proof of origin with blockchain-hashed documents
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Comparison Section -->
	<section id="comparison" class="py-20 sm:py-28 bg-gradient-to-br from-stone-100/80 via-neutral-50/60 to-stone-100/80">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="max-w-6xl mx-auto">
				<!-- Section Header -->
				<div class="mb-16 text-right">
					<h2 class="text-[2.5rem] sm:text-[3.5rem] font-bold tracking-[-0.02em] text-stone-950 mb-5 leading-[1.1] ml-auto max-w-3xl">
						Why <span class="block mt-2 font-extrabold text-green-700">Blockchain Verification</span> Matters
					</h2>
					<p class="text-base sm:text-lg text-stone-800/75 leading-relaxed ml-auto max-w-2xl font-medium">
						Third-party verification that businesses can't fake
					</p>
				</div>

				<!-- Comparison Grid -->
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
					<!-- Old Way -->
					<div class="border-2 border-red-300 bg-gradient-to-br from-red-100/80 to-rose-50 p-8 lg:p-10 relative shadow-sm">
						<div class="absolute top-6 right-6 opacity-15">
							<span class="text-6xl text-red-700">✕</span>
						</div>

						<div class="mb-8">
							<div class="inline-block px-3 py-1.5 bg-red-200 border border-red-300 rounded-full mb-4">
								<span class="text-xs font-bold tracking-wide uppercase text-red-900">Old Way</span>
							</div>
							<h3 class="text-2xl font-bold text-red-950 mb-2">Self-Reported Data</h3>
							<p class="text-sm text-red-800/70 font-medium">Unverifiable and prone to manipulation</p>
						</div>

						<ul class="space-y-3">
							<li class="flex items-start gap-3">
								<div class="flex-shrink-0 mt-1">
									<span class="text-red-700 text-lg font-bold">×</span>
								</div>
								<span class="text-sm text-red-900/80 font-medium">Companies verify their own claims</span>
							</li>
							<li class="flex items-start gap-3">
								<div class="flex-shrink-0 mt-1">
									<span class="text-red-700 text-lg font-bold">×</span>
								</div>
								<span class="text-sm text-red-900/80 font-medium">No way to audit transport routes</span>
							</li>
							<li class="flex items-start gap-3">
								<div class="flex-shrink-0 mt-1">
									<span class="text-red-700 text-lg font-bold">×</span>
								</div>
								<span class="text-sm text-red-900/80 font-medium">Carbon reports lack proof</span>
							</li>
							<li class="flex items-start gap-3">
								<div class="flex-shrink-0 mt-1">
									<span class="text-red-700 text-lg font-bold">×</span>
								</div>
								<span class="text-sm text-red-900/80 font-medium">Origin claims can't be verified</span>
							</li>
						</ul>
					</div>

					<!-- New Way -->
					<div class="border-2 border-emerald-300 bg-gradient-to-br from-emerald-100/80 to-green-50 p-8 lg:p-10 relative shadow-sm">
						<div class="absolute top-6 right-6 opacity-15">
							<CheckCircle2 class="h-16 w-16 text-emerald-700" />
						</div>

						<div class="mb-8">
							<div class="inline-block px-3 py-1.5 bg-emerald-200 border border-emerald-300 rounded-full mb-4">
								<span class="text-xs font-bold tracking-wide uppercase text-emerald-900">New Way</span>
							</div>
							<h3 class="text-2xl font-bold text-emerald-950 mb-2">Blockchain Verification</h3>
							<p class="text-sm text-emerald-800/70 font-medium">Cryptographically immutable and auditable</p>
						</div>

						<ul class="space-y-3">
							<li class="flex items-start gap-3">
								<div class="flex-shrink-0 mt-0.5">
									<CheckCircle2 class="h-5 w-5 text-emerald-700" />
								</div>
								<span class="text-sm text-emerald-950 font-semibold">Cryptographically immutable records</span>
							</li>
							<li class="flex items-start gap-3">
								<div class="flex-shrink-0 mt-0.5">
									<CheckCircle2 class="h-5 w-5 text-emerald-700" />
								</div>
								<span class="text-sm text-emerald-950 font-semibold">Third-party verified at each step</span>
							</li>
							<li class="flex items-start gap-3">
								<div class="flex-shrink-0 mt-0.5">
									<CheckCircle2 class="h-5 w-5 text-emerald-700" />
								</div>
								<span class="text-sm text-emerald-950 font-semibold">Auditable by government agencies</span>
							</li>
							<li class="flex items-start gap-3">
								<div class="flex-shrink-0 mt-0.5">
									<CheckCircle2 class="h-5 w-5 text-emerald-700" />
								</div>
								<span class="text-sm text-emerald-950 font-semibold">Tamper-proof origin documentation</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 sm:py-28">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="max-w-4xl mx-auto text-center">
				<h2 class="text-[3rem] sm:text-[4.5rem] font-extrabold tracking-[-0.03em] text-foreground mb-5 leading-[1]">
					See It <span class="font-semibold" style="background: linear-gradient(135deg, oklch(0.38 0.1 155) 0%, oklch(0.45 0.12 165) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">In Action</span>
				</h2>
				<p class="text-base sm:text-lg text-foreground/65 leading-relaxed mb-10 max-w-2xl mx-auto">
					Explore our demo tracking a Zara garment through 7 verified supply chain steps from cotton farm to retail store.
				</p>

				<div class="flex flex-col sm:flex-row gap-3 justify-center">
					<Button href="/zara-demo" size="lg" class="w-full sm:w-auto gap-2 h-14 px-10 font-bold text-base">
						<ShoppingBag class="h-5 w-5" />
						Launch Zara Demo
						<ArrowRight class="h-5 w-5" />
					</Button>
					<Button href="/blockchain-editor" variant="outline" size="lg" class="w-full sm:w-auto gap-2 h-14 px-10 font-semibold text-base">
						<Database class="h-5 w-5" />
						Build Your Own Chain
					</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="mt-auto border-t border-border/50">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="max-w-7xl mx-auto py-20">
				<!-- Main Footer Content -->
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
					<!-- Brand Column - Wider -->
					<div class="lg:col-span-5 space-y-6">
						<div>
							<h3 class="text-2xl font-bold text-foreground mb-3">VerifyChain</h3>
							<p class="text-sm text-muted-foreground leading-relaxed max-w-md">
								Enterprise blockchain solutions for verifiable supply chain transparency. Prove origins, track routes, and document sustainability with immutable third-party verification.
							</p>
						</div>
						<div class="pt-4">
							<p class="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider mb-3">Trusted By</p>
							<p class="text-sm text-muted-foreground">Fashion Retailers · Restaurants · Government Agencies · Premium Suppliers</p>
						</div>
					</div>

					<!-- Links Columns - Narrower, Tall -->
					<div class="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
						<!-- Solutions -->
						<div class="space-y-4">
							<h4 class="text-xs font-bold text-foreground uppercase tracking-wider">Solutions</h4>
							<ul class="space-y-3">
								<li><a href="/zara-demo" class="text-sm text-muted-foreground hover:text-primary transition-colors">Fashion & Retail</a></li>
								<li><a href="/zara-demo" class="text-sm text-muted-foreground hover:text-primary transition-colors">Food & Beverage</a></li>
								<li><a href="/zara-demo" class="text-sm text-muted-foreground hover:text-primary transition-colors">Grocery Chains</a></li>
								<li><a href="/zara-demo" class="text-sm text-muted-foreground hover:text-primary transition-colors">Government</a></li>
								<li><a href="/zara-demo" class="text-sm text-muted-foreground hover:text-primary transition-colors">Suppliers</a></li>
							</ul>
						</div>

						<!-- Platform -->
						<div class="space-y-4">
							<h4 class="text-xs font-bold text-foreground uppercase tracking-wider">Platform</h4>
							<ul class="space-y-3">
								<li><a href="/blockchain-editor" class="text-sm text-muted-foreground hover:text-primary transition-colors">Blockchain Editor</a></li>
								<li><a href="/zara-demo" class="text-sm text-muted-foreground hover:text-primary transition-colors">Live Demo</a></li>
								<li><a href="/zara-demo" class="text-sm text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
								<li><a href="/zara-demo" class="text-sm text-muted-foreground hover:text-primary transition-colors">API Reference</a></li>
							</ul>
						</div>

						<!-- Resources -->
						<div class="space-y-4">
							<h4 class="text-xs font-bold text-foreground uppercase tracking-wider">Resources</h4>
							<ul class="space-y-3">
								<li><a href="https://github.com/SorinBetisor/supply-block-chain" target="_blank" rel="noreferrer" class="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5">
									<Github class="h-3.5 w-3.5" />
									GitHub
								</a></li>
								<li><a href="/zara-demo" class="text-sm text-muted-foreground hover:text-primary transition-colors">Case Studies</a></li>
								<li><a href="/zara-demo" class="text-sm text-muted-foreground hover:text-primary transition-colors">Whitepaper</a></li>
								<li><a href="/zara-demo" class="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Bottom Bar -->
				<div class="pt-8 border-t border-border/30">
					<div class="flex flex-col sm:flex-row justify-between items-center gap-4">
						<p class="text-xs text-muted-foreground">
							&copy; {new Date().getFullYear()} VerifyChain. All rights reserved.
						</p>
						<div class="flex items-center gap-6">
							<a href="/zara-demo" class="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
							<a href="/zara-demo" class="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
							<a href="/zara-demo" class="text-xs text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>
</div>

