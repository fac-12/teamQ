const test = require('tape');

// helperFunctions.js tests

const helper = require('../helperFunctions.js');
var categories = [
    {name: 'General Knowledge', id: 9, score: 0},
    {name: 'Television', id: 14, score: 0},
    {name: 'Science and Nature', id: 17, score: 0},
];

test('findObj function finds correct item',function(t) {
    t.deepEquals(helper.findObj(categories,'id',14),{name: 'Television', id: 14, score: 0}, 'Function returns object specified.');
    t.end();
});

// questionsPageFunctions.js tests

const questionsPage = require('../questionsPageFunctions.dom.js');
var answersIncorrect = ['question1', 'question2', 'question3'];
var answerCorrect = 'question4';

test('answersArray function returns an array', function(t) {
  t.equals(questionsPage.answersArray(answersIncorrect, answerCorrect) instanceof Array, true, 'Function should return an array');
  t.end();
});

test('answersArray function returns array with length 4', function(t) {
  t.equals(questionsPage.answersArray(answersIncorrect, answerCorrect).length, 4, 'Function should return an array of length 4');
  t.end();
});
