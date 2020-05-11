class Question {

	constructor(questionNumber) {
		this.questionNumber = questionNumber;
		this.questionTitle = "Unkown";
		this.questionAnswers = [];
		this.correctAnswerIndex = 0;
	}
	
	pickOtherAnswers(categoryData, numberOfAnswers) {
		let correctAnswer = this.questionAnswers[0];
		var otherData = categoryData.filter(function(e) {
			return e["korean"] != correctAnswer;
		});
		
		otherData = shuffle(otherData);
		while ( (this.questionAnswers.length < numberOfAnswers) &&
				(otherData.length > 0) ) {
			let data = otherData.pop();
			this.questionAnswers.push(data["korean"]);
		}
	}
	
	findCorrectAnswer(answer) {
		for(var i=0; i < this.questionAnswers.length; i++) {
			if (this.questionAnswers[i] == answer) {
				this.correctAnswerIndex == i;
				break;
			}
		}
	}
	
	buildHTML() {
		var mainDiv = createDiv("question_" + this.questionNumber);
		
		var titleHeader = createHeader(1, this.questionTitle);
		mainDiv.appendChild(titleHeader);
		
		var listObj = document.createElement("ul");
		for (var i=0; i < this.questionAnswers.length; i++) {
			var listItemObj = document.createElement("li");
			
			let answer = this.questionAnswers[i];
			let radioButtonGroup = mainDiv.id + "_answers";
			let radioButtonID = mainDiv.id + "_answer_" + i;
			let radioButtonObj = createRadioButton(radioButtonGroup, answer, radioButtonID);
			let answerLabel = createLabel(answer, radioButtonObj);
			
			listItemObj.appendChild(radioButtonObj);
			listItemObj.appendChild(answerLabel);
			
			listObj.appendChild(listItemObj);
		}
		mainDiv.appendChild(listObj);
		
		return mainDiv;
	}

}

function buildQuestions(categories, numberOfQuestions) {
	var questions = [];
	var categorySplit = calculateCategorySplit(categories, numberOfQuestions);
	
	// Now we build the array of questions.
	for (category in categorySplit) {
		var categoryData = categories[category].slice();
		categoryData = shuffle(categoryData);
		
		let split = categorySplit[category];
		for(var i=0; i < split; i++) {
			var data = categoryData[i];
			var title = data["english"];
			var answer = data["korean"];
		
			var question = new Question(questions.length);
			question.questionTitle = title;
			question.questionAnswers.push(answer);
			question.pickOtherAnswers(categoryData, 4);
			
			question.questionAnswers = shuffle(question.questionAnswers);
			question.findCorrectAnswer(answer);
			questions.push(question);
		}
	}

	questions = shuffle(questions);
	return questions;
}

// ToDo: check if only one category
// ToDo: check if number of categories > number of questions
// ToDo: check if split > number of entries in category
function calculateCategorySplit(categories, numberOfQuestions) {
	var totalQuestions = 0;
	var totalAllocated = 0;
	var categorySplit = {};
	
	for(category in categories) {
		totalQuestions += categories[category].length;
	}
	
	for(category in categories) {
		var split = categories[category].length / (totalQuestions * 1.0);
		split = Math.round(split * numberOfQuestions);
		
		categorySplit[category] = split;
		totalAllocated += split;
	}
	
	// This makes sure we have the right number of questions
	var keys = Object.keys(categorySplit);
	while(totalAllocated > numberOfQuestions) {
		let idx = Math.floor(Math.random()*keys.length);
		categorySplit[keys[idx]]--;
		totalAllocated--;
	}
	
	while(totalAllocated < numberOfQuestions) {
		let idx = Math.floor(Math.random()*keys.length);
		categorySplit[keys[idx]]++;
		totalAllocated++;
	}	
	
	return categorySplit;
}