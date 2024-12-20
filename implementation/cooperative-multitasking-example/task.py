class Task:
	"""
	Task for the cooperative scheduler.
	Derive from this and override run(). Note that run() must have at least one `yield`.
	`yield` is used to pass control back to the scheduler.
	"""
	def start(self, scheduler):
		yield

class Scheduler:
	"""
	The cooperative scheduler.
	"""
	def __init__(self, init):
		"""
		Initializes the scheduler.
		Parameters:
		`init`: The init task for the scheduler. This is the first task to run. Reperesents an init system from the Unix world.
		"""
		self._starting = [init]
		self._tasks = []
	def _initTasks(self):
		while len(self._starting) > 0:
			try:
				self._tasks.append(self._starting[0].start(self)) # Add new tasks to the scheduling
			except Exception as error:
				print(error)
			self._starting.pop(0)

	def addTask(self, task):
		"""
		Adds a new task to the scheduler.
		Parameters:
		`task`: The task to add.
		"""
		self._starting.append(task)

	def start(self):
		"""
		Starts the scheduler.
		"""
		self._initTasks()
		while len(self._tasks) > 0:
			index = 0
			while index < len(self._tasks):
				try:
					next(self._tasks[index]) # Pass control to the task.
					index += 1
				except StopIteration:
					self._tasks.pop(index) # The task has terminated, we can remove it.
				except Exception as error:
					print(error)
					self._tasks.pop(index)
			self._initTasks()
