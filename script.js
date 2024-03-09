let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;

function loadCreateQuizPage() {
    hideAllPages();
    document.getElementById('create-quiz-page').style.display = 'block';
}

function loadTakeQuizPage() {
    hideAllPages();
    document.getElementById('take-quiz-page').style.display = 'block';
    startQuiz();
}

function hideAllPages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });
}

function createQuiz(event) {
    event.preventDefault();
    const quizTitle = document.getElementById('quiz-title').value;
    const questions = document.querySelectorAll('.question');

    currentQuiz = {
        title: quizTitle,
        questions: [],
    };

    questions.forEach(question => {
        const questionText = question.querySelector('input[name="question"]').value;
        const option1 = question.querySelector('input[name="option1"]').value;
        const option2 = question.querySelector('input[name="option2"]').value;
        const option3 = question.querySelector('input[name="option3"]').value;
        const correctAnswer = question.querySelector('input[name="correct-answer"]').value;

        currentQuiz.questions.push({
            text: questionText,
            options: [option1, option2, option3],
            correctAnswer: correctAnswer,
        });
    });

    console.log(currentQuiz);
    loadTakeQuizPage();
    displayCurrentQuestion();
}

function addQuestion() {
    const questionsContainer = document.getElementById('questions-container');
    const newQuestion = document.createElement('div');
    newQuestion.classList.add('question');
    newQuestion.innerHTML = `
        <label for="question">Question:</label>
        <input type="text" name="question" placeholder="Enter your Question Here"  required>
        <label for="option1">Option 1:</label>
        <input type="text" name="option1" placeholder="Enter your First Option" required>
        <label for="option2">Option 2:</label>
        <input type="text" name="option2" placeholder="Enter your Second Option" required>
        <label for="option3">Option 3:</label>
        <input type="text" name="option3" placeholder="Enter your Third Option" required>
        <label for="correct-answer">Correct Answer:</label>
        <input type="text" name="correct-answer" placeholder="Enter your Correct Answer" required>
    `;
    questionsContainer.appendChild(newQuestion);
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    displayCurrentQuestion();
}

function displayCurrentQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <h3>Question ${currentQuestionIndex + 1}:</h3>
        <p>${currentQuiz.questions[currentQuestionIndex].text}</p>
        <form onsubmit="submitAnswer(event)">
            ${generateOptionsHTML()}
            <button type="submit">Next</button>
        </form>
    `;
}

function generateOptionsHTML() {
    const options = currentQuiz.questions[currentQuestionIndex].options;
    let optionsHTML = '';

    for (let i = 0; i < options.length; i++) {
        optionsHTML += `
            <label>
                <input type="radio" name="answer" value="${options[i]}" required>
                ${options[i]}
            </label>
            <br>
        `;
    }

    return optionsHTML;
}

function submitAnswer(event) {
    event.preventDefault();
    const selectedAnswer = document.querySelector('input[name="answer"]:checked').value;
    const correctAnswer = currentQuiz.questions[currentQuestionIndex].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < currentQuiz.questions.length) {
        displayCurrentQuestion();
    } else {
        displayResults();
    }
}

function displayResults() {
    hideAllPages();
    document.getElementById('results-page').style.display = 'block';
    document.getElementById('score').innerText = score + ' / ' + currentQuiz.questions.length;
    displayCorrectAnswers();
}

function displayCorrectAnswers() {
    const correctAnswersContainer = document.getElementById('correct-answers');
    correctAnswersContainer.innerHTML = '<h3>Correct Answers:</h3>';

    currentQuiz.questions.forEach((question, index) => {
        correctAnswersContainer.innerHTML += `
            <p>Question ${index + 1}: ${question.correctAnswer}</p>
        `;
    });
}
