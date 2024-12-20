from time import sleep, time
import json, numbers

with open("config.json") as file:
	conf = json.load(file)
	if not "reactorctl" in conf:
		raise Exception("reactorctl: Config entry reactorctl not found")
	if not "stabilization_time" in conf["reactorctl"]:
		raise Exception("reactorctl: Config entry reactorctl.stabilization_time not found")
	if not "stabilization_interval" in conf["reactorctl"]:
		raise Exception("reactorctl: Config entry reactorctl.stabilization_interval not found")
	if not "log_interval" in conf["reactorctl"]:
		raise Exception("reactorctl: Config entry reactorctl.log_interval not found")

	if not isinstance(conf["reactorctl"]["stabilization_time"], numbers.Number):
		raise Exception("reactorctl: Config entry reactorctl.stabilization_time must be a number")
	if not isinstance(conf["reactorctl"]["stabilization_interval"], numbers.Number):
		raise Exception("reactorctl: Config entry reactorctl.stabilization_interval must be a number")
	if not isinstance(conf["reactorctl"]["log_interval"], int):
		raise Exception("reactorctl: Config entry reactorctl.log_interval must be an integer")

	if not conf["reactorctl"]["stabilization_time"] > 0:
		raise Exception("reactorctl: Config entry reactorctl.stabilization_time must be positive")
	if not conf["reactorctl"]["stabilization_interval"] > 0:
		raise Exception("reactorctl: Config entry reactorctl.stabilization_interval must be positive")
	if not conf["reactorctl"]["log_interval"] > 0:
		raise Exception("reactorctl: Config entry reactorctl.log_interval must be positive")

def main(scheduler):
	start = time()
	end = time()
	stabilicounter = 0
	while True:
		sleep(conf["reactorctl"]["stabilization_time"]) # [Insert complex reactor stabilization shenanigans here]
		stabilicounter += 1
		if stabilicounter >= conf["reactorctl"]["log_interval"]:
			print("reactorctl: Reactor stabilized " + str(stabilicounter) + "x")
			stabilicounter = 0
		start = end
		end = time()
		if end - start > conf["reactorctl"]["stabilization_interval"]:
			raise Exception("reactorctl: REACTOR EXPLODED - YOU CAUSED CHERNOBYL")
		#print("reactorctl: Reactor stabilised")
		yield