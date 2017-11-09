//universal helper functions
var helper = {

  //return the object in array with specified id (for setting score etc)
  findObj: function(arr, key,val) {
    return arr.find(function(item) {
      return item[key] == val;
    });
  },

  //clears the DOM except for the h1 header, returns the header and main node for easy access
  clearDom: function() {
    var headerNode = document.querySelector('header');
    var mainNode = document.querySelector('main');
    while (headerNode.firstChild) {
      headerNode.removeChild(headerNode.firstChild);
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
        callback(result);
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  }, 

  //create and return node with specified text and class
  createNode: function(type,text,className) {
    var node = document.createElement(type);
    var textNode = document.createTextNode(text);
    node.appendChild(textNode);
    node.className = className;
    return node;
  }
};

if (typeof module !== 'undefined') {
  module.exports = helper;
}