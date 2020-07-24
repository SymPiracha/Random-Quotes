const quoteContainer = document.getElementById('quote-container');
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('newQuote');


// Get Quote From API
async function getQuote() {
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If author is blank, replace with 'unknown'
        if (data.quoteAuthor === '') {
            author.innerText = "Unknown";
        } else {
            author.innerText = data.quoteAuthor;
        }
        // Reduce font size if char > 120
        if (data.quoteText.length > 50) {
            quote.classList.add('long-quote');
        } else {
            quote.classList.remove('long-quote');
        }
        quote.innerText = data.quoteText;
    }
    catch(error) {

        console.log("Mistakes were made: ", error);
    }
}

function tweet() {
    const quoteText = quote.innerText;
    const authorText = author.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorText} `;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
twitterBtn.addEventListener('click', tweet);
newQuoteBtn.addEventListener('click', getQuote);



//On Load
getQuote();