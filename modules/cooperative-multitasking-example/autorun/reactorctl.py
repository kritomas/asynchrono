from time import sleep, time

def main(scheduler):
	start = time()
	end = time()
	while True:
		sleep(0.15)
		start = end
		end = time()
		if end - start > 1:
			raise Exception("reactorctl: REACTOR EXPLODED - YOU CAUSED CHERNOBYL")
		print("reactorctl: Reactor stabilised")
		yield