import { setTimeout } from 'timers/promises';
import { Mutex } from 'async-mutex';

function BankAccount()
{
	this.balance = 0;
	this.mutex = new Mutex();

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
		const release = await this.mutex.acquire();
		let intermediary = this.balance + amount;
		this.balance = intermediary;
		await setTimeout(1);
		release();
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
		const release = await this.mutex.acquire();
		let intermediary = this.balance - amount;
		await setTimeout(1);
		this.balance = intermediary;
		// await setTimeout(1);
		release();
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
await setTimeout(1500);
console.log(account.balance);