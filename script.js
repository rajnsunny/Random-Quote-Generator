
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


//Get Quotes from API
let apiQuotes = {};

//Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new Quotes
function newQuotes(){
    loading();
    //Pick a random quotes from apiQuotes array
    const quote = apiQuotes;
    console.log(quote);
    //If author is not available
    if(!quote.author){
        authorText.textContent = 'Unkwown';
    }
    else{
        authorText.textContent = quote.author;
    }
    console.log(author);
    //if Quote is so long
    if(quote.length > 90){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    //Set Quote,Hide Loader
    quoteText.textContent = quote.content;
    complete();
}


async function getQuotes(){
    loading();
    const apiUrl = 'https://api.quotable.io/random';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
      //  console.log(apiQuotes);
        newQuotes();
    }catch(error){
        //Catch Error here

    }
}

//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

//Event Listener
window.addEventListener("load", event => {
    newQuoteBtn.onclick = function() {
        location.reload(true);
    }
});
//newQuoteBtn.addEventListener('click','load');
twitterBtn.addEventListener('click',tweetQuote);

//on load
getQuotes();

