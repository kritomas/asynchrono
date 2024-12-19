import random, json

with open("config.json") as file:
	conf = json.load(file)
	if not "num_gen" in conf:
		raise Exception("Config entry num_gen not found")
	if not "total" in conf["num_gen"]:
		raise Exception("Config entry num_gen.total not found")

	if not isinstance(conf["num_gen"]["total"], int):
		raise Exception("Config entry num_gen.total must be an integer")

	if not conf["num_gen"]["total"] > 0:
		raise Exception("Config entry num_gen.total must be positive")

with open("_numbers.txt", "w") as file:
	file.write(str(random.randint(0, 1000)))
	for i in range(0, conf["num_gen"]["total"] - 1):
		file.write("\n" + str(random.randint(0, 1000)))