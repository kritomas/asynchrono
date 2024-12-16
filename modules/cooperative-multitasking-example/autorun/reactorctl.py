from time import sleep, time
import json

with open("config.json") as file:
	conf = json.load(file)

def main(scheduler):
	start = time()
	end = time()
	while True:
		sleep(0.001)
		start = end
		end = time()
		if end - start > 1:
			raise Exception("reactorctl: REACTOR EXPLODED - YOU CAUSED CHERNOBYL")
		#print("reactorctl: Reactor stabilised")
		yield