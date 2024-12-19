# Theory

This file explains in theory the basics of asynchronous functions and cooperative multitasking.

# Asynchronous Functions

Asynchrony is the idea of operations happening independently of the main code flow. An asynchronous function is one, that does not grab control over the main control flow when called. Instead, the control flow continues past the function while it executes, allowing other operations to take place. It's essentially parallel code execution.

All threads are asynchronous, but that does not necessarily mean that asynchrony means threads, even though it may look as such. There are ways to implement parallel code execution without threads, see cooperative multitasking.

# Race Conditions

When multiple asynchronous processes access the same data, they may end up modifying them at the same time, leading to incorrect results. This is called a race condition.

Race condition are typically undesirable. They are solved with thread synchronization mechanisms.

# Mutex

The most common thread synchronization mechanism. A mutex is a structure that offers two functions:

+	`lock`: If it isn't already, waits for the mutex to be unlocked, then locks it.
+	`unlock`: Unlocks the mutex, allowing it to be locked elsewhere.

Locking when data is accessed and unlocking when it's not ensures data may be accessed by only one given process at any given time, solving the race condition. Keep in mind that if both processes wait for each other to unlock, the program gets stuck in a deadlock.

# Cooperative Multitasking

Cooperative multitasking is a type of multitasking where each process must cooperate, passing control to each other. This means that if one process grabs control and keeps it, other processes will never run. This is different from preemtive multitasking, where the task scheduler may forcibly take control from processes.

The example implementation in this repo implements cooperative multitasking by exploiting Python's generators feature.