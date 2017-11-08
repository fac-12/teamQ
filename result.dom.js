  var container = document.querySelector('.container');
  var resultPage = {

  createHeaderResults: function(){
    var title = document.createTextNode('Result');
    var header = document.querySelector('header');
    header.classList = "resultTitle";
    header.appendChild(title);
    return header;
  },

  createGIF: function(correctAns){
    var gifKey = '';
    if (correctAns === 0 | correctAns === 1 | correctAns === 2){
      gifKey = 'are+you+stupid';
    } else if (correctAns === 3 |correctAns === 4){
      gifKey = 'not+bad';
    } else {
      gifKey = 'nerd';
    }
      var xhr = new XMLHttpRequest();
      var url = 'https:\//api.giphy.com/v1/gifs/search?api_key=46Zrp3eTdSwqvCN2qtQB4ICwh51fZSyt&q='+gifKey+ '&limit=200&offset=0&rating=G&lang=en'

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var gifObject = JSON.parse(xhr.responseText);
          var random = Math.floor(Math.random() * gifObject.data.length);
          console.log(gifObject);
          var gif = document.createElement('video');
          var gifSource = document.createElement('source');
          gifSource.src = gifObject.data[random].images.original.mp4;
          gif.appendChild(gifSource);
          gif.setAttribute('autoplay',true);
          gifSource.setAttribute('type', 'Video/mp4')
          gif.setAttribute('loop',true);
          gif.classList = "video";
          container.appendChild(gif);
        }
      };
      xhr.open("GET", url, true);
      xhr.send();
    },

    displayResult: function(correctAns){
      var displayScoreDiv = document.createElement('div');
      var displayScoreText = document.createTextNode(correctAns + '/5');
      displayScoreDiv.appendChild(displayScoreText);
      container.appendChild(displayScoreDiv);


  },

    createRestartButton: function(){
      var restart = document.createElement('button');
      restart.classList = "resetButton";
      var restartText = document.createTextNode('Another quiz!');
      restart.appendChild(restartText);
      restart.addEventListener('click', function(){
        location.reload();
      });
      container.appendChild(restart);
  },

     updateDom: function(){
    var main = document.querySelector('main');
    while (main.firstChild) {
        main.removeChild(main.firstChild)
    };
    resultPage.createHeaderResults();
    resultPage.displayResult(correctAns);
    resultPage.createGIF(correctAns);
    resultPage.createRestartButton();
}


}
