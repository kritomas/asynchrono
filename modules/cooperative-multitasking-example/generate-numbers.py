import random

with open("_numbers.txt", "w") as file:
	file.write(str(random.randint(0, 1000)))
	for i in range(0, 10000000 - 1):
		file.write("\n" + str(random.randint(0, 1000)))