const test = require('tape');
const helper = require('../helper.js');

var categories = [
    {name: 'General Knowledge', id: 9, score: 0},
    {name: 'Television', id: 14, score: 0},
    {name: 'Science and Nature', id: 17, score: 0},
];

test('findObj function finds correct item',function(t) {
    t.deepEquals(helper.findObj(categories,'id',14),{name: 'Television', id: 14, score: 0}, 'Function returns object specified.');
    t.end();
});



