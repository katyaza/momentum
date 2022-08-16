const date = document.querySelector('.date');

let language = localStorage.getItem('lang')

function showDate() {
  const newDate = new Date;
  const options = { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' };
  const currentDate = newDate.toLocaleDateString(language, options);
  date.innerHTML = currentDate;
}


export default showDate;
