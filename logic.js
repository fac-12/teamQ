
var example = {
    "response_code": 0,
    "results": [
        {
            "category": "Entertainment: Books",
            "type": "multiple",
            "difficulty": "medium",
            "question": "How many books are in the Chronicles of Narnia series?",
            "correct_answer": "7",
            "incorrect_answers": [
                "6",
                "8",
                "5"
            ]
        },
        {
            "category": "General Knowledge",
            "type": "multiple",
            "difficulty": "easy",
            "question": "In the video-game franchise Kingdom Hearts, the main protagonist, carries a weapon with what shape?",
            "correct_answer": "Key",
            "incorrect_answers": [
                "Sword",
                "Pen",
                "Cellphone"
            ]
        },
        {
            "category": "Entertainment: Film",
            "type": "multiple",
            "difficulty": "medium",
            "question": "In which 1955 film does Frank Sinatra play Nathan Detroit?",
            "correct_answer": "Guys and Dolls",
            "incorrect_answers": [
                "Anchors Aweigh",
                "From Here to Eternity",
                "High Society"
            ]
        },
        {
            "category": "Geography",
            "type": "multiple",
            "difficulty": "hard",
            "question": "In 2012 the German-speaking microstate &quot;Liechtenstein&quot; in Central Europe had a population of how many inhabitants?",
            "correct_answer": "36,600",
            "incorrect_answers": [
                "2,400",
                "90,000",
                "323,400"
            ]
        },
        {
            "category": "Entertainment: Video Games",
            "type": "multiple",
            "difficulty": "hard",
            "question": "When was the first &quot;Half-Life&quot; released?",
            "correct_answer": "1998",
            "incorrect_answers": [
                "2004",
                "1999",
                "1997"
            ]
        },
        {
            "category": "Geography",
            "type": "multiple",
            "difficulty": "hard",
            "question": "How many countries border Kyrgyzstan?",
            "correct_answer": "4",
            "incorrect_answers": [
                "3",
                "1",
                "6"
            ]
        },
        {
            "category": "General Knowledge",
            "type": "multiple",
            "difficulty": "medium",
            "question": "The term &quot;scientist&quot; was coined in which year?",
            "correct_answer": "1833",
            "incorrect_answers": [
                "1933",
                "1942",
                "1796"
            ]
        },
        {
            "category": "Entertainment: Video Games",
            "type": "multiple",
            "difficulty": "hard",
            "question": "What&#039;s the name of the halloween-related Sims 4 Stuff Pack released September 29th, 2015?",
            "correct_answer": "Spooky Stuff",
            "incorrect_answers": [
                "Ghosts n&#039; Ghouls",
                "Nerving Nights",
                "Fearful Frights"
            ]
        },
        {
            "category": "Geography",
            "type": "multiple",
            "difficulty": "hard",
            "question": "What city is known as the Rose Capital of the World?",
            "correct_answer": "Tyler, Texas",
            "incorrect_answers": [
                "San Diego, California",
                "Miami, Florida",
                "Anaheim, California"
            ]
        },
        {
            "category": "Entertainment: Japanese Anime & Manga",
            "type": "multiple",
            "difficulty": "hard",
            "question": "Medaka Kurokami from &quot;Medaka Box&quot; has what abnormality?",
            "correct_answer": "The End",
            "incorrect_answers": [
                "Perfection",
                "Sandbox",
                "Fairness"
            ]
        }
    ]
};

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
console.log(questionFunc.getAnswers(example, 7))
document.getElementById("test").textContent = questionFunc.getQuestion(example, 7);
