import json

with open("config.json") as file:
	conf = json.load(file)
	if not "sum" in conf:
		raise Exception("sum: Config entry sum not found")
	if not "yield_every" in conf["sum"]:
		raise Exception("sum: Config entry sum.yield_every not found")

	if not isinstance(conf["sum"]["yield_every"], int):
		raise Exception("sum: Config entry sum.yield_every must be an integer")

	if not conf["sum"]["yield_every"] > 0:
		raise Exception("sum: Config entry sum.yield_every must be positive")


def main(scheduler):
	total = 0
	yield
	with open("_numbers.txt", "r") as file:
		iterations = 0
		for line in file:
			total += int(line)
			iterations += 1
			if iterations >= conf["sum"]["yield_every"]:
				iterations = 0
				yield # Let's save Chernobyl
	print("sum: Total =", total)
	yield
