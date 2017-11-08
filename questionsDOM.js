var correctAns = 0;

var createQs = {
    drawHeader: function(num) {
        var headerNode = document.createElement('h2');
        var textNode = document.createTextNode('Question #' + (num+1));
        headerNode.appendChild(textNode);
        headerNode.className = 'question_header';
        return headerNode;
    },

    drawQuestion: function(str) {
        var questionNode = document.createElement('h3');
        var textNode = document.createTextNode(str);
        questionNode.appendChild(textNode);
        questionNode.className = 'question_text';
        return questionNode;
    },

    drawAnswersForm: function(arr) {
        var formNode = document.createElement('form');
        arr.forEach(function(item, index) {
            var inputNode = document.createElement('input');
            inputNode.setAttribute('type','radio');
            inputNode.setAttribute('name','selection');
            inputNode.setAttribute('id','item_'+index);
            inputNode.setAttribute('value',item)
            inputNode.className = 'question_answerOption';
            var labelNode = document.createElement('label');
            labelNode.setAttribute('for','item_'+index);
            var textNode = document.createTextNode(item);
            labelNode.appendChild(inputNode);
            labelNode.appendChild(textNode);
            formNode.appendChild(labelNode);
        });
        var submitNode = document.createElement('button');
        submitNode.className = "question_nextButton";
        var textNode = document.createTextNode('Next');
        submitNode.appendChild(textNode);
        formNode.appendChild(submitNode);
        return formNode;
    }
}

function updateQuestions(apiObj,index) {
    var header = document.getElementsByTagName('header')[0];
    header.replaceChild(createQs.drawHeader(index),header.lastElementChild);
    var main = document.getElementsByTagName('main')[0];
    main.classList.add("question_container");
    while (main.firstChild) {
        main.removeChild(main.firstChild)
    };
    main.appendChild(createQs.drawQuestion(questionFunc.getQuestion(apiObj,index)));
    main.appendChild(createQs.drawAnswersForm(questionFunc.getAnswers(apiObj,index)));
    main.addEventListener('submit',function(e) {
        e.preventDefault();
        if(questionFunc.checkCorrectAns(apiObj, index, e.target['selection'].value)){
          correctAns++;
        }
        if(index<(apiObj.results.length-1)){
          updateQuestions(apiObj, index+1)
        } else{
          //
        }
    });
}
