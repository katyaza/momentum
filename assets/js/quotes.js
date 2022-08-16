const textOfQuote = document.querySelector('.quote');
const authorOfQuote = document.querySelector('.author');
const buttonChangeQuote = document.querySelector('.change-quote');

let language = document.querySelector('.language');
language = language.textContent

function getRandomNum(max) {
    return Math.floor(Math.random() * max);
}


function getQuotes() {
    const quotes = '/momentum/data.json';
    fetch(quotes)
      .then(res => res.json())
      .then(data => { 
        textOfQuote.innerHTML = data[language][getRandomNum(data[language].length)].text;
        authorOfQuote.innerHTML = data[language][getRandomNum(data[language].length)].author;
    });
}

function changeQuotes() {
  getQuotes()
  buttonChangeQuote.addEventListener('click', getQuotes);
}
changeQuotes()
export default changeQuotes;