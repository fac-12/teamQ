//universal helper functions
var helper = {
  
  //return the object in array with specified id (for setting score etc)
  findObj: function(key,val) {
    return categories.find(function(item) {
      return item[key] == val;
    });
  },

  //clears the DOM except for the h1 header, returns the header and main node for easy access
  clearDom: function() {
    var headerNode = document.querySelector('header');
    var mainNode = document.querySelector('main');
    while (headerNode.childElementCount>1) {
      headerNode.removeChild(headerNode.lastElementChild);
    }
    while (mainNode.firstChild) {
      mainNode.removeChild(mainNode.firstChild);
    }
    return [headerNode,mainNode];
  },

  //draws and returns the subheader node (i.e. "select a category", "question #1", "results", etc)
  drawSubHeader: function(str) {
    var headerNode = document.createElement('h2');
    var textNode = document.createTextNode(str);
    headerNode.appendChild(textNode);
    headerNode.className = 'subheader';
    return headerNode;
  }, 

  //make xhr request
  request: function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var result = JSON.parse(xhr.responseText);
        console.log(result.response_code);
        callback(result);
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  }
};