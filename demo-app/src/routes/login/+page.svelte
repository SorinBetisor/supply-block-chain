<script lang="ts">
	import { authStore } from '$lib/auth/authStore.svelte';
	import { ZARA_EMPLOYEES } from '$lib/auth/employees';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import ZaraLogo from '$lib/assets/Zara_(retailer)-Logo.wine.svg';

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let redirectPath = $state('/');

	// Get redirect path from URL params
	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		const redirect = params.get('redirect');
		if (redirect) {
			redirectPath = redirect;
		}
	});

	function handleLogin() {
		if (!email || !password) {
			error = 'Please enter both email and password';
			return;
		}

		// For demo: Accept any email/password and login as admin
		// This allows easy demonstration without authentication barriers
		const adminEmployee = ZARA_EMPLOYEES.find(emp => emp.role === 'admin');
		
		if (!adminEmployee) {
			error = 'System error: Admin user not found';
			return;
		}

		const success = authStore.login(adminEmployee.id);
		if (success) {
			// Redirect to the page they came from, or home
			goto(redirectPath);
		} else {
			error = 'Login failed. Please try again.';
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleLogin();
		}
	}
</script>

<svelte:head>
	<title>Zara Employee Login - Supply Chain</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
	<Card class="w-full max-w-md">
		<CardHeader class="text-center space-y-4">
			<div class="flex justify-center">
				<img src={ZaraLogo} alt="Zara Logo" class="h-20 w-auto" />
			</div>
			<CardTitle class="text-2xl">Employee Login</CardTitle>
			<CardDescription>
				Enter your Zara employee credentials to add blocks to the supply chain
			</CardDescription>
		</CardHeader>
		
		<CardContent class="space-y-4">
			<div class="space-y-2">
				<Label for="email">Email</Label>
				<Input
					id="email"
					type="email"
					placeholder="employee@zara.com"
					bind:value={email}
					onkeypress={handleKeyPress}
					autocomplete="email"
				/>
			</div>

			<div class="space-y-2">
				<Label for="password">Password</Label>
				<Input
					id="password"
					type="password"
					placeholder="Enter your password"
					bind:value={password}
					onkeypress={handleKeyPress}
					autocomplete="current-password"
				/>
			</div>

			{#if error}
				<div class="text-sm text-red-500 text-center bg-red-50 p-2 rounded">
					{error}
				</div>
			{/if}

			<Button 
				class="w-full" 
				size="lg"
				onclick={handleLogin}
				disabled={!email || !password}
			>
				Login
			</Button>

			<div class="text-xs text-muted-foreground text-center space-y-2 pt-4 border-t">
				<p><strong>Demo Mode</strong></p>
				<p>Enter any email and password to login as Administrator</p>
				<p class="text-xs opacity-75">Example: test@test.com / password123</p>
			</div>

			<div class="text-xs text-muted-foreground text-center space-y-1 pt-2">
				<p>🔒 Secure blockchain access for Zara employees only</p>
				<p>All actions are recorded and immutable</p>
			</div>
		</CardContent>
	</Card>
</div>
