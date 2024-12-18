from task import *
import importlib, os, re

class ModuleTask(Task):
	def __init__(self, module):
		self._module = module

	def run(self, scheduler):
		for v in self._module.main(scheduler):
			yield v

class Init(Task):
	def run(self, scheduler):
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
scheduler.run()