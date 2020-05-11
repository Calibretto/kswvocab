var categoriesDiv = null;
var selectedCategories = [];
var numberOfQuestions = 10;
var questions = [];

window.onload = function() {
	categoriesDiv = document.getElementById("categories");
	if (categoriesDiv == null) {
		window.alert("Unable to start game!");
		return;
	}
	
	for(var key in gameData) {
		let cb = createCheckbox(key, key, key);
		let lbl = createLabel(key, cb);
		
		categoriesDiv.appendChild(cb);
		categoriesDiv.appendChild(lbl);
		
		addBreak(categoriesDiv);
	}
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

function createLabel(text, checkbox=null) {
	var labelObj = document.createElement("label");
	
	var textNode = document.createTextNode(text);
	labelObj.appendChild(textNode);
	
	if (checkbox) {
		labelObj.htmlFor = checkbox.id;
	}
	
	return labelObj;
}

function startGame() {
	var gameDiv = document.getElementById("game_wrapper");
	gameDiv.innerHTML = "";
	
	var selectedCheckboxes = categoriesDiv.querySelectorAll("input[type='checkbox']:checked");
	
	selectedCategories = {};
	for(var i=0; i < selectedCheckboxes.length; i++) {
		var cb = selectedCheckboxes[i];
		var category = cb.value;
		
		selectedCategories[category] = gameData[category];
	}
	
	if (selectedCategories.length == 0) {
		window.alert("Please select at least one category.");
		return;
	}
	
	var questions = buildQuestions(selectedCategories, numberOfQuestions);
	for (question in questions) {
		gameDiv.appendChild(createLabel(questions[question] + " " + question));
		addBreak(gameDiv);
	}
}