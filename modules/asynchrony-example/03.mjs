import { setTimeout } from 'timers/promises';
import { Mutex } from 'async-mutex';
import { readFileSync } from 'fs';

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

const conf = JSON.parse(readFileSync("./config.json"));
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

/**
 * Deposits money in pennies (eg. a whole bunch of 1$ deposits).
 *
 * @param account The account to deposit into.
 * @param amount The total amount to deposit.
 */
function depositCoins(account, amount)
{
	for (let i = 0; i < amount; ++i)
	{
		account.deposit(1); // Lack of `await` here causes all deposits to happen asynchronously...
	}
}
/**
 * Withdraws money in pennies (eg. a whole bunch of 1$ withdrawals).
 *
 * @param account The account to withdraw from.
 * @param amount The total amount to withdraw.
 */
function withdrawCoins(account, amount)
{
	for (let i = 0; i < amount; ++i)
	{
		account.withdraw(1); // ...Which also holds true for withdrawals here.
	}
}
// In the end, the scheduler switches in the middle of deposits/withdrawals, which causes a race condition with the account balance....

let account = new BankAccount();
await account.deposit(conf.o_three.initial_balance);
console.log(account.balance);
depositCoins(account, conf.o_three.total_deposit);
withdrawCoins(account, conf.o_three.total_withdrawal);
while (account.operations < 1 + conf.o_three.total_deposit + conf.o_three.total_withdrawal)
{
	await setTimeout(1);
}
console.log(account.balance); // ...And so, the balance will be incorrect.