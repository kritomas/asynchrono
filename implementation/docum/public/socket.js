const socket = io();
const editorContainer = document.getElementById("editor-container");
const status = document.getElementById("status");
const connectedUsers = document.getElementById("connected-users");
const cursors = document.getElementById("cursors");
const selections = document.getElementById("selections");
let username;
let users = {};
let connected = false;
let text = "";
let domUpdateTicker = -1;

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function createUser(username)
{
	return
	{
		name: username,
		ptrX: 0,
		ptrY: 0,
		selectionStart: -1,
		selectionEnd: -1,
		red: getRndInteger(127, 240),
		green: getRndInteger(127, 240),
		blue: getRndInteger(127, 240)
	}
}

function updateUsers()
{
	connectedUsers.innerHTML = "";
	let first = true;
	for (let k in users)
	{
		if (!first)
		{
			let comma = document.createElement("span");
			comma.innerText = ", ";
			connectedUsers.appendChild(comma);
		}
		first = false;
		let userText = document.createElement("span");
		userText.innerText = users[k].name;
		userText.style["background-color"] = rgbToHex(users[k].red, users[k].green, users[k].blue);
		connectedUsers.appendChild(userText);
	}

	let cursorHtml = "";
	for (let k in users)
	{
		cursorHtml += "<div style=\"position: absolute; background: ";
		cursorHtml += rgbToHex(users[k].red, users[k].green, users[k].blue);
		cursorHtml += "; width: 5px; height: 5px; left: "
		cursorHtml += users[k].ptrX + "px; top: "
		cursorHtml += users[k].ptrY + "px;\">"
		cursorHtml += "</div>"
	}
	cursors.innerHTML = cursorHtml;

	selections.innerHTML = "";
	for (let k in users)
	{
		if (users[k].selectionStart >= 0 && users[k].selectionEnd >= 0)
		{
			let s = document.createElement("div");
			s.className = "editor";
			s.style.position = "absolute";
			let textToHighlight = editorContainer.innerText;
			let beginning = textToHighlight.substring(0, users[k].selectionStart);
			let highlight = textToHighlight.substring(users[k].selectionStart, users[k].selectionEnd);
			let end = textToHighlight.substring(users[k].selectionEnd);
			let beginSpan = document.createElement("span");
			beginSpan.innerText = beginning;
			let highlightSpan = document.createElement("span");
			highlightSpan.innerText = highlight;
			highlightSpan.style["background-color"] = rgbToHex(users[k].red, users[k].green, users[k].blue);
			let endSpan = document.createElement("span");
			endSpan.innerText = end;
			s.appendChild(beginSpan);
			s.appendChild(highlightSpan);
			s.appendChild(endSpan);

			s.offsetTop = editorContainer.offsetTop;
			s.offsetLeft = editorContainer.offsetLeft;
			s.offsetWidth = editorContainer.offsetWidth;
			s.offsetHeight = editorContainer.offsetHeight;

			selections.appendChild(s);
		}
	}
};

function squashDiff(diff)
{
	for (let index = 0; index < diff.length; ++index)
	{
		if (!diff[index].added)
		{
			delete diff[index].value;
		}
	}
}

function applyDiff(diff)
{
	let index = 0;
	diff.forEach(part =>
	{
		if (part.removed)
		{
			text = text.slice(0, index) + text.slice(index + part.count);
		}
		else if (part.added)
		{
			text = text.slice(0, index) + part.value + text.slice(index);
		}
		index += part.count;
	});
	editorContainer.innerText = text;
}

socket.on("connect", () =>
{
	console.log("Connected to server");
	status.innerText = "Disconnected";
});
socket.on("disconnect", () =>
{
	console.log("Disconnected from server");
	connected = false;
	editorContainer.setAttribute("contenteditable", false);
	status.innerText = "Disconnected";
});

socket.on("COMM_DOCUMENT_SET", (incoming) =>
{
	if (connected)
	{
		text = incoming;
		editorContainer.innerText = text;
	}
})
socket.on("COMM_DOCUMENT_UPDATE", (incoming) =>
{
	if (connected)
	{
		applyDiff(incoming);
	}
})

socket.on("COMM_USERS", (incoming) =>
{
	users = incoming;
	updateUsers();
});

editorContainer.addEventListener('input', () =>
{
	if (connected)
	{
		let diff = Diff.diffChars(text, editorContainer.innerText);
		squashDiff(diff)
		console.log(diff);
		socket.emit('COMM_DOCUMENT_UPDATE', diff);
		text = editorContainer.innerText;
		domUpdateTicker = 2;
	}
});

document.getElementById("join").onclick = () =>
{
	if (!connected)
	{
		username = document.getElementById("username").value;
		if (username)
		{
			socket.emit("COMM_JOIN", createUser(username));
			connected = true;
			editorContainer.setAttribute("contenteditable", true);
			status.innerText = "Connected";
		}
	}
};
document.getElementById("leave").onclick = () =>
{
	if (connected)
	{
		socket.emit("COMM_LEAVE");
		connected = false;
		editorContainer.setAttribute("contenteditable", false);
		status.innerText = "Disconnected";
	}
};

editorContainer.addEventListener('mousemove', (event) =>
{
	if (connected)
	{
		socket.emit("COMM_CURSOR", { x: event.clientX, y: event.clientY });
	}
});

document.onselectionchange = () =>
{
	selection = window.getSelection();
	if (connected)
	{
		if (selection.focusNode.parentElement == editorContainer && selection.anchorNode.parentElement == editorContainer && selection.type == "Range")
		{
			socket.emit("COMM_SELECTION", {start: Math.min(selection.anchorOffset, selection.focusOffset), end: Math.max(selection.anchorOffset, selection.focusOffset)});
		}
		else
		{
			socket.emit("COMM_SELECTION", {start: -1, end: -1});
		}
	}
};

const domUpdater = setInterval(() =>
{
	--domUpdateTicker;
	if (domUpdateTicker === 0)
	{
		text = editorContainer.innerText;
		editorContainer.innerText = text; // Force DOM update.
	}
}, 1000)