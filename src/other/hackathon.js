(function(){
function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
    (currentQuestion, questionNumber) => {

        // variable to store the list of possible options
        const options = [];

        // and for each available option...
        for(letter in currentQuestion.options){

        // ...add an HTML radio button
        options.push(
            `<label>
            <input type='radio' name='question${questionNumber}' value='${letter}'>
            ${letter} :
            ${currentQuestion.options[letter]}
            </label>`
        );
        }

        // add this question and its options to the output
        output.push(
        `<div class='question'> ${currentQuestion.question} </div>
        <div class='options'> ${options.join('')} </div>`
        );
    }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}

function showResults(){

    // gather option containers from our quiz
    const optionContainers = quizContainer.querySelectorAll('.options');

    // keep track of user's options
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected option
    const optionContainer = optionContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userOption = (optionContainer.querySelector(selector) || {}).value;

    // if option is correct
    if(userOption === currentQuestion.correctOption){
        // add to the number of correct options
        numCorrect++;

        // color the options green
        optionContainers[questionNumber].style.color = 'lightgreen';
    }
    // if option is wrong or blank
    else{
        // color the options red
        optionContainers[questionNumber].style.color = 'red';
    }
    });

    // show number of correct options out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

function addQuestion() {
    question_counter += 1;
    option_counter.push(0);
    option_counter[question_counter - 1] += 1;
    // Creates Question Input Form
    var questionInputForm = document.createElement('form');
    questionInputForm.setAttribute('id', `question-${question_counter}`);
    questionInputForm.setAttribute("onsubmit", "return false");
    questionInputForm.setAttribute("method", "post");

    // Creates Question Input Label and the input itself
    var questionInputLabel = document.createElement('label');
    questionInputLabel.setAttribute('for', `question-${question_counter}-input`);
    questionInputLabel.innerHTML = `Question ${question_counter}`;
    var questionInput = document.createElement('input');
    questionInput.setAttribute('id', `question-${question_counter}-input`);
    questionInput.setAttribute('name', `question-${question_counter}-input`);
    questionInput.setAttribute('type', 'text');

    // Appends label + input to the form
    questionInputForm.appendChild(questionInputLabel);
    questionInputForm.appendChild(questionInput);
    questionInputForm.appendChild(document.createElement("br"));
    questionInputForm.appendChild(document.createElement("br"));

    // Creates Option Input Label and the input itself
    var optionInputLabel = document.createElement('label');
    optionInputLabel.setAttribute('for', `option-question-${question_counter}-option-${option_counter[question_counter - 1]}-input`);
    optionInputLabel.setAttribute('id', `option-question-${question_counter}-option-${option_counter[question_counter - 1]}-label`);
    optionInputLabel.innerHTML = `Option ${option_counter[question_counter - 1]}`;
    var optionInput = document.createElement('input');
    optionInput.setAttribute('id', `option-question-${question_counter}-option-${option_counter[question_counter - 1]}-input`);
    optionInput.setAttribute('name', `option-question-${question_counter}-option-${option_counter[question_counter - 1]}-input`);
    optionInput.setAttribute('type', 'text');

    // Appends label + input to the form
    questionInputForm.appendChild(optionInputLabel);
    questionInputForm.appendChild(optionInput);
    questionInputForm.appendChild(document.createElement("br"));

    // Creates Option Add Button
    var optionAddBtn = document.createElement('BUTTON');
    optionAddBtn.innerHTML = 'Add Option';
    optionAddBtn.setAttribute('id', `add-option-${question_counter}`);

    questionInputForm.appendChild(optionAddBtn);
    questionInputForm.appendChild(document.createElement("br"));
    questionInputForm.appendChild(document.createElement("br"));

    // Select correct option
    var correctOptionLabel = document.createElement('label');
    correctOptionLabel.setAttribute('for', `option-correct-${question_counter}`);
    correctOptionLabel.setAttribute('id', `option-correct-${question_counter}-label`);
    correctOptionLabel.innerHTML = `Correct answer for Question ${question_counter} (must be number)`;
    var correctOption = document.createElement('input');
    correctOption.setAttribute('id', `option-correct-${question_counter}`);
    correctOption.setAttribute('name', `option-correct-${question_counter}`);
    correctOption.setAttribute('type', 'text');

    questionInputForm.appendChild(correctOptionLabel);
    questionInputForm.appendChild(correctOption);
    questionInputForm.appendChild(document.createElement("br"));

    // Adds all into the quiz part
    quizMakerContainer.insertBefore(questionInputForm, questionAddBtn);
    document.getElementById(`add-option-${question_counter}`).addEventListener('click', function() {
        addOption(question_counter);
    });
}

