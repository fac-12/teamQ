  var container = document.querySelector('.container');

  var resultPage = {

    // createHeaderResults: function () {
    //   var title = document.createTextNode('Result');
    //   var header = document.querySelector('header');
    //   header.classList = "resultTitle";
    //   header.appendChild(title);
    //   return header;
    // },
    createRestartButton: function () {
      var restart = document.createElement('button');
      restart.classList = "resetButton";
      var restartText = document.createTextNode('Another quiz!');
      restart.appendChild(restartText);
      restart.addEventListener('click', function () {
        container.classList.remove("result_container");
        drawCatPage();
      });
      container.appendChild(restart);
    },
    createGIF: function (correctAns) {
      container.classList.add("result_container");
      var gifKey = '';
      if (correctAns === 0 | correctAns === 1 | correctAns === 2) {
        gifKey = 'are+you+stupid';
      } else if (correctAns === 3 | correctAns === 4) {
        gifKey = 'not+bad';
      } else {
        gifKey = 'nerd';
      }
      var url = 'https:\//api.giphy.com/v1/gifs/search?api_key=46Zrp3eTdSwqvCN2qtQB4ICwh51fZSyt&q=' + gifKey + '&limit=200&offset=0&rating=G&lang=en'
      helper.request(url, function (result) {
        var random = Math.floor(Math.random() * result.data.length);
        var gif = document.createElement('video');
        var gifSource = document.createElement('source');
        gifSource.src = result.data[random].images.original.mp4;
        gif.appendChild(gifSource);
        gif.setAttribute('autoplay', true);
        gifSource.setAttribute('type', 'Video/mp4')
        gif.setAttribute('loop', true);
        gif.classList = "video";
        container.appendChild(gif);
      });
    },

    displayResult: function (correctAns) {
      var displayScoreDiv = document.createElement('div');
      var displayScoreText = document.createTextNode(correctAns + '/' + numQuestions);
      displayScoreDiv.appendChild(displayScoreText);
      container.appendChild(displayScoreDiv);


    },
    updateDom: function (correctAns) {
      var domNodes = helper.clearDom();
      domNodes[0].appendChild(helper.createNode('h2', 'Results', 'results_title'));
      domNodes[1].className = "container";
      resultPage.displayResult(correctAns);
      resultPage.createRestartButton();
      resultPage.createGIF(correctAns);
    }
  };