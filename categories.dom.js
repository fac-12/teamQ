var cat1 = document.querySelector('.cat-1');
var cat2 = document.querySelector('.cat-2');
var cat3 = document.querySelector('.cat-3');
var cat4 = document.querySelector('.cat-4');
var cat5 = document.querySelector('.cat-5');
var cat6 = document.querySelector('.cat-6');

var categories = {
  "General Knowledge": 9,
  "Television": 14,
  "Science and Nature": 17,
  "Computer Science": 18,
  "Sports": 21,
  "Celebrities": 26
}

// var categories = {
//
// createHeaderCategories: function() {
//   var title = document.createTextNode('Quiz');
//   var header = document.querySelector('header');
//   header.classList = "categoriesTitle";
//   header.appendChild(title);
// }
//
// createCategorySections: function() {
//
// }
//
// addEventListenerCategories: function() {
//
// }
//
// selectCategory: function(){
//   var xhr = new XMLHttpRequest();
//   var url = 'https:\//opentdb.com/api.php?amount=5&category='+ categories[e.target.textContent.toString()] +'&difficulty=easy&type=multiple';
//     console.log(e);
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       var quizObject = JSON.parse(xhr.responseText);
//       console.log(quizObject);
//       return quizObject;
//     }
//   };
//   xhr.open("GET", url, true);
//   xhr.send();
// }
//
//
//
// }



cat1.addEventListener('click', getQuiz);
cat2.addEventListener('click', getQuiz);
cat3.addEventListener('click', getQuiz);
cat4.addEventListener('click', getQuiz);
cat5.addEventListener('click', getQuiz);
cat6.addEventListener('click', getQuiz);

function getQuiz(e){
  var xhr = new XMLHttpRequest();
  var url = 'https:\//opentdb.com/api.php?amount=5&category='+ categories[e.target.textContent.toString()] +'&difficulty=easy&type=multiple';
    console.log(e);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var quizObject = JSON.parse(xhr.responseText);
      updateQuestions(quizObject,0);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
