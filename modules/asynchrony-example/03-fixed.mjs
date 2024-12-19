import { setTimeout } from 'timers/promises';
// JavaScript doesn't provide a standard synchronization mechanism (aside of async/await)...
import { Mutex } from 'async-mutex'; // ...It has to npm installed (hence the need for `npm i` to get this example working).
import { readFileSync } from 'fs';

function BankAccount()
{
	this.balance = 0;
	this.operations = 0;
	this.mutex = new Mutex();
	/* A Mutex is a simple synchronization lock mechanism> itt has a lock, and an unlock:
	 * lock: If it isn't already, waits for the Mutex to be unlocked, then locks it.
	 * unlock: Unlocks the mutex, allowing other locks to take place.
	 */

	this.deposit = async (amount) =>
	{
		if (typeof amount != "number")
		{
			throw new Error("Amount must be number.");
		}
		if (amount <= 0)
		{
			throw new Error("Amount cannot be negative.");
		}
		const release = await this.mutex.acquire(); // Lock the mutex. No other deposits/withdrawals can take place.
		let intermediary = this.balance + amount;
		this.balance = intermediary;
		await setTimeout(1);
		++this.operations;
		release(); // Unlock the mutex, so that other deposits/withdrawals may happen again.
	}
	this.withdraw = async (amount) =>
	{
		if (typeof amount != "number")
		{
			throw new Error("Amount must be number.");
		}
		if (amount <= 0)
		{
			throw new Error("Amount cannot be negative.");
		}
		if (amount > this.balance)
		{
			throw new Error("Amount cannot be larger than balance.");
		}
		const release = await this.mutex.acquire(); // Lock the mutex. No other deposits/withdrawals can take place.
		let intermediary = this.balance - amount;
		await setTimeout(1);
		this.balance = intermediary;
		// await setTimeout(1);
		++this.operations;
		release(); // Unlock the mutex, so that other deposits/withdrawals may happen again.
	}
}

const conf = JSON.parse(readFileSync("./config.json"))
if (conf.o_three == undefined)
{
	throw new Error("Config entry o_three not found");
}

if (conf.o_three.initial_balance == undefined)
{
	throw new Error("Config entry o_three.initial_balance not found");
}
if (conf.o_three.total_deposit == undefined)
{
	throw new Error("Config entry o_three.total_deposit not found");
}
if (conf.o_three.total_withdrawal == undefined)
{
	throw new Error("Config entry o_three.total_withdrawal not found");
}

if (!Number.isInteger(conf.o_three.initial_balance))
{
	throw new Error("Config entry o_three.initial_balance must be an integer");
}
if (!Number.isInteger(conf.o_three.total_deposit))
{
	throw new Error("Config entry o_three.total_deposit must be an integer");
}
if (!Number.isInteger(conf.o_three.total_withdrawal))
{
	throw new Error("Config entry o_three.total_withdrawal must be an integer");
}

if (conf.o_three.initial_balance < 0)
{
	throw new Error("Config entry o_three.initial_balance must be not be negative");
}
if (conf.o_three.total_deposit < 0)
{
	throw new Error("Config entry o_three.total_deposit must be not be negative");
}
if (conf.o_three.total_withdrawal < 0)
{
	throw new Error("Config entry o_three.total_withdrawal must be not be negative");
}

function depositCoins(account, amount)
{
	for (let i = 0; i < amount; ++i)
	{
		account.deposit(1);
	}
}
function withdrawCoins(account, amount)
{
	for (let i = 0; i < amount; ++i)
	{
		account.withdraw(1);
	}
}
// Due to the mutexing, the scheduler can no longer rape the deposits/withdrawals...


let account = new BankAccount();
await account.deposit(conf.o_three.initial_balance);
console.log(account.balance);
depositCoins(account, conf.o_three.total_deposit);
withdrawCoins(account, conf.o_three.total_withdrawal);
while (account.operations < 1 + conf.o_three.total_deposit + conf.o_three.total_withdrawal)
{
	await setTimeout(1);
}
console.log(account.balance); // ...And so, the account holds the correct balance.