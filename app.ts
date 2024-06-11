#! /usr/bin/env node


import chalk from "chalk";
import inquirer from "inquirer";

// Define the interface for a question
interface Question {
    question: string;
    choices: string[];
    correctAnswer: number;
}

const questions: Question[] = [
    {
        question: "What is TypeScript?",
        choices: [
            "A superset of JavaScript",
            "A subset of JavaScript",
            "A completely different programming language",
            "A programming language designed for web development",
        ],
        correctAnswer: 0,
    },
    {
        question: "Why is the 'any' data type used in TypeScript?",
        choices: [
            "To ignore type safety",
            "To declare a flexible variable for any data type",
            "To improve performance",
            "To avoid syntax errors",
        ],
        correctAnswer: 0,
    },
    {
        question: "Which command line utility is used for the TypeScript Compiler?",
        choices: [
            "tscc",
            "tsc",
            "tscompiler",
            "typescript-compiler",
        ],
        correctAnswer: 1,
    },
    {
        question: "How is an 'Enum' used to represent data in TypeScript?",
        choices: [
            "To organize arrays",
            "To define constants",
            "To group functions",
            "To access object properties",
        ],
        correctAnswer: 1,
    },
    {
        question: "What is an 'Interface' in TypeScript?",
        choices: [
            "It is used to represent a specific data type",
            "It is used to declare variables in the global scope",
            "It is used to import external libraries",
            "It is used to handle conditional statements",
        ],
        correctAnswer: 0,
    },
];

// WelcomeMessage..
(async function displayText() {
    console.clear();
    console.log(chalk.green.bold("--- Welcome to the TypeScript Quiz! ---"));
    console.log(chalk.magenta("Let's test your knowledge on TypeScript.\n"));
})();

async function quiz() {
    let score = 0;
    const incorrectAnswers: { question: string, correctAnswer: string }[] = [];

    for (const [idx, q] of questions.entries()) {
        const answer = await inquirer.prompt({
            type: "list",
            name: `question${idx}`,
            message: q.question,
            choices: q.choices,
        });

        const userAnswer = q.choices.indexOf(answer[`question${idx}`]);
        const correctAns = q.choices[q.correctAnswer];

        if (userAnswer === q.correctAnswer) {
            score++;
        } else {
            incorrectAnswers.push({ question: q.question, correctAnswer: correctAns });
        }
    }

    let message = "";
    switch (score) {
        case questions.length:
            message = chalk.yellow("Congratulations! You got a full score!");
            break;
        default:
            message = chalk.redBright(`You scored ${score} out of ${questions.length}. Better luck next time!`);
            break;
    }
    console.log(message);
}

quiz();