function addOption(i) {
    option_counter[i - 1] += 1;
    num = option_counter[i - 1];
    var addOpt = document.getElementById(`add-option-${i}`);

    // Creates Option Input Label and the input itself
    var optionInputLabel = document.createElement('label');
    optionInputLabel.setAttribute('for', `option-question-${i}-option-${num}-input`);
    optionInputLabel.setAttribute('id', `option-question-${i}-option-${num}-label`);
    optionInputLabel.innerHTML = `Option ${num}`;
    var optionInput = document.createElement('input');
    optionInput.setAttribute('id', `option-question-${i}-option-${num}-input`);
    optionInput.setAttribute('name', `option-question-${i}-option-${num}-input`);
    optionInput.setAttribute('type', 'text');

    // Appends label + input to the form
    var form = document.getElementById(`question-${i}`);
    form.insertBefore(optionInputLabel, addOpt);
    form.insertBefore(optionInput, addOpt);
    form.insertBefore(document.createElement("br"), addOpt);
}

const createQuizButton = document.getElementById('quiz-button');
const submitQuizButton = document.getElementById('quiz-submit');
const submitButton = document.getElementById('submit');
const quizMakerContainer = document.getElementById('quiz-maker');
const quizMain = document.getElementById('quiz-main');
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');

// Checks to see if the button to create the quiz has been clicked, and if it has:
// Changes the main quiz area to show
// Hides the button
document.getElementById('quiz-button').addEventListener('click', function () {
    quizMain.style.display = 'block';
    quizMakerContainer.style.display = 'block';
    createQuizButton.style.display = 'none';
    submitQuizButton.style.display = 'block';
});

var question_counter = 0;
let option_counter = [];

var i;
var j;

// Creates Question Add Button
var questionAddBtn = document.createElement('BUTTON');
questionAddBtn.innerHTML = 'Add Question';
questionAddBtn.setAttribute('id', 'add-question');

quizMakerContainer.appendChild(questionAddBtn);

addQuestion();

const addQuestionButton = document.getElementById('add-question');
// Listener for whenever someone clicks the "Add question" button
addQuestionButton.addEventListener('click', addQuestion);

let elements = []
let myQuestions = [];
// Kick things off

submitQuizButton.addEventListener('click', function () {
    for (i = 1; i < (question_counter + 1); i++) {
        var x = $(`#question-${i}`).serializeArray();
        elements.push([]);
        $.each(x, function(j, field) {
            elements[i - 1].push(field.value + "");
        });
    }

    for (i = 0; i < elements.length; i++) {
        for (j = 0; j < elements[i].length - 1; j++) {
            if (j == 0) {
                myQuestions.push({question: elements[i][j], options: {}, correctOption: ""});
            } else {
                var letter = String.fromCharCode(96 + j);
                myQuestions[i]["options"][`${letter}`] = elements[i][j];
            }
        }
        var correct = String.fromCharCode(96 + parseInt(elements[i][elements[i].length - 1]));
        myQuestions[i]["correctOption"] = `${correct}`;
    }

    console.log(myQuestions);

    quizMakerContainer.style.display = 'none';
    submitQuizButton.style.display = 'none';
    quizContainer.style.display = 'block';
    resultsContainer.style.display = 'block';
    submitButton.style.display = 'block';

    buildQuiz();
});

submitButton.addEventListener('click', showResults);

})();

// const myQuestions = [
//     {
//     question: 'Who invented JavaScript?',
//     options: {
//         a: 'Douglas Crockford',
//         b: 'Sheryl Sandberg',
//         c: 'Brendan Eich'
//     },
//     correctOption: 'c'
//     },
//     {
//     question: 'Which one of these is a JavaScript package manager?',
//     options: {
//         a: 'Node.js',
//         b: 'TypeScript',
//         c: 'npm'
//     },
//     correctOption: 'c'
//     },
//     {
//     question: 'Which tool can you use to ensure code quality?',
//     options: {
//         a: 'Angular',
//         b: 'jQuery',
//         c: 'RequireJS',
//         d: 'ESLint'
//     },
//     correctOption: 'd'
//     }
// ];