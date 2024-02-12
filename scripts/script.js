function loadData() {
    // const quizData = fetch('server route');

    const quizData = [
        {
            author: "kennedfer",
            questions:[
                {
                    question: "qual a melhor linguagem de programacao? 1",
                    answers:[
                        "javascript", "java", "python", "php"
                    ],
                    correct_answer: "java"
                }
            ]
        },
        {
            author: "kennedfer",
            questions:[
                {
                    question: "qual a melhor linguagem de programacao? 2",
                    answers:[
                        "javascript", "java", "python", "php"
                    ],
                    correct_answer: "java"
                }
            ]
        },
        {
            author: "kennedfer",
            questions:[
                {
                    question: "qual a melhor linguagem de programacao? 3",
                    answers:[
                        "javascript", "java", "python", "php"
                    ],
                    correct_answer: "java"
                }
            ]
        },
        {
            author: "kennedfer",
            questions:[
                {
                    question: "qual a melhor linguagem de programacao? 4",
                    answers:[
                        "javascript", "java", "python", "php"
                    ],
                    correct_answer: "java"
                }
            ]
        },
    ]

    return quizData;
}

function checkAnswer(event){
    alert(event);
}

const quizData = loadData();

