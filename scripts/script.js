class QuizGame {
  _questions;
  _currentQuestion = 0;

  _questionElement;
  _questionIndicatorElement;

  _transitionElement;
  _transitionMessageElement;

  _transitionTime = 3;
  _questionTransitionAnimation = `${this._transitionTime}s linear 1 question-transition`;
  _errorTransitionAnimation = `${this._transitionTime}s linear 1 forwards error-transition`;
  _winTransitionAnimation = `${this._transitionTime}s linear 1 forwards win-transition`;

  _WRONG_ANSWER_ANIMATION = "0.5s linear 3 forwards wrong-answer";
  _CORRECT_ANSWER_ANIMATION = "0.5s linear 3 forwards correct-answer";

  constructor(questions) {
    this._questions = questions;

    this._questionElement = document.getElementById("question");
    this._questionIndicatorElement =
      document.getElementById("question-indicator");

    this._transitionElement = document.getElementById("question-transition");
    this._transitionMessageElement = this._transitionElement.children.item(0);
  }

  _paintQuestion() {
    this._questionElement.textContent =
      this._questions[this._currentQuestion].question;

    // A adicao do mais 1 garante que nao tenhamos 'Questao 0 de 4'
    this._questionIndicatorElement.textContent = `Questao ${
      this._currentQuestion + 1
    } de ${this._questions.length}`;
  }

  _setCurrentQuestion(value) {
    this._currentQuestion = value;
  }

  _startInQuestion(currentQuestion) {
    this._setCurrentQuestion(currentQuestion);
    this._paintQuestion();
  }

  startGame() {
    this._startInQuestion(0);
  }

  _clearElementAnimations(element) {
    element.style.animation = "";
    element.offsetWidth;
  }

  _playAnimation(element, animation) {
    this._clearElementAnimations(element);
    element.style.animation = animation;
  }

  _showQuestionTransition() {
    this._playAnimation(
      this._transitionElement,
      this._questionTransitionAnimation
    );
    //O '+2' tem a mesma funcao que o '+1' anterior, mas, como a incrementacao
    //do valor so ocorre mais adiante o outro '+1' eh para compensar isso
    this._transitionMessageElement.textContent = `Questao ${
      this._currentQuestion + 2
    } de ${this._questions.length}`;
  }

  _showErrorTransition() {
    this._playAnimation(
      this._transitionElement,
      this._errorTransitionAnimation
    );

    this._transitionMessageElement.innerHTML = `perdeu man hahah <br> tente novamente`;
  }

  _showWinTransition() {
    this._playAnimation(this._transitionElement, this._winTransitionAnimation);

    this._transitionMessageElement.innerHTML = `parabens, voce venceu!<br>jogar novamente`;
  }

  _nextQuestion() {
    this._showQuestionTransition();
    this._disableTransitionMessageEvents();

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

  _playWrongAnswerAnimation(button) {
    this._playAnimation(button, this._WRONG_ANSWER_ANIMATION);
    setTimeout(() => this._clearElementAnimations(button), 2000);
  }
  _playCorrectAnswerAnimation(button) {
    this._playAnimation(button, this._CORRECT_ANSWER_ANIMATION);
    setTimeout(() => this._clearElementAnimations(button), 2000);
  }

  checkAnswer(buttonElement) {
    const currentAnswer = buttonElement.textContent.trim();

    const correctAnswer = this._questions[this._currentQuestion].correct_answer;
    if (currentAnswer !== correctAnswer) {
      return this._looseGame(buttonElement);
    }

    this._playCorrectAnswerAnimation(buttonElement);

    if (this._currentQuestion + 1 == this._questions.length)
      return this._winGame();

    this._nextQuestion();
  }

  _disableTransitionMessageEvents() {
    this._transitionMessageElement.style.pointerEvents = "none";
    setTimeout(() => {
      this._transitionMessageElement.style.pointerEvents = "auto";
    }, this._transitionTime * 1000);
  }

  hideTransition() {
    const hideTransitionAnimation =
      this._transitionElement.style.animation.replace("normal", "reverse");
    this._clearElementAnimations(this._transitionElement);
    this._playAnimation(this._transitionElement, hideTransitionAnimation);
    this._disableTransitionMessageEvents();
  }

  _winGame() {
    this._showWinTransition();
    this.startGame();
  }

  _looseGame(buttonElement) {
    this._playWrongAnswerAnimation(buttonElement);
    this._showErrorTransition();
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

function checkAnswer(element) {
  // O html adiciona espacos ao texto,o trim os remove
  quizGame.checkAnswer(element);
}

function hideTransition() {
  quizGame.hideTransition();
}

const quizData = loadData();
const quizGame = new QuizGame(quizData.questions);
quizGame.startGame();
