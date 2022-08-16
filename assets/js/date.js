const date = document.querySelector('.date');

let language = document.querySelector('.language');
language = language.textContent

function showDate() {
  const newDate = new Date;
  const options = { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' };
  const currentDate = newDate.toLocaleDateString(language, options);
  date.innerHTML = currentDate;
}


export default showDate;
