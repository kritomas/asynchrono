# Cooperative Multitasking Example

This demonstrates how one can implement cooperative multitasking via Python generators. It has multiple parts.

## 01-genesis.py

Shows the basics of cooperative multitasking. It has two programs.

+	Program that asks for your name and greets you (`NameBot`).
+	Program that evaluates a Python expression you type (`EvalBot`).

These are executed concurrently, via cooperative multitasking, in the following order:

1.	You invoke `python3 01-genesis.py`. The scheduler starts.
2.	`NameBot`: Asks for your name.
3.	`NameBot`: Returns control back to the scheduler via `yield`. The scheduler passes it on to `EvalBot`.
4.	`EvalBot`: Asks for a python expression.
5.	`EvalBot`: Evaluates and prints the expression.
6.	`EvalBot`: Terminates. The scheduler grabs control and passes it on to `NameBot`.
7.	`NameBot`: Greets you and terminates.
8.	The scheduler terminates, for there are no tasks left to run.

See also: `task.py`

## 02-program-loader.py

A more advanced example. This one loads every python script in the `autorun` directory and runs them as a separate task. These scripts must have a `main` global function (sounds familiar?), which takes the scheduler as its sole argument.

The `main` function should have `yield` keywords dotted around. These are used to return control back to the scheduler, so that other tasks may execute.

Note that no threads nor processes are ever created.