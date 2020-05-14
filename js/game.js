var categoriesDiv = null;
var selectedCategories = [];
var numberOfQuestions = 10;
var numberOfAnswers = 2;
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
	
	numberOfAnswers = document.querySelector('input[name="difficulty"]:checked').value;
	
	var questions = buildQuestions(selectedCategories, numberOfQuestions, numberOfAnswers);
	for (var i=0; i < questions.length; i++) {
		let question = questions[i];
		gameDiv.appendChild(question.buildHTML(i + 1));
	}
	
	var gameSetupWrapper = document.getElementById("game-setup-wrapper");
	gameSetupWrapper.style.display = "none";
	
	var firstQuestion = document.getElementById("question-1");
	firstQuestion.style.display = "block";
}

function quitGame() {
	if (window.confirm("Are you sure you want to quit?")) {
		// ToDo: Just remove all divs
		var question = null;
		for (var q=1; question = document.getElementById("question-" + q); q++) {
			question.style.display = "none";
		}
	
		var gameSetupWrapper = document.getElementById("game-setup-wrapper");
		gameSetupWrapper.style.display = "block";
	}
}