from task import *

class NameBot(Task):
	def run(self, scheduler):
		name = input("What is yo name: ")
		yield
		print("Sup", name)
class EvalBot(Task):
	def run(self, scheduler):
		print(eval(input("Expreson: ")))
		yield

class Init(Task):
	def run(self, scheduler):
		print("Welcome to BryndzOS")
		yield
		scheduler.addTask(NameBot())
		scheduler.addTask(EvalBot())

scheduler = Scheduler(Init())
scheduler.run()