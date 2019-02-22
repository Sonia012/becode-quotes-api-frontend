const url = 'https://becodequotes-api.herokuapp.com/quotes';
let quotesData

//website that shows a random quote
fetch(url)
  .then(function(response) {
    return response.json();
  })
  .catch(function(error) {
    console.log(error);
  })
  .then(function(myJson) {
    quotesData = myJson;
    displayOnScreen(quotesData)
  });
//click on the "Get another quote" button to change the quotes
$(`#otherQuote`).click(function() {
  displayOnScreen(quotesData)
})

//display a random quote on the screen
function displayOnScreen(quotesData) {
  let i = Math.floor(Math.random() * quotesData.length);
  $("#quoteShow").text(JSON.stringify(quotesData[i].quote));
  $("#authorShow").text(quotesData[i].author)
}

//open new window to post new quotes to the database
$('#admin').click(function() {
  window.open("./admin.html")
})

//click on the "Post" button to post a new quote to the database, via the "handleClickButton" function below
$('#post').click(handleClickButton);
  function handleClickButton() {
    const inputQuote = $(`#quote`);
    const inputAuthor = $(`#author`);
    const data = {
      quote: inputQuote.val(),
      author: inputAuthor.val()
    }
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };

    if ((data.quote == "") || (data.author == "")) {
      alert('The "quote" and "author" input fields cannot be empty')
    } else {
        fetch(url, options)
        inputQuote.val("")
        inputAuthor.val("")
   }
  }

  // Source for quotes: https://www.forbes.com/sites/kevinkruse/2013/05/28/inspirational-quotes/#3ff515d86c7a
