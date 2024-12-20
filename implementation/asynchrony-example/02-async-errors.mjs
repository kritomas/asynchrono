import { setTimeout } from 'timers/promises';

function divide(a, b)
{
	if (b == 0)
	{
		throw new Error("Division by zero");
	}
	return a / b;
}

async function slowDivide(a, b)
{
	await setTimeout(500);
	if (b == 0)
	{
		throw new Error("Division by zero");
	}
	await setTimeout(1500);
	return a / b;
}

async function main()
{
	let promise = slowDivide(69, 0); // The 0 will now cause an exception
	console.log(promise);
	console.log(divide(420, 1337));
	console.log(divide(69, 80085));
	let result;
	try
	{
		result = await promise;
		console.log(promise);
		console.log(result);
	}
	catch (e)
	{
		console.log("BRYNDZOVÉ HALUŠKY");
	}
	console.log(divide(420, 69));
}

main();