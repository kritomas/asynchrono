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
	let promise = slowAdd(69, 420);
	console.log(promise);
	console.log(add(420, 1337));
	console.log(add(69, 80085));
	let result = await promise;
	console.log(promise);
	console.log(result);
}

main();