import { setTimeout } from 'timers/promises';
import { Mutex } from 'async-mutex';

function BankAccount()
{
	this.balance = 0;
	this.operations = 0;

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
		let intermediary = this.balance + amount;
		this.balance = intermediary;
		await setTimeout(1);
		++this.operations;
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
		let intermediary = this.balance - amount;
		await setTimeout(1);
		this.balance = intermediary;
		// await setTimeout(1);
		++this.operations;
	}
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

let account = new BankAccount();
await account.deposit(1000);
console.log(account.balance);
depositCoins(account, 1000);
withdrawCoins(account, 100);
while (account.operations < 1 + 1000 + 100) {await setTimeout(1);}
console.log(account.balance);