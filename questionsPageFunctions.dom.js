var questionsPage = {

    //convert text to standard text (without symbols, etc)
    decodeText: function (text) {
        var txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    },

    //input incorrect array and correct string, output single randomized array
    answersArray: function (incorrect, correct) {
        var orderedArray = incorrect.concat(correct);
        var random = Math.floor(Math.random() * orderedArray.length);
        var randomArray = [];
        for (var i = 0; i < orderedArray.length; i++) {
            randomArray[i] = this.decodeText(orderedArray[random]);
            if ((random + 1) < 4) {
                random++;
            } else {
                random = random + 1 - orderedArray.length;
            }
        }
        return randomArray;
    },

    //fetch specified question string from the api response, decode and return
    getQuestion: function (obj, index) {
        return this.decodeText(obj.results[index].question);
    },

    //fetch answers for specified question and return in randomized array
    getAnswers: function (obj, index) {
        var incorrect = obj.results[index].incorrect_answers;
        var correct = obj.results[index].correct_answer;
        return this.answersArray(incorrect, correct);
    },

    //return true if selected answer is correct
    checkCorrectAns: function (obj, index, option) {
        var correct = this.decodeText(obj.results[index].correct_answer);
        if (option === correct) {
            return true;
        } else {
            return false;
        }
    },

    drawAnswersForm: function (arr) {
        var formNode = document.createElement('form');
        arr.forEach(function (item, index) {
            var inputNode = document.createElement('input');
            inputNode.setAttribute('type', 'radio');
            inputNode.setAttribute('name', 'selection');
            inputNode.setAttribute('id', 'item_' + index);
            inputNode.setAttribute('value', item)
            inputNode.className = 'question_answerOption';
            var labelNode = document.createElement('label');
            labelNode.setAttribute('for', 'item_' + index);
            var textNode = document.createTextNode(item);
            labelNode.appendChild(inputNode);
            labelNode.appendChild(textNode);
            formNode.appendChild(labelNode);
            labelNode.className = "question_label";
        });
        var submitNode = helper.createNode('button','Next','question_nextButton');
        formNode.appendChild(submitNode);
        return formNode;
    },

    updateQuestions: function(apiObj, catId, index) {
        domNodes = helper.clearDom();
        var questionheader = helper.createNode('h2','Question #' + (index + 1),'question_header');
        domNodes[0].appendChild(questionheader);
        domNodes[1].className = "question_container";
        domNodes[1].appendChild(helper.createNode('h3',questionsPage.getQuestion(apiObj, index),'question_text'));
        var replyForm = domNodes[1].appendChild(questionsPage.drawAnswersForm(questionsPage.getAnswers(apiObj, index)));
        replyForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!document.querySelectorAll('input:checked').length) {
              alert("Don't you want to answer the question?");
            }
            else {
            var targetEntry = helper.findObj(categories,'id', catId)
            if (questionsPage.checkCorrectAns(apiObj, index, e.target['selection'].value)) {
                targetEntry.score = parseInt(targetEntry.score) + 1;
            }
            if (index < (apiObj.results.length - 1)) {
                questionsPage.updateQuestions(apiObj, catId, (index + 1))
            } else {
                targetEntry.taken = true;
                resultPage.updateDom(targetEntry.score);
            }
          }
        });

// highlight selected question
        var radioArr = Array.from(document.querySelectorAll('input'));
        var form = document.querySelector('form');
        radioArr.forEach(function(radioButton){
          form.addEventListener('click', function(){
          if (radioButton.checked) {
            radioButton.parentNode.classList.add('highlight');
          }
          else radioButton.parentNode.classList.remove('highlight');
        });
      })
}};

if (typeof module !== 'undefined') {
  module.exports = questionsPage;
}
