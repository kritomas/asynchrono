# Report

This file contains reports for asynchronous functions.

### 03-race-conditions.mjs

With the default configuration, the bank account ends up with incorrect balance, in my case, 1999.

### 04-fixed-race-conditions-with-mutex.mjs

With the default configuration, the bank account ends up with the correct balance of 1900. It takes a little longer, this is the time needed for all the synchronization.