function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

 	// While there remain elements to shuffle...
 	while (0 !== currentIndex) {

   		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function createDiv(id) {
	var div = document.createElement("div");
	div.id = id;
	
	return div;
}

function addBreak(divObj) {
	let br = document.createElement("br");
	divObj.appendChild(br);
}

function createCheckbox(name, value, id) {
	var checkboxObj = document.createElement("input");
	checkboxObj.type = "checkbox";
	checkboxObj.name = name;
	checkboxObj.value = value;
	checkboxObj.id = id;
	
	return checkboxObj
}

function createRadioButton(group, value, id) {
	var radioObj = document.createElement("input");
	radioObj.type = "radio";
	radioObj.name = group;
	radioObj.value = value;
	radioObj.id = id;
	
	return radioObj;
}

function createLabel(text, parentObject=null) {
	var labelObj = document.createElement("label");
	
	var textNode = document.createTextNode(text);
	labelObj.appendChild(textNode);
	
	if (parentObject) {
		labelObj.htmlFor = parentObject.id;
	}
	
	return labelObj;
}

function createHeader(level, text) {
	var headerObj = document.createElement("h" + level);
	
	var textNode = document.createTextNode(text);
	headerObj.appendChild(textNode);
	
	return headerObj;
}