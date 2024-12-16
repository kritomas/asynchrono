import random, json

with open("config.json") as file:
	conf = json.load(file)

with open("_numbers.txt", "w") as file:
	file.write(str(random.randint(0, 1000)))
	for i in range(0, conf["num_gen"]["total"] - 1):
		file.write("\n" + str(random.randint(0, 1000)))