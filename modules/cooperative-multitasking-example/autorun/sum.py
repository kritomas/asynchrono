def main(scheduler):
	total = 0
	yield
	with open("_numbers.txt", "r") as file:
		iterations = 0
		for line in file:
			total += int(line)
			iterations += 1
			if iterations >= 1000:
				iterations = 0
				yield
	print("sum: Total =", total)
	yield
