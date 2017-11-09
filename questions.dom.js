var questionsPage = {

    decodeText: function (text) {
        var txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    },

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

    getQuestion: function (obj, index) {
        return this.decodeText(obj.results[index].question);
    },

    getAnswers: function (obj, index) {
        var incorrect = obj.results[index].incorrect_answers;
        var correct = obj.results[index].correct_answer;
        return this.answersArray(incorrect, correct);
    },

    checkCorrectAns: function (obj, index, option) {
        var correct = this.decodeText(obj.results[index].correct_answer);
        if (option === correct) {
            return true;
        } else {
            return false;
        }
    },

    drawQuestion: function (str) {
        var questionNode = document.createElement('h3');
        var textNode = document.createTextNode(str);
        questionNode.appendChild(textNode);
        questionNode.className = 'question_text';
        return questionNode;
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
            labelNode.className = "question_label"
        });
        var submitNode = document.createElement('button');
        submitNode.className = "question_nextButton";
        var textNode = document.createTextNode('Next');
        submitNode.appendChild(textNode);
        formNode.appendChild(submitNode);
        return formNode;
    },

    updateQuestions: function(apiObj, catId, index) {
        domNodes = helper.clearDom();
        var questionheader = helper.drawSubHeader("Question #" + (index + 1));
        questionheader.classList.add("question_header");
        domNodes[0].appendChild(questionheader);
        domNodes[1].className = "question_container";
        domNodes[1].appendChild(questionsPage.drawQuestion(questionsPage.getQuestion(apiObj, index)));
        var replyForm = domNodes[1].appendChild(questionsPage.drawAnswersForm(questionsPage.getAnswers(apiObj, index)));
        replyForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var targetEntry = helper.findObj(categories,'id', catId)
            if (questionsPage.checkCorrectAns(apiObj, index, e.target['selection'].value)) {
                targetEntry.score = parseInt(targetEntry.score) + 1;
            }
            if (index < (apiObj.results.length - 1)) {

                questionsPage.updateQuestions(apiObj, catId, (index + 1))
            } else {
                resultPage.updateDom(targetEntry.score);
            }
        });
    }
};
