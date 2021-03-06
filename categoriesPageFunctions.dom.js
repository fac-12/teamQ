//global variables
var categories = [
  {name: 'General Knowledge', id: 9, score: 0, taken: false},
  {name: 'Television', id: 14, score: 0, taken: false},
  {name: 'Science and Nature', id: 17, score: 0, taken: false},
  {name: 'Computer Science', id: 18, score: 0, taken: false},
  {name: 'Sports', id: 21, score: 0, taken: false},
  {name: 'Celebrities', id: 26, score: 0, taken: false}
];
var numQuestions = 5;
var sessionToken = "";

//Draws the home page with quiz categories
function drawCatPage() {
  var domNodes = helper.clearDom();
  var subHead = helper.createNode('h2','Select a category','subheader');
  var quizHead = helper.createNode('h1','Quiz','')
  domNodes[0].appendChild(quizHead);
  domNodes[0].appendChild(subHead);
  domNodes[1].appendChild(drawCategories(categories));
};

//Function takes category array as input and outputs single node containing category buttons as child nodes
function drawCategories(catArr) {
  //create container node to attach to main element
  var flexContainer = document.createElement('div');
  flexContainer.className = 'home-flex-container';
  //create each category button by looping through category array
  catArr.forEach(function(item) {
    //create button element and set id equal to category id
    var catButton = document.createElement('button');
    catButton.className = 'home-cat-button';
    catButton.setAttribute('id',item.id);
    //create category title and append to button
    var catTitle = document.createElement('h4');
    var catTitleText = document.createTextNode(item.name);
    catTitle.appendChild(catTitleText);
    catTitle.className = "cat_title";
    catButton.appendChild(catTitle);
    //create category score and append to button if greater than 0
    if (item.taken === true) {
      var catScore = document.createElement('p');
      var catScoreText = document.createTextNode(item.score+'/'+numQuestions);
      catScore.appendChild(catScoreText);
      catScore.className = "cat_score";
      catButton.appendChild(catScore);
    }
    //create button listener
    catButton.addEventListener('click', function(e) {
      getQuiz(e.currentTarget.id);
    })
    //append button to container node
    flexContainer.appendChild(catButton);
  });
  return flexContainer;
}

//Clear Dom, load waiting message, check on session token and load quiz
function getQuiz(id) {
  //clear page
  domNodes = helper.clearDom();
  //create waiting subheader
  domNodes[0].appendChild(helper.createNode('h2','Please wait...','subheader'));
  //reset score for category to 0
  helper.findObj(categories,'id',id).score = 0;
  //if no session token then get one then load quiz, or just load quiz
  if (!sessionToken) {
    helper.request("https://opentdb.com/api_token.php?command=request", function(result) {
      sessionToken = result.token;
      var url = 'https://opentdb.com/api.php?amount=' + numQuestions + '&category=' + id + '&difficulty=easy&type=multiple&token=' + sessionToken;
      loadQuiz(url,id);
    });
  } else {
    var url = 'https://opentdb.com/api.php?amount=' + numQuestions + '&category=' + id + '&difficulty=easy&type=multiple&token=' + sessionToken;
    loadQuiz(url,id);
  }
}

function loadQuiz(url,id) {
  //make xhr request then update questions once data loaded
  helper.request(url, function(result) {
    //if session token used up then reset it and fetch data anew
    if (result.response_code === 4) {
      helper.request("https://opentdb.com/api_token.php?command=reset&token="+sessionToken, function(result) {
        getQuiz(id);
      });
    } else {
      questionsPage.updateQuestions(result, id, 0);
    }
  });
}

drawCatPage();
