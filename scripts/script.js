class QuizGame {
  _questions;
  _currentQuestion = 0;

  _questionElement;
  _questionIndicatorElement;

  constructor(questions) {
    this._questions = questions;

    this._questionElement = document.getElementById("question");
    this._questionIndicatorElement =
      document.getElementById("question-indicator");
  }

  _paintQuestion() {
    this._questionElement.textContent =
      this._questions[this._currentQuestion].question;

    // A adicao do mais 1 garante que nao tenhamos 'Questao 0 de 4'
    this._questionIndicatorElement.textContent = `Questao ${
      this._currentQuestion + 1
    } de ${this._questions.length}`;
  }

  setCurrentQuestion(value) {
    this._currentQuestion = value;
  }

  _startInQuestion(currentQuestion) {
    this.setCurrentQuestion(currentQuestion);
    this._paintQuestion();
  }

  startGame() {
    this._startInQuestion(0);
  }

  nextQuestion() {
    this._startInQuestion(this._currentQuestion + 1);
  }

  checkAnswer(answer) {
    const correctAnswer = this._questions[this._currentQuestion].correct_answer;
    if (answer !== correctAnswer) {
      return this._looseGame();
    }

    this.nextQuestion();
  }

  _looseGame() {
    alert("Perdeu");
  }
}

function loadData() {
  // const quizData = fetch('server route');

  const quizData = {
    author: "kennedfer",
    questions: [
      {
        question: "qual a melhor linguagem de programacao? 1",
        answers: ["javascript", "java", "python", "php"],
        correct_answer: "java",
      },
      {
        question: "qual a melhor linguagem de programacao? 2",
        answers: ["javascript", "java", "python", "php"],
        correct_answer: "java",
      },
      {
        question: "qual a melhor linguagem de programacao? 3",
        answers: ["javascript", "java", "python", "php"],
        correct_answer: "java",
      },
      {
        question: "qual a melhor linguagem de programacao? 4",
        answers: ["javascript", "java", "python", "php"],
        correct_answer: "java",
      },
    ],
  };

  return quizData;
}

function checkAnswer(event) {
  // O html adiciona espacos ao texto,o trim os remove
  const currentAnswer = event.textContent.trim();
  quizGame.checkAnswer(currentAnswer);
}

const quizData = loadData();
const quizGame = new QuizGame(quizData.questions);
quizGame.startGame();
