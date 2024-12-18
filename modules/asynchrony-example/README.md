# Asynchrony Example

This demo has multiple parts. Note that some parts need to be set up with `npm i`.

# Parts

Execute with `node [name]`:

### 01.mjs

First example, demonstrating the basics of `async`/`await`.

### 02.mjs

Second example. Errors with promises.

### 03.mjs

Third example, demonstrates race conditions with a classic bank fraud example.

### 03-fixed.mjs

Fixes for race conditions from `03.mjs` via mutexes (Requires invocation of `npm i`).

# Configuration

`03x` Examples can be configured with `config.json`:

+	`o_three.initial_balance` - The initial balance, set before any race conditions.
+	`o_three.total_deposit` - The amount to deposit in pennies. In a race condition with withdrawal.
+	`o_three.total_withdrawal` - The amount to withdraw in pennies. in a race condition with deposit.