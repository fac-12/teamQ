var createQs = {
    drawHeader: function(num) {
        var headerNode = document.createElement('h2');
        var textNode = document.createTextNode('Question #' + num);
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
            inputNode.setAttribute('id','item_'+index);
            inputNode.className = 'question_answerOption';
            var labelNode = document.createElement('label');
            labelNode.setAttribute('for','item_'+index);
            var textNode = document.createTextNode(item);
            labelNode.appendChild(textNode);
            formNode.appendChild(labelNode);
            formNode.appendChild(inputNode);
        });
        var submitNode = document.createElement('input');
        submitNode.setAttribute('type','submit');
        formNode.appendChild(submitNode);
        return formNode;
    }
}

function updateQuestions(apiObj) {
    
}