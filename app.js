const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const whatsapp = document.getElementById('whatsapp');
const newQuoteBtn = document.getElementById('new-quote');
const laoder = document.getElementById('loader');

// SHOW LOADING
function showLoadingSpinner(){
    laoder.hidden = false;
    quoteContainer.hidden = true;
}

//  HIDE LOADING
function removeLoadingSpinner(){
    if(!laoder.hidden){
        quoteContainer.hidden = false;
        laoder.hidden = true;
    }
}

// Get Quote from API
async function getQuote(){
    showLoadingSpinner();
    const proxyUrl = 'https://fast-eyrie-24869.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is Blank, add 'Unknown
        if (data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop loader, Show Quote
        removeLoadingSpinner()
    } catch(error){
        getQuote();
    }

};
//  Tweet quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Share On Whatsapp
function whatsappShare(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    let message = quote + " - " + author;
    window.open( "whatsapp://send?text=" + message, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
whatsapp.addEventListener('click', whatsappShare);

//On Load
getQuote();



