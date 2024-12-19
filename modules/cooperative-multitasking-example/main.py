from task import *
import importlib, os, re

class ModuleTask(Task):
	"""
	Task as a Python module.
	"""
	def __init__(self, module):
		"""
		Initializes the task.
		Parameters:
		`module`: The modue to use as a task. It must have a main(scheduler) global function.
		"""
		self._module = module

	def start(self, scheduler):
		for v in self._module.main(scheduler):
			yield v

class Init(Task):
	"""
	The Init system used for this example.
	It loads as a task everything in the `autorun` directory.
	"""
	def start(self, scheduler):
		directory = os.listdir("autorun")
		programs = []
		for d in directory:
			if re.fullmatch("[a-zA-Z0-9.]*\\.py", d):
				programs.append(d[:-3])
		print("Welcome to BryndzOS")
		for p in programs:
			module = importlib.import_module("autorun." + p, "autorun")
			scheduler.addTask(ModuleTask(module))
		yield

scheduler = Scheduler(Init())
scheduler.start()