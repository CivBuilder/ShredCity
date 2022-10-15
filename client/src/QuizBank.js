const quizBank = [
    {
        questionText: 'What do you ride?',
        answerOptions: [
            { answerText: 'Skis', properties: {moguls: 'Y'}},
            { answerText: 'Snowboard', properties: {moguls: 'N'}}  /// change to tinyint in sql
        ],
    },		
{
        questionText: 'How often do you ride?',
        answerOptions: [
            { answerText: 'This is my first day', properties: {difficulty_rating: "Easiest"}},
            { answerText: "I've ridden before", properties: {difficulty_rating: "Intermediate"}},
            { answerText: 'Weekend warrior', properties: {difficulty_rating: "Expert"}},
            { answerText: "I'm the next Shaun White", properties: {difficulty_rating: "Experts Only"}},
        ],
    },
{
        questionText: 'Which mountain are you on?',
        answerOptions: [
            { answerText: 'Navajo', properties: {mountain: "Navajo"}},
            { answerText: 'Giant Steps', properties: {mountain: "Giant Steps"}},
        ],
    },
{
        questionText: 'What type of run are you looking for?',
        answerOptions: [
            { answerText: 'Learning', properties: {jumps: 'N', moguls: 'N'}},
            { answerText: 'Cruising with friends', properties: {jumps: 'N'}},
            { answerText: 'Take me to the jumps', properties: {jumps: 'Y'}},
        ],
    },
{
        questionText: 'Are you alright riding with people around?',
        answerOptions: [
            { answerText: 'Yes, I live in the slow zone', properties: {busy_usually: 'Y'}},
            { answerText: "I won't mind it", properties:{busy_usually: null}},
            { answerText: 'No', properties:{busy_usually: 'N'}},
        ],
    },
];

export default quizBank;