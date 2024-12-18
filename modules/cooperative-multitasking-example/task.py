class Task:
	def run(self, scheduler):
		yield

class Scheduler:
	def __init__(self, init):
		self._starting = [init]
		self._tasks = []

	def addTask(self, task):
		self._starting.append(task)

	def run(self):
		while len(self._starting) > 0:
			try:
				self._tasks.append(self._starting[0].run(self))
			except:
				pass # Silently ignore
			self._starting.pop(0)
		while len(self._tasks) > 0:
			index = 0
			while index < len(self._tasks):
				try:
					next(self._tasks[index])
					index += 1
				except StopIteration:
					self._tasks.pop(index)
				except:
					self._tasks.pop(index)

			while len(self._starting) > 0:
				try:
					self._tasks.append(self._starting[0].run(self))
				except:
					pass # Silently ignore
				self._starting.pop(0)
