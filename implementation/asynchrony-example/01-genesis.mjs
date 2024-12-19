import { setTimeout } from 'timers/promises';

function add(a, b)
{
	return a + b;
}

async function slowAdd(a, b)
{
	await setTimeout(2000);
	return a + b;
}

async function main()
{
	let promise = slowAdd(69, 420); // Async function call generates a promise object...
	console.log(promise); // ...This promise will hold the returned value, once the async function returns.
	console.log(add(420, 1337)); // Until then, other operations may take place.
	console.log(add(69, 80085));
	let result = await promise; // The `await` keyword waits until the promise contains a value, and returns it...
	console.log(promise);
	console.log(result); // ...This value can then be used.
	// The `await` keyword can only be used in async functions.
}

main();