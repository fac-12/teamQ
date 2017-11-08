
var questionFunc = {
  decodeText: function(text){
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
  },
  answersArray: function(incorrect, correct) {
    var orderedArray = incorrect.concat(correct);
    var random = Math.floor(Math.random() * orderedArray.length);
    var randomArray = [];
    for (var i = 0; i < orderedArray.length; i++) {
      randomArray[i] = this.decodeText(orderedArray[random]);
      if ((random + 1) < 4) {
        random++
      } else {
        random = random + 1 - orderedArray.length
      }
    }
    return randomArray
  },
  getQuestion: function(obj, index){
    return this.decodeText(obj.results[index].question);
  },
  getAnswers: function(obj, index){
    var incorrect = obj.results[index].incorrect_answers;
    var correct = obj.results[index].correct_answer;
    return this.answersArray(incorrect, correct);
  },
  checkCorrectAns: function(option){
      var correct = this.decodeText(obj.results[index].correct_answer);
      if(option === correct){
        return true;
      } else {
        return false;
      }
  }
}