const textOfQuote = document.querySelector('.quote');
const authorOfQuote = document.querySelector('.author');
const buttonChangeQuote = document.querySelector('.change-quote');


function getRandomNum(max) {
    return Math.floor(Math.random() * max);
}


function getQuotes() {
    const quotes = '/data.json';
    fetch(quotes)
      .then(res => res.json())
      .then(data => { 
        textOfQuote.innerHTML = data[getRandomNum(data.length)].text;
        authorOfQuote.innerHTML = data[getRandomNum(data.length)].author;
    });
}

function changeQuotes() {
  getQuotes()
  buttonChangeQuote.addEventListener('click', getQuotes);
}
changeQuotes()
export default changeQuotes;