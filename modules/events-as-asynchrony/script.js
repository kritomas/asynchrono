button1 = document.getElementById("button1");
button2 = document.getElementById("button2");
button3 = document.getElementById("button3");
text = document.getElementById("text");

button1.addEventListener("click", (event) =>
{
	console.log(event);
	text.innerText = "Button 1 clicked :)";
});

button2.addEventListener("click", (event) =>
{
	console.log(event);
	text.innerText = "Button 2 clicked :)";
});

button3.addEventListener("click", (event) =>
{
	console.log(event);
	text.innerText = "Button 3 clicked :)";
});

console.log("I am min-ding my own bus-iness la dee da dee daaa") // The code flow may continue beyond the event listener setup...
// ...The browser goes back and runs them asynchronously when the appropriate events occur.