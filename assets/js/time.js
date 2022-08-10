
const time = document.querySelector('.time');

import showDate from "./date";
showDate();

export default function showTime() {
  const dates = new Date;
  const currentTime = dates.toLocaleTimeString();
  time.innerHTML = currentTime;
  setTimeout(showTime, 1000);
  setTimeout(showDate, 1000);
}

