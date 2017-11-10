# teamQ
Lucy, Fatimat, Mohamed, Shannon Week 3 Project




## Our Trivia Quiz App

We created a trivia quiz app!

**User stories**
- The user chooses a category and is presented with five trivia questions in that category, one by one. They receive their score at the end, with a corresponding gif.
- The user can cycle through the app as many times as they like.
- The app remembers the latest score for each category and displays it on the home page, alongside the category.
- The app uses a session token so it displays unique questions until the available questions run out, then it resets the token.

**API requests**
The app relies on two APIs: the [open trivia database](https://opentdb.com/api_config.php) and [giphy](https://developers.giphy.com/).

There are three potential API calls to the open trivia database:
1. To fetch a session token which prevents questions from being repeated.
2. To reset a session token if not enough unique questions remain for the quiz.
3. To fetch 5 quiz questions in the chosen category.

There is one API call to the giphy database, which fetches a random gif that corresponds to the success of the user.

**If we had more time…**
- we would continue to work on the css and visual display
- we would make each button respond to hover
- we would show the user which questions and answers were correct or incorrect
- we would experiment with making the javascript linked to different html documents so the user can easily go back in the browser if they so desire.

**Things we struggled with/have questions about:**
- How to incorporate TDD when there is minimal data manipulation involved in the app. What little there is has to do with randomization. Most of our functions have to do with fetching data through APIs and displaying it dynamically on the DOM.
- 
