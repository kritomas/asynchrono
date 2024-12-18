from time import sleep, time
import json, numbers

with open("config.json") as file:
	conf = json.load(file)
	if not "reactorctl" in conf:
		raise Exception("reactorctl: Config entry reactorctl not found")
	if not "stabilisation_time" in conf["reactorctl"]:
		raise Exception("reactorctl: Config entry reactorctl.stabilisation_time not found")
	if not "stabilisation_interval" in conf["reactorctl"]:
		raise Exception("reactorctl: Config entry reactorctl.stabilisation_interval not found")

	if not isinstance(conf["reactorctl"]["stabilisation_time"], numbers.Number):
		raise Exception("reactorctl: Config entry reactorctl.stabilisation_time must be a number")
	if not isinstance(conf["reactorctl"]["stabilisation_interval"], numbers.Number):
		raise Exception("reactorctl: Config entry reactorctl.stabilisation_interval must be a number")

	if not conf["reactorctl"]["stabilisation_time"] > 0:
		raise Exception("reactorctl: Config entry reactorctl.stabilisation_time must be positive")
	if not conf["reactorctl"]["stabilisation_interval"] > 0:
		raise Exception("reactorctl: Config entry reactorctl.stabilisation_interval must be positive")

def main(scheduler):
	start = time()
	end = time()
	while True:
		sleep(conf["reactorctl"]["stabilisation_time"])
		start = end
		end = time()
		if end - start > conf["reactorctl"]["stabilisation_interval"]:
			raise Exception("reactorctl: REACTOR EXPLODED - YOU CAUSED CHERNOBYL")
		#print("reactorctl: Reactor stabilised")
		yield