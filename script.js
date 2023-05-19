// Global Variables
const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countDownTitleEl = document.getElementById("countdown-title");
const countDownSpans = document.querySelectorAll("span");
const countdownBtn = document.getElementById("countdownBtn");

const completeEl = document.getElementById("complete");
const completeTitle = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

// Time variables
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date();
let countdownInterval = "";

// Set min date with Today's Day
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Update Elements with correct time
function updateDom() {
  // Update Values every seconds
  countdownInterval = setInterval(() => {
    // Get Distance from not to chosen time
    const now = new Date().getTime();
    const distance = countdownValue - now;

    // Calculate time variables
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Check if countdown is finished
    if (distance <= 0) {
      completeTitle.textContent = `${countdownTitle} Finished on ${countdownDate}`;
      clearInterval(countdownInterval);
      // Show complete container / hide inputContainer and countdown container
      completeEl.hidden = false;
      inputContainer.hidden = true;
      countdownEl.hidden = true;
      return;
    }

    // Change Values Of Elements
    countDownTitleEl.textContent = countdownTitle;
    countDownSpans[0].textContent = days;
    countDownSpans[1].textContent = hours;
    countDownSpans[2].textContent = minutes;
    countDownSpans[3].textContent = seconds;

    // Show Countdown / Hide Form/Complete
    inputContainer.hidden = true;
    countdownEl.hidden = false;
    completeEl.hidden = true;
  }, second);
}

// Take value from input;
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  // Check if date is valid
  if (!countdownDate) {
    alert("Please select the date for the countdown!");
    return;
  }
  // Set data in local storage
  const countdownData = { date: countdownDate, title: countdownTitle };
  localStorage.setItem("countdown", JSON.stringify(countdownData));

  // Get number version of Date
  countdownValue = new Date(countdownDate).getTime();
  updateDom();
}

// Reset Countdown
function reset() {
  // show form / hide countdown
  inputContainer.hidden = false;
  countdownEl.hidden = true;
  completeEl.hidden = true;

  // clear time interval
  clearInterval(countdownInterval);

  // Reset values
  countdownTitle = "";
  countdownDate = "";

  // Reset local storage
  localStorage.removeItem("countdown");
}

// Check local storage for countdown
function checkLocalStorage() {
  const localData = localStorage.getItem("countdown");

  // Return if there is no local data;
  if (!localData) return;

  inputContainer.hidden = true;

  // Set local data
  const data = JSON.parse(localData);
  countdownTitle = data.title;
  countdownDate = data.date;

  // Get number version of Date
  countdownValue = new Date(countdownDate).getTime();
  updateDom();
}

// Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

// On Load
checkLocalStorage();
