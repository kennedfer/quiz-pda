class QuizGame {
  _questions;
  _currentQuestion = 0;

  _questionElement;
  _questionIndicatorElement;

  _transitionTime = 5;
  _transitionAnimation = `${this._transitionTime}s ease 1 transition`;
  _transitionElement;

  constructor(questions) {
    this._questions = questions;

    this._questionElement = document.getElementById("question");
    this._questionIndicatorElement =
      document.getElementById("question-indicator");

    this._transitionElement = document.getElementById("question-transition");
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

  _showTransition() {
    this._transitionElement.style.animation = "";
    this._transitionElement.offsetWidth;
    this._transitionElement.style.animation = this._transitionAnimation;
  }

  _nextQuestion() {
    this._showTransition();

    /*
    Eu preciso que a questao mude no meio da animacao (para que o texto nao mude 'do nada')
    por isso o timeOut eh o tempo da animcao multiplicado por 500, o timeout deve ser em ms
    e como eu preciso de apenas metade do tempo da animacao eu ja multiplico por 500 (metade
    de 1s em ms) para ter logo o valor especifico
    */
    setTimeout(
      () => this._startInQuestion(this._currentQuestion + 1),
      this._transitionTime * 500
    );
  }

  checkAnswer(answer) {
    const correctAnswer = this._questions[this._currentQuestion].correct_answer;
    if (answer !== correctAnswer) return this._looseGame();
    if (this._currentQuestion + 1 == this._questions.length)
      return this._winGame();

    this._nextQuestion();
  }

  _winGame() {
    alert("Ganhou");
  }

  _looseGame() {
    alert("Perdeu");
    this.startGame();
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
