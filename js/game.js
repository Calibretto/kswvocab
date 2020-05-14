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
		
		let cbDiv = createDiv("cb-button");
		cbDiv.appendChild(cb);
		cbDiv.appendChild(lbl);
		
		categoriesDiv.appendChild(cbDiv);
		addBreak(categoriesDiv);
	}
}

function startGame() {
	var gameDiv = document.getElementById("game-wrapper");
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
	for (var i=0; i < questions.length; i++) {
		let question = questions[i];
		gameDiv.appendChild(question.buildHTML());
		addBreak(gameDiv);
	}
}