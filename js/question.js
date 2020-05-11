class Question {

	constructor(questionNumber) {
		this.questionNumber = questionNumber;
		this.questionTitle = "Unkown";
		this.questionAnswers = [];
		this.correctAnswerIndex = 0;
	}

}

function buildQuestions(categories, numberOfQuestions) {
	var questions = [];
	var categorySplit = calculateCategorySplit(categories, numberOfQuestions);

	return categorySplit;
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
	
	var keys = Object.keys(categorySplit);
	while(totalAllocated > numberOfQuestions) {
		var idx = Math.floor(Math.random()*keys.length);
		categorySplit[keys[idx]]--;
		totalAllocated--;
	}
	
	while(totalAllocated < numberOfQuestions) {
		var idx = Math.floor(Math.random()*keys.length);
		categorySplit[keys[idx]]++;
		totalAllocated++;
	}
	
	return categorySplit;
}